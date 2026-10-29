import React, { useState } from 'react';
import type { Product } from '../../types';
import { categoryLabel, IMAGES } from '../../data/products';
import { resolveImage } from '../../shop/schema';
import { SafeImage } from '../SafeImage';
import { Reveal } from '../Reveal';
import { ArrowRight } from 'lucide-react';

const ACCORDION_CATEGORIES = [
  'Dresses',
  'Co-ords',
  'Kurtas & Tunics',
  'Kaftans',
  'Bedsheets',
  'Mats',
  'Home',
  'Gifts',
  'Sale',
];

// Category faces used until the Shopify catalogue has published pieces, so the
// board still introduces the shelves instead of vanishing from the homepage.
const PLACEHOLDER_FACES: { category: string; image: string }[] = [
  { category: 'Dresses', image: IMAGES.mannequinDress },
  { category: 'Co-ords', image: IMAGES.mannequinCoord },
  { category: 'Kurtas & Tunics', image: IMAGES.mannequinKurta },
  { category: 'Kaftans', image: IMAGES.mannequinKaftan },
  { category: 'Bedsheets', image: IMAGES.bedsheet },
  { category: 'Home', image: IMAGES.homeCushion },
  { category: 'Gifts', image: IMAGES.gifts },
  { category: 'Sale', image: IMAGES.sale },
];

export interface FeaturedBoardProps {
  products: Product[];
  /** Jumps to the shop filtered to a category. */
  onShopCategory: (category: string) => void;
  onGoToClothing: () => void;
}

interface Collection {
  category: string;
  label: string;
  count: number;
  image: string;
  title: string;
  placeholder?: boolean;
}

function buildCollections(products: Product[]): Collection[] {
  const collections: Collection[] = [];
  for (const category of ACCORDION_CATEGORIES) {
    const items = products.filter((p) => p.category === category);
    if (items.length === 0) continue;
    const face = items.find((p) => p.isNewArrival) ?? items[0];
    collections.push({
      category,
      label: categoryLabel(category),
      count: items.length,
      image: resolveImage(face.image),
      title: face.title,
    });
  }
  if (collections.length > 0) return collections;
  return PLACEHOLDER_FACES.map(({ category, image }) => ({
    category,
    label: categoryLabel(category),
    count: 0,
    image,
    title: '',
    placeholder: true,
  }));
}

/**
 * Expanding accordion gallery — one panel per category collection.
 * The hovered/focused panel widens while the rest compress; each panel jumps
 * to its own filtered collection.
 */
export const FeaturedBoard: React.FC<FeaturedBoardProps> = ({
  products,
  onShopCategory,
  onGoToClothing,
}) => {
  const collections = React.useMemo(() => buildCollections(products), [products]);
  const [active, setActive] = useState(0);

  if (collections.length === 0) return null;

  const safeActive = Math.min(active, collections.length - 1);

  return (
    <section
      aria-label="Shop by collection"
      className="relative overflow-hidden bg-[#F7F3ED] border-b border-[#EDE6DC] py-14 lg:py-20"
    >
      {/* Accordion-scoped keyframes; the shared motion layer stays untouched. */}
      <style>{`
        .clotex-acc-panel {
          transition: flex 750ms cubic-bezier(0.22, 0.9, 0.28, 1);
        }
        @keyframes clotex-acc-zoom {
          from { transform: scale(1.02); }
          to   { transform: scale(1.1); }
        }
        .clotex-acc-zoom {
          animation: clotex-acc-zoom 12s ease-in-out infinite alternate;
        }
        @media (prefers-reduced-motion: reduce) {
          .clotex-acc-panel { transition-duration: 0.001s; }
          .clotex-acc-zoom { animation: none; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        <Reveal variant="fade" className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 md:mb-8">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#C6934B] font-medium">
              The Board · Pulled From Today&apos;s Catalogue
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1B18] tracking-tight">
              On The Cutting Table
            </h2>
          </div>
          <button
            type="button"
            onClick={onGoToClothing}
            className="group self-start sm:self-auto px-6 py-3 border border-[#3C352D] text-[11px] uppercase tracking-[0.2em] font-medium text-[#1E1B18] hover:bg-[#1E1B18] hover:text-[#FDFBF7] transition-colors flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6934B]"
          >
            <span>Browse Everything</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>

        {/* Desktop: expanding accordion */}
        <Reveal variant="wipe" delay={120} className="hidden md:block">
          <div
            className="flex h-[29rem] lg:h-[31rem] gap-2"
            onMouseLeave={() => setActive(0)}
          >
            {collections.map((c, i) => {
              const isActive = i === safeActive;
              return (
                <button
                  key={c.category}
                  type="button"
                  onClick={() => onShopCategory(c.category)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-label={
                    c.placeholder
                      ? `Browse the ${c.label} shelf`
                      : `View the ${c.label} collection, ${c.count} pieces`
                  }
                  aria-expanded={isActive}
                  className={`clotex-acc-panel group relative overflow-hidden border border-[#EDE6DC] bg-[#EDE6DC] shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6934B] ${
                    isActive ? 'flex-[3.4]' : 'flex-[1]'
                  }`}
                >
                  <SafeImage
                    src={c.image}
                    alt={c.title || c.label}
                    category={c.category}
                    fallbackLabel={c.label}
                    className={`h-full w-full object-cover transition-[filter,transform] duration-700 ${
                      isActive ? '' : 'brightness-[.82] saturate-[.9]'
                    } ${isActive ? 'clotex-acc-zoom' : ''}`}
                  />
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-700 ${
                      isActive ? 'opacity-100' : 'opacity-70'
                    }`}
                  />

                  {/* Inactive: vertical label */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-6 mx-auto w-fit [writing-mode:vertical-rl] rotate-180 text-[11px] uppercase tracking-[0.25em] text-white/95 transition-opacity duration-300 ${
                      isActive ? 'opacity-0' : 'opacity-100 delay-300'
                    }`}
                  >
                    {c.label}
                  </span>

                  {/* Active: full caption + view-all pill (remount replays the wipe) */}
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 p-6 text-left">
                      <span className="block clotex-fade-up space-y-1.5">
                        <span className="block text-[10px] uppercase tracking-[0.25em] text-[#E8DDD1]">
                          {c.placeholder ? 'Hand-blocked in Bagru · New pieces on the loom' : `${c.count} pieces · ${c.title}`}
                        </span>
                        <span className="block font-serif text-2xl lg:text-3xl text-white leading-tight">
                          {c.label}
                        </span>
                        <span className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 bg-[#FDFBF7] text-[#1E1B18] text-[10px] uppercase tracking-[0.2em] font-semibold group-hover:bg-[#C6934B] transition-colors">
                          <span>View All</span>
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Mobile: stacked collection tiles */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {collections.map((c, i) => (
            <Reveal key={c.category} variant="pop" delay={i * 70}>
              <button
                type="button"
                onClick={() => onShopCategory(c.category)}
                className="relative w-full aspect-[3/4] overflow-hidden border border-[#EDE6DC] bg-[#EDE6DC] text-left shadow-sm active:scale-[0.98] transition-transform"
              >
                <SafeImage
                  src={c.image}
                  alt={c.title || c.label}
                  category={c.category}
                  fallbackLabel={c.label}
                  className="h-full w-full object-cover"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-3 space-y-1">
                  <span className="block font-serif text-base text-white leading-tight">{c.label}</span>
                  <span className="block text-[9px] uppercase tracking-[0.2em] text-[#E8DDD1]">
                    {c.placeholder ? 'New pieces on the loom' : `${c.count} pieces`}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBoard;
