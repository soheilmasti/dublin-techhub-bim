import { localizeText } from '../utils/localizeText';
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
  UserCheck,
  Code,
  Brain,
  FileText,
  Mail,
  Instagram,
  Eye,
  X
} from 'lucide-react';
import { LanguageCode } from '../utils/i18n';
import { PartnerApplication } from '../types';
import { sound } from '../utils/audio';
import { RndLabSection } from './RndLabSection';
import { RND_POSTS } from '../data/rndPosts';
import { STUDIO_PRINCIPALS } from '../data/initialData';

interface PartnersNetworkViewProps {
  currentLanguage: LanguageCode;
  onBackToHome: () => void;
  onOpenWhatsApp?: (presetText?: string) => void;
  initialTab?: 'talent' | 'rnd';
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
  onOpenWhatsApp,
  initialTab
}) => {
  const isRTL = currentLanguage === 'fa';
  const [activeTab, setActiveTab] = useState<'talent' | 'rnd'>(initialTab || 'talent');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

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
  const [selectedCvSheet, setSelectedCvSheet] = useState<string | null>(null);

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
      q: localizeText("How are projects assigned and coordinated?", currentLanguage),
      a: localizeText("Projects are executed under strict ISO 19650 standards via cloud common data environments (Autodesk Construction Cloud / ACC). Scope of work, milestone deliverables, and model health checklists are defined upfront.", currentLanguage)
    },
    {
      q: localizeText("How are payments processed?", currentLanguage),
      a: localizeText("Compensation is milestone-based or hourly in EUR (€), GBP (£), or USD ($) via international bank transfer, Wise, or PayPal immediately upon quality QA approval.", currentLanguage)
    },
    {
      q: localizeText("If I am currently busy, should I still register?", currentLanguage),
      a: localizeText("Yes, absolutely! By submitting your profile, you are entered into our primary talent database. When project surges or specialized requirements matching your discipline arise, you will be contacted directly.", currentLanguage)
    },
    {
      q: localizeText("Which disciplines and software are in highest demand?", currentLanguage),
      a: localizeText("Revit architectural production (LOD 300–400), MEP spatial coordination, Navisworks clash resolution, and Grasshopper parametric scripting have consistent project demand.", currentLanguage)
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
              {localizeText("Partner & Talent Network", currentLanguage)}
            </span>
            <span className="hidden sm:inline">/</span>
            <span className="hidden sm:inline text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {localizeText("Open Collaboration & Remote Delivery", currentLanguage)}
            </span>
          </div>

          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white text-gray-700 hover:text-black hover:bg-gray-100 shadow-sm border border-gray-200 text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            <span>{localizeText("Return to Portfolio", currentLanguage)}</span>
          </button>
        </div>

        {/* Sub-Navigation Switcher: Talent Network vs Computational R&D */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl bg-white border border-gray-200/90 shadow-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('talent');
                const url = new URL(window.location.href);
                url.searchParams.delete('tab');
                window.history.replaceState({}, '', url.toString());
              }}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'talent'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{localizeText("Talent & Partner Network", currentLanguage)}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('rnd');
                const url = new URL(window.location.href);
                url.searchParams.set('tab', 'rnd');
                window.history.replaceState({}, '', url.toString());
              }}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'rnd'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <Code className={`w-4 h-4 ${activeTab === 'rnd' ? 'text-white' : 'text-blue-600'}`} />
              <span>{localizeText("Computational R&D & Plugins", currentLanguage)}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                activeTab === 'rnd' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700'
              }`}>
                {RND_POSTS.length} {localizeText("Labs", currentLanguage)}</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-500 pr-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{localizeText("Active 2026 Pipeline & Tools", currentLanguage)}</span>
          </div>
        </div>

        {activeTab === 'talent' ? (
          <>
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-mono font-bold">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>{localizeText("GLOBAL ARCHITECTURAL & BIM NETWORK", currentLanguage)}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {isRTL ? (
                <>به شبکه همکاران و متخصصین <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">{localizeText("BIM و معماری", currentLanguage)}</span> بپیوندید</>
              ) : (
                <>{localizeText("Join Our", currentLanguage)}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">{localizeText("Architectural & BIM", currentLanguage)}</span> {localizeText("Partner Network", currentLanguage)}</>
              )}
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal max-w-2xl">
              {localizeText("We collaborate with talented architects, BIM coordinators, MEP specialists, computational designers, and 3D visualizers for international project deliveries across the UK, Ireland, and Europe. Register your profile to be contacted for immediate project engagements or future pipeline opportunities.", currentLanguage)}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{localizeText("ISO 19650 Standards", currentLanguage)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>{localizeText("Milestone Payments (€ / £ / $)", currentLanguage)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>{localizeText("100% Remote / Nearshore", currentLanguage)}</span>
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
              {localizeText("Prestige Global Projects", currentLanguage)}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {localizeText("Work on verified commercial, residential, and institutional projects adhering to modern European LOD 350–400 standards.", currentLanguage)}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-2 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">
              {localizeText("Fair & Guaranteed Pay", currentLanguage)}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {localizeText("Clear milestone or hourly compensation in EUR, GBP, or USD with transparent agreements upon deliverable approval.", currentLanguage)}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-2 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">
              {localizeText("Flexible Remote Workflow", currentLanguage)}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {localizeText("Work remotely from anywhere via cloud CDEs (ACC, BIM 360) on project-based, part-time, or full-time schedules.", currentLanguage)}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-2 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">
              {localizeText("Continuous Pipeline", currentLanguage)}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {localizeText("Even when fully booked, your profile remains in our primary talent pool for direct outreach during high-volume tenders.", currentLanguage)}
            </p>
          </div>
        </div>

        {/* Core Leadership & Specialist Network Showcase */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-gray-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>{localizeText("LEADERSHIP & CORE SPECIALISTS", currentLanguage)}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {localizeText("Core Leadership & Specialist Practice", currentLanguage)}
              </h2>
            </div>
            <p className="text-xs text-gray-500 font-mono sm:text-right max-w-sm">
              {localizeText("Combining architectural design rigor, engineering automation programming & AI organizational strategy.", currentLanguage)}
            </p>
          </div>

          {/* Core Leadership & Principals (Soheil Masti & Siavash Pazooki) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Principal 1: Soheil Masti */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 flex flex-col justify-between space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-blue-400/40 shadow-lg shrink-0 bg-slate-800">
                      <img 
                        src="/team/soheil-masti.png" 
                        alt={localizeText("Soheil Masti", currentLanguage)} 
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                        <span>{localizeText("Soheil Masti", currentLanguage)}</span>
                      </h3>
                      <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 font-bold mt-0.5">
                        {localizeText("LEAD BIM COORDINATOR & FOUNDER", currentLanguage)}
                      </span>
                      <p className="text-xs text-blue-200/80 font-mono mt-1">
                        {localizeText("Senior Architect, Founder & BIM/AI Systems Strategist", currentLanguage)}
                      </p>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{localizeText("Barcelona &amp; Global Delivery", currentLanguage)}</span>
                  </div>
                </div>

                {/* 3 Core Strengths */}
                <div className="space-y-2.5 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1">
                    <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{localizeText("Advanced BIM Coordination (LOD 350-400)", currentLanguage)}</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      {localizeText("Full execution BIM packages, complex parametric Revit family libraries, and multi-service clash matrices.", currentLanguage)}
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1">
                    <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{localizeText("Engineering Automation & Scripting", currentLanguage)}</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      {localizeText("Custom Python, C#, and Dynamo scripting for engineering process management, clash QA, and model automation.", currentLanguage)}
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1">
                    <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{localizeText("AI Systems & Organizational Strategy", currentLanguage)}</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      {localizeText("Mastery of AI algorithmic pipelines, Reverse-RAG, and restructuring architectural practice workflows.", currentLanguage)}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {[
                    'Revit Architecture (LOD 400)',
                    'Navisworks Clash QA',
                    'Python & Dynamo Scripting',
                    'Rhino / Grasshopper',
                    'ISO 19650 CDE Lead'
                  ].map((skill, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white/10 text-gray-200 border border-white/10">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Quick WhatsApp on Card */}
              <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 text-xs font-mono text-gray-400 relative z-10">
                <span className="text-[11px] text-gray-400">{localizeText("WhatsApp: +34 610 855 434", currentLanguage)}</span>
                <button
                  type="button"
                  onClick={() => onOpenWhatsApp?.('Hi Soheil, I would like to consult with you on architectural BIM coordination and engineering automation...')}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>{localizeText("Contact Soheil", currentLanguage)}</span>
                </button>
              </div>
            </div>

            {/* Principal 2: Siavash Pazooki */}
            <div className="bg-gradient-to-br from-slate-900 via-neutral-950 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 flex flex-col justify-between space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-indigo-400/40 shadow-lg shrink-0 bg-slate-800">
                      <img 
                        src="/team/siavash-pazooki.jpg" 
                        alt={localizeText("Siavash Pazooki", currentLanguage)} 
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                        <span>{localizeText("Siavash Pazooki", currentLanguage)}</span>
                      </h3>
                      <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-bold mt-0.5">
                        {localizeText("SENIOR DESIGNER & CGI LEAD", currentLanguage)}
                      </span>
                      <p className="text-xs text-indigo-200/80 font-mono mt-1">
                        {localizeText("Senior Architectural Designer, M.Sc. Urban Design & CGI Visualizer", currentLanguage)}
                      </p>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span>{localizeText("M.Sc. Urban Design", currentLanguage)}</span>
                  </div>
                </div>

                {/* 3 Core Strengths */}
                <div className="space-y-2.5 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1">
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{localizeText("Concept Ideation & Spatial Harmony", currentLanguage)}</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      {localizeText("Transforming complex client briefs into elegant, functionally resolved, and contextually grounded architectural forms.", currentLanguage)}
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1">
                    <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{localizeText("High-End Photorealistic 3D CGI", currentLanguage)}</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      {localizeText("Industry-leading mastery of architectural lighting, materials, ForestPack landscaping, and cinematic presentations.", currentLanguage)}
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1">
                    <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{localizeText("Luxury Millwork & On-Site Detailing", currentLanguage)}</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      {localizeText("Production-ready millwork detailing, bespoke joinery specifications, and meticulous on-site construction oversight.", currentLanguage)}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {[
                    '3ds Max & V-Ray',
                    'Forest Pack & RailClone',
                    'AutoCAD Technical Detailing',
                    'Rhino 8 & Organic Form',
                    'Photoshop Post-Production',
                    'Revit Architecture'
                  ].map((skill, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white/10 text-gray-200 border border-white/10">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Actions: View CV & Instagram */}
              <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 text-xs font-mono text-gray-400 relative z-10">
                <span className="text-[11px] text-gray-400">{localizeText("siavashpazookiart@gmail.com", currentLanguage)}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => { sound.playClick(); setSelectedCvSheet('/team/siavash-cv-sheet-1.jpg'); }}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                  >
                    <FileText className="w-3 h-3 text-indigo-400" />
                    <span>{localizeText("View CV Sheets", currentLanguage)}</span>
                  </button>
                  <a
                    href="https://instagram.com/Siavash_pzk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/30 transition-colors flex items-center justify-center"
                    title={localizeText("Instagram @Siavash_pzk", currentLanguage)}
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Specialist Practice & Disciplinary Network Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            
            {/* Discipline 1: Architectural Modeler */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-900">{localizeText("Senior Architectural Modeler", currentLanguage)}</span>
                <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold">{localizeText("LOD 350-400", currentLanguage)}</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                {localizeText("High-precision Revit models, complex parametric family libraries, and European tender sets.", currentLanguage)}
              </p>
              <div className="flex flex-wrap gap-1">
                <span className="text-[9px] font-mono bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">Revit</span>
                <span className="text-[9px] font-mono bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">{localizeText("Uniclass 2015", currentLanguage)}</span>
                <span className="text-[9px] font-mono bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">{localizeText("RIBA 3-5", currentLanguage)}</span>
              </div>
            </div>

            {/* Discipline 2: MEP & Clash Specialist */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-900">{localizeText("MEP & Clash Coordinator", currentLanguage)}</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">{localizeText("ZERO CLASH", currentLanguage)}</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                {localizeText("Multi-service spatial coordination, plant room routing, and Navisworks clash matrices.", currentLanguage)}
              </p>
              <div className="flex flex-wrap gap-1">
                <span className="text-[9px] font-mono bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">{localizeText("Navisworks", currentLanguage)}</span>
                <span className="text-[9px] font-mono bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">{localizeText("Solibri", currentLanguage)}</span>
                <span className="text-[9px] font-mono bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">{localizeText("Revit MEP", currentLanguage)}</span>
              </div>
            </div>

            {/* Discipline 3: Computational & Visualizer */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-900">{localizeText("Computational Design & VR", currentLanguage)}</span>
                <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold">{localizeText("REAL-TIME", currentLanguage)}</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                {localizeText("Parametric facade generation in Grasshopper and cinematic real-time tours in Unreal Engine 5.", currentLanguage)}
              </p>
              <div className="flex flex-wrap gap-1">
                <span className="text-[9px] font-mono bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">{localizeText("Grasshopper", currentLanguage)}</span>
                <span className="text-[9px] font-mono bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">{localizeText("Unreal Engine 5", currentLanguage)}</span>
                <span className="text-[9px] font-mono bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">{localizeText("Rhino 8", currentLanguage)}</span>
              </div>
            </div>

          </div>

          {/* Siavash CV Lightbox Modal */}
          {selectedCvSheet && (
            <div 
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
              onClick={() => setSelectedCvSheet(null)}
            >
              <div 
                className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 p-2 sm:p-4"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {localizeText("Siavash Pazooki Official CV & Credentials", currentLanguage)}
                    </span>
                    <div className="flex items-center gap-1.5 ml-3">
                      <button
                        onClick={() => setSelectedCvSheet('/team/siavash-cv-sheet-1.jpg')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                          selectedCvSheet === '/team/siavash-cv-sheet-1.jpg' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-gray-300'
                        }`}
                      >
                        {localizeText("Sheet 01 (Experience &amp; Education)", currentLanguage)}</button>
                      <button
                        onClick={() => setSelectedCvSheet('/team/siavash-cv-sheet-2.jpg')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                          selectedCvSheet === '/team/siavash-cv-sheet-2.jpg' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-gray-300'
                        }`}
                      >
                        {localizeText("Sheet 02 (Summary &amp; Competencies)", currentLanguage)}</button>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCvSheet(null)}
                    className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-2 sm:p-4 flex items-center justify-center max-h-[80vh] overflow-auto">
                  <img 
                    src={selectedCvSheet} 
                    alt={localizeText("Siavash Pazooki CV", currentLanguage)} 
                    className="w-full h-auto object-contain rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Main Content Area: Form & Talent Registry */}
        <div id="partner-registration-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Form Container (7 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-clay-md border border-gray-200/80 space-y-6">
            
            <div className="space-y-1 pb-4 border-b border-gray-100">
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                <span>{localizeText("Partner Registration Form", currentLanguage)}</span>
              </h2>
              <p className="text-xs text-gray-500">
                {localizeText("Complete your details below. You can submit directly via WhatsApp or register into our talent database.", currentLanguage)}
              </p>
            </div>

            {/* Success Banner if submitted */}
            {isSubmitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-emerald-900">
                      {localizeText("Application Successfully Logged in Talent Database!", currentLanguage)}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-mono">
                      {localizeText("Ref ID:", currentLanguage)}<span className="font-bold underline">{submissionId}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={handleCopySummary}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedSummary ? (localizeText("Copied!", currentLanguage)) : (localizeText("Copy Application Summary", currentLanguage))}</span>
                  </button>

                  <a
                    href={`https://wa.me/34610855434?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{localizeText("Fast-Track on WhatsApp", currentLanguage)}</span>
                  </a>
                </div>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSaveToDatabase}>
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                    <span>{localizeText("Full Name", currentLanguage)} *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={localizeText("e.g., Alex Morisson", currentLanguage)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">
                    <span>{localizeText("Email Address", currentLanguage)} *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={localizeText("architect@example.com", currentLanguage)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Row 2: WhatsApp & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                    <span>{localizeText("WhatsApp / Phone Number", currentLanguage)} *</span>
                    <span className="text-[10px] text-gray-400 font-normal">{localizeText("with country code", currentLanguage)}</span>
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
                    <span>{localizeText("Location & Timezone", currentLanguage)} *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder={localizeText("e.g., London, Dublin, Barcelona (GMT/CET)", currentLanguage)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Primary Discipline & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">
                    <span>{localizeText("Primary Discipline", currentLanguage)} *</span>
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
                    <span>{localizeText("Years of Experience", currentLanguage)} *</span>
                  </label>
                  <select
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="1-3 years">{localizeText("1-3 years (Junior / Intermediate)", currentLanguage)}</option>
                    <option value="4-7 years">{localizeText("4-7 years (Mid-Senior Specialist)", currentLanguage)}</option>
                    <option value="8+ years">{localizeText("8+ years (Senior Lead / Coordinator)", currentLanguage)}</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Multi-select Software Stack */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                  <span>{localizeText("Software Stack Proficiency", currentLanguage)} *</span>
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
                    <span>{localizeText("Portfolio / LinkedIn / Drive Link", currentLanguage)} *</span>
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
                    <span>{localizeText("Availability & Collaboration Type", currentLanguage)} *</span>
                  </label>
                  <select
                    value={formData.collaborationType}
                    onChange={(e) => setFormData({ ...formData, collaborationType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="Immediate Project Freelance">{localizeText("Immediate Project Freelance", currentLanguage)}</option>
                    <option value="Part-time (10-20h/week)">{localizeText("Part-time (10-20h/week)", currentLanguage)}</option>
                    <option value="Full-time Remote Contract">{localizeText("Full-time Remote Contract", currentLanguage)}</option>
                    <option value="Future Project Pool">{localizeText("Future Project Pool (Database Only)", currentLanguage)}</option>
                  </select>
                </div>
              </div>

              {/* Row 6: Notes / Self-introduction */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">
                  <span>{localizeText("Brief Introduction / Key Projects (Optional)", currentLanguage)}</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={localizeText("Highlight key project typologies, ISO 19650 familiarity, or availability notes...", currentLanguage)}
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
                  <span>{localizeText("Send Application via WhatsApp", currentLanguage)}</span>
                </button>

                {/* Save to Talent Database */}
                <button
                  type="submit"
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gray-900 hover:bg-black text-white text-xs font-bold shadow-sm hover:shadow-md active:scale-98 transition-all cursor-pointer border border-gray-800"
                >
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span>{localizeText("Save in Studio Talent Registry", currentLanguage)}</span>
                </button>
              </div>

              <p className="text-[11px] text-gray-400 text-center font-mono">
                🔒 {localizeText("Your portfolio and personal information are strictly confidential and protected.", currentLanguage)}
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
                    {localizeText("Quick Chat with Studio Lead", currentLanguage)}
                  </h4>
                  <p className="text-[11px] text-emerald-800 font-mono">{localizeText("WhatsApp: +34 610 855 434", currentLanguage)}</p>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {localizeText("Prefer to skip the form and share your PDF resume or Behance link directly on WhatsApp?", currentLanguage)}
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
                <span>{localizeText("Open WhatsApp Chat", currentLanguage)}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* In-Demand Disciplines Checklist */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-4">
              <h4 className="text-xs font-bold text-gray-900 font-mono tracking-wider uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>{localizeText("CURRENT HIGH-PRIORITY ROLES", currentLanguage)}</span>
              </h4>

              <ul className="space-y-2.5 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <div>
                    <span className="font-bold text-gray-900">{localizeText("Senior Revit Modelers", currentLanguage)}</span>
                    <p className="text-[11px] text-gray-500">{localizeText("LOD 300–350 Commercial & High-End Residential", currentLanguage)}</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                  <div>
                    <span className="font-bold text-gray-900">{localizeText("BIM Clash Coordinators", currentLanguage)}</span>
                    <p className="text-[11px] text-gray-500">{localizeText("Navisworks Manage & Solibri Clash Matrix", currentLanguage)}</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                  <div>
                    <span className="font-bold text-gray-900">{localizeText("MEP BIM Specialists", currentLanguage)}</span>
                    <p className="text-[11px] text-gray-500">{localizeText("Spatial plant room & pipework routing", currentLanguage)}</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                  <div>
                    <span className="font-bold text-gray-900">{localizeText("Grasshopper / Dynamo Scripting", currentLanguage)}</span>
                    <p className="text-[11px] text-gray-500">{localizeText("Algorithmic facade generation & data automation", currentLanguage)}</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Cloud & ISO Compliance Badge */}
            <div className="bg-gray-50 rounded-3xl p-5 border border-gray-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-800">
                <FolderGit2 className="w-4 h-4 text-blue-600" />
                <span>{localizeText("Autodesk ACC & CDE Ready", currentLanguage)}</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                {localizeText("All collaboration uses enterprise-grade Common Data Environments with full ISO 19650 naming conventions.", currentLanguage)}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-clay-md space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-gray-900">
              {localizeText("Frequently Asked Questions for Partners", currentLanguage)}
            </h3>
            <p className="text-xs text-gray-500">
              {localizeText("Clear answers regarding workflows, payout cycles, and collaboration mechanics", currentLanguage)}
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
        </>
      ) : (
        <RndLabSection
          currentLanguage={currentLanguage}
          onOpenWhatsApp={onOpenWhatsApp}
        />
      )}

      </div>
    </div>
  );
};
