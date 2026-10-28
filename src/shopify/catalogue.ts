// Maps the live Shopify catalogue onto the Product shape the storefront UI renders.
// Prices arrive in the store's currency (INR); the UI's price model is USD with a
// fixed display rate, so INR is converted at the same 84 INR = 1 USD rate used by
// the currency switcher. Checkout always happens in the store's real currency on
// Shopify's hosted checkout page.
import { Product } from '../types';
import { ALL_COLORS } from '../data/products';
import { fetchProducts, ShopifyProduct, ShopifyVariantRef } from './client';

// Must mirror CURRENCY_CONFIGS.INR.rate in src/data/products.ts.
const INR_PER_USD = 84;

const FALLBACK_HEXES = ['#C9B8A3', '#8A6F5C', '#5C5349', '#A8523C', '#7A6B5D', '#2F6F4E', '#C6934B'];

function colorWithHex(name: string, index: number): { name: string; hex: string } {
  const known = ALL_COLORS.find((c) => c.name.toLowerCase() === name.trim().toLowerCase());
  if (known) return { name: known.name, hex: known.hex };
  return { name: name.trim() || 'Natural', hex: FALLBACK_HEXES[index % FALLBACK_HEXES.length] };
}

const optionValues = (product: ShopifyProduct, wanted: string[]): string[] => {
  const match = product.options.find((o) => wanted.includes(o.name.trim().toLowerCase()));
  return match ? match.optionValues.map((v) => v.name) : [];
};

function mapProduct(node: ShopifyProduct, index: number): Product {
  const variants = node.variants.edges.map((edge) => edge.node);

  const sizes = optionValues(node, ['size']);
  const colorNames = optionValues(node, ['color', 'colour']);

  const effectiveSizes = sizes.length ? sizes : ['Standard'];
  const colors = colorNames.length
    ? colorNames.map((name, i) => colorWithHex(name, i))
    : [{ name: 'Natural', hex: FALLBACK_HEXES[index % FALLBACK_HEXES.length] }];

  const variantRefs: ShopifyVariantRef[] = variants.map((variant) => {
    const sizeOpt = variant.selectedOptions.find((o) => ['size'].includes(o.name.trim().toLowerCase()));
    const colorOpt = variant.selectedOptions.find((o) => ['color', 'colour'].includes(o.name.trim().toLowerCase()));
    return {
      id: variant.id,
      available: variant.availableForSale,
      size: sizeOpt ? sizeOpt.value : 'Standard',
      color: colorOpt ? colorOpt.value : (colors[0]?.name ?? ''),
    };
  });

  const inrPrice = variants.length
    ? Math.min(...variants.map((v) => Number(v.price.amount)))
    : 0;
  const inrCompareAt = variants.length
    ? Math.max(...variants.map((v) => Number(v.compareAtPrice?.amount ?? 0)))
    : 0;

  const stockPerSize: Record<string, number> = {};
  for (const size of effectiveSizes) {
    const refs = variantRefs.filter((r) => r.size === size);
    const anyAvailable = refs.length ? refs.some((r) => r.available) : false;
    stockPerSize[size] = anyAvailable ? 99 : 0;
  }

  const image = node.featuredImage?.url ?? node.images.edges[0]?.node.url ?? '';
  const images = node.images.edges.map((edge) => edge.node.url).filter(Boolean);

  return {
    id: node.id,
    title: node.title,
    category: node.productType?.trim() || 'Dresses',
    price: Math.round((inrPrice / INR_PER_USD) * 100) / 100,
    originalPrice:
      inrCompareAt > inrPrice ? Math.round((inrCompareAt / INR_PER_USD) * 100) / 100 : undefined,
    image,
    images: images.length ? images : [image],
    colors,
    sizes: effectiveSizes,
    stockPerSize,
    description: node.description?.trim() ?? '',
    fabric: 'Organic mulmul',
    craftTechnique: 'Hand-block printed in Jaipur',
    careInstructions: 'Gentle cold hand wash; dry in shade.',
    fitNote: '',
    rating: 0,
    reviewsCount: 0,
    status: 'published',
    isNewArrival: node.tags.some((t) => t.toLowerCase() === 'new'),
    isBestSeller: node.tags.some((t) => t.toLowerCase() === 'bestseller'),
    onSale: inrCompareAt > inrPrice,
    variantRefs,
  };
}

/** Live products from Shopify. Returns an empty array when the store has none published. */
export async function loadShopifyProducts(): Promise<Product[]> {
  const nodes = await fetchProducts(50);
  return nodes.map((node, index) => mapProduct(node, index));
}

/** Resolves the Shopify variant for a chosen size/colour pair. */
export function variantForSelection(product: Product, size: string, colorName: string): ShopifyVariantRef | null {
  const refs = product.variantRefs ?? [];
  if (!refs.length) return null;
  return (
    refs.find((r) => r.size === size && r.color === colorName) ??
    refs.find((r) => r.size === size) ??
    refs[0]
  );
}
