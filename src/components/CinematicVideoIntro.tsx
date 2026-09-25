import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LanguageCode } from '../utils/i18n';
import { sound } from '../utils/audio';

interface CinematicVideoIntroProps {
  currentLanguage: LanguageCode;
  onEnter3D: () => void;
  onNavigateToView?: (view: 'bim-outsourcing' | 'client-portal' | 'partners' | 'resume') => void;
}

export const CinematicVideoIntro: React.FC<CinematicVideoIntroProps> = ({
  onEnter3D
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
    >
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
      </div>
    </div>
  );
};
