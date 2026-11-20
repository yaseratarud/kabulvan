# KabulVan staff ordering

The staff portal is available at `/staff` on the Next.js website. Its browser requests stay on the same origin under `/api/staff`. Next.js forwards them to the FastAPI service using a shared secret. The backend uses separate `staff_*` collections in MongoDB.

## Staging setup

1. Start the FastAPI service from `backend` using the repository's backend requirements and `uvicorn server:app`. For Render, use the `backend` root directory, `pip install -r requirements.txt` as the build command, and `uvicorn server:app --host 0.0.0.0 --port $PORT` as the start command. Set `PYTHON_VERSION` to `3.12.11`. Set `MONGO_URL` and `DB_NAME` to a staging database and set `STAFF_PROXY_SECRET` to a randomly generated secret of at least 32 characters.
2. Set the same `STAFF_PROXY_SECRET` and set `STAFF_API_URL` to the HTTPS origin of that service in the Next.js preview environment. Keep both variables server-side.
3. In a terminal with the backend environment configured, run `cd backend && python bootstrap_staff.py`. The bootstrap creates the first administrator and the MongoDB indexes.
4. Open `/staff` as the administrator and create a cashier employee, a kitchen employee, and the actual store menu. The portal requires PINs of 6–12 digits.
5. On the iPad and a separate kitchen browser, sign in with the corresponding accounts. Tap **Enable sound** on the kitchen display to grant browser audio permission. Add items on the iPad, send an order, check that the kitchen receives one ticket and plays the chime, and move it through **Preparing** and **Completed**. Confirm the ticket and its status in the admin order history.
6. Verify the public Home, About, Departments, Weekly Specials, and Contact pages on the same preview. Repeat the device test before going live, including reconnecting the kitchen display after a network interruption.

Kitchen updates stream over SSE with a short reconnect interval. Cashier retries use the same order key after a connection error, so the API can return the already-saved ticket. Staff sessions expire after 12 hours. Changing an employee's PIN, role, or active status revokes their sessions.
