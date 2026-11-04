import React, { useEffect, useState } from 'react';
import { UserAccount } from '../types';
import { X, Mail, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { useOverlayBehavior } from '../utils/useOverlayBehavior';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount, rememberDevice: boolean) => void;
}

/**
 * There is no account server behind this storefront: orders and payment live in
 * Shopify, and this dialog only remembers contact details in the shopper's browser
 * so the greeting and order help can address them. It deliberately collects no
 * password, because there is no authentication here to check one against.
 */
export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useOverlayBehavior(isOpen, onClose);

  // The modal stays mounted while closed, so clear the previous entry on reopen.
  useEffect(() => {
    if (isOpen) return;
    setFullName('');
    setEmail('');
    setPhone('');
    setRemember(false);
    setError('');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = fullName.trim().slice(0, 80);
    const mail = email.trim().slice(0, 120);
    const tel = phone.trim().slice(0, 40);
    if (!name || !mail) {
      setError('Please add your name and email address.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(
        {
          id: `guest-${Date.now().toString(36)}`,
          fullName: name,
          email: mail,
          phone: tel || undefined,
        },
        remember,
      );
      onClose();
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Your details"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-md bg-[#FDFBF7] border border-[#EDE6DC] shadow-2xl p-6 sm:p-8">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#7A6B5D] hover:text-[#1E1B18] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1 pb-4 border-b border-[#EDE6DC]">
          <span className="font-serif text-2xl tracking-[0.25em] font-medium text-[#1E1B18] uppercase block">
            HOUSE OF MIMANSA
          </span>
          <p className="text-xs uppercase tracking-wider text-[#7A6B5D]">
            Your Details · Kept In This Browser
          </p>
        </div>

        <p className="mt-4 text-xs text-[#5C5349] leading-relaxed">
          No password is created or checked here. Orders, payments and account security belong to
          Shopify&apos;s secure checkout. These details only personalise this browser.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-4 p-3 border text-xs bg-[#FBF3F0] border-[#E4C9BF] text-[#7A3527]"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#5C5349] font-medium mb-1">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                maxLength={80}
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Asha Rao"
                className="w-full px-3 py-2 pl-9 text-xs border border-[#D5C9B9] bg-white focus:outline-none focus:border-[#1E1B18]"
              />
              <User className="w-3.5 h-3.5 absolute left-3 top-3 text-[#A89C8F]" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#5C5349] font-medium mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                maxLength={120}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 pl-9 text-xs border border-[#D5C9B9] bg-white focus:outline-none focus:border-[#1E1B18]"
              />
              <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-[#A89C8F]" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#5C5349] font-medium mb-1">
              Phone Number <span className="normal-case tracking-normal text-[#A89C8F]">(optional)</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                maxLength={40}
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 00000 00000"
                className="w-full px-3 py-2 pl-9 text-xs border border-[#D5C9B9] bg-white focus:outline-none focus:border-[#1E1B18]"
              />
              <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-[#A89C8F]" />
            </div>
          </div>

          <label className="flex items-start gap-2 text-xs text-[#5C5349] cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded mt-0.5 text-[#1E1B18] focus:ring-0"
            />
            <span>Keep these details on this device next time</span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#1E1B18] text-[#FDFBF7] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#342F2A] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
          >
            <span>{isSubmitting ? 'Saving...' : 'Save Details'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#EDE6DC] text-center text-[11px] text-[#7A6B5D] flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2F6F4E]" />
          <span>Stored in this browser only — never sent to the studio</span>
        </div>

      </div>
    </div>
  );
};
