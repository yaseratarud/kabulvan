// New KabulVan logo (transparent PNGs in /public/assets).
// Logo: compact mark + wordmark for the navbar. LogoLockup: full logo.
export const Logo = ({ light = false }: { light?: boolean }) => (
    <span className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/kabulvan-mark.png" alt="" className="h-12 w-auto" />
        <span className={`leading-tight ${light ? "text-white" : "text-pine"}`}>
            <span className="block font-serif text-2xl font-bold tracking-tight">KabulVan</span>
            <span
                className={`block text-[11px] font-bold uppercase tracking-[0.22em] ${
                    light ? "text-white/70" : "text-pine/60"
                }`}
            >
                Supermarket
            </span>
        </span>
    </span>
);

export const LogoLockup = ({ className = "h-24 w-auto" }: { className?: string }) => (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/assets/kabulvan-logo.png" alt="KabulVan Supermarket" className={className} />
);
