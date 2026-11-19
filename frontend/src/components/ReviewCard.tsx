import { Star } from "lucide-react";

export const Stars = () => (
    <div className="flex gap-1.5" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-gold text-gold" />
        ))}
    </div>
);

export const ReviewCard = ({ id, quote, source }: { id: number; quote: string; source: string }) => (
    <blockquote
        data-testid={`review-card-${id}`}
        className="relative flex h-full flex-col rounded-3xl bg-cream p-10 ring-1 ring-black/5 sm:p-14"
    >
        <span
            aria-hidden
            className="pointer-events-none absolute right-10 top-8 font-serif text-8xl leading-none text-gold/30"
        >
            ”
        </span>
        <Stars />
        <p className="mt-8 flex-1 font-serif text-2xl font-medium leading-snug text-charcoal sm:text-3xl">
            “{quote}”
        </p>
        <footer className="mt-10 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pine font-serif text-lg font-semibold text-gold-soft">
                KV
            </span>
            <span>
                <span className="block text-base font-bold text-charcoal">KabulVan Customer</span>
                <span className="mt-0.5 block text-sm font-semibold uppercase tracking-widest text-charcoal/45">
                    {source}
                </span>
            </span>
        </footer>
    </blockquote>
);
