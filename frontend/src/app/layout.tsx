import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { BUSINESS } from "@/lib/data";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    style: ["normal", "italic"],
    variable: "--font-cormorant",
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

const DESCRIPTION =
    "Shop fresh halal meat, Afghan groceries, Persian and Middle Eastern foods, fresh produce, rice, dry fruits, spices, baked goods and more at KabulVan Supermarket in Surrey, BC.";

export const metadata: Metadata = {
    metadataBase: new URL(BUSINESS.siteUrl),
    title: {
        default: "KabulVan Supermarket | Afghan & Halal Grocery Store in Surrey",
        template: "%s | KabulVan Supermarket",
    },
    description: DESCRIPTION,
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        url: "/",
        siteName: BUSINESS.name,
        title: "KabulVan Supermarket | Afghan & Halal Grocery Store in Surrey",
        description: DESCRIPTION,
        images: [
            {
                url: "/assets/storefront.webp",
                width: 765,
                height: 1020,
                alt: "KabulVan Supermarket storefront in Surrey, BC",
            },
        ],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GroceryStore",
    name: BUSINESS.name,
    description:
        "Afghan, Persian, Middle Eastern, South Asian, Arabic and Turkish grocery store in Surrey, BC. Fresh halal meat, produce, rice, dry fruits, nuts, spices and fresh baked goods.",
    image: `${BUSINESS.siteUrl}/assets/storefront.webp`,
    url: BUSINESS.siteUrl,
    telephone: "+1-236-453-0295",
    address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.addressLine1,
        addressLocality: "Surrey",
        addressRegion: "BC",
        postalCode: "V3W 4Z5",
        addressCountry: "CA",
    },
    openingHoursSpecification: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ],
            opens: "10:00",
            closes: "21:00",
        },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
            <body className="bg-cream font-sans text-charcoal antialiased">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
