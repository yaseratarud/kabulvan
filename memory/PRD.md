# KabulVan Supermarket — Multi-Page Website PRD

## Original Problem Statement
Premium multi-page business website for KabulVan Supermarket, 6764 King George Blvd, Surrey, BC V3W 4Z5 ((236) 453-0295, open daily 10 AM–9 PM) — Afghan/Persian/Middle Eastern/South Asian/Arabic/Turkish grocery + halal supermarket. Deep green/cream/gold palette, real store photography, vertical reel video hero, production-ready for Vercel deployment.

## Architecture (migrated 2026-08-30)
- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind. No backend needed; `yarn build` passes with all routes prerendered statically — Vercel-ready (auto-detected, no vercel.json needed).
- Scripts: `yarn dev` / `yarn start` → next dev (port 3000), `yarn build` → production build, `yarn serve` → production server.
- Central data: `src/lib/data.ts` — BUSINESS, SOCIALS (real Instagram/Facebook/TikTok), NAV_LINKS, DEPARTMENTS, WEEKLY_SPECIALS (empty by default → elegant "coming soon" empty state; commented example entry shows the shape), REVIEWS, WHY_BENEFITS.
- Reusable components: Navbar (client, active-page state), Footer (compact), Hero, OpenStatus (America/Vancouver), Reveal, SectionHeader, PageHeader, DepartmentCard, SpecialCard, ReviewCard, MapEmbed, ContactActions, VisitSection, Logo/LogoLockup.
- Pages: `/` (hero + all previews), `/about`, `/departments`, `/specials`, `/contact`.
- SEO: per-page metadata (title/description/canonical/OG), one H1 per page, GroceryStore JSON-LD (only verified info — no ratings/priceRange/coordinates), next/font (Cormorant Garamond + Manrope), next/image.
- Assets in `public/assets/`: real photos (storefront, interior-aisle, bakery-case, dry-fruits), kabulvan-reel.mp4 (8.3MB, poster reel-poster.webp), kabulvan-logo.png (full lockup, transparent), kabulvan-mark.png (bag mark), favicon at src/app/icon.png. Originals archived in /app/assets-originals/.

## Implemented 2026-08-30 (v2 refinement)
- New transparent KabulVan logo throughout: navbar (mark + wordmark), footer (full lockup), favicon.
- Hero rebalanced 70% storefront / 30% vertical video (autoplay/muted/loop/playsinline, object-contain, blurred ambient backdrop, preload=metadata + poster); image focal shifted so the storefront sign stays visible.
- Navbar: larger logo/nav text, page-based links, active-page underline, sticky glass→solid behaviour.
- Weekly specials: fake demo prices removed; central typed data structure with empty-state on home preview + /specials page.
- Why Shop at KabulVan redesigned: icon cards removed → editorial numbered list (01–05) + sticky real photo with gold offset frame.
- Reviews enlarged (two genuine Google reviews only); footer compacted; body/small text sizes increased sitewide.
- Converted single page → multi-page routing; homepage buttons deep-link to pages.

## Verified
- `yarn build` passes; all routes static. Screenshots: all 5 pages desktop 1920px, mobile 390px (stacked hero, no horizontal overflow), tablet 834px. No console errors/hydration issues (only benign dev font-preload warnings). Open/closed status renders from Vancouver time; map embed resolves to real KabulVan listing.

## Backlog
- P0: Add real weekly specials to WEEKLY_SPECIALS in src/lib/data.ts.
- P1: Replace 3 remaining stock photos (produce/rice/spices) with real store photos (meat case + housewares photos now real); add exact Google Reviews URL (currently Maps search link).
- P2: Deploy to Vercel production; OG image with logo; multilingual toggle.

## Test Credentials
None — public website, no authentication. See /app/memory/test_credentials.md.
