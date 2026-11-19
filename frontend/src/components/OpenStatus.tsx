"use client";

import { useEffect, useState } from "react";
import { BUSINESS } from "@/lib/data";

const isOpenNow = () => {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: BUSINESS.timezone,
        hour: "numeric",
        hourCycle: "h23",
    }).formatToParts(new Date());
    const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
    return hour >= BUSINESS.openHour && hour < BUSINESS.closeHour;
};

export const OpenStatus = ({ dark = false }: { dark?: boolean }) => {
    const [open, setOpen] = useState<boolean | null>(null);

    useEffect(() => {
        setOpen(isOpenNow());
        const timer = setInterval(() => setOpen(isOpenNow()), 30000);
        return () => clearInterval(timer);
    }, []);

    if (open === null) {
        return (
            <span
                data-testid="open-status-indicator"
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-base font-semibold ${
                    dark ? "bg-white/10 text-white" : "bg-pine/5 text-pine"
                }`}
            >
                <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                Checking hours…
            </span>
        );
    }

    return (
        <span
            data-testid="open-status-indicator"
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-base font-semibold ${
                dark ? "bg-white/10 text-white" : "bg-pine/5 text-pine"
            }`}
        >
            <span
                className={`h-2.5 w-2.5 rounded-full ${
                    open ? "animate-pulse bg-green-500" : "bg-red-500"
                }`}
            />
            {open ? "Open Now — Closes at 9 PM" : "Closed — Opens at 10 AM"}
        </span>
    );
};
