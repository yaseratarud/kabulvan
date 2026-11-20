"""Create the first staff administrator and the indexes used by the portal."""
import asyncio
from getpass import getpass
import re


from server import db
from fastapi import HTTPException
from staff import FirstAdmin, create_first_admin, employee_pattern, pin_pattern


async def bootstrap():
    employee_id = input("Administrator employee ID: ").strip().upper()
    name = input("Administrator name: ").strip()
    pin = getpass("Administrator PIN (6–12 digits): ")
    confirmation = getpass("Confirm PIN: ")
    if not re.fullmatch(employee_pattern, employee_id) or not 1 <= len(name) <= 80:
        raise SystemExit("Enter a valid name and employee ID.")
    if not re.fullmatch(pin_pattern, pin) or pin != confirmation:
        raise SystemExit("Enter matching PINs containing 6–12 digits.")
    try:
        await create_first_admin(db, FirstAdmin(employee_id=employee_id, name=name, pin=pin))
    except HTTPException as failure:
        raise SystemExit(failure.detail) from None
    print("Administrator created.")


if __name__ == "__main__":
    asyncio.run(bootstrap())
