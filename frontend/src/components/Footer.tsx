import type { FC } from "react";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { LogoLockup } from "@/components/Logo";
import { BUSINESS, NAV_LINKS, SOCIALS } from "@/lib/data";

const TikTokIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const SOCIAL_ICONS: Record<string, FC<{ className?: string }>> = {
    Instagram: (p) => <Instagram className={p.className} />,
    Facebook: (p) => <Facebook className={p.className} />,
    TikTok: (p) => <TikTokIcon className={p.className} />,
};

const slug = (label: string) => label.toLowerCase().replace(/\s+/g, "-");

export const Footer = () => {
    return (
        <footer data-testid="site-footer" className="bg-[#0E1B12] py-14 text-cream/80 lg:py-16">
            <div className="mx-auto max-w-7xl px-6 sm:px-10">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <LogoLockup className="h-24 w-auto" />
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
                            Authentic groceries, fresh halal meat, produce, dry fruits, baked goods,
                            and specialty ingredients in Surrey, BC.
                        </p>
                        <div className="mt-5 flex gap-3">
                            {SOCIALS.map((s) => {
                                const Icon = SOCIAL_ICONS[s.label];
                                return (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`KabulVan on ${s.label}`}
                                        data-testid={`social-${s.label.toLowerCase()}-link`}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-cream/70 transition-[background-color,color] duration-200 hover:bg-gold hover:text-pine-deep"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    <nav aria-label="Footer">
                        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-gold-soft">
                            Quick Links
                        </h2>
                        <ul className="mt-4 space-y-2.5">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        data-testid={`footer-link-${slug(link.label)}`}
                                        className="text-sm text-cream/65 transition-colors duration-200 hover:text-gold-soft"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-gold-soft">
                            Location
                        </h2>
                        <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-cream/65">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
                            <span>
                                {BUSINESS.addressLine1}
                                <br />
                                {BUSINESS.addressLine2}
                            </span>
                        </p>
                        <a
                            href={BUSINESS.phoneHref}
                            data-testid="footer-phone-link"
                            className="mt-3 flex items-center gap-2.5 text-sm text-cream/65 transition-colors duration-200 hover:text-gold-soft"
                        >
                            <Phone className="h-4 w-4 shrink-0 text-gold-soft" />
                            {BUSINESS.phoneDisplay}
                        </a>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-gold-soft">
                            Hours
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-cream/65">
                            Daily
                            <br />
                            10 AM – 9 PM
                        </p>
                        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-cream/70">
                            <span className="h-2 w-2 rounded-full bg-gold-soft" />
                            Open 7 Days a Week
                        </p>
                    </div>
                </div>
                <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-cream/45 sm:flex-row">
                    <p>© KabulVan Supermarket. All rights reserved.</p>
                    <p data-testid="footer-credit">
                        Website by{" "}
                        <a
                            href="https://www.verifieddigital.solutions/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors duration-200 hover:text-gold-soft"
                        >
                            Verified Digital Solutions
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};
