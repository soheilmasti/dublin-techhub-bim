import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Clock, 
  Cloud, 
  FileText, 
  FileCheck, 
  Activity, 
  ExternalLink,
  MessageCircle, 
  AlertCircle,
  TrendingUp,
  Download,
  Calendar,
  Layers,
  ArrowRight,
  X
} from 'lucide-react';
import { MOCK_ORDERS } from '../data/mockClientOrders';
import { ProjectOrder } from '../types';
import { LanguageCode } from '../utils/i18n';
import { sound } from '../utils/audio';

interface ClientPortalViewProps {
  currentLanguage: LanguageCode;
  onBackToHome: () => void;
  onOpenWhatsApp: (presetText?: string) => void;
}

export const ClientPortalView: React.FC<ClientPortalViewProps> = ({
  currentLanguage,
  onBackToHome,
  onOpenWhatsApp
}) => {
  const [searchCode, setSearchCode] = useState('BIM-IE-2026-08');
  const [selectedOrder, setSelectedOrder] = useState<ProjectOrder>(MOCK_ORDERS[0]);
  const [activeTab, setActiveTab] = useState<'weekly' | 'milestones' | 'cloud'>('weekly');
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (codeToSearch: string) => {
    sound.playClick();
    const cleanCode = codeToSearch.trim().toUpperCase();
    const found = MOCK_ORDERS.find(o => o.orderId.toUpperCase() === cleanCode);
    if (found) {
      setSelectedOrder(found);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  };

  const isRTL = currentLanguage === 'fa';

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-blue-600 selection:text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Header Breadcrumb */}
      <div className="flex items-center justify-between py-4 border-b border-slate-200 mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <button onClick={onBackToHome} className="hover:text-blue-600 cursor-pointer transition-colors">
            BIMCO
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Client Portal &amp; Live Order Tracker</span>
        </div>

        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-black bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs hover:shadow-sm transition-all cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
          <span>Close</span>
        </button>
      </div>

      {/* Hero & Search Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs mb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-4">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Real-Time BIM Project Tracking // ISO 19650 Compliance</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Client Order &amp; Weekly Progress Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
            Track your Revit model deliverables, clash resolution matrices, drawing sheet deliveries, and cloud sync status live.
          </p>

          {/* Search Box */}
          <div className="flex flex-col sm:flex-row items-center gap-2 max-w-xl">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchCode)}
                placeholder="Enter Project Order ID (e.g. BIM-IE-2026-08)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>
            <button
              onClick={() => handleSearch(searchCode)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Track Order
            </button>
          </div>

          {/* Demo Project Quick Selectors */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Test Sample Demos:</span>
            {MOCK_ORDERS.map(o => (
              <button
                key={o.orderId}
                onClick={() => {
                  setSearchCode(o.orderId);
                  handleSearch(o.orderId);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedOrder.orderId === o.orderId
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {o.countryCode === 'IE' ? '🇮🇪' : o.countryCode === 'GB' ? '🇬🇧' : '🇪🇸'} {o.orderId}
              </button>
            ))}
          </div>

          {notFound && (
            <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Project order not found. Try one of the sample project IDs above (e.g. <strong>BIM-IE-2026-08</strong>).</span>
            </div>
          )}
        </div>
      </div>

      {/* Active Project Dashboard */}
      <div className="space-y-8">
        
        {/* Project Card Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                  {selectedOrder.orderId}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  selectedOrder.status === 'Completed' 
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-600 text-white animate-pulse'
                }`}>
                  ● {selectedOrder.status}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedOrder.location}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {selectedOrder.projectTitle}
              </h2>
              <p className="text-xs font-medium text-slate-500 mt-1">
                Client Studio: <span className="text-slate-900 font-bold">{selectedOrder.clientName}</span> | Specification: <span className="font-semibold text-blue-600">{selectedOrder.lodLevel}</span>
              </p>
            </div>

            {/* Overall Progress Gauge */}
            <div className="w-full lg:w-72 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Overall Completion</span>
                <span className="text-blue-600 font-mono text-sm">{selectedOrder.overallProgress}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-700" 
                  style={{ width: `${selectedOrder.overallProgress}%` }}
                />
              </div>
              <span className="block text-[10px] text-slate-400 mt-1.5 font-medium">
                Current Stage: {selectedOrder.currentStage}
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Start Date</span>
              <span className="text-sm font-black text-slate-900 mt-0.5 block">{selectedOrder.startDate}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Target Delivery</span>
              <span className="text-sm font-black text-slate-900 mt-0.5 block">{selectedOrder.targetDelivery}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Cloud Hub</span>
              <span className="text-xs font-bold text-blue-600 mt-0.5 block truncate">{selectedOrder.cloudWorkspace.platform}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Last Sync</span>
              <span className="text-xs font-bold text-emerald-600 mt-0.5 block">{selectedOrder.cloudWorkspace.lastSyncTime}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => { sound.playClick(); setActiveTab('weekly'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'weekly'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-black hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Weekly Progress Reports ({selectedOrder.weeklyReports.length})</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('milestones'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'milestones'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-black hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>RIBA &amp; LOD Milestones ({selectedOrder.milestones.length})</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('cloud'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'cloud'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-black hover:bg-slate-100'
            }`}
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>Autodesk Cloud Worksharing</span>
          </button>
        </div>

        {/* TAB 1: Weekly Progress Reports */}
        {activeTab === 'weekly' && (
          <div className="space-y-6">
            {selectedOrder.weeklyReports.map((report) => (
              <div key={report.weekNumber} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md">
                        WEEK {report.weekNumber} REPORT
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        Period: {report.weekRange}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-slate-900 mt-1">
                      {report.summary}
                    </h3>
                  </div>

                  {/* Audit Badge */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Revit Audit: {report.revitAuditStatus}</span>
                    </span>
                  </div>
                </div>

                {/* Report Key Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Clashes Resolved</span>
                    <span className="text-2xl font-black text-slate-900 mt-1 block">
                      {report.clashesResolved} <span className="text-xs font-normal text-emerald-600">✓ resolved</span>
                    </span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Sheets Produced</span>
                    <span className="text-2xl font-black text-slate-900 mt-1 block">
                      {report.sheetsDelivered} <span className="text-xs font-normal text-slate-500">drawings</span>
                    </span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Model Health Score</span>
                    <span className="text-sm font-bold text-emerald-600 mt-1.5 block">
                      {report.modelHealthScore}
                    </span>
                  </div>
                </div>

                {/* Achievements List */}
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Key Achievements</span>
                  <div className="space-y-1.5">
                    {report.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Week Plan */}
                <div className="pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Next Week Milestones</span>
                  <div className="space-y-1.5">
                    {report.nextWeekPlan.map((plan, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{plan}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenWhatsApp(`Hello Soheil, regarding Week ${report.weekNumber} report for ${selectedOrder.orderId} (${selectedOrder.projectTitle}), I have a question about...`)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Discuss Week {report.weekNumber} Report via WhatsApp</span>
                  </button>

                  <span className="text-[11px] text-slate-400 font-mono">
                    Signed off by Lead BIM Architect (Soheil Masti)
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* TAB 2: RIBA & LOD Milestones */}
        {activeTab === 'milestones' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-black text-slate-900 mb-6">
              Contractual Stage Deliverables (RIBA / LOD Framework)
            </h3>
            
            <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pl-6">
              {selectedOrder.milestones.map((m) => (
                <div key={m.stageNumber} className="relative">
                  {/* Dot Icon */}
                  <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    m.completed 
                      ? 'bg-emerald-500 text-white'
                      : m.current
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                        : 'bg-slate-200 text-slate-500'
                  }`}>
                    {m.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">{m.date}</span>
                      {m.completed && <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Completed</span>}
                      {m.current && <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full animate-pulse">In Progress</span>}
                    </div>
                    <h4 className="text-sm font-black text-slate-900 mt-1">{m.stageName}</h4>
                    <p className="text-xs text-slate-600 mt-1">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Autodesk Cloud Worksharing */}
        {activeTab === 'cloud' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Cloud className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Autodesk Construction Cloud (ACC) &amp; BIM 360 Repository
                </h3>
                <p className="text-xs text-slate-500">
                  Direct live synchronization and ISO 19650 central model worksharing.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Project Hub</span>
                <span className="text-xs font-mono font-bold text-slate-900 mt-1 block truncate">
                  {selectedOrder.cloudWorkspace.hubName}
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Central Model Container</span>
                <span className="text-xs font-mono font-bold text-blue-600 mt-1 block truncate">
                  {selectedOrder.cloudWorkspace.centralModelName}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
              <strong>ISO 19650 Common Data Environment (CDE) Rule:</strong> Model synchronization occurs daily into your designated WIP/Shared folder. All backups, rollback versions, and sync logs are permanently preserved on client cloud servers.
            </div>
          </div>
        )}

        {/* Bottom Action Card */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-black mb-1">
              Have questions regarding {selectedOrder.orderId}?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Direct line to Lead BIM Architect (Soheil Masti) on WhatsApp (+34 610 855 434).
            </p>
          </div>

          <button
            onClick={() => onOpenWhatsApp(`Hello Soheil, I am inquiring about project order ${selectedOrder.orderId} (${selectedOrder.projectTitle})...`)}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Project Lead</span>
          </button>
        </div>

      </div>

    </div>
  );
};
