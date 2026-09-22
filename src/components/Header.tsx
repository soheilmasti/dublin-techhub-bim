import React, { useState } from 'react';
import { 
  Home,
  Grid3X3, 
  UserCheck, 
  Compass,
  Volume2,
  VolumeX,
  PhoneCall,
  Sparkles,
  Sliders,
  Menu,
  X,
  FolderSync,
  Bot,
  Users,
  BookOpen
} from 'lucide-react';
import { SiteSettings } from '../types';
import { sound } from '../utils/audio';
import { LanguageCode, TRANSLATIONS } from '../utils/i18n';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  settings: SiteSettings;
  onUpdateSettings: (newSettings: Partial<SiteSettings>) => void;
  onOpenCustomizer: () => void;
  onOpenAbout: () => void;
  onOpenWhatsApp?: (presetText?: string) => void;
  onOpenAiBooster?: () => void;
  onOpenKnowledgeHub?: () => void;
  totalProjectsCount: number;
  categoriesCount: number;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onUpdateSettings,
  onOpenCustomizer,
  totalProjectsCount,
  currentLanguage,
  onLanguageChange,
  onOpenWhatsApp,
  onOpenAiBooster,
  onOpenKnowledgeHub
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const toggleSound = () => {
    const nextState = !settings.soundEnabled;
    sound.setEnabled(nextState);
    if (nextState) sound.playClick();
    onUpdateSettings({ soundEnabled: nextState });
  };

  const handleNavClick = (view: SiteSettings['activeView']) => {
    sound.playSwitch();
    onUpdateSettings({ activeView: view });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-2 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between pointer-events-none">
        {/* Studio Branding & Architect Title (Click = Return to 3D Home) */}
        <div 
          onClick={() => handleNavClick('3d')}
          className="glass-panel px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-clay-sm flex items-center gap-2 sm:gap-3 pointer-events-auto border border-white/90 cursor-pointer transition-all duration-300 hover:shadow-clay-md hover:scale-102 group"
          title={t.returnToHome}
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-black text-white flex items-center justify-center shadow-xs font-mono font-bold text-xs group-hover:bg-blue-600 transition-colors shrink-0">
            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-black tracking-wider text-black flex items-center gap-1.5">
              <span>{t.studioName}</span>
              <span className="hidden sm:inline text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                3D
              </span>
            </h1>
            <p className="hidden sm:block text-[9px] sm:text-[10px] text-gray-500 font-medium tracking-tight line-clamp-1">
              {t.studioTagline}
            </p>
          </div>
        </div>

        {/* Desktop View Switcher (Hidden on mobile/tablet < 1024px) */}
        <div className="hidden lg:flex glass-panel p-1 rounded-2xl shadow-clay-sm items-center gap-1 pointer-events-auto border border-white/90">
          <button
            onClick={() => handleNavClick('3d')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              settings.activeView === '3d'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t.home3d}</span>
          </button>

          <button
            onClick={() => handleNavClick('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              settings.activeView === 'grid'
                ? 'bg-black text-white shadow-xs'
                : 'text-gray-600 hover:text-black hover:bg-gray-100/70'
            }`}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>{t.projectsArchive} ({totalProjectsCount})</span>
          </button>

          <button
            onClick={() => handleNavClick('resume')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              settings.activeView === 'resume'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-black hover:bg-gray-100/70'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{t.resume}</span>
          </button>

          <button
            onClick={() => handleNavClick('bim-outsourcing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              settings.activeView === 'bim-outsourcing'
                ? 'bg-blue-600 text-white shadow-md scale-105 ring-2 ring-blue-400'
                : 'bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            <span>{t.bimOutsourcing || 'BIM Outsourcing & Delivery'}</span>
            {t.bimOutsourcingBadge && (
              <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-mono font-bold">
                {t.bimOutsourcingBadge}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('client-portal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              settings.activeView === 'client-portal'
                ? 'bg-indigo-600 text-white shadow-md scale-105 ring-2 ring-indigo-400'
                : 'bg-indigo-50/90 text-indigo-900 hover:bg-indigo-100 border border-indigo-200'
            }`}
          >
            <FolderSync className="w-3.5 h-3.5 text-indigo-600" />
            <span>{t.clientPortal || 'Client Portal'}</span>
            <span className="text-[9px] bg-indigo-500 text-white px-1.5 py-0.5 rounded-full font-mono font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
              {t.clientPortalBadge || 'Live'}
            </span>
          </button>

          <button
            onClick={() => handleNavClick('partners')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              settings.activeView === 'partners'
                ? 'bg-blue-600 text-white shadow-md scale-105 ring-2 ring-blue-400'
                : 'text-gray-700 hover:text-black hover:bg-gray-100/70 border border-transparent'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.partners || 'Partners'}</span>
            {t.partnersBadge && (
              <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full font-mono font-bold">
                {t.partnersBadge}
              </span>
            )}
          </button>

          {onOpenKnowledgeHub && (
            <button
              onClick={() => { sound.playClick(); onOpenKnowledgeHub(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 hover:text-black hover:bg-gray-100/70 border border-transparent transition-all duration-200 cursor-pointer"
              title="Knowledge Hub & FAQs"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>{currentLanguage === 'fa' ? 'راهنما و سوالات' : 'FAQ & Q&A'}</span>
              <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-mono font-bold">
                12
              </span>
            </button>
          )}
        </div>

        {/* Right Controls: Language Selector, Sound, WhatsApp & Mobile Menu */}
        <div className="flex items-center gap-1.5 pointer-events-auto">

          {/* 7-Language Switcher */}
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="glass-panel p-2 rounded-xl shadow-clay-sm text-gray-700 hover:text-black transition-colors cursor-pointer"
            title={settings.soundEnabled ? 'Mute' : 'Unmute'}
          >
            {settings.soundEnabled ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
          </button>

          {/* Direct WhatsApp Contact */}
          <button
            onClick={() => {
              sound.playClick();
              if (onOpenWhatsApp) {
                onOpenWhatsApp();
              } else {
                window.open('https://wa.me/34610855434', '_blank');
              }
            }}
            className="glass-panel p-2 rounded-xl shadow-clay-sm text-emerald-700 hover:bg-emerald-50 transition-colors border border-emerald-200 hidden sm:flex items-center gap-1.5 cursor-pointer"
            title={t.contactWhatsapp}
          >
            <PhoneCall className="w-4 h-4 text-emerald-600" />
            <span className="hidden xl:inline text-[11px] font-bold text-emerald-900">WhatsApp</span>
          </button>

          {/* Customizer Button (Desktop) */}
          <button
            onClick={() => { sound.playClick(); onOpenCustomizer(); }}
            className="glass-panel p-2 rounded-xl shadow-clay-sm text-gray-700 hover:text-black transition-colors border border-white/90 hidden md:flex items-center cursor-pointer"
            title={t.customizer}
          >
            <Sliders className="w-4 h-4 text-blue-600" />
          </button>

          {/* Mobile Navigation Toggle Button (Visible on < 1024px) */}
          <button
            onClick={() => {
              sound.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="lg:hidden glass-panel p-2 rounded-xl shadow-clay-sm text-gray-800 hover:text-black transition-all cursor-pointer border border-white/90"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 text-red-500" /> : <Menu className="w-4 h-4 text-blue-600" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu (Touch-Optimized, Solidly over all overlays) */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-md animate-in fade-in duration-200 flex flex-col justify-start p-3 sm:p-4 pt-16"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-2xl rounded-3xl p-4 sm:p-5 shadow-2xl border border-white/90 space-y-2.5 animate-in slide-in-from-top-4 duration-200"
            dir={currentLanguage === 'fa' ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between pb-2 mb-1 border-b border-gray-100 text-xs font-bold text-gray-500 font-mono uppercase">
              <span>{t.menu}</span>
              <div className="flex items-center gap-2">
                <span>{t.studioName}</span>
                <button
                  onClick={() => { sound.playClick(); setIsMobileMenuOpen(false); }}
                  className="p-1.5 rounded-xl text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={() => handleNavClick('3d')}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                settings.activeView === '3d'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Home className="w-4 h-4" />
                <span>{t.home3d}</span>
              </div>
              <span className="text-[10px] opacity-75 font-mono">HOME</span>
            </button>


            <button
              onClick={() => handleNavClick('grid')}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                settings.activeView === 'grid'
                  ? 'bg-black text-white shadow-md'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Grid3X3 className="w-4 h-4 text-blue-500" />
                <span>{t.projectsArchive}</span>
              </div>
              <span className="text-[10px] font-mono bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                {totalProjectsCount}
              </span>
            </button>

            <button
              onClick={() => handleNavClick('resume')}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                settings.activeView === 'resume'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-indigo-500" />
                <span>{t.resume}</span>
              </div>
              <span className="text-[10px] opacity-75 font-mono">CV</span>
            </button>

            <button
              onClick={() => handleNavClick('bim-outsourcing')}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                settings.activeView === 'bim-outsourcing'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-blue-50 text-blue-900 border border-blue-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>{t.bimOutsourcing || 'BIM Outsourcing & Delivery'}</span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold">
                50% OFF
              </span>
            </button>

            <button
              onClick={() => handleNavClick('client-portal')}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                settings.activeView === 'client-portal'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-indigo-50 text-indigo-900 border border-indigo-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderSync className="w-4 h-4 text-indigo-600" />
                <span>{t.clientPortal || 'Client Portal & Tracker'}</span>
              </div>
              <span className="text-[10px] font-mono bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">
                LIVE
              </span>
            </button>

            <button
              onClick={() => handleNavClick('partners')}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                settings.activeView === 'partners'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-blue-600" />
                <span>{t.partners || 'Partners & Talent Network'}</span>
              </div>
              <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                JOIN
              </span>
            </button>

            {onOpenKnowledgeHub && (
              <button
                onClick={() => {
                  sound.playClick();
                  setIsMobileMenuOpen(false);
                  onOpenKnowledgeHub();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold bg-amber-50/80 text-amber-950 border border-amber-200/90 hover:bg-amber-100 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>{currentLanguage === 'fa' ? 'مرکز دانش و پرسش‌ها (FAQ & Q&A)' : 'BIM Knowledge & FAQ Hub'}</span>
                </div>
                <span className="text-[10px] font-mono bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                  12 Q&A
                </span>
              </button>
            )}

            {/* Mobile Direct WhatsApp Action */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsMobileMenuOpen(false);
                  if (onOpenWhatsApp) {
                    onOpenWhatsApp();
                  } else {
                    window.open('https://wa.me/34610855434', '_blank');
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-md active:scale-95 transition-transform cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>WhatsApp (+34 610 855 434)</span>
              </button>

              <button
                onClick={() => { sound.playClick(); onOpenCustomizer(); setIsMobileMenuOpen(false); }}
                className="p-2.5 rounded-2xl bg-gray-100 text-gray-700 hover:bg-gray-200"
                title={t.customizer}
              >
                <Sliders className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
