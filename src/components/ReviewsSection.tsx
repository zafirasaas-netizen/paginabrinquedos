import React, { useState, useEffect, useRef } from 'react';
import { REVIEWS } from '../data/productData';
import { ReviewMedia } from '../types/product';
import { Star, ThumbsUp, CheckCircle, MessageSquare, Play, X, ZoomIn, ZoomOut, VolumeX, Loader2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [activeMedia, setActiveMedia] = useState<{ media: ReviewMedia; author: string } | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleLike = (id: string) => {
    setReviewsList(prev =>
      prev.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r)
    );
  };

  const closeModal = () => {
    setActiveMedia(null);
    setIsZoomed(false);
    setIsVideoLoading(true);
    setVideoError(false);
    setIsVideoMuted(false);
  };

  // Reset video state when activeMedia changes
  useEffect(() => {
    if (activeMedia?.media.type === 'video') {
      setIsVideoLoading(true);
      setVideoError(false);
      setIsVideoMuted(false);
    }
  }, [activeMedia]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    if (activeMedia) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMedia]);

  const filtered = filterRating
    ? reviewsList.filter(r => r.rating === filterRating)
    : reviewsList;

  const WISTIA_DIRECT_MP4_MAP: Record<string, string> = {
    '550i47u1eab25j6': 'https://embed-ssl.wistia.com/deliveries/e6f7a5692b5a02beaf5cdb5d93a40096a1e0ffb8.bin',
    'gg076gwia0': 'https://embed-ssl.wistia.com/deliveries/e6f7a5692b5a02beaf5cdb5d93a40096a1e0ffb8.bin',
    'sudiieo9oa43bba': 'https://embed-ssl.wistia.com/deliveries/4fbdd7a63d0aa90b850994cbedcdb728.bin',
    'ihgzpdkqov': 'https://embed-ssl.wistia.com/deliveries/4fbdd7a63d0aa90b850994cbedcdb728.bin',
    'pf3dqaupb07hvdu': 'https://embed-ssl.wistia.com/deliveries/a1656e1e50fbee4d86dd51a64547347a.bin',
    '3dh16xxhh7': 'https://embed-ssl.wistia.com/deliveries/a1656e1e50fbee4d86dd51a64547347a.bin',
    '8gflwybwpvv16om': 'https://embed-ssl.wistia.com/deliveries/dea81f3da167775d8397094b53f0cac7c0f95064.bin',
    '5lm3kdcw53': 'https://embed-ssl.wistia.com/deliveries/dea81f3da167775d8397094b53f0cac7c0f95064.bin',
    'wh5h305uyvr4vc4': 'https://embed-ssl.wistia.com/deliveries/965e0c5c745eaea29c5cf1d2c61b600b0368b5a8.bin',
    'ksmhljfl4p': 'https://embed-ssl.wistia.com/deliveries/965e0c5c745eaea29c5cf1d2c61b600b0368b5a8.bin',
    'p2b7x5q57z': 'https://embed-ssl.wistia.com/deliveries/09d4455a160ebc62aa940b0d8760b44b5e67cd20.bin',
  };

  const getDirectVideoUrl = (src: string): string | null => {
    const cleanSrc = src.replace('/file.mp4', '');
    if (cleanSrc.endsWith('.bin') || cleanSrc.includes('/deliveries/') || cleanSrc.endsWith('.mp4')) {
      return cleanSrc;
    }
    for (const [key, validUrl] of Object.entries(WISTIA_DIRECT_MP4_MAP)) {
      if (cleanSrc.includes(key)) {
        return validUrl;
      }
    }
    return null;
  };

  const handleVideoLoadedMetadata = () => {
    setIsVideoLoading(false);
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Strict mobile policies block unmuted autoplay; fallback to muted inline play
          console.warn('Mobile unmuted autoplay prevented, playing muted:', err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsVideoMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsVideoMuted(newMuted);
    }
  };

  const WISTIA_SHARE_MAP: Record<string, string> = {
    '550i47u1eab25j6': 'gg076gwia0',
    'sudiieo9oa43bba': 'ihgzpdkqov',
    'pf3dqaupb07hvdu': '3dh16xxhh7',
    '8gflwybwpvv16om': '5lm3kdcw53',
    'wh5h305uyvr4vc4': 'ksmhljfl4p',
  };

  const getVideoEmbedUrl = (src: string) => {
    for (const [shareId, mediaId] of Object.entries(WISTIA_SHARE_MAP)) {
      if (src.includes(shareId)) {
        return `https://fast.wistia.net/embed/iframe/${mediaId}?autoPlay=true&wmode=transparent`;
      }
    }
    if (src.includes('wistia.com/s/')) {
      const id = src.split('wistia.com/s/')[1]?.split('?')[0]?.replace(/\/$/, '');
      if (WISTIA_SHARE_MAP[id]) {
        return `https://fast.wistia.net/embed/iframe/${WISTIA_SHARE_MAP[id]}?autoPlay=true&wmode=transparent`;
      }
      return `https://fast.wistia.net/embed/iframe/${id}?autoPlay=true&wmode=transparent`;
    }
    if (src.includes('wistia.com/medias/')) {
      const id = src.split('wistia.com/medias/')[1]?.split('?')[0]?.replace(/\/$/, '');
      return `https://fast.wistia.net/embed/iframe/${id}?autoPlay=true&wmode=transparent`;
    }
    if (src.includes('fast.wistia.net/embed/iframe/')) {
      return src.includes('?') ? src : `${src}?autoPlay=true&wmode=transparent`;
    }
    return src;
  };

  return (
    <section id="avaliacoes" className="py-10 sm:py-14 border-t border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-red-500 uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Opiniões Verificadas</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              Quem Comprou, Amou! Veja as Avaliações Reais
            </h2>
            <p className="mt-1 text-xs text-neutral-400">
              Mais de 428 clientes satisfeitos avaliaram com média 4.9 de 5 estrelas.
            </p>
          </div>

          {/* Quick Rating Filter buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setFilterRating(null)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-colors cursor-pointer ${
                filterRating === null
                  ? 'bg-neutral-100 text-neutral-900 font-semibold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilterRating(5)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                filterRating === 5
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <Star className="w-3 h-3 fill-current" />
              5 Estrelas
            </button>
          </div>
        </div>

        {/* Rating Summary Card (Centered & Compact) */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="w-full max-w-md bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 sm:p-5 flex flex-col justify-center items-center text-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums">4.9</span>
            <div className="flex items-center text-amber-400 my-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[11px] text-neutral-400">
              Baseado em 428 avaliações de compradores verificados
            </span>
            <div className="w-full mt-3 pt-3 border-t border-neutral-800 text-[11px] text-emerald-400 font-medium flex items-center justify-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 shrink-0" />
              <span>98% dos compradores recomendam este produto</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid (Compact, Proportional Size with 4 Media Slots per Review) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:border-neutral-700/80 transition-colors shadow-sm"
            >
              <div>
                {/* Author Info & Rating */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-bold text-white">{rev.author}</span>
                      {rev.verified && (
                        <span className="text-[9px] font-semibold text-emerald-400 flex items-center gap-0.5 bg-emerald-950/40 px-1 py-0.5 rounded border border-emerald-800/30">
                          <CheckCircle className="w-2.5 h-2.5" />
                          Verificado
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-500">
                      {rev.location} · {rev.date}
                    </span>
                  </div>

                  <div className="flex items-center text-amber-400 shrink-0">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {rev.highlight && (
                  <div className="mb-1.5">
                    <span className="text-[11px] font-semibold text-red-400">
                      "{rev.highlight}"
                    </span>
                  </div>
                )}

                <h4 className="text-xs sm:text-sm font-semibold text-white mb-1.5">
                  {rev.title}
                </h4>

                <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                  {rev.comment}
                </p>

                {/* Media Cards (Images & Video) */}
                {rev.media && rev.media.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-neutral-800/60">
                    <p className="text-[10px] font-medium text-neutral-400 mb-1.5 flex items-center justify-between">
                      <span>{rev.media.length === 1 && rev.media[0].type === 'video' ? 'Vídeo do comprador:' : 'Fotos & Vídeo do comprador:'}</span>
                      <span className="text-[9px] text-neutral-500">
                        {rev.media.length === 1 ? '1 mídia' : `${rev.media.length} mídias`}
                      </span>
                    </p>
                    <div className={rev.media.length === 1 ? "flex" : "grid grid-cols-4 gap-1.5"}>
                      {rev.media.slice(0, 4).map((item, idx) => {
                        const isVideo = item.type === 'video';
                        const thumbSrc = isVideo ? (item.thumbnail || item.src) : item.src;

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setIsZoomed(false);
                              setActiveMedia({ media: item, author: rev.author });
                            }}
                            title={isVideo ? 'Assistir vídeo do cliente' : 'Ver foto ampliada'}
                            className={`relative rounded-lg overflow-hidden border border-neutral-800 hover:border-neutral-600 bg-neutral-950 group cursor-pointer transition-all ${
                              rev.media && rev.media.length === 1
                                ? 'w-36 sm:w-40 aspect-video'
                                : 'aspect-square'
                            }`}
                          >
                            <img
                              src={thumbSrc}
                              alt={item.alt || `Mídia ${idx + 1}`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            {isVideo ? (
                              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex flex-col items-center justify-center transition-colors">
                                <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md">
                                  <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                                </div>
                                <span className="text-[8px] font-bold text-white uppercase tracking-wider mt-0.5 drop-shadow">
                                  Assistir Vídeo
                                </span>
                              </div>
                            ) : (
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Useful Vote Button */}
              <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Esta avaliação foi útil?</span>
                <button
                  onClick={() => handleLike(rev.id)}
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span className="tabular-nums font-medium">{rev.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Media Lightbox Modal (Click anywhere to close!) */}
      {activeMedia && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 cursor-pointer select-none"
        >
          {/* Header Bar */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between text-xs text-neutral-400 z-20">
            <span className="bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm text-neutral-300">
              Clique em qualquer lugar da tela para fechar
            </span>
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {activeMedia.media.type === 'image' && (
                <button
                  onClick={() => setIsZoomed((prev) => !prev)}
                  className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 transition-colors cursor-pointer"
                  title={isZoomed ? 'Diminuir zoom' : 'Aumentar zoom'}
                >
                  {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                </button>
              )}
              <button
                onClick={closeModal}
                aria-label="Fechar visualizador"
                className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Media Content */}
          <div
            className="max-w-4xl max-h-[85vh] w-full relative flex flex-col items-center justify-center p-2"
            onClick={(e) => {
              if (activeMedia.media.type === 'video') {
                e.stopPropagation(); // keep video click interactive
              } else if (isZoomed) {
                e.stopPropagation();
                setIsZoomed(false);
              }
            }}
          >
            {activeMedia.media.type === 'video' ? (
              (() => {
                const directUrl = getDirectVideoUrl(activeMedia.media.src);
                return (
                  <div className="w-full max-w-md sm:max-w-xl aspect-[9/16] sm:aspect-video rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl bg-black flex items-center justify-center relative">
                    {/* Loading Spinner for mobile and slow connections */}
                    {isVideoLoading && !videoError && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 backdrop-blur-xs gap-2 pointer-events-none">
                        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
                        <span className="text-[11px] text-neutral-300 font-medium">Carregando vídeo...</span>
                      </div>
                    )}

                    {!videoError && directUrl ? (
                      <>
                        <video
                          ref={videoRef}
                          key={directUrl}
                          controls
                          autoPlay
                          playsInline
                          preload="auto"
                          poster={activeMedia.media.thumbnail}
                          controlsList="nodownload"
                          onLoadedMetadata={handleVideoLoadedMetadata}
                          onCanPlay={() => setIsVideoLoading(false)}
                          onPlaying={() => setIsVideoLoading(false)}
                          onWaiting={() => setIsVideoLoading(true)}
                          onError={() => {
                            console.warn('Video load error, fallback to iframe');
                            setVideoError(true);
                          }}
                          className="w-full h-full object-contain bg-black"
                        >
                          <source src={directUrl} type="video/mp4" />
                          Seu navegador não suporta reprodução de vídeo.
                        </video>

                        {/* Mobile Audio Notice & Unmute button */}
                        {isVideoMuted && (
                          <button
                            type="button"
                            onClick={toggleMute}
                            className="absolute bottom-16 sm:bottom-4 right-4 z-20 px-3 py-1.5 rounded-full bg-red-600/95 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xl backdrop-blur-sm transition-transform active:scale-95 cursor-pointer animate-pulse"
                          >
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>Toque para ativar o som</span>
                          </button>
                        )}
                      </>
                    ) : (
                      <iframe
                        src={getVideoEmbedUrl(activeMedia.media.src)}
                        title="Vídeo da avaliação"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    )}
                  </div>
                );
              })()
            ) : (
              <img
                src={activeMedia.media.src}
                alt={activeMedia.media.alt || 'Foto da avaliação'}
                referrerPolicy="no-referrer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed((prev) => !prev);
                }}
                className={`max-w-full max-h-[75vh] object-contain rounded-2xl transition-transform duration-300 ${
                  isZoomed
                    ? 'scale-150 sm:scale-[1.8] cursor-zoom-out'
                    : 'scale-100 cursor-zoom-in'
                }`}
              />
            )}

            <div className="mt-3 text-center bg-black/60 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
              <p className="text-xs sm:text-sm text-neutral-200 font-medium">
                {activeMedia.media.alt || 'Mídia enviada por'} — <span className="text-red-400 font-semibold">{activeMedia.author}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;
