import React, { useState, useEffect } from 'react';
import { CartItem } from '../types/product';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, ArrowLeft, Tag, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPct: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (rawSubtotal * appliedCoupon.discountPct) / 100 : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'SPIDER10' || code === 'PRIMEIRACOMPRA') {
      setAppliedCoupon({ code, discountPct: 10 });
      setCouponCode('');
    } else {
      setCouponError('Cupom inválido. Experimente: SPIDER10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop (Clicking outside closes modal and returns to main view) */}
      <div
        onClick={onClose}
        title="Clique fora para voltar"
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity cursor-pointer"
      />

      {/* Compact Popup Card (Fits comfortably in screen viewport) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md max-h-[90vh] bg-neutral-950 border border-neutral-800 rounded-2xl text-white flex flex-col shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header with Back Button and Close Button */}
        <div className="p-3.5 sm:p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
          {/* Botão de Voltar */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-2.5 py-1.5 rounded-lg border border-neutral-700 transition-colors cursor-pointer"
            title="Voltar para a página inicial"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar</span>
          </button>

          <div className="flex items-center gap-2 text-center">
            <img
              src="https://i.imgur.com/ibc5f6o.png"
              alt="Logo Vila dos Brinquedos"
              className="w-5 h-5 object-contain rounded shrink-0"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/src/assets/images/logo.png';
              }}
            />
            <h2 className="text-sm sm:text-base font-bold text-white">Seu Carrinho</h2>
            <span className="text-xs text-neutral-400">
              ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar carrinho"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Badge */}
        <div className="bg-emerald-950/40 border-b border-emerald-900/50 px-4 py-2 flex items-center gap-2 text-[11px] text-emerald-300 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span className="truncate">
            Parabéns! Pedido qualificado para <strong>Frete Grátis</strong> Full.
          </span>
        </div>

        {/* Items List (Scrollable Area) */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3">
          {items.length === 0 ? (
            <div className="py-8 flex flex-col items-center justify-center text-center px-4 text-neutral-400">
              <p className="text-sm font-semibold text-neutral-300">Seu carrinho está vazio</p>
              <p className="text-xs mt-1 text-neutral-500">
                Escolha um dos combos promocionais e aproveite o envio prioritário.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar e Escolher Oferta</span>
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-3 flex gap-3 items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-lg object-cover bg-neutral-950 shrink-0 border border-neutral-800"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-white truncate">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    R$ {item.price.toFixed(2).replace('.', ',')} cada
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-neutral-700 rounded-md bg-neutral-950">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        aria-label="Diminuir quantidade"
                        className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        aria-label="Aumentar quantidade"
                        className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-white tabular-nums">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  aria-label="Remover item"
                  className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}

          {/* Coupon Section */}
          {items.length > 0 && (
            <div className="pt-1">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cupom (ex: SPIDER10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
              </form>
              {couponError && (
                <p className="text-[10px] text-red-400 mt-1">{couponError}</p>
              )}
              {appliedCoupon && (
                <div className="mt-1.5 flex items-center justify-between text-xs text-emerald-400 bg-emerald-950/40 px-2.5 py-1.5 rounded-lg border border-emerald-900/60">
                  <span className="flex items-center gap-1 font-semibold text-[11px]">
                    <Check className="w-3.5 h-3.5" />
                    Cupom {appliedCoupon.code} aplicado ({appliedCoupon.discountPct}% OFF)
                  </span>
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="text-[10px] text-neutral-400 hover:text-white underline cursor-pointer"
                  >
                    Remover
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer with Summary and Action */}
        {items.length > 0 && (
          <div className="p-3.5 sm:p-4 border-t border-neutral-800 bg-neutral-900/80 space-y-2.5 shrink-0">
            <div className="space-y-1 text-xs text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium tabular-nums">
                  R$ {rawSubtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-400 text-xs">
                  <span>Desconto ({appliedCoupon.discountPct}%)</span>
                  <span className="tabular-nums font-semibold">
                    - R$ {discountAmount.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-xs">
                <span>Frete</span>
                <span className="text-emerald-400 font-bold uppercase">Grátis</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-1.5 border-t border-neutral-800">
                <span>Total</span>
                <span className="tabular-nums text-base sm:text-lg text-emerald-400">
                  R$ {finalTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 text-right">
                Ou R$ {(finalTotal * 0.9).toFixed(2).replace('.', ',')} no Pix (10% extra)
              </p>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 transition-all cursor-pointer"
            >
              <span>Finalizar Pedido Seguro</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Back/Continue link */}
            <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
              <button
                onClick={onClose}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Continuar Comprando</span>
              </button>

              <div className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3 h-3" />
                <span>Compra Protegida</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
