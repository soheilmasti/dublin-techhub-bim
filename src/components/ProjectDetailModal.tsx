import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  Maximize2, 
  CheckCircle2, 
  FileText, 
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft,
  Cpu,
  UserCheck,
  LayoutGrid,
  ZoomIn,
  Download
} from 'lucide-react';
import { Project } from '../types';
import { sound } from '../utils/audio';
import { LanguageCode, TRANSLATIONS } from '../utils/i18n';
import { getLocalizedStatus } from '../utils/localizedData';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  currentLanguage?: LanguageCode;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  currentLanguage = 'en'
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'individual-grid' | 'spotlight'>('individual-grid');
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const isRTL = currentLanguage === 'fa';
  const currentGallery = project?.gallery && project.gallery.length > 0 ? project.gallery : (project ? [project.coverImage] : []);

  // Keyboard navigation for zoom lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (zoomIndex === null) return;
    if (e.key === 'Escape') {
      setZoomIndex(null);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      sound.playClick();
      setZoomIndex(prev => (prev !== null && prev < currentGallery.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      sound.playClick();
      setZoomIndex(prev => (prev !== null && prev > 0 ? prev - 1 : currentGallery.length - 1));
    }
  }, [zoomIndex, currentGallery.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Touch Swipe for mobile lightbox (iPhone, Android, iPad)
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleLightboxTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || zoomIndex === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - (touchStartY.current || 0);

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      sound.playClick();
      if (diffX < 0) {
        // Swiped left -> next sheet
        setZoomIndex(prev => (prev !== null && prev < currentGallery.length - 1 ? prev + 1 : 0));
      } else {
        // Swiped right -> prev sheet
        setZoomIndex(prev => (prev !== null && prev > 0 ? prev - 1 : currentGallery.length - 1));
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="relative w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/90 my-auto"
        >
          {/* Close & Return Button */}
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-30 px-3.5 py-2 rounded-2xl bg-white/95 hover:bg-black hover:text-white backdrop-blur-md flex items-center gap-2 text-gray-900 font-bold text-xs shadow-lg transition-all duration-200 border border-gray-200 hover:scale-105 active:scale-95 cursor-pointer`}
            title={t.close}
          >
            <X className="w-4 h-4" />
            <span>{t.close}</span>
          </button>

          {/* Grid Layout: Visual Media & Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
            {/* Left Media Viewer (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950 flex flex-col justify-between relative min-h-[400px] lg:min-h-[640px]">
              
              {/* Media Controls Header */}
              <div className={`p-4 z-20 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-slate-900/80 backdrop-blur-md`}>
                <div className="flex items-center gap-1.5 glass-panel-dark p-1 rounded-2xl">
                  <button
                    onClick={() => { sound.playClick(); setViewMode('individual-grid'); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      viewMode === 'individual-grid'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>{isRTL ? 'عکس‌ها و رندرها به صورت جدا جدا' : 'Project Renders & Photos'}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/20 ml-1">
                      {currentGallery.length}
                    </span>
                  </button>

                  <button
                    onClick={() => { sound.playClick(); setViewMode('spotlight'); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      viewMode === 'spotlight'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{isRTL ? 'پرزنتیشن تکی' : 'Spotlight View'}</span>
                  </button>
                </div>

                <span className="text-[11px] font-mono text-gray-400 font-medium">
                  {currentGallery.length} {isRTL ? 'عکس و رندر اختصاصی' : 'Architectural Renders'}
                </span>
              </div>

              {/* View Mode 1: Individual Renders Grid (جدا جدا) */}
              {viewMode === 'individual-grid' ? (
                <div className="p-4 sm:p-6 overflow-y-auto max-h-[560px] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentGallery.map((sheetUrl, idx) => (
                      <div
                        key={idx}
                        onClick={() => { sound.playClick(); setZoomIndex(idx); }}
                        className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/60 shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                      >
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40">
                          <img
                            src={sheetUrl}
                            alt={`${project.title} - Sheet ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-3 py-1.5 rounded-xl bg-blue-600/90 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-xs">
                              <ZoomIn className="w-3.5 h-3.5" />
                              <span>{isRTL ? 'بزرگنمایی تصویر' : 'Zoom Image'}</span>
                            </span>
                          </div>
                        </div>

                        <div className="p-2.5 px-3 bg-slate-950/80 flex items-center justify-between text-xs border-t border-slate-800/60">
                          <span className="font-mono text-[11px] font-bold text-blue-300">
                            {isRTL ? `تصویر ${String(idx + 1).padStart(2, '0')}` : `Image ${String(idx + 1).padStart(2, '0')}`}
                          </span>
                          <span className="text-[10px] font-mono text-gray-500">
                            {isRTL ? `از ${currentGallery.length}` : `of ${currentGallery.length}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* View Mode 2: Spotlight Single View */
                <div className="flex-1 flex flex-col justify-between">
                  <div className="relative w-full flex-1 flex items-center justify-center p-3 sm:p-6 min-h-[360px]">
                    <img
                      src={currentGallery[activeImageIndex] || project.coverImage}
                      alt={project.title}
                      onClick={() => { sound.playClick(); setZoomIndex(activeImageIndex); }}
                      className="max-h-[380px] sm:max-h-[460px] w-full object-contain rounded-2xl cursor-zoom-in shadow-xl"
                    />

                    {/* Prev / Next Controls */}
                    {currentGallery.length > 1 && (
                      <>
                        <button
                          onClick={() => { sound.playClick(); setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : currentGallery.length - 1)); }}
                          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 text-white hover:bg-blue-600 flex items-center justify-center transition-colors cursor-pointer border border-white/20 shadow-lg"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => { sound.playClick(); setActiveImageIndex((prev) => (prev < currentGallery.length - 1 ? prev + 1 : 0)); }}
                          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 text-white hover:bg-blue-600 flex items-center justify-center transition-colors cursor-pointer border border-white/20 shadow-lg"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails Row */}
                  <div className="p-3 bg-black/60 backdrop-blur-md flex items-center justify-center gap-2 overflow-x-auto border-t border-white/10">
                    {currentGallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => { sound.playClick(); setActiveImageIndex(idx); }}
                        className={`w-14 h-9 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                          activeImageIndex === idx ? 'border-blue-500 scale-105 shadow-md' : 'border-transparent opacity-40 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Architectural Info Sidebar (5 cols) */}
            <div className={`lg:col-span-5 p-5 sm:p-7 md:p-8 flex flex-col justify-between bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-black text-white">
                    {getLocalizedStatus(project.status, currentLanguage)}
                  </span>
                  <span className="text-xs font-mono text-gray-500 font-bold">{project.year}</span>
                  {project.role && (
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                      {project.role}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 leading-tight">
                  {isRTL ? project.title : (project.englishTitle || project.title)}
                </h2>
                <p className="text-xs font-mono text-gray-400 mt-0.5 font-medium">
                  {isRTL ? project.englishTitle : project.title}
                </p>

                {/* Specs Matrix */}
                <div className="grid grid-cols-2 gap-3 my-4 sm:my-5 bg-gray-50 p-3.5 sm:p-4 rounded-2xl border border-gray-100 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px] font-medium">{t.location}</span>
                    <span className="font-semibold text-gray-800 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                      <span className="line-clamp-1">{project.location}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] font-medium">{t.area}</span>
                    <span className="font-semibold text-gray-800 flex items-center gap-1 mt-0.5">
                      <Maximize2 className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                      <span>{project.area}</span>
                    </span>
                  </div>
                  {project.client && (
                    <div className="col-span-2 pt-2 border-t border-gray-200/60">
                      <span className="text-gray-400 block text-[10px] font-medium">{t.client}</span>
                      <span className="font-semibold text-gray-800 flex items-center gap-1 mt-0.5">
                        <UserCheck className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                        <span>{project.client}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* BIM Specs if available */}
                {project.bimSpecs && (
                  <div className="mb-4 sm:mb-5 bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 text-xs">
                    <div className="flex items-center gap-1.5 text-blue-900 font-bold mb-1.5">
                      <Cpu className="w-4 h-4 text-blue-600" />
                      <span>{t.bimSpecifications}</span>
                    </div>
                    {project.bimSpecs.lodLevel && (
                      <p className="text-[11px] text-blue-800 font-mono">
                        Level of Development: <strong>{project.bimSpecs.lodLevel}</strong>
                      </p>
                    )}
                    {project.bimSpecs.softwareUsed && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {project.bimSpecs.softwareUsed.map((soft, sI) => (
                          <span key={sI} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-blue-900 border border-blue-200">
                            {soft}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Concept Narrative */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>{t.concept}</span>
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {project.concept}
                  </p>
                </div>

                {/* Key Architectural Features */}
                {project.features && project.features.length > 0 && (
                  <div className="mt-4 space-y-1.5">
                    <h4 className="text-xs font-bold text-gray-900">
                      {t.features}
                    </h4>
                    <div className="space-y-1.5">
                      {project.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center gap-3">
                <button
                  onClick={() => { sound.playClick(); onClose(); }}
                  className="flex-1 py-2.5 rounded-2xl bg-black text-white font-bold text-xs hover:bg-gray-800 transition-colors text-center shadow-clay-sm cursor-pointer"
                >
                  {t.backToOverview}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fullscreen Lightbox Zoom Modal for Any Sheet (Optimized for Mobile/Tablet Swipes & Desktop Navigation) */}
        {zoomIndex !== null && currentGallery[zoomIndex] && (
          <div 
            onTouchStart={handleLightboxTouchStart}
            onTouchEnd={handleLightboxTouchEnd}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 select-none touch-pan-y"
            onClick={() => setZoomIndex(null)}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-3 px-2 text-white z-20">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-blue-600 text-white">
                  {isRTL ? `شیت ${zoomIndex + 1} از ${currentGallery.length}` : `SHEET ${zoomIndex + 1} OF ${currentGallery.length}`}
                </span>
                <span className="text-xs text-gray-300 font-bold hidden sm:inline">
                  {project.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={currentGallery[zoomIndex]}
                  download={`${project.id}-sheet-${zoomIndex + 1}.jpg`}
                  onClick={e => e.stopPropagation()}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 border border-white/10"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isRTL ? 'دانلود تصویر' : 'Download'}</span>
                </a>
                <button
                  onClick={() => setZoomIndex(null)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title={t.close}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Central Media Stage with Chevron Navigators */}
            <div 
              className="flex-1 relative flex items-center justify-center p-2 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Previous Sheet Chevron */}
              {currentGallery.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playClick();
                    setZoomIndex(prev => (prev !== null && prev > 0 ? prev - 1 : currentGallery.length - 1));
                  }}
                  className="absolute left-2 sm:left-4 z-30 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-blue-600 text-white border border-white/20 shadow-xl transition-all cursor-pointer hover:scale-105"
                  title={isRTL ? 'شیت بعدی' : 'Previous Sheet'}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              <img 
                src={currentGallery[zoomIndex]} 
                alt={`${project.title} - Sheet ${zoomIndex + 1}`}
                className="max-h-[82vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10 pointer-events-none sm:pointer-events-auto"
              />

              {/* Next Sheet Chevron */}
              {currentGallery.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playClick();
                    setZoomIndex(prev => (prev !== null && prev < currentGallery.length - 1 ? prev + 1 : 0));
                  }}
                  className="absolute right-2 sm:right-4 z-30 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-blue-600 text-white border border-white/20 shadow-xl transition-all cursor-pointer hover:scale-105"
                  title={isRTL ? 'شیت قبلی' : 'Next Sheet'}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Hints for Gestures */}
            <div className="pt-2 text-center text-[11px] text-gray-400 font-mono flex items-center justify-center gap-3">
              <span>{isRTL ? 'روی گوشی به چپ یا راست بکشید (Swipe) • کلیدهای جهت‌نما در کیبورد' : 'Swipe left/right on touch devices • Arrow keys on keyboard'}</span>
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
