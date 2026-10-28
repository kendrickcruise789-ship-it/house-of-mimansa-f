import React from 'react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/currency';
import { resolveImage } from '../shop/schema';
import { SafeImage } from './SafeImage';
import { X, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useOverlayBehavior } from '../utils/useOverlayBehavior';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  currency: Currency;
  onClose: () => void;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  currency,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  useOverlayBehavior(isOpen, onClose);

  if (!isOpen) return null;

  // Free shipping threshold in USD
  const rawSubtotalUSD = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col justify-between border-l border-[#EDE6DC]">
        
        {/* Top Header */}
        <div className="p-5 border-b border-[#EDE6DC] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-medium text-[#1E1B18]">Shopping Bag</h2>
            <span className="text-xs text-[#7A6B5D] uppercase tracking-wider">
              ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A6B5D] hover:text-[#1E1B18] transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bag Content List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F4EFEA] flex items-center justify-center text-[#7A6B5D]">
                <X className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-xl font-normal text-[#1E1B18]">Your bag is currently empty</p>
                <p className="text-xs text-[#7A6B5D]">Discover our handcrafted women's slow fashion silhouettes.</p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#1E1B18] text-[#FDFBF7] text-xs uppercase tracking-widest font-medium hover:bg-[#342F2A] transition-colors"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                className="flex gap-4 p-3 bg-white border border-[#EFE9DF] transition-all"
              >
                {/* Thumbnail */}
                <div className="w-20 h-24 bg-[#F4EFEA] shrink-0 overflow-hidden border border-[#EDE6DC]">
                  <SafeImage
                    src={resolveImage(item.product.image)}
                    alt={item.product.title}
                    category={item.product.category}
                    fallbackLabel={item.product.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm font-medium text-[#1E1B18] line-clamp-1">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-[#9B8F82] hover:text-[#A8523C] transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#7A6B5D]">
                      <span>Size: {item.selectedSize}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/20"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span>{item.selectedColor.name}</span>
                      </span>
                    </div>

                    <p className="text-xs font-semibold tabular-nums text-[#1E1B18]">
                      {formatPrice(item.product.price, currency)}
                    </p>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#EDE6DC]">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.product.title}`}
                        className="px-3 py-1.5 text-xs text-[#5C5349] hover:bg-[#F3EFEA]"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-medium tabular-nums text-[#1E1B18]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.product.title}`}
                        disabled={item.quantity >= (item.product.stockPerSize[item.selectedSize] ?? 0)}
                        className="px-3 py-1.5 text-xs text-[#5C5349] hover:bg-[#F3EFEA] disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-medium text-[#5C5349] tabular-nums">
                      Subtotal: {formatPrice(item.product.price * item.quantity, currency)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Drawer Actions */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#EDE6DC] bg-[#FAF7F2] space-y-4">
            {/* Totals Breakdown */}
            <div className="space-y-1.5 text-xs text-[#5C5349] tabular-nums">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span>{formatPrice(rawSubtotalUSD, currency)}</span>
              </div>
              <p className="text-[11px] text-[#9B8F82] pt-1">
                Shipping and any discounts are calculated at checkout.
              </p>
              <div className="flex justify-between text-sm font-semibold text-[#1E1B18] pt-2 border-t border-[#EDE6DC]">
                <span>Subtotal</span>
                <span>{formatPrice(rawSubtotalUSD, currency)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={onCheckout}
              className="w-full py-3.5 bg-[#1E1B18] text-[#FDFBF7] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#342F2A] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Security pledge */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A6B5D]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2F6F4E]" />
              <span>Secure checkout powered by Shopify</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
