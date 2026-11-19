import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { IMAGES } from "@/lib/data";

export const Intro = () => {
    return (
        <section data-testid="intro-section" className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:py-32">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <Reveal>
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-gold">
                        Welcome to KabulVan
                    </p>
                    <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-pine sm:text-5xl">
                        A Taste of Home in Surrey
                    </h2>
                    <p className="mt-8 text-base leading-8 text-charcoal/75 md:text-lg md:leading-9">
                        At KabulVan Supermarket, food is about more than groceries — it's about
                        family, culture, and community. We bring together familiar ingredients,
                        authentic flavours, fresh products, and everyday essentials from Afghanistan,
                        Persia, the Middle East, South Asia, Türkiye, and beyond.
                    </p>
                    <p className="mt-6 text-base leading-8 text-charcoal/75 md:text-lg md:leading-9">
                        Our goal is simple: fresh products, authentic selection, fair prices, and
                        welcoming service.
                    </p>
                </Reveal>
                <Reveal delay={150}>
                    <div className="relative">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(26,54,32,0.14)]">
                            <Image
                                src={IMAGES.interiorAisle}
                                alt="Inside KabulVan Supermarket — aisles of international groceries in Surrey"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-4 rounded-2xl bg-pine px-6 py-4 text-cream shadow-[0_16px_40px_rgba(18,36,22,0.3)] sm:-left-8">
                            <p className="font-serif text-2xl font-semibold text-gold-soft">Open 7 Days</p>
                            <p className="text-xs font-semibold uppercase tracking-widest text-cream/70">
                                10 AM – 9 PM
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
