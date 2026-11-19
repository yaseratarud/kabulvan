import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { BUSINESS, IMAGES } from "@/lib/data";

const ReelVideo = ({ className = "", ambient = false }: { className?: string; ambient?: boolean }) => (
    <video
        data-testid={ambient ? "hero-reel-ambient" : "hero-reel-video"}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={ambient ? undefined : IMAGES.reelPoster}
        aria-hidden={ambient}
        tabIndex={-1}
    >
        <source src={IMAGES.reelVideo} type="video/mp4" />
    </video>
);

export const Hero = () => {
    return (
        <section data-testid="hero-section" className="flex flex-col lg:h-[94vh] lg:min-h-[640px] lg:flex-row">
            <div className="relative flex min-h-[80svh] items-end lg:min-h-0 lg:w-[70%]">
                <Image
                    src={IMAGES.storefront}
                    alt="KabulVan Supermarket storefront on King George Blvd in Surrey, BC — Afghan and halal grocery store"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-cover object-[center_65%]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/25" />
                <div className="hero-stagger relative z-10 w-full max-w-3xl px-6 pb-16 pt-32 sm:px-10 lg:px-16 lg:pb-24 lg:pt-40 xl:px-24">
                    <p className="mb-6 text-sm font-bold uppercase tracking-[0.3em] text-gold-soft">
                        Afghan · Persian · Middle Eastern · South Asian · Turkish
                    </p>
                    <h1 className="font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Authentic Flavours. Fresh Quality. Your Local Market.
                    </h1>
                    <p className="mt-7 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                        Discover authentic Afghan, Persian, Middle Eastern, South Asian, Arabic, and
                        Turkish groceries right here in Surrey. From fresh halal meats and produce to
                        traditional rice, dry fruits, baked goods, spices, and specialty ingredients,
                        KabulVan brings the flavours you know and love closer to home.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <Link
                            href="/contact"
                            data-testid="hero-visit-kabulvan-button"
                            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-bold text-pine-deep transition-[transform,background-color] duration-200 hover:scale-[1.03] hover:bg-gold-soft"
                        >
                            <MapPin className="h-5 w-5" />
                            Visit KabulVan
                        </Link>
                        <Link
                            href="/departments"
                            data-testid="hero-explore-departments-button"
                            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 text-base font-bold text-white transition-[background-color,border-color] duration-200 hover:border-white hover:bg-white/10"
                        >
                            Explore Departments
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                    <p className="mt-9 inline-flex items-center gap-2 text-base font-semibold text-white/85">
                        <Clock className="h-5 w-5 text-gold-soft" />
                        {BUSINESS.hoursShort}
                    </p>
                </div>
            </div>
            <div className="relative h-[72svh] overflow-hidden bg-pine-deep lg:h-auto lg:w-[30%]">
                <ReelVideo ambient className="absolute inset-0 h-full w-full scale-125 object-cover opacity-50 blur-2xl" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 lg:bg-gradient-to-r lg:from-black/40 lg:via-transparent lg:to-transparent" />
                <div className="relative z-10 flex h-full items-center justify-center px-6 py-6 lg:px-5">
                    <ReelVideo className="h-full w-auto max-w-full rounded-2xl object-contain shadow-[0_24px_64px_rgba(0,0,0,0.45)] ring-1 ring-white/15" />
                </div>
            </div>
        </section>
    );
};
