import React from 'react';
import { 
  Box, 
  Grid3X3, 
  ShieldCheck, 
  FolderSync, 
  ArrowRight, 
  MessageCircle, 
  Users,
  ChevronRight
} from 'lucide-react';
import { LanguageCode } from '../utils/i18n';
import { sound } from '../utils/audio';

interface LightweightIntroDemoProps {
  currentLanguage: LanguageCode;
  onEnter3D: () => void;
  onNavigateToView: (view: 'grid' | 'bim-outsourcing' | 'client-portal' | 'resume' | 'partners') => void;
  onOpenWhatsApp: (preset?: string) => void;
}

export const LightweightIntroDemo: React.FC<LightweightIntroDemoProps> = ({
  currentLanguage,
  onEnter3D,
  onNavigateToView,
  onOpenWhatsApp
}) => {
  const isRTL = currentLanguage === 'fa';

  const handleLaunch3D = () => {
    sound.playSwitch();
    onEnter3D();
  };

  return (
    <div 
      className="min-h-screen bg-[#fafbfc] text-neutral-900 pt-24 pb-20 px-4 sm:px-6 lg:px-12 selection:bg-neutral-900 selection:text-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Top Minimal Studio Metadata Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900 tracking-wider">BIMCO</span>
            <span>//</span>
            <span>{isRTL ? 'استودیو معماری و تولید BIM' : 'ARCHITECTURAL PRACTICE & BIM DELIVERY'}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="hidden sm:inline text-neutral-600 font-sans">{isRTL ? 'محیط سه‌بعدی آماده' : '3D Engine Ready'}</span>
          </div>
        </div>

        {/* Big Typographic Architectural Hero */}
        <div className="pt-4 text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-5xl sm:text-7xl font-black text-neutral-950 tracking-tighter uppercase font-sans">
            BIMCO
          </h1>
          
          <p className="text-base sm:text-xl font-medium text-neutral-700 tracking-tight">
            {isRTL ? 'استودیو معماری معاصر و تولید استراتژیک BIM' : 'Contemporary Architecture & Strategic BIM Practice'}
          </p>

          <p className="text-xs sm:text-sm text-neutral-500 font-mono max-w-xl mx-auto leading-relaxed">
            {isRTL 
              ? 'تولید دقیق رویت (LOD 200–500) • هماهنگی کامل بدون کلش • انطباق با استاندارد بین‌المللی ISO 19650'
              : 'Precision Revit Modeling • Multi-Discipline Clash Elimination • ISO 19650 CDE Workflow'}
          </p>

          {/* Central Enter 3D Canvas CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <button
              onClick={handleLaunch3D}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer group"
            >
              <Box className="w-4 h-4 text-neutral-400 group-hover:rotate-12 transition-transform" />
              <span>{isRTL ? 'ورود به ماکت سه‌بعدی تعاملی' : 'Enter Interactive 3D Canvas'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* 4 Minimalist Practice Area Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 01: 3D Maquette */}
          <div 
            onClick={handleLaunch3D}
            className="group bg-white p-5 rounded-2xl border border-neutral-200/80 hover:border-neutral-950 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="text-[11px] font-mono font-bold text-neutral-400 group-hover:text-neutral-900 transition-colors">
                01 // 3D
              </div>
              <h3 className="font-bold text-sm text-neutral-900">
                {isRTL ? 'ماکت ۳D تعاملی' : 'Interactive Maquette'}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {isRTL ? 'چرخش ۳۶۰ درجه و پرواز روی مدل‌های ساختمانی.' : '360° orbit, real-time lighting & interactive zone inspection.'}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-neutral-900">
              <span>{isRTL ? 'مشاهده ماکت' : 'Launch 3D'}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </div>
          </div>

          {/* Card 02: Projects Archive */}
          <div 
            onClick={() => { sound.playClick(); onNavigateToView('grid'); }}
            className="group bg-white p-5 rounded-2xl border border-neutral-200/80 hover:border-neutral-950 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="text-[11px] font-mono font-bold text-neutral-400 group-hover:text-neutral-900 transition-colors">
                02 // ARCHIVE
              </div>
              <h3 className="font-bold text-sm text-neutral-900">
                {isRTL ? 'آرشیو ۱۹ پروژه' : 'Works Archive (19)'}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {isRTL ? 'نقشه‌ها، مدارک فنی، رندرها و جزییات معماری.' : 'Curated collection of architectural and technical drawings.'}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-neutral-900">
              <span>{isRTL ? 'مشاهده آرشیو' : 'Browse Works'}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </div>
          </div>

          {/* Card 03: Strategic Delivery */}
          <div 
            onClick={() => { sound.playClick(); onNavigateToView('bim-outsourcing'); }}
            className="group bg-white p-5 rounded-2xl border border-neutral-200/80 hover:border-neutral-950 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="text-[11px] font-mono font-bold text-neutral-400 group-hover:text-neutral-900 transition-colors">
                03 // DELIVERY
              </div>
              <h3 className="font-bold text-sm text-neutral-900">
                {isRTL ? 'برون‌سپاری استراتژیک' : 'Strategic BIM Delivery'}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {isRTL ? 'انطباق با ISO 19650 و تا ۵۰٪ صرفه‌جویی در هزینه استودیو.' : 'Cloud CDE workflow, ISO 19650 and up to 50% net studio savings.'}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-neutral-900">
              <span>{isRTL ? 'چرا همکاری' : 'Explore Model'}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </div>
          </div>

          {/* Card 04: Client Portal */}
          <div 
            onClick={() => { sound.playClick(); onNavigateToView('client-portal'); }}
            className="group bg-white p-5 rounded-2xl border border-neutral-200/80 hover:border-neutral-950 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="text-[11px] font-mono font-bold text-neutral-400 group-hover:text-neutral-900 transition-colors">
                04 // TRACKER
              </div>
              <h3 className="font-bold text-sm text-neutral-900">
                {isRTL ? 'پورتال سفارشات کلاینت' : 'Client Live Tracker'}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {isRTL ? 'رهگیری زنده درصد پیشرفت، حل کلش‌ها و گزارش هفتگی.' : 'Milestone progress, clash resolution reports & cloud CDE sync.'}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-neutral-900">
              <span>{isRTL ? 'ورود به پورتال' : 'Track Order'}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </div>

        {/* Minimalist Team & Talent Network Banner */}
        <div 
          onClick={() => { sound.playClick(); onNavigateToView('partners'); }}
          className="bg-white p-5 rounded-2xl border border-neutral-200/80 hover:border-neutral-900 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-900 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <span>{isRTL ? 'معرفی تیم راهبری و شبکه همکاران BIMCO' : 'BIMCO Leadership & Specialist Partner Network'}</span>
                <span className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full font-mono font-bold">
                  {isRTL ? 'تیم و تخصص‌ها' : 'Team & Roles'}
                </span>
              </h4>
              <p className="text-xs text-neutral-500">
                {isRTL 
                  ? 'معرفی اعضای کلیدی (سهیل مستی)، تخصص‌های رویت، تاسیسات و هوش مصنوعی + فرم ثبت همکاری' 
                  : 'Meet core lead Soheil Masti & specialist disciplines, or register for upcoming deliveries.'}
              </p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800 transition-colors shrink-0 flex items-center gap-1.5 pointer-events-none">
            <span>{isRTL ? 'مشاهده تیم و همکاران' : 'Meet Team & Partners'}</span>
            <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Minimalist Footer Bar */}
        <div className="pt-4 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            <span>BIMCO ARCHITECTURAL STUDIO // BARCELONA</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenWhatsApp('Hello Soheil, I am contacting you regarding BIMCO services...')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-sans font-bold transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp: +34 610 855 434</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
