import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Send,
  Building2,
  Clock
} from 'lucide-react';
import { LanguageCode } from '../utils/i18n';
import { sound } from '../utils/audio';

interface ContactWhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
  initialMessage?: string;
}

export const ContactWhatsAppModal: React.FC<ContactWhatsAppModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  initialMessage
}) => {
  const [customMessage, setCustomMessage] = useState(initialMessage || '');

  if (!isOpen) return null;

  const isRTL = currentLanguage === 'fa';
  const whatsappNumber = '34610855434';

  const QUICK_TEMPLATES = [
    {
      title: 'Request 1-Week Free Pilot Project',
      desc: 'Test our Revit modeling speed and accuracy on a sample level or family set.',
      text: 'Hello Soheil, I am an architect/director at [Our Studio]. We would like to test your nearshore BIM services with a 1-week risk-free pilot project.'
    },
    {
      title: 'Get Quote for Planning / Construction Package',
      desc: 'Send project brief or drawings for transparent fixed-price estimate.',
      text: 'Hello Soheil, we have an upcoming architectural project in [City/Country] and would like a quote for full Revit modeling (LOD 300/350) and drawing sheets.'
    },
    {
      title: 'Inquire About Dedicated Nearshore Modeler (FTE)',
      desc: 'Embed full-time or fractional senior Revit modelers in your ACC / BIM 360 team.',
      text: 'Hello Soheil, our practice is interested in hiring a dedicated nearshore Revit technician to integrate into our Autodesk Construction Cloud workflow.'
    }
  ];

  const handleSend = (text: string) => {
    sound.playClick();
    const encoded = encodeURIComponent(text.trim());
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank');
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

          {/* Modal Header */}
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-900">
                  Direct WhatsApp &amp; Studio Inquiries
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Online</span>
              </div>
              <p className="text-xs text-slate-500">
                Direct channel to Lead BIM Architect (Soheil Masti) // Barcelona Hub
              </p>
            </div>
          </div>

          {/* Architect Bio & Credential Bar */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-6 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                SM
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Soheil Masti</span>
                <span className="text-[11px] text-slate-500">Senior Architect &amp; Lead BIM Specialist</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-600 font-medium text-[11px]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-blue-600" /> Barcelona, Spain
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600" /> GMT / CET Hours
              </span>
            </div>
          </div>

          {/* Quick Pre-filled Action Cards */}
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              Select an Inquiry Template (Opens WhatsApp Instantly):
            </span>
            <div className="space-y-2.5">
              {QUICK_TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(tmpl.text)}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="pr-3">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-800 block">
                      {tmpl.title}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      {tmpl.desc}
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message Input */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Or Send a Custom Message via WhatsApp:
            </span>
            <div className="flex gap-2">
              <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Type your project questions or requirements..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
              <button
                onClick={() => handleSend(customMessage || 'Hello Soheil, I would like to inquire about your architectural BIM services.')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <span>Send</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Secondary Contact Channels */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <a 
                href="mailto:soheil.masti@gmail.com" 
                className="hover:text-blue-600 flex items-center gap-1.5 font-medium transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                <span>soheil.masti@gmail.com</span>
              </a>
              <span className="flex items-center gap-1.5 font-mono">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                <span>+34 610 855 434</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Standard NDA &amp; ISO 19650 Protocols</span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
