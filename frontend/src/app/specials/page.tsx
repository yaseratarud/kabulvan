import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SpecialCard } from "@/components/SpecialCard";
import { SpecialsEmptyState } from "@/components/SpecialsPreview";
import { WEEKLY_SPECIALS } from "@/lib/data";

export const metadata: Metadata = {
    title: "Weekly Specials",
    description:
        "This week's deals at KabulVan Supermarket in Surrey, BC — fresh savings on halal meat, produce, rice, dry fruits, spices, baked goods and more.",
    alternates: { canonical: "/specials" },
    openGraph: {
        title: "Weekly Specials at KabulVan Supermarket",
        description:
            "Fresh deals on the products your family loves — updated weekly at KabulVan Supermarket in Surrey, BC.",
        images: [{ url: "/assets/bakery-case.webp" }],
    },
};

export default function SpecialsPage() {
    const specials = WEEKLY_SPECIALS;
    return (
        <section className="grain-overlay relative min-h-screen bg-pine pb-24 pt-36 lg:pb-32 lg:pt-44">
            <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
                <Reveal>
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-gold-soft">
                        Weekly Specials
                    </p>
                    <h1 className="font-serif text-4xl font-semibold tracking-tight text-cream sm:text-5xl lg:text-6xl">
                        This Week at KabulVan
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/70 md:text-lg">
                        Fresh deals on the products your family loves. Specials are updated weekly —
                        check back often or visit us in store.
                    </p>
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
                <Reveal className="mt-14">
                    <Link
                        href="/contact"
                        data-testid="specials-plan-visit-button"
                        className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-bold text-pine-deep transition-[transform,background-color] duration-200 hover:scale-[1.03] hover:bg-gold-soft"
                    >
                        Plan Your Visit
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}
