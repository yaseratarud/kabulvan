import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { IMAGES, WHY_BENEFITS } from "@/lib/data";

export const WhyShop = () => {
    return (
        <section data-testid="why-shop-section" className="bg-white py-24 lg:py-32">
            <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 lg:grid-cols-[5fr_6fr] lg:gap-20">
                <Reveal className="self-start lg:sticky lg:top-28">
                    <div className="relative">
                        <div
                            aria-hidden
                            className="absolute -left-4 -top-4 h-full w-full rounded-3xl border-2 border-gold/40"
                        />
                        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(26,54,32,0.16)]">
                            <Image
                                src={IMAGES.dryFruits}
                                alt="Shelves of dry fruits, nuts and dates inside KabulVan Supermarket"
                                fill
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 right-5 rounded-2xl bg-pine px-6 py-4 shadow-[0_16px_40px_rgba(18,36,22,0.3)]">
                            <p className="font-serif text-xl font-semibold text-gold-soft">
                                Proudly serving Surrey
                            </p>
                            <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-cream/70">
                                Fresh · Authentic · Local
                            </p>
                        </div>
                    </div>
                </Reveal>
                <div>
                    <Reveal>
                        <SectionHeader eyebrow="Why KabulVan" title="Why Shop at KabulVan?" />
                    </Reveal>
                    <ol className="mt-10">
                        {WHY_BENEFITS.map((benefit, i) => (
                            <Reveal key={benefit.title} delay={i * 80}>
                                <li
                                    data-testid={`benefit-${benefit.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                                    className="group flex gap-7 border-t border-pine/10 py-8 last:border-b"
                                >
                                    <span className="font-serif text-2xl font-semibold leading-none text-gold transition-colors duration-300 group-hover:text-pine sm:text-3xl">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div>
                                        <h3 className="font-serif text-2xl font-semibold text-charcoal transition-colors duration-300 group-hover:text-pine sm:text-[1.7rem]">
                                            {benefit.title}
                                        </h3>
                                        <p className="mt-2.5 max-w-md text-base leading-relaxed text-charcoal/65 md:text-lg">
                                            {benefit.text}
                                        </p>
                                    </div>
                                </li>
                            </Reveal>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
};
