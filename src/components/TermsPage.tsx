import React from 'react';
import { MapPin, ScrollText, ShieldCheck } from 'lucide-react';
import { Reveal } from './Reveal';
import { AnimatedHeadline } from './AnimatedHeadline';
import { WhatsAppIcon, WHATSAPP_NUMBER, whatsappChatUrl } from './WhatsAppButton';

const SECTIONS = [
  { id: 'who-we-are', title: 'Who we are' },
  { id: 'orders', title: 'Orders and Shopify checkout' },
  { id: 'prices', title: 'Prices, currency and payment' },
  { id: 'shipping', title: 'Shipping and delivery' },
  { id: 'returns', title: 'Returns and exchanges' },
  { id: 'handcraft', title: 'Handcrafted pieces' },
  { id: 'privacy', title: 'Privacy and your details' },
  { id: 'intellectual-property', title: 'Intellectual property' },
  { id: 'acceptable-use', title: 'Acceptable use' },
  { id: 'third-parties', title: 'Third-party services' },
  { id: 'liability', title: 'Disclaimers and liability' },
  { id: 'law', title: 'Governing law' },
  { id: 'changes', title: 'Changes to these terms' },
  { id: 'contact', title: 'Contact the studio' },
];

const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm text-[#5C5349] leading-relaxed font-light">{children}</p>
);

const Section: React.FC<{ id: string; index: number; title: string; children: React.ReactNode }> = ({
  id,
  index,
  title,
  children,
}) => (
  <section id={id} className="scroll-mt-28 space-y-3 pb-8 border-b border-[#EDE6DC] last:border-0 last:pb-0">
    <div className="flex items-baseline gap-3">
      <span className="font-serif text-lg text-[#C6934B]">{String(index).padStart(2, '0')}</span>
      <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#1E1B18] leading-snug">{title}</h2>
    </div>
    {children}
  </section>
);

