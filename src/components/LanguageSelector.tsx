import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { LANGUAGES, LanguageCode } from '../utils/i18n';
import { sound } from '../utils/audio';

interface LanguageSelectorProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLang = LANGUAGES.find(l => l.code === currentLanguage) || LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code: LanguageCode) => {
    sound.playSwitch();
    onLanguageChange(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          sound.playClick();
          setIsOpen(!isOpen);
        }}
        className={`glass-panel px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl shadow-clay-sm flex items-center gap-1.5 text-xs font-bold text-gray-800 hover:text-black hover:bg-white transition-all border border-white/90 cursor-pointer ${
          isOpen ? 'ring-2 ring-blue-500/50 bg-white' : ''
        }`}
        title="Canviar idioma / Change language / تغییر زبان"
      >
        <Globe className="w-3.5 h-3.5 text-blue-600 animate-pulse-subtle" />
        <span className="text-sm leading-none">{activeLang.flag}</span>
        {!compact && (
          <span className="hidden sm:inline font-mono uppercase tracking-wider text-[11px]">
            {activeLang.code}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-52 rounded-2xl shadow-2xl bg-white/95 backdrop-blur-2xl border border-gray-100/90 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top-right text-left"
          dir="ltr"
        >
          <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 flex items-center justify-between">
            <span>Select Language</span>
            <span>7 Idiomes</span>
          </div>

          <div className="max-h-72 overflow-y-auto py-1 space-y-0.5">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLanguage;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 text-blue-600 font-bold'
                      : 'text-gray-700 hover:bg-gray-100/80 hover:text-black'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <div className="text-left">
                      <div className="text-xs font-bold leading-tight">{lang.nativeName}</div>
                      <div className="text-[10px] text-gray-400 font-sans">{lang.name}</div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
