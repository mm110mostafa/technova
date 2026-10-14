# آرنوتک (ArnoTech) — فروشگاه تخصصی لپ‌تاپ و لوازم کامپیوتری

A premium, RTL Persian storefront for a laptop & PC-accessories retailer. Its layout follows the **Barsa** reference theme (rtlr.ir/295004) — dark rounded hero with a pill portrait and product card, section headings with gradient-orb eyebrows, category slider, service cards, a "Why?!" about block, showcase slider, product sliders, deal countdown, listing grid, branch hotspot map with counters, a scroll-driven order timeline, FAQ, and a contact form with a map. Branding, copy, and imagery are all new and written for a computer store.

## Tech stack
React 18 · TypeScript · Tailwind CSS · Zustand · Framer Motion · Vite

- **Static hosting (no build):** `index.html` loads `src/runtime/loader.js`. It transpiles the `.ts/.tsx` sources in the browser with Babel, and React, Framer Motion and Zustand load from esm.sh through an import map. Tailwind uses the Play CDN, configured in `tailwind.cdn.js`.
- **Vite (production build):** `npm i && npm run dev` / `npm run build`. `vite.config.ts` replaces the runtime block with `/src/main.tsx` and copies `images/` into `dist/`.

## Design direction
- Palette: midnight navy `ink-900 #0A1230` with an electric amber accent `volt-400 #FFCB24` on a `mist #F4F6FB` canvas. This adapts the reference's navy and yellow to a tech mood.
- Type: Vazirmatn, 300–900.
- Shape language: large radii (1.6–2.5rem), dot-grid and noise textures, glow blooms.
- Motion: staggered entrances, scroll reveals, parallax, layout-animated tabs and pills, spring micro-interactions, page transitions, animated counters, a scroll progress bar, and skeleton image loading. `prefers-reduced-motion` is respected.

## Routes (hash-based)
| URI | Page |
|---|---|
| `#/` | Home (all sections). Section anchors: `categories, services, about, builds, products, deals, best, branches, steps, faq, contact` |
| `#/shop` | Shop. Optional `?cat=laptop\|gaming\|monitor\|gpu\|pc\|memory\|keyboard\|mouse\|audio` and `?q=search` |
| `#/product/{id}` | Product detail (e.g. `helix-g16`, `aero-14`, `vista-34`, `storm-4070`) |
| `#/cart` | Cart and checkout summary (demo order placement) |
| `#/wishlist` | Wishlist |

## Features completed
- Sticky glass header with a mega menu. On mobile: a drawer menu and a bottom tab bar.
- Search overlay: press `/` to open it, results update as you type.
- Quick-view modal, cart drawer with a free-shipping progress bar, and toasts.
- Shop: category chips, brand / price / stock / sale filters, five sort orders, a bottom-sheet filter panel on mobile that can be dragged to close, and an empty state.
- Product page: gallery with hover zoom, colour picker, quantity stepper, tabs (specs, description, reviews), related products, and a sticky buy bar on mobile.
- Cart: quantity changes, coupons (`ARNO10` = 10% off, `WELCOME5` = 5% off), shipping rule (free above 20M toman), and an order success screen.
- The cart, wishlist and coupon are saved in localStorage through Zustand `persist`.

## Data
The catalogue is static in `src/data/catalog.ts`: categories, 13 products, builds, services, steps, FAQs and branches. No backend or table API is used.

## Images
- `images/hero-laptop.png` and `images/p-ultrabook.png` are AI-generated (unbranded) product renders.
- All other images are CC / public-domain photos (PxHere, PickPik, Public Domain Pictures, StockSnap, Flickr CC). Some show brand logos (Acer, Apple, Beats, Cooler Master, Gigabyte). Replace them with your own product photography before going live.

## Not implemented / next steps
- A real payment gateway, user accounts and order tracking. These need a backend.
- Replace demo products and prices with real inventory, ideally loaded from the Table API or a CMS.
- Product comparison and a PC-builder configurator.
- Pre-compile Tailwind with the Vite build for production. The Play CDN shows a console warning.

## Deployment
Use the **Publish** tab to publish the site.
