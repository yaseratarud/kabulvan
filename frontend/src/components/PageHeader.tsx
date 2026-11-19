export const PageHeader = ({
    eyebrow,
    title,
    subtitle,
}: {
    eyebrow: string;
    title: string;
    subtitle?: string;
}) => (
    <div className="bg-cream pb-16 pt-36 lg:pb-20 lg:pt-44">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
            <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight text-pine sm:text-5xl lg:text-6xl">
                {title}
            </h1>
            {subtitle && (
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-charcoal/70 md:text-lg">
                    {subtitle}
                </p>
            )}
        </div>
    </div>
);
