import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  Calendar, 
  Maximize2, 
  CheckCircle2, 
  FileText, 
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft,
  Share2,
  Cpu,
  UserCheck,
  Building2
} from 'lucide-react';
import { Project } from '../types';
import { sound } from '../utils/audio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewTab, setViewTab] = useState<'gallery' | 'plans'>('gallery');

  if (!project) return null;

  const currentGallery = viewTab === 'gallery' ? project.gallery : (project.plans || project.gallery);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/90 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-black hover:text-white backdrop-blur-md flex items-center justify-center text-gray-800 shadow-md transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Grid Layout: Visual Media & Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
            {/* Left Media Viewer (7 cols) */}
            <div className="lg:col-span-7 bg-gray-950 flex flex-col justify-between relative min-h-[380px] lg:min-h-[600px]">
              {/* Media Mode Tabs */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 glass-panel-dark p-1 rounded-2xl">
                <button
                  onClick={() => { sound.playClick(); setViewTab('gallery'); setActiveImageIndex(0); }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    viewTab === 'gallery'
                      ? 'bg-white text-black'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  تصاویر و رندرهای پروژه
                </button>
              </div>

              {/* Main Image Display */}
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <img
                  src={currentGallery[activeImageIndex] || project.coverImage}
                  alt={project.title}
                  className="max-h-[500px] w-full object-contain rounded-2xl"
                />

                {/* Prev / Next Controls */}
                {currentGallery.length > 1 && (
                  <>
                    <button
                      onClick={() => { sound.playClick(); setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : currentGallery.length - 1)); }}
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => { sound.playClick(); setActiveImageIndex((prev) => (prev < currentGallery.length - 1 ? prev + 1 : 0)); }}
                      className="absolute left-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Row */}
              <div className="p-4 bg-black/50 backdrop-blur-md flex items-center justify-center gap-2 overflow-x-auto">
                {currentGallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { sound.playClick(); setActiveImageIndex(idx); }}
                    className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-white scale-105' : 'border-transparent opacity-40 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Architectural Info Sidebar (5 cols) */}
            <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-white text-right">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-black text-white">
                    {project.status}
                  </span>
                  <span className="text-xs font-mono text-gray-500 font-bold">{project.year}</span>
                  {project.role && (
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                      {project.role}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                  {project.title}
                </h2>
                <p className="text-xs font-mono text-gray-400 mt-0.5 font-medium">
                  {project.englishTitle}
                </p>

                {/* Specs Matrix */}
                <div className="grid grid-cols-2 gap-3 my-5 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px] font-medium">موقعیت مکانی</span>
                    <span className="font-semibold text-gray-800 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" />
                      {project.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] font-medium">مساحت / زیربنا</span>
                    <span className="font-semibold text-gray-800 flex items-center gap-1 mt-0.5">
                      <Maximize2 className="w-3.5 h-3.5 text-gray-500" />
                      {project.area}
                    </span>
                  </div>
                  {project.client && (
                    <div className="col-span-2 pt-2 border-t border-gray-200/60">
                      <span className="text-gray-400 block text-[10px] font-medium">کارفرما</span>
                      <span className="font-semibold text-gray-800 flex items-center gap-1 mt-0.5">
                        <UserCheck className="w-3.5 h-3.5 text-gray-500" />
                        {project.client}
                      </span>
                    </div>
                  )}
                </div>

                {/* BIM Specs if available */}
                {project.bimSpecs && (
                  <div className="mb-5 bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 text-xs">
                    <div className="flex items-center gap-1.5 text-blue-900 font-bold mb-1.5">
                      <Cpu className="w-4 h-4 text-blue-600" />
                      <span>مشخصات فنی و استانداردهای BIM</span>
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
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-600" />
                    ایده و کانسپت معماری
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed text-justify">
                    {project.concept}
                  </p>
                </div>

                {/* Key Architectural Features */}
                {project.features && (
                  <div className="mt-5 space-y-2">
                    <h4 className="text-xs font-bold text-gray-900">
                      ویژگی‌های شاخص پروژه
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
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                <button
                  onClick={() => { sound.playClick(); onClose(); }}
                  className="flex-1 py-2.5 rounded-2xl bg-black text-white font-bold text-xs hover:bg-gray-800 transition-colors text-center shadow-clay-sm"
                >
                  بازگشت به پورتفولیو
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
