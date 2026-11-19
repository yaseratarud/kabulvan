import { Reveal } from "@/components/Reveal";
import { IMAGES } from "@/lib/data";

export const FeatureBanner = () => {
    return (
        <section
            data-testid="feature-banner-section"
            className="relative flex h-[70vh] min-h-[480px] items-center overflow-hidden"
        >
            <div
                className="absolute inset-0 scale-110 bg-cover bg-center lg:bg-fixed"
                style={{ backgroundImage: `url(${IMAGES.interiorAisle})` }}
                role="img"
                aria-label="Aisles inside KabulVan Supermarket stocked with international groceries"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pine-deep/90 via-pine-deep/60 to-pine-deep/25" />
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
                <Reveal className="max-w-xl">
                    <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-cream sm:text-5xl">
                        More Than a Grocery Store
                    </h2>
                    <p className="mt-6 text-base leading-relaxed text-cream/80 md:text-lg">
                        A place for fresh food, familiar flavours, community, and the ingredients
                        that make home feel closer.
                    </p>
                </Reveal>
            </div>
        </section>
    );
};
