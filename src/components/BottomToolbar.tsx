import React from 'react';
import { 
  Sun, 
  Sunset, 
  Moon, 
  Camera, 
  Play, 
  Pause, 
  BookOpen, 
  Zap, 
  PhoneCall, 
  Home 
} from 'lucide-react';
import { sound } from '../utils/audio';
import { LanguageCode, TRANSLATIONS } from '../utils/i18n';
import { SiteSettings, CategoryBuilding } from '../types';

export interface BottomToolbarProps {
  activeView: SiteSettings['activeView'];
  currentLanguage: LanguageCode;
  lightingMode?: 'day' | 'sunset' | 'night' | 'wireframe';
  onChangeLighting?: (mode: 'day' | 'sunset' | 'night') => void;
  autoRotate?: boolean;
  onToggleAutoRotate?: () => void;
  onResetCamera?: () => void;
  onExit3D?: () => void;
  onNavigateHome: () => void;
  onOpenFlipbook?: () => void;
  onOpenWhatsApp?: (presetText?: string) => void;
  selectedCategory?: CategoryBuilding | null;
  isFlipbookOpen?: boolean;
}

export const BottomToolbar: React.FC<BottomToolbarProps> = ({
  activeView,
  currentLanguage,
  lightingMode = 'day',
  onChangeLighting,
  autoRotate = false,
  onToggleAutoRotate,
  onResetCamera,
  onExit3D,
  onNavigateHome,
  onOpenFlipbook,
  onOpenWhatsApp,
  selectedCategory,
  isFlipbookOpen = false
}) => {
  // If drawer or flipbook modal is open, keep screen completely clean
  if (selectedCategory || isFlipbookOpen) return null;

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const handleWhatsAppClick = () => {
    sound.playClick();
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      window.open('https://wa.me/34610855434', '_blank');
    }
  };

  return (
    <div className="mobile-toolbar fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] sm:bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40 w-max max-w-[96vw] pointer-events-none transition-all duration-300">
      <div className="pointer-events-auto glass-panel bg-white/95 backdrop-blur-xl border border-white/90 shadow-clay-md rounded-2xl px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar">
        {activeView === '3d' ? (
          <>
            {/* 3D Lighting Mood Controls: Day, Sunset, Night */}
            {onChangeLighting && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { onChangeLighting('day'); sound.playSwitch(); }}
                  className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    lightingMode === 'day' 
                      ? 'bg-black text-white shadow-xs' 
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/80'
                  }`}
                  title={t.dayMode}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="hidden md:inline">{t.dayMode.split(' ')[0]}</span>
                </button>

                <button
                  onClick={() => { onChangeLighting('sunset'); sound.playSwitch(); }}
                  className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    lightingMode === 'sunset' 
                      ? 'bg-orange-600 text-white shadow-xs' 
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/80'
                  }`}
                  title={t.sunsetMode}
                >
                  <Sunset className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span className="hidden md:inline">{t.sunsetMode.split(' ')[0]}</span>
                </button>

                <button
                  onClick={() => { onChangeLighting('night'); sound.playSwitch(); }}
                  className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    lightingMode === 'night' 
                      ? 'bg-indigo-950 text-white shadow-xs ring-1 ring-sky-400/60' 
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/80'
                  }`}
                  title={t.nightMode}
                >
                  <Moon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="hidden md:inline">{t.nightMode.split(' ')[0]}</span>
                </button>
              </div>
            )}

            {/* Divider */}
            <div className="w-px h-4 bg-gray-200/90 mx-0.5 shrink-0" />

            {/* Camera Overview & Orbit Controls */}
            {onResetCamera && (
              <button
                onClick={() => { sound.playClick(); onResetCamera(); }}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-semibold text-gray-700 hover:text-black hover:bg-gray-100/80 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                title={t.overviewView}
              >
                <Camera className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="hidden md:inline font-medium">{t.overviewView}</span>
              </button>
            )}

            {onToggleAutoRotate && (
              <button
                onClick={() => { sound.playSwitch(); onToggleAutoRotate(); }}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  autoRotate ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-700 hover:text-black hover:bg-gray-100/80'
                }`}
                title={autoRotate ? t.autoRotateStop : t.autoRotateStart}
              >
                {autoRotate ? <Pause className="w-3.5 h-3.5 shrink-0" /> : <Play className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                <span className="hidden md:inline font-medium">{autoRotate ? t.autoRotateStop : t.autoRotateStart}</span>
              </button>
            )}

            {/* Divider */}
            <div className="w-px h-4 bg-gray-200/90 mx-0.5 shrink-0" />

            {/* 3D Flipbook Trigger */}
            {onOpenFlipbook && (
              <button
                onClick={() => { sound.playPageFlip(); onOpenFlipbook(); }}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 bg-gradient-to-r from-amber-500/15 to-amber-600/25 hover:from-amber-500 hover:to-amber-600 text-amber-900 hover:text-white border border-amber-300/80 shadow-xs group shrink-0"
                title={t.portfolioFlipbookTooltip}
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-600 group-hover:text-white transition-colors shrink-0" />
                <span className="hidden sm:inline font-bold">{t.portfolioBook || 'Portfolio'}</span>
              </button>
            )}

            {/* Fast 2D Mode */}
            {onExit3D && (
              <button
                onClick={() => { sound.playClick(); onExit3D(); }}
                className="p-1.5 sm:px-2 sm:py-1.5 rounded-xl text-xs font-semibold text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all cursor-pointer flex items-center gap-1 shrink-0"
                title={t.fastModeTooltip}
              >
                <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="hidden lg:inline">{t.fastMode || '2D'}</span>
              </button>
            )}

            {/* Divider */}
            <div className="w-px h-4 bg-gray-200/90 mx-0.5 shrink-0" />

            {/* WhatsApp Contact */}
            <button
              onClick={handleWhatsAppClick}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs shrink-0"
              title={t.contactWhatsapp}
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600 hover:text-white shrink-0" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
          </>
        ) : (
          <>
            {/* Non-3D View: Return to 3D Home */}
            <button
              onClick={() => { sound.playClick(); onNavigateHome(); }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-xs hover:bg-blue-700 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
              title={t.returnToHome}
            >
              <Home className="w-3.5 h-3.5 shrink-0" />
              <span>{t.home3d || '3D Home'}</span>
            </button>

            <div className="w-px h-4 bg-gray-200/90 mx-0.5 shrink-0" />

            {onOpenFlipbook && (
              <button
                onClick={() => { sound.playPageFlip(); onOpenFlipbook(); }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                title={t.portfolioFlipbookTooltip}
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{t.portfolioBook || 'Portfolio'}</span>
              </button>
            )}

            <div className="w-px h-4 bg-gray-200/90 mx-0.5 shrink-0" />

            <button
              onClick={handleWhatsAppClick}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
              title={t.contactWhatsapp}
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>WhatsApp</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
