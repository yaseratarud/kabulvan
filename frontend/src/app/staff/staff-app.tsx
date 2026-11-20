"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Role = "cashier" | "kitchen" | "admin";
type Employee = { _id: string; name: string; role: Role; active: boolean };
type Item = { _id: string; name: string; category: string; active: boolean };
type Status = "new" | "preparing" | "completed";
type Order = {
    _id: string;
    number: string;
    created_at: string;
    status: Status;
    cashier: string;
    items: { name: string; quantity: number }[];
};
type Run = (action: () => Promise<void>) => Promise<void>;

class StaffError extends Error {
    constructor(message: string, readonly status: number) {
        super(message);
    }
}

async function api<T>(path: string, method = "GET", data?: unknown): Promise<T> {
    const response = await fetch("/api/staff/" + path, {
        method,
        headers: { "Content-Type": "application/json" },
        body: data === undefined ? undefined : JSON.stringify(data),
        cache: "no-store",
    });
    const result = await response.json();
    if (!response.ok) {
        throw new StaffError(typeof result.detail === "string" ? result.detail : "Check the information and try again.", response.status);
    }
    return result as T;
}

const button = "min-h-12 rounded-xl border border-emerald-800 px-4 py-2 font-semibold text-emerald-900 disabled:opacity-50";
const primary = "min-h-12 rounded-xl bg-emerald-800 px-5 py-2 font-semibold text-white disabled:opacity-50";
const field = "min-h-12 w-full rounded-xl border border-stone-300 bg-white px-3";
const card = "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm";
const dateTime = new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium", timeStyle: "short", timeZone: "America/Vancouver",
});

export default function StaffApp() {
    const [employee, setEmployee] = useState<Employee | null | undefined>();
    const [error, setError] = useState("");
    const [signingIn, setSigningIn] = useState(false);

    const run: Run = async (action) => {
        setError("");
        try {
            await action();
        } catch (failure) {
            if (employee && failure instanceof StaffError && failure.status === 401) setEmployee(null);
            setError(failure instanceof Error ? failure.message : "Please try again.");
        }
    };

    useEffect(() => {
        api<Employee>("me").then(setEmployee).catch((failure) => {
            if (!(failure instanceof StaffError && failure.status === 401)) setError(failure.message);
            setEmployee(null);
        });
    }, []);

    async function signIn(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        setSigningIn(true);
        try {
            await run(async () => {
                await api("login", "POST", {
                    employee_id: form.get("employee_id"), pin: form.get("pin"),
                });
                setEmployee(await api<Employee>("me"));
            });
        } finally {
            setSigningIn(false);
        }
    }

    return (
        <section className="min-h-screen bg-stone-50 px-4 pb-10 pt-28 text-stone-900">
            <div className="mx-auto max-w-7xl">
                <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="font-semibold text-emerald-800">KabulVan Supermarket</p>
                        <h1 className="text-3xl font-bold">
                            {employee ? { cashier: "Cashier", kitchen: "Kitchen display", admin: "Staff administration" }[employee.role] : "Staff sign in"}
                        </h1>
                    </div>
                    {employee && <div className="flex items-center gap-3">
                        <span>{employee.name}</span>
                        <button className={button} onClick={() => void run(async () => {
                            await api("logout", "POST");
                            setEmployee(null);
                        })}>Sign out</button>
                    </div>}
                </div>
                {error && <p role="alert" className="mb-4 rounded-xl bg-red-100 p-4 text-red-900">{error}</p>}
                {employee === undefined && <p>Checking session…</p>}
                {employee === null && <form className={card + " grid max-w-md gap-4"} onSubmit={signIn}>
                    <label>Employee ID<input className={field} name="employee_id" required pattern="[A-Za-z0-9_\\-]{2,32}" autoComplete="username" autoCapitalize="characters" /></label>
                    <label>PIN<input className={field} name="pin" type="password" inputMode="numeric" pattern="[0-9]{6,12}" required autoComplete="current-password" /></label>
                    <button className={primary} disabled={signingIn}>{signingIn ? "Signing in…" : "Sign in"}</button>
                </form>}
                {employee?.role === "cashier" && <Cashier run={run} />}
                {employee?.role === "kitchen" && <Kitchen run={run} />}
                {employee?.role === "admin" && <Admin run={run} />}
            </div>
        </section>
    );
}

