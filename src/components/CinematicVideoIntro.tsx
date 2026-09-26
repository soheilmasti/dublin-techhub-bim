import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BookOpen, Layers, ChevronDown, Sparkles, Eye } from 'lucide-react';
import { LanguageCode } from '../utils/i18n';
import { sound } from '../utils/audio';

interface CinematicVideoIntroProps {
  currentLanguage: LanguageCode;
  onEnter3D: () => void;
  onOpenFlipbook?: () => void;
  onNavigateToView?: (view: 'bim-outsourcing' | 'client-portal' | 'partners' | 'resume') => void;
}

export const CinematicVideoIntro: React.FC<CinematicVideoIntroProps> = ({
  currentLanguage,
  onEnter3D,
  onOpenFlipbook
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Wheel accumulation tracking
  const wheelAccumulator = useRef(0);
  const MAX_WHEEL_DELTA = 200; // Total delta needed to completely dissolve the intro

  const touchStartY = useRef<number | null>(null);

  // Smooth dismiss / Enter 3D
  const triggerEnter3D = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    sound.playDrawerOpen();
    setScrollProgress(1);

    setTimeout(() => {
      onEnter3D();
    }, 450);
  }, [isTransitioning, onEnter3D]);

  // Wheel listener
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isTransitioning) return;

    wheelAccumulator.current += e.deltaY;
    if (wheelAccumulator.current < 0) wheelAccumulator.current = 0;

    const progress = Math.min(1, wheelAccumulator.current / MAX_WHEEL_DELTA);
    setScrollProgress(progress);

    if (progress >= 1) {
      triggerEnter3D();
    }
  }, [isTransitioning, triggerEnter3D]);

  // Touch listener for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartY.current = e.touches[0].clientY;
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null || isTransitioning) return;
    const currentY = e.touches[0].clientY;
    const absDiff = Math.abs(currentY - touchStartY.current);

    if (absDiff > 10) {
      const progress = Math.min(1, absDiff / 130);
      setScrollProgress(progress);
      if (progress >= 1) {
        triggerEnter3D();
      }
    }
  };

  const handleTouchEnd = () => {
    if (scrollProgress < 0.55 && !isTransitioning) {
      setScrollProgress(0);
      wheelAccumulator.current = 0;
    } else if (scrollProgress >= 0.55 && !isTransitioning) {
      triggerEnter3D();
    }
    touchStartY.current = null;
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  // Ensure video autoplays smoothly
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const opacity = Math.max(0, 1 - scrollProgress);
  const scale = 1 + scrollProgress * 0.04;
  const isRTL = currentLanguage === 'fa';

  return (
    <div
      onClick={triggerEnter3D}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        opacity: opacity,
        transform: `scale(${scale})`,
        pointerEvents: opacity < 0.02 ? 'none' : 'auto',
        transition: isTransitioning
          ? 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
          : 'opacity 0.08s ease-out'
      }}
      className="fixed inset-0 z-50 flex items-center justify-center select-none overflow-hidden cursor-pointer bg-gradient-to-br from-[#e4e3e4] via-[#dbd9da] to-[#cfcdcd] h-[100dvh] w-full"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Cinematic Video/Poster */}
      <div className="relative w-full h-full flex items-center justify-center p-0 m-0">
        <video
          ref={videoRef}
          src="/intro-rings.mp4"
          poster="/intro-rings-poster.jpg"
          autoPlay
          muted
          playsInline
          // @ts-ignore
          webkit-playsinline="true"
          preload="auto"
          className="w-full h-full object-contain pointer-events-none select-none max-w-full max-h-full"
        />

        {/* Top Studio Label */}
        <div className="absolute top-6 inset-x-0 flex justify-center pointer-events-none px-4">
          <div className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-black/10 shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest font-black text-gray-900 uppercase">
              BIMCO STUDIO BARCELONA • BIMCO.ES
            </span>
          </div>
        </div>

        {/* Interactive Center/Hero Flipbook Feature Card (در تصویر اصلی اگر کلیک شد دفترچه باز شود و ورق بخورد) */}
        <div 
          className="absolute bottom-16 sm:bottom-12 inset-x-4 sm:inset-x-auto max-w-xl mx-auto z-20 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-slate-950/85 hover:bg-slate-950/95 text-white backdrop-blur-xl border border-amber-500/40 hover:border-amber-400 shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-3xl p-4 sm:p-5 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Booklet Info */}
              <div className="flex items-center gap-3.5 text-center sm:text-start">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
                  <BookOpen className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                      Interactive Monograph
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      3 Volumes
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-white mt-1">
                    {isRTL ? 'دفترچه تعاملی پورتفولیو استودیو' : 'Interactive Studio Portfolio Monograph'}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                    {isRTL 
                      ? 'کلیک کنید تا دفترچه باز شود و ورق بخورد (پلان‌ها، ویلاها، نماها)' 
                      : 'Click to open 3D booklet and flip through architectural sheets'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-center">
                {onOpenFlipbook && (
                  <button
                    onClick={() => {
                      sound.playPageFlip();
                      onOpenFlipbook();
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition-all shadow-lg hover:shadow-amber-500/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    title={isRTL ? 'ورق زدن دفترچه پورتفولیو' : 'Flip through booklet'}
                  >
                    <BookOpen className="w-4 h-4 text-slate-950" />
                    <span>{isRTL ? 'ورق زدن دفترچه' : 'Open Flipbook'}</span>
                  </button>
                )}

                <button
                  onClick={triggerEnter3D}
                  className="px-3 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/10"
                  title={isRTL ? 'ورود به ماکت سه‌بعدی' : 'Enter 3D City'}
                >
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden sm:inline">{isRTL ? 'ماکت ۳بعدی' : '3D City'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hint */}
        <div className="absolute bottom-3 inset-x-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-gray-700/80 bg-white/60 backdrop-blur-xs px-3 py-1 rounded-full shadow-xs">
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            <span>{isRTL ? 'اسکرول کنید یا کلیک کنید تا وارد ماکت شوید' : 'Scroll down or click to enter 3D city model'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

