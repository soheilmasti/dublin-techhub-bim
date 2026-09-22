import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  TrendingDown, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  FileCheck, 
  Clock, 
  Cloud, 
  ExternalLink,
  Sparkles,
  HelpCircle,
  ChevronDown,
  X,
  MessageCircle,
  Bot,
  Sliders,
  FolderSync
} from 'lucide-react';
import { LanguageCode } from '../utils/i18n';
import { sound } from '../utils/audio';

interface BimOutsourcingSectionProps {
  language: LanguageCode;
  onNavigateToDublinBim?: () => void;
  onNavigateToClientPortal: () => void;
  onNavigateToPartners?: () => void;
  onOpenWhatsApp: (presetText?: string) => void;
  onOpenAiBooster?: () => void;
  onBackToHome: () => void;
}

export const BimOutsourcingSection: React.FC<BimOutsourcingSectionProps> = ({
  language,
  onNavigateToDublinBim,
  onNavigateToClientPortal,
  onNavigateToPartners,
  onOpenWhatsApp,
  onOpenAiBooster,
  onBackToHome
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<'GBP' | 'EUR'>('GBP');
  const [teamSize, setTeamSize] = useState<number>(2);

  const toggleFaq = (index: number) => {
    sound.playClick();
    setActiveFaq(prev => (prev === index ? null : index));
  };

  const isRTL = language === 'fa';

  const inHouseBasePerSeat = selectedCurrency === 'GBP' ? 68500 : 78000;
  const bimcoBasePerSeat = selectedCurrency === 'GBP' ? 36000 : 41000;
  const currencySymbol = selectedCurrency === 'GBP' ? '£' : '€';

  const totalInHouse = inHouseBasePerSeat * teamSize;
  const totalBimco = bimcoBasePerSeat * teamSize;
  const totalSavings = totalInHouse - totalBimco;

  const formattedInHouse = `${currencySymbol}${totalInHouse.toLocaleString()}`;
  const formattedBimco = `${currencySymbol}${totalBimco.toLocaleString()}`;
  const formattedSavings = `${currencySymbol}${totalSavings.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-blue-600 selection:text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Header Navigation & Breadcrumb */}
      <div className="flex items-center justify-between py-4 border-b border-slate-200 mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <button 
            onClick={onBackToHome}
            className="hover:text-blue-600 cursor-pointer transition-colors"
          >
            BIMCO
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Strategic BIM Production &amp; Nearshore Delivery</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToClientPortal}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <FolderSync className="w-3.5 h-3.5" />
            <span>Client Order Portal</span>
          </button>

          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-black bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs hover:shadow-sm transition-all cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide uppercase mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Strategic BIM Production // Scalable Architecture Delivery</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight mb-6">
          {isRTL ? (
            <>
              مدل‌سازی تخصصی، <span className="text-blue-600 underline decoration-blue-200 decoration-wavy decoration-2">امن و مقرون‌به‌صرفه BIM</span> برای استودیوهای معماری
            </>
          ) : (
            <>
              Scalable, Secure &amp; <span className="text-blue-600 underline decoration-blue-200 decoration-wavy decoration-2">Cost-Effective</span> Architectural BIM Delivery.
            </>
          )}
        </h1>

        <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8">
          {isRTL 
            ? 'تولید ساختاریافته مدل‌های رویت، هماهنگی بدون کلش چندرشته‌ای و نقشه‌های اجرایی با بالاترین استانداردهای امنیتی، تحت انطباق کامل با پروتکل‌های ISO 19650 و ارتباط مستقیم ابری.'
            : 'We provide dedicated Revit modeling, LOD 200–500 clash coordination, and comprehensive technical drawing packages—strictly compliant with ISO 19650 standards, European data privacy, and Autodesk Cloud protocols.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={() => onOpenWhatsApp('Hello Soheil, I am an architect/director interested in a 1-week free pilot project for our studio...')}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isRTL ? 'درخواست پروژه آزمایشی رایگان در واتساپ' : 'Request Free Pilot on WhatsApp'}</span>
          </button>
        </div>
      </section>

      {/* Trust & Standards Badges */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { label: 'ISO 19650-1 & 2', desc: 'Standardized Information Management' },
          { label: 'UK BIM Framework', desc: 'Compliant Naming & Uniclass' },
          { label: 'RIAI / RIBA', desc: 'Statutory Building Control Standards' },
          { label: 'Autodesk Cloud', desc: 'ACC & BIM 360 Direct Sync' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-center text-center">
            <ShieldCheck className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <span className="font-black text-sm text-slate-900">{item.label}</span>
            <span className="text-[11px] text-slate-500 mt-0.5">{item.desc}</span>
          </div>
        ))}
      </section>

      {/* 3-Way Delivery Methods Comparison: Security, Overhead & Risk */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-16 relative overflow-hidden">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>{isRTL ? 'ارزیابی جامع روش‌های تولید BIM' : 'Strategic Delivery Evaluation // Risk, Security & Cost'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            {isRTL ? 'مقایسه راهکارهای مدل‌سازی: امنیت داده‌ها، بهره‌وری و صرفه اقتصادی' : 'Comparing Architectural BIM Delivery Methods'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {isRTL 
              ? 'چرا همکاری استراتژیک با استودیو نزدیک‌ساحل (Nearshore) امن‌ترین و اقتصادی‌ترین راهکار برای دفاتر معماری پیشرو است:'
              : 'Why a dedicated nearshore partnership provides the optimal balance of enterprise IP security, ISO 19650 quality, and 50% operational cost savings compared to traditional domestic hiring or unregulated freelancers:'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Option 1: Traditional In-House */}
          <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-1">
                {isRTL ? 'روش اول: استخدام درون‌سازمانی' : 'Method 01: In-House Domestic'}
              </div>
              <h3 className="text-base font-bold text-white mb-4">
                {isRTL ? 'استخدام پرسنل ثابت محلی' : 'Traditional In-House Hiring'}
              </h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>{isRTL ? 'هزینه سرسام‌آور حقوق ثابت و بیمه کارفرما' : 'High fixed payroll, employer NI taxes & pension liabilities'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>{isRTL ? 'ریسک اتلاف هزینه در فواصل بین فازهای پروژه' : 'Expensive downtime payroll between design milestones'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>{isRTL ? 'هزینه استخدام ۱۵٪ تا ۲۰٪ کارگزاری‌ها' : '15%–20% recruitment fees per hire'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{isRTL ? 'امنیت فیزیکی درون‌دفتر' : 'On-premises physical presence'}</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700 text-[11px] font-mono text-slate-400">
              {isRTL ? 'هزینه سالانه: ۷۰,۰۰۰ تا ۸۰,۰۰۰ یورو' : 'Annual Cost: £68k–£78k / seat'}
            </div>
          </div>

          {/* Option 2: Far-Shore Freelancers (High Risk) */}
          <div className="bg-slate-800/80 rounded-2xl p-6 border border-red-500/30 flex flex-col justify-between relative">
            <div className="absolute top-4 right-4 text-[10px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/40 px-2 py-0.5 rounded">
              {isRTL ? 'ریسک بالا' : 'High Risk'}
            </div>
            <div>
              <div className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-1">
                {isRTL ? 'روش دوم: فریلنسرهای متفرقه' : 'Method 02: Unregulated Far-Shore'}
              </div>
              <h3 className="text-base font-bold text-white mb-4">
                {isRTL ? 'سایت‌های فریلنسری یا برون‌مرزی دور' : 'Unregulated Freelancer Portals'}
              </h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>{isRTL ? 'خطر سرقت یا درز مالکیت معنوی و نقشه‌ها' : 'Severe IP, data leak & client confidentiality vulnerabilities'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>{isRTL ? 'عدم تسلط بر استانداردهای دقیق ISO 19650' : 'Inconsistent Revit family standards & lack of ISO 19650'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>{isRTL ? 'اختلاف ساعت زیاد (۶ تا ۱۰ ساعت تاخیر)' : '6–10 hour timezone gap causing coordination bottlenecks'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{isRTL ? 'هزینه ارزان اما پرریسک' : 'Low nominal price, but high rework cost'}</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700 text-[11px] font-mono text-red-400">
              {isRTL ? 'ریسک بالا: اتلاف زمان و آسیب به اعتبار' : 'Hidden Cost: Rework & liability exposure'}
            </div>
          </div>

          {/* Option 3: BIMCO Dedicated Nearshore Studio */}
          <div className="bg-gradient-to-b from-blue-600 to-indigo-700 rounded-2xl p-6 shadow-lg border border-blue-400/50 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 text-[10px] font-mono font-bold bg-white/20 text-white border border-white/30 px-2 py-0.5 rounded flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-300" />
              <span>{isRTL ? 'انتخاب امن و بهینه' : 'Safe & Optimal'}</span>
            </div>
            <div>
              <div className="text-xs font-bold font-mono text-blue-200 uppercase tracking-wider mb-1">
                {isRTL ? 'روش سوم: همکاری استراتژیک' : 'Method 03: BIMCO Nearshore'}
              </div>
              <h3 className="text-base font-bold text-white mb-4">
                {isRTL ? 'استودیو اختصاصی BIMCO' : 'BIMCO Dedicated Studio'}
              </h3>
              <ul className="space-y-3 text-xs text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  <span>{isRTL ? 'امنیت تضمین‌شده در فضای ابری ACC تحت NDA' : '100% IP security: Direct Autodesk Construction Cloud live sync & NDAs'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  <span>{isRTL ? 'انطباق قطعی با استانداردهای ISO 19650 و مقررات ساختمانی' : 'Strict ISO 19650-1/2, RIAI & UK BIM Framework compliance'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  <span>{isRTL ? 'ساعت کاری همزمان با اروپا (CET / GMT)' : 'Real-time European timezone alignment & daily Teams / Slack sync'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  <span>{isRTL ? '۵۰٪ صرفه‌جویی و ارتقای چشمگیر حاشیه سود استودیو' : 'Up to 50% net savings: Zero recruitment or employer tax liabilities'}</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-400/40 text-[11px] font-mono text-emerald-200 font-bold flex items-center justify-between">
              <span>{isRTL ? 'صرفه‌جویی خالص: تا ۵۰٪' : 'Cost Savings: Up to 50%'}</span>
              <button 
                onClick={() => onOpenWhatsApp('Hello Soheil, I read your delivery method comparison and would like to discuss a pilot project...')}
                className="hover:underline cursor-pointer text-white font-bold"
              >
                {isRTL ? 'شروع پروژه آزمایشی →' : 'Start Free Pilot →'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner With Us // Studio Benefits & Efficiency */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isRTL ? 'مزایای همکاری و ارزش استودیو' : 'Key Practice Advantages // Studio Efficiency'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {isRTL ? 'چرا همکاری با ما؟' : 'Why Partner With Us?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isRTL 
                ? 'چگونه دفاتر معماری با تیم نزدیک‌ساحل (Nearshore) ما، ظرفیت مدل‌سازی خود را با بالاترین استانداردهای بین‌المللی ارتقا می‌دهند.'
                : 'How your practice scales Revit production and eliminates recruitment overhead with zero compromise on precision.'}
            </p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setSelectedCurrency('GBP')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCurrency === 'GBP' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Pound Sterling (£ GBP)
            </button>
            <button
              onClick={() => setSelectedCurrency('EUR')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCurrency === 'EUR' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Euro (€ EUR)
            </button>
          </div>
        </div>

        {/* Team Size Slider */}
        <div className="mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-200/70">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {isRTL ? 'تعداد مدل‌سازان اختصاصی رویت مورد نیاز:' : 'Required Dedicated Revit Modelers / Technicians:'}
            </label>
            <span className="text-lg font-black text-blue-600 bg-white px-4 py-1 rounded-xl border border-slate-200 shadow-xs">
              {teamSize} {teamSize === 1 ? 'Modeler (FTE)' : 'Modelers (FTE)'}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
            <span>1 Modeler</span>
            <span>3 Modelers</span>
            <span>5 Modelers</span>
            <span>10 Modelers</span>
          </div>
        </div>

        {/* Benefits & Value Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Traditional In-House Column */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {isRTL ? 'استخدام سنتی در انگلستان و اروپا' : 'Traditional In-House Hiring'}
            </span>
            <div className="text-3xl font-black text-slate-900 mt-2">{formattedInHouse} <span className="text-xs font-medium text-slate-500">/ year</span></div>
            <ul className="mt-6 space-y-3 text-xs text-slate-600">
              <li className="flex items-center gap-2 text-slate-700">
                <span className="text-red-500 font-bold">✕</span> High base salary (£48k-£60k / €55k-€72k)
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <span className="text-red-500 font-bold">✕</span> 13%-15% Employer NI / PRSI taxes
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <span className="text-red-500 font-bold">✕</span> Autodesk AEC license (~£3.5k/yr)
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <span className="text-red-500 font-bold">✕</span> Costly downtime between project phases
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <span className="text-red-500 font-bold">✕</span> 15%-20% Recruitment agency fees
              </li>
            </ul>
          </div>

          {/* BIMCO Nearshore Column */}
          <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-500/40 rounded-full blur-2xl" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
              {isRTL ? 'چرا همکاری با ما (استودیو BIMCO)' : 'Why Partner With BIMCO'}
            </span>
            <div className="text-3xl font-black text-white mt-2">{formattedBimco} <span className="text-xs font-medium text-blue-200">/ year</span></div>
            <ul className="mt-6 space-y-3 text-xs text-blue-50">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" /> Zero recruitment or placement fees
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" /> Zero employer NI, pension or payroll taxes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" /> Hardware &amp; Autodesk licenses included
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" /> Instant scale up/down per project demand
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" /> European timezone (GMT / CET) alignment
              </li>
            </ul>
          </div>

          {/* Net Studio Value */}
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                {isRTL ? 'ارزش افزوده و صرفه‌جویی سالانه استودیو' : 'Net Studio Value & Annual Efficiency'}
              </span>
              <div className="text-4xl font-black text-emerald-700 mt-2">{formattedSavings}</div>
              <p className="text-xs text-emerald-800 mt-2 leading-relaxed">
                Direct annual savings for {teamSize} {teamSize === 1 ? 'modeler' : 'modelers'}. Reinvest into design innovation, client pitch capacity, and partner equity.
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onOpenWhatsApp(`Hello Soheil, based on your online practice evaluation for ${teamSize} BIM modelers (${formattedSavings} annual efficiency), our studio would like to discuss a pilot project...`)}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isRTL ? 'گفتگو درباره آغاز همکاری در واتساپ' : 'Discuss Studio Partnership on WhatsApp'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our Core Architectural BIM Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Tailored specifically for architectural studios, conservation architects, and multi-disciplinary consultancies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Architectural Revit Modeling (LOD 200–500)',
              desc: 'From initial spatial massing to fully detailed as-built digital twins with precise material takeoffs, phasing, and design options.',
              icon: Building2,
              features: ['Custom Family Libraries', 'Phasing & Design Options', 'Uniclass 2015 Classification']
            },
            {
              title: 'Multi-Discipline Clash Coordination',
              desc: 'Navisworks Manage clash detection between architecture, structural frames, and MEP systems with prioritized BCF issue tracking.',
              icon: Cpu,
              features: ['Zero Hard Clashes Guarantee', 'Weekly BCF Reports', 'Coordinated Navisworks NWDs']
            },
            {
              title: 'Scan to BIM (Point Cloud Conversion)',
              desc: 'Converting 3D laser scan data (E57, RCP, PTS) into accurate parametric Revit models for retrofit, heritage, and refurbishment schemes.',
              icon: Layers,
              features: ['Millimeter Tolerances', 'Historic Fabric Modeling', 'Deformation Documentation']
            },
            {
              title: 'Working Drawing & CD Packages',
              desc: 'General arrangement floor plans, detailed wall sections, acoustic envelope details, and full statutory building regulation submissions.',
              icon: FileCheck,
              features: ['UK/Irish Statutory Compliance', 'Automated Door/Window Schedules', 'Detailed Section Callouts']
            },
            {
              title: 'ACC & BIM 360 Live Cloud Integration',
              desc: 'We plug directly into your studio’s Autodesk Construction Cloud environment, synchronizing changes daily with your central Revit model.',
              icon: Cloud,
              features: ['Daily Central Model Sync', 'Strict Office Template Adherence', 'Real-Time Teams / Slack Comms']
            },
            {
              title: 'Dedicated Nearshore Modelers',
              desc: 'Extend your studio capacity with full-time or fractional senior BIM technicians who function as an integral part of your design team.',
              icon: Clock,
              features: ['Same European Time Zone (GMT/CET)', 'English-Fluent Senior Architects', 'Flexible Monthly Retainers']
            }
          ].map((service, i) => {
            const Icon = service.icon;
            return (
              <div key={i} className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2">{service.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{service.desc}</p>
                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Case Study: Dublin TechHub BIM */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-20 relative overflow-hidden shadow-xl">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-4">
            <span>Featured Case Study // Ireland</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-4">
            Dublin TechHub BIM (LOD 350/400)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            A comprehensive commercial and technology facility modeling demonstration in Dublin, showcasing multi-story structural concrete frames, full MEP routing, acoustic ceilings, and clash-free coordination under ISO 19650 standards.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToDublinBim}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
            >
              <span>Launch Interactive 3D BIM Model</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onNavigateToClientPortal}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-3.5 rounded-xl transition-all border border-white/20 cursor-pointer"
            >
              <FolderSync className="w-3.5 h-3.5 text-emerald-400" />
              <span>Track Dublin Order in Client Portal</span>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto mb-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Everything You Need to Know About Outsourcing BIM
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'How does nearshore BIM collaboration work with our in-house Revit team?',
              a: 'We integrate directly into your Autodesk Construction Cloud (ACC) or BIM 360 workspace. Our modelers act as remote members of your studio, synchronizing with your central model daily. We align with your studio’s Revit template (.rte), families, annotations, and graphic standards so deliverables seamlessly blend into your practice.'
            },
            {
              q: 'How much can our UK or Irish architecture firm realistically save?',
              a: 'Most practices achieve 40% to 50% net cost savings compared to employing local in-house Revit modelers. You eliminate employer national insurance, PRSI, recruitment agency fees, workstation amortization, and expensive software subscription overhead.'
            },
            {
              q: 'Which BIM standards and classifications do you adhere to?',
              a: 'All our BIM deliverables comply with ISO 19650-1 & 2, the UK BIM Framework, Uniclass 2015 classification, and RIAI BIM guidelines in Ireland. We are fully versed in RIBA Plan of Work stages 1 through 6.'
            },
            {
              q: 'Can we start with a small pilot project before committing to a larger contract?',
              a: 'Yes, absolutely. We encourage architectural firms to test our workflow on a low-risk pilot project—such as modeling a single building level, developing complex parametric Revit families, or executing an independent clash detection audit. This allows your team to experience our speed and accuracy firsthand.'
            },
            {
              q: 'How do we ensure confidentiality and intellectual property protection?',
              a: 'We execute comprehensive Non-Disclosure Agreements (NDAs) before reviewing any client drawings. All models, families, and drawing sheets remain 100% the exclusive intellectual property of your architectural studio.'
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${activeFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-3xl p-8 sm:p-12 text-center shadow-lg">
        <h2 className="text-2xl sm:text-4xl font-black mb-3">
          Ready to Scale Your Architecture Practice?
        </h2>
        <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto mb-6">
          Send us your project brief, Revit model, or CAD sketches for a complimentary review and transparent cost estimate.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onOpenWhatsApp('Hello Soheil, I would like to schedule a 15-minute discovery call regarding nearshore BIM outsourcing for our practice...')}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-7 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with Lead BIM Architect (Soheil Masti)</span>
          </button>
          <a
            href="mailto:soheil.masti@gmail.com?subject=BIM%20Inquiry"
            className="inline-flex items-center gap-2 bg-white text-blue-800 hover:bg-slate-100 font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Send Email Brief</span>
          </a>
        </div>
      </section>

      {/* Talent Network Invite Callout */}
      {onNavigateToPartners && (
        <div className="mt-8 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              {isRTL ? 'معمار، مدلر BIM یا متخصص تاسیسات هستید؟' : 'Are you an Architect, BIM Modeler or MEP Specialist?'}
            </h4>
            <p className="text-xs text-slate-500">
              {isRTL ? 'به شبکه همکاران و استعدادهای بین‌المللی ما برای پروژه‌های جاری و آتی بپیوندید.' : 'Join our global talent pool for European project contracts and flexible remote collaborations.'}
            </p>
          </div>
          <button
            onClick={() => { sound.playClick(); onNavigateToPartners(); }}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer shrink-0 shadow-xs"
          >
            {isRTL ? 'ثبت فرم همکاران و رزومه' : 'Join Partner Network'}
          </button>
        </div>
      )}

    </div>
  );
};
