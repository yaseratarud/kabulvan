import type { Metadata } from "next";
import Image from "next/image";
import { ContactActions } from "@/components/ContactActions";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { IMAGES } from "@/lib/data";

export const metadata: Metadata = {
    title: "About",
    description:
        "KabulVan Supermarket is a community grocery store in Surrey, BC bringing authentic Afghan, Persian, Middle Eastern, South Asian, Arabic and Turkish foods closer to home.",
    alternates: { canonical: "/about" },
    openGraph: {
        title: "About KabulVan Supermarket",
        description:
            "Authentic food, local community — the story of KabulVan Supermarket in Surrey, BC.",
        images: [{ url: "/assets/interior-aisle.webp" }],
    },
};

const OFFERINGS = [
    "Fresh Halal Meat",
    "Fresh Produce",
    "Rice",
    "Dry Fruits",
    "Nuts",
    "Spices",
    "Fresh Baked Goods",
    "Afghan Groceries",
    "Persian Groceries",
    "Middle Eastern Groceries",
    "South Asian Groceries",
    "Arabic Products",
    "Turkish Products",
    "Specialty Ingredients",
    "Pantry Essentials",
];

export default function AboutPage() {
    return (
        <>
            <PageHeader
                eyebrow="About KabulVan"
                title="Authentic Food. Local Community."
                subtitle="A neighbourhood supermarket bringing the flavours of home to Surrey, BC."
            />
            <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <Reveal>
                        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(26,54,32,0.14)] sm:aspect-[4/3] lg:aspect-[4/5]">
                            <Image
                                src={IMAGES.storefront}
                                alt="KabulVan Supermarket storefront on King George Blvd, Surrey"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                    </Reveal>
                    <Reveal delay={120}>
                        <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-pine sm:text-4xl">
                            Food, Family, and Familiar Flavours
                        </h2>
                        <p className="mt-7 text-base leading-8 text-charcoal/75 md:text-lg md:leading-9">
                            At KabulVan Supermarket, food is about more than groceries — it's about
                            family, culture, and community. We bring together familiar ingredients,
                            authentic flavours, fresh products, and everyday essentials from
                            Afghanistan, Persia, the Middle East, South Asia, Türkiye, and beyond.
                        </p>
                        <p className="mt-6 text-base leading-8 text-charcoal/75 md:text-lg md:leading-9">
                            We believe shopping for food should feel familiar, welcoming, and
                            convenient. Whether you're preparing a traditional family meal, shopping
                            for everyday essentials, or looking for a hard-to-find ingredient from
                            home, KabulVan is here to help.
                        </p>
                        <p className="mt-6 text-base leading-8 text-charcoal/75 md:text-lg md:leading-9">
                            Our goal is simple: fresh products, authentic selection, fair prices, and
                            welcoming service — for every family we serve in Surrey and the
                            surrounding communities.
                        </p>
                    </Reveal>
                </div>
            </section>
            <section className="bg-white py-24">
                <div className="mx-auto max-w-7xl px-6 sm:px-10">
                    <Reveal>
                        <h2 className="font-serif text-3xl font-semibold tracking-tight text-pine sm:text-4xl">
                            What You'll Find at KabulVan
                        </h2>
                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal/70 md:text-lg">
                            From everyday staples to the specialty ingredients that make a meal taste
                            like home.
                        </p>
                    </Reveal>
                    <Reveal delay={120}>
                        <ul className="mt-10 flex flex-wrap gap-3">
                            {OFFERINGS.map((item) => (
                                <li
                                    key={item}
                                    className="rounded-full bg-pine/5 px-5 py-2.5 text-base font-semibold text-pine ring-1 ring-pine/10"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </section>
            <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { src: IMAGES.interiorAisle, alt: "Aisles of groceries inside KabulVan Supermarket" },
                        { src: IMAGES.dryFruits, alt: "Dry fruits, nuts and dates at KabulVan Supermarket" },
                        { src: IMAGES.bakeryCase, alt: "Fresh baked goods and sweets at KabulVan Supermarket" },
                        { src: IMAGES.housewares, alt: "Traditional serving dishes and housewares at KabulVan Supermarket" },
                    ].map((photo, i) => (
                        <Reveal key={photo.src} delay={i * 100}>
                            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_16px_48px_rgba(26,54,32,0.12)]">
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover"
                                />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
            <section className="grain-overlay relative bg-pine py-20 lg:py-24">
                <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
                    <Reveal>
                        <h2 className="font-serif text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
                            Come Say Hello
                        </h2>
                        <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/75 md:text-lg">
                            We're open 7 days a week from 10 AM to 9 PM. Stop by the store, give us a
                            call, or find us on the map — we'd love to see you.
                        </p>
                        <div className="mt-9">
                            <ContactActions dark />
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
