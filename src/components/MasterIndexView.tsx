import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home,
  MapPin, 
  Maximize2, 
  Search, 
  ArrowUpRight
} from 'lucide-react';
import { CategoryBuilding, Project } from '../types';
import { sound } from '../utils/audio';
import { LanguageCode, TRANSLATIONS } from '../utils/i18n';

interface MasterIndexViewProps {
  categories: CategoryBuilding[];
  onSelectProject: (project: Project) => void;
  onBackToMaquette: () => void;
  currentLanguage?: LanguageCode;
}

export const MasterIndexView: React.FC<MasterIndexViewProps> = ({
  categories,
  onSelectProject,
  onBackToMaquette,
  currentLanguage = 'en'
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const isRTL = currentLanguage === 'fa';

  const allProjects = categories.flatMap(cat => 
    cat.projects.map(p => ({ ...p, categoryTitle: cat.title, categoryId: cat.id }))
  );

  const filteredProjects = allProjects.filter(p => {
    const matchesCategory = selectedFilter === 'all' || p.categoryId === selectedFilter;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.englishTitle && p.englishTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.location && p.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f5f6f8] pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top Title & Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <button
            onClick={() => { sound.playClick(); onBackToMaquette(); }}
            className="text-xs font-bold text-gray-800 hover:text-white hover:bg-black flex items-center gap-2 mb-3.5 transition-all glass-panel px-4 py-2.5 rounded-2xl shadow-clay-sm w-fit border border-white hover:scale-105 active:scale-95 cursor-pointer"
            title={t.returnToHome}
          >
            <Home className="w-4 h-4 text-blue-600" />
            <span>{t.returnToHome}</span>
          </button>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            {t.archive.title}
          </h2>
          <p className="text-xs font-mono text-gray-500 mt-1 font-semibold">
            {t.archive.subtitle} // {filteredProjects.length} {t.projectsCount.toUpperCase()}
          </p>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-auto">
            <Search className={`w-4 h-4 text-gray-400 absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2`} />
            <input
              type="text"
              placeholder={t.archive.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`glass-panel ${isRTL ? 'pr-9 pl-4' : 'pl-9 pr-4'} py-2 rounded-2xl text-xs text-gray-800 placeholder-gray-400 border border-white/90 focus:outline-none focus:ring-2 focus:ring-black/20 w-full sm:w-64 shadow-clay-sm`}
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 glass-panel p-1 rounded-2xl border border-white/90 shadow-clay-sm overflow-x-auto max-w-full scrollbar-none py-1.5 shrink-0">
            <button
              onClick={() => { sound.playClick(); setSelectedFilter('all'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedFilter === 'all' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
            >
              {t.archive.allFilter} ({allProjects.length})
            </button>
            {categories.map((cat) => {
              const zoneLabel = t.zones[cat.id as keyof typeof t.zones]?.label || cat.title;
              const shortLabel = zoneLabel.split(' ')[0] || cat.title.split(' ')[0];

              return (
                <button
                  key={cat.id}
                  onClick={() => { sound.playClick(); setSelectedFilter(cat.id); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    selectedFilter === cat.id ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {shortLabel} ({cat.projects.length})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Empty State if no match */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl shadow-clay-sm p-8">
          <p className="text-sm font-semibold text-gray-500">{t.archive.noResults}</p>
        </div>
      )}

      {/* Bento Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            onClick={() => { sound.playDrawerOpen(); onSelectProject(project); }}
            className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-clay-sm hover:shadow-clay-lg border border-white transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              {/* Image Box */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className={`absolute top-3.5 ${isRTL ? 'left-3.5' : 'right-3.5'}`}>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full glass-panel shadow-sm text-gray-900">
                    {project.status}
                  </span>
                </div>
                <div className={`absolute bottom-3.5 ${isRTL ? 'right-3.5' : 'left-3.5'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <span className="glass-panel px-3 py-1.5 rounded-xl text-xs font-bold text-black flex items-center gap-1 shadow-sm">
                    {t.viewProject} <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-gray-600 font-bold px-2 py-0.5 rounded bg-gray-100">
                    {project.year}
                  </span>
                </div>
                <p className="text-xs font-mono text-gray-400 mt-0.5 font-medium">{project.englishTitle}</p>
                
                <p className="text-xs text-gray-600 line-clamp-2 mt-3 leading-relaxed">
                  {project.concept}
                </p>
              </div>
            </div>

            {/* Footer Specs */}
            <div className="px-6 pb-5 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>{project.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
                <span>{project.area}</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
