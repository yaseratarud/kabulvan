import { AboutPreview } from "@/components/AboutPreview";
import { DepartmentsPreview } from "@/components/DepartmentsPreview";
import { FeatureBanner } from "@/components/FeatureBanner";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SpecialsPreview } from "@/components/SpecialsPreview";
import { VisitSection } from "@/components/VisitSection";
import { WhyShop } from "@/components/WhyShop";

export default function HomePage() {
    return (
        <>
            <Hero />
            <Intro />
            <DepartmentsPreview />
            <SpecialsPreview />
            <WhyShop />
            <FeatureBanner />
            <ReviewsSection />
            <AboutPreview />
            <VisitSection />
        </>
    );
}
