import React from 'react';
import { 
  Box, 
  Grid3X3, 
  ShieldCheck, 
  FolderSync, 
  ArrowRight, 
  MessageCircle, 
  Building2, 
  Layers, 
  CheckCircle2,
  Sparkles,
  Zap,
  Globe2
} from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/i18n';
import { sound } from '../utils/audio';

interface LightweightIntroDemoProps {
  currentLanguage: LanguageCode;
  onEnter3D: () => void;
  onNavigateToView: (view: 'grid' | 'bim-outsourcing' | 'client-portal' | 'resume') => void;
  onOpenWhatsApp: (preset?: string) => void;
}

export const LightweightIntroDemo: React.FC<LightweightIntroDemoProps> = ({
  currentLanguage,
  onEnter3D,
  onNavigateToView,
  onOpenWhatsApp
}) => {
  const isRTL = currentLanguage === 'fa';
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const handleLaunch3D = () => {
    sound.playSwitch();
    onEnter3D();
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-slate-900 pt-24 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Top Speed & Ready Badge */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>{isRTL ? 'نسخه سبک و پرسرعت // استودیو معماری و BIM' : 'Ultra-Fast Lightweight Preview // Architectural Studio & BIM'}</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{isRTL ? 'محیط سه‌بعدی آماده اجرا' : '3D Engine Pre-loaded'}</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block mb-3">
            <span className="text-[11px] font-mono font-black text-slate-500 tracking-widest uppercase">
              SOHEIL MASTI ARCHITECTURAL STUDIO // BARCELONA
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            {isRTL ? (
              <>
                معماری معاصر، مدل‌سازی دقیق و <span className="text-blue-600">برون‌سپاری استراتژیک BIM</span>
              </>
            ) : (
              <>
                High-Performance Architecture &amp; <span className="text-blue-600">Strategic BIM Delivery</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            {isRTL ? (
              'تولید تخصصی مدل‌های رویت (LOD 200–500)، هماهنگی بدون کلش و بسته‌های نقشه‌های اجرایی منطبق بر استاندارد ISO 19650 با امنیت کامل داده‌ها در محیط ابری Autodesk Construction Cloud.'
            ) : (
              'Specialized Revit modeling (LOD 200–500), multi-discipline clash coordination, and full technical construction packages—strictly compliant with ISO 19650 standards and cloud CDE security.'
            )}
          </p>

          {/* Master Call To Action: ONE-CLICK ENTER 3D */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-10">
            <button
              onClick={handleLaunch3D}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-sm sm:text-base shadow-xl hover:shadow-2xl hover:scale-102 active:scale-98 transition-all cursor-pointer border border-blue-400/40 group"
            >
              <Box className="w-5 h-5 text-blue-200 group-hover:rotate-12 transition-transform" />
              <span>{isRTL ? 'ورود به پورتفولیو سه‌بعدی تعاملی' : 'Enter Interactive 3D Canvas'}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <p className="text-xs text-slate-400 font-mono">
            {isRTL ? '⚡ برای اینترنت‌های کم‌سرعت: می‌توانید بدون لود ۳D از بخش‌های زیر استفاده کنید:' : '⚡ Or explore the studio directly via lightweight 2D sections below:'}
          </p>
        </div>

        {/* 4 Fast-Track Sections Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* Card 1: 3D Maquette Direct */}
          <div 
            onClick={handleLaunch3D}
            className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500/60 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Box className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                {isRTL ? 'ماکت ۳D پروژه‌ها' : 'Interactive 3D Portfolio'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isRTL ? 'چرخش ۳۶۰ درجه، نورپردازی زنده و پرواز دوربین به روی هر ساختمان.' : 'Orbit 360°, inspect architectural models, and fly into custom project zones.'}
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600 mt-4 inline-flex items-center gap-1 group-hover:underline">
              <span>{isRTL ? 'مشاهده ماکت' : 'Launch 3D'}</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Card 2: Projects 2D Grid Archive */}
          <div 
            onClick={() => { sound.playClick(); onNavigateToView('grid'); }}
            className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-black/50 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-white transition-colors">
                <Grid3X3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                {isRTL ? 'آرشیو ۱۹ پروژه (۲D)' : 'Projects Archive (19)'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isRTL ? 'مرور پرسرعت نقشه‌ها، گالری رندرها و مشخصات فنی بدون بارگذاری سنگین.' : 'Instant gallery of architectural works, plans, and technical BIM specifications.'}
              </p>
            </div>
            <span className="text-xs font-bold text-slate-800 mt-4 inline-flex items-center gap-1 group-hover:underline">
              <span>{isRTL ? 'مشاهده پروژه‌ها' : 'Open Archive'}</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Card 3: Strategic BIM Delivery */}
          <div 
            onClick={() => { sound.playClick(); onNavigateToView('bim-outsourcing'); }}
            className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500/60 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                {isRTL ? 'راهکار و مزایای همکاری' : 'Strategic BIM Delivery'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isRTL ? 'امنیت CDE ابری، استاندارد ISO 19650 و تا ۵۰٪ ارتقای بهره‌وری استودیو.' : 'Cloud CDE security, ISO 19650 compliance, and up to 50% studio overhead savings.'}
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 mt-4 inline-flex items-center gap-1 group-hover:underline">
              <span>{isRTL ? 'چرا همکاری با ما' : 'Learn More'}</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Card 4: Client Portal */}
          <div 
            onClick={() => { sound.playClick(); onNavigateToView('client-portal'); }}
            className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-500/60 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <FolderSync className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                {isRTL ? 'پورتال سفارشات کلاینت' : 'Client Live Order Tracker'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isRTL ? 'پیگیری زنده درصد پیشرفت، حل کلش‌ها و گزارش هفتگی مدل‌های رویت.' : 'Real-time deliverable milestones, clash resolution matrices, and weekly reports.'}
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-700 mt-4 inline-flex items-center gap-1 group-hover:underline">
              <span>{isRTL ? 'رهگیری سفارش' : 'Track Order'}</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Studio Proof & Trust Metrics */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 p-6 flex flex-wrap items-center justify-around gap-4 text-center">
          <div>
            <div className="text-2xl font-black text-slate-900">19+</div>
            <div className="text-[11px] text-slate-500 font-medium">{isRTL ? 'پروژه اجرا و طراحی‌شده' : 'Delivered Architectural Works'}</div>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          <div>
            <div className="text-2xl font-black text-blue-600">ISO 19650</div>
            <div className="text-[11px] text-slate-500 font-medium">{isRTL ? 'انطباق با استانداردهای بین‌المللی' : 'Certified BIM Management'}</div>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          <div>
            <div className="text-2xl font-black text-emerald-600">Autodesk ACC</div>
            <div className="text-[11px] text-slate-500 font-medium">{isRTL ? 'همگام‌سازی ابری و امنیت داده' : 'Direct Cloud Worksharing'}</div>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          <div>
            <button
              onClick={() => onOpenWhatsApp('Hello Soheil, I am contacting you regarding your architectural BIM services...')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isRTL ? 'تماس مستقیم واتساپ (+34 610 855 434)' : 'WhatsApp (+34 610 855 434)'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
