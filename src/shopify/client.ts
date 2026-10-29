// Minimal Shopify Storefront API (GraphQL) client.
// Pinned to the 2026-04 API version. Note: CartPayload error field is `userErrors`
// (the older `cartUserErrors` was removed in 2026-04).
import { SHOPIFY } from './config';

const API_URL = () =>
  `https://${SHOPIFY.storeDomain}/api/${SHOPIFY.apiVersion}/graphql.json`;

export class ShopifyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ShopifyError';
  }
}

export async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(API_URL(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY.storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch {
    throw new ShopifyError('Could not reach the shop. Check your connection.');
  }
  if (!response.ok) {
    throw new ShopifyError(`The shop answered with status ${response.status}.`);
  }
  const json = (await response.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors && json.errors.length > 0) {
    throw new ShopifyError(json.errors.map((e) => e.message).join('; '));
  }
  if (!json.data) {
    throw new ShopifyError('The shop returned an empty answer.');
  }
  return json.data;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariantRef {
  id: string;
  available: boolean;
  size: string;
  color: string;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  featuredImage: { url: string } | null;
  images: { edges: { node: { url: string } }[] };
  options: { name: string; optionValues: { name: string }[] }[];
  variants: {
    edges: {
      node: {
        id: string;
        availableForSale: boolean;
        compareAtPrice: ShopifyMoney | null;
        price: ShopifyMoney;
        selectedOptions: { name: string; value: string }[];
      };
    }[];
  };
}

const PRODUCTS_QUERY = /* GraphQL */ `
  query ShopProducts($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          handle
          title
          description
          productType
          tags
          featuredImage {
            url
          }
          images(first: 6) {
            edges {
              node {
                url
              }
            }
          }
          options {
            name
            optionValues {
              name
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                availableForSale
                compareAtPrice {
                  amount
                  currencyCode
                }
                price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function fetchProducts(first = 50): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] };
  }>(PRODUCTS_QUERY, { first });
  return data.products.edges.map((edge) => edge.node);
}

const BEST_SELLER_ORDER_QUERY = /* GraphQL */ `
  query ShopBestSellers($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

/** Product ids in Shopify's best-selling order (most sold first). */
export async function fetchBestSellerOrder(first = 50): Promise<string[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: { id: string } }[] };
  }>(BEST_SELLER_ORDER_QUERY, { first });
  return data.products.edges.map((edge) => edge.node.id);
}

export interface ShopifyCheckoutLine {
  merchandiseId: string;
  quantity: number;
}

const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation CreateCheckoutCart($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

function isAllowedCheckoutHost(url: URL): boolean {
  const host = url.hostname;
  return (
    host === SHOPIFY.storeDomain ||
    host.endsWith('.myshopify.com') ||
    host.endsWith('.shopify.com') ||
    host === 'checkout.shopify.com' ||
    host === 'shop.app'
  );
}

/** Creates a Shopify cart and returns its hosted checkout URL (never constructed by hand). */
export async function createCheckoutUrl(lines: ShopifyCheckoutLine[]): Promise<string> {
  const data = await shopifyFetch<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string } | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(CART_CREATE_MUTATION, { lines });

  const { cart, userErrors } = data.cartCreate;
  if (userErrors.length > 0) {
    throw new ShopifyError(userErrors.map((e) => e.message).join('; '));
  }
  if (!cart || !cart.checkoutUrl) {
    throw new ShopifyError('The shop did not return a checkout link.');
  }
  const url = new URL(cart.checkoutUrl);
  if (!isAllowedCheckoutHost(url)) {
    throw new ShopifyError('The checkout link did not come from Shopify.');
  }
  return cart.checkoutUrl;
}
