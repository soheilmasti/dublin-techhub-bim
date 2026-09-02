import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  Maximize2, 
  ArrowUpRight,
  Layers,
  Sparkles,
  Cpu
} from 'lucide-react';
import { CategoryBuilding, Project } from '../types';
import { sound } from '../utils/audio';

interface ProjectDrawerProps {
  category: CategoryBuilding | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({
  category,
  onClose,
  onSelectProject
}) => {
  if (!category) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => { sound.playClick(); onClose(); }}
          className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        />

        {/* Slide-over Drawer Panel */}
        <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 md:pl-10">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="w-screen max-w-xl bg-white/95 backdrop-blur-xl shadow-2xl border-r border-white/80 flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 md:p-8 border-b border-gray-100/90 bg-white/70">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-xl bg-black text-white">
                    ZONE {category.categoryNumber}
                  </span>
                  <span className="text-xs font-bold text-blue-600">
                    {category.projects.length} پروژه‌ی ثبت‌شده
                  </span>
                </div>

                <button
                  onClick={() => { sound.playClick(); onClose(); }}
                  className="p-2 rounded-xl text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                {category.title}
              </h2>
              <p className="text-xs font-mono text-gray-500 mt-1 uppercase tracking-wider">
                {category.englishTitle}
              </p>

              <p className="text-xs text-gray-600 leading-relaxed mt-3 bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                {category.description}
              </p>
            </div>

            {/* Project List Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {category.projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => { sound.playDrawerOpen(); onSelectProject(project); }}
                  className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-clay-sm hover:shadow-clay-md border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Cover Image Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Status Badge */}
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full glass-panel shadow-sm text-gray-900">
                        {project.status}
                      </span>
                    </div>

                    {/* Quick View Button on Image */}
                    <div className="absolute bottom-3.5 left-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="glass-panel px-3 py-1.5 rounded-xl text-xs font-bold text-black flex items-center gap-1.5 shadow-sm">
                        مشاهده جزئیات و گالری <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs font-mono text-gray-400">
                          {project.englishTitle}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-800">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 mt-2.5 leading-relaxed">
                      {project.concept}
                    </p>

                    {/* BIM and Meta Specs */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3.5 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {project.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
                          {project.area}
                        </span>
                      </div>
                      {project.bimSpecs && (
                        <span className="font-mono text-[10px] font-bold text-blue-600 flex items-center gap-1">
                          <Cpu className="w-3 h-3" />
                          {project.bimSpecs.lodLevel}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 md:p-6 border-t border-gray-100 bg-white/80 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-mono">
                SOHEIL MASTI ARCHITECTURE
              </span>
              <button
                onClick={() => { sound.playClick(); onClose(); }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                بستن پنجره
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
