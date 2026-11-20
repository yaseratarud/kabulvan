"use client";

import { useEffect, useRef, useState } from "react";

type PickupTicket = { number: string; name: string | null };
type Orders = { preparing: PickupTicket[]; ready: PickupTicket[] };

export default function PickupBoard() {
    const [orders, setOrders] = useState<Orders>();
    const [offline, setOffline] = useState(false);
    const [signInRequired, setSignInRequired] = useState(false);
    const board = useRef<HTMLElement>(null);

    useEffect(() => {
        const controller = new AbortController();
        let authorized = true;
        let timer: ReturnType<typeof setTimeout>;
        async function refresh() {
            try {
                const response = await fetch("/api/staff/pickup", { cache: "no-store", signal: controller.signal });
                if (response.status === 401 || response.status === 403) {
                    authorized = false;
                    setOrders(undefined);
                    setSignInRequired(true);
                    return;
                }
                if (!response.ok) throw new Error("Pickup display unavailable");
                const next: Orders = await response.json();
                if (!controller.signal.aborted) {
                    setOrders(next);
                    setOffline(false);
                }
            } catch {
                if (!controller.signal.aborted) setOffline(true);
            } finally {
                if (authorized && !controller.signal.aborted) timer = setTimeout(refresh, 3000);
            }
        }
        void refresh();
        return () => {
            controller.abort();
            clearTimeout(timer);
        };
    }, []);

    return <section ref={board} className="min-h-screen overflow-auto bg-stone-950 p-6 text-white sm:p-10">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
                <p className="text-lg font-semibold text-emerald-300">KabulVan Supermarket</p>
                <h1 className="text-4xl font-bold sm:text-5xl">Order pickup</h1>
            </div>
            <button className="rounded-lg border border-stone-500 px-4 py-2" type="button"
                onClick={() => {
                    const action = document.fullscreenElement ? document.exitFullscreen() : board.current?.requestFullscreen?.();
                    void action?.catch(() => undefined);
                }}>Full screen</button>
        </header>
        {offline && <p role="status" className="mb-4 text-xl text-amber-300">Reconnecting. Please check with the cashier.</p>}
        {signInRequired && <p role="status">Sign in with a kitchen or admin account. <a className="underline" href="/staff">Staff sign in</a></p>}
        {!orders && !offline && !signInRequired && <p role="status">Loading orders…</p>}
        <div className="grid gap-5 md:grid-cols-2">
            <Column title="Preparing" tone="bg-amber-900" tickets={offline ? undefined : orders?.preparing} />
            <Column title="Ready for pickup" tone="bg-emerald-800" tickets={offline ? undefined : orders?.ready} />
        </div>
    </section>;
}

function Column({ title, tone, tickets }: { title: string; tone: string; tickets?: PickupTicket[] }) {
    return <section className="overflow-hidden rounded-2xl bg-stone-900">
        <h2 className={tone + " p-5 text-3xl font-bold sm:text-4xl"}>{title}</h2>
        <ul className="grid gap-3 p-5 xl:grid-cols-2">
            {tickets?.map(({ name, number }, index) => <li key={number + "-" + index}
                className="rounded-lg bg-stone-800 px-4 py-3">
                <p className="break-words text-3xl font-bold sm:text-4xl">{name || "Order"}</p>
                <p className="mt-1 font-mono text-base text-stone-300">#{number}</p>
            </li>)}
            {tickets?.length === 0 && <li className="text-lg text-stone-300">No orders</li>}
        </ul>
    </section>;
}
