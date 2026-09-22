import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle, 
  Sparkles, 
  Users, 
  Briefcase, 
  Clock, 
  Globe, 
  ShieldCheck, 
  Coins, 
  FolderGit2, 
  ExternalLink,
  ChevronDown,
  Layers,
  Copy,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { LanguageCode } from '../utils/i18n';
import { PartnerApplication } from '../types';
import { sound } from '../utils/audio';

interface PartnersNetworkViewProps {
  currentLanguage: LanguageCode;
  onBackToHome: () => void;
  onOpenWhatsApp?: (presetText?: string) => void;
}

const DISCIPLINES = [
  'Architectural BIM Modeler (Revit / ArchiCAD)',
  'BIM Coordinator & Clash Specialist (Navisworks / Solibri / ACC)',
  'MEP BIM Modeler & Coordinator (HVAC / Electrical / Plumbing)',
  '3D Architectural Visualizer & VR (Unreal Engine 5 / Lumion)',
  'Parametric & Computational Designer (Rhino / Grasshopper / Dynamo)',
  'Structural BIM Modeler & Detailer (Tekla / Revit Structure)',
  'Architectural Designer & Project Architect',
  'Other / Multi-Disciplinary'
];

const SOFTWARE_OPTIONS = [
  'Autodesk Revit',
  'Navisworks Manage',
  'Rhino 7/8',
  'Grasshopper',
  'AutoCAD',
  'Autodesk ACC / BIM 360',
  'Solibri Model Checker',
  'Dynamo BIM',
  'Unreal Engine 5',
  'Lumion / Enscape',
  '3ds Max / V-Ray',
  'Tekla Structures'
];

