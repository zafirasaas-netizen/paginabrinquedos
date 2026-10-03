import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Zap, Flame, RotateCcw } from 'lucide-react';

interface CtaProps {
  onScrollToOffer: () => void;
}

/**
 * Mid-Page CTA (Placed towards the latter half of the page)
 */
export const MidPageCta: React.FC<CtaProps> = ({ onScrollToOffer }) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-neutral-950">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(220,38,38,0.18),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative rounded-3xl border border-red-900/50 bg-gradient-to-b from-neutral-900/90 via-neutral-950 to-neutral-900/90 p-6 sm:p-10 shadow-2xl shadow-red-950/40 text-center">
        {/* Urgency Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/15 border border-red-600/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Flame className="w-3.5 h-3.5 fill-red-500 text-red-500 animate-pulse" />
          <span>Oferta Exclusiva com Fumaça Real & Drift Nitro</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
          Pronto Para Ver os Olhos do Seu Filho Brilharem?
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto mb-6 leading-relaxed">
          Bateria recarregável de longa duração, dosador de fumaça a vapor e tração 4x4 para drift completo no piso liso. A partir de apenas <span className="text-emerald-400 font-extrabold">R$ 49,90</span> no Pix.
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onScrollToOffer}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-red-900/50 transition-all cursor-pointer group"
          >
            <span>APROVEITAR OFERTA AGORA</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-6 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-neutral-400">
          <span className="flex items-center gap-1.5 font-medium">
            <Truck className="w-4 h-4 text-emerald-400" />
            Frete Grátis Brasil
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Zap className="w-4 h-4 text-yellow-400" />
            10% OFF Imediato no Pix
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            Garantia de 90 Dias
          </span>
        </div>
      </div>
    </section>
  );
};

/**
 * Final Page CTA (Placed at the very end of the page, above the footer)
 */
export const FinalPageCta: React.FC<CtaProps> = ({ onScrollToOffer }) => {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-neutral-900/60 border-t border-neutral-800">
      {/* Decorative gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.22),transparent_75%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-4">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Garantia Blindada de Satisfação ou Reembolso</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          Garanta o Seu Antes que o Lote Promocional Esgote
        </h2>

        <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto mb-8 leading-relaxed">
          Você tem <strong className="text-white">30 dias corridos</strong> para testar em casa. Se não superar suas expectativas, devolvemos 100% do seu dinheiro sem perguntas.
        </p>

        {/* Highlight Offer Callout */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950 border border-red-600/40 max-w-lg mx-auto mb-6 shadow-2xl flex items-center justify-between gap-4">
          <div className="text-left">
            <p className="text-xs text-neutral-400">Oferta Especial do Homem-Aranha:</p>
            <p className="text-lg sm:text-xl font-black text-white">
              De <span className="line-through text-neutral-500 text-sm">R$ 99,90</span> por <span className="text-emerald-400">R$ 49,90</span>
            </p>
          </div>
          <span className="text-[11px] font-bold text-red-400 bg-red-950/80 border border-red-800/60 px-2.5 py-1 rounded-lg shrink-0">
            50% DE DESCONTO
          </span>
        </div>

        <button
          onClick={onScrollToOffer}
          className="w-full sm:w-auto px-10 py-4.5 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-500 active:scale-[0.98] text-white font-black text-base tracking-wide flex items-center justify-center gap-2.5 mx-auto shadow-2xl shadow-red-900/60 transition-all cursor-pointer group"
        >
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span>ESCOLHER MEU PACOTE ACIMA</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>

        <p className="text-xs text-neutral-400 mt-4 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Compra 100% Segura · Envio com Rastreio Correios / Mercado Envios</span>
        </p>
      </div>
    </section>
  );
};
