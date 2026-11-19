import { MapPin, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/data";

export const ContactActions = ({ dark = true }: { dark?: boolean }) => (
    <div className="flex flex-wrap gap-4">
        <a
            href={BUSINESS.mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="get-directions-button"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-base font-bold text-pine-deep transition-[transform,background-color] duration-200 hover:scale-[1.03] hover:bg-gold-soft"
        >
            <MapPin className="h-5 w-5" />
            Get Directions
        </a>
        <a
            href={BUSINESS.phoneHref}
            data-testid="call-now-button"
            className={`inline-flex items-center gap-2 rounded-full border px-7 py-4 text-base font-bold transition-[background-color,border-color,color] duration-200 ${
                dark
                    ? "border-cream/35 text-cream hover:border-cream hover:bg-white/10"
                    : "border-pine text-pine hover:bg-pine hover:text-cream"
            }`}
        >
            <Phone className="h-5 w-5" />
            Call Now
        </a>
    </div>
);
