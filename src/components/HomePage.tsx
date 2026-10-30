import React from 'react';
import { Product } from '../types';
import { categoryLabel } from '../data/products';
import { FeaturedBoard } from './home/FeaturedBoard';
import { HeroSection } from './HeroSection';
import { MarqueeStrip } from './MarqueeStrip';
import { ArtisanCraftSection } from './ArtisanCraftSection';
import { FabricGuideSection } from './FabricGuideSection';
import { CarePromiseSection } from './CarePromiseSection';
import { ReviewsSection } from './ReviewsSection';
import { Reveal } from './Reveal';
import { AnimatedHeadline } from './AnimatedHeadline';
import { CountUp } from './CountUp';
import { ArrowRight, Home, MapPin, Phone, Undo2 } from 'lucide-react';

interface HomePageProps {
  onGoToClothing: () => void;
  onGoToHomeLiving: () => void;
  onSelectCategory: (category: string) => void;
  products: Product[];
}

const FACTS = [
  { to: 18, suffix: '', label: 'Resident artisans in Bagru' },
  { to: 5, suffix: '', label: 'Natural fabrics, no blends' },
  { to: 10, suffix: ' days', label: 'To carve a single block' },
  { to: 0, suffix: '', label: 'Polyester in the catalogue' },
];

const CLOTHING_ROOMS = [
  { category: 'Dresses', note: 'Tiered maxis & day dresses' },
  { category: 'Co-ords', note: 'Matching top-and-trouser sets' },
  { category: 'Kurtas & Tunics', note: 'Anarkalis & handloom tunics' },
  { category: 'Kaftans', note: 'Botanical mulmul kaftans' },
];

const HOME_ROOMS = [
  { category: 'Bedsheets', note: '300TC percale bedding' },
  { category: 'Mats', note: 'Block-printed floor mats' },
  { category: 'Home', note: 'Cushions & table linen' },
];

