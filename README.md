# House of Mimansa

Handcrafted women's slow-fashion storefront. React 19 + Vite + TypeScript + Tailwind CSS v4,
selling directly from a Shopify store through the Storefront API.

## How selling works

```
Shopify Admin (products, variants, stock, orders)
        │  Storefront API (public token, read products / create cart)
        ▼
This site (home, clothing, home & living, filters, product detail, bag)
        │  cart checkoutUrl
        ▼
Shopify hosted checkout (shipping, discounts, payment, order confirmation)
```

- The shop grid and product pages are built from **live Shopify products**. There is no local
  product data to keep in sync.
- The bag stores product ids, sizes and colours; prices always come from the live catalogue.
- "Proceed to Secure Checkout" hands the bag to **Shopify's hosted checkout** — all shipping,
  tax, discount and payment steps happen on Shopify. No payment form exists in this codebase.
- If the store has no products, the shop shows "New Pieces Are On The Loom" instead of failing.
- Products are managed entirely in **Shopify Admin**; this site has no admin panel.

### Shopify configuration

`src/shopify/config.ts`:

```ts
export const SHOPIFY = {
  storeDomain: '1p1uy2-3c.myshopify.com',
  storefrontAccessToken: '<public Storefront API token>',
  apiVersion: '2026-04',
};
```

The Storefront access token is public by design (it can only read the published catalogue and
create carts). Never put an **Admin API** token or app secret in this file — those belong on a
server only. To rotate the token, create a new Storefront token in the Shopify Dev Dashboard and
replace the value above.

Products must be **published to the Storefront API channel** in Shopify Admin to appear here.

The shop has two rooms, and a product's **type** decides which one it lands in:

| Room           | Product types                                                                |
| -------------- | ---------------------------------------------------------------------------- |
| Clothing       | `Dresses`, `Co-ords`, `Kurtas & Tunics`, `Kaftans` (and any other apparel)    |
| Home & Living  | `Bedsheets`, `Mats`, `Home`, `Gifts`                                         |

If the type is left blank, the site reads the title (bedsheet, mat, rug, cushion, curtain …) and
files it under Home & Living; anything else defaults to Clothing.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build into dist/ (+ 404.html fallback)
npm run lint     # type-check
```

## Deployment (GitHub Pages)

`dist/` is committed and deployed by `.github/workflows/deploy-pages.yml` on every push to
`main`. In the repo: **Settings → Pages → Source: GitHub Actions**.

For a custom domain, add DNS records at the registrar, then set the domain under
**Settings → Pages → Custom domain** and enable **Enforce HTTPS**:

| Type  | Name | Value                      |
| ----- | ---- | -------------------------- |
| CNAME | www  | `<user>.github.io`         |
| A     | @    | 185.199.108.153            |
| A     | @    | 185.199.109.153            |
| A     | @    | 185.199.110.153            |
| A     | @    | 185.199.111.153            |

Checkout stays on the store's `myshopify.com` domain — that is expected with Shopify hosted
checkout.
