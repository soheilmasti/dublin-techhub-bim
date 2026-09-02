import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Image as ImageIcon, 
  Sliders, 
  Copy, 
  Check, 
  Download, 
  Upload, 
  Sparkles,
  Layers,
  Box
} from 'lucide-react';
import { CategoryBuilding, SiteSettings } from '../types';
import { sound } from '../utils/audio';

interface AssetCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryBuilding[];
  onUpdateCategories: (newCats: CategoryBuilding[]) => void;
  settings: SiteSettings;
  onUpdateSettings: (newSettings: Partial<SiteSettings>) => void;
}

export const AssetCustomizerModal: React.FC<AssetCustomizerModalProps> = ({
  isOpen,
  onClose,
  categories,
  onUpdateCategories,
  settings,
  onUpdateSettings
}) => {
  const [selectedCatId, setSelectedCatId] = useState<string>(categories[0]?.id || 'urban-design');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'buildings' | 'background' | 'json'>('buildings');

  if (!isOpen) return null;

  const currentCat = categories.find(c => c.id === selectedCatId) || categories[0];

  const handleUpdateCurrentCat = (updates: Partial<CategoryBuilding>) => {
    const updated = categories.map(c => c.id === selectedCatId ? { ...c, ...updates } : c);
    onUpdateCategories(updated);
  };

  const handlePositionChange = (axis: 'x' | 'y', val: number) => {
    const newPos = { ...currentCat.position, [axis]: val };
    handleUpdateCurrentCat({ position: newPos });
  };

  const handleCopyJSON = () => {
    sound.playClick();
    const fullConfig = { settings, categories };
    navigator.clipboard.writeText(JSON.stringify(fullConfig, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    sound.playClick();
    const fullConfig = { settings, categories };
    const blob = new Blob([JSON.stringify(fullConfig, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'soheil-masti-architecture-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/90 my-auto text-right"
        >
          {/* Modal Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  ویرایشگر دکمه‌ها، تصاویر و مدل‌های GLB
                </h3>
                <p className="text-xs text-gray-500 font-mono font-semibold">
                  LIVE ASSET, POSITION & GLB 3D CUSTOMIZER
                </p>
              </div>
            </div>

            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="p-2 rounded-xl text-gray-400 hover:text-black hover:bg-gray-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 pt-4 border-b border-gray-100 bg-white">
            <button
              onClick={() => { sound.playClick(); setActiveTab('buildings'); }}
              className={`pb-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'buildings'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              <Layers className="w-4 h-4" />
              تصویر و مدل سه‌بعدی هر ساختمان
            </button>
            <button
              onClick={() => { sound.playClick(); setActiveTab('background'); }}
              className={`pb-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'background'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              تصویر پس‌زمینه رندر کلی
            </button>
            <button
              onClick={() => { sound.playClick(); setActiveTab('json'); }}
              className={`pb-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'json'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              <Copy className="w-4 h-4" />
              خروجی کانفیگ JSON
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {activeTab === 'buildings' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left Categories List */}
                <div className="md:col-span-4 space-y-2">
                  <span className="text-xs font-bold text-gray-400 block mb-2">
                    انتخاب ساختمان جهت ویرایش:
                  </span>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { sound.playClick(); setSelectedCatId(c.id); }}
                      className={`w-full p-3 rounded-2xl text-right transition-all flex items-center justify-between border ${
                        selectedCatId === c.id
                          ? 'bg-black text-white border-black shadow-md'
                          : 'bg-gray-50 text-gray-800 border-gray-100 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/20">
                          {c.categoryNumber}
                        </span>
                        <div>
                          <p className="text-xs font-bold">{c.title.split(' ')[0]}</p>
                          <p className="text-[10px] font-mono opacity-60">{c.projects.length} پروژه</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Right Settings */}
                <div className="md:col-span-8 bg-gray-50/80 p-6 rounded-3xl border border-gray-100 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        تنظیمات ساختمان: {currentCat.title}
                      </h4>
                      <p className="text-xs font-mono text-gray-400">{currentCat.englishTitle}</p>
                    </div>
                    <span className="font-mono text-xs font-bold px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg">
                      POS: {currentCat.position.x}% , {currentCat.position.y}%
                    </span>
                  </div>

                  {/* Image URL Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      آدرس عکس یا برش ساختمان (Building Image / Cutout URL):
                    </label>
                    <input
                      type="text"
                      value={currentCat.buildingImage || ''}
                      onChange={(e) => handleUpdateCurrentCat({ buildingImage: e.target.value })}
                      placeholder="https://... یا /assets/buildings/villa.png"
                      className="w-full px-3 py-2 rounded-xl text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    />
                  </div>

                  {/* GLB Model URL Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <Box className="w-3.5 h-3.5 text-blue-600" />
                      آدرس فایل مدل سه‌بعدی GLB (اختیاری):
                    </label>
                    <input
                      type="text"
                      value={currentCat.glbModelUrl || ''}
                      onChange={(e) => handleUpdateCurrentCat({ glbModelUrl: e.target.value })}
                      placeholder="https://.../model.glb"
                      className="w-full px-3 py-2 rounded-xl text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black bg-white font-mono"
                    />
                  </div>

                  {/* Position Sliders (X and Y percentage on canvas) */}
                  <div className="space-y-4 pt-2 border-t border-gray-200">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>موقعیت افقی در شهرک (X Axis):</span>
                        <span className="font-mono text-blue-600">{currentCat.position.x}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="95"
                        value={currentCat.position.x}
                        onChange={(e) => handlePositionChange('x', Number(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>موقعیت عمودی در شهرک (Y Axis):</span>
                        <span className="font-mono text-blue-600">{currentCat.position.y}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="90"
                        value={currentCat.position.y}
                        onChange={(e) => handlePositionChange('y', Number(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'background' && (
              <div className="space-y-6 max-w-2xl mx-auto py-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    آدرس عکس پس‌زمینه کلی شهرک / رندر ماکت (Masterplan Background Image):
                  </label>
                  <input
                    type="text"
                    value={settings.backgroundImageUrl}
                    onChange={(e) => onUpdateSettings({ backgroundImageUrl: e.target.value })}
                    placeholder="https://... یا /assets/city-render.jpg"
                    className="w-full px-4 py-2.5 rounded-2xl text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black bg-gray-50 font-mono"
                  />
                  <p className="text-[11px] text-gray-500 mt-2">
                    می‌توانید عکس رندر ماکت سفید یا تصویر هوایی خود را قرار دهید. دکمه‌های ساختمان‌ها روی آن قرار می‌گیرند.
                  </p>
                </div>

                {/* Background Preview */}
                <div className="relative h-56 rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
                  <img
                    src={settings.backgroundImageUrl}
                    alt="Background Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="glass-panel px-4 py-2 rounded-2xl text-xs font-bold text-black shadow-md">
                      پیش‌نمایش تصویر پس‌زمینه
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'json' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600">
                    می‌توانید این کانفیگ کامل را کپی کنید یا دانلود کنید تا همیشه در فایل‌های پروژه ذخیره بماند:
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyJSON}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-black text-white hover:bg-gray-800 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'کپی شد!' : 'کپی کانفیگ JSON'}
                    </button>
                    <button
                      onClick={handleDownloadJSON}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      دانلود فایل
                    </button>
                  </div>
                </div>

                <pre className="p-4 rounded-2xl bg-gray-950 text-gray-100 text-[11px] font-mono overflow-x-auto max-h-80 border border-gray-800 dir-ltr text-left">
                  {JSON.stringify({ settings, categories }, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              تغییرات شما به صورت آنی (Live) روی صفحه اعمال می‌شوند.
            </span>
            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="px-6 py-2 rounded-2xl bg-black text-white text-xs font-bold hover:bg-gray-800 transition-colors shadow-sm"
            >
              تایید و بازگشت
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
