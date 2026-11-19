import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DepartmentCard } from "@/components/DepartmentCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { DEPARTMENTS } from "@/lib/data";

export const DepartmentsPreview = () => {
    return (
        <section data-testid="departments-section" className="bg-white py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 sm:px-10">
                <Reveal>
                    <SectionHeader
                        eyebrow="Departments"
                        title="Explore Our Departments"
                        subtitle="Everything you need, all in one place."
                    />
                </Reveal>
                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {DEPARTMENTS.slice(0, 6).map((dept, i) => (
                        <Reveal key={dept.slug} delay={(i % 3) * 100}>
                            <DepartmentCard dept={dept} />
                        </Reveal>
                    ))}
                </div>
                <Reveal className="mt-12">
                    <Link
                        href="/departments"
                        data-testid="explore-all-departments-button"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-pine px-8 py-4 text-base font-bold text-pine transition-[background-color,color] duration-200 hover:bg-pine hover:text-cream"
                    >
                        Explore All Departments
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
};
