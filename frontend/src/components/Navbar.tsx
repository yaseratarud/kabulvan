"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/lib/data";

const slug = (label: string) => label.toLowerCase().replace(/\s+/g, "-");

export const Navbar = () => {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 48);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const light = pathname === "/" && !scrolled && !open;

    return (
        <header
            data-testid="main-navbar"
            className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
                light
                    ? "bg-black/35 backdrop-blur-xl"
                    : "bg-cream/95 shadow-[0_4px_24px_rgba(18,36,22,0.08)] backdrop-blur-xl"
            }`}
        >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">
                <Link href="/" data-testid="nav-logo" aria-label="KabulVan Supermarket home">
                    <Logo light={light} />
                </Link>
                <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
                    {NAV_LINKS.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                data-testid={`nav-link-${slug(link.label)}`}
                                aria-current={active ? "page" : undefined}
                                className={`relative py-2 text-base font-semibold transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:transition-[background-color] ${
                                    active
                                        ? light
                                            ? "text-gold-soft after:bg-gold-soft"
                                            : "text-pine after:bg-gold"
                                        : light
                                          ? "text-white/85 after:bg-transparent hover:text-gold-soft"
                                          : "text-charcoal/75 after:bg-transparent hover:text-pine"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="flex items-center gap-3">
                    <Link
                        href="/contact"
                        data-testid="nav-visit-us-button"
                        className="hidden items-center gap-2 rounded-full bg-gold px-6 py-3 text-base font-bold text-pine-deep transition-colors duration-200 hover:bg-gold-soft sm:inline-flex"
                    >
                        <MapPin className="h-4 w-4" />
                        Visit Us
                    </Link>
                    <button
                        type="button"
                        data-testid="nav-hamburger-button"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                        className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full lg:hidden"
                    >
                        <span className={`h-0.5 w-5 rounded-full transition-[transform,opacity,background-color] duration-300 ${light ? "bg-white" : "bg-pine"} ${open ? "translate-y-[7px] rotate-45" : ""}`} />
                        <span className={`h-0.5 w-5 rounded-full transition-[opacity,background-color] duration-300 ${light ? "bg-white" : "bg-pine"} ${open ? "opacity-0" : ""}`} />
                        <span className={`h-0.5 w-5 rounded-full transition-[transform,opacity,background-color] duration-300 ${light ? "bg-white" : "bg-pine"} ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
                    </button>
                </div>
            </div>
            <div
                data-testid="nav-mobile-menu"
                className={`overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden ${
                    open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
                } ${light ? "" : "bg-cream/95 backdrop-blur-xl"}`}
            >
                <nav className="flex flex-col gap-1 px-5 pb-6 pt-2" aria-label="Mobile">
                    {NAV_LINKS.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                data-testid={`mobile-nav-link-${slug(link.label)}`}
                                aria-current={active ? "page" : undefined}
                                className={`rounded-xl px-4 py-3.5 text-lg font-semibold transition-colors duration-200 ${
                                    active
                                        ? "bg-pine/5 text-pine"
                                        : "text-charcoal/85 hover:bg-pine/5 hover:text-pine"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    <Link
                        href="/contact"
                        data-testid="mobile-nav-visit-us-button"
                        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3.5 text-base font-bold text-pine-deep"
                    >
                        <MapPin className="h-4 w-4" />
                        Visit Us
                    </Link>
                </nav>
            </div>
        </header>
    );
};
