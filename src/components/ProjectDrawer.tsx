import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  Maximize2, 
  ArrowUpRight,
  Layers
} from 'lucide-react';
import { CategoryBuilding, Project } from '../types';
import { sound } from '../utils/audio';
import { LanguageCode, TRANSLATIONS } from '../utils/i18n';

interface ProjectDrawerProps {
  category: CategoryBuilding | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  currentLanguage?: LanguageCode;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({
  category,
  onClose,
  onSelectProject,
  currentLanguage = 'en'
}) => {
  if (!category) return null;

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const isRTL = currentLanguage === 'fa';
  const zoneInfo = t.zones[category.id as keyof typeof t.zones];

  const categoryTitle = zoneInfo?.label || category.title;
  const categoryDesc = zoneInfo?.desc || category.description;
  const categoryBadge = zoneInfo?.badge || `ZONE ${category.categoryNumber}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => { sound.playClick(); onClose(); }}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs"
        />

        {/* Slide-over Drawer Panel (Responsive Full Width on Mobile, Max-w-xl on Tablet/Desktop) */}
        <div className={`absolute inset-y-0 ${isRTL ? 'right-0' : 'left-0'} w-full max-w-full sm:max-w-xl flex`}>
          <motion.div
            initial={{ x: isRTL ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? '100%' : '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-full bg-white/95 backdrop-blur-2xl shadow-2xl border-x border-white/80 flex flex-col justify-between h-full"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-7 border-b border-gray-100/90 bg-white/80 shrink-0">
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-xl bg-black text-white">
                    {categoryBadge}
                  </span>
                  <span className="text-xs font-bold text-blue-600">
                    {category.projects.length} {t.registeredProjects}
                  </span>
                </div>

                <button
                  onClick={() => { sound.playClick(); onClose(); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-black hover:text-white text-gray-800 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs border border-gray-200"
                  title={t.close}
                >
                  <X className="w-4 h-4" />
                  <span>{t.close}</span>
                </button>
              </div>

              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight leading-snug">
                {categoryTitle}
              </h2>
              <p className="text-[11px] font-mono text-gray-400 mt-0.5 uppercase tracking-wider">
                {category.englishTitle}
              </p>

              <p className="text-xs text-gray-600 leading-relaxed mt-2.5 bg-gray-50/80 p-3 rounded-2xl border border-gray-100">
                {categoryDesc}
              </p>
            </div>

            {/* Project List Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-5">
              {category.projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  onClick={() => { sound.playDrawerOpen(); onSelectProject(project); }}
                  className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-clay-sm hover:shadow-clay-md border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Cover Image Container */}
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Status Badge */}
                    <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} z-10`}>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full glass-panel shadow-sm text-gray-900">
                        {project.status}
                      </span>
                    </div>

                    {/* Quick View Button on Image */}
                    <div className={`absolute bottom-3 ${isRTL ? 'right-3' : 'left-3'} z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                      <span className="glass-panel px-3 py-1.5 rounded-xl text-xs font-bold text-black flex items-center gap-1.5 shadow-sm">
                        {t.viewProject} <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {isRTL ? project.title : (project.englishTitle || project.title)}
                        </h3>
                        <p className="text-[11px] font-mono text-gray-400">
                          {isRTL ? project.englishTitle : project.title}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-800">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                      {project.concept}
                    </p>

                    {/* BIM and Meta Specs */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-3.5 pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="line-clamp-1">{project.location}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Maximize2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>{project.area}</span>
                        </span>
                      </div>

                      {project.bimSpecs?.lodLevel && (
                        <span className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-100">
                          <Layers className="w-3 h-3" />
                          <span>{project.bimSpecs.lodLevel.split(' ')[0]}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/80 flex items-center justify-between shrink-0">
              <span className="text-xs text-gray-500">
                {t.studioName} // {t.studioTagline.split('//')[1] || 'BARCELONA'}
              </span>
              <button
                onClick={() => { sound.playClick(); onClose(); }}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                {t.backToOverview} ↗
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
