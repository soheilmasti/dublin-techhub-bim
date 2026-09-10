export interface Project {
  id: string;
  title: string;
  englishTitle: string;
  location: string;
  year: string;
  area: string;
  typology: string;
  status: string;
  client?: string;
  role?: string;
  coverImage: string;
  gallery: string[];
  plans?: string[];
  concept: string;
  features?: string[];
  model3dUrl?: string; // Optional GLB model URL for 3D inspection
  bimSpecs?: {
    lodLevel?: string;
    softwareUsed?: string[];
    coordination?: string;
  };
}

export interface CategoryBuilding {
  id: string;
  categoryNumber: string;
  title: string;
  englishTitle: string;
  description: string;
  iconName: string;
  // Position on the 2.5D interactive canvas (in percentages)
  position: {
    x: number; // 0 to 100 (%)
    y: number; // 0 to 100 (%)
    width?: number; // optional width in %
    height?: number;
  };
  // 3D coordinates for Three.js WebGL mode
  position3D?: [number, number, number];
  size3D?: [number, number, number];
  buildingType?: 'villa' | 'tower' | 'commercial' | 'retail' | 'pavilion' | 'urban-bridge';
  // Building custom cutout/image URL or GLB URL
  buildingImage?: string;
  glbModelUrl?: string;
  colorAccent?: string;
  projects: Project[];
}

export interface ResumeProfile {
  name: string;
  englishName: string;
  title: string;
  englishTitle: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  instagram: string;
  bio: string;
  experienceYears: number;
  education: {
    degree: string;
    university: string;
    year: string;
    location: string;
  }[];
  experience: {
    role: string;
    company: string;
    period: string;
    location: string;
    highlights: string[];
  }[];
  competencies: {
    category: string;
    skills: string[];
  }[];
  awards: {
    title: string;
    year: string;
    rank: string;
  }[];
  references: {
    name: string;
    role: string;
    quote: string;
  }[];
}

export interface SiteSettings {
  studioName: string;
  studioTagline: string;
  backgroundImageUrl: string;
  maquetteStyle: 'clay-white' | 'clay-warm' | 'blueprint-neon' | 'twilight-night';
  activeView: 'maquette' | 'grid' | '3d' | 'resume' | 'dublin-bim-audit';
  soundEnabled: boolean;
}
