import { localizeText } from '../utils/localizeText';
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
  onOpenKnowledgeHub?: () => void;
}

export const LightweightIntroDemo: React.FC<LightweightIntroDemoProps> = ({
  currentLanguage,
  onEnter3D,
  onNavigateToView,
  onOpenWhatsApp,
  onOpenKnowledgeHub
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
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Top Minimal Studio Metadata Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900 tracking-wider">BIMCO</span>
            <span>//</span>
            <span>{localizeText("ARCHITECTURAL PRACTICE & BIM DELIVERY", currentLanguage)}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="hidden sm:inline text-neutral-600 font-sans">{localizeText("3D Engine Ready", currentLanguage)}</span>
          </div>
        </div>

        {/* Big Typographic Architectural Hero */}
        <div className="pt-4 text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-5xl sm:text-7xl font-black text-neutral-950 tracking-tighter uppercase font-sans">
            BIMCO
          </h1>
          
          <p className="text-base sm:text-xl font-medium text-neutral-700 tracking-tight">
            {localizeText("Contemporary Architecture & Strategic BIM Practice", currentLanguage)}
          </p>

          <p className="text-xs sm:text-sm text-neutral-500 font-mono max-w-xl mx-auto leading-relaxed">
            {localizeText("Precision Revit Modeling • Multi-Discipline Clash Elimination • ISO 19650 CDE Workflow", currentLanguage)}
          </p>

          {/* Central Enter 3D Canvas CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <button
              onClick={handleLaunch3D}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer group"
            >
              <Box className="w-4 h-4 text-neutral-400 group-hover:rotate-12 transition-transform" />
              <span>{localizeText("Enter Interactive 3D Canvas", currentLanguage)}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Enterprise Trust & Verification Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-neutral-200/70 text-center">
            <p className="text-[10px] font-mono font-bold text-blue-600 uppercase">{localizeText("ISO 19650-1/2", currentLanguage)}</p>
            <p className="text-xs font-semibold text-neutral-800 mt-0.5">{localizeText("Full CDE Compliance", currentLanguage)}</p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-neutral-200/70 text-center">
            <p className="text-[10px] font-mono font-bold text-indigo-600 uppercase">{localizeText("ACC / BIM 360", currentLanguage)}</p>
            <p className="text-xs font-semibold text-neutral-800 mt-0.5">{localizeText("Live Cloud Worksharing", currentLanguage)}</p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-neutral-200/70 text-center">
            <p className="text-[10px] font-mono font-bold text-emerald-600 uppercase">{localizeText("100% IP & NDA", currentLanguage)}</p>
            <p className="text-xs font-semibold text-neutral-800 mt-0.5">{localizeText("Guaranteed Copyright", currentLanguage)}</p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-neutral-200/70 text-center">
            <p className="text-[10px] font-mono font-bold text-amber-600 uppercase">{localizeText("48-72h SLA", currentLanguage)}</p>
            <p className="text-xs font-semibold text-neutral-800 mt-0.5">{localizeText("Rapid Floor Delivery", currentLanguage)}</p>
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
                {localizeText("01 // 3D", currentLanguage)}</div>
              <h3 className="font-bold text-sm text-neutral-900">
                {localizeText("Interactive Maquette", currentLanguage)}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {localizeText("360° orbit, real-time lighting & interactive zone inspection.", currentLanguage)}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-neutral-900">
              <span>{localizeText("Launch 3D", currentLanguage)}</span>
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
                {localizeText("02 // ARCHIVE", currentLanguage)}</div>
              <h3 className="font-bold text-sm text-neutral-900">
                {localizeText("Works Archive (19)", currentLanguage)}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {localizeText("Curated collection of architectural and technical drawings.", currentLanguage)}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-neutral-900">
              <span>{localizeText("Browse Works", currentLanguage)}</span>
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
                {localizeText("03 // DELIVERY", currentLanguage)}</div>
              <h3 className="font-bold text-sm text-neutral-900">
                {localizeText("Strategic BIM Delivery", currentLanguage)}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {localizeText("Cloud CDE workflow, ISO 19650 and up to 50% net studio savings.", currentLanguage)}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-neutral-900">
              <span>{localizeText("Explore Model", currentLanguage)}</span>
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
                {localizeText("04 // TRACKER", currentLanguage)}</div>
              <h3 className="font-bold text-sm text-neutral-900">
                {localizeText("Client Live Tracker", currentLanguage)}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {localizeText("Milestone progress, clash resolution reports & cloud CDE sync.", currentLanguage)}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-neutral-900">
              <span>{localizeText("Track Order", currentLanguage)}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </div>

        {/* 2 Interactive High-Trust Panels: Team & Knowledge Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Panel 1: Team & Talent Network Banner */}
          <div 
            onClick={() => { sound.playClick(); onNavigateToView('partners'); }}
            className="bg-white p-5 rounded-2xl border border-neutral-200/80 hover:border-neutral-900 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-900 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                  <span>{localizeText("BIMCO Team & Talent Network", currentLanguage)}</span>
                  <span className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full font-mono font-bold">
                    {localizeText("Team", currentLanguage)}
                  </span>
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  {localizeText("Meet Soheil Masti (Lead Coordinator & AI Architecture) and join our specialist delivery network.", currentLanguage)}
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-neutral-900">
              <span>{localizeText("Meet Team & Partners", currentLanguage)}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </div>
          </div>

          {/* Panel 2: Google Authority Knowledge & FAQ Hub */}
          <div 
            onClick={() => { 
              sound.playClick(); 
              if (onOpenKnowledgeHub) onOpenKnowledgeHub(); 
            }}
            className="bg-gradient-to-br from-white to-amber-50/50 p-5 rounded-2xl border border-amber-200/80 hover:border-amber-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                  <span>{localizeText("BIM Knowledge & FAQ Hub", currentLanguage)}</span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-mono font-bold">
                    {localizeText("12 Q&A", currentLanguage)}</span>
                </h4>
                <p className="text-xs text-neutral-600 mt-1">
                  {localizeText("Direct answers on UK/EU rates, turnaround times, ISO 19650 CDE and bilateral NDAs.", currentLanguage)}
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-amber-900">
              <span>{localizeText("Browse All 12 Answers", currentLanguage)}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </div>
          </div>

        </div>

        {/* Minimalist Footer Bar */}
        <div className="pt-4 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            <span>{localizeText("BIMCO ARCHITECTURAL STUDIO // BARCELONA", currentLanguage)}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenWhatsApp('Hello Soheil, I am contacting you regarding BIMCO services...')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-sans font-bold transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{localizeText("WhatsApp: +34 610 855 434", currentLanguage)}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
