# EUROFIT — Performance Nutrition Store

Responsive, original Next.js storefront for Eurofit. Lime + charcoal athletic identity inspired by the Eurofit horizontal logo created in this conversation. Written in TypeScript and CSS, with **24 illustrative listings** spanning six categories.

## Included
- Mobile-friendly landing page, searchable/sortable category catalog, 24 individual product pages, related products
- Cart with browser-local storage, stock-capped quantities, estimates and checkout UI
- Accessible navigation, SEO metadata, custom brand-inspired illustrations, responsive design
- Paystack checkout scaffold with server-validated cart pricing, PostgreSQL orders, signed payment webhook and order status page
- About, Contact, FAQs, shipping, returns, privacy and terms **drafts**
- All products, prices, ratings, stock, images/packaging are fictional previews until merchant-verified

## Running locally

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Use `npm run build` to confirm production readiness once dependencies are installed.

## Deployment (GitHub → Vercel)

1. Create a **new repository** named `eurofit-store`. Do not overwrite unrelated existing repos.
2. Push the contents of this folder to its `main` branch.
3. In Vercel, **Add New Project → Import** the GitHub repo, Framework `Next.js`, Root `/`.
4. Set `NEXT_PUBLIC_SITE_URL` to the assigned production domain (must start `https://`).
5. Deploy. Leave `ENABLE_LIVE_CHECKOUT` and `CATALOG_VERIFIED` unset to keep all payments OFF.

## Launch requirements — do not skip

- Replace `lib/products.ts` with an **actual catalog**: supplier-confirmed SKUs, manufacturer-approved photos, ingredient panels, allergens, warnings, stock, retail prices and supplier provenance.
- Replace illustration packshots with actual product images and remove all sample reviews, ratings, and unverified claims.
- Confirm operating country, currency, tax/invoicing, shipping zones and legal business identity. Current KES settings are provisional and not confirmed.
- Finalize the support phone/email, Privacy Policy, Terms, Returns and Shipping pages with legally reviewed business-specific policies.
- Create a PostgreSQL/Neon database and run `database/schema.sql`; set `DATABASE_URL` securely.
- Create a Paystack merchant account authorized for the relevant region and currency. Set `PAYSTACK_SECRET_KEY` in Vercel environment variables. Set its webhook to `https://your-domain/api/paystack/webhook`, verify signature and events with test transactions.
- Complete **real stock reservation and concurrency control, fulfilment/admin workflow, payment reconciliation, fraud review, refund process, delivery integration, tax invoices, analytics and monitoring** before opening the site for genuine orders.
- Only after verified catalog, DB, operational infrastructure and end-to-end payment tests, explicitly set both `ENABLE_LIVE_CHECKOUT=true` and `CATALOG_VERIFIED=true` in Vercel. With the current sample data these must remain **OFF**.
- Add custom domain and configure DNS/HTTPS in Vercel when available.

## Security design

Prices and shipping are **recomputed server-side** from a fixed catalog in `lib/checkout.ts` instead of trusting client totals. Checkout is off by default. Webhook signature is checked with HMAC SHA-512 and timing-safe comparison. Orders are recorded before payment initialization. Paid status is set only by a verified Paystack `charge.success` webhook that matches the transaction amount and currency. The public order lookup returns status and reference, not personal information. Secrets belong only in Vercel environment variables, never in git.

## Important caveats

This is a strong storefront design and integration scaffold, **not a launched retail operation**. Static code is not a substitute for a merchant catalogue, validated transactions, an order-fulfilment workflow, product compliance reviews and customer support. The user must provide merchant details before production sales are enabled.
