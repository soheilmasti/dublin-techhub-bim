import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home,
  MapPin, 
  Maximize2, 
  Search, 
  ArrowUpRight,
  LayoutGrid,
  Layers,
  ZoomIn,
  Download,
  X,
  ChevronLeft,
  ChevronRight
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
  const [displayMode, setDisplayMode] = useState<'projects' | 'sheets'>('projects');
  const [zoomSheetIndex, setZoomSheetIndex] = useState<number | null>(null);

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

  // Flatten all individual sheets from filtered projects
  const individualSheets = filteredProjects.flatMap(proj => 
    (proj.gallery && proj.gallery.length > 0 ? proj.gallery : [proj.coverImage]).map((sheetUrl, sIdx, arr) => ({
      url: sheetUrl,
      projectTitle: isRTL ? proj.title : (proj.englishTitle || proj.title),
      sheetIndex: sIdx + 1,
      totalSheets: arr.length,
      categoryTitle: proj.categoryTitle,
      project: proj
    }))
  );

  // Keyboard navigation for sheet lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (zoomSheetIndex === null) return;
    if (e.key === 'Escape') {
      setZoomSheetIndex(null);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      sound.playClick();
      setZoomSheetIndex(prev => (prev !== null && prev < individualSheets.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      sound.playClick();
      setZoomSheetIndex(prev => (prev !== null && prev > 0 ? prev - 1 : individualSheets.length - 1));
    }
  }, [zoomSheetIndex, individualSheets.length]);

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
    if (touchStartX.current === null || zoomSheetIndex === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - (touchStartY.current || 0);

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      sound.playClick();
      if (diffX < 0) {
        // Swiped left -> next sheet
        setZoomSheetIndex(prev => (prev !== null && prev < individualSheets.length - 1 ? prev + 1 : 0));
      } else {
        // Swiped right -> prev sheet
        setZoomSheetIndex(prev => (prev !== null && prev > 0 ? prev - 1 : individualSheets.length - 1));
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentZoomSheet = zoomSheetIndex !== null ? individualSheets[zoomSheetIndex] : null;

  return (
    <div className="min-h-screen bg-[#f5f6f8] pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top Title & Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
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
            {t.archive.subtitle} // {filteredProjects.length} {t.projectsCount.toUpperCase()} • {individualSheets.length} {isRTL ? 'شیت اختصاصی' : 'SHEETS'}
          </p>
        </div>

        {/* View Mode Toggle: Projects vs Individual Sheets */}
        <div className="flex items-center gap-2 self-start md:self-auto glass-panel p-1 rounded-2xl border border-white/90 shadow-clay-sm">
          <button
            onClick={() => { sound.playClick(); setDisplayMode('projects'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              displayMode === 'projects' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isRTL ? 'پروژه‌ها' : 'Projects'} ({filteredProjects.length})</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setDisplayMode('sheets'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              displayMode === 'sheets' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-600 hover:text-black'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{isRTL ? 'عکس‌ها و رندرها (جدا جدا)' : 'Individual Renders Grid'} ({individualSheets.length})</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
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
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
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
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedFilter === cat.id ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'
                }`}
              >
                {shortLabel} ({cat.projects.length})
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl shadow-clay-sm p-8">
          <p className="text-sm font-semibold text-gray-500">{t.archive.noResults}</p>
        </div>
      )}

      {/* MODE 1: Bento Projects Grid */}
      {displayMode === 'projects' && (
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
                {/* Main Cover Image */}
                <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className={`absolute top-3.5 ${isRTL ? 'left-3.5' : 'right-3.5'} flex items-center gap-1.5`}>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full glass-panel shadow-sm text-gray-900">
                      {project.status}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-sm">
                      {project.gallery?.length || 1} {isRTL ? 'شیت' : 'Sheets'}
                    </span>
                  </div>
                  <div className={`absolute bottom-3.5 ${isRTL ? 'right-3.5' : 'left-3.5'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <span className="glass-panel px-3 py-1.5 rounded-xl text-xs font-bold text-black flex items-center gap-1 shadow-sm">
                      {t.viewProject} <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Individual Sheet Mini Previews Row */}
                {project.gallery && project.gallery.length > 1 && (
                  <div className="px-5 pt-3 flex items-center gap-2 overflow-x-auto pb-1">
                    {project.gallery.slice(0, 4).map((sheetImg, sI) => (
                      <div key={sI} className="w-12 h-8 rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-gray-100">
                        <img src={sheetImg} alt="sheet" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {project.gallery.length > 4 && (
                      <span className="text-[10px] font-mono text-gray-500 font-bold px-1.5 py-0.5 rounded bg-gray-100 shrink-0">
                        +{project.gallery.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Details */}
                <div className="p-5 pt-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <span className="font-mono text-xs text-gray-600 font-bold px-2 py-0.5 rounded bg-gray-100 shrink-0">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-gray-400 mt-0.5 font-medium truncate">{project.englishTitle}</p>
                  
                  <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                    {project.concept}
                  </p>
                </div>
              </div>

              {/* Footer Specs */}
              <div className="px-5 pb-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="truncate max-w-[140px]">{project.location}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{project.area}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* MODE 2: Individual Sheets Grid (جدا جدا) */}
      {displayMode === 'sheets' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {individualSheets.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(idx * 0.02, 0.5) }}
              onClick={() => {
                sound.playClick();
                setZoomSheetIndex(idx);
              }}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-clay-sm hover:shadow-clay-md border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                <img
                  src={item.url}
                  alt={`${item.projectTitle} - Sheet ${item.sheetIndex}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-xl bg-blue-600/90 text-white text-xs font-bold flex items-center gap-1 shadow-md">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>{isRTL ? 'بزرگنمایی' : 'Zoom'}</span>
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white flex items-center justify-between border-t border-gray-100">
                <div className="min-w-0 pr-2">
                  <h4 className="text-xs font-bold text-gray-900 truncate">
                    {item.projectTitle}
                  </h4>
                  <p className="text-[10px] font-mono text-gray-400">
                    {item.categoryTitle}
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 shrink-0">
                  {isRTL ? `شیت ${item.sheetIndex}/${item.totalSheets}` : `${item.sheetIndex}/${item.totalSheets}`}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox Zoom for MasterIndexView Sheets (Swipe & Next/Prev Controls) */}
      {currentZoomSheet && zoomSheetIndex !== null && (
        <div 
          onTouchStart={handleLightboxTouchStart}
          onTouchEnd={handleLightboxTouchEnd}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 select-none touch-pan-y"
          onClick={() => setZoomSheetIndex(null)}
        >
          {/* Top Header */}
          <div className="flex items-center justify-between pb-3 px-2 text-white z-20">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-blue-600 text-white">
                {isRTL ? `شیت ${currentZoomSheet.sheetIndex} از ${currentZoomSheet.totalSheets}` : `SHEET ${currentZoomSheet.sheetIndex} OF ${currentZoomSheet.totalSheets}`}
              </span>
              <span className="text-xs text-gray-300 font-bold hidden sm:inline">
                {currentZoomSheet.projectTitle}
              </span>
              <span className="text-[11px] font-mono text-gray-400 hidden md:inline">
                ({currentZoomSheet.categoryTitle})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={currentZoomSheet.url}
                download={`bimco-sheet-${zoomSheetIndex + 1}.jpg`}
                onClick={e => e.stopPropagation()}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 border border-white/10"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isRTL ? 'دانلود تصویر' : 'Download'}</span>
              </a>
              <button
                onClick={() => setZoomSheetIndex(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title={t.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Central Stage with Next/Prev Controls */}
          <div 
            className="flex-1 relative flex items-center justify-center p-2 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {individualSheets.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playClick();
                  setZoomSheetIndex(prev => (prev !== null && prev > 0 ? prev - 1 : individualSheets.length - 1));
                }}
                className="absolute left-2 sm:left-4 z-30 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-blue-600 text-white border border-white/20 shadow-xl transition-all cursor-pointer hover:scale-105"
                title={isRTL ? 'شیت بعدی' : 'Previous Sheet'}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <img 
              src={currentZoomSheet.url} 
              alt="Enlarged Sheet" 
              className="max-h-[82vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10 pointer-events-none sm:pointer-events-auto"
            />

            {individualSheets.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playClick();
                  setZoomSheetIndex(prev => (prev !== null && prev < individualSheets.length - 1 ? prev + 1 : 0));
                }}
                className="absolute right-2 sm:right-4 z-30 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-blue-600 text-white border border-white/20 shadow-xl transition-all cursor-pointer hover:scale-105"
                title={isRTL ? 'شیت قبلی' : 'Next Sheet'}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Gestures Hint */}
          <div className="pt-2 text-center text-[11px] text-gray-400 font-mono flex items-center justify-center gap-3">
            <span>{isRTL ? 'برای جابجایی روی گوشی به چپ یا راست بکشید (Swipe) • کلیدهای جهت‌نما در کیبورد' : 'Swipe left/right on touch devices • Arrow keys on keyboard'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

