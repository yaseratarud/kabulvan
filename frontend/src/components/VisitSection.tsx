import { Clock, MapPin, Phone } from "lucide-react";
import { ContactActions } from "@/components/ContactActions";
import { MapEmbed } from "@/components/MapEmbed";
import { OpenStatus } from "@/components/OpenStatus";
import { Reveal } from "@/components/Reveal";
import { BUSINESS } from "@/lib/data";

export const VisitSection = () => {
    return (
        <section data-testid="location-section" className="bg-pine-deep py-24 text-cream lg:py-32">
            <div className="mx-auto max-w-7xl px-6 sm:px-10">
                <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
                    <Reveal>
                        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-gold-soft">
                            Location & Contact
                        </p>
                        <h2 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                            Visit KabulVan
                        </h2>
                        <div className="mt-7">
                            <OpenStatus dark />
                        </div>
                        <div className="mt-10 space-y-8">
                            <div className="flex gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-gold-soft">
                                    <MapPin className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="font-serif text-2xl font-semibold">{BUSINESS.name}</p>
                                    <p className="mt-1.5 text-base leading-relaxed text-cream/75 md:text-lg">
                                        {BUSINESS.addressLine1}
                                        <br />
                                        {BUSINESS.addressLine2}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-gold-soft">
                                    <Phone className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-cream/50">
                                        Phone
                                    </p>
                                    <a
                                        href={BUSINESS.phoneHref}
                                        data-testid="location-phone-link"
                                        className="mt-1 block font-serif text-2xl font-semibold text-cream transition-colors duration-200 hover:text-gold-soft"
                                    >
                                        {BUSINESS.phoneDisplay}
                                    </a>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-gold-soft">
                                    <Clock className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-cream/50">
                                        Hours
                                    </p>
                                    <p className="mt-1.5 text-base leading-relaxed text-cream/85 md:text-lg">
                                        {BUSINESS.hoursLine1}
                                        <br />
                                        {BUSINESS.hoursLine2}
                                    </p>
                                    <p className="mt-2 text-base font-semibold text-gold-soft">
                                        Open 7 Days a Week
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            <ContactActions dark />
                        </div>
                    </Reveal>
                    <Reveal delay={120}>
                        <div className="h-full overflow-hidden rounded-3xl ring-1 ring-white/10">
                            <MapEmbed className="h-full min-h-[420px]" />
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};
