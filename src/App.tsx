import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { Header } from './components/Header';
import { MaquetteIsometricCanvas } from './components/MaquetteIsometricCanvas';
import { ThreeDClayCanvas } from './components/ThreeDClayCanvas';
import { MasterIndexView } from './components/MasterIndexView';
import { ResumeProfileView } from './components/ResumeProfileView';
import { DublinTechHubShowcase } from './components/DublinTechHubShowcase';
import { ProjectDrawer } from './components/ProjectDrawer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AssetCustomizerModal } from './components/AssetCustomizerModal';
import { AboutStudioModal } from './components/AboutStudioModal';
import { BottomToolbar } from './components/BottomToolbar';
import { INITIAL_CATEGORIES, INITIAL_SETTINGS } from './data/initialData';
import { CategoryBuilding, Project, SiteSettings } from './types';
import { sound } from './utils/audio';
import { LanguageCode, detectVisitorLanguage, saveLanguagePreference, getInitialLanguage, TRANSLATIONS } from './utils/i18n';

export const App: React.FC = () => {
  const [categories, setCategories] = useState<CategoryBuilding[]>(INITIAL_CATEGORIES);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [selectedCategory, setSelectedCategory] = useState<CategoryBuilding | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // 7-Language State with Smart IP Detection & Persistent Cookie
  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage);

  // Detect Visitor Language on first load (Cookie -> localStorage -> IP Geolocation)
  useEffect(() => {
    detectVisitorLanguage().then((detected) => {
      setLanguage(detected);
    });
  }, []);

  // Update HTML document attributes on language change & sync to cookie
  useEffect(() => {
    const isRTL = language === 'fa';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    saveLanguagePreference(language);
  }, [language]);

  const handleLanguageChange = (newLang: LanguageCode) => {
    saveLanguagePreference(newLang);
    setLanguage(newLang);
  };

  const handleUpdateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleUpdateCategories = (newCategories: CategoryBuilding[]) => {
    setCategories(newCategories);
  };

  const handleResetToHome = () => {
    sound.playClick();
    setSelectedCategory(null);
    setSelectedProject(null);
    setIsCustomizerOpen(false);
    setIsAboutOpen(false);
    handleUpdateSettings({ activeView: '3d' });
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const isRTL = language === 'fa';
  const totalProjectsCount = categories.reduce((acc, cat) => acc + cat.projects.length, 0);
  const isOutsideHome = settings.activeView !== '3d';

  return (
    <div 
      className="relative min-h-screen bg-[#f5f6f8] text-gray-900 font-sans select-none overflow-x-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Top Header with Language Selector & Mobile View Navigation */}
      <Header
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        totalProjectsCount={totalProjectsCount}
        categoriesCount={categories.length}
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Content by Active View */}
      <main className="w-full h-full">
        {settings.activeView === 'maquette' && (
          <MaquetteIsometricCanvas
            categories={categories}
            settings={settings}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            selectedCategory={selectedCategory}
          />
        )}

        {settings.activeView === '3d' && (
          <ThreeDClayCanvas
            categories={categories}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            selectedCategory={selectedCategory}
            currentLanguage={language}
          />
        )}

        {settings.activeView === 'grid' && (
          <MasterIndexView
            categories={categories}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onBackToMaquette={handleResetToHome}
          />
        )}

        {settings.activeView === 'resume' && (
          <ResumeProfileView
            onBackToMaquette={handleResetToHome}
          />
        )}

        {settings.activeView === 'dublin-bim-audit' && (
          <DublinTechHubShowcase
            onBackToMaquette={handleResetToHome}
            onBackToPortfolio={handleResetToHome}
          />
        )}
      </main>

      {/* Universal Floating Home Button (Always available when outside 3D Cityscape) */}
      {isOutsideHome && (
        <button
          onClick={handleResetToHome}
          className={`fixed bottom-5 ${isRTL ? 'left-5' : 'right-5'} z-50 glass-panel px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-clay-lg flex items-center gap-2 text-xs font-black text-gray-900 bg-white/95 hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-blue-500/40 pointer-events-auto cursor-pointer`}
          title={t.returnToHome}
        >
          <Home className="w-4 h-4 text-blue-600 group-hover:text-white shrink-0" />
          <span className="hidden sm:inline">{t.returnToHome}</span>
          <span className="inline sm:hidden">Home</span>
        </button>
      )}

      {/* Bottom Floating Toolbar (for Maquette View only) */}
      <BottomToolbar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => { sound.playDrawerOpen(); setSelectedCategory(cat); }}
        activeView={settings.activeView}
      />

      {/* Project Category Slide-over Drawer */}
      <ProjectDrawer
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
        onSelectProject={(proj) => setSelectedProject(proj)}
        currentLanguage={language}
      />

      {/* Project Fullscreen Detail & Gallery Lightbox */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        currentLanguage={language}
      />

      {/* Live Customizer & JSON Manager */}
      <AssetCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        categories={categories}
        onUpdateCategories={handleUpdateCategories}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />

      {/* About Studio Modal */}
      <AboutStudioModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
};

export default App;
