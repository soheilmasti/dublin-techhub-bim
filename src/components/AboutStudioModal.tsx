import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Compass, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Globe,
  Sparkles
} from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/i18n';

interface AboutStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage?: LanguageCode;
}

export const AboutStudioModal: React.FC<AboutStudioModalProps> = ({
  isOpen,
  onClose,
  currentLanguage = 'fa'
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.fa;
  const isRTL = currentLanguage === 'fa';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          dir={isRTL ? 'rtl' : 'ltr'}
          className={`relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/90 my-auto ${isRTL ? 'text-right' : 'text-left'} p-6 sm:p-8`}
        >
          <button
            onClick={onClose}
            className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} p-2 rounded-xl text-gray-400 hover:text-black hover:bg-gray-100 transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {t.aboutStudio.title}
              </h3>
              <p className="text-xs font-mono text-gray-500">
                {t.aboutStudio.tagline}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed bg-gray-50/80 p-5 rounded-2xl border border-gray-100">
            <p>
              {t.aboutStudio.p1}
            </p>
            <p>
              {t.aboutStudio.p2}
            </p>
          </div>

          {/* Studio Principals Showcase */}
          <div className="mt-5 space-y-3">
            <h4 className="text-xs font-bold text-gray-900 font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{isRTL ? 'معماران ارشد و موسسین استودیو' : 'Studio Principals & Partners'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Soheil Masti */}
              <div className="p-3.5 rounded-2xl border border-gray-100 bg-gray-50/60 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-blue-200 shrink-0 bg-white">
                  <img src="/team/soheil-masti.png" alt="Soheil Masti" className="w-full h-full object-cover object-top" />
                </div>
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-gray-900">{isRTL ? 'سهیل مستی' : 'Soheil Masti'}</h5>
                  <p className="text-[10px] font-mono text-blue-600 font-bold">{isRTL ? 'مدیر سیستم‌های BIM و هوش مصنوعی' : 'BIM Director & AI Strategist'}</p>
                  <p className="text-[10px] text-gray-500 font-mono truncate">soheil.masti@gmail.com</p>
                </div>
              </div>

              {/* Siavash Pazooki */}
              <div className="p-3.5 rounded-2xl border border-gray-100 bg-gray-50/60 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-indigo-200 shrink-0 bg-white">
                  <img src="/team/siavash-pazooki.jpg" alt="Siavash Pazooki" className="w-full h-full object-cover object-top" />
                </div>
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-gray-900">{isRTL ? 'سیاوش پازوکی' : 'Siavash Pazooki'}</h5>
                  <p className="text-[10px] font-mono text-indigo-600 font-bold">{isRTL ? 'طراح ارشد کانسپت و سوپروایزر CGI' : 'Senior Designer & CGI Lead'}</p>
                  <p className="text-[10px] text-gray-500 font-mono truncate">siavashpazookiart@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-100 bg-white">
              <Mail className="w-4 h-4 text-blue-600 shrink-0" />
              <div className="text-xs">
                <span className="text-gray-400 block text-[10px]">{t.aboutStudio.emailLabel}</span>
                <span className="font-mono font-semibold text-gray-800">info@bimco.es</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-100 bg-white">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <span className="text-gray-400 block text-[10px]">{t.aboutStudio.phoneLabel}</span>
                <span className="font-mono font-semibold text-gray-800 dir-ltr text-right">+34 610 855 434</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-100 bg-white sm:col-span-2">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <div className="text-xs">
                <span className="text-gray-400 block text-[10px]">{t.aboutStudio.addressLabel}</span>
                <span className="font-semibold text-gray-800">Barcelona, Spain (Sant Cugat del Vallès) &amp; International Delivery</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-2xl bg-black text-white text-xs font-bold hover:bg-gray-800 transition-colors"
            >
              {t.aboutStudio.close}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