function Cashier({ run }: { run: Run }) {
    const [menu, setMenu] = useState<Item[]>([]);
    const [cart, setCart] = useState<Record<string, number>>({});
    const [sent, setSent] = useState("");
    const [retry, setRetry] = useState(false);
    const [sending, setSending] = useState(false);
    const submitting = useRef(false);
    const ticketKey = useRef<string | null>(null);
    const loadMenu = () => run(async () => setMenu(await api<Item[]>("menu")));
    useEffect(() => { void loadMenu(); }, []); // Load when the cashier view opens.

    const selected = Object.entries(cart).filter(([, quantity]) => quantity > 0);
    function change(id: string, quantity: number) {
        setSent("");
        setCart((previous) => ({ ...previous, [id]: Math.max(0, Math.min(99, (previous[id] ?? 0) + quantity)) }));
    }

    async function send() {
        if (submitting.current || selected.length === 0) return;
        submitting.current = true;
        setSending(true);
        try {
            await run(async () => {
                ticketKey.current ??= crypto.randomUUID();
                try {
                    const order = await api<Order>("orders", "POST", {
                        key: ticketKey.current,
                        items: selected.map(([item_id, quantity]) => ({ item_id, quantity })),
                    });
                    setSent("Order #" + order.number + " sent to kitchen.");
                    setCart({});
                    ticketKey.current = null;
                    setRetry(false);
                } catch (failure) {
                    const rejected = failure instanceof StaffError && [400, 409, 422].includes(failure.status);
                    setRetry(!rejected);
                    if (rejected) ticketKey.current = null;
                    throw failure;
                }
            });
        } finally {
            submitting.current = false;
            setSending(false);
        }
    }

    return <div className="grid items-start gap-5 md:grid-cols-[2fr_1fr]">
        <div className={card}>
            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">Menu</h2>
                <button className={button} onClick={() => void loadMenu()}>Refresh menu</button>
            </div>
            {menu.length === 0 && <p>No menu items available.</p>}
            {[...new Set(menu.map((item) => item.category))].map((category) => <section key={category} className="mb-5">
                <h3 className="mb-2 font-semibold">{category}</h3>
                <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
                    {menu.filter((item) => item.category === category).map((item) =>
                        <button key={item._id} className={button + " text-left"} disabled={sending || retry} onClick={() => change(item._id, 1)}>
                            {item.name}
                        </button>
                    )}
                </div>
            </section>)}
        </div>
        <div className={card}>
            <h2 className="mb-4 text-xl font-bold">Current order</h2>
            {selected.length === 0 && <p className="mb-4">Select items from the menu.</p>}
            {selected.map(([id, quantity]) => <div key={id} className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span>{menu.find((item) => item._id === id)?.name ?? "Unavailable item"}</span>
                <div className="flex items-center gap-2">
                    <button className={button} disabled={sending || retry} aria-label="Remove one" onClick={() => change(id, -1)}>−</button>
                    <span>{quantity}</span>
                    <button className={button} disabled={sending || retry} aria-label="Add one" onClick={() => change(id, 1)}>+</button>
                </div>
            </div>)}
            <button className={primary + " w-full"} disabled={sending || !selected.length} onClick={() => void send()}>
                {sending ? "Sending…" : retry ? "Retry send to kitchen" : "Send to kitchen"}
            </button>
            {sent && <p role="status" className="mt-3 text-emerald-800">{sent}</p>}
        </div>
    </div>;
}

