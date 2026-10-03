import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductGallery } from './components/ProductGallery';
import { PurchaseModule } from './components/PurchaseModule';
import { StoryVideoSection } from './components/StoryVideoSection';
import { FeatureShowcase } from './components/FeatureShowcase';
import { HowItWorks } from './components/HowItWorks';
import { TechSpecsTable } from './components/TechSpecsTable';
import { UnboxingSection } from './components/UnboxingSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { MidPageCta, FinalPageCta } from './components/CtaBanners';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';

import { PRODUCT_IMAGES, PRODUCT_PACKAGES } from './data/productData';
import { CartItem } from './types/product';
import { Check, ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'pkg-single',
      name: '1x Carrinho Homem-Aranha Drift Nitro (Escala 1:24)',
      packageType: 'single',
      price: 49.90,
      originalPrice: 99.90,
      quantity: 1,
      image: PRODUCT_IMAGES[0].src
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (packageId: 'single' | 'double' | 'triple') => {
    const pkg = PRODUCT_PACKAGES.find(p => p.id === packageId) || PRODUCT_PACKAGES[0];
    const itemId = `pkg-${pkg.id}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          name: pkg.name,
          packageType: pkg.id,
          price: pkg.price,
          originalPrice: pkg.originalPrice,
          quantity: 1,
          image: PRODUCT_IMAGES[0].src
        }
      ];
    });

    showToast(`Adicionado ao carrinho: ${pkg.name}!`);
    setIsCartOpen(true);
  };

  const handleBuyNow = (packageId: 'single' | 'double' | 'triple') => {
    const pkg = PRODUCT_PACKAGES.find(p => p.id === packageId) || PRODUCT_PACKAGES[0];
    const itemId = `pkg-${pkg.id}`;

    // Define o carrinho diretamente para o pacote escolhido para garantir que o total e o PIX correspondam exatamente
    setCartItems([
      {
        id: itemId,
        name: pkg.name,
        packageType: pkg.id,
        price: pkg.price,
        originalPrice: pkg.originalPrice,
        quantity: 1,
        image: PRODUCT_IMAGES[0].src
      }
    ]);

    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckoutFromCart = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  const scrollToOffer = () => {
    const el = document.getElementById('oferta');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div id="inicio" className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-red-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-900/90 border border-emerald-500 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 backdrop-blur-md text-xs font-semibold animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onBuyNowClick={() => handleBuyNow('single')}
      />

      {/* Main PDP Container (Baseline 1440px viewport presence) */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Gallery (6 cols) */}
            <div className="lg:col-span-6 lg:sticky lg:top-24">
              <ProductGallery images={PRODUCT_IMAGES} />
            </div>

            {/* Right: Purchase Module (6 cols) */}
            <div id="oferta" className="lg:col-span-6 scroll-mt-24">
              <PurchaseModule
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            </div>
          </div>
        </div>

        {/* Video Demonstrativo Wistia (Story 1080x1920 - 9:16) */}
        <StoryVideoSection />

        {/* Customer Reviews & Social Proof (Moved directly below video) */}
        <ReviewsSection />

        {/* Feature Highlights */}
        <FeatureShowcase />

        {/* How It Works Guide */}
        <HowItWorks />

        {/* Technical Specifications Table */}
        <TechSpecsTable />

        {/* CTA 1: Metade do fim da página */}
        <MidPageCta onScrollToOffer={scrollToOffer} />

        {/* What Comes In The Box */}
        <UnboxingSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA 2: Fim da página (antes do rodapé) */}
        <FinalPageCta onScrollToOffer={scrollToOffer} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Action Bar (capped at <= 15% height, single-line) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-neutral-950/95 border-t border-neutral-800 p-3 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div>
            <p className="text-[10px] text-neutral-400">A partir de</p>
            <p className="text-base font-extrabold text-white tabular-nums leading-none">
              R$ 49,90 <span className="text-[10px] text-emerald-400 font-bold">no Pix</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Abrir carrinho"
              className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleBuyNow('single')}
              className="py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-900/40 cursor-pointer whitespace-nowrap"
            >
              <span>Comprar Agora</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckoutFromCart}
      />

      {/* Full Simulated Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
