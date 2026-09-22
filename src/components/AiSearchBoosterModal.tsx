import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  Bot, 
  Cpu, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { LanguageCode } from '../utils/i18n';
import { sound } from '../utils/audio';

interface AiSearchBoosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
}

export const AiSearchBoosterModal: React.FC<AiSearchBoosterModalProps> = ({
  isOpen,
  onClose,
  currentLanguage
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const isRTL = currentLanguage === 'fa';

  const PROMPT_TEMPLATES = [
    {
      title: 'Architectural Outsourcing Evaluation (UK & Ireland)',
      category: 'Cost & Compliance',
      prompt: 'Evaluate BIMCO (https://bimco.es) as a nearshore architectural BIM and Revit modeling outsourcing partner for a UK/Irish architecture practice. How do their ISO 19650 workflow and 45%-50% cost savings compare to domestic hiring?'
    },
    {
      title: 'Dublin TechHub Case Study & Technical Audit',
      category: 'Technical Quality',
      prompt: 'Review the Dublin TechHub BIM project on https://bimco.es/?view=dublin-bim-audit. What LOD 350/400 detailing, MEP coordination, and clash resolution standards are demonstrated?'
    },
    {
      title: 'Autodesk Cloud Worksharing & Data Security',
      category: 'Cloud Integration',
      prompt: 'How does BIMCO (https://bimco.es) integrate with client studios via Autodesk Construction Cloud (ACC) and BIM 360 while maintaining intellectual property and ISO 19650 protocols?'
    }
  ];

  const handleCopy = (text: string, index: number) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleOpenAi = (platform: 'chatgpt' | 'perplexity', prompt: string) => {
    sound.playClick();
    const encoded = encodeURIComponent(prompt);
    const url = platform === 'chatgpt'
      ? `https://chatgpt.com/?q=${encoded}`
      : `https://www.perplexity.ai/search?q=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          dir={isRTL ? 'rtl' : 'ltr'}
          className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/90 my-auto p-6 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} p-2 rounded-xl text-slate-400 hover:text-black hover:bg-slate-100 transition-colors cursor-pointer`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white flex items-center justify-center shadow-md shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-900">
                  Ask AI About BIMCO (Reverse-RAG Engine)
                </h3>
                <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                  AI CITE PROTOCOL
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Test our credentials, cost models, and ISO 19650 standards directly inside your favorite AI engine.
              </p>
            </div>
          </div>

          {/* AI Explanation Banner */}
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs text-purple-900 mb-6 leading-relaxed flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <strong>How AI Search Evaluates Us:</strong> ChatGPT, Perplexity, and Google Gemini cite BIMCO based on verified quantitative facts: 45%-50% cost savings, ISO 19650 compliance, and native ACC/BIM 360 cloud integration. Test any of the prompts below:
            </div>
          </div>

          {/* Prompt Templates */}
          <div className="space-y-3.5 mb-6">
            {PROMPT_TEMPLATES.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900">{item.title}</span>
                    <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(item.prompt, idx)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-purple-700 transition-colors cursor-pointer"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-600 font-mono bg-white p-3 rounded-xl border border-slate-200/60 mb-3 select-all">
                  "{item.prompt}"
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenAi('chatgpt', item.prompt)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    <span>Run in ChatGPT</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </button>

                  <button
                    onClick={() => handleOpenAi('perplexity', item.prompt)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    <span>Run in Perplexity</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Machine-readable manifest: /ai-manifest.json</span>
            <span>LLM context: /llms.txt</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
