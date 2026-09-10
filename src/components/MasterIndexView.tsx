import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home,
  Building2, 
  MapPin, 
  Maximize2, 
  Search, 
  ArrowUpRight,
  ArrowRight,
  Cpu,
  Layers
} from 'lucide-react';
import { CategoryBuilding, Project } from '../types';
import { sound } from '../utils/audio';

interface MasterIndexViewProps {
  categories: CategoryBuilding[];
  onSelectProject: (project: Project) => void;
  onBackToMaquette: () => void;
}

export const MasterIndexView: React.FC<MasterIndexViewProps> = ({
  categories,
  onSelectProject,
  onBackToMaquette
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allProjects = categories.flatMap(cat => 
    cat.projects.map(p => ({ ...p, categoryTitle: cat.title, categoryId: cat.id }))
  );

  const filteredProjects = allProjects.filter(p => {
    const matchesCategory = selectedFilter === 'all' || p.categoryId === selectedFilter;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f5f6f8] pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Top Title & Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <button
            onClick={() => { sound.playClick(); onBackToMaquette(); }}
            className="text-xs font-bold text-gray-800 hover:text-white hover:bg-black flex items-center gap-2 mb-3.5 transition-all glass-panel px-4 py-2.5 rounded-2xl shadow-clay-sm w-fit border border-white hover:scale-105 active:scale-95 cursor-pointer"
            title="بازگشت به صفحه اصلی ماکت شهرک"
          >
            <Home className="w-4 h-4 text-blue-600" />
            <span>🏠 بازگشت به صفحه اصلی (ماکت شهرک)</span>
          </button>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            کاتالوگ و آرشیو کامل پروژه‌ها
          </h2>
          <p className="text-xs font-mono text-gray-500 mt-1 font-semibold">
            SOHEIL MASTI ARCHITECTURE & BIM PORTFOLIO // {filteredProjects.length} PROJECTS
          </p>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="جستجوی پروژه، بارسلون، دربندسر..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-panel pr-9 pl-4 py-2 rounded-2xl text-xs text-gray-800 placeholder-gray-400 border border-white/90 focus:outline-none focus:ring-2 focus:ring-black/20 w-52 sm:w-64 shadow-clay-sm"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 glass-panel p-1 rounded-2xl border border-white/90 shadow-clay-sm">
            <button
              onClick={() => { sound.playClick(); setSelectedFilter('all'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === 'all' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
            >
              همه ({allProjects.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { sound.playClick(); setSelectedFilter(cat.id); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedFilter === cat.id ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'
                }`}
              >
                {cat.title.split(' ')[0]} ({cat.projects.length})
              </button>
            ))}
          </div>
        </div>
      </div>

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
                <div className="absolute top-3.5 right-3.5">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full glass-panel shadow-sm text-gray-900">
                    {project.status}
                  </span>
                </div>
                <div className="absolute bottom-3.5 left-3.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="glass-panel px-3 py-1.5 rounded-xl text-xs font-bold text-black flex items-center gap-1 shadow-sm">
                    مشاهده جزئیات <ArrowUpRight className="w-3.5 h-3.5" />
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
                {project.location}
              </span>
              <span className="flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
                {project.area}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
