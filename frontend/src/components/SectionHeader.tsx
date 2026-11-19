export const SectionHeader = ({
    eyebrow,
    title,
    subtitle,
    dark = false,
}: {
    eyebrow: string;
    title: string;
    subtitle?: string;
    dark?: boolean;
}) => (
    <div>
        <p
            className={`mb-4 text-sm font-bold uppercase tracking-[0.3em] ${
                dark ? "text-gold-soft" : "text-gold"
            }`}
        >
            {eyebrow}
        </p>
        <h2
            className={`font-serif text-4xl font-semibold tracking-tight sm:text-5xl ${
                dark ? "text-cream" : "text-pine"
            }`}
        >
            {title}
        </h2>
        {subtitle && (
            <p className={`mt-5 text-base md:text-lg ${dark ? "text-cream/70" : "text-charcoal/70"}`}>
                {subtitle}
            </p>
        )}
    </div>
);
