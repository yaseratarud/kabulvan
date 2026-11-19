import type { Metadata } from "next";
import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";
import { ContactActions } from "@/components/ContactActions";
import { MapEmbed } from "@/components/MapEmbed";
import { OpenStatus } from "@/components/OpenStatus";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { BUSINESS, IMAGES } from "@/lib/data";

export const metadata: Metadata = {
    title: "Visit & Contact",
    description:
        "Visit KabulVan Supermarket at 6764 King George Blvd, Surrey, BC V3W 4Z5. Open 7 days a week, 10 AM to 9 PM. Call (236) 453-0295.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "Visit KabulVan Supermarket in Surrey, BC",
        description:
            "6764 King George Blvd, Surrey, BC — open daily 10 AM to 9 PM. Call (236) 453-0295.",
        images: [{ url: "/assets/storefront.webp" }],
    },
};

export default function ContactPage() {
    return (
        <>
            <PageHeader
                eyebrow="Contact"
                title="Visit KabulVan"
                subtitle="We're open 7 days a week — stop by the store, give us a call, or find us on the map."
            />
            <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10">
                <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
                    <Reveal>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(26,54,32,0.14)]">
                            <Image
                                src={IMAGES.storefront}
                                alt="KabulVan Supermarket storefront at 6764 King George Blvd, Surrey, BC"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                    </Reveal>
                    <Reveal delay={120}>
                        <OpenStatus />
                        <div className="mt-10 space-y-8">
                            <div className="flex gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pine/5 text-pine">
                                    <MapPin className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="font-serif text-2xl font-semibold text-charcoal">
                                        {BUSINESS.name}
                                    </p>
                                    <p className="mt-1.5 text-base leading-relaxed text-charcoal/70 md:text-lg">
                                        {BUSINESS.addressLine1}
                                        <br />
                                        {BUSINESS.addressLine2}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pine/5 text-pine">
                                    <Phone className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal/45">
                                        Phone
                                    </p>
                                    <a
                                        href={BUSINESS.phoneHref}
                                        data-testid="contact-phone-link"
                                        className="mt-1 block font-serif text-2xl font-semibold text-pine transition-colors duration-200 hover:text-gold"
                                    >
                                        {BUSINESS.phoneDisplay}
                                    </a>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pine/5 text-pine">
                                    <Clock className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal/45">
                                        Hours
                                    </p>
                                    <p className="mt-1.5 text-base leading-relaxed text-charcoal/70 md:text-lg">
                                        {BUSINESS.hoursLine1}
                                        <br />
                                        {BUSINESS.hoursLine2}
                                    </p>
                                    <p className="mt-2 text-base font-semibold text-pine">
                                        Open 7 Days a Week
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            <ContactActions dark={false} />
                        </div>
                    </Reveal>
                </div>
                <Reveal className="mt-16">
                    <div className="overflow-hidden rounded-3xl ring-1 ring-black/5">
                        <MapEmbed className="h-[420px] lg:h-[480px]" />
                    </div>
                </Reveal>
            </section>
        </>
    );
}