export const TermsPage: React.FC = () => {
  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <section className="bg-[#F7F3ED] border-b border-[#EDE6DC] py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="max-w-3xl space-y-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#7A6B5D] font-medium">
              The Fine Print · Terms of Service
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E1B18] leading-tight font-normal tracking-tight text-balance">
              <AnimatedHeadline text="The terms behind the cloth." startDelay={0} stepDelay={150} keyPrefix="terms" />
            </h1>
            <p className="text-[#5C5349] text-base leading-relaxed font-light">
              Plain-language terms for shopping this storefront, paying through Shopify's secure checkout, and
              sending a piece back within seven days. They apply from the moment you browse the Site or place an
              order.
            </p>
            <div className="inline-flex items-center gap-2 border border-[#D5C9B9] bg-[#FDFBF7] px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-[#7A6B5D]">
              <ScrollText className="w-3.5 h-3.5 text-[#A8523C]" />
              <span>Effective 8 November 2026</span>
            </div>
          </Reveal>
        </div>
      </section>

      <main className="flex-1 bg-[#FDFBF7] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <Reveal variant="side" className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white border border-[#EDE6DC] p-6 space-y-2">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#7A6B5D] font-medium">On this page</p>
              <nav aria-label="Terms of Service contents" className="space-y-1.5">
                {SECTIONS.map((section, i) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => jumpTo(section.id)}
                    className="block w-full text-left text-xs text-[#5C5349] hover:text-[#1E1B18] transition-colors leading-relaxed"
                  >
                    <span className="text-[#B3A697] mr-2">{String(i + 1).padStart(2, '0')}</span>
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>

            <div className="bg-[#1E1B18] text-[#F3EFEA] p-6 space-y-3">
              <MapPin className="w-5 h-5 text-[#C6934B]" />
              <p className="font-serif text-lg font-medium text-[#FDFBF7] leading-snug">The Jaipur studio</p>
              <address className="not-italic text-xs text-[#B8ACA0] leading-relaxed">
                39, Shiv Colony, near Jaipur International Airport,
                <br />
                Jaipur, Rajasthan, India
              </address>
              <a
                href={whatsappChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 pt-1 text-xs text-[#E8DDD1] hover:text-white transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                {WHATSAPP_NUMBER}
              </a>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <div className="bg-white border border-[#EDE6DC] p-6 sm:p-10 space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#7A6B5D]">
                  <ShieldCheck className="w-4 h-4 text-[#2F6F4E]" />
                  <span>House of Mimansa · www.houseofmimansa.in</span>
                </div>
                <Paragraph>
                  These Terms of Service govern your use of www.houseofmimansa.in (the “Site”) and any order you
                  place through it. By browsing the Site or placing an order, you agree to them. If you do not
                  agree, please do not use the Site.
                </Paragraph>
              </div>

              <Section id="who-we-are" index={1} title="Who we are">
                <Paragraph>
                  House of Mimansa is a hand-block printed clothing and home-textile studio based in Jaipur,
                  Rajasthan, India. Our studio and correspondence address is 39, Shiv Colony, near Jaipur
                  International Airport, Jaipur, Rajasthan. You can reach us on{' '}
                  <a href="tel:+918619841369" className="text-[#1E1B18] underline underline-offset-2">
                    +91 86198 41369
                  </a>{' '}
                  or{' '}
                  <a href="tel:+917665976202" className="text-[#1E1B18] underline underline-offset-2">
                    +91 76659 76202
                  </a>
                  , or on WhatsApp at {WHATSAPP_NUMBER}. In these terms, “we”, “us” and “the House” mean House of
                  Mimansa; “you” means the person browsing or ordering.
                </Paragraph>
              </Section>

              <Section id="orders" index={2} title="Orders and Shopify checkout">
                <Paragraph>
                  The bag on this Site hands your selection to Shopify's secure checkout, where the order is
                  completed and paid for. The contract of sale is formed when Shopify confirms your order and
                  payment. We may decline or cancel an order if a piece is no longer available, if a price or
                  description was listed in error, or if we suspect fraud; any amount already paid is refunded in
                  that case. You are responsible for the accuracy of the delivery address, phone number and email
                  you enter at checkout.
                </Paragraph>
              </Section>

              <Section id="prices" index={3} title="Prices, currency and payment">
                <Paragraph>
                  Prices are shown in the currency you select. The store's selling currency is Indian Rupees
                  (INR); amounts in USD, EUR and GBP are indicative conversions for browsing, and the exact amount
                  payable — including applicable taxes and any delivery charge — is the one Shopify shows at
                  checkout before you pay. We never receive or store your card, UPI or bank details; Shopify
                  processes the payment. We may change prices and run sales at any time, but a confirmed order is
                  billed at the price shown when you paid.
                </Paragraph>
              </Section>

              <Section id="shipping" index={4} title="Shipping and delivery">
                <Paragraph>
                  Deliveries within India are complimentary. Pieces are dispatched from Jaipur as soon as they are
                  ready; made-to-order or small-batch pieces can take longer, and we will tell you when that is the
                  case. Timelines given by courier partners are estimates, not guarantees. Once the parcel is
                  delivered to the address you gave, risk in the goods passes to you. If a parcel arrives damaged,
                  keep the packaging and tell us within 7 days so we can raise it with the courier.
                </Paragraph>
              </Section>

              <Section id="returns" index={5} title="Returns and exchanges">
                <Paragraph>
                  You may return or exchange an unworn piece within 7 days of delivery if it is unused, unwashed
                  and has its tags attached. Tell us within those 7 days on WhatsApp at {WHATSAPP_NUMBER} or
                  through the Feedback page, quoting your order number and what you would like — a return, a
                  different size or colour, or a refund. We will arrange the return with our courier where
                  possible. Once the piece reaches us and passes inspection, we refund the amount paid to the
                  original payment method through Shopify, or dispatch the exchange. Pieces that have been worn,
                  washed, altered or damaged after delivery cannot be accepted. Hand-block print and natural-dye
                  variation is the character of the cloth, not a fault.
                </Paragraph>
              </Section>

              <Section id="handcraft" index={6} title="Handcrafted pieces">
                <Paragraph>
                  Every piece is printed and finished by hand in small batches. Slight differences in print
                  placement, dye depth, weave and measurement are expected and are not defects. Colours on a screen
                  are an approximation of the cloth. Sizes follow the Size Guide; if you are between sizes, message
                  the studio before ordering. Follow the care rituals published on the Site — damage caused by
                  ignoring the care instructions is not covered by the returns policy.
                </Paragraph>
              </Section>

              <Section id="privacy" index={7} title="Privacy and your details">
                <ul className="space-y-2 text-sm text-[#5C5349] leading-relaxed font-light list-disc pl-5">
                  <li>
                    <strong className="font-medium text-[#1E1B18]">No account server.</strong> Details entered in
                    “Your details” stay in your browser. They are saved only if you tick “keep these details on
                    this device”, and “Forget Details” removes them.
                  </li>
                  <li>
                    <strong className="font-medium text-[#1E1B18]">No advertising or analytics cookies.</strong>{' '}
                    Your bag, wishlist, currency and optional guest details are kept in local storage so the Site
                    works between visits.
                  </li>
                  <li>
                    <strong className="font-medium text-[#1E1B18]">Orders.</strong> Shopify receives the details
                    needed to process payment, fulfil and support your order. Shopify's own privacy policy governs
                    that processing.
                  </li>
                  <li>
                    <strong className="font-medium text-[#1E1B18]">Feedback.</strong> The feedback form drafts a
                    message in WhatsApp; nothing reaches us until you press send there. Messages you send are then
                    handled by WhatsApp (Meta).
                  </li>
                  <li>
                    <strong className="font-medium text-[#1E1B18]">Newsletter.</strong> The form on this Site shows
                    a confirmation in your browser and does not transmit your address. To actually join the mailing
                    list, message the studio on WhatsApp.
                  </li>
                  <li>
                    <strong className="font-medium text-[#1E1B18]">Hosting and fonts.</strong> GitHub Pages serves
                    the Site and may log request data such as IP addresses under GitHub's privacy statement. Fonts
                    are served through Google Fonts, which receives the font request.
                  </li>
                  <li>
                    <strong className="font-medium text-[#1E1B18]">Your requests.</strong> To ask about, correct or
                    delete anything you have sent us, contact the studio using the details below.
                  </li>
                </ul>
              </Section>

              <Section id="intellectual-property" index={8} title="Intellectual property">
                <Paragraph>
                  The House of Mimansa name and wordmark, the photographs, product descriptions, print designs and
                  the layout of this Site belong to us or our licensors. You may browse, share links and print
                  pages for personal use. You may not copy the Site or its imagery for commercial use, resell our
                  photographs, or scrape the catalogue without written permission.
                </Paragraph>
              </Section>

              <Section id="acceptable-use" index={9} title="Acceptable use">
                <Paragraph>
                  Use the Site lawfully. Do not attempt to interfere with it, probe it for vulnerabilities without
                  written permission, place fraudulent orders, impersonate another person, or use the feedback
                  channel to send unlawful, abusive or misleading content. We may restrict access where these
                  terms are broken.
                </Paragraph>
              </Section>

              <Section id="third-parties" index={10} title="Third-party services">
                <Paragraph>
                  Checkout and payments are provided by Shopify. Messaging runs on WhatsApp (Meta). Hosting is
                  provided by GitHub Pages and fonts by Google Fonts. Your use of those services is also governed
                  by their own terms and privacy policies. Links to third-party sites are provided for convenience;
                  we do not control them.
                </Paragraph>
              </Section>

              <Section id="liability" index={11} title="Disclaimers and liability">
                <Paragraph>
                  Nothing in these terms limits rights you have under Indian consumer law. To the extent the law
                  allows, the Site is provided as it is, and we are not liable for indirect or consequential loss
                  arising from use of the Site. Our liability for an order is limited to the amount you paid for
                  that order. We are not responsible for delays or failures caused by events outside our reasonable
                  control, such as courier disruption, weather or government action.
                </Paragraph>
              </Section>

              <Section id="law" index={12} title="Governing law">
                <Paragraph>
                  These terms are governed by the laws of India, and the courts at Jaipur, Rajasthan have
                  jurisdiction. If something goes wrong, write to us first — most issues are settled on WhatsApp
                  within days.
                </Paragraph>
              </Section>

              <Section id="changes" index={13} title="Changes to these terms">
                <Paragraph>
                  We may update these terms as the House and the law change. The version published here, with its
                  effective date, is the one that applies. Orders are governed by the terms in force when the order
                  was placed.
                </Paragraph>
              </Section>

              <Section id="contact" index={14} title="Contact the studio">
                <Paragraph>
                  Questions about an order, a return or these terms? Reach the Jaipur studio at 39, Shiv Colony,
                  near Jaipur International Airport, Jaipur, Rajasthan, India; call{' '}
                  <a href="tel:+918619841369" className="text-[#1E1B18] underline underline-offset-2">
                    +91 86198 41369
                  </a>{' '}
                  or{' '}
                  <a href="tel:+917665976202" className="text-[#1E1B18] underline underline-offset-2">
                    +91 76659 76202
                  </a>
                  ; or send a WhatsApp message to {WHATSAPP_NUMBER}.
                </Paragraph>
                <a
                  href={whatsappChatUrl('Hello House of Mimansa, I have a question about your Terms of Service.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E1B18] text-[#FDFBF7] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#342F2A] transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  WhatsApp the studio
                </a>
              </Section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
