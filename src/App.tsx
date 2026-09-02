import React, { useState } from 'react';
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

export const App: React.FC = () => {
  const [categories, setCategories] = useState<CategoryBuilding[]>(INITIAL_CATEGORIES);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [selectedCategory, setSelectedCategory] = useState<CategoryBuilding | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleUpdateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleUpdateCategories = (newCategories: CategoryBuilding[]) => {
    setCategories(newCategories);
  };

  const totalProjectsCount = categories.reduce((acc, cat) => acc + cat.projects.length, 0);

  return (
    <div className="relative min-h-screen bg-[#f5f6f8] text-gray-900 font-sans select-none overflow-x-hidden">
      {/* Top Header */}
      <Header
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        totalProjectsCount={totalProjectsCount}
        categoriesCount={categories.length}
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
          />
        )}

        {settings.activeView === 'grid' && (
          <MasterIndexView
            categories={categories}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onBackToMaquette={() => handleUpdateSettings({ activeView: 'maquette' })}
          />
        )}

        {settings.activeView === 'resume' && (
          <ResumeProfileView
            onBackToMaquette={() => handleUpdateSettings({ activeView: 'maquette' })}
          />
        )}

        {settings.activeView === 'dublin-bim-audit' && (
          <DublinTechHubShowcase
            onBackToMaquette={() => handleUpdateSettings({ activeView: 'maquette' })}
          />
        )}
      </main>

      {/* Bottom Floating Toolbar (for Maquette & 3D Views) */}
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
      />

      {/* Project Fullscreen Detail & Gallery Lightbox */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
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
