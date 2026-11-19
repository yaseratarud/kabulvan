import { Reveal } from "@/components/Reveal";
import { ReviewCard } from "@/components/ReviewCard";
import { SectionHeader } from "@/components/SectionHeader";
import { BUSINESS, REVIEWS } from "@/lib/data";

export const ReviewsSection = () => {
    return (
        <section data-testid="reviews-section" className="bg-white py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 sm:px-10">
                <Reveal>
                    <SectionHeader eyebrow="Reviews" title="What Our Customers Say" />
                </Reveal>
                <div className="mt-14 grid gap-8 lg:grid-cols-2">
                    {REVIEWS.map((review, i) => (
                        <Reveal key={review.id} delay={i * 120}>
                            <ReviewCard
                                id={review.id}
                                quote={review.quote}
                                source={review.source}
                            />
                        </Reveal>
                    ))}
                </div>
                <Reveal className="mt-12">
                    <a
                        href={BUSINESS.googleReviewsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="view-google-reviews-button"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-pine px-8 py-4 text-base font-bold text-pine transition-[background-color,color] duration-200 hover:bg-pine hover:text-cream"
                    >
                        View Google Reviews
                    </a>
                </Reveal>
            </div>
        </section>
    );
};
