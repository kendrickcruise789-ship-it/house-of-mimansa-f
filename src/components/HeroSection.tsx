import React from 'react';
import { Product } from '../types';
import { HERO_IMAGE } from '../data/products';
import { resolveImage } from '../shop/schema';
import { SafeImage } from './SafeImage';
import { AnimatedHeadline } from './AnimatedHeadline';
import { Reveal } from './Reveal';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onShopClick: () => void;
  onCraftClick: () => void;
  /** Newest arrival, shown flush right with its backdrop extended behind the copy. */
  product?: Product;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopClick,
  onCraftClick,
  product,
}) => {
  const heroImage = product ? resolveImage(product.image) : HERO_IMAGE;
  const heroTitle = product?.title ?? 'New Arrivals';
  const heroCategory = product?.category ?? 'Dresses';

  return (
    /* On phones and small laptops the copy sits below the photo; from xl up the
       copy overlays the left of the photo, exactly like the reference layout. */
    <section className="relative overflow-hidden bg-[#EDE6DC] xl:h-[78vh] xl:max-h-[840px] xl:min-h-[620px]">
      {/* Photo stack: a clean tan backdrop extends the studio photo's own tones
          to the left edge while the garment stays whole and flush right. */}
      <Reveal
        variant="wipe"
        delay={220}
        className="relative h-[58vh] min-h-[380px] sm:h-[54vh] xl:absolute xl:inset-0 xl:h-full xl:min-h-0"
      >
        <div className="absolute inset-0">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#AE8D66] via-[#C7A57F] via-45% to-[#D6B893]"
          />
          {/* Foreground sits in a box exactly as wide as the photo, so the
              feather mask fades its own left edge into the backdrop */}
          <div className="absolute inset-0 flex items-center justify-end">
            <SafeImage
              src={heroImage}
              alt={`New arrival — ${heroTitle}`}
              loading="eager"
              category={heroCategory}
              fallbackLabel={heroTitle}
              className="max-h-full max-w-full object-contain origin-right clotex-hero-kenburns"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 14%)',
                maskImage: 'linear-gradient(to right, transparent 0%, black 14%)',
              }}
            />
          </div>
          {/* Gentle floor grounding so the base of the set stays continuous */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[14%] bg-gradient-to-t from-black/15 to-transparent"
          />

          {/* Editorial tag for the photographed piece */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
            <Reveal variant="fade" delay={900}>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/90 bg-black/35 backdrop-blur-sm px-4 py-2 border border-white/20">
                Now Showing · {heroTitle}
              </p>
            </Reveal>
          </div>
        </div>
      </Reveal>

      {/* Copy: below the photo on small screens, overlaid at xl */}
      <div className="relative xl:absolute xl:inset-0 xl:flex xl:items-center">
        <div className="w-full max-w-7xl mx-auto">
          <div className="max-w-xl px-6 sm:px-10 xl:px-16 py-10 lg:py-12 xl:py-0 space-y-6">
            <Reveal variant="fade" delay={400}>
              <div className="flex flex-wrap items-center gap-x-2 text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[#4A4239] font-medium">
                <span className="whitespace-nowrap">Collection 2026</span>
                <span aria-hidden="true">·</span>
                <span className="whitespace-nowrap">Jaipur Handcraft</span>
              </div>
            </Reveal>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1E1B18] leading-[1.15] font-normal tracking-tight text-balance">
              <AnimatedHeadline text="Handcrafted Heritage. Modern Ease." startDelay={560} stepDelay={160} keyPrefix="hero" />
            </h1>

            <Reveal delay={1350} className="space-y-5">
              <p className="text-[#3E362E] text-base sm:text-lg leading-relaxed font-light">
                Rooted in the timeless art of wooden hand-block printing and breathable natural mulmul.
                House of Mimansa brings unhurried, mindful artisanal silhouettes for the contemporary woman.
              </p>

              <div className="flex flex-col gap-1 text-[11px] text-[#4A4239] tracking-wide">
                <span>100% Organic Mulmul &amp; Chanderi</span>
                <span>AZO-Free Eco Dyes</span>
                <span>Fair Artisan Wages</span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onShopClick}
                  className="px-8 py-3.5 bg-[#1E1B18] text-[#FDFBF7] text-xs uppercase tracking-[0.2em] font-medium whitespace-nowrap hover:bg-[#342F2A] transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow group"
                >
                  <span>Shop New Arrivals</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={onCraftClick}
                  className="px-8 py-3.5 bg-transparent border border-[#3C352D] text-[#1E1B18] text-xs uppercase tracking-[0.2em] font-medium whitespace-nowrap hover:bg-[#EDE6DC] transition-all flex items-center justify-center"
                >
                  <span>Artisan Process</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
