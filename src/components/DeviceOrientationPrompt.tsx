import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, RotateCcw, X, Check } from 'lucide-react';
import { LanguageCode } from '../utils/i18n';

interface DeviceOrientationPromptProps {
  currentLanguage?: LanguageCode;
}

export const DeviceOrientationPrompt: React.FC<DeviceOrientationPromptProps> = ({
  currentLanguage = 'fa'
}) => {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    try {
      if (sessionStorage.getItem('bimco_orientation_dismissed') === 'true') {
        setIsDismissed(true);
      }
    } catch (e) {}

    const checkOrientation = () => {
      const isTouch = typeof window !== 'undefined' && 
        ('ontouchstart' in window || (Boolean(navigator.maxTouchPoints) && navigator.maxTouchPoints > 0));
      const isPortrait = window.innerHeight > window.innerWidth;
      const isSmallOrTablet = window.innerWidth <= 1024 || (isTouch && isPortrait);

      setIsPortraitMobile(Boolean(isPortrait && isSmallOrTablet));
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation, { passive: true });
    window.addEventListener('orientationchange', checkOrientation, { passive: true });

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem('bimco_orientation_dismissed', 'true');
    } catch (e) {}
  };

  const isRTL = currentLanguage === 'fa';

  if (!isPortraitMobile || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed top-4 sm:top-6 inset-x-3 sm:inset-x-6 z-[99999] max-w-lg mx-auto pointer-events-auto"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="bg-slate-950/95 text-white backdrop-blur-2xl border-2 border-amber-500/50 shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Animated Rotating Phone Graphic */}
          <div className="relative shrink-0 w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center">
            <motion.div
              animate={{ 
                rotate: [0, 0, 90, 90, 0],
                scale: [1, 1, 1.1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="text-amber-400"
            >
              <Smartphone className="w-6 h-6" />
            </motion.div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center text-[9px] font-bold shadow-xs">
              <RotateCcw className="w-2.5 h-2.5" />
            </div>
          </div>

          {/* Prompt Content */}
          <div className="flex-1 min-w-0 pr-1">
            <h4 className="text-xs font-black text-white flex items-center gap-1.5 tracking-tight">
              <span>{isRTL ? 'لطفاً صفحه را بچرخانید (حالت افقی / Landscape) 🔄' : 'Please Rotate Device to Landscape 🔄'}</span>
            </h4>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug">
              {isRTL 
                ? 'ویدیو، ماکت سه‌بعدی و شیت‌های معماری برای تماشا در حالت عریض افقی بهینه شده‌اند.' 
                : 'Architectural drawings, 3D model, and video are optimized for widescreen landscape view.'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleDismiss}
              className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap"
              title={isRTL ? 'ادامه در حالت عمودی' : 'Continue in portrait'}
            >
              <span>{isRTL ? 'ادامه' : 'OK'}</span>
            </button>
            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isRTL ? 'بستن' : 'Close'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
