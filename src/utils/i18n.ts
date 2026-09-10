// Multi-Language i18n Engine & Geolocation IP Detection
// Supported Languages: Catalan (ca), Persian (fa), Spanish (es), English (en), French (fr), German (de), Italian (it)

export type LanguageCode = 'ca' | 'fa' | 'es' | 'en' | 'fr' | 'de' | 'it';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'rtl' | 'ltr';
}

export const LANGUAGES: LanguageInfo[] = [
  { code: 'ca', name: 'Catalan', nativeName: 'Català', flag: '🏴󠁥󠁳󠁣󠁴󠁿', dir: 'ltr' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', dir: 'rtl' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
];

export interface TranslationDict {
  // Navigation & Header
  home3d: string;
  planIsometric: string;
  projectsArchive: string;
  resume: string;
  dublinBim: string;
  studioName: string;
  studioTagline: string;
  returnToHome: string;
  contactWhatsapp: string;
  customizer: string;
  soundToggle: string;
  menu: string;
  close: string;

  // 3D Canvas Controls & Lighting
  dayMode: string;
  sunsetMode: string;
  nightMode: string;
  overviewView: string;
  autoRotateStart: string;
  autoRotateStop: string;
  rotateHint: string;
  clickBuildingHint: string;
  projectsCount: string;
  exploreCategory: string;
  clickToEnter: string;

  // 5 Architectural Categories & Buildings
  zones: {
    'urban-design': {
      label: string;
      badge: string;
      desc: string;
    };
    'residential-luxury': {
      label: string;
      badge: string;
      desc: string;
    };
    'commercial-complexes': {
      label: string;
      badge: string;
      desc: string;
    };
    'retail-stores': {
      label: string;
      badge: string;
      desc: string;
    };
    'institutional-competitions': {
      label: string;
      badge: string;
      desc: string;
    };
  };

  // Drawer & Project Details
  registeredProjects: string;
  viewProject: string;
  location: string;
  year: string;
  area: string;
  typology: string;
  status: string;
  client: string;
  role: string;
  concept: string;
  features: string;
  bimSpecifications: string;
  software: string;
  backToOverview: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDict> = {
  ca: {
    home3d: 'Ciutat 3D',
    planIsometric: 'Plànol Isomètric',
    projectsArchive: 'Projectes',
    resume: 'Currículum',
    dublinBim: '🇮🇪 Demo Dublin BIM',
    studioName: 'SOHEIL MASTI',
    studioTagline: 'ARQUITECTE SÈNIOR I ESPECIALISTA BIM // BARCELONA',
    returnToHome: 'Tornar a la Maqueta 3D',
    contactWhatsapp: 'Contacte WhatsApp (+34 610 855 434)',
    customizer: 'Canviar Imatge / GLB',
    soundToggle: 'Àudio interactiu',
    menu: 'Menú',
    close: 'Tancar',

    dayMode: 'Dia SketchUp',
    sunsetMode: 'Posta de Sol Daurada',
    nightMode: 'Nit Arquitectònica',
    overviewView: 'Vista General',
    autoRotateStart: 'Rotació Automàtica',
    autoRotateStop: 'Aturar Rotació',
    rotateHint: 'Rotació 360°: clic i arrossegar ratolí',
    clickBuildingHint: 'Clica un edifici per explorar els seus projectes',
    projectsCount: 'projectes',
    exploreCategory: 'Explorar projectes',
    clickToEnter: 'Clica per entrar',

    zones: {
      'urban-design': {
        label: 'Disseny Urbà, Ports i Infraestructura',
        badge: 'ZONA 01',
        desc: 'Planificació urbana a gran escala, fronts marítims, canals i ponts sostenibles.'
      },
      'residential-luxury': {
        label: 'Residencial de Luxe i Xalets',
        badge: 'ZONA 02',
        desc: 'Arquitectura d’habitatges exclusius, àtics de disseny i xalets a Barcelona i internacionalment.'
      },
      'commercial-complexes': {
        label: 'Complexos Comercials, Oficines i Torres',
        badge: 'ZONA 03',
        desc: 'Megaprojectes comercials de fins a 52.000 m², torres d’oficines i integració BIM avançada.'
      },
      'retail-stores': {
        label: 'Botigues Concept i Espais Comercials',
        badge: 'ZONA 04',
        desc: 'Showrooms d’alta tecnologia, disseny interior per a Apple Store i experiència interactiva.'
      },
      'institutional-competitions': {
        label: 'Concursos d’Arquitectura i Edificis Públics',
        badge: 'ZONA 05',
        desc: 'Projectes guardonats en concursos nacionals, fars emblemàtics i seus institucionals.'
      }
    },

    registeredProjects: 'projectes registrats',
    viewProject: 'Veure Detalls',
    location: 'Ubicació',
    year: 'Any',
    area: 'Superfície',
    typology: 'Tipologia',
    status: 'Estat',
    client: 'Client',
    role: 'Rol',
    concept: 'Concepte Arquitectònic',
    features: 'Característiques Clau',
    bimSpecifications: 'Especificacions BIM i LOD',
    software: 'Programari Utilitzat',
    backToOverview: 'Tornar a la Maqueta'
  },

  fa: {
    home3d: 'شهرک سه‌بعدی',
    planIsometric: 'پلان ایزومتریک',
    projectsArchive: 'پروژه‌ها',
    resume: 'رزومه',
    dublinBim: '🇮🇪 دمو دوبلین (BIM)',
    studioName: 'سهیل مستی',
    studioTagline: 'معمار ارشد و متخصص BIM // بارسلون و تهران',
    returnToHome: 'بازگشت به ماکت سه‌بعدی',
    contactWhatsapp: 'تماس مستقیم در واتساپ (+34 610 855 434)',
    customizer: 'تعویض عکس / GLB',
    soundToggle: 'صدای تعاملی',
    menu: 'منو',
    close: 'بستن',

    dayMode: 'روز اسکچ‌آپ',
    sunsetMode: 'غروب طلایی',
    nightMode: 'شب معماری',
    overviewView: 'دید کلی',
    autoRotateStart: 'چرخش خودکار',
    autoRotateStop: 'توقف چرخش',
    rotateHint: 'چرخش ۳۶۰ درجه: کلیک چپ و درگ ماوس',
    clickBuildingHint: 'کلیک روی هر ساختمان = پرواز دوربین و باز شدن پروژه‌ها',
    projectsCount: 'پروژه',
    exploreCategory: 'مشاهده لیست پروژه‌ها',
    clickToEnter: 'کلیک برای ورود به پروژه‌ها',

    zones: {
      'urban-design': {
        label: 'طراحی شهری، بنادر و زیرساخت کلان',
        badge: 'زون ۰۱',
        desc: 'طراحی کلان سایت‌پلان‌های شهری، توسعه ساحلی، پل‌های ارتباطی و شبکه‌بندی پیاده‌محور.'
      },
      'residential-luxury': {
        label: 'پروژه‌های مسکونی لوکس و ویلاها',
        badge: 'زون ۰۲',
        desc: 'طراحی داخلی و معماری ویلاها، آپارتمان‌های مینیمال و پنت‌هاوس‌های لوکس در بارسلون و ایران.'
      },
      'commercial-complexes': {
        label: 'مجتمع‌های تجاری، اداری و برج‌ها',
        badge: 'زون ۰۳',
        desc: 'هدایت و طراحی مجتمع‌های تجاری مقیاس بزرگ تا ۵۲,۰۰۰ متر مربع و برج‌های فناوری.'
      },
      'retail-stores': {
        label: 'فروشگاه‌های کانسپت و شوروم‌ها',
        badge: 'زون ۰۴',
        desc: 'معماری و طراحی داخلی فروشگاه‌های تخصصی مانند اپل استور با قفسه‌بندی چوبی دست‌ساز.'
      },
      'institutional-competitions': {
        label: 'مسابقات معماری و پروژه‌های عمومی',
        badge: 'زون ۰۵',
        desc: 'طرح‌های برگزیده در مسابقات ملی معماری، ساختمان نظام مهندسی، المان فانوس دریایی و سردر سپاد.'
      }
    },

    registeredProjects: 'پروژه‌ی ثبت‌شده',
    viewProject: 'مشاهده جزئیات پروژه',
    location: 'موقعیت مکانی',
    year: 'سال طراحی / ساخت',
    area: 'زیربنا و متراژ',
    typology: 'گونه‌شناسی (Typology)',
    status: 'وضعیت پروژه',
    client: 'کارفرما',
    role: 'نقش در پروژه',
    concept: 'کانسپت و رویکرد طراحی',
    features: 'ویژگی‌های شاخص فنی',
    bimSpecifications: 'استانداردها و مشخصات BIM',
    software: 'نرم‌افزارهای تخصصی',
    backToOverview: 'بازگشت به ماکت شهرک'
  },

  es: {
    home3d: 'Ciudad 3D',
    planIsometric: 'Plano Isométrico',
    projectsArchive: 'Proyectos',
    resume: 'Currículum',
    dublinBim: '🇮🇪 Demo Dublin BIM',
    studioName: 'SOHEIL MASTI',
    studioTagline: 'ARQUITECTO SENIOR Y ESPECIALISTA BIM // BARCELONA',
    returnToHome: 'Volver a Maqueta 3D',
    contactWhatsapp: 'Contacto WhatsApp (+34 610 855 434)',
    customizer: 'Cambiar Imagen / GLB',
    soundToggle: 'Audio interactivo',
    menu: 'Menú',
    close: 'Cerrar',

    dayMode: 'Día SketchUp',
    sunsetMode: 'Atardecer Dorado',
    nightMode: 'Noche Arquitectónica',
    overviewView: 'Vista General',
    autoRotateStart: 'Rotación Automática',
    autoRotateStop: 'Detener Rotación',
    rotateHint: 'Rotación 360°: clic y arrastrar ratón',
    clickBuildingHint: 'Haz clic en un edificio para ver sus proyectos',
    projectsCount: 'proyectos',
    exploreCategory: 'Ver proyectos',
    clickToEnter: 'Clic para entrar',

    zones: {
      'urban-design': {
        label: 'Diseño Urbano, Puertos e Infraestructura',
        badge: 'ZONA 01',
        desc: 'Planificación urbana a gran escala, frentes marítimos, canales y puentes peatonales.'
      },
      'residential-luxury': {
        label: 'Residencial de Lujo y Villas',
        badge: 'ZONA 02',
        desc: 'Arquitectura de viviendas exclusivas, áticos de diseño y villas en Barcelona e internacionalmente.'
      },
      'commercial-complexes': {
        label: 'Complejos Comerciales, Oficinas y Torres',
        badge: 'ZONA 03',
        desc: 'Megaproyectos comerciales de hasta 52.000 m², torres corporativas y modelado BIM avanzado.'
      },
      'retail-stores': {
        label: 'Tiendas Concept y Espacios Comerciales',
        badge: 'ZONA 04',
        desc: 'Showrooms de tecnología digital, diseño interior para Apple Store y retail contemporáneo.'
      },
      'institutional-competitions': {
        label: 'Concursos de Arquitectura y Edificios Públicos',
        badge: 'ZONA 05',
        desc: 'Proyectos galardonados en concursos nacionales, faros emblemáticos y sedes institucionales.'
      }
    },

    registeredProjects: 'proyectos registrados',
    viewProject: 'Ver Detalles',
    location: 'Ubicación',
    year: 'Año',
    area: 'Superficie',
    typology: 'Tipología',
    status: 'Estado',
    client: 'Cliente',
    role: 'Rol',
    concept: 'Concepto Arquitectónico',
    features: 'Características Clave',
    bimSpecifications: 'Especificaciones BIM y LOD',
    software: 'Software Utilizado',
    backToOverview: 'Volver a Maqueta'
  },

  en: {
    home3d: '3D Cityscape',
    planIsometric: 'Isometric Plan',
    projectsArchive: 'Projects',
    resume: 'Resume / CV',
    dublinBim: '🇮🇪 Dublin BIM Audit',
    studioName: 'SOHEIL MASTI',
    studioTagline: 'SENIOR ARCHITECT & BIM SPECIALIST // BARCELONA & TEHRAN',
    returnToHome: 'Back to 3D Masterplan',
    contactWhatsapp: 'WhatsApp Contact (+34 610 855 434)',
    customizer: 'Change Image / GLB',
    soundToggle: 'Interactive Audio',
    menu: 'Menu',
    close: 'Close',

    dayMode: 'SketchUp Daylight',
    sunsetMode: 'Golden Sunset',
    nightMode: 'Architectural Night',
    overviewView: 'Overview',
    autoRotateStart: 'Auto Rotate',
    autoRotateStop: 'Stop Rotation',
    rotateHint: '360° Orbit: Left click & drag mouse',
    clickBuildingHint: 'Click any building to fly in & view its portfolio',
    projectsCount: 'projects',
    exploreCategory: 'Explore projects',
    clickToEnter: 'Click to open projects',

    zones: {
      'urban-design': {
        label: 'Urban Design, Ports & Infrastructure',
        badge: 'ZONE 01',
        desc: 'Large-scale urban masterplans, coastal waterfront developments, and pedestrian bridge networks.'
      },
      'residential-luxury': {
        label: 'Luxury Residential & Alpine Penthouses',
        badge: 'ZONE 02',
        desc: 'High-end villas, minimal apartments, and alpine penthouses across Barcelona, Tehran, and international sites.'
      },
      'commercial-complexes': {
        label: 'Commercial Complexes & Office Towers',
        badge: 'ZONE 03',
        desc: '52,000 m² commercial mega-complexes, modern office headquarters, and 7-story BIM towers.'
      },
      'retail-stores': {
        label: 'Concept Stores & Tech Showrooms',
        badge: 'ZONE 04',
        desc: 'Digital retail architecture, bespoke timber joinery, and Apple Store concept spaces.'
      },
      'institutional-competitions': {
        label: 'Architecture Competitions & Landmarks',
        badge: 'ZONE 05',
        desc: 'Award-winning competition designs, institutional headquarters, and maritime landmarks.'
      }
    },

    registeredProjects: 'projects documented',
    viewProject: 'View Project Details',
    location: 'Location',
    year: 'Year',
    area: 'Gross Area',
    typology: 'Typology',
    status: 'Project Status',
    client: 'Client',
    role: 'Architectural Role',
    concept: 'Design Concept',
    features: 'Technical Highlights',
    bimSpecifications: 'BIM Specs & LOD Level',
    software: 'Software Stack',
    backToOverview: 'Back to Masterplan'
  },

  fr: {
    home3d: 'Ville 3D',
    planIsometric: 'Plan Isométrique',
    projectsArchive: 'Projets',
    resume: 'Curriculum Vitae',
    dublinBim: '🇮🇪 Démo Dublin BIM',
    studioName: 'SOHEIL MASTI',
    studioTagline: 'ARCHITECTE SENIOR & SPÉCIALISTE BIM // BARCELONE',
    returnToHome: 'Retour à la Maquette 3D',
    contactWhatsapp: 'Contact WhatsApp (+34 610 855 434)',
    customizer: 'Changer Image / GLB',
    soundToggle: 'Audio Interactif',
    menu: 'Menu',
    close: 'Fermer',

    dayMode: 'Jour SketchUp',
    sunsetMode: 'Coucher de Soleil',
    nightMode: 'Nuit Architecturale',
    overviewView: 'Vue Générale',
    autoRotateStart: 'Rotation Auto',
    autoRotateStop: 'Arrêter Rotation',
    rotateHint: 'Orbite 360° : clic gauche et glisser',
    clickBuildingHint: 'Cliquez sur un bâtiment pour explorer ses projets',
    projectsCount: 'projets',
    exploreCategory: 'Explorer les projets',
    clickToEnter: 'Cliquer pour entrer',

    zones: {
      'urban-design': {
        label: 'Design Urbain, Ports & Infrastructure',
        badge: 'ZONE 01',
        desc: 'Masterplans urbains à grande échelle, développement côtier et réseaux piétons durables.'
      },
      'residential-luxury': {
        label: 'Résidentiel de Luxe & Villas',
        badge: 'ZONE 02',
        desc: 'Architecture résidentielle haut de gamme, penthouses minimalistes et villas exclusives.'
      },
      'commercial-complexes': {
        label: 'Complexes Commerciaux & Tours',
        badge: 'ZONE 03',
        desc: 'Méga-complexes commerciaux jusqu’à 52 000 m², sièges d’entreprises et gestion BIM poussée.'
      },
      'retail-stores': {
        label: 'Boutiques Concept & Showrooms',
        badge: 'ZONE 04',
        desc: 'Espaces de vente technologiques, menuiserie sur mesure et concepts type Apple Store.'
      },
      'institutional-competitions': {
        label: 'Concours d’Architecture & Édifices Publics',
        badge: 'ZONE 05',
        desc: 'Projets lauréats de concours nationaux, phares emblématiques et sièges institutionnels.'
      }
    },

    registeredProjects: 'projets documentés',
    viewProject: 'Voir les Détails',
    location: 'Emplacement',
    year: 'Année',
    area: 'Surface',
    typology: 'Typologie',
    status: 'Statut',
    client: 'Client',
    role: 'Rôle',
    concept: 'Concept Architectural',
    features: 'Points Forts',
    bimSpecifications: 'Spécifications BIM & LOD',
    software: 'Logiciels Utilisés',
    backToOverview: 'Retour à la Maquette'
  },

  de: {
    home3d: '3D-Stadtmodell',
    planIsometric: 'Isometrischer Plan',
    projectsArchive: 'Projekte',
    resume: 'Lebenslauf',
    dublinBim: '🇮🇪 Dublin BIM-Audit',
    studioName: 'SOHEIL MASTI',
    studioTagline: 'SENIOR-ARCHITEKT & BIM-SPEZIALIST // BARCELONA',
    returnToHome: 'Zurück zum 3D-Modell',
    contactWhatsapp: 'WhatsApp-Kontakt (+34 610 855 434)',
    customizer: 'Bild / GLB ändern',
    soundToggle: 'Interaktiver Ton',
    menu: 'Menü',
    close: 'Schließen',

    dayMode: 'SketchUp-Tageslicht',
    sunsetMode: 'Goldener Sonnenuntergang',
    nightMode: 'Architektonische Nacht',
    overviewView: 'Gesamtansicht',
    autoRotateStart: 'Auto-Rotation',
    autoRotateStop: 'Rotation Stoppen',
    rotateHint: '360°-Drehung: Linksklick und Maus ziehen',
    clickBuildingHint: 'Klicken Sie auf ein Gebäude, um Projekte zu öffnen',
    projectsCount: 'Projekte',
    exploreCategory: 'Projekte ansehen',
    clickToEnter: 'Klicken zum Öffnen',

    zones: {
      'urban-design': {
        label: 'Städtebau, Häfen & Infrastruktur',
        badge: 'ZONE 01',
        desc: 'Großflächige Masterpläne, Uferpromenaden, nachhaltige Stadtbrücken und Fußgängerzonen.'
      },
      'residential-luxury': {
        label: 'Luxuswohnungsbau & Villen',
        badge: 'ZONE 02',
        desc: 'High-End-Villen, minimalistische Wohnungen und alpine Penthäuser in Barcelona und international.'
      },
      'commercial-complexes': {
        label: 'Gewerbekomplexe & Bürotürme',
        badge: 'ZONE 03',
        desc: 'Großprojekte mit bis zu 52.000 m², moderne Bürogebäude und BIM-gestützte Hochhaustürme.'
      },
      'retail-stores': {
        label: 'Konzept-Stores & Tech-Showrooms',
        badge: 'ZONE 04',
        desc: 'Digitale Markenräume, handgefertigte Holzmöblierung und Apple Store-Konzepte.'
      },
      'institutional-competitions': {
        label: 'Architekturwettbewerbe & Öffentliche Bauten',
        badge: 'ZONE 05',
        desc: 'Ausgezeichnete Wettbewerbsentwürfe, Landmark-Leuchttürme und offizielle Verbandsgebäude.'
      }
    },

    registeredProjects: 'dokumentierte Projekte',
    viewProject: 'Details Anzeigen',
    location: 'Standort',
    year: 'Jahr',
    area: 'Fläche',
    typology: 'Typologie',
    status: 'Projektstatus',
    client: 'Bauherr',
    role: 'Rolle im Projekt',
    concept: 'Entwurfskonzept',
    features: 'Besondere Merkmale',
    bimSpecifications: 'BIM-Spezifikationen & LOD',
    software: 'Verwendete Software',
    backToOverview: 'Zurück zum Modell'
  },

  it: {
    home3d: 'Città 3D',
    planIsometric: 'Piano Assonometrico',
    projectsArchive: 'Progetti',
    resume: 'Curriculum Vitae',
    dublinBim: '🇮🇪 Demo Dublin BIM',
    studioName: 'SOHEIL MASTI',
    studioTagline: 'ARCHITETTO SENIOR E SPECIALISTA BIM // BARCELLONA',
    returnToHome: 'Torna al Modello 3D',
    contactWhatsapp: 'Contatto WhatsApp (+34 610 855 434)',
    customizer: 'Cambia Immagine / GLB',
    soundToggle: 'Audio Interattivo',
    menu: 'Menu',
    close: 'Chiudi',

    dayMode: 'Giorno SketchUp',
    sunsetMode: 'Tramonto Dorato',
    nightMode: 'Notte Architettonica',
    overviewView: 'Vista Generale',
    autoRotateStart: 'Rotazione Auto',
    autoRotateStop: 'Ferma Rotazione',
    rotateHint: 'Rotazione 360°: clic sinistro e trascina mouse',
    clickBuildingHint: 'Clicca su un edificio per visualizzare i progetti',
    projectsCount: 'progetti',
    exploreCategory: 'Esplora progetti',
    clickToEnter: 'Clicca per entrare',

    zones: {
      'urban-design': {
        label: 'Progettazione Urbana, Porti e Infrastrutture',
        badge: 'ZONA 01',
        desc: 'Masterplan urbani su larga scala, sviluppo costiero e passerelle pedonali sostenibili.'
      },
      'residential-luxury': {
        label: 'Residenziale di Lusso e Ville',
        badge: 'ZONA 02',
        desc: 'Architettura abitativa d’élite, attici alpini e ville di design a Barcellona e all’estero.'
      },
      'commercial-complexes': {
        label: 'Complessi Commerciali, Uffici e Torri',
        badge: 'ZONA 03',
        desc: 'Mega-complessi commerciali fino a 52.000 m², torri per uffici e coordinamento BIM avanzato.'
      },
      'retail-stores': {
        label: 'Concept Store e Showroom',
        badge: 'ZONA 04',
        desc: 'Spazi commerciali digitali contemporanei, arredi in legno su misura e concept Apple Store.'
      },
      'institutional-competitions': {
        label: 'Concorsi di Architettura ed Edifici Pubblici',
        badge: 'ZONA 05',
        desc: 'Progetti premiati in concorsi nazionali, fari monumentali e sedi istituzionali.'
      }
    },

    registeredProjects: 'progetti documentati',
    viewProject: 'Visualizza Dettagli',
    location: 'Posizione',
    year: 'Anno',
    area: 'Superficie',
    typology: 'Tipologia',
    status: 'Stato',
    client: 'Committente',
    role: 'Ruolo',
    concept: 'Concetto Architettonico',
    features: 'Caratteristiche Principali',
    bimSpecifications: 'Specifiche BIM e LOD',
    software: 'Software Utilizzati',
    backToOverview: 'Torna al Modello'
  }
};

/**
 * Smart IP Geolocation Detection Function
 * Resolves visitor's country & region without blocking:
 * - Catalonia / Barcelona (CT) -> Catalan (ca)
 * - Iran (IR) -> Persian (fa)
 * - Spain outside Catalonia (ES) / LatAm -> Spanish (es)
 * - France (FR) / Belgium (BE) -> French (fr)
 * - Germany (DE) / Austria (AT) / Switzerland (CH) -> German (de)
 * - Italy (IT) -> Italian (it)
 * - All other global countries -> English (en)
 */
export async function detectVisitorLanguage(): Promise<LanguageCode> {
  // 1. Check if user already manually selected a language
  const saved = localStorage.getItem('preferred_language') as LanguageCode | null;
  if (saved && (saved in TRANSLATIONS)) {
    return saved;
  }

  // 2. Fetch IP Geolocation via fast, CORS-enabled service (2.2s timeout)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2200);

    const res = await fetch('https://ipwho.is/', { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        const country = (data.country_code || '').toUpperCase();
        const region = (data.region_code || '').toUpperCase();
        const regionName = (data.region || '').toLowerCase();
        const cityName = (data.city || '').toLowerCase();

        // Check for Catalonia / Barcelona first (requested specifically!)
        const isCatalonia = 
          country === 'ES' && 
          (region === 'CT' || regionName.includes('catal') || cityName.includes('barcelona') || cityName.includes('girona') || cityName.includes('tarragona') || cityName.includes('lleida'));

        if (isCatalonia) {
          return 'ca';
        }

        // Persian for Iran
        if (country === 'IR' || country === 'AF') {
          return 'fa';
        }

        // Spanish for Spain (outside Catalonia) & Latin America
        const spanishCountries = ['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY'];
        if (spanishCountries.includes(country)) {
          return 'es';
        }

        // French for France, Belgium, etc.
        if (country === 'FR' || country === 'MC') {
          return 'fr';
        }

        // German for Germany, Austria, Switzerland
        if (country === 'DE' || country === 'AT' || (country === 'CH' && !regionName.includes('genev'))) {
          return 'de';
        }

        // Italian for Italy
        if (country === 'IT' || country === 'SM' || country === 'VA') {
          return 'it';
        }

        // Default to English for all other countries in the world
        return 'en';
      }
    }
  } catch (err) {
    // Graceful fallback to browser navigator language
    console.debug('IP geolocation lookup skipped or timed out, falling back to navigator locale', err);
  }

  // 3. Fallback: Browser navigator language
  const browserLang = (navigator.language || navigator.languages?.[0] || 'en').toLowerCase();
  if (browserLang.startsWith('ca')) return 'ca';
  if (browserLang.startsWith('fa')) return 'fa';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('de')) return 'de';
  if (browserLang.startsWith('it')) return 'it';

  // Global default
  return 'en';
}
