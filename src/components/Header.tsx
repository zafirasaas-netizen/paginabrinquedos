import React from 'react';
import { ShoppingBag, Package } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onBuyNowClick: () => void;
  onOpenCustomerPortal?: () => void;
  hasActiveOrder?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  onOpenCart, 
  onBuyNowClick,
  onOpenCustomerPortal,
  hasActiveOrder = false
}) => {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800">
      {/* Strict Top Bar Contract: 3 Zones */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Zone 1: Brand Logo & Text side-by-side */}
        <a
          href="#inicio"
          className="text-sm sm:text-base md:text-xl font-black tracking-tight text-white hover:text-red-500 transition-colors flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0"
        >
          <img
            src="https://i.imgur.com/ibc5f6o.png"
            alt="Logo Vila dos Brinquedos"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/src/assets/images/logo.png';
            }}
          />
          <span className="whitespace-nowrap">Vila dos Brinquedos</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <a href="#galeria" className="hover:text-white transition-colors">Galeria</a>
          <a href="#recursos" className="hover:text-white transition-colors">Recursos</a>
          <a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a>
          <a href="#ficha-tecnica" className="hover:text-white transition-colors">Ficha Técnica</a>
          <a href="#o-que-vem" className="hover:text-white transition-colors">Na Caixa</a>
          <a href="#avaliacoes" className="hover:text-white transition-colors">Avaliações</a>
          {onOpenCustomerPortal && (
            <button
              onClick={onOpenCustomerPortal}
              className="text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-semibold text-xs bg-neutral-900/80 hover:bg-neutral-800 px-2.5 py-1 rounded-full border border-neutral-800"
            >
              <span>Aba de Clientes</span>
              {hasActiveOrder && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenCustomerPortal && (
            <button
              onClick={onOpenCustomerPortal}
              title="Aba de Clientes • Acompanhar Pedido"
              className="relative p-2.5 text-neutral-200 hover:text-white rounded-lg hover:bg-neutral-900 border border-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer md:hidden"
            >
              <Package className="w-4 h-4 text-emerald-400" />
              {hasActiveOrder && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              )}
            </button>
          )}

          <button
            onClick={onOpenCart}
            aria-label="Abrir carrinho de compras"
            className="relative p-2.5 text-neutral-200 hover:text-white rounded-lg hover:bg-neutral-900 border border-neutral-800 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-neutral-300" />
            <span className="hidden sm:inline text-xs font-medium">Carrinho</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onBuyNowClick}
            className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-500 active:scale-[0.98] rounded-lg shadow-sm shadow-red-900/40 transition-all cursor-pointer whitespace-nowrap"
          >
            Comprar Agora
          </button>
        </div>
      </div>
    </header>
  );
};
