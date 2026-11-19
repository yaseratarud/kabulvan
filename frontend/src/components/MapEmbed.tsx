import { BUSINESS } from "@/lib/data";

export const MapEmbed = ({ className = "" }: { className?: string }) => (
    <iframe
        data-testid="google-map-embed"
        title={`Map of ${BUSINESS.name}, ${BUSINESS.addressFull}`}
        src={BUSINESS.mapsEmbedUrl}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className={`w-full border-0 ${className}`}
    />
);
