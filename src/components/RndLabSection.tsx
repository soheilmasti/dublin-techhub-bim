import React, { useState } from 'react';
import { 
  Cpu, 
  Code, 
  Brain, 
  Layers, 
  Globe, 
  Terminal, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  X, 
  ChevronRight, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  MessageSquare
} from 'lucide-react';
import { LanguageCode } from '../utils/i18n';
import { RND_POSTS, RndPost } from '../data/rndPosts';
import { sound } from '../utils/audio';

interface RndLabSectionProps {
  currentLanguage: LanguageCode;
  onOpenWhatsApp?: (presetText?: string) => void;
}

export const RndLabSection: React.FC<RndLabSectionProps> = ({
  currentLanguage,
  onOpenWhatsApp
}) => {
  const isRTL = currentLanguage === 'fa';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePost, setActivePost] = useState<RndPost | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = [
    { id: 'all', label: isRTL ? 'همه نوآوری‌ها' : 'All Innovations', icon: Sparkles },
    { id: 'revit-api', label: isRTL ? 'پلاگین‌های Revit API' : 'Revit API & Plugins', icon: Code },
    { id: 'dynamo', label: isRTL ? 'اتوماسیون داینامو' : 'Dynamo Automation', icon: Cpu },
    { id: 'ai-aec', label: isRTL ? 'هوش مصنوعی و بینایی ماشین' : 'AI & Computer Vision', icon: Brain },
    { id: 'grasshopper', label: isRTL ? 'طراحی پارامتریک' : 'Parametric & Grasshopper', icon: Layers },
    { id: 'webgl', label: isRTL ? 'موتورهای WebGL' : 'WebGL & Digital Twins', icon: Globe }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? RND_POSTS 
    : RND_POSTS.filter(p => p.category === selectedCategory);

  const handleCopyCode = (codeText: string) => {
    sound.playClick();
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleConsultPost = (post: RndPost) => {
    sound.playSwitch();
    const msg = encodeURIComponent(
      `Hello Soheil, I am interested in your R&D project / tool: "${post.title}" (${post.version}). Could we discuss technical details or custom deployment for our studio?`
    );
    if (onOpenWhatsApp) {
      onOpenWhatsApp(msg);
    } else {
      window.open(`https://wa.me/34610855434?text=${msg}`, '_blank');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-semibold">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isRTL ? 'واحد تحقیق و توسعه محاسباتی (Computational R&D Lab)' : 'BIMCO COMPUTATIONAL R&D LAB'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            {isRTL ? (
              <>توسعه ابزارهای اختصاصی، پلاگین‌های <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Revit</span> و الگوریتم‌های هوش مصنوعی</>
            ) : (
              <>Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Revit API Plugins</span>, Dynamo Workflows &amp; AI Algorithms</>
            )}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            {isRTL
              ? 'در استودیو BIMCO علاوه بر پروژه‌های اجرایی، ابزارهای اختصاصی کدنویسی‌شده به زبان‌های C# و Python برای کاهش زمان مدل‌سازی، خوشه‌بندی تداخلات ناویزورکس، بهینه‌سازی فرم‌های پیچیده و بازرسی هوشمند کارگاهی توسعه می‌یابند.'
              : 'Beyond standard production, our practice engineers custom computational tools, C# Revit API add-ins, automated Dynamo packages, and computer vision neural networks to eliminate repetitive coordination bottlenecks.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/60">
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>C# / Revit API .NET 8</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/60">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>Dynamo &amp; Python 3.11</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/60">
              <Brain className="w-3.5 h-3.5 text-emerald-400" />
              <span>PyTorch / YOLOv8 Vision</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/60">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>WebGL / Three.js PBR</span>
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/80'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-500'}`} />
              <span>{cat.label}</span>
              {cat.id === 'all' && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {RND_POSTS.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map(post => {
          return (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-gray-200/90 hover:border-blue-400/80 p-6 space-y-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Meta Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-mono text-[11px] font-bold border border-blue-200/70">
                    <Terminal className="w-3 h-3 text-blue-600" />
                    <span>{isRTL ? post.categoryLabelFa : post.categoryLabel}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      post.status === 'Production'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : post.status === 'Open Source'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}>
                      {isRTL ? post.statusFa : post.status}
                    </span>
                    <span className="text-[11px] font-mono text-gray-500 font-semibold">{post.version}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-black text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
                  {isRTL ? post.titleFa : post.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {isRTL ? post.summaryFa : post.summary}
                </p>

                {/* Performance Metrics Badges */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                  {post.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-xs sm:text-sm font-black text-blue-600">{m.value}</div>
                      <div className="text-[10px] text-gray-600 truncate font-medium">
                        {isRTL ? m.labelFa : m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {post.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[10px] font-mono font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    setActivePost(post);
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                >
                  <span>{isRTL ? 'مشاهده معماری فنی و کد' : 'Inspect Specs & Code'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </button>

                <button
                  onClick={() => handleConsultPost(post)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-blue-600 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>{isRTL ? 'استعلام / همکاری' : 'Collaborate / Request'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* R&D Idea Collaboration Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-cyan-300 font-mono">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>{isRTL ? 'ایده پژوهشی یا نیاز به ابزار اختصاصی دارید؟' : 'HAVE A CUSTOM BIM TOOL OR RESEARCH IDEA?'}</span>
          </div>
          <p className="text-xs text-blue-100 max-w-xl">
            {isRTL
              ? 'اگر دفتر معماری شما نیازمند توسعه یک پلاگین سفارشی برای رویت، خودکارسازی محاسبات با داینامو یا پیاده‌سازی هوش مصنوعی است، مشتاق گفتگوی فنی و توسعه مشترک هستیم.'
              : 'If your architectural practice requires custom Revit API add-ins, automated Dynamo scripts, or AI-assisted quality control, we collaborate on custom development.'}
          </p>
        </div>

        <button
          onClick={() => {
            sound.playSwitch();
            const msg = encodeURIComponent(
              'Hello Soheil, I would like to discuss a custom BIM plugin or computational R&D development with BIMCO.'
            );
            if (onOpenWhatsApp) onOpenWhatsApp(msg);
            else window.open(`https://wa.me/34610855434?text=${msg}`, '_blank');
          }}
          className="px-5 py-2.5 rounded-xl bg-white text-blue-900 hover:bg-cyan-100 text-xs font-black transition-all shrink-0 cursor-pointer shadow-md flex items-center gap-2"
        >
          <span>{isRTL ? 'گفتگوی فنی درباره توسعه ابزار' : 'Discuss Custom Development'}</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Deep-Dive Technical Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl relative p-6 sm:p-8 space-y-6"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-mono font-bold">
                    {isRTL ? activePost.categoryLabelFa : activePost.categoryLabel}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-mono font-bold">
                    {isRTL ? activePost.statusFa : activePost.status}
                  </span>
                  <span className="text-xs font-mono text-gray-500 font-semibold">{activePost.version}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  {isRTL ? activePost.titleFa : activePost.title}
                </h2>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setActivePost(null);
                }}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-3 gap-3 bg-slate-900 text-white p-4 rounded-2xl">
              {activePost.metrics.map((m, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-base sm:text-xl font-black text-cyan-400">{m.value}</div>
                  <div className="text-[11px] text-slate-300 font-medium">{isRTL ? m.labelFa : m.label}</div>
                </div>
              ))}
            </div>

            {/* Problem & Solution Narrative */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-black uppercase text-amber-900 tracking-wider">
                  {isRTL ? '⚠️ چالش و مسئله اصلی' : '⚠️ Architectural Challenge'}
                </h4>
                <p className="text-xs text-amber-950 leading-relaxed">
                  {isRTL ? activePost.challengeFa : activePost.challenge}
                </p>
              </div>

              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-black uppercase text-emerald-900 tracking-wider">
                  {isRTL ? '💡 راه‌حل الگوریتمی و نوآوری' : '💡 Algorithmic Solution'}
                </h4>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  {isRTL ? activePost.solutionFa : activePost.solution}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 font-mono">
                {isRTL ? 'ویژگی‌های کلیدی و مزایای فنی' : 'Key Technical Capabilities'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(isRTL ? activePost.keyFeaturesFa : activePost.keyFeatures).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-200/60">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippet if present */}
            {activePost.codeSnippet && (
              <div className="space-y-2" dir="ltr">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono bg-slate-950 px-4 py-2 rounded-t-xl border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-slate-200 font-bold">{activePost.codeSnippet.filename}</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(activePost.codeSnippet!.code)}
                    className="flex items-center gap-1.5 text-[11px] text-cyan-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-200 p-4 rounded-b-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                  <code>{activePost.codeSnippet.code}</code>
                </pre>
              </div>
            )}

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-gray-500 font-mono">
                {isRTL ? 'توسعه‌داده‌شده توسط سهیل مستی' : 'Lead Developer: Soheil Masti'}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActivePost(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  {isRTL ? 'بستن' : 'Close'}
                </button>
                <button
                  onClick={() => handleConsultPost(activePost)}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isRTL ? 'درخواست استقرار یا سفارش مشابه' : 'Request Custom Deployment'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
