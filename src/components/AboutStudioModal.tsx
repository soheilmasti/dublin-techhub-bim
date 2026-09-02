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

interface AboutStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutStudioModal: React.FC<AboutStudioModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/90 my-auto text-right p-6 sm:p-8"
        >
          <button
            onClick={onClose}
            className="absolute top-6 left-6 p-2 rounded-xl text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                آتلیه معماری و شهرسازی معاصر
              </h3>
              <p className="text-xs font-mono text-gray-500">
                ATELIER MEMARI // EST. 2018
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed bg-gray-50/80 p-5 rounded-2xl border border-gray-100">
            <p>
              ما بر این باوریم که معماری، هنر سازمان‌دهی فضا، نور و ماده در خالص‌ترین شکل ممکن است. این وب‌سایت به عنوان یک کالبد شهری مینیمال طراحی شده تا بیننده را به سفری تعاملی در میان تجربیات فضایی مختلف، از ویلاهای حومه‌ای تا برج‌های شهری، دعوت کند.
            </p>
            <p>
              رویکرد ما در طراحی مبتنی بر سادگی رادیکال، توجه عمیق به بستر اقلیمی و پایداری و ایجاد پیوند میان انسان و محیط ساخته شده است.
            </p>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-100 bg-white">
              <Mail className="w-4 h-4 text-blue-600 shrink-0" />
              <div className="text-xs">
                <span className="text-gray-400 block text-[10px]">ایمیل ارتباطی</span>
                <span className="font-mono font-semibold text-gray-800">contact@atelier-memari.com</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-100 bg-white">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <span className="text-gray-400 block text-[10px]">شماره تماس دفتر</span>
                <span className="font-mono font-semibold text-gray-800 dir-ltr text-right">+98 21 8899 0000</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-100 bg-white sm:col-span-2">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <div className="text-xs">
                <span className="text-gray-400 block text-[10px]">آدرس دفتر طراحی</span>
                <span className="font-semibold text-gray-800">تهران، خیابان فرشته، پلاک ۱۲، طبقه ۴، استودیو معماری</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-2xl bg-black text-white text-xs font-bold hover:bg-gray-800 transition-colors"
            >
              بستن
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