function Kitchen({ run }: { run: Run }) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [connected, setConnected] = useState(false);
    const [sound, setSound] = useState(false);
    const [pending, setPending] = useState<string | null>(null);
    const audio = useRef<AudioContext | null>(null);

    function chime() {
        const context = audio.current;
        if (!context || context.state !== "running") return;
        const tone = context.createOscillator();
        const volume = context.createGain();
        tone.frequency.value = 740;
        volume.gain.setValueAtTime(0.3, context.currentTime);
        volume.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.65);
        tone.connect(volume).connect(context.destination);
        tone.start();
        tone.stop(context.currentTime + 0.65);
    }

    useEffect(() => {
        let previous: Set<string> | undefined;
        let stopped = false;
        const stream = new EventSource("/api/staff/stream");
        stream.onopen = () => setConnected(true);
        stream.onmessage = (message) => {
            const next: Order[] = JSON.parse(message.data);
            if (previous && next.some((order) => order.status === "new" && !previous?.has(order._id))) chime();
            previous = new Set(next.map((order) => order._id));
            setOrders(next);
        };
        stream.onerror = () => {
            setConnected(false);
            void api<Employee>("me").catch((error) => {
                if (!stopped && error instanceof StaffError && error.status === 401) {
                    stream.close();
                    void run(async () => { throw error; });
                }
            });
        };
        return () => {
            stopped = true;
            stream.close();
            if (audio.current) void audio.current.close();
            audio.current = null;
        };
    }, []);

    async function enableSound() {
        await run(async () => {
            audio.current ??= new AudioContext();
            await audio.current.resume();
            setSound(true);
            chime();
        });
    }

    async function advance(order: Order) {
        setPending(order._id);
        try {
            await run(async () => {
                const updated = await api<Order>("orders/" + encodeURIComponent(order._id), "PATCH", {
                    status: order.status === "new" ? "preparing" : "completed",
                });
                setOrders((current) => current.flatMap((ticket) => {
                    if (ticket._id !== updated._id) return [ticket];
                    return updated.status === "completed" ? [] : [updated];
                }));
            });
        } finally {
            setPending(null);
        }
    }

    return <>
        <div className="mb-5 flex flex-wrap items-center gap-4">
            <p role="status" className={connected ? "text-emerald-800" : "text-amber-800"}>
                {connected ? "Kitchen display connected" : "Connecting to kitchen orders…"}
            </p>
            <button className={button} onClick={() => void enableSound()}>{sound ? "Test sound" : "Enable sound"}</button>
        </div>
        {connected && orders.length === 0 && <p>No active orders.</p>}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => <article key={order._id} className={card}>
                <Ticket order={order} />
                <button className={primary + " mt-4 w-full"} disabled={pending !== null} onClick={() => void advance(order)}>
                    {order.status === "new" ? "Mark preparing" : "Mark completed"}
                </button>
            </article>)}
        </div>
    </>;
}

function Ticket({ order }: { order: Order }) {
    return <>
        <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-bold">Order #{order.number}</h3>
            <span className="rounded-full bg-emerald-100 px-3 py-1 capitalize text-emerald-900">{order.status}</span>
        </div>
        <p className="mt-1 text-sm text-stone-600">{dateTime.format(new Date(order.created_at))} · {order.cashier}</p>
        <ul className="mt-3 grid gap-1">
            {order.items.map((item, index) => <li key={index}>{item.quantity} × {item.name}</li>)}
        </ul>
    </>;
}

