"use client";

import { useEffect, useRef, useState } from "react";

type Orders = { preparing: string[]; ready: string[] };

export default function PickupBoard() {
    const [orders, setOrders] = useState<Orders>();
    const [offline, setOffline] = useState(false);
    const board = useRef<HTMLElement>(null);

    useEffect(() => {
        const controller = new AbortController();
        let timer: ReturnType<typeof setTimeout>;
        async function refresh() {
            try {
                const response = await fetch("/api/staff/pickup", { cache: "no-store", signal: controller.signal });
                if (!response.ok) throw new Error("Pickup display unavailable");
                const next: Orders = await response.json();
                if (!controller.signal.aborted) {
                    setOrders(next);
                    setOffline(false);
                }
            } catch {
                if (!controller.signal.aborted) setOffline(true);
            } finally {
                if (!controller.signal.aborted) timer = setTimeout(refresh, 3000);
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
        {!orders && !offline && <p role="status">Loading orders…</p>}
        <div className="grid gap-5 md:grid-cols-2">
            <Column title="Preparing" tone="bg-amber-900" numbers={offline ? undefined : orders?.preparing} />
            <Column title="Ready for pickup" tone="bg-emerald-800" numbers={offline ? undefined : orders?.ready} />
        </div>
    </section>;
}

function Column({ title, tone, numbers }: { title: string; tone: string; numbers?: string[] }) {
    return <section className="overflow-hidden rounded-2xl bg-stone-900">
        <h2 className={tone + " p-5 text-3xl font-bold sm:text-4xl"}>{title}</h2>
        <ul className="grid gap-3 p-5 xl:grid-cols-2">
            {numbers?.map((number, index) => <li key={number + "-" + index}
                className="rounded-lg bg-stone-800 px-4 py-3 font-mono text-2xl font-bold tracking-wide sm:text-3xl">#{number}</li>)}
            {numbers?.length === 0 && <li className="text-lg text-stone-300">No orders</li>}
        </ul>
    </section>;
}
