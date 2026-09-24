import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronDown, 
  ArrowRight, 
  Sparkles, 
  Box, 
  Layers, 
  MousePointerClick,
  Compass
} from 'lucide-react';
import { LanguageCode } from '../utils/i18n';
import { sound } from '../utils/audio';

interface CinematicVideoIntroProps {
  currentLanguage: LanguageCode;
  onEnter3D: () => void;
  onNavigateToView: (view: 'bim-outsourcing' | 'client-portal' | 'partners' | 'resume') => void;
}

export const CinematicVideoIntro: React.FC<CinematicVideoIntroProps> = ({
  currentLanguage,
  onEnter3D,
  onNavigateToView
}) => {
  const isRTL = currentLanguage === 'fa';
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Wheel accumulation tracking
  const wheelAccumulator = useRef(0);
  const MAX_WHEEL_DELTA = 300; // Total delta needed to completely dissolve the intro

  const touchStartY = useRef<number | null>(null);

  // Smooth dismiss / Enter 3D
  const triggerEnter3D = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    sound.playDrawerOpen();
    setScrollProgress(1);

    setTimeout(() => {
      onEnter3D();
    }, 550);
  }, [isTransitioning, onEnter3D]);

  // Wheel listener
  const handleWheel = useCallback((e: WheelEvent) => {
    // Only scroll down dissolves
    if (isTransitioning) return;

    // Positive deltaY = scroll down
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
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null || isTransitioning) return;
    const currentY = e.touches[0].clientY;
    const diff = touchStartY.current - currentY; // positive = swipe up / scroll down

    if (diff > 0) {
      const progress = Math.min(1, diff / 220);
      setScrollProgress(progress);
      if (progress >= 1) {
        triggerEnter3D();
      }
    }
  };

  const handleTouchEnd = () => {
    if (scrollProgress < 0.65 && !isTransitioning) {
      // snap back if not scrolled enough
      setScrollProgress(0);
      wheelAccumulator.current = 0;
    } else if (scrollProgress >= 0.65 && !isTransitioning) {
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
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted in rare environments, keep poster
      });
    }
  }, []);

  const opacity = Math.max(0, 1 - scrollProgress);
  const scale = 1 + scrollProgress * 0.05;

  return (
    <div
      onClick={triggerEnter3D}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        opacity: opacity,
        transform: `scale(${scale})`,
        pointerEvents: opacity < 0.05 ? 'none' : 'auto',
        transition: isTransitioning
          ? 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
          : 'opacity 0.08s ease-out'
      }}
      className="fixed inset-0 z-30 flex flex-col items-center justify-between bg-gradient-to-b from-[#ececec] via-[#e5e5e7] to-[#dedede] text-gray-900 select-none overflow-hidden cursor-pointer"
      title={isRTL ? 'برای ورود به ماکت سه‌بعدی کلیک کنید' : 'Click anywhere to explore 3D masterplan'}
    >
      {/* Top Floating Brand Accent */}
      <div className="w-full pt-6 px-6 sm:px-10 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-mono font-black tracking-wider text-gray-700 uppercase">
            BIMCO STUDIO // ARCHITECTURAL 3D
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            triggerEnter3D();
          }}
          className="pointer-events-auto px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-black text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
        >
          <span>{isRTL ? 'ورود مستقیم به سه‌بعدی' : 'Enter 3D Canvas'}</span>
          <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Main Center Video Area */}
      <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center p-4 sm:p-8">
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            src="/intro-rings.mp4"
            poster="/intro-rings-poster.jpg"
            autoPlay
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            onEnded={() => setVideoEnded(true)}
            className="w-full h-full object-contain pointer-events-none drop-shadow-2xl"
          />

          {/* Subtle click ripple indicator on hover */}
          <div className="absolute inset-0 bg-blue-500/0 hover:bg-blue-500/5 transition-colors flex items-center justify-center">
            {videoEnded && (
              <div className="animate-bounce bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl border border-gray-200 flex items-center gap-2.5 text-xs font-bold text-gray-900 pointer-events-none">
                <MousePointerClick className="w-4 h-4 text-blue-600" />
                <span>
                  {isRTL ? 'برای کاوش سه‌بعدی کلیک کنید یا اسکرول نمایید' : 'Click anywhere or scroll to enter 3D'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Interactive Prompt & Scroll Progress */}
      <div className="w-full pb-8 px-6 sm:px-12 flex flex-col items-center justify-center space-y-4 z-20">
        {/* Floating Call to Action Pill */}
        <div className="glass-panel px-6 py-3 rounded-2xl shadow-xl border border-gray-300/80 bg-white/90 backdrop-blur-md flex items-center gap-4 text-gray-800 transition-transform hover:scale-105">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Box className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-black text-gray-900 tracking-tight leading-none">
                {isRTL
                  ? 'کلیک کنید یا اسکرول نمایید'
                  : 'Click anywhere or scroll down'}
              </p>
              <p className="text-[10px] text-gray-500 font-mono mt-1">
                {isRTL
                  ? 'ورود به ماکت تعاملی سه‌بعدی و آرشیو پروژه‌ها'
                  : 'Enter 3D WebGL masterplan & architectural archive'}
              </p>
            </div>
          </div>

          <div className="h-6 w-px bg-gray-200" />

          {/* Animated Scroll Indicator */}
          <div className="flex flex-col items-center justify-center text-blue-600">
            <div className="w-4 h-7 rounded-full border-2 border-blue-600 flex items-start justify-center p-1">
              <span className="w-1 h-1.5 rounded-full bg-blue-600 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        {scrollProgress > 0 && (
          <div className="w-48 h-1 bg-gray-300/80 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-75 ease-out"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        )}

        {/* Quick Direct Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-gray-500 pt-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onNavigateToView('bim-outsourcing');
            }}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            {isRTL ? 'برون‌سپاری BIM' : 'BIM Outsourcing'}
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onNavigateToView('partners');
            }}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            {isRTL ? 'شبکه همکاران و R&D' : 'Partners & R&D'}
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onNavigateToView('resume');
            }}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            {isRTL ? 'رزومه و سوابق' : 'Resume & Credentials'}
          </button>
        </div>
      </div>
    </div>
  );
};
