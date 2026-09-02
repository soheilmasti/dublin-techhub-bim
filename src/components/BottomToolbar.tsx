import React from 'react';
import { CategoryBuilding } from '../types';
import { Home, Building, Briefcase, ShoppingBag, Compass } from 'lucide-react';

interface BottomToolbarProps {
  categories: CategoryBuilding[];
  selectedCategory: CategoryBuilding | null;
  onSelectCategory: (category: CategoryBuilding) => void;
  activeView: string;
}

export const BottomToolbar: React.FC<BottomToolbarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  activeView
}) => {
  if (activeView === 'grid') return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-3.5 h-3.5" />;
      case 'Building': return <Building className="w-3.5 h-3.5" />;
      case 'Briefcase': return <Briefcase className="w-3.5 h-3.5" />;
      case 'ShoppingBag': return <ShoppingBag className="w-3.5 h-3.5" />;
      case 'Compass': return <Compass className="w-3.5 h-3.5" />;
      default: return <Building className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] pointer-events-none">
      <div className="glass-panel p-1.5 rounded-3xl shadow-clay-lg flex items-center gap-1.5 pointer-events-auto border border-white/80 overflow-x-auto">
        <span className="hidden lg:inline text-[10px] font-mono font-bold text-gray-400 px-3">
          ZONES //
        </span>

        {categories.map((cat) => {
          const isSelected = selectedCategory?.id === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isSelected
                  ? 'bg-black text-white shadow-sm scale-102'
                  : 'text-gray-700 hover:text-black hover:bg-gray-100/80'
              }`}
            >
              <span className="opacity-70 font-mono text-[10px]">{cat.categoryNumber}</span>
              <span>{cat.title.split(' ')[0]}</span>
              <span className="w-4 h-4 rounded-full bg-black/10 text-[10px] font-mono flex items-center justify-center">
                {cat.projects.length}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
