import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  HelpCircle, 
  BookOpen, 
  ShieldCheck, 
  Coins, 
  Layers, 
  Clock, 
  ChevronDown, 
  ExternalLink,
  PhoneCall,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { LanguageCode } from '../utils/i18n';
import { sound } from '../utils/audio';

interface BimKnowledgeHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
  onOpenWhatsApp?: (presetText?: string) => void;
  onNavigateToView?: (view: 'bim-outsourcing' | 'client-portal' | 'partners') => void;
}

interface FAQItem {
  id: string;
  category: 'commercial' | 'technical' | 'security' | 'operations';
  qEn: string;
  qFa: string;
  aEn: string;
  aFa: string;
  tags: string[];
}

export const KNOWLEDGE_FAQS: FAQItem[] = [
  // Commercial
  {
    id: 'faq-cost-comparison',
    category: 'commercial',
    qEn: 'How much does architectural BIM outsourcing cost compared to in-house UK/Irish hiring?',
    qFa: 'هزینه برون‌سپاری مدل‌سازی BIM در مقایسه با استخدام درون‌سازمانی در بریتانیا و ایرلند چقدر است؟',
    aEn: 'Employing an in-house Senior Revit Modeler in London or Dublin averages £68,000–£78,000 annually, plus 15–20% recruitment fees, pension, NI/PRSI, and £5,000+ Autodesk workstation subscriptions. BIMCO’s dedicated nearshore delivery reduces net production overhead by 40% to 50%, with flexible milestone or monthly seat billing and zero recruitment downtime.',
    aFa: 'استخدام یک مدلر ارشد در لندن یا دوبلین سالانه بین ۶۸٬۰۰۰ تا ۷۸٬۰۰۰ پوند به همراه بیمه، مالیات کارفرما و اشتراک نرم‌افزار هزینه دارد. همکاری با BIMCO هزینه‌های خالص تولید را بین ۴۰٪ تا ۵۰٪ کاهش داده و پرداخت‌ها را به شکل منعطف مایل‌استونی یا پروژه‌ای درمی‌آورد.',
    tags: ['Cost', 'Rates', 'UK', 'Ireland', 'Salary', 'Pricing']
  },
  {
    id: 'faq-pilot-project',
    category: 'commercial',
    qEn: 'Can our architectural practice start with a zero-risk pilot project?',
    qFa: 'آیا دفتر معماری ما می‌تواند کار را با یک پروژه آزمایشی (Pilot) کم‌ریسک آغاز کند؟',
    aEn: 'Yes, absolutely. We encourage architectural firms to initiate our partnership with a focused pilot—such as modeling a single building level, developing parametric Revit family templates, or conducting a clash audit. This enables your team to verify our ISO 19650 precision, speed, and communication firsthand before broader commitment.',
    aFa: 'بله، کاملاً. ما پیشنهاد می‌کنیم همکاری با یک پایلوت مشخص مانند مدل‌سازی یک طبقه ساختمانی، ساخت فمیلی‌های پارامتریک یا آدیت کلش آغاز شود تا کیفیت و دقت کار را پیش از قراردادهای بزرگتر تجربه کنید.',
    tags: ['Pilot', 'Trial', 'Risk-free', 'Onboarding']
  },
  {
    id: 'faq-billing-milestones',
    category: 'commercial',
    qEn: 'What are your payment terms and milestone structures?',
    qFa: 'شرایط پرداخت و ساختار مایل‌استون‌های تسویه به چه صورت است؟',
    aEn: 'We operate on transparent milestone deliverables pegged to RIBA work stages (typically 30% mobilization, 40% intermediate clash-coordination review, 30% final sign-off). Invoicing is in GBP (£) or EUR (€) via international bank wire, Wise, or SEPA transfer.',
    aFa: 'پرداخت‌ها بر اساس مایل‌استون‌های شفاف منطبق بر مراحل RIBA است (۳۰٪ پیش‌پرداخت آغازین، ۴۰٪ بررسی هماهنگی کلش میانی، و ۳۰٪ پس از تحویل نهایی). صورت‌حساب‌ها به پوند (£) یا یورو (€) بدون هیچ هزینه پنهان تسویه می‌شوند.',
    tags: ['Invoicing', 'Payment', 'Milestones', 'EUR', 'GBP']
  },

  // Technical & Standards
  {
    id: 'faq-lod-levels',
    category: 'technical',
    qEn: 'What is the exact distinction between LOD 200, 300, 350, and 400 in your Revit delivery?',
    qFa: 'تفاوت دقیق سطوح LOD 200 تا LOD 400 در تحویل مدل‌های رویت چیست؟',
    aEn: 'LOD 200 represents schematic massing and approximate geometry. LOD 300 defines accurate architectural design intent with precise dimensions and materials for planning. LOD 350 adds multi-disciplinary physical connection interfaces and clash-coordination data. LOD 400 incorporates fabrication-level detailing, assemblies, and manufacturer parameters ready for construction tender.',
    aFa: 'در سطح LOD 200 حجم کلی شماتیک مدل می‌شود. در LOD 300 ابعاد و متریال‌های دقیق برای فاز طراحی و مجوزها مشخص است. در LOD 350 اتصالات چندرشته‌ای و رفع تداخلات سازه و تاسیسات تکمیل می‌گردد. در LOD 400 جزییات شاپ و ساخت‌وساز آماده مناقصه اجرایی می‌شود.',
    tags: ['LOD 300', 'LOD 350', 'LOD 400', 'Revit', 'Standards']
  },
  {
    id: 'faq-iso-19650',
    category: 'technical',
    qEn: 'How does BIMCO ensure compliance with ISO 19650-1 and ISO 19650-2?',
    qFa: 'BIMCO چگونه انطباق با استانداردهای بین‌المللی ISO 19650-1 و 2 را تضمین می‌کند؟',
    aEn: 'Our workflows strictly adhere to ISO 19650 protocols: standardized naming conventions (Project-Originator-Volume-Level-Type-Role-Number), CDE state transitions (Work in Progress -> Shared -> Published), Uniclass 2015 object classification, and alignment with client Exchange Information Requirements (EIR) and BIM Execution Plans (BEP).',
    aFa: 'فرآیند کاری ما کاملاً بر پروتکل‌های ISO 19650 منطبق است: کدگذاری استاندارد فایل‌ها، وضعیت‌های CDE (از در حال کار تا منتشرشده)، دسته‌بندی Uniclass 2015 و همسویی با دستورالعمل‌های EIR و BEP کارفرما.',
    tags: ['ISO 19650', 'UK BIM Framework', 'Uniclass 2015', 'BEP', 'EIR']
  },
  {
    id: 'faq-clash-detection',
    category: 'technical',
    qEn: 'How do you conduct clash detection across Architecture, Structure, and MEP?',
    qFa: 'فرآیند رفع تداخلات و کلش بین معماری، سازه و تاسیسات چگونه انجام می‌شود؟',
    aEn: 'We execute clash tests using Autodesk Navisworks Manage and Solibri Model Checker. We establish custom tolerance rules (Hard, Soft, Clearance clashes), generate prioritized clash matrices, and resolve conflicts in native Revit files before producing drawing sheets, achieving up to 99.8% clash-free spatial coordination.',
    aFa: 'تداخلات با استفاده از Navisworks Manage و Solibri بررسی می‌شوند. ما ماتریس تداخلات اولویت‌بندی شده تعریف کرده و پیش از استخراج شیت‌ها، کلش‌ها را مستقیماً در فایل‌های رویت حل می‌کنیم تا به مدل ۹۹.۸٪ بدون تداخل دست یابیم.',
    tags: ['Navisworks', 'Solibri', 'Clash Detection', 'MEP', 'QA']
  },

  // Security & IP
  {
    id: 'faq-ip-ownership',
    category: 'security',
    qEn: 'Who retains intellectual property (IP) and copyright of models and drawing sheets?',
    qFa: 'مالکیت فکری و کپی‌رایت مدل‌های رویت و نقشه‌ها متعلق به چه کسی خواهد بود؟',
    aEn: '100% exclusive intellectual property and copyright belong to your architectural studio. We execute comprehensive Non-Disclosure Agreements (NDAs) prior to receiving drawings. BIMCO claims zero ownership of your proprietary designs, families, or details.',
    aFa: '۱۰۰٪ مالکیت معنوی، کپی‌رایت و حقوق مدل‌ها متعلق به استودیوی معماری شماست. پیش از دریافت هر فایلی، قرارداد رسمی عدم افشا (NDA) امضا می‌شود و BIMCO هیچ ادعایی روی طرح‌های شما ندارد.',
    tags: ['IP', 'Copyright', 'NDA', 'Security', 'Confidentiality']
  },
  {
    id: 'faq-acc-cde',
    category: 'security',
    qEn: 'How do you connect to our Autodesk Construction Cloud (ACC) or BIM 360 hub?',
    qFa: 'اتصال به ابر Autodesk Construction Cloud (ACC) یا BIM 360 کارفرما چگونه انجام می‌شود؟',
    aEn: 'Our coordinators connect directly into your studio’s Autodesk Construction Cloud (ACC) or BIM 360 Common Data Environment via assigned contributor seats. Your data never leaves your secure cloud repository, maintaining complete version control and permission governance.',
    aFa: 'مدلرهای ما مستقیماً به محیط ابری ACC یا BIM 360 استودیوی شما لاگین می‌کنند. فایل‌ها و داده‌های پروژه هرگز از سرور ابری امن شما خارج نشده و کنترل دسترسی‌ها کاملاً در اختیار شماست.',
    tags: ['ACC', 'BIM 360', 'Cloud', 'CDE', 'Autodesk']
  },
  {
    id: 'faq-gdpr',
    category: 'security',
    qEn: 'Are your studio operations and data transfers compliant with EU and UK GDPR?',
    qFa: 'آیا فرآیندهای استودیو با قوانین حفاظت از داده‌های اتحادیه اروپا و بریتانیا (GDPR) سازگار است؟',
    aEn: 'Yes. Operating from Barcelona, Spain, we operate under full European Union legal jurisdiction and strict GDPR regulations. All client communications, credentials, and data transfer protocols adhere to enterprise data protection standards.',
    aFa: 'بله، استودیوی ما مستقر در بارسلون اسپانیا تحت قوانین رسمی اتحادیه اروپا و استانداردهای سخت‌گیرانه GDPR فعالیت می‌کند و امنیت کامل ارتباطات و داده‌ها تضمین شده است.',
    tags: ['GDPR', 'European Law', 'Data Privacy', 'Spain', 'EU']
  },

  // Operations
  {
    id: 'faq-timezone',
    category: 'operations',
    qEn: 'How does European timezone alignment eliminate far-shore outsourcing delays?',
    qFa: 'همزمانی منطقه زمانی اروپا چگونه تاخیرهای ناشی از برون‌سپاری به آسیا را برطرف می‌کند؟',
    aEn: 'Unlike far-shore providers in India or Southeast Asia with 6–10 hour time discrepancies, BIMCO operates in the GMT/CET time zone (0 to 1 hour difference from London and Dublin). Questions are answered in real-time, daily scrums occur during normal office hours, and revision cycles execute without overnight deadlocks.',
    aFa: 'برخلاف شرکت‌های دوردست آسیایی با اختلاف ۶ تا ۱۰ ساعته، ساعت کاری ما در منطقه زمانی GMT/CET با لندن و دوبلین (حداکثر ۱ ساعت اختلاف) کاملاً همزمان است و پاسخ‌ها بدون تاخیر ۲۴ ساعته داده می‌شود.',
    tags: ['Timezone', 'CET', 'GMT', 'Real-time', 'London', 'Dublin']
  },
  {
    id: 'faq-turnaround',
    category: 'operations',
    qEn: 'What is your typical turnaround time for architectural modeling packages?',
    qFa: 'زمان تحویل معمول برای بسته‌های مدل‌سازی و نقشه‌کشی چقدر است؟',
    aEn: 'For standard commercial/residential floors (LOD 350), turnaround is typically 48 to 72 hours per level. Emergency clash resolution sprints can be delivered within 24 hours. Project milestones are scheduled with guaranteed delivery deadlines backed by Service Level Agreements (SLAs).',
    aFa: 'برای هر طبقه ساختمانی تجاری یا مسکونی در سطح LOD 350، زمان تحویل معمول بین ۴۸ تا ۷۲ ساعت است. اصلاحات فوری کلش ظرف ۲۴ ساعت تحویل داده شده و دارای تعهد زمانی معین است.',
    tags: ['Turnaround', 'Speed', '48h', 'SLA', 'Deadlines']
  },
  {
    id: 'faq-software-versions',
    category: 'operations',
    qEn: 'Which Autodesk Revit versions and complementary software do you support?',
    qFa: 'از چه نسخه‌هایی از نرم‌افزار رویت و نرم‌افزارهای جانبی پشتیبانی می‌کنید؟',
    aEn: 'We support Autodesk Revit versions 2021 through 2026. For computational and clash coordination, we utilize Navisworks Manage, Solibri Model Checker, Rhino 7/8 with Grasshopper, Dynamo scripting, AutoCAD, and Unreal Engine 5 for real-time architectural visualization.',
    aFa: 'ما از نسخه‌های ۲۰۲۱ تا ۲۰۲۶ اتودسک رویت پشتیبانی می‌کنیم. برای هماهنگی و رندرینگ از Navisworks Manage، Solibri، راینو و گرس‌هاپر، داینامو و آنریل انجین ۵ استفاده می‌شود.',
    tags: ['Revit 2024', 'Revit 2025', 'Grasshopper', 'Dynamo', 'Rhino']
  }
];

