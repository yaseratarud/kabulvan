import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { DEPARTMENTS } from "@/lib/data";

export const metadata: Metadata = {
    title: "Departments",
    description:
        "Explore KabulVan Supermarket's departments: fresh halal meat, fresh produce, rice and pantry staples, spices and specialty ingredients, dry fruits and nuts, and fresh baked goods in Surrey, BC.",
    alternates: { canonical: "/departments" },
    openGraph: {
        title: "Departments at KabulVan Supermarket",
        description:
            "Fresh halal meat, produce, rice and pantry, spices, dry fruits and nuts, and fresh baked goods — all under one roof in Surrey, BC.",
        images: [{ url: "/assets/dry-fruits.webp" }],
    },
};

export default function DepartmentsPage() {
    return (
        <>
            <PageHeader
                eyebrow="Departments"
                title="Explore Our Departments"
                subtitle="Everything you need, all in one place — fresh, authentic, and close to home."
            />
            <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10">
                <div className="space-y-20 lg:space-y-28">
                    {DEPARTMENTS.map((dept, i) => (
                        <Reveal key={dept.slug}>
                            <article
                                data-testid={`department-detail-${dept.slug}`}
                                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                            >
                                <div
                                    className={`relative aspect-[16/11] overflow-hidden rounded-3xl shadow-[0_20px_56px_rgba(26,54,32,0.14)] ${
                                        i % 2 === 1 ? "lg:order-2" : ""
                                    }`}
                                >
                                    <Image
                                        src={dept.image}
                                        alt={dept.alt}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                                    <p className="font-serif text-xl font-semibold text-gold">
                                        {String(i + 1).padStart(2, "0")}
                                    </p>
                                    <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-pine sm:text-4xl">
                                        {dept.name}
                                    </h2>
                                    <p className="mt-5 max-w-lg text-base leading-8 text-charcoal/75 md:text-lg">
                                        {dept.description}
                                    </p>
                                    <Link
                                        href="/contact"
                                        data-testid={`department-visit-link-${dept.slug}`}
                                        className="mt-7 inline-flex items-center gap-2 text-base font-bold text-pine transition-colors duration-200 hover:text-gold"
                                    >
                                        Find it in store
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </section>
            <section className="grain-overlay relative bg-pine py-20 lg:py-24">
                <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
                    <Reveal>
                        <h2 className="font-serif text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
                            Looking for Something Specific?
                        </h2>
                        <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/75 md:text-lg">
                            Call us before you visit — our team is happy to help you find the
                            ingredient you're looking for.
                        </p>
                        <Link
                            href="/contact"
                            data-testid="departments-contact-button"
                            className="mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-bold text-pine-deep transition-[transform,background-color] duration-200 hover:scale-[1.03] hover:bg-gold-soft"
                        >
                            Contact KabulVan
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
