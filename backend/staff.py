"""Internal cashier and kitchen API, mounted behind the website's staff proxy."""
import asyncio
import hashlib
import json
import os
import re
import secrets
from datetime import datetime, timedelta, timezone
from typing import Literal

import bcrypt
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from pymongo import ReturnDocument
from pymongo.errors import DuplicateKeyError

Role = Literal["cashier", "kitchen", "admin"]
employee_pattern = r"^[A-Za-z0-9_-]{2,32}$"
pin_pattern = r"^[0-9]{6,12}$"
public_staff = {"pin_hash": 0, "version": 0, "attempts": 0}


def now():
    return datetime.now(timezone.utc)


async def hash_pin(pin):
    return (await asyncio.to_thread(bcrypt.hashpw, pin.encode(), bcrypt.gensalt())).decode()


def digest(token):
    return hashlib.sha256(token.encode()).hexdigest()


class Login(BaseModel):
    employee_id: str = Field(pattern=employee_pattern)
    pin: str = Field(pattern=pin_pattern)


class Employee(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    role: Role
    active: bool = True
    pin: str | None = Field(default=None, pattern=pin_pattern)


class MenuItem(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    category: str = Field(min_length=1, max_length=60)
    active: bool = True


class Line(BaseModel):
    item_id: str = Field(pattern=r"^[a-f0-9]{24}$")
    quantity: int = Field(ge=1, le=99)


class Ticket(BaseModel):
    key: str = Field(pattern=r"^[a-f0-9-]{36}$")
    items: list[Line] = Field(min_length=1, max_length=50)


class Progress(BaseModel):
    status: Literal["preparing", "completed"]


def staff_router(db):
    async def verify_proxy(request: Request):
        secret = os.getenv("STAFF_PROXY_SECRET", "")
        supplied = request.headers.get("x-staff-proxy-secret", "")
        if len(secret) < 32 or not secrets.compare_digest(secret.encode(), supplied.encode()):
            raise HTTPException(404, "Unavailable")

    router = APIRouter(prefix="/api/staff", dependencies=[Depends(verify_proxy)])
    employees = db.staff_employees
    sessions = db.staff_sessions
    menu = db.staff_menu
    orders = db.staff_orders

    async def session_for(request):
        token = request.headers.get("authorization", "").removeprefix("Bearer ")
        if not token:
            return None, None
        session = await sessions.find_one({"_id": digest(token), "expires": {"$gt": now()}})
        if not session:
            return None, None
        employee = await employees.find_one({
            "_id": session["employee_id"], "active": True, "version": session["version"],
        }, public_staff)
        return session, employee

    def require(*roles):
        async def authorize(request: Request):
            _, employee = await session_for(request)
            if not employee:
                raise HTTPException(401, "Sign in to continue")
            if roles and employee["role"] not in roles:
                raise HTTPException(403, "This account does not have access")
            return employee
        return authorize

    @router.post("/login")
    async def login(data: Login):
        # Reserve attempts atomically before checking the PIN, including concurrent requests.
        employee_id = data.employee_id.upper()
        cutoff = now() - timedelta(minutes=15)
        retry_at = "$attempts.since"
        fresh = {"$lt": [{"$ifNull": [retry_at, cutoff - timedelta(seconds=1)]}, cutoff]}
        employee = await employees.find_one_and_update(
            {"_id": employee_id, "active": True, "$or": [
                {"attempts.since": {"$lt": cutoff}}, {"attempts.count": {"$lt": 5}},
                {"attempts": {"$exists": False}},
            ]},
            [{"$set": {"attempts": {"$cond": [
                fresh, {"since": now(), "count": 1},
                {"since": retry_at, "count": {"$add": ["$attempts.count", 1]}},
            ]}}}],
            return_document=ReturnDocument.AFTER,
        )
        if not employee or not await asyncio.to_thread(
            bcrypt.checkpw, data.pin.encode(), employee["pin_hash"].encode()
        ):
            raise HTTPException(401, "Invalid employee ID or PIN. After five attempts, wait 15 minutes.")
        await employees.update_one(
            {"_id": employee_id, "version": employee["version"]}, {"$unset": {"attempts": ""}}
        )
        token = secrets.token_urlsafe(32)
        await sessions.insert_one({
            "_id": digest(token), "employee_id": employee_id, "version": employee["version"],
            "expires": now() + timedelta(hours=12),
        })
        return {"token": token}

    @router.post("/logout")
    async def logout(request: Request):
        token = request.headers.get("authorization", "").removeprefix("Bearer ")
        if token:
            await sessions.delete_one({"_id": digest(token)})
        return {"ok": True}

    @router.get("/me")
    async def me(employee=Depends(require())):
        return employee

    @router.get("/menu")
    async def get_menu(employee=Depends(require("cashier", "admin"))):
        criteria = {} if employee["role"] == "admin" else {"active": True}
        return await menu.find(criteria).sort([("category", 1), ("name", 1)]).to_list(None)

    @router.put("/menu/{item_id}")
    async def save_menu(item_id: str, data: MenuItem, employee=Depends(require("admin"))):
        if item_id == "new":
            item_id = secrets.token_hex(12)
            await menu.insert_one({"_id": item_id, **data.model_dump()})
        else:
            result = await menu.update_one({"_id": item_id}, {"$set": data.model_dump()})
            if not result.matched_count:
                raise HTTPException(404, "Menu item not found")
        return {"_id": item_id}

    @router.get("/employees")
    async def get_employees(employee=Depends(require("admin"))):
        return await employees.find({}, public_staff).sort("_id", 1).to_list(None)

    @router.put("/employees/{employee_id}")
    async def save_employee(employee_id: str, data: Employee, employee=Depends(require("admin"))):
        if not re.fullmatch(employee_pattern, employee_id):
            raise HTTPException(400, "Enter a valid employee ID")
        employee_id = employee_id.upper()
        if employee_id == employee["_id"] and (not data.active or data.role != "admin"):
            raise HTTPException(400, "Keep your own administrator account active")
        existing = await employees.find_one({"_id": employee_id})
        fields = data.model_dump(exclude={"pin"})
        if data.pin:
            fields["pin_hash"] = await hash_pin(data.pin)
        if not existing:
            if not data.pin:
                raise HTTPException(400, "A PIN is required for a new employee")
            try:
                await employees.insert_one({"_id": employee_id, "version": 1, **fields})
            except DuplicateKeyError:
                raise HTTPException(409, "Employee already exists")
        else:
            update = {"$set": fields}
            if data.pin or data.role != existing["role"] or data.active != existing["active"]:
                update.update({"$inc": {"version": 1}, "$unset": {"attempts": ""}})
            result = await employees.update_one(
                {"_id": employee_id, "version": existing["version"]}, update,
            )
            if not result.matched_count:
                raise HTTPException(409, "Employee changed. Reload and try again.")
        return {"ok": True}

    @router.post("/orders")
    async def send_order(data: Ticket, employee=Depends(require("cashier"))):
        order_id = f'{employee["_id"]}:{data.key}'
        existing = await orders.find_one({"_id": order_id})
        if existing:
            return existing
        ids = [line.item_id for line in data.items]
        if len(set(ids)) != len(ids):
            raise HTTPException(400, "Combine duplicate items before sending")
        available = {
            item["_id"]: item["name"]
            async for item in menu.find({"_id": {"$in": ids}, "active": True})
        }
        if len(available) != len(ids):
            raise HTTPException(409, "An item is unavailable. Refresh the menu.")
        order = {
            "_id": order_id, "number": data.key[:8].upper(), "created_at": now().isoformat(),
            "cashier": employee["_id"], "status": "new",
            "items": [
                {"name": available[line.item_id], "quantity": line.quantity} for line in data.items
            ],
        }
        try:
            await orders.insert_one(order)
        except DuplicateKeyError:
            return await orders.find_one({"_id": order_id})
        return order

    @router.get("/orders")
    async def history(before: str | None = None, employee=Depends(require("admin"))):
        criteria = {}
        if before:
            anchor = await orders.find_one({"_id": before})
            if not anchor:
                raise HTTPException(400, "Invalid history cursor")
            criteria["$or"] = [
                {"created_at": {"$lt": anchor["created_at"]}},
                {"created_at": anchor["created_at"], "_id": {"$lt": before}},
            ]
        return await orders.find(criteria).sort([("created_at", -1), ("_id", -1)]).to_list(50)

    @router.patch("/orders/{order_id}")
    async def advance(order_id: str, data: Progress, employee=Depends(require("kitchen"))):
        previous = "new" if data.status == "preparing" else "preparing"
        result = await orders.find_one_and_update(
            {"_id": order_id, "status": previous},
            {"$set": {"status": data.status, f"{data.status}_at": now().isoformat(),
                      f"{data.status}_by": employee["_id"]}},
            return_document=ReturnDocument.AFTER,
        )
        if result is None:
            result = await orders.find_one({"_id": order_id, "status": data.status})
        if result is None:
            raise HTTPException(409, "Order has already changed")
        return result

    @router.get("/stream")
    async def stream(request: Request, employee=Depends(require("kitchen"))):
        async def updates():
            yield "retry: 400\n\n"
            previous = None
            for tick in range(45):
                if await request.is_disconnected():
                    break
                if tick % 5 == 0:
                    _, current = await session_for(request)
                    if not current or current["role"] != "kitchen":
                        break
                tickets = await orders.find({"status": {"$in": ["new", "preparing"]}}).sort(
                    [("created_at", 1), ("_id", 1)]
                ).to_list(None)
                payload = json.dumps(jsonable_encoder(tickets))
                if payload != previous:
                    yield f"data: {payload}\n\n"
                    previous = payload
                await asyncio.sleep(0.4)

        return StreamingResponse(updates(), media_type="text/event-stream",
                                 headers={"Cache-Control": "no-store", "X-Accel-Buffering": "no"})

    return router
