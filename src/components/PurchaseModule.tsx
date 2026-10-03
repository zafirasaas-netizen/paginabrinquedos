import React, { useState } from 'react';
import { Star, Truck, ShieldCheck, RefreshCw, Zap, Check, ArrowRight, QrCode, Sparkles, Flame } from 'lucide-react';
import { PRODUCT_PACKAGES } from '../data/productData';

interface PurchaseModuleProps {
  onAddToCart: (packageId: 'single' | 'double' | 'triple') => void;
  onBuyNow: (packageId: 'single' | 'double' | 'triple') => void;
  selectedPackageId?: 'single' | 'double' | 'triple';
  onSelectPackage?: (packageId: 'single' | 'double' | 'triple') => void;
}

export const PurchaseModule: React.FC<PurchaseModuleProps> = ({ 
  onAddToCart, 
  onBuyNow,
  selectedPackageId: controlledPackageId,
  onSelectPackage 
}) => {
  const [internalPackageId, setInternalPackageId] = useState<'single' | 'double' | 'triple'>('single');
  const selectedPackageId = controlledPackageId ?? internalPackageId;

  const handleSelectPackage = (id: 'single' | 'double' | 'triple') => {
    setInternalPackageId(id);
    onSelectPackage?.(id);
  };

  const [cep, setCep] = useState('');
  const [shippingResult, setShippingResult] = useState<{
    calculated: boolean;
    city?: string;
    days?: string;
    isFree?: boolean;
  } | null>(null);

  const selectedPackage = PRODUCT_PACKAGES.find(p => p.id === selectedPackageId) || PRODUCT_PACKAGES[0];

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length < 5) return;

    const prefix = cleanCep.substring(0, 2);
    let city = 'São Paulo e Região Metropolitana';
    let days = 'Chega Amanhã com Envio Full';

    if (prefix >= '01' && prefix <= '09') {
      city = 'Grande São Paulo (SP)';
      days = 'Chega Amanhã com Envio Full';
    } else if (prefix >= '11' && prefix <= '19') {
      city = 'Interior de São Paulo (SP)';
      days = 'Chega em 2 dias úteis';
    } else if (prefix >= '20' && prefix <= '28') {
      city = 'Rio de Janeiro (RJ)';
      days = 'Chega em 2 a 3 dias úteis';
    } else if (prefix >= '30' && prefix <= '39') {
      city = 'Minas Gerais (MG)';
      days = 'Chega em 2 a 3 dias úteis';
    } else if (prefix >= '80' && prefix <= '87') {
      city = 'Paraná (PR)';
      days = 'Chega em 2 a 3 dias úteis';
    } else if (prefix >= '90' && prefix <= '99') {
      city = 'Rio Grande do Sul (RS)';
      days = 'Chega em 3 a 4 dias úteis';
    } else {
      city = 'Sua Cidade';
      days = 'Chega em 3 a 5 dias úteis com Frete Expresso';
    }

    setShippingResult({
      calculated: true,
      city,
      days,
      isFree: true
    });
  };

  return (
    <div id="comprar" className="flex flex-col gap-6 scroll-mt-24">
      {/* Editorial Category & Trust Kicker */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
        <span className="font-semibold text-red-500">Vila dos Brinquedos Oficial</span>
        <span aria-hidden="true">·</span>
        <span className="text-emerald-400 font-medium">Original com Nota Fiscal</span>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-balance leading-tight">
          Carrinho de Controle Remoto Homem-Aranha c/ Fumaça e Luzes LED
        </h1>
        <p className="mt-1.5 text-sm text-neutral-300">
          Edição Especial Drift Nitro com emissão real de vapor d’água gelado iluminado, tecnologia 2.4GHz anti-interferência e bateria recarregável.
        </p>
      </div>

      {/* Social Proof & Rating Bar */}
      <div className="flex flex-wrap items-center gap-4 text-xs pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="font-bold text-white text-sm">4.9</span>
          <span className="text-neutral-400">(428 avaliações)</span>
        </div>
        <span className="text-neutral-600 hidden sm:inline">|</span>
        <div className="text-neutral-400">
          <span className="font-semibold text-neutral-200">+1.840</span> unidades entregues
        </div>
        <span className="text-neutral-600 hidden sm:inline">|</span>
        <div className="flex items-center gap-1 text-emerald-400 font-medium">
          <Zap className="w-3.5 h-3.5 fill-emerald-400" />
          <span>98% recomendam este produto</span>
        </div>
      </div>

      {/* HIGH CONVERSION OFFERS SECTION */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Selecione a Sua Oferta Promocional:
            </h2>
          </div>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            PIX Exclusivo
          </span>
        </div>

        {/* 3 Offer Cards */}
        <div className="grid grid-cols-1 gap-3">
          {PRODUCT_PACKAGES.map((pkg) => {
            const isSelected = pkg.id === selectedPackageId;

            return (
              <div
                key={pkg.id}
                onClick={() => handleSelectPackage(pkg.id)}
                className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-red-600 bg-neutral-900/90 shadow-xl ring-2 ring-red-600/30'
                    : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 hover:bg-neutral-900/60'
                }`}
              >
                {/* Offer Main Info and Price */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'border-red-500 bg-red-600' : 'border-neutral-600'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                    </div>

                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                        {pkg.bonus}
                      </p>
                    </div>
                  </div>

                  {/* Price Stack */}
                  <div className="text-right shrink-0">
                    <p className="text-xs text-neutral-500 line-through">
                      De R$ {pkg.originalPrice.toFixed(2).replace('.', ',')}
                    </p>
                    <div className="flex items-baseline gap-1 justify-end">
                      <span className="text-xs text-emerald-400 font-bold">Por</span>
                      <span className="text-lg sm:text-2xl font-black text-white tabular-nums tracking-tight">
                        R$ {pkg.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <span className="inline-block text-[10px] font-bold text-emerald-400 uppercase tracking-wide bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                      no PIX
                    </span>
                  </div>
                </div>

                {/* Card Sub-Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80 text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <Truck className="w-3.5 h-3.5" />
                    Frete Grátis com Rastreio Expresso
                  </span>
                  <span className="font-semibold text-neutral-300">
                    Geração de QR Code Imediato
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Offer PIX Summary Box with Integrated Purchase CTA */}
      <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col gap-3.5 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-neutral-400">Valor Final da Oferta Selecionada:</p>
              <p className="text-xl sm:text-2xl font-black text-emerald-400 tabular-nums">
                R$ {selectedPackage.price.toFixed(2).replace('.', ',')}{' '}
                <span className="text-xs font-semibold text-neutral-300">no PIX</span>
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="inline-block text-[9px] sm:text-[10px] font-medium text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/30 whitespace-nowrap">
              ⚡ Aprovação instantânea
            </span>
            <p className="text-[9px] text-neutral-500 mt-0.5 whitespace-nowrap">QR Code na hora</p>
          </div>
        </div>

        {/* Integrated Purchase CTA Buttons (Compact & Polished) */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          <button
            onClick={() => onBuyNow(selectedPackageId)}
            className="flex-1 py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 transition-all cursor-pointer group"
          >
            <QrCode className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span>
              GERAR QR CODE PIX • R$ {selectedPackage.price.toFixed(2).replace('.', ',')}
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => onAddToCart(selectedPackageId)}
            className="py-3.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm border border-neutral-700 transition-all cursor-pointer whitespace-nowrap"
          >
            Adicionar ao Carrinho
          </button>
        </div>

        <div className="text-[11px] text-neutral-400 bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-800/60 flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>
            Pagamento 100% seguro via PIX homologado pelo Banco Central com envio no mesmo dia.
          </span>
        </div>
      </div>

      {/* Shipping / CEP Simulator */}
      <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300 mb-2">
          <Truck className="w-4 h-4 text-red-500" />
          <span>Calcular Prazo e Frete de Entrega:</span>
        </div>
        <form onSubmit={handleCalculateShipping} className="flex gap-2">
          <input
            type="text"
            placeholder="Digite seu CEP (ex: 01001-000)"
            maxLength={9}
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="flex-1 px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
          />
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
          >
            Calcular
          </button>
        </form>

        {shippingResult?.calculated && (
          <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-xs">
            <div className="flex items-center justify-between text-emerald-300 font-semibold">
              <span>{shippingResult.city}</span>
              <span className="uppercase text-emerald-400 font-bold">Frete Grátis</span>
            </div>
            <p className="text-neutral-300 text-[11px] mt-0.5">
              {shippingResult.days} através da transportadora expressa do Mercado Envios Full.
            </p>
          </div>
        )}
      </div>

      {/* Trust & Guarantee Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-neutral-300 text-xs">
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-900/40 border border-neutral-800/60">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Garantia de 90 Dias</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-900/40 border border-neutral-800/60">
          <RefreshCw className="w-4 h-4 text-blue-400 shrink-0" />
          <span>Devolução Grátis em 30 Dias</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-900/40 border border-neutral-800/60 col-span-2 sm:col-span-1">
          <Zap className="w-4 h-4 text-yellow-400 shrink-0" />
          <span>Envio no Mesmo Dia</span>
        </div>
      </div>
    </div>
  );
};
