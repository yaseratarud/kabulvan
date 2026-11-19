import Image from "next/image";
import type { Department } from "@/lib/data";

export const DepartmentCard = ({ dept }: { dept: Department }) => (
    <figure
        data-testid={`department-card-${dept.slug}`}
        className="group relative aspect-[4/5] overflow-hidden rounded-3xl"
    >
        <Image
            src={dept.image}
            alt={dept.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/90" />
        <figcaption className="absolute inset-x-0 bottom-0 p-8 transition-transform duration-500 group-hover:-translate-y-1.5">
            <h3 className="font-serif text-2xl font-semibold text-white">{dept.name}</h3>
            <p className="mt-2 text-base leading-relaxed text-white/80">{dept.description}</p>
        </figcaption>
    </figure>
);