const scrollToCraft = () => {
  const el = document.getElementById('craft-story');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export const HomePage: React.FC<HomePageProps> = ({
  onGoToClothing,
  onGoToHomeLiving,
  onSelectCategory,
  products,
}) => {
  const heroProduct = products.find((p) => p.isNewArrival) ?? products[0];

  return (
    <>
      <HeroSection
        onShopClick={onGoToClothing}
        onCraftClick={scrollToCraft}
        product={heroProduct}
      />

      <MarqueeStrip />

      {/* The exhibition: what the shop is pushing right now, from the live catalogue */}
      <FeaturedBoard
        products={products}
        onShopCategory={onSelectCategory}
        onGoToClothing={onGoToClothing}
      />

      {/* What the house actually does */}
      <section className="py-14 lg:py-20 bg-[#FDFBF7] border-b border-[#EDE6DC]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <Reveal variant="side" className="lg:col-span-5 space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-[#7A6B5D] font-medium">
              The House · Since 2019
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] leading-tight tracking-tight text-balance">
              <AnimatedHeadline text="A slow clothing house built around one printing table." startDelay={0} stepDelay={90} keyPrefix="house" />
            </h2>
            <p className="text-[#5C5349] text-sm sm:text-base leading-relaxed font-light">
              House of Mimansa designs, blocks, dyes and stitches womenswear and home linen in the same Rajasthan
              workshops. We make small batches of cloth we can stand behind, sell them without a markup
              ladder, and tell you exactly who made each piece.
            </p>
          </Reveal>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
            {FACTS.map((fact, i) => (
              <Reveal key={fact.label} variant="pop" delay={i * 140}>
                <div className="h-full border border-[#EDE6DC] bg-[#FAF7F2] p-5 space-y-2 hover:border-[#C6934B] transition-colors">
                  <CountUp
                    to={fact.to}
                    suffix={fact.suffix}
                    className="block font-serif text-3xl sm:text-4xl text-[#1E1B18] leading-none tabular-nums"
                  />
                  <p className="text-[11px] uppercase tracking-wider text-[#7A6B5D] leading-snug">{fact.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ArtisanCraftSection />

      <FabricGuideSection />

      <CarePromiseSection />

      {/* Studio, phone and the return window — what a customer asks before ordering */}
      <section id="studio-contact" className="py-16 lg:py-20 bg-[#FDFBF7] border-b border-[#EDE6DC]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] text-[#7A6B5D] font-medium">
              Visit · Call · Return
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] leading-tight tracking-tight text-balance">
              <AnimatedHeadline text="The studio is open, and returns take seven days." startDelay={0} stepDelay={90} keyPrefix="contact" />
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            <Reveal variant="pop" delay={0}>
              <div className="h-full bg-white border border-[#EDE6DC] p-6 space-y-3 hover:border-[#C6934B] transition-colors">
                <MapPin className="w-5 h-5 text-[#A8523C]" />
                <h3 className="font-serif text-lg font-medium text-[#1E1B18] leading-snug">House of Mimansa</h3>
                <address className="not-italic text-xs text-[#5C5349] leading-relaxed">
                  39, Shiv Colony, near Jaipur International Airport,
                  Jaipur, Rajasthan
                </address>
              </div>
            </Reveal>

            <Reveal variant="pop" delay={120}>
              <div className="h-full bg-white border border-[#EDE6DC] p-6 space-y-3 hover:border-[#C6934B] transition-colors">
                <Phone className="w-5 h-5 text-[#A8523C]" />
                <h3 className="font-serif text-lg font-medium text-[#1E1B18] leading-snug">Call The House</h3>
                <div className="text-xs text-[#5C5349] leading-relaxed space-y-1">
                  <a href="tel:+918619841369" className="block hover:text-[#1E1B18] underline-offset-2 hover:underline">
                    +91 86198 41369
                  </a>
                  <a href="tel:+917665976202" className="block hover:text-[#1E1B18] underline-offset-2 hover:underline">
                    +91 76659 76202
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal variant="pop" delay={240}>
              <div className="h-full bg-[#1E1B18] text-[#F3EFEA] p-6 space-y-3">
                <Undo2 className="w-5 h-5 text-[#C6934B]" />
                <h3 className="font-serif text-lg font-medium text-[#FDFBF7] leading-snug">Returns Within 7 Days</h3>
                <p className="text-xs text-[#B8ACA0] leading-relaxed">
                  If a piece is not right, call or message us within 7 days of delivery and we will arrange a
                  return or exchange. Please keep the piece unworn with its tags attached.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Two rooms — Clothing and Home & Living */}
      <section className="py-16 lg:py-20 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-8 space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-[#7A6B5D] font-medium">
              Two Rooms · One Printing Table
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1B18] tracking-tight">
              Pick A Shelf And Browse
            </h2>
          </Reveal>

          <div className="space-y-12">
            {/* Room one: wearable cloth */}
            <div className="space-y-4">
              <Reveal className="flex items-end justify-between gap-4 border-b border-[#EDE6DC] pb-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#A8523C] font-medium">Room One</p>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1E1B18]">Clothing</h3>
                </div>
                <button
                  onClick={onGoToClothing}
                  className="group text-[11px] uppercase tracking-[0.2em] font-medium text-[#1E1B18] hover:text-[#A8523C] transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <span>View Clothing</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CLOTHING_ROOMS.map((room, i) => (
                  <Reveal key={room.category} variant="pop" delay={i * 90}>
                    <button
                      onClick={() => onSelectCategory(room.category)}
                      className="w-full h-full text-left group border border-[#EDE6DC] bg-white p-6 flex items-center justify-between gap-4 hover:border-[#1E1B18] hover:shadow-md transition-all duration-300"
                    >
                      <span className="space-y-1">
                        <span className="block font-serif text-xl text-[#1E1B18]">{categoryLabel(room.category)}</span>
                        <span className="block text-[11px] uppercase tracking-wider text-[#7A6B5D]">{room.note}</span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#C6934B] shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Room two: cloth for the house */}
            <div className="space-y-4">
              <Reveal className="flex items-end justify-between gap-4 border-b border-[#EDE6DC] pb-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#A8523C] font-medium">Room Two</p>
                  <h3 className="flex items-start gap-2 font-serif text-xl sm:text-2xl text-[#1E1B18]">
                    <Home className="w-5 h-5 mt-1 sm:mt-1.5 text-[#1E1B18] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    Home &amp; Living
                  </h3>
                </div>
                <button
                  onClick={onGoToHomeLiving}
                  className="group text-[11px] uppercase tracking-[0.2em] font-medium text-[#1E1B18] hover:text-[#A8523C] transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <span>View Home &amp; Living</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {HOME_ROOMS.map((room, i) => (
                  <Reveal key={room.category} variant="pop" delay={i * 90}>
                    <button
                      onClick={() => onSelectCategory(room.category)}
                      className="w-full h-full text-left group border border-[#EDE6DC] bg-white p-6 flex items-center justify-between gap-4 hover:border-[#1E1B18] hover:shadow-md transition-all duration-300"
                    >
                      <span className="space-y-1">
                        <span className="block font-serif text-xl text-[#1E1B18]">{categoryLabel(room.category)}</span>
                        <span className="block text-[11px] uppercase tracking-wider text-[#7A6B5D]">{room.note}</span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#C6934B] shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* Closing band */}
      <section className="relative overflow-hidden bg-[#1E1B18] text-[#FDFBF7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <Reveal variant="fade">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C6934B]">Ready When You Are</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-balance mx-auto max-w-3xl">
              <AnimatedHeadline text="Eighty pieces. Five fabrics. One printing table." startDelay={0} stepDelay={110} keyPrefix="closing" />
            </h2>
          </Reveal>
          <Reveal variant="pop" delay={260}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onGoToClothing}
                className="group px-8 sm:px-10 py-4 bg-[#FDFBF7] text-[#1E1B18] text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold hover:bg-[#C6934B] transition-colors inline-flex items-center gap-3"
              >
                <span>Enter The Clothing Room</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </button>
              <button
                onClick={onGoToHomeLiving}
                className="group px-8 sm:px-10 py-4 border border-[#FDFBF7]/60 text-[#FDFBF7] text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold hover:border-[#C6934B] hover:text-[#C6934B] transition-colors inline-flex items-center gap-3"
              >
                <span>Shop Home &amp; Living</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};
