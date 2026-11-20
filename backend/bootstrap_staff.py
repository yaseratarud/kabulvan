"""Create the first staff administrator and the indexes used by the portal."""
import asyncio
from getpass import getpass
import re


from server import db
from staff import employee_pattern, hash_pin, pin_pattern


async def bootstrap():
    employee_id = input("Administrator employee ID: ").strip().upper()
    name = input("Administrator name: ").strip()
    pin = getpass("Administrator PIN (6–12 digits): ")
    confirmation = getpass("Confirm PIN: ")
    if not re.fullmatch(employee_pattern, employee_id) or not 1 <= len(name) <= 80:
        raise SystemExit("Enter a valid name and employee ID.")
    if not re.fullmatch(pin_pattern, pin) or pin != confirmation:
        raise SystemExit("Enter matching PINs containing 6–12 digits.")
    if await db.staff_employees.find_one({"role": "admin", "active": True}):
        raise SystemExit("An active administrator already exists.")
    await db.staff_sessions.create_index("expires", expireAfterSeconds=0)
    await db.staff_orders.create_index([("status", 1), ("created_at", 1), ("_id", 1)])
    await db.staff_orders.create_index([("created_at", -1), ("_id", -1)])
    await db.staff_employees.insert_one({
        "_id": employee_id, "name": name, "role": "admin", "active": True,
        "version": 1, "pin_hash": await hash_pin(pin),
    })
    print("Administrator created.")


if __name__ == "__main__":
    asyncio.run(bootstrap())
