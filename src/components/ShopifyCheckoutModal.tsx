import React, { useState } from 'react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/currency';
import { createCheckoutUrl } from '../shopify/client';
import { useOverlayBehavior } from '../utils/useOverlayBehavior';
import { X, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

interface ShopifyCheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  currency: Currency;
  onClose: () => void;
}

type Phase = 'review' | 'redirecting' | 'error';

/**
 * Final step before payment. Creates a real Shopify cart and sends the shopper to
 * Shopify's hosted checkout — addresses, discounts, shipping and payment all happen
 * there. This site never sees or stores card details.
 */
export const ShopifyCheckoutModal: React.FC<ShopifyCheckoutModalProps> = ({
  isOpen,
  items,
  currency,
  onClose,
}) => {
  const [phase, setPhase] = useState<Phase>('review');
  const [error, setError] = useState('');

  useOverlayBehavior(isOpen, onClose);

  if (!isOpen) return null;

  const subtotalUSD = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const beginCheckout = async () => {
    setPhase('redirecting');
    setError('');
    try {
      const lines = items
        .map((item) => {
          const ref =
            item.product.variantRefs?.find(
              (r) => r.size === item.selectedSize && r.color === item.selectedColor.name
            ) ??
            item.product.variantRefs?.find((r) => r.size === item.selectedSize) ??
            item.product.variantRefs?.[0];
          return ref ? { merchandiseId: ref.id, quantity: item.quantity } : null;
        })
        .filter((line): line is { merchandiseId: string; quantity: number } => line !== null);
      if (!lines.length) throw new Error('These pieces are no longer available.');
      const checkoutUrl = await createCheckoutUrl(lines);
      window.location.href = checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start checkout. Please try again.');
      setPhase('error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Secure checkout"
      onClick={(e) => { if (e.target === e.currentTarget && phase !== 'redirecting') onClose(); }}
    >
      <div className="relative w-full max-w-md bg-[#FDFBF7] border border-[#EDE6DC] shadow-2xl p-6 sm:p-8 space-y-5">
        <button
          onClick={onClose}
          disabled={phase === 'redirecting'}
          className="absolute top-4 right-4 p-1.5 text-[#7A6B5D] hover:text-[#1E1B18] transition-colors disabled:opacity-40"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#7A6B5D] font-medium">
            House of Mimansa · Secure Checkout
          </p>
          <h2 className="font-serif text-2xl font-normal text-[#1E1B18]">Review Your Bag</h2>
        </div>

        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
              className="flex justify-between gap-3 text-xs text-[#5C5349]"
            >
              <span className="line-clamp-2">
                {item.product.title}
                <span className="text-[#9B8F82]">
                  {' '}· {item.selectedSize} · ×{item.quantity}
                </span>
              </span>
              <span className="tabular-nums shrink-0 text-[#1E1B18]">
                {formatPrice(item.product.price * item.quantity, currency)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between border-t border-[#EDE6DC] pt-3 text-sm text-[#1E1B18]">
          <span>Items Subtotal</span>
          <span className="font-semibold tabular-nums">{formatPrice(subtotalUSD, currency)}</span>
        </div>

        <p className="text-[11px] leading-relaxed text-[#7A6B5D]">
          Shipping options, discounts and payment are completed on Shopify's secure
          checkout page, in the shop's own currency. No card details are entered on
          this site.
        </p>

        {error && <p className="text-xs text-[#A8523C]">{error}</p>}

        <button
          onClick={beginCheckout}
          disabled={phase === 'redirecting' || items.length === 0}
          className="w-full py-3.5 bg-[#1E1B18] text-[#FDFBF7] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#342F2A] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
        >
          {phase === 'redirecting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Connecting to Shopify…</span>
            </>
          ) : (
            <>
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A6B5D]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2F6F4E]" />
          <span>Payments processed by Shopify</span>
        </div>
      </div>
    </div>
  );
};
