import React, { useState, useEffect, useMemo } from 'react';
import { Home } from 'lucide-react';
import { Header } from './components/Header';
import { ThreeDClayCanvas } from './components/ThreeDClayCanvas';
import { MasterIndexView } from './components/MasterIndexView';
import { ResumeProfileView } from './components/ResumeProfileView';
import { DublinTechHubShowcase } from './components/DublinTechHubShowcase';
import { ProjectDrawer } from './components/ProjectDrawer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AssetCustomizerModal } from './components/AssetCustomizerModal';
import { AboutStudioModal } from './components/AboutStudioModal';
import { INITIAL_CATEGORIES, INITIAL_SETTINGS } from './data/initialData';
import { CategoryBuilding, Project, SiteSettings } from './types';
import { sound } from './utils/audio';
import { LanguageCode, detectVisitorLanguage, saveLanguagePreference, getInitialLanguage, TRANSLATIONS } from './utils/i18n';
import { getLocalizedCategories, getLocalizedCategory, getLocalizedProject } from './utils/localizedData';

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

  const localizedCategories = useMemo(() => {
    return getLocalizedCategories(categories, language);
  }, [categories, language]);

  const activeLocalizedCategory = useMemo(() => {
    return selectedCategory ? getLocalizedCategory(selectedCategory, language) : null;
  }, [selectedCategory, language]);

  const activeLocalizedProject = useMemo(() => {
    return selectedProject ? getLocalizedProject(selectedProject, language) : null;
  }, [selectedProject, language]);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const isRTL = language === 'fa';
  const totalProjectsCount = localizedCategories.reduce((acc, cat) => acc + cat.projects.length, 0);
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
        categoriesCount={localizedCategories.length}
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Content by Active View */}
      <main className="w-full h-full">
        {settings.activeView === 'grid' && (
          <MasterIndexView
            categories={localizedCategories}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onBackToMaquette={handleResetToHome}
            currentLanguage={language}
          />
        )}

        {settings.activeView === 'resume' && (
          <ResumeProfileView
            onBackToMaquette={handleResetToHome}
            currentLanguage={language}
          />
        )}

        {settings.activeView === 'dublin-bim-audit' && (
          <DublinTechHubShowcase
            onBackToMaquette={handleResetToHome}
            onBackToPortfolio={handleResetToHome}
            currentLanguage={language}
          />
        )}

        {settings.activeView !== 'grid' && settings.activeView !== 'resume' && settings.activeView !== 'dublin-bim-audit' && (
          <ThreeDClayCanvas
            categories={localizedCategories}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            selectedCategory={selectedCategory}
            currentLanguage={language}
          />
        )}
      </main>

      {/* Universal Floating Home Button (Desktop & Tablet) */}
      {isOutsideHome && (
        <button
          onClick={handleResetToHome}
          className={`fixed bottom-5 ${isRTL ? 'left-5' : 'right-5'} z-40 hidden sm:flex glass-panel px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-clay-lg items-center gap-2 text-xs font-black text-gray-900 bg-white/95 hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-blue-500/40 pointer-events-auto cursor-pointer`}
          title={t.returnToHome}
        >
          <Home className="w-4 h-4 text-blue-600 group-hover:text-white shrink-0" />
          <span>{t.returnToHome}</span>
        </button>
      )}

      {/* Project Category Slide-over Drawer */}
      <ProjectDrawer
        category={activeLocalizedCategory}
        onClose={() => setSelectedCategory(null)}
        onSelectProject={(proj) => setSelectedProject(proj)}
        currentLanguage={language}
      />

      {/* Project Fullscreen Detail & Gallery Lightbox */}
      <ProjectDetailModal
        project={activeLocalizedProject}
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
        currentLanguage={language}
      />

      {/* About Studio Modal */}
      <AboutStudioModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        currentLanguage={language}
      />
    </div>
  );
};

export default App;
