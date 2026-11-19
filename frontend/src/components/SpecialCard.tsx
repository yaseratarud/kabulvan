import Image from "next/image";
import { BadgePercent } from "lucide-react";
import type { Special } from "@/lib/data";

export const SpecialCard = ({ item }: { item: Special }) => (
    <article
        data-testid={`special-card-${item.id}`}
        className="group overflow-hidden rounded-3xl bg-white shadow-[0_8px_32px_rgba(26,54,32,0.07)] ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(26,54,32,0.14)]"
    >
        <div className="relative aspect-[4/3] overflow-hidden">
            <Image
                src={item.image}
                alt={`${item.name} on special at KabulVan Supermarket`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-sm font-extrabold uppercase tracking-wider text-pine-deep">
                <BadgePercent className="h-4 w-4" />
                {item.badge ?? "Sale"}
            </span>
        </div>
        <div className="p-7">
            {item.category && (
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-pine/50">
                    {item.category}
                </p>
            )}
            <h3 className="mt-2 font-serif text-2xl font-semibold text-charcoal">{item.name}</h3>
            <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-pine">
                    ${item.salePrice}
                    <span className="ml-1 text-base font-semibold text-charcoal/50">
                        / {item.unit}
                    </span>
                </span>
                <span className="text-base font-semibold text-charcoal/40 line-through">
                    ${item.regularPrice}
                </span>
            </div>
            {item.expires && (
                <p className="mt-3 text-sm font-semibold text-charcoal/45">{item.expires}</p>
            )}
        </div>
    </article>
);