type AdminTab = "employees" | "menu" | "history";
function Admin({ run }: { run: Run }) {
    const [tab, setTab] = useState<AdminTab>("employees");
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [menu, setMenu] = useState<Item[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [more, setMore] = useState(false);
    const [saving, setSaving] = useState(false);

    const loadEmployees = () => run(async () => setEmployees(await api<Employee[]>("employees")));
    const loadMenu = () => run(async () => setMenu(await api<Item[]>("menu")));
    const loadHistory = (cursor?: string) => run(async () => {
        const entries = await api<Order[]>("orders" + (cursor ? "?before=" + encodeURIComponent(cursor) : ""));
        setOrders((current) => cursor ? [...current, ...entries] : entries);
        setMore(entries.length === 50);
    });
    useEffect(() => { void loadEmployees(); }, []);

    function select(next: AdminTab) {
        setTab(next);
        if (next === "employees") void loadEmployees();
        if (next === "menu") void loadMenu();
        if (next === "history") void loadHistory();
    }

    async function save(event: FormEvent<HTMLFormElement>, section: "menu" | "employees", id?: string) {
        event.preventDefault();
        const form = event.currentTarget;
        const values = new FormData(form);
        const name = String(values.get("name")).trim();
        const active = values.has("active");
        setSaving(true);
        try {
            await run(async () => {
                if (section === "employees") {
                    const employeeID = id ?? String(values.get("employee_id")).toUpperCase();
                    if (!id && employees.some((employee) => employee._id === employeeID)) {
                        throw new Error("That employee ID already exists.");
                    }
                    await api("employees/" + encodeURIComponent(employeeID), "PUT", {
                        name, active, role: values.get("role"), pin: values.get("pin") || null,
                    });
                    setEmployees(await api<Employee[]>("employees"));
                } else {
                    await api("menu/" + (id ?? "new"), "PUT", { name, active, category: String(values.get("category")).trim() });
                    setMenu(await api<Item[]>("menu"));
                }
                form.reset();
            });
        } finally {
            setSaving(false);
        }
    }

    return <>
        <nav aria-label="Staff administration" className="mb-5 flex flex-wrap gap-2">
            {(["employees", "menu", "history"] as const).map((next) =>
                <button key={next} className={tab === next ? primary : button} aria-pressed={tab === next} onClick={() => select(next)}>
                    {{ employees: "Staff accounts", menu: "Menu items", history: "Order history" }[next]}
                </button>
            )}
        </nav>
        {tab === "employees" && <div className="grid items-start gap-4 lg:grid-cols-2">
            {[undefined, ...employees].map((employee) => <form key={employee ? JSON.stringify(employee) : "new"} className={card + " grid gap-3"} onSubmit={(event) => void save(event, "employees", employee?._id)}>
                <h2 className="text-lg font-bold">{employee ? "Employee " + employee._id : "Add employee"}</h2>
                {!employee && <label>Employee ID<input className={field} name="employee_id" required pattern="[A-Za-z0-9_\\-]{2,32}" /></label>}
                <label>Name<input className={field} name="name" required maxLength={80} defaultValue={employee?.name} /></label>
                <label>Role<select className={field} name="role" defaultValue={employee?.role ?? "cashier"}>
                    <option value="cashier">Cashier</option><option value="kitchen">Kitchen</option><option value="admin">Admin</option>
                </select></label>
                <label>{employee ? "New PIN (optional)" : "PIN"}<input className={field} name="pin" type="password" inputMode="numeric" autoComplete="new-password" pattern="[0-9]{6,12}" required={!employee} /></label>
                <label className="flex items-center gap-2"><input name="active" type="checkbox" defaultChecked={employee?.active ?? true} />Active</label>
                <button className={primary} disabled={saving}>{employee ? "Save employee" : "Add employee"}</button>
            </form>)}
        </div>}
        {tab === "menu" && <div className="grid items-start gap-4 lg:grid-cols-2">
            {[undefined, ...menu].map((item) => <form key={item ? JSON.stringify(item) : "new"} className={card + " grid gap-3"} onSubmit={(event) => void save(event, "menu", item?._id)}>
                <h2 className="text-lg font-bold">{item?.name ?? "Add menu item"}</h2>
                <label>Name<input className={field} name="name" required maxLength={100} defaultValue={item?.name} /></label>
                <label>Category<input className={field} name="category" required maxLength={60} defaultValue={item?.category} /></label>
                <label className="flex items-center gap-2"><input name="active" type="checkbox" defaultChecked={item?.active ?? true} />Available to cashiers</label>
                <button className={primary} disabled={saving}>{item ? "Save menu item" : "Add menu item"}</button>
            </form>)}
        </div>}
        {tab === "history" && <>
            {orders.length === 0 && <p>No orders yet.</p>}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {orders.map((order) => <article key={order._id} className={card}><Ticket order={order} /></article>)}
            </div>
            {more && <button className={button + " mt-4"} onClick={() => void loadHistory(orders.at(-1)?._id)}>Load older orders</button>}
        </>}
    </>;
}
