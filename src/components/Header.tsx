import React from 'react';
import { 
  Home,
  Building2, 
  Grid3X3, 
  Box, 
  Sliders, 
  UserCheck, 
  Compass,
  Volume2,
  VolumeX,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { SiteSettings } from '../types';
import { sound } from '../utils/audio';

interface HeaderProps {
  settings: SiteSettings;
  onUpdateSettings: (newSettings: Partial<SiteSettings>) => void;
  onOpenCustomizer: () => void;
  onOpenAbout: () => void;
  totalProjectsCount: number;
  categoriesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onUpdateSettings,
  onOpenCustomizer,
  onOpenAbout,
  totalProjectsCount,
  categoriesCount
}) => {
  const toggleSound = () => {
    const nextState = !settings.soundEnabled;
    sound.setEnabled(nextState);
    if (nextState) sound.playClick();
    onUpdateSettings({ soundEnabled: nextState });
  };

  const handleNavClick = (view: SiteSettings['activeView']) => {
    sound.playSwitch();
    onUpdateSettings({ activeView: view });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-8 py-3 flex items-center justify-between pointer-events-none">
      {/* Studio Branding & Architect Title (Click = Return to Home) */}
      <div 
        onClick={() => handleNavClick('maquette')}
        className="glass-panel px-4 py-2 rounded-2xl shadow-clay-sm flex items-center gap-3 pointer-events-auto border border-white/90 cursor-pointer transition-all duration-300 hover:shadow-clay-md hover:scale-102 group"
        title="صفحه اصلی وبسایت (بازگشت به ماکت)"
      >
        <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shadow-xs font-mono font-bold text-xs group-hover:bg-blue-600 transition-colors">
          <Home className="w-4 h-4" />
        </div>
        <div>
          <h1 className="text-xs sm:text-sm font-black tracking-wider text-black flex items-center gap-1.5">
            <span>SOHEIL MASTI</span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
              HOME
            </span>
          </h1>
          <p className="text-[10px] text-gray-500 font-medium tracking-tight">
            GAAM STUDIO // BARCELONA
          </p>
        </div>
      </div>

      {/* Center: View Switcher (Home Maquette / 3D / Catalog / Resume / Dublin) */}
      <div className="glass-panel p-1 rounded-2xl shadow-clay-sm flex items-center gap-1 pointer-events-auto border border-white/90">
        <button
          onClick={() => handleNavClick('maquette')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
            settings.activeView === 'maquette'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
          }`}
          title="صفحه اصلی: ماکت شهرک و سایت‌پلان تعاملی"
        >
          <Home className="w-3.5 h-3.5" />
          <span>صفحه اصلی (ماکت)</span>
        </button>

        <button
          onClick={() => handleNavClick('3d')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
            settings.activeView === '3d'
              ? 'bg-black text-white shadow-xs'
              : 'text-gray-600 hover:text-black hover:bg-gray-100/70'
          }`}
          title="گردش سه‌بعدی آزاد WebGL در شهرک"
        >
          <Box className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">کاوش ۳ بعدی</span>
        </button>

        <button
          onClick={() => handleNavClick('grid')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
            settings.activeView === 'grid'
              ? 'bg-black text-white shadow-xs'
              : 'text-gray-600 hover:text-black hover:bg-gray-100/70'
          }`}
          title="آرشیو و کاتالوگ تمام ۱۶ پروژه"
        >
          <Grid3X3 className="w-3.5 h-3.5" />
          <span>پروژه‌ها ({totalProjectsCount})</span>
        </button>

        <button
          onClick={() => handleNavClick('resume')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
            settings.activeView === 'resume'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-gray-600 hover:text-black hover:bg-gray-100/70'
          }`}
          title="رزومه کامل سهیل مستی، سوابق و استانداردهای BIM"
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>رزومه</span>
        </button>

        <button
          onClick={() => handleNavClick('dublin-bim-audit')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
            settings.activeView === 'dublin-bim-audit'
              ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-md scale-105 ring-2 ring-emerald-400'
              : 'bg-emerald-500/10 text-emerald-800 hover:bg-emerald-500/20 border border-emerald-500/30'
          }`}
          title="پروژه ۷ طبقه دوبلین: مدل سه‌بعدی و بازرسی خودکار مهندسی رویت"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
          <span>🇮🇪 دمو دوبلین (BIM Audit)</span>
        </button>
      </div>

      {/* Right Controls: Live Customizer & Sound & Contact */}
      <div className="flex items-center gap-1.5 pointer-events-auto">
        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="glass-panel p-2 rounded-xl shadow-clay-sm text-gray-700 hover:text-black transition-colors"
          title={settings.soundEnabled ? 'قطع صدای تعاملی' : 'وصل صدای تعاملی'}
        >
          {settings.soundEnabled ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
        </button>

        {/* Customizer Button */}
        <button
          onClick={() => { sound.playClick(); onOpenCustomizer(); }}
          className="glass-panel px-3 py-2 rounded-2xl shadow-clay-sm flex items-center gap-1.5 text-xs font-bold text-gray-800 hover:text-black hover:bg-white transition-all border border-white/90 group"
          title="تعویض تصویر پس‌زمینه و جایگذاری فایل‌های GLB / عکس دکمه‌ها"
        >
          <Sliders className="w-3.5 h-3.5 text-blue-600 group-hover:rotate-45 transition-transform" />
          <span className="hidden md:inline">تعویض عکس / GLB</span>
        </button>

        {/* Direct Contact Button */}
        <a
          href="https://wa.me/34610855434"
          target="_blank"
          rel="noreferrer"
          className="glass-panel p-2 rounded-2xl shadow-clay-sm text-emerald-700 hover:bg-emerald-50 transition-colors border border-emerald-100 hidden sm:flex items-center gap-1"
          title="تماس مستقیم در واتساپ (+34 610 855 434)"
        >
          <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
        </a>
      </div>
    </header>
  );
};
