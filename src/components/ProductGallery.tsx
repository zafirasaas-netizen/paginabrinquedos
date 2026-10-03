import React, { useState, useEffect } from 'react';
import { ProductImage } from '../types/product';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';

interface ProductGalleryProps {
  images: ProductImage[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const activeImage = images[selectedIndex] || images[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Carrossel Automático Infinito de 4 em 4 segundos
  useEffect(() => {
    if (isZoomOpen || isPaused || images.length <= 1) return;

    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length, isZoomOpen, isPaused]);

  const openModal = () => {
    setIsImageZoomed(false);
    setIsZoomOpen(true);
  };

  const closeModal = () => {
    setIsZoomOpen(false);
    setIsImageZoomed(false);
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsImageZoomed((prev) => !prev);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    if (isZoomOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen]);

  return (
    <div id="galeria" className="w-full flex flex-col gap-4">
      {/* Main Showcase Image Container with Automatic Infinite Slide */}
      <div
        onClick={openModal}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        title="Clique para abrir e ampliar a imagem"
        className="relative group bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden aspect-square flex items-center justify-center shadow-2xl cursor-pointer"
      >
        {/* Sliding Track (da esquerda para a direita) */}
        <div
          className="w-full h-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div
              key={img.id || idx}
              className="w-full h-full shrink-0 flex items-center justify-center p-1 relative"
            >
              <img
                src={img.src}
                alt={img.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain object-center select-none pointer-events-none transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </div>
          ))}
        </div>

        {/* Left / Right Nav Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Foto anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-950/70 hover:bg-neutral-900 text-white flex items-center justify-center border border-neutral-700 opacity-80 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-sm shadow-md z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Próxima foto"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-950/70 hover:bg-neutral-900 text-white flex items-center justify-center border border-neutral-700 opacity-80 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-sm shadow-md z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Subtle timer progress bar at bottom of main image */}
        <div className="absolute bottom-0 inset-x-0 h-0.5 bg-neutral-800/40">
          <div
            key={selectedIndex}
            className="h-full bg-red-600/70 transition-all"
            style={{
              animation: isPaused ? 'none' : 'galleryProgress 4s linear infinite',
            }}
          />
        </div>
      </div>

      {/* Clean Unobtrusive Caption Below Image */}
      <div className="px-1 flex items-center justify-between text-xs text-neutral-400">
        <span className="font-medium text-neutral-300 truncate">{activeImage.caption}</span>
        <span className="tabular-nums text-neutral-500 shrink-0 ml-2">{selectedIndex + 1} de {images.length}</span>
      </div>

      {/* Thumbnails Row (Square 1:1) */}
      <div className="grid grid-cols-6 gap-2 sm:gap-3">
        {images.map((img, idx) => {
          const isSelected = idx === selectedIndex;
          return (
            <button
              key={img.id || idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-neutral-900 ${
                isSelected
                  ? 'border-red-600 ring-2 ring-red-600/30 shadow-md'
                  : 'border-neutral-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>

      {/* Zoom / Fullscreen Modal (Click anywhere to close, click image or buttons to zoom) */}
      {isZoomOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 cursor-pointer select-none"
        >
          {/* Top Bar with Instructions & Controls */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between text-xs text-neutral-400 z-20">
            <span className="bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm text-neutral-300">
              Clique em qualquer lugar da tela para fechar
            </span>
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={toggleZoom}
                className="p-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700 transition-colors cursor-pointer"
                title={isImageZoomed ? 'Diminuir zoom' : 'Aumentar zoom'}
              >
                {isImageZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </button>
              <button
                onClick={closeModal}
                aria-label="Fechar visualizador"
                className="p-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Image Container */}
          <div
            className="max-w-6xl max-h-[85vh] relative flex flex-col items-center justify-center overflow-hidden"
            onClick={(e) => {
              if (isImageZoomed) {
                e.stopPropagation();
                setIsImageZoomed(false);
              }
            }}
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              referrerPolicy="no-referrer"
              onClick={toggleZoom}
              className={`max-w-full max-h-[80vh] object-contain rounded-2xl transition-transform duration-300 ${
                isImageZoomed
                  ? 'scale-150 sm:scale-[1.8] cursor-zoom-out'
                  : 'scale-100 cursor-zoom-in'
              }`}
            />
            <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-medium text-center bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
              {activeImage.caption} ({selectedIndex + 1} de {images.length})
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
