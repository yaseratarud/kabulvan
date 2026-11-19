import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { IMAGES } from "@/lib/data";

export const AboutPreview = () => {
    return (
        <section data-testid="about-section" className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:py-32">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <Reveal className="order-2 lg:order-1">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-[0_16px_48px_rgba(26,54,32,0.12)]">
                            <Image
                                src={IMAGES.dryFruits}
                                alt="Dry fruits, nuts and dates at KabulVan Supermarket Surrey"
                                fill
                                sizes="(max-width: 1024px) 50vw, 25vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-3xl shadow-[0_16px_48px_rgba(26,54,32,0.12)]">
                            <Image
                                src={IMAGES.bakeryCase}
                                alt="Fresh baked goods and traditional sweets at KabulVan Supermarket"
                                fill
                                sizes="(max-width: 1024px) 50vw, 25vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </Reveal>
                <Reveal delay={120} className="order-1 lg:order-2">
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-gold">
                        About KabulVan
                    </p>
                    <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-pine sm:text-5xl">
                        Authentic Food. Local Community.
                    </h2>
                    <p className="mt-8 text-base leading-8 text-charcoal/75 md:text-lg md:leading-9">
                        KabulVan Supermarket brings together authentic groceries, fresh ingredients,
                        halal meats, baked goods, produce, and specialty products from cultures across
                        Afghanistan, Persia, the Middle East, South Asia, Türkiye, and beyond.
                    </p>
                    <p className="mt-6 text-base leading-8 text-charcoal/75 md:text-lg md:leading-9">
                        We believe shopping for food should feel familiar, welcoming, and convenient.
                        Whether you're preparing a traditional family meal, shopping for everyday
                        essentials, or looking for a hard-to-find ingredient from home, KabulVan is
                        here to help.
                    </p>
                    <Link
                        href="/about"
                        data-testid="learn-more-about-button"
                        className="mt-10 inline-flex items-center gap-2 rounded-full border-2 border-pine px-8 py-4 text-base font-bold text-pine transition-[background-color,color] duration-200 hover:bg-pine hover:text-cream"
                    >
                        Learn More About KabulVan
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
};
