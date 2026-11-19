import Link from "next/link";
import { ArrowRight, Store } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SpecialCard } from "@/components/SpecialCard";
import { WEEKLY_SPECIALS } from "@/lib/data";

export const SpecialsEmptyState = () => (
    <div
        data-testid="specials-empty-state"
        className="flex flex-col items-start gap-5 rounded-3xl bg-white/5 p-10 ring-1 ring-white/10 sm:p-14"
    >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold-soft">
            <Store className="h-7 w-7" strokeWidth={1.8} />
        </span>
        <p className="max-w-xl font-serif text-2xl font-medium leading-snug text-cream sm:text-3xl">
            New weekly specials are coming soon.
        </p>
        <p className="text-base text-cream/70 md:text-lg">
            Visit KabulVan in store for our latest deals.
        </p>
    </div>
);

export const SpecialsPreview = () => {
    const specials = WEEKLY_SPECIALS.slice(0, 6);
    return (
        <section data-testid="specials-section" className="grain-overlay relative bg-pine py-24 lg:py-32">
            <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
                <Reveal>
                    <SectionHeader
                        dark
                        eyebrow="Weekly Specials"
                        title="This Week at KabulVan"
                        subtitle="Fresh deals on the products your family loves."
                    />
                </Reveal>
                <div className="mt-14">
                    {specials.length === 0 ? (
                        <Reveal>
                            <SpecialsEmptyState />
                        </Reveal>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {specials.map((item, i) => (
                                <Reveal key={item.id} delay={(i % 3) * 100}>
                                    <SpecialCard item={item} />
                                </Reveal>
                            ))}
                        </div>
                    )}
                </div>
                <Reveal className="mt-12">
                    <Link
                        href="/specials"
                        data-testid="view-all-specials-button"
                        className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-bold text-pine-deep transition-[transform,background-color] duration-200 hover:scale-[1.03] hover:bg-gold-soft"
                    >
                        View All Specials
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
};
