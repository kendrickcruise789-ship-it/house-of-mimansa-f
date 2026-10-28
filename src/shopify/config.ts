// Shopify Storefront API configuration for House of Mimansa.
//
// The Storefront access token is a PUBLIC token — Shopify designed it for
// browser-side use (unauthenticated scopes only: read products, write carts).
// It is not a secret like an Admin API token. Never put an Admin token here.
//
// To rotate or reissue the token, see README.md ("Shopify setup").
export const SHOPIFY = {
  storeDomain: '1p1uy2-3c.myshopify.com',
  storefrontAccessToken: 'b0c1508eca47495ed8ae1c265b551626',
  apiVersion: '2026-04',
} as const;

export const isShopifyConfigured = (): boolean =>
  Boolean(SHOPIFY.storeDomain && SHOPIFY.storefrontAccessToken);
