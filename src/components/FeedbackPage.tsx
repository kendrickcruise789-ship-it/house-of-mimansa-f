import React, { useState } from 'react';
import { Check, MapPin, MessageSquare, Package, Undo2 } from 'lucide-react';
import { Reveal } from './Reveal';
import { AnimatedHeadline } from './AnimatedHeadline';
import { WhatsAppIcon, WHATSAPP_NUMBER, whatsappChatUrl } from './WhatsAppButton';

const TOPICS = ['Fit & sizing', 'Fabric & print', 'Delivery', 'Returns & exchange', 'Something else'];

const fieldClass =
  'w-full px-4 py-3 text-sm bg-[#FDFBF7] border border-[#D5C9B9] text-[#1E1B18] placeholder-[#9A8B7D] focus:outline-none focus:border-[#1E1B18]';

export const FeedbackPage: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [draftUrl, setDraftUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim().slice(0, 80);
    const cleanContact = contact.trim().slice(0, 120);
    const cleanOrder = orderNumber.trim().slice(0, 40);
    const cleanMessage = message.trim().slice(0, 1500);
    if (!cleanName || !cleanContact || !cleanMessage) {
      setError('Please add your name, a phone number or email, and your feedback.');
      setDraftUrl('');
      return;
    }
    setError('');
    const lines = [
      `Feedback from ${cleanName}`,
      `Contact: ${cleanContact}`,
      cleanOrder ? `Order number: ${cleanOrder}` : '',
      `About: ${topic}`,
      '',
      cleanMessage,
    ].filter(Boolean);
    const url = whatsappChatUrl(lines.join('\n'));
    setDraftUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <section className="bg-[#F7F3ED] border-b border-[#EDE6DC] py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="max-w-2xl space-y-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#7A6B5D] font-medium">
              Patron Feedback · Tell The House
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E1B18] leading-tight font-normal tracking-tight text-balance">
              <AnimatedHeadline text="Tell us how the cloth wore." startDelay={0} stepDelay={150} keyPrefix="feedback" />
            </h1>
            <p className="text-[#5C5349] text-base leading-relaxed font-light">
              A print that faded too soon, a size that sat differently, a parcel that arrived late — tell us plainly.
              Your note goes straight to the Jaipur studio on WhatsApp, and we reply from the same number.
            </p>
          </Reveal>
        </div>
      </section>

      <main className="flex-1 bg-[#FDFBF7] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <Reveal className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-[#EDE6DC] p-6 sm:p-8 space-y-5"
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="space-y-1.5 block">
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-[#7A6B5D] font-medium">
                    Your name
                  </span>
                  <input
                    type="text"
                    value={name}
                    maxLength={80}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    autoComplete="name"
                    className={fieldClass}
                  />
                </label>
                <label className="space-y-1.5 block">
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-[#7A6B5D] font-medium">
                    Phone or email
                  </span>
                  <input
                    type="text"
                    value={contact}
                    maxLength={120}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="How we should reply"
                    autoComplete="email"
                    className={fieldClass}
                  />
                </label>
                <label className="space-y-1.5 block">
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-[#7A6B5D] font-medium">
                    Order number <span className="normal-case tracking-normal text-[#9A8B7D]">(optional)</span>
                  </span>
                  <input
                    type="text"
                    value={orderNumber}
                    maxLength={40}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g. HOM-1042"
                    className={fieldClass}
                  />
                </label>
                <label className="space-y-1.5 block">
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-[#7A6B5D] font-medium">
                    What is it about?
                  </span>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={fieldClass}
                  >
                    {TOPICS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="space-y-1.5 block">
                <span className="block text-[11px] uppercase tracking-[0.18em] text-[#7A6B5D] font-medium">
                  Your feedback
                </span>
                <textarea
                  value={message}
                  maxLength={1500}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  placeholder="Tell us what happened, and what would have made it right."
                  className={`${fieldClass} resize-y`}
                />
              </label>

              {error && (
                <p role="alert" className="text-xs text-[#A8523C] border-l-2 border-[#A8523C] pl-3">
                  {error}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1E1B18] text-[#FDFBF7] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#342F2A] transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Send via WhatsApp
                </button>
                <p className="text-[11px] text-[#7A6B5D] leading-relaxed">
                  Opens WhatsApp on {WHATSAPP_NUMBER} with your note ready to send.
                </p>
              </div>

              {draftUrl && (
                <div className="p-4 bg-[#F2F7F1] border border-[#C9DCC5] flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#2F6F4E] mt-0.5 shrink-0" />
                  <p className="text-xs text-[#3D4A38] leading-relaxed">
                    Your feedback is drafted in WhatsApp. Press send there and it reaches the studio directly.{' '}
                    <a
                      href={draftUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline underline-offset-2 hover:text-[#1E1B18]"
                    >
                      Open WhatsApp again
                    </a>
                    .
                  </p>
                </div>
              )}
            </form>
          </Reveal>

          <Reveal variant="side" delay={120} className="lg:col-span-5 space-y-4">
            <a
              href={whatsappChatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 bg-[#25D366] p-6 text-white hover:bg-[#1FB955] transition-colors"
            >
              <WhatsAppIcon className="w-7 h-7 shrink-0" />
              <span className="space-y-1">
                <span className="block text-[11px] uppercase tracking-[0.2em] font-medium text-white/90">
                  WhatsApp the studio
                </span>
                <span className="block font-serif text-xl font-medium leading-snug">{WHATSAPP_NUMBER}</span>
                <span className="block text-xs text-white/85 leading-relaxed">
                  Prefer to talk it through? Tap to open the business chat.
                </span>
              </span>
            </a>

            <div className="bg-white border border-[#EDE6DC] p-6 space-y-3">
              <MessageSquare className="w-5 h-5 text-[#A8523C]" />
              <h2 className="font-serif text-lg font-medium text-[#1E1B18] leading-snug">What happens next</h2>
              <p className="text-xs text-[#5C5349] leading-relaxed">
                A real person at the studio reads every note. We reply on WhatsApp on the same number, usually the
                same day the atelier is open.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#EDE6DC] p-5 space-y-2">
                <Undo2 className="w-4 h-4 text-[#A8523C]" />
                <p className="font-serif text-base font-medium text-[#1E1B18] leading-snug">Returns within 7 days</p>
                <p className="text-[11px] text-[#5C5349] leading-relaxed">
                  Wrong fit or a faulty print? Tell us within 7 days of delivery.
                </p>
              </div>
              <div className="bg-white border border-[#EDE6DC] p-5 space-y-2">
                <Package className="w-4 h-4 text-[#A8523C]" />
                <p className="font-serif text-base font-medium text-[#1E1B18] leading-snug">Delivery notes</p>
                <p className="text-[11px] text-[#5C5349] leading-relaxed">
                  Add your order number so we can trace the parcel with the courier.
                </p>
              </div>
            </div>

            <div className="bg-[#1E1B18] text-[#F3EFEA] p-6 space-y-3">
              <MapPin className="w-5 h-5 text-[#C6934B]" />
              <h2 className="font-serif text-lg font-medium text-[#FDFBF7] leading-snug">Visit the studio</h2>
              <address className="not-italic text-xs text-[#B8ACA0] leading-relaxed">
                39, Shiv Colony, near Jaipur International Airport,
                Jaipur, Rajasthan
              </address>
            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
};