export const BimKnowledgeHubModal: React.FC<BimKnowledgeHubModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onOpenWhatsApp,
  onNavigateToView
}) => {
  const isRTL = currentLanguage === 'fa';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-cost-comparison');

  const filteredFaqs = useMemo(() => {
    return KNOWLEDGE_FAQS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        !q ||
        item.qEn.toLowerCase().includes(q) ||
        item.qFa.toLowerCase().includes(q) ||
        item.aEn.toLowerCase().includes(q) ||
        item.aFa.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFaq = (id: string) => {
    sound.playClick();
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div 
        className="w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {isRTL ? 'مرکز دانش تخصصی و پرسش‌های BIMCO' : 'BIMCO Architectural Knowledge & Answer Hub'}
                </h3>
                <span className="hidden sm:inline text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  GOOGLE #1 AUTHORITY
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {isRTL 
                  ? 'پاسخ‌های مستند، شفاف و کامل به تمامی سوالات کارفرمایان و مدیران بیم درباره نرخ‌ها، استانداردها و امنیت'
                  : 'Exhaustive, verifiable answers on rates, ISO 19650 protocols, CDE security, and pilot engagements.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-100 space-y-3 bg-white">
          <div className="relative">
            <Search className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3.5' : 'left-3.5'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRTL ? 'جستجوی سوال (مثلاً: قیمت، استاندارد ISO، کلش، نمونه آزمایشی، کپی‌رایت...)' : 'Search questions (e.g., pricing, LOD 350, ISO 19650, clash detection, NDA, pilot...)'}
              className={`w-full py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all ${
                isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 ${isRTL ? 'left-3.5' : 'right-3.5'}`}
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              { id: 'all', labelEn: 'All Questions (12)', labelFa: 'همه سوالات (۱۲)' },
              { id: 'commercial', labelEn: 'Pricing & Savings', labelFa: 'قیمت و صرفه‌جویی' },
              { id: 'technical', labelEn: 'LOD & ISO 19650', labelFa: 'استاندارد و سطوح LOD' },
              { id: 'security', labelEn: 'Security & IP (NDA)', labelFa: 'امنیت و کپی‌رایت' },
              { id: 'operations', labelEn: 'Delivery & Timezone', labelFa: 'زمان تحویل و ساعت کاری' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => { sound.playClick(); setSelectedCategory(cat.id); }}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {isRTL ? cat.labelFa : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Questions & Answers Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 divide-y divide-slate-100">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <HelpCircle className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-semibold">{isRTL ? 'سوالی مطابق با جستجوی شما پیدا نشد.' : 'No questions match your search query.'}</p>
              <p className="text-xs text-slate-500">
                {isRTL ? 'می‌توانید مستقیماً در واتساپ سوال خود را بپرسید.' : 'Feel free to chat with us directly on WhatsApp for immediate answers.'}
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="pt-3 first:pt-0">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-start justify-between gap-4 text-left p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase font-bold">
                          {faq.category}
                        </span>
                        {faq.tags.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="hidden sm:inline text-[9px] font-mono text-slate-400">
                            #{t}
                          </span>
                        ))}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {isRTL ? faq.qFa : faq.qEn}
                      </h4>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 mt-1 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 animate-in fade-in duration-200">
                      <p className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60 font-normal">
                        {isRTL ? faq.aFa : faq.aEn}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isRTL ? 'پاسخ داده‌شده منطبق با استاندارد بین‌المللی ISO 19650' : 'Verified against ISO 19650 & UK BIM Framework standards.'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
                onOpenWhatsApp?.('Hello Soheil, I have a specific question regarding architectural BIM outsourcing that wasn\'t in the FAQ: ');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{isRTL ? 'پرسش اختصاصی در واتساپ' : 'Ask Directly on WhatsApp'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