export const PartnersNetworkView: React.FC<PartnersNetworkViewProps> = ({
  currentLanguage,
  onBackToHome,
  onOpenWhatsApp
}) => {
  const isRTL = currentLanguage === 'fa';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    location: '',
    discipline: DISCIPLINES[0],
    experienceYears: '3-5 years',
    softwareStack: ['Autodesk Revit', 'Navisworks Manage'] as string[],
    portfolioUrl: '',
    collaborationType: 'Immediate Project Freelance',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Load existing submission if in session
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bimco_last_application_id');
      if (saved) {
        setSubmissionId(saved);
      }
    } catch (e) {}
  }, []);

  const handleSoftwareToggle = (software: string) => {
    sound.playClick();
    setFormData(prev => {
      const exists = prev.softwareStack.includes(software);
      if (exists) {
        return { ...prev, softwareStack: prev.softwareStack.filter(s => s !== software) };
      } else {
        return { ...prev, softwareStack: [...prev.softwareStack, software] };
      }
    });
  };

  const generateWhatsAppMessage = () => {
    return encodeURIComponent(
      `👋 Hello Soheil, I would like to join the BIMCO Architectural & BIM Partner Network!\n\n` +
      `👤 *Full Name:* ${formData.fullName || 'Architect / Modeler'}\n` +
      `🎯 *Discipline:* ${formData.discipline}\n` +
      `⏳ *Experience:* ${formData.experienceYears}\n` +
      `💻 *Software:* ${formData.softwareStack.join(', ') || 'Revit'}\n` +
      `📍 *Location:* ${formData.location || 'Remote'}\n` +
      `🔗 *Portfolio/CV:* ${formData.portfolioUrl || 'Will share upon request'}\n` +
      `🤝 *Collaboration Type:* ${formData.collaborationType}\n` +
      (formData.notes ? `📝 *Notes:* ${formData.notes}\n` : '') +
      `\nLooking forward to collaborating on upcoming architectural & BIM deliveries!`
    );
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSwitch();
    
    // Save locally
    const appId = `BIM-TALENT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    saveApplication(appId);

    const waMsg = generateWhatsAppMessage();
    window.open(`https://wa.me/34610855434?text=${waMsg}`, '_blank');
    setIsSubmitted(true);
  };

  const handleSaveToDatabase = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSwitch();
    const appId = `BIM-TALENT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    saveApplication(appId);
    setIsSubmitted(true);
  };

  const saveApplication = (appId: string) => {
    setSubmissionId(appId);
    try {
      const newApp: PartnerApplication = {
        id: appId,
        fullName: formData.fullName,
        email: formData.email,
        whatsapp: formData.whatsapp,
        location: formData.location,
        discipline: formData.discipline,
        experienceYears: formData.experienceYears,
        softwareStack: formData.softwareStack,
        portfolioUrl: formData.portfolioUrl,
        collaborationType: formData.collaborationType,
        notes: formData.notes,
        submittedAt: new Date().toISOString()
      };
      
      const existing = JSON.parse(localStorage.getItem('bimco_talent_registry') || '[]');
      existing.unshift(newApp);
      localStorage.setItem('bimco_talent_registry', JSON.stringify(existing.slice(0, 20)));
      localStorage.setItem('bimco_last_application_id', appId);
    } catch (e) {
      console.warn('Storage warning:', e);
    }
  };

  const handleCopySummary = () => {
    sound.playClick();
    const text = 
      `BIMCO Talent Application [${submissionId}]\n` +
      `Name: ${formData.fullName}\n` +
      `Discipline: ${formData.discipline}\n` +
      `Experience: ${formData.experienceYears}\n` +
      `Software: ${formData.softwareStack.join(', ')}\n` +
      `Portfolio: ${formData.portfolioUrl}\n` +
      `Availability: ${formData.collaborationType}`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const faqs = [
    {
      q: isRTL ? 'نحوه هماهنگی و تخصیص پروژه‌ها به چه صورت است؟' : 'How are projects assigned and coordinated?',
      a: isRTL 
        ? 'تمامی پروژه‌ها بر اساس استانداردهای بین‌المللی ISO 19650 و مستقیماً روی سرورهای ابری اشتراکی (مانند Autodesk Construction Cloud) مدیریت می‌شوند. شرح خدمات، ددلاین‌ها و چک‌لیست‌های تحویل پیش از شروع کاملاً شفاف مشخص می‌گردد.'
        : 'Projects are executed under strict ISO 19650 standards via cloud common data environments (Autodesk Construction Cloud / ACC). Scope of work, milestone deliverables, and model health checklists are defined upfront.'
    },
    {
      q: isRTL ? 'پرداخت حق‌الزحمه‌ها چگونه انجام می‌شود؟' : 'How are payments processed?',
      a: isRTL
        ? 'حق‌الزحمه‌ها بر اساس مایل‌استون‌های مصوب و به صورت ارزی (یورو، پوند یا دلار) و از طریق ترانسفر بین‌المللی، Wise، پی‌پال یا سایر مسیرهای توافق‌شده بدون هیچ‌گونه تاخیر تسویه می‌گردد.'
        : 'Compensation is milestone-based or hourly in EUR (€), GBP (£), or USD ($) via international bank transfer, Wise, or PayPal immediately upon quality QA approval.'
    },
    {
      q: isRTL ? 'اگر در حال حاضر وقت آزاد نداشته باشم، ثبت نام چه فایده‌ای دارد؟' : 'If I am currently busy, should I still register?',
      a: isRTL
        ? 'بله، حتماً! با ثبت مشخصات، رزومه و سطح تسلط نرم‌افزاری شما در بانک استعدادهای ما ثبت شده و به محض باز شدن پروژه‌های متناسب با زمان و تخصص شما، مستقیماً برای هماهنگی با شما تماس گرفته می‌شود.'
        : 'Yes, absolutely! By submitting your profile, you are entered into our primary talent database. When project surges or specialized requirements matching your discipline arise, you will be contacted directly.'
    },
    {
      q: isRTL ? 'چه نرم‌افزارها و تخصص‌هایی در اولویت هستند؟' : 'Which disciplines and software are in highest demand?',
      a: isRTL
        ? 'مدل‌سازی معماری و فاز ۲ در رویت (LOD 300-350)، هماهنگی تاسیسات MEP، تشخیص و رفع تداخلات با ناویزورکس، و طراحی پارامتریک در گرس‌هاپر بیشترین تقاضا را دارند.'
        : 'Revit architectural production (LOD 300–400), MEP spatial coordination, Navisworks clash resolution, and Grasshopper parametric scripting have consistent project demand.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 pt-20 pb-28 px-4 sm:px-6 lg:px-12 selection:bg-blue-600 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Top Breadcrumb & Return to Maquette */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200/80">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <span className="font-bold text-gray-900 tracking-wider">BIMCO</span>
            <span>/</span>
            <span className="text-blue-600 font-semibold">
              {isRTL ? 'شبکه همکاران و استعدادهای معماری و BIM' : 'Partner & Talent Network'}
            </span>
            <span className="hidden sm:inline">/</span>
            <span className="hidden sm:inline text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {isRTL ? 'همکاری پروژه‌ای و دورکاری' : 'Open Collaboration & Remote Delivery'}
            </span>
          </div>

          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white text-gray-700 hover:text-black hover:bg-gray-100 shadow-sm border border-gray-200 text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            <span>{isRTL ? 'بازگشت به صفحه اصلی' : 'Return to Portfolio'}</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-mono font-bold">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>{isRTL ? 'دعوت به همکاری تخصصی' : 'GLOBAL ARCHITECTURAL & BIM NETWORK'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {isRTL ? (
                <>به شبکه همکاران و متخصصین <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">BIM و معماری</span> بپیوندید</>
              ) : (
                <>Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">Architectural & BIM</span> Partner Network</>
              )}
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal max-w-2xl">
              {isRTL
                ? 'ما همواره مشتاق همکاری با معماران خلاق، مدلرها و هماهنگ‌کننده‌های ارشد BIM، متخصصان تاسیسات MEP و آرتیست‌های سه‌بعدی برای اجرای پروژه‌های بین‌المللی در اروپا، بریتانیا و خاورمیانه هستیم. اطلاعات خود را ثبت کنید تا برای پروژه‌های جاری یا آتی مستقیماً با شما هماهنگ شویم.'
                : 'We collaborate with talented architects, BIM coordinators, MEP specialists, computational designers, and 3D visualizers for international project deliveries across the UK, Ireland, and Europe. Register your profile to be contacted for immediate project engagements or future pipeline opportunities.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ISO 19650 Standards</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Milestone Payments (€ / £ / $)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>100% Remote / Nearshore</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Collaboration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-2 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">
              {isRTL ? 'پروژه‌های معتبر بین‌المللی' : 'Prestige Global Projects'}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {isRTL
                ? 'تجربه کار روی ساختمان‌های تجاری، مسکونی و درمانی در اروپا منطبق با استانداردهای نوین LOD 350-400.'
                : 'Work on verified commercial, residential, and institutional projects adhering to modern European LOD 350–400 standards.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-2 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">
              {isRTL ? 'تسویه شفاف و به‌موقع' : 'Fair & Guaranteed Pay'}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {isRTL
                ? 'پرداخت‌های شفاف مایل‌استونی به یورو، پوند یا دلار با قراردادهای معین و بدون معطلی پس از تحویل.'
                : 'Clear milestone or hourly compensation in EUR, GBP, or USD with transparent agreements upon deliverable approval.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-2 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">
              {isRTL ? 'انعطاف‌پذیری کامل دورکاری' : 'Flexible Remote Workflow'}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {isRTL
                ? 'امکان همکاری به صورت فریلنس پروژه‌ای، پاره‌وقت یا تمام‌وقت از هر کجای دنیا با هماهنگی در محیط ابری.'
                : 'Work remotely from anywhere via cloud CDEs (ACC, BIM 360) on project-based, part-time, or full-time schedules.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-2 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">
              {isRTL ? 'ثبت در بانک پروژه‌های آتی' : 'Continuous Pipeline'}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {isRTL
                ? 'حتی در زمان شلوغی کاری، پروفایل شما ذخیره می‌شود تا در زمان پروژه‌های بزرگ آتی اولویت اول تماس باشید.'
                : 'Even when fully booked, your profile remains in our primary talent pool for direct outreach during high-volume tenders.'}
            </p>
          </div>
        </div>

        {/* Main Content Area: Form & Talent Registry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Form Container (7 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-clay-md border border-gray-200/80 space-y-6">
            
            <div className="space-y-1 pb-4 border-b border-gray-100">
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                <span>{isRTL ? 'فرم ثبت مشخصات همکاری' : 'Partner Registration Form'}</span>
              </h2>
              <p className="text-xs text-gray-500">
                {isRTL
                  ? 'مشخصات خود را وارد کنید. می‌توانید مستقیماً فرم را در واتساپ ارسال کنید یا در سیستم ثبت نمایید.'
                  : 'Complete your details below. You can submit directly via WhatsApp or register into our talent database.'}
              </p>
            </div>

            {/* Success Banner if submitted */}
            {isSubmitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-emerald-900">
                      {isRTL ? 'اطلاعات شما با موفقیت در بانک همکاران ثبت شد!' : 'Application Successfully Logged in Talent Database!'}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-mono">
                      Ref ID: <span className="font-bold underline">{submissionId}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={handleCopySummary}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedSummary ? (isRTL ? 'کپی شد!' : 'Copied!') : (isRTL ? 'کپی خلاصه فرم' : 'Copy Application Summary')}</span>
                  </button>

                  <a
                    href={`https://wa.me/34610855434?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isRTL ? 'ارسال سریع به واتساپ' : 'Fast-Track on WhatsApp'}</span>
                  </a>
                </div>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSaveToDatabase}>
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                    <span>{isRTL ? 'نام و نام خانوادگی' : 'Full Name'} *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={isRTL ? 'مثال: علی رضایی' : 'e.g., Alex Morisson'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">
                    <span>{isRTL ? 'آدرس ایمیل' : 'Email Address'} *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="architect@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Row 2: WhatsApp & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                    <span>{isRTL ? 'شماره تماس یا واتساپ' : 'WhatsApp / Phone Number'} *</span>
                    <span className="text-[10px] text-gray-400 font-normal">{isRTL ? 'با پیش‌شماره کشور' : 'with country code'}</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+44 ... / +98 ... / +34 ..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">
                    <span>{isRTL ? 'کشور، شهر یا منطقه زمانی' : 'Location & Timezone'} *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder={isRTL ? 'مثال: تهران / بارسلون / لندن (GMT+3.5)' : 'e.g., London, Dublin, Barcelona (GMT/CET)'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Primary Discipline & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">
                    <span>{isRTL ? 'تخصص اصلی' : 'Primary Discipline'} *</span>
                  </label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    {DISCIPLINES.map((d, i) => (
                      <option key={i} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">
                    <span>{isRTL ? 'سابقه کار تخصصی' : 'Years of Experience'} *</span>
                  </label>
                  <select
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="1-3 years">{isRTL ? '۱ تا ۳ سال (Junior / Intermediate)' : '1-3 years (Junior / Intermediate)'}</option>
                    <option value="4-7 years">{isRTL ? '۴ تا ۷ سال (Mid-Senior Specialist)' : '4-7 years (Mid-Senior Specialist)'}</option>
                    <option value="8+ years">{isRTL ? '۸ سال به بالا (Senior Lead / Coordinator)' : '8+ years (Senior Lead / Coordinator)'}</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Multi-select Software Stack */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                  <span>{isRTL ? 'نرم‌افزارهای مسلط (انتخاب موارد)' : 'Software Stack Proficiency'} *</span>
                  <span className="text-[10px] text-gray-400">{formData.softwareStack.length} {isRTL ? 'مورد انتخاب شده' : 'selected'}</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {SOFTWARE_OPTIONS.map((sw) => {
                    const isSelected = formData.softwareStack.includes(sw);
                    return (
                      <button
                        type="button"
                        key={sw}
                        onClick={() => handleSoftwareToggle(sw)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-xs scale-102 ring-1 ring-blue-400'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {sw}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Portfolio / LinkedIn Link & Collaboration Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                    <span>{isRTL ? 'لینک نمونه‌کار، لینکدین یا گوگل‌درایو' : 'Portfolio / LinkedIn / Drive Link'} *</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/... or drive link"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">
                    <span>{isRTL ? 'نوع تمایل به همکاری' : 'Availability & Collaboration Type'} *</span>
                  </label>
                  <select
                    value={formData.collaborationType}
                    onChange={(e) => setFormData({ ...formData, collaborationType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="Immediate Project Freelance">{isRTL ? 'پروژه‌ای فوری (آماده شروع)' : 'Immediate Project Freelance'}</option>
                    <option value="Part-time (10-20h/week)">{isRTL ? 'پاره‌وقت (۱۰ تا ۲۰ ساعت در هفته)' : 'Part-time (10-20h/week)'}</option>
                    <option value="Full-time Remote Contract">{isRTL ? 'تمام‌وقت دورکاری (قراردادی)' : 'Full-time Remote Contract'}</option>
                    <option value="Future Project Pool">{isRTL ? 'همکاری در پروژه‌های آینده (ثبت در دیتابیس)' : 'Future Project Pool (Database Only)'}</option>
                  </select>
                </div>
              </div>

              {/* Row 6: Notes / Self-introduction */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">
                  <span>{isRTL ? 'توضیحات کوتاه یا معرفی توانمندی‌ها (اختیاری)' : 'Brief Introduction / Key Projects (Optional)'}</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={isRTL ? 'پروژه‌های شاخص، سطح تسلط به استانداردهای بین‌المللی یا هر نکته تکمیلی...' : 'Highlight key project typologies, ISO 19650 familiarity, or availability notes...'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                {/* Send via WhatsApp (Instant Direct) */}
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isRTL ? 'ارسال مستقیم فرم در واتساپ' : 'Send Application via WhatsApp'}</span>
                </button>

                {/* Save to Talent Database */}
                <button
                  type="submit"
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gray-900 hover:bg-black text-white text-xs font-bold shadow-sm hover:shadow-md active:scale-98 transition-all cursor-pointer border border-gray-800"
                >
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span>{isRTL ? 'ثبت در بانک اطلاعاتی استودیو' : 'Save in Studio Talent Registry'}</span>
                </button>
              </div>

              <p className="text-[11px] text-gray-400 text-center font-mono">
                🔒 {isRTL ? 'اطلاعات و رزومه شما کاملاً محرمانه نزد استودیو نگهداری می‌شود.' : 'Your portfolio and personal information are strictly confidential and protected.'}
              </p>
            </form>
          </div>

          {/* Sidebar / Quick Info & Direct Chat (4 cols) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Direct WhatsApp Quick Chat Card */}
            <div className="bg-emerald-50/70 bg-gradient-to-br from-emerald-50/80 to-teal-50/50 rounded-3xl p-6 border border-emerald-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">
                    {isRTL ? 'گفتگوی سریع با سهیل مستی' : 'Quick Chat with Studio Lead'}
                  </h4>
                  <p className="text-[11px] text-emerald-800 font-mono">WhatsApp: +34 610 855 434</p>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {isRTL
                  ? 'ترجیح می‌دهید به جای پر کردن فرم، مستقیماً رزومه یا لینک پورتفولیوی خود را در واتساپ ارسال کنید؟'
                  : 'Prefer to skip the form and share your PDF resume or Behance link directly on WhatsApp?'}
              </p>

              <button
                onClick={() => {
                  sound.playClick();
                  if (onOpenWhatsApp) {
                    onOpenWhatsApp('Hi Soheil, I am reaching out to explore architectural/BIM collaboration opportunities!');
                  } else {
                    window.open('https://wa.me/34610855434', '_blank');
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
              >
                <span>{isRTL ? 'ارسال پیام در واتساپ' : 'Open WhatsApp Chat'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* In-Demand Disciplines Checklist */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-4">
              <h4 className="text-xs font-bold text-gray-900 font-mono tracking-wider uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>{isRTL ? 'تخصص‌های با اولویت بالا' : 'CURRENT HIGH-PRIORITY ROLES'}</span>
              </h4>

              <ul className="space-y-2.5 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <div>
                    <span className="font-bold text-gray-900">Senior Revit Modelers</span>
                    <p className="text-[11px] text-gray-500">LOD 300–350 Commercial & High-End Residential</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                  <div>
                    <span className="font-bold text-gray-900">BIM Clash Coordinators</span>
                    <p className="text-[11px] text-gray-500">Navisworks Manage & Solibri Clash Matrix</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                  <div>
                    <span className="font-bold text-gray-900">MEP BIM Specialists</span>
                    <p className="text-[11px] text-gray-500">Spatial plant room & pipework routing</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                  <div>
                    <span className="font-bold text-gray-900">Grasshopper / Dynamo Scripting</span>
                    <p className="text-[11px] text-gray-500">Algorithmic facade generation & data automation</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Cloud & ISO Compliance Badge */}
            <div className="bg-gray-50 rounded-3xl p-5 border border-gray-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-800">
                <FolderGit2 className="w-4 h-4 text-blue-600" />
                <span>Autodesk ACC & CDE Ready</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                {isRTL
                  ? 'تمامی پروژه‌ها دارای محیط استاندارد تبادل داده (CDE) بوده و بر بسترهای ابری امن اجرا می‌شوند.'
                  : 'All collaboration uses enterprise-grade Common Data Environments with full ISO 19650 naming conventions.'}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-clay-md space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-gray-900">
              {isRTL ? 'پرسش‌های متداول همکاران و متخصصین' : 'Frequently Asked Questions for Partners'}
            </h3>
            <p className="text-xs text-gray-500">
              {isRTL ? 'اطلاعات تکمیلی در مورد شیوه قرارداد، تسویه‌حساب و مدیریت پروژه‌ها' : 'Clear answers regarding workflows, payout cycles, and collaboration mechanics'}
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="py-3.5">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveFaq(isOpen ? null : idx);
                    }}
                    className="w-full flex items-center justify-between text-left gap-4 text-xs sm:text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <p className="mt-2.5 text-xs text-gray-600 leading-relaxed animate-in fade-in duration-200">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
