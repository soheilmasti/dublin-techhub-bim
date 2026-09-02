import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, 
  Home, 
  Briefcase, 
  ShoppingBag, 
  Compass, 
  Award,
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sparkles,
  ChevronLeft,
  Sun,
  Sunset,
  Moon
} from 'lucide-react';
import { CategoryBuilding, SiteSettings } from '../types';
import { sound } from '../utils/audio';

interface MaquetteIsometricCanvasProps {
  categories: CategoryBuilding[];
  settings: SiteSettings;
  onSelectCategory: (category: CategoryBuilding) => void;
  selectedCategory: CategoryBuilding | null;
}

export const MaquetteIsometricCanvas: React.FC<MaquetteIsometricCanvasProps> = ({
  categories,
  settings,
  onSelectCategory,
  selectedCategory
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<CategoryBuilding | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [useCustomBg, setUseCustomBg] = useState<boolean>(false);
  const [lightingMode, setLightingMode] = useState<'day' | 'sunset' | 'night'>('day');

  const handleZoomIn = () => { sound.playClick(); setZoomLevel(prev => Math.min(prev + 0.15, 1.6)); };
  const handleZoomOut = () => { sound.playClick(); setZoomLevel(prev => Math.max(prev - 0.15, 0.8)); };
  const handleResetZoom = () => { sound.playClick(); setZoomLevel(1); };

  const handleSelect = (cat: CategoryBuilding) => {
    sound.playDrawerOpen();
    onSelectCategory(cat);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-[#eceef2]">
      {/* Background Ambience & Terrain */}
      <div 
        className={`absolute inset-0 transition-colors duration-700 ${
          lightingMode === 'day' 
            ? 'bg-[#eceef2] clay-canvas-grid' 
            : lightingMode === 'sunset'
            ? 'bg-[#2a1d2d] clay-dark-grid'
            : 'bg-[#0b0f19] clay-dark-grid'
        }`}
      />

      {/* Radial soft lighting vignette */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
        lightingMode === 'day'
          ? 'bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.85)_0%,rgba(220,225,235,0.4)_60%,rgba(195,200,215,0.7)_100%)] opacity-90'
          : lightingMode === 'sunset'
          ? 'bg-[radial-gradient(circle_at_50%_45%,rgba(249,115,22,0.25)_0%,rgba(67,56,202,0.3)_60%,rgba(15,23,42,0.9)_100%)] opacity-90'
          : 'bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.12)_0%,rgba(15,23,42,0.6)_60%,rgba(2,6,23,0.95)_100%)] opacity-95'
      }`} />

      {/* Main Interactive Stage */}
      <div className="relative w-full h-full flex items-center justify-center pt-10 pb-6">
        <motion.div
          animate={{ scale: zoomLevel }}
          transition={{ type: 'spring', stiffness: 220, damping: 25 }}
          className="relative w-[94vw] max-w-[1400px] h-[80vh] max-h-[840px] rounded-3xl overflow-hidden shadow-clay-lg border border-white/70 bg-white/40 backdrop-blur-sm"
        >
          {/* Layer 1: Base Architectural Maquette Illustration / Masterplan */}
          <div className="absolute inset-0 w-full h-full">
            {useCustomBg && settings.backgroundImageUrl ? (
              <img
                src={settings.backgroundImageUrl}
                alt="Architectural Masterplan"
                className="w-full h-full object-cover filter contrast-[1.05] brightness-[1.02]"
              />
            ) : (
              /* High-Fidelity SVG Procedural White Clay City & Waterfront Masterplan */
              <svg 
                viewBox="0 0 1200 700" 
                className="w-full h-full object-cover preserve-3d"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Clay Lighting Gradients */}
                  <linearGradient id="clayTop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#f1f3f7" />
                  </linearGradient>
                  <linearGradient id="clayLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e2e6ed" />
                    <stop offset="100%" stopColor="#cbd2de" />
                  </linearGradient>
                  <linearGradient id="clayRight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#cbd2de" />
                    <stop offset="100%" stopColor="#94a0b2" />
                  </linearGradient>
                  <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={lightingMode === 'night' ? '#0369a1' : '#bae6fd'} />
                    <stop offset="100%" stopColor={lightingMode === 'night' ? '#075985' : '#7dd3fc'} />
                  </linearGradient>
                  <linearGradient id="shadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(15,23,42,0.22)" />
                    <stop offset="100%" stopColor="rgba(15,23,42,0)" />
                  </linearGradient>
                  <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="12" dy="20" stdDeviation="16" floodColor="#0f172a" floodOpacity="0.16" />
                  </filter>
                </defs>

                {/* Ground Masterplan Terrain / Contour Steps */}
                <g opacity="0.9">
                  <path d="M-60,350 L600,10 L1260,350 L600,690 Z" fill="#e5e9f0" stroke="#d1d7e2" strokeWidth="2" />
                  <path d="M40,350 L600,60 L1160,350 L600,640 Z" fill="#ebf0f7" stroke="#dde3ed" strokeWidth="1.5" />
                  <path d="M140,350 L600,110 L1060,350 L600,590 Z" fill="#f8fafc" stroke="#edf2f7" strokeWidth="1" />
                  
                  {/* Waterfront Canal Basin (Water Canal & Island Bay) */}
                  <path d="M250,380 C400,280 800,280 950,380 C800,480 400,480 250,380 Z" fill="url(#waterGrad)" opacity="0.75" stroke="#38bdf8" strokeWidth="1.5" />
                  
                  {/* Axis Roads and Promenade Grid */}
                  <path d="M100,320 L600,570 M600,60 L600,640 M1100,320 L600,570" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6,6" />
                </g>

                {/* Coastal Cable-Stayed Bridge Spanning Water */}
                <g filter="url(#softShadow)" className="cursor-pointer" onClick={() => handleSelect(categories[0])}>
                  <path d="M420,320 L780,320" stroke="#475569" strokeWidth="10" strokeLinecap="round" />
                  <path d="M420,316 L780,316" stroke="#94a3b8" strokeWidth="4" />
                  {/* Bridge Pylons */}
                  <line x1="600" y1="320" x2="600" y2="230" stroke="#1e293b" strokeWidth="6" />
                  {/* Cables */}
                  <line x1="600" y1="240" x2="480" y2="318" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.8" />
                  <line x1="600" y1="240" x2="540" y2="318" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.8" />
                  <line x1="600" y1="240" x2="660" y2="318" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.8" />
                  <line x1="600" y1="240" x2="720" y2="318" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.8" />
                </g>

                {/* Building 1: Urban Design & Ports (Center-Top Coastal Island) */}
                <g 
                  id="building-urban" 
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => handleSelect(categories[0])}
                  onMouseEnter={() => { sound.playClick(); setHoveredCategory(categories[0]); }}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <polygon points="500,240 680,150 780,210 600,300" fill="url(#shadowGrad)" opacity="0.8" />
                  <g filter="url(#softShadow)">
                    <polygon 
                      points="520,160 600,120 680,160 600,200" 
                      fill={hoveredCategory?.id === 'urban-design' ? '#ffffff' : 'url(#clayTop)'} 
                      stroke={hoveredCategory?.id === 'urban-design' ? '#0ea5e9' : '#cbd5e1'} 
                      strokeWidth={hoveredCategory?.id === 'urban-design' ? '3' : '1'} 
                    />
                    <polygon points="520,160 600,200 600,280 520,240" fill="url(#clayLeft)" stroke="#cbd5e1" strokeWidth="0.8" />
                    <polygon points="600,200 680,160 680,240 600,280" fill="url(#clayRight)" stroke="#cbd5e1" strokeWidth="0.8" />
                  </g>
                </g>

                {/* Building 2: Luxury Residential & Alpine Penthouses (Left-Bottom Zone) */}
                <g 
                  id="building-residential" 
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => handleSelect(categories[1])}
                  onMouseEnter={() => { sound.playClick(); setHoveredCategory(categories[1]); }}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <polygon points="210,480 370,560 450,510 290,430" fill="url(#shadowGrad)" opacity="0.7" />
                  <g filter="url(#softShadow)">
                    {/* Villa Terraces */}
                    <polygon 
                      points="280,390 360,350 440,390 360,430" 
                      fill={hoveredCategory?.id === 'residential-luxury' ? '#ffffff' : 'url(#clayTop)'} 
                      stroke={hoveredCategory?.id === 'residential-luxury' ? '#3b82f6' : '#cbd5e1'} 
                      strokeWidth={hoveredCategory?.id === 'residential-luxury' ? '3' : '1'} 
                    />
                    <polygon points="280,390 360,430 360,490 280,450" fill="url(#clayLeft)" stroke="#cbd5e1" strokeWidth="0.8" />
                    <polygon points="360,430 440,390 440,450 360,490" fill="url(#clayRight)" stroke="#cbd5e1" strokeWidth="0.8" />
                    <polygon points="300,410 340,430 340,450 300,430" fill="#3b82f6" opacity={hoveredCategory?.id === 'residential-luxury' ? '0.8' : '0.3'} />
                  </g>
                </g>

                {/* Building 3: Commercial Towers & Mega Complexes (Right-Center Zone) */}
                <g 
                  id="building-commercial" 
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => handleSelect(categories[2])}
                  onMouseEnter={() => { sound.playClick(); setHoveredCategory(categories[2]); }}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <polygon points="760,390 960,490 1040,420 840,320" fill="url(#shadowGrad)" opacity="0.8" />
                  <g filter="url(#softShadow)">
                    <polygon 
                      points="800,230 900,180 1000,230 900,280" 
                      fill={hoveredCategory?.id === 'commercial-complexes' ? '#ffffff' : 'url(#clayTop)'} 
                      stroke={hoveredCategory?.id === 'commercial-complexes' ? '#6366f1' : '#cbd5e1'} 
                      strokeWidth={hoveredCategory?.id === 'commercial-complexes' ? '3' : '1'} 
                    />
                    <polygon points="800,230 900,280 900,420 800,370" fill="url(#clayLeft)" stroke="#cbd5e1" strokeWidth="0.8" />
                    <polygon points="900,280 1000,230 1000,370 900,420" fill="url(#clayRight)" stroke="#cbd5e1" strokeWidth="0.8" />
                    {/* Skybridge slice */}
                    <polygon points="880,240 920,220 920,380 880,400" fill="#6366f1" opacity={hoveredCategory?.id === 'commercial-complexes' ? '0.7' : '0.3'} />
                  </g>
                </g>

                {/* Building 4: Retail & Concept Store (Bottom-Center Near Water) */}
                <g 
                  id="building-retail" 
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => handleSelect(categories[3])}
                  onMouseEnter={() => { sound.playClick(); setHoveredCategory(categories[3]); }}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <polygon points="460,540 600,610 660,560 540,500" fill="url(#shadowGrad)" opacity="0.6" />
                  <g filter="url(#softShadow)">
                    <polygon 
                      points="480,470 550,435 620,470 550,505" 
                      fill={hoveredCategory?.id === 'retail-stores' ? '#ffffff' : 'url(#clayTop)'} 
                      stroke={hoveredCategory?.id === 'retail-stores' ? '#ec4899' : '#cbd5e1'} 
                      strokeWidth={hoveredCategory?.id === 'retail-stores' ? '3' : '1'} 
                    />
                    <polygon points="480,470 550,505 550,555 480,520" fill="url(#clayLeft)" stroke="#cbd5e1" strokeWidth="0.8" />
                    <polygon points="550,505 620,470 620,520 550,555" fill="url(#clayRight)" stroke="#cbd5e1" strokeWidth="0.8" />
                  </g>
                </g>

                {/* Building 5: Institutional Competitions & Origami Pavilion (Right-Bottom Zone) */}
                <g 
                  id="building-competitions" 
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => handleSelect(categories[4])}
                  onMouseEnter={() => { sound.playClick(); setHoveredCategory(categories[4]); }}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <polygon points="860,530 1020,600 1060,540 940,480" fill="url(#shadowGrad)" opacity="0.6" />
                  <g filter="url(#softShadow)">
                    <polygon 
                      points="890,470 960,410 1020,460 970,510" 
                      fill={hoveredCategory?.id === 'institutional-competitions' ? '#ffffff' : 'url(#clayTop)'} 
                      stroke={hoveredCategory?.id === 'institutional-competitions' ? '#f59e0b' : '#cbd5e1'} 
                      strokeWidth={hoveredCategory?.id === 'institutional-competitions' ? '3' : '1'} 
                    />
                    <polygon points="890,470 970,510 950,550 870,510" fill="url(#clayLeft)" stroke="#cbd5e1" strokeWidth="0.8" />
                    <polygon points="970,510 1020,460 1040,510 990,560" fill="url(#clayRight)" stroke="#cbd5e1" strokeWidth="0.8" />
                  </g>
                </g>
              </svg>
            )}
          </div>

          {/* Layer 2: Interactive Floating Hotspot Markers & Badges */}
          <div className="absolute inset-0 pointer-events-none">
            {categories.map((cat) => {
              const isHovered = hoveredCategory?.id === cat.id;
              const isSelected = selectedCategory?.id === cat.id;

              return (
                <div
                  key={cat.id}
                  style={{
                    left: `${cat.position.x}%`,
                    top: `${cat.position.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
                  onClick={() => handleSelect(cat)}
                  onMouseEnter={() => { sound.playClick(); setHoveredCategory(cat); }}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  {/* Floating Pulsing Ring & Marker */}
                  <div className="relative flex items-center justify-center">
                    <div 
                      className={`absolute w-12 h-12 rounded-full transition-all duration-500 ${
                        isHovered 
                          ? 'scale-150 bg-black/10' 
                          : 'scale-100 bg-black/5 animate-pulse-subtle'
                      }`}
                    />

                    {/* Architectural Node Button */}
                    <motion.button
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.94 }}
                      className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-2xl shadow-clay-md transition-all duration-300 border ${
                        isHovered || isSelected
                          ? 'bg-black text-white border-black shadow-clay-lg'
                          : 'bg-white/95 text-gray-900 border-white/90 hover:bg-black hover:text-white'
                      }`}
                    >
                      <span className="font-mono text-xs font-bold">{cat.categoryNumber}</span>
                    </motion.button>

                    {/* Floating Info Tag on Hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 w-72 glass-panel p-3.5 rounded-2xl shadow-clay-lg border border-white/90 text-right pointer-events-none"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5 border-b border-gray-100 pb-1.5">
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black text-white">
                              ZONE {cat.categoryNumber}
                            </span>
                            <span className="text-[11px] font-bold text-blue-600">
                              {cat.projects.length} پروژه واقعی
                            </span>
                          </div>
                          
                          <h4 className="text-xs font-bold text-gray-900">
                            {cat.title}
                          </h4>
                          <p className="text-[10px] font-mono text-gray-500 tracking-tight">
                            {cat.englishTitle}
                          </p>

                          {/* Quick thumbnail strip */}
                          <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-gray-100">
                            {cat.projects.slice(0, 3).map((p) => (
                              <img
                                key={p.id}
                                src={p.coverImage}
                                alt={p.title}
                                className="w-11 h-8 object-cover rounded-lg border border-white shadow-xs"
                              />
                            ))}
                            <div className="flex-1 text-left">
                              <span className="text-[10px] font-bold text-blue-600 flex items-center gap-0.5 justify-end">
                                مشاهده لیست <ChevronLeft className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Controls overlay on canvas (Zoom & Custom Background Switch) */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 glass-panel p-1.5 rounded-2xl shadow-clay-sm border border-white/80">
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-xl text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
              title="بزرگنمایی"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-xl text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
              title="کوچک‌نمایی"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-2 rounded-xl text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
              title="بازنشانی اندازه"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <div className="w-[1px] h-4 bg-gray-300 mx-1" />

            <button
              onClick={() => { sound.playClick(); setUseCustomBg(!useCustomBg); }}
              className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                useCustomBg 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
              title="سوییچ به تصویر پس‌زمینه رندر دلخواه شما"
            >
              {useCustomBg ? 'پس‌زمینه عکس سفارشی' : 'ماکت رندر سفید'}
            </button>
          </div>

          {/* Lighting Mood Switcher on Canvas (Top-Left) */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1 glass-panel p-1 rounded-2xl shadow-clay-sm border border-white/80">
            <button
              onClick={() => { setLightingMode('day'); sound.playClick(); }}
              className={`p-2 rounded-xl transition-all ${lightingMode === 'day' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'}`}
              title="نور روز ماکتی"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { setLightingMode('sunset'); sound.playClick(); }}
              className={`p-2 rounded-xl transition-all ${lightingMode === 'sunset' ? 'bg-orange-600 text-white' : 'text-gray-600 hover:text-black'}`}
              title="نور غروب طلایی"
            >
              <Sunset className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { setLightingMode('night'); sound.playClick(); }}
              className={`p-2 rounded-xl transition-all ${lightingMode === 'night' ? 'bg-indigo-950 text-white' : 'text-gray-600 hover:text-black'}`}
              title="نور شب معماری"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
