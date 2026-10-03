import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, RotateCcw } from 'lucide-react';
import actionHeroImg from '../assets/images/hero_spiderman_car_action_1790984172056.jpg';

const HD_VIDEO_URL = 'https://embed-ssl.wistia.com/deliveries/09d4455a160ebc62aa940b0d8760b44b5e67cd20.bin';

export const StoryVideoSection: React.FC = () => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 3-second delay timer so visitor can see the cover image
  useEffect(() => {
    if (hasStarted) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          startPlayback();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasStarted]);

  const startPlayback = () => {
    setHasStarted(true);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback for strict browser autoplay policies
        setIsPlaying(false);
      });
    }
  };

  const handleTogglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!hasStarted) {
      startPlayback();
      return;
    }

    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(current);
    }
  };

  return (
    <section className="py-12 sm:py-16 border-t border-neutral-800 bg-neutral-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Veja o Carrinho em Ação na Prática
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400">
            Confira a emissão da fumaça real, aceleração rápida e manobras gravadas em formato vertical.
          </p>
        </div>

        {/* 1080 x 1920 (9:16 Instagram Story) Card - 80% container sizing */}
        <div className="flex justify-center items-center">
          <div
            onClick={handleTogglePlay}
            className="w-[80%] max-w-[360px] sm:max-w-[390px] aspect-[9/16] relative rounded-3xl overflow-hidden bg-neutral-900 border-2 border-neutral-800 shadow-2xl shadow-red-950/30 group cursor-pointer select-none"
          >
            {/* HTML5 Native Video (Zero Wistia Logo) */}
            <video
              ref={videoRef}
              src={HD_VIDEO_URL}
              playsInline
              loop
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className={`w-full h-full object-cover transition-opacity duration-700 ${
                hasStarted ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />

            {/* Cover Image & Countdown (Visible during the 3-second delay or before starting) */}
            {!hasStarted && (
              <div className="absolute inset-0 z-20 flex flex-col justify-between p-5 transition-opacity duration-500">
                {/* Background Poster Image */}
                <img
                  src={actionHeroImg}
                  alt="Capa do carrinho Homem-Aranha"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.75] group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 pointer-events-none" />

                {/* Story Top Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-neutral-900 border border-white/20 p-0.5 flex items-center justify-center shadow-md overflow-hidden shrink-0">
                      <img
                        src="https://i.imgur.com/ibc5f6o.png"
                        alt="Logo Vila dos Brinquedos"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/src/assets/images/logo.png';
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white drop-shadow">Vila dos Brinquedos</p>
                      <p className="text-[10px] text-neutral-300 drop-shadow">Vídeo Oficial · 1080x1920</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-red-600/90 text-[10px] font-bold text-white shadow">
                    Iniciando em {secondsRemaining}s
                  </span>
                </div>

                {/* Center Play Button with 3s Countdown Ring */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-red-600/90 group-hover:bg-red-500 group-hover:scale-110 active:scale-95 text-white flex items-center justify-center shadow-2xl shadow-red-900/70 transition-all border border-red-400/40">
                      <Play className="w-8 h-8 fill-white ml-1" />
                    </div>
                  </div>

                  <div className="mt-4 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-white tracking-wide">
                    Clique para Iniciar Agora
                  </div>
                </div>

                {/* Story Bottom Bar */}
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center justify-between text-xs text-white">
                    <span className="font-semibold text-yellow-300 drop-shadow">
                      ⚡ Fumaça Nitro em Ação Real
                    </span>
                    <span className="text-[11px] text-neutral-300 font-mono">
                      Auto-play em {secondsRemaining}s
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-200 drop-shadow line-clamp-2">
                    Gravação demonstrativa mostrando a potência do vapor, luzes LED e manobras 360° em piso liso.
                  </p>
                  {/* Countdown Progress Bar */}
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-red-500 h-full transition-all duration-1000 ease-linear rounded-full"
                      style={{ width: `${((3 - secondsRemaining) / 3) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Active Video Player Controls & Overlay (When Playing) */}
            {hasStarted && (
              <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 pointer-events-none">
                {/* Top Story Bar with Sound & Restart */}
                <div className="flex items-center justify-between pointer-events-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-neutral-900 border border-white/20 p-0.5 flex items-center justify-center shadow overflow-hidden shrink-0">
                      <img
                        src="https://i.imgur.com/ibc5f6o.png"
                        alt="Logo Vila dos Brinquedos"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/src/assets/images/logo.png';
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-white drop-shadow">Vila dos Brinquedos</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Audio Toggle Button */}
                    <button
                      onClick={handleToggleMute}
                      aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md text-xs font-semibold text-white border border-white/20 shadow-lg cursor-pointer transition-all active:scale-95"
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-red-400" />
                          <span>Ativar Som</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Som Ligado</span>
                        </>
                      )}
                    </button>

                    {/* Restart Button */}
                    <button
                      onClick={handleRestart}
                      aria-label="Reiniciar vídeo"
                      className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 cursor-pointer transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Floating Play / Pause Indicator on Hover/Pause */}
                {!isPlaying && (
                  <div className="my-auto flex flex-col items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/20 shadow-2xl">
                      <Play className="w-7 h-7 fill-white ml-0.5" />
                    </div>
                    <span className="mt-2 text-xs font-semibold text-white drop-shadow bg-black/50 px-2.5 py-0.5 rounded-full">
                      Pausado
                    </span>
                  </div>
                )}

                {/* Bottom Story Progress Bar */}
                <div className="pointer-events-auto">
                  <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden backdrop-blur-sm">
                    <div
                      className="bg-red-500 h-full rounded-full transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
