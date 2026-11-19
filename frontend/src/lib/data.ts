// ============================================================
// KabulVan Supermarket — central content & configuration.
// Business info, navigation, departments, weekly specials,
// reviews, and social links are all edited here.
// ============================================================

export const BUSINESS = {
    name: "KabulVan Supermarket",
    phoneDisplay: "(236) 453-0295",
    phoneHref: "tel:2364530295",
    addressLine1: "6764 King George Blvd",
    addressLine2: "Surrey, BC V3W 4Z5",
    addressFull: "6764 King George Blvd, Surrey, BC V3W 4Z5",
    hoursLine1: "Monday – Sunday",
    hoursLine2: "10:00 AM – 9:00 PM",
    hoursShort: "Open 7 Days a Week · 10 AM – 9 PM",
    openHour: 10,
    closeHour: 21,
    timezone: "America/Vancouver",
    siteUrl: "https://www.kabulvan.ca",
    mapsDirectionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=KabulVan+Supermarket,+6764+King+George+Blvd,+Surrey,+BC+V3W+4Z5",
    mapsEmbedUrl:
        "https://www.google.com/maps?q=KabulVan+Supermarket,+6764+King+George+Blvd,+Surrey,+BC+V3W+4Z5&output=embed",
    googleReviewsUrl:
        "https://www.google.com/maps/search/?api=1&query=KabulVan+Supermarket+Surrey+BC",
};

export const SOCIALS = [
    { label: "Instagram", href: "https://www.instagram.com/kabulvangrocery/?hl=en" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61567731083050" },
    { label: "TikTok", href: "https://www.tiktok.com/@kabulvansupermarket" },
];

export const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Departments", href: "/departments" },
    { label: "Weekly Specials", href: "/specials" },
    { label: "Contact", href: "/contact" },
];

// Real KabulVan photography served from /public/assets
export const IMAGES = {
    storefront: "/assets/storefront.webp",
    interiorAisle: "/assets/interior-aisle.webp",
    bakeryCase: "/assets/bakery-case.webp",
    dryFruits: "/assets/dry-fruits.webp",
    meatCase: "/assets/meat-case.webp",
    housewares: "/assets/housewares.webp",
    reelVideo: "/assets/kabulvan-reel.mp4",
    reelPoster: "/assets/reel-poster.webp",
};

// Placeholder photography for departments without store photos yet.
const STOCK = {
    halalMeat:
        "https://images.pexels.com/photos/10647859/pexels-photo-10647859.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    produce:
        "https://images.unsplash.com/photo-1749999391348-0eb741554ae7?crop=entropy&cs=srgb&fm=jpg&q=80&w=1080",
    rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?crop=entropy&cs=srgb&fm=jpg&q=80&w=1080",
    spices:
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=srgb&fm=jpg&q=80&w=1080",
};

export interface Department {
    slug: string;
    name: string;
    description: string;
    image: string;
    alt: string;
}

export const DEPARTMENTS: Department[] = [
    {
        slug: "fresh-halal-meat",
        name: "Fresh Halal Meat",
        description: "Fresh halal meat prepared with care and personalized butcher service.",
        image: IMAGES.meatCase,
        alt: "Fresh halal meat display case at KabulVan Supermarket in Surrey",
    },
    {
        slug: "fresh-produce",
        name: "Fresh Produce",
        description: "Fresh fruits, vegetables, herbs, and everyday produce.",
        image: STOCK.produce,
        alt: "Fresh fruits and vegetables at KabulVan Supermarket Surrey",
    },
    {
        slug: "rice-pantry",
        name: "Rice & Pantry",
        description:
            "Traditional rice varieties, flour, oils, beans, lentils, sauces, and pantry essentials.",
        image: STOCK.rice,
        alt: "Traditional basmati rice and pantry essentials",
    },
    {
        slug: "spices-specialty",
        name: "Spices & Specialty Ingredients",
        description: "Authentic spices, seasonings, sauces, and specialty ingredients.",
        image: STOCK.spices,
        alt: "Authentic Afghan, Persian and Middle Eastern spices",
    },
    {
        slug: "dry-fruits-nuts",
        name: "Dry Fruits & Nuts",
        description: "Quality dry fruits, nuts, and traditional favourites.",
        image: IMAGES.dryFruits,
        alt: "Dry fruits, nuts and dates on the shelves at KabulVan Supermarket",
    },
    {
        slug: "fresh-baked-goods",
        name: "Fresh Baked Goods",
        description: "Fresh breads and baked favourites.",
        image: IMAGES.bakeryCase,
        alt: "Fresh baked goods and sweets display at KabulVan Supermarket",
    },
    {
        slug: "serving-dishes-housewares",
        name: "Serving Dishes & Housewares",
        description:
            "Traditional serving dishes, tea sets, and housewares for everyday use and special occasions.",
        image: IMAGES.housewares,
        alt: "Traditional serving dishes and housewares at KabulVan Supermarket",
    },
];

// ============================================================
// WEEKLY SPECIALS
// Add each week's deals to the array below — no other changes
// needed; the homepage preview and /specials page update
// automatically. When the array is empty, both show an elegant
// "coming soon" state instead of fake prices.
// ============================================================
export interface Special {
    id: number;
    name: string;
    image: string;
    regularPrice: string;
    salePrice: string;
    unit: string; // e.g. "lb", "kg", "each", "box", "bag"
    category?: string;
    expires?: string;
    badge?: string; // defaults to "Sale"
}

export const WEEKLY_SPECIALS: Special[] = [
    // Example entry — copy, edit, and uncomment:
    // {
    //     id: 1,
    //     name: "Premium Basmati Rice",
    //     image: IMAGES.dryFruits,
    //     regularPrice: "24.99",
    //     salePrice: "18.99",
    //     unit: "bag",
    //     category: "Rice & Pantry",
    //     expires: "While quantities last",
    // },
];

export const REVIEWS = [
    {
        id: 1,
        quote: "Fresh dry fruits and so yummy rice. I hope you guys keep your qualities.",
        source: "Google Review",
    },
    {
        id: 2,
        quote: "Excellent service, products and prices.",
        source: "Google Review",
    },
];

export const WHY_BENEFITS = [
    {
        title: "Fresh & Quality Products",
        text: "Fresh products selected with quality in mind.",
    },
    {
        title: "Halal Meat",
        text: "Fresh halal meat and personalized butcher service.",
    },
    {
        title: "Authentic Selection",
        text: "Products and ingredients from cultures around the world.",
    },
    {
        title: "Fair Prices",
        text: "Everyday value on products families use.",
    },
    {
        title: "Community Focused",
        text: "Proudly serving families throughout Surrey and surrounding communities.",
    },
];
