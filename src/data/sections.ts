import { Product } from '../types';

/**
 * The shop is two rooms: wearable cloth and cloth for the home. Categories are
 * routed to a room here so the navbar, footer, homepage tiles and the catalogue
 * all agree on where a piece belongs.
 */
export type ShopSection = 'clothing' | 'home-living';

export const SHOP_SECTIONS: ShopSection[] = ['clothing', 'home-living'];

interface ShopSectionCopy {
  label: string;
  shortLabel: string;
  eyebrow: string;
  title: string;
  blurb: string;
  countLabel: string;
  emptyHeading: string;
}

export const SHOP_SECTION_COPY: Record<ShopSection, ShopSectionCopy> = {
  clothing: {
    label: 'Clothing',
    shortLabel: 'Clothing',
    eyebrow: 'Handblocked In Bagru · Cut In Small Batches',
    title: 'The Clothing Room.',
    blurb:
      'Wearable pieces in five natural fabrics — dresses, co-ords, kurtas and kaftans. Filter by cloth, size, colour or price and add straight to the bag.',
    countLabel: 'pieces on neutral beige studio forms',
    emptyHeading: 'No Silhouettes Match Your Filters',
  },
  'home-living': {
    label: 'Home & Living',
    shortLabel: 'Living',
    eyebrow: 'Block-Printed By Hand · Woven To Last',
    title: 'The Home & Living Room.',
    blurb:
      'Bedsheets and mats printed and woven on the same tables as our clothing. Filter by cloth, size, colour or price and add straight to the bag.',
    countLabel: 'pieces for the home',
    emptyHeading: 'No Pieces Match Your Filters',
  },
};

export const SALE_CATEGORY = 'Sale';

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

// Apparel is tested first so a mixed name like "Linen Co-ords" stays in Clothing.
const CLOTHING_TERMS = [
  'dress',
  'coord',
  'kurta',
  'kurti',
  'tunic',
  'kaftan',
  'caftan',
  'shirt',
  'top',
  'trouser',
  'pant',
  'skirt',
  'saree',
  'dupatta',
  'stole',
  'jacket',
  'pyjama',
];

const HOME_TERMS = [
  'bedsheet',
  'bedcover',
  'dohar',
  'mat',
  'rug',
  'dhurrie',
  'cushion',
  'napkin',
  'curtain',
  'table',
  'home',
  'gift',
  'decor',
  'linen',
  'throw',
  'basket',
  'runner',
  'pillow',
];

/**
 * Where a category belongs. Sale is sold in both rooms and owner-invented names
 * fall into Clothing unless they read as home textiles.
 */
export function sectionOfCategory(category: string): ShopSection | null {
  if (!category || category === 'All Collections' || category === SALE_CATEGORY) return null;
  const norm = normalize(category);
  if (CLOTHING_TERMS.some((term) => norm.includes(term))) return 'clothing';
  if (HOME_TERMS.some((term) => norm.includes(term))) return 'home-living';
  return 'clothing';
}

export function productInSection(product: Product, section: ShopSection): boolean {
  if (product.category === SALE_CATEGORY) return true;
  return sectionOfCategory(product.category) === section;
}

/** Tabs for one room: All, that room's categories, then the shared Sale rail. */
export function categoriesForSection(categories: string[], section: ShopSection): string[] {
  const scoped = categories.filter(
    (category) =>
      category !== 'All Collections' &&
      category !== SALE_CATEGORY &&
      sectionOfCategory(category) === section,
  );
  const sale = categories.includes(SALE_CATEGORY) ? [SALE_CATEGORY] : [];
  return ['All Collections', ...scoped, ...sale];
}
