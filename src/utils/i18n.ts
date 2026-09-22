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
  planIsometric?: string;
  projectsArchive: string;
  resume: string;
  dublinBim: string;
  bimOutsourcing?: string;
  bimOutsourcingBadge?: string;
  clientPortal?: string;
  clientPortalBadge?: string;
  partners?: string;
  partnersBadge?: string;
  askAiAboutUs?: string;
  studioName: string;
  studioTagline: string;
  returnToHome: string;
  contactWhatsapp: string;
  customizer: string;
  soundToggle: string;
  menu: string;
  close: string;

  // Media tabs
  gallery: string;
  plans: string;

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
    'urban-design': { label: string; badge: string; desc: string; };
    'residential-luxury': { label: string; badge: string; desc: string; };
    'commercial-complexes': { label: string; badge: string; desc: string; };
    'retail-stores': { label: string; badge: string; desc: string; };
    'institutional-competitions': { label: string; badge: string; desc: string; };
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

  // Sub-components
  aboutStudio: {
    title: string;
    tagline: string;
    p1: string;
    p2: string;
    emailLabel: string;
    phoneLabel: string;
    addressLabel: string;
    addressValue: string;
    close: string;
  };

  customizerModal: {
    title: string;
    subtitle: string;
    tabBuildings: string;
    tabBackground: string;
    tabJson: string;
    copyJson: string;
    copied: string;
    downloadJson: string;
    selectCategory: string;
    posX: string;
    posY: string;
    close: string;
  };

  archive: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allFilter: string;
    noResults: string;
  };

  resumeView: {
    backToPortfolio: string;
    experienceBadge: string;
    sendEmail: string;
    downloadCv: string;
    workExperience: string;
    education: string;
    competencies: string;
    awards: string;
    references: string;
  };

  dublinAuditView: {
    backToPortfolio: string;
    headerTitle: string;
    headerBadge: string;
    tabOverview: string;
    tabMep: string;
    tabDataCenter: string;
    tabCompliance: string;
    complianceScore: string;
  };

  bottomToolbar: {
    zonesLabel: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDict> = {
  ca: {
    home3d: 'Portafoli de Projectes',
    planIsometric: 'Plànol Isomètric',
    projectsArchive: 'Projectes',
    resume: 'Currículum',
    dublinBim: '🇮🇪 Demo Dublin BIM',
    bimOutsourcing: 'Externalització i Modelat BIM',
    bimOutsourcingBadge: 'Estalvi 50%',
    clientPortal: 'Portal de Clients i Comandes',
    clientPortalBadge: 'Seguiment en Viu',
    partners: 'Col·laboradors i Talent',
    partnersBadge: 'Uneix-te',
    askAiAboutUs: 'Pregunta a la IA sobre BIMCO',
    studioName: 'BIMCO',
    studioTagline: 'ESTUDI D’ARQUITECTURA I EXTERNALITZACIÓ BIM // SOHEIL MASTI',
    returnToHome: 'Tornar al Portafoli de Treballs',
    contactWhatsapp: 'Contacte WhatsApp (+34 610 855 434)',
    customizer: 'Personalitzar 3D / GLB',
    soundToggle: 'Àudio interactiu',
    menu: 'Menú',
    close: 'Tancar',

    gallery: 'Galeria d’Imatges',
    plans: 'Plànols i Esquemes',

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
    backToOverview: 'Tornar al Portafoli',

    aboutStudio: {
      title: 'Atelier d’Arquitectura i Urbanisme Contemporani',
      tagline: 'SOHEIL MASTI ARCHITECTURE STUDIO // BARCELONA & TEHERAN',
      p1: 'Creiem que l’arquitectura és l’art d’organitzar l’espai, la llum i la matèria en la seva forma més pura. Aquest espai interactiu us convida a recórrer el nostre treball, des de viles de muntanya fins a grans torres corporatives.',
      p2: 'La nostra metodologia es fonamenta en la simplicitat radical, el compromís bioclimàtic, la sostenibilitat i la integració de processos BIM LOD 350/400 d’alta precisió.',
      emailLabel: 'Correu Electrònic',
      phoneLabel: 'Telèfon de Contacte',
      addressLabel: 'Adreça de l’Estudi',
      addressValue: 'Sant Cugat del Vallès, Barcelona, Catalunya | Teheran',
      close: 'Tancar'
    },

    customizerModal: {
      title: 'Personalitzador d’Actius i Models 3D',
      subtitle: 'LIVE ASSET, POSITION & GLB 3D CUSTOMIZER',
      tabBuildings: 'Edificis 3D',
      tabBackground: 'Fons i Imatges',
      tabJson: 'Configuració JSON',
      copyJson: 'Copiar JSON',
      copied: 'Copiat al portapapers!',
      downloadJson: 'Descarregar Arxiu JSON',
      selectCategory: 'Selecciona una zona arquitectònica:',
      posX: 'Posició Horitzontal X (%)',
      posY: 'Posició Vertical Y (%)',
      close: 'Tancar'
    },

    archive: {
      title: 'Catàleg i Arxiu Complet de Projectes',
      subtitle: 'SOHEIL MASTI ARCHITECTURE & BIM PORTFOLIO',
      searchPlaceholder: 'Cercar projecte, Barcelona, Darbandsara...',
      allFilter: 'Tots els Projectes',
      noResults: 'No s’han trobat projectes amb aquests termes.'
    },

    resumeView: {
      backToPortfolio: 'Tornar al Portafoli de Treballs',
      experienceBadge: 'MÉS DE 15 ANYS D’EXPERIÈNCIA INTERNACIONAL',
      sendEmail: 'Enviar Correu a Soheil Masti',
      downloadCv: 'Descarregar CV Complet',
      workExperience: 'Trajectòria Professional',
      education: 'Formació Acadèmica',
      competencies: 'Competències Tècniques i BIM',
      awards: 'Premis i Concursos d’Arquitectura',
      references: 'Referències Professionals'
    },

    dublinAuditView: {
      backToPortfolio: 'Tornar al Portafoli de Treballs',
      headerTitle: 'Torre Dublin Tech Hub de 7 Plantes & Auditoria BIM LOD 350',
      headerBadge: 'ESTÀNDARD BREEAM EXCELLENT // DUBLÍN, IRLANDA',
      tabOverview: 'Visió General',
      tabMep: 'Sistemes MEP i Estructures',
      tabDataCenter: 'Centre de Dades Tier-3',
      tabCompliance: 'Auditoria de Compliment BIM',
      complianceScore: 'Puntuació de Compliment BIM'
    },

    bottomToolbar: {
      zonesLabel: 'ZONES //'
    }
  },

  fa: {
    home3d: 'پورتفولیو کارها',
    planIsometric: 'پلان ایزومتریک',
    projectsArchive: 'پروژه‌ها',
    resume: 'رزومه',
    dublinBim: '🇮🇪 دمو دوبلین (BIM)',
    bimOutsourcing: 'برون‌سپاری و مدل‌سازی BIM',
    bimOutsourcingBadge: '۵۰٪ کاهش هزینه',
    clientPortal: 'پورتال سفارشات و رهگیری زنده',
    clientPortalBadge: 'رهگیری زنده',
    partners: 'همکاران و شبکه متخصصین',
    partnersBadge: 'همکاری',
    askAiAboutUs: 'پرسش از هوش مصنوعی درباره BIMCO',
    studioName: 'بیم‌کو // BIMCO',
    studioTagline: 'استودیو معماری و تولید استراتژیک BIM // سهیل مستی و همکاران',
    returnToHome: 'بازگشت به پورتفولیو کارها',
    contactWhatsapp: 'تماس مستقیم در واتساپ (+34 610 855 434)',
    customizer: 'ویرایشگر کالبد / GLB',
    soundToggle: 'صدای تعاملی',
    menu: 'منو',
    close: 'بستن',

    gallery: 'گالری تصاویر',
    plans: 'پلان‌ها و نقشه‌های فنی',

    dayMode: 'روز اسکچ‌آپ',
    sunsetMode: 'غروب طلایی',
    nightMode: 'شب معماری',
    overviewView: 'دید کلی',
    autoRotateStart: 'چرخش خودکار',
    autoRotateStop: 'توقف چرخش',
    rotateHint: 'چرخش ۳۶۰ درجه: کلیک چپ و درگ ماوس',
    clickBuildingHint: 'کلیک روی هر ساختمان = پرواز دوربین و نمایش پروژه‌ها',
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
    backToOverview: 'بازگشت به پورتفولیو کارها',

    aboutStudio: {
      title: 'آتلیه معماری و شهرسازی معاصر',
      tagline: 'استودیو معماری و مدلسازی BIM // بارسلون و تهران',
      p1: 'ما بر این باوریم که معماری، هنر سازمان‌دهی فضا، نور و ماده در خالص‌ترین شکل ممکن است. این وب‌سایت به عنوان پورتفولیوی تعاملی کارهای معماری طراحی شده تا بیننده را به سفری در میان تجربیات فضایی مختلف، از ویلاهای لوکس تا برج‌های پایدار، دعوت کند.',
      p2: 'رویکرد ما در طراحی مبتنی بر سادگی رادیکال، توجه عمیق به بستر اقلیمی و پایداری، اجرای استانداردهای بین‌المللی مدلسازی اطلاعات ساختمان (BIM LOD 350/400) و خلق پیوند معنادار میان انسان و کالبد شهری است.',
      emailLabel: 'ایمیل ارتباطی',
      phoneLabel: 'شماره تماس مستقیم',
      addressLabel: 'آدرس دفاتر طراحی',
      addressValue: 'بارسلون (Sant Cugat del Vallès)، اسپانیا | تهران، ایران',
      close: 'بستن'
    },

    customizerModal: {
      title: 'ویرایشگر کالبد، تصاویر و مدل‌های 3D',
      subtitle: 'LIVE ASSET, POSITION & GLB 3D CUSTOMIZER',
      tabBuildings: 'ساختمان‌ها',
      tabBackground: 'پس‌زمینه',
      tabJson: 'خروجی JSON',
      copyJson: 'کپی JSON',
      copied: 'کپی شد!',
      downloadJson: 'دانلود فایل تنظیمات',
      selectCategory: 'یک پهنه معماری را انتخاب کنید:',
      posX: 'موقعیت افقی X (%)',
      posY: 'موقعیت عمودی Y (%)',
      close: 'بستن'
    },

    archive: {
      title: 'کاتالوگ و آرشیو کامل پروژه‌ها',
      subtitle: 'SOHEIL MASTI ARCHITECTURE & BIM PORTFOLIO',
      searchPlaceholder: 'جستجوی پروژه، بارسلون، دربندسر...',
      allFilter: 'همه پروژه‌ها',
      noResults: 'پروژه‌ای با این مشخصات یافت نشد.'
    },

    resumeView: {
      backToPortfolio: 'بازگشت به پورتفولیو کارها',
      experienceBadge: 'بیش از ۱۵ سال سابقه بین‌المللی',
      sendEmail: 'ارسال ایمیل به سهیل مستی',
      downloadCv: 'دانلود رزومه کامل',
      workExperience: 'سوابق حرفه‌ای و پروژه‌های شاخص',
      education: 'تحصیلات دانشگاهی',
      competencies: 'صلاحیت‌های تخصصی و نرم‌افزاری',
      awards: 'افتخارات، رتبه‌ها و مسابقات',
      references: 'توصیه‌نامه‌ها و رفرنس‌های بین‌المللی'
    },

    dublinAuditView: {
      backToPortfolio: 'بازگشت به پورتفولیو کارها',
      headerTitle: 'برج فناوری ۷ طبقه دوبلین و ممیزی پیشرفته BIM LOD 350',
      headerBadge: 'استاندارد BREEAM EXCELLENT // دوبلین، ایرلند',
      tabOverview: 'نمای کلی',
      tabMep: 'تاسیسات و سازه MEP',
      tabDataCenter: 'دیتاسنتر زیرساختی',
      tabCompliance: 'ممیزی انطباق BIM',
      complianceScore: 'امتیاز انطباق استاندارد BIM'
    },

    bottomToolbar: {
      zonesLabel: 'پهنه //'
    }
  },

  es: {
    home3d: 'Portafolio de Trabajos',
    planIsometric: 'Plano Isométrico',
    projectsArchive: 'Proyectos',
    resume: 'Currículum',
    dublinBim: '🇮🇪 Demo Dublin BIM',
    bimOutsourcing: 'Outsourcing y Modelado BIM',
    bimOutsourcingBadge: 'Ahorro 50%',
    clientPortal: 'Portal de Clientes y Pedidos',
    clientPortalBadge: 'Seguimiento en Vivo',
    partners: 'Colaboradores y Talento',
    partnersBadge: 'Únete',
    askAiAboutUs: 'Pregunta a la IA sobre BIMCO',
    studioName: 'BIMCO',
    studioTagline: 'ESTUDIO DE ARQUITECTURA Y OUTSOURCING BIM // SOHEIL MASTI',
    returnToHome: 'Volver al Portafolio de Trabajos',
    contactWhatsapp: 'Contacto WhatsApp (+34 610 855 434)',
    customizer: 'Personalizar 3D / GLB',
    soundToggle: 'Audio interactivo',
    menu: 'Menú',
    close: 'Cerrar',

    gallery: 'Galería de Imágenes',
    plans: 'Planos Técnicos',

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
    backToOverview: 'Volver al Portafolio',

    aboutStudio: {
      title: 'Estudio de Arquitectura y Urbanismo Contemporáneo',
      tagline: 'SOHEIL MASTI ARCHITECTURE STUDIO // BARCELONA Y TEHERÁN',
      p1: 'Creemos que la arquitectura es el arte de organizar el espacio, la luz y la materia en su forma más pura. Este portafolio interactivo invita a recorrer nuestra trayectoria, desde villas alpinas hasta rascacielos sostenibles.',
      p2: 'Nuestra metodología se basa en la simplicidad radical, la sensibilidad bioclimática, la sostenibilidad y el dominio avanzado de metodologías BIM LOD 350/400.',
      emailLabel: 'Correo Electrónico',
      phoneLabel: 'Teléfono de Contacto',
      addressLabel: 'Dirección del Estudio',
      addressValue: 'Sant Cugat del Vallès, Barcelona, España | Teherán',
      close: 'Cerrar'
    },

    customizerModal: {
      title: 'Personalizador de Activos y Modelos 3D',
      subtitle: 'LIVE ASSET, POSITION & GLB 3D CUSTOMIZER',
      tabBuildings: 'Edificios 3D',
      tabBackground: 'Fondo e Imágenes',
      tabJson: 'Configuración JSON',
      copyJson: 'Copiar JSON',
      copied: '¡Copiado!',
      downloadJson: 'Descargar Archivo JSON',
      selectCategory: 'Selecciona una zona arquitectónica:',
      posX: 'Posición Horizontal X (%)',
      posY: 'Posición Vertical Y (%)',
      close: 'Cerrar'
    },

    archive: {
      title: 'Catálogo y Archivo Completo de Proyectos',
      subtitle: 'SOHEIL MASTI ARCHITECTURE & BIM PORTFOLIO',
      searchPlaceholder: 'Buscar proyectos, Barcelona, Darbandsara...',
      allFilter: 'Todos los Proyectos',
      noResults: 'No se encontraron proyectos con esos criterios.'
    },

    resumeView: {
      backToPortfolio: 'Volver al Portafolio de Trabajos',
      experienceBadge: 'MÁS DE 15 AÑOS DE EXPERIENCIA INTERNACIONAL',
      sendEmail: 'Enviar Correo a Soheil Masti',
      downloadCv: 'Descargar CV Completo',
      workExperience: 'Trayectoria Profesional',
      education: 'Formación Académica',
      competencies: 'Competencias Técnicas y BIM',
      awards: 'Premios y Concursos de Arquitectura',
      references: 'Referencias Profesionales'
    },

    dublinAuditView: {
      backToPortfolio: 'Volver al Portafolio de Trabajos',
      headerTitle: 'Torre Dublin Tech Hub de 7 Plantas y Auditoría BIM LOD 350',
      headerBadge: 'ESTÁNDAR BREEAM EXCELLENT // DUBLÍN, IRLANDA',
      tabOverview: 'Visión General',
      tabMep: 'Instalaciones MEP y Estructuras',
      tabDataCenter: 'Centro de Datos Tier-3',
      tabCompliance: 'Auditoría de Conformidad BIM',
      complianceScore: 'Puntuación de Cumplimiento BIM'
    },

    bottomToolbar: {
      zonesLabel: 'ZONAS //'
    }
  },

  en: {
    home3d: 'Works Portfolio',
    planIsometric: 'Isometric Plan',
    projectsArchive: 'Projects',
    resume: 'Resume / CV',
    dublinBim: '🇮🇪 Dublin BIM Audit',
    bimOutsourcing: 'BIM Outsourcing & Delivery',
    bimOutsourcingBadge: 'Save 50%',
    clientPortal: 'Client Portal & Live Tracker',
    clientPortalBadge: 'Live Tracker',
    partners: 'Partners & Talent Network',
    partnersBadge: 'Join Us',
    askAiAboutUs: 'Ask AI About BIMCO',
    studioName: 'BIMCO',
    studioTagline: 'ARCHITECTURAL PRACTICE & STRATEGIC BIM DELIVERY // SOHEIL MASTI',
    returnToHome: 'Return to Works Portfolio',
    contactWhatsapp: 'WhatsApp Contact (+34 610 855 434)',
    customizer: 'Customize 3D / GLB',
    soundToggle: 'Interactive Audio',
    menu: 'Menu',
    close: 'Close',

    gallery: 'Image Gallery',
    plans: 'Technical Drawings',

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
    backToOverview: 'Back to Works Portfolio',

    aboutStudio: {
      title: 'Contemporary Architecture & Urban Studio',
      tagline: 'SOHEIL MASTI ARCHITECTURAL STUDIO // BARCELONA & TEHRAN',
      p1: 'We believe architecture is the art of organizing space, light, and material in its purest form. This interactive spatial environment invites visitors to explore our body of work from bespoke luxury villas to major skyline infrastructure.',
      p2: 'Our methodology centers on radical simplicity, climate-responsive design, environmental sustainability, and precision Building Information Modeling leadership (BIM LOD 350/400).',
      emailLabel: 'Studio Email',
      phoneLabel: 'Direct Phone',
      addressLabel: 'Studio Locations',
      addressValue: 'Barcelona (Sant Cugat del Vallès), Spain | Tehran, Iran',
      close: 'Close'
    },

    customizerModal: {
      title: '3D Asset & Geometry Customizer',
      subtitle: 'LIVE ASSET, POSITION & GLB 3D CUSTOMIZER',
      tabBuildings: '3D Buildings',
      tabBackground: 'Background',
      tabJson: 'JSON Config',
      copyJson: 'Copy JSON',
      copied: 'Copied to clipboard!',
      downloadJson: 'Download JSON',
      selectCategory: 'Select an architectural zone:',
      posX: 'Horizontal Position X (%)',
      posY: 'Vertical Position Y (%)',
      close: 'Close'
    },

    archive: {
      title: 'Complete Projects & Architecture Catalog',
      subtitle: 'SOHEIL MASTI ARCHITECTURE & BIM PORTFOLIO',
      searchPlaceholder: 'Search projects, Barcelona, Darbandsara...',
      allFilter: 'All Projects',
      noResults: 'No projects match your search criteria.'
    },

    resumeView: {
      backToPortfolio: 'Return to Works Portfolio',
      experienceBadge: '15+ YEARS INTERNATIONAL EXPERIENCE',
      sendEmail: 'Send Email to Soheil Masti',
      downloadCv: 'Download Full CV',
      workExperience: 'Professional Experience',
      education: 'Academic Education',
      competencies: 'Core Competencies & BIM Skills',
      awards: 'Awards & Competitions',
      references: 'Professional Endorsements'
    },

    dublinAuditView: {
      backToPortfolio: 'Return to Works Portfolio',
      headerTitle: 'Dublin Tech Hub 7-Story Tower & BIM LOD 350 Audit',
      headerBadge: 'BREEAM EXCELLENT COMPLIANCE // DUBLIN, IRELAND',
      tabOverview: 'Overview',
      tabMep: 'MEP & Structural Systems',
      tabDataCenter: 'Tier-3 Edge Data Center',
      tabCompliance: 'BIM Compliance Audit',
      complianceScore: 'BIM Compliance Score'
    },

    bottomToolbar: {
      zonesLabel: 'ZONES //'
    }
  },

  fr: {
    home3d: 'Portfolio de Projets',
    planIsometric: 'Plan Isométrique',
    projectsArchive: 'Projets',
    resume: 'Curriculum Vitae',
    dublinBim: '🇮🇪 Démo Dublin BIM',
    bimOutsourcing: 'Sous-traitance et Modélisation BIM',
    bimOutsourcingBadge: 'Économie 50%',
    clientPortal: 'Portail Clients & Suivi en Direct',
    clientPortalBadge: 'Suivi en Direct',
    partners: 'Partenaires & Réseau de Talents',
    partnersBadge: 'Rejoindre',
    askAiAboutUs: 'Demandez à l’IA sur BIMCO',
    studioName: 'BIMCO',
    studioTagline: 'PRATIQUE D’ARCHITECTURE & SOUS-TRAITANCE BIM // SOHEIL MASTI',
    returnToHome: 'Retour au Portfolio de Projets',
    contactWhatsapp: 'Contact WhatsApp (+34 610 855 434)',
    customizer: 'Personnaliser 3D / GLB',
    soundToggle: 'Audio Interactif',
    menu: 'Menu',
    close: 'Fermer',

    gallery: 'Galerie d’Images',
    plans: 'Plans Techniques',

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
    backToOverview: 'Retour au Portfolio',

    aboutStudio: {
      title: 'Atelier d’Architecture et d’Urbanisme Contemporain',
      tagline: 'SOHEIL MASTI ARCHITECTURE STUDIO // BARCELONE & TÉHÉRAN',
      p1: 'Nous croyons que l’architecture est l’art d’organiser l’espace, la lumière et la matière sous sa forme la plus pure. Ce portfolio spatial interactif vous invite à explorer notre univers, des villas alpines aux tours tertiaires durables.',
      p2: 'Notre démarche repose sur une simplicité radicale, la sensibilité au climat, l’éco-conception et l’expertise avancée en BIM LOD 350/400.',
      emailLabel: 'Courriel',
      phoneLabel: 'Téléphone',
      addressLabel: 'Adresse de l’Atelier',
      addressValue: 'Barcelone (Sant Cugat del Vallès), Espagne | Téhéran',
      close: 'Fermer'
    },

    customizerModal: {
      title: 'Personnalisation des Éléments 3D & GLB',
      subtitle: 'LIVE ASSET, POSITION & GLB 3D CUSTOMIZER',
      tabBuildings: 'Bâtiments 3D',
      tabBackground: 'Arrière-plan',
      tabJson: 'Configuration JSON',
      copyJson: 'Copier JSON',
      copied: 'Copié !',
      downloadJson: 'Télécharger JSON',
      selectCategory: 'Sélectionner une zone architecturale :',
      posX: 'Position Horizontale X (%)',
      posY: 'Position Verticale Y (%)',
      close: 'Fermer'
    },

    archive: {
      title: 'Catalogue et Archives Complètes des Projets',
      subtitle: 'SOHEIL MASTI ARCHITECTURE & BIM PORTFOLIO',
      searchPlaceholder: 'Rechercher un projet, Barcelone, Téhéran...',
      allFilter: 'Tous les Projets',
      noResults: 'Aucun projet ne correspond à vos critères.'
    },

    resumeView: {
      backToPortfolio: 'Retour au Portfolio de Projets',
      experienceBadge: 'PLUS DE 15 ANS D’EXPÉRIENCE INTERNATIONALE',
      sendEmail: 'Contacter Soheil Masti par courriel',
      downloadCv: 'Télécharger le CV Complet',
      workExperience: 'Parcours Professionnel',
      education: 'Formation Académique',
      competencies: 'Compétences Techniques & BIM',
      awards: 'Prix & Distinctions de Concours',
      references: 'Recommandations Professionnelles'
    },

    dublinAuditView: {
      backToPortfolio: 'Retour au Portfolio de Projets',
      headerTitle: 'Tour Dublin Tech Hub de 7 Étages & Audit BIM LOD 350',
      headerBadge: 'CERTIFICATION BREEAM EXCELLENT // DUBLIN, IRLANDE',
      tabOverview: 'Vue Générale',
      tabMep: 'Lots Techniques MEP & Structures',
      tabDataCenter: 'Data Center Sécurisé Tier-3',
      tabCompliance: 'Audit de Conformité BIM',
      complianceScore: 'Score de Conformité BIM'
    },

    bottomToolbar: {
      zonesLabel: 'ZONES //'
    }
  },

  de: {
    home3d: 'Projekt-Portfolio',
    planIsometric: 'Isometrischer Plan',
    projectsArchive: 'Projekte',
    resume: 'Lebenslauf',
    dublinBim: '🇮🇪 Dublin BIM-Audit',
    bimOutsourcing: 'BIM-Outsourcing & Delivery',
    bimOutsourcingBadge: '50% Ersparnis',
    clientPortal: 'Kundenportal & Live-Tracking',
    clientPortalBadge: 'Live-Tracking',
    partners: 'Partner & Talent-Netzwerk',
    partnersBadge: 'Mitmachen',
    askAiAboutUs: 'KI nach BIMCO fragen',
    studioName: 'BIMCO',
    studioTagline: 'ARCHITEKTURBÜRO & STRATEGISCHE BIM-LIEFERUNG // SOHEIL MASTI',
    returnToHome: 'Zurück zum Projekt-Portfolio',
    contactWhatsapp: 'WhatsApp-Kontakt (+34 610 855 434)',
    customizer: '3D / GLB anpassen',
    soundToggle: 'Interaktiver Ton',
    menu: 'Menü',
    close: 'Schließen',

    gallery: 'Bildergalerie',
    plans: 'Technische Zeichnungen',

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
    backToOverview: 'Zurück zum Portfolio',

    aboutStudio: {
      title: 'Studio für zeitgenössische Architektur & Städtebau',
      tagline: 'SOHEIL MASTI ARCHITEKTURSTUDIO // BARCELONA & TEHERAN',
      p1: 'Wir verstehen Architektur als Kunst der Organisation von Raum, Licht und Material in reinster Form. Dieses interaktive räumliche Portfolio lädt Sie ein, unsere Werke von alpinen Villen bis zu urbanen Großprojekten zu entdecken.',
      p2: 'Unsere Entwurfsmethodik basiert auf radikaler Schlichtheit, bioklimatischer Verantwortung, Nachhaltigkeit und führender BIM LOD 350/400-Expertise.',
      emailLabel: 'E-Mail',
      phoneLabel: 'Telefon',
      addressLabel: 'Studio-Standort',
      addressValue: 'Barcelona (Sant Cugat del Vallès), Spanien | Teheran',
      close: 'Schließen'
    },

    customizerModal: {
      title: '3D-Modell & Asset Customizer',
      subtitle: 'LIVE ASSET, POSITION & GLB 3D CUSTOMIZER',
      tabBuildings: '3D-Gebäude',
      tabBackground: 'Hintergrund',
      tabJson: 'JSON-Konfiguration',
      copyJson: 'JSON kopieren',
      copied: 'Kopiert!',
      downloadJson: 'JSON herunterladen',
      selectCategory: 'Architekturzone wählen:',
      posX: 'Horizontale Position X (%)',
      posY: 'Vertikale Position Y (%)',
      close: 'Schließen'
    },

    archive: {
      title: 'Vollständiger Projekt- & Architekturkatalog',
      subtitle: 'SOHEIL MASTI ARCHITECTURE & BIM PORTFOLIO',
      searchPlaceholder: 'Projekt suchen, Barcelona, Darbandsara...',
      allFilter: 'Alle Projekte',
      noResults: 'Keine Projekte entsprechen Ihren Suchkriterien.'
    },

    resumeView: {
      backToPortfolio: 'Zurück zum Projekt-Portfolio',
      experienceBadge: 'ÜBER 15 JAHRE INTERNATIONALE ERFAHRUNG',
      sendEmail: 'E-Mail an Soheil Masti senden',
      downloadCv: 'Vollständigen CV herunterladen',
      workExperience: 'Beruflicher Werdegang',
      education: 'Akademische Ausbildung',
      competencies: 'Fachkompetenzen & BIM-Expertise',
      awards: 'Wettbewerbserfolge & Auszeichnungen',
      references: 'Berufliche Referenzen'
    },

    dublinAuditView: {
      backToPortfolio: 'Zurück zum Projekt-Portfolio',
      headerTitle: 'Dublin Tech Hub 7-stöckiger Büroturm & BIM LOD 350 Audit',
      headerBadge: 'BREEAM EXCELLENT STANDARD // DUBLIN, IRLAND',
      tabOverview: 'Übersicht',
      tabMep: 'TGA (MEP) & Tragwerksplanung',
      tabDataCenter: 'Tier-3 Edge-Rechenzentrum',
      tabCompliance: 'BIM-Konformitätsaudit',
      complianceScore: 'BIM-Konformitätswert'
    },

    bottomToolbar: {
      zonesLabel: 'ZONEN //'
    }
  },

  it: {
    home3d: 'Portfolio dei Lavori',
    planIsometric: 'Piano Assonometrico',
    projectsArchive: 'Progetti',
    resume: 'Curriculum Vitae',
    dublinBim: '🇮🇪 Demo Dublin BIM',
    bimOutsourcing: 'Outsourcing e Modellazione BIM',
    bimOutsourcingBadge: 'Risparmio 50%',
    clientPortal: 'Portale Clienti & Tracciamento Live',
    clientPortalBadge: 'Tracciamento Live',
    partners: 'Partner & Rete di Talenti',
    partnersBadge: 'Unisciti',
    askAiAboutUs: 'Chiedi all’IA su BIMCO',
    studioName: 'BIMCO',
    studioTagline: 'STUDIO DI ARCHITETTURA E OUTSOURCING BIM // SOHEIL MASTI',
    returnToHome: 'Torna al Portfolio dei Lavori',
    contactWhatsapp: 'Contatto WhatsApp (+34 610 855 434)',
    customizer: 'Personalizza 3D / GLB',
    soundToggle: 'Audio Interattivo',
    menu: 'Menu',
    close: 'Chiudi',

    gallery: 'Galleria Immagini',
    plans: 'Piani Tecnici',

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
    backToOverview: 'Torna al Portfolio',

    aboutStudio: {
      title: 'Studio di Architettura e Urbanistica Contemporanea',
      tagline: 'SOHEIL MASTI ARCHITECTURE STUDIO // BARCELLONA & TEHERAN',
      p1: 'Crediamo che l’architettura sia l’arte di plasmare spazio, luce e materia nella sua forma più pura. Questo portfolio spaziale interattivo vi guida alla scoperta dei nostri progetti, dagli attici alpini ai grattacieli sostenibili.',
      p2: 'La nostra metodologia coniuga semplicità radicale, sensibilità climatica, sostenibilità e massima padronanza nei processi BIM LOD 350/400.',
      emailLabel: 'Email dello Studio',
      phoneLabel: 'Telefono Diretto',
      addressLabel: 'Sedi dello Studio',
      addressValue: 'Barcellona (Sant Cugat del Vallès), Spagna | Teheran',
      close: 'Chiudi'
    },

    customizerModal: {
      title: 'Personalizzatore Elementi 3D e File GLB',
      subtitle: 'LIVE ASSET, POSITION & GLB 3D CUSTOMIZER',
      tabBuildings: 'Edifici 3D',
      tabBackground: 'Sfondo',
      tabJson: 'Configurazione JSON',
      copyJson: 'Copia JSON',
      copied: 'Copiato!',
      downloadJson: 'Scarica JSON',
      selectCategory: 'Seleziona una zona architettonica:',
      posX: 'Posizione Orizzontale X (%)',
      posY: 'Posizione Verticale Y (%)',
      close: 'Chiudi'
    },

    archive: {
      title: 'Catalogo e Archivio Completo dei Progetti',
      subtitle: 'SOHEIL MASTI ARCHITECTURE & BIM PORTFOLIO',
      searchPlaceholder: 'Cerca progetto, Barcellona, Darbandsara...',
      allFilter: 'Tutti i Progetti',
      noResults: 'Nessun progetto trovato con questi parametri.'
    },

    resumeView: {
      backToPortfolio: 'Torna al Portfolio dei Lavori',
      experienceBadge: 'OLTRE 15 ANNI DI ESPERIENZA INTERNAZIONALE',
      sendEmail: 'Invia Email a Soheil Masti',
      downloadCv: 'Scarica CV Completo',
      workExperience: 'Esperienza Professionale',
      education: 'Formazione Accademica',
      competencies: 'Competenze Tecniche & BIM',
      awards: 'Premi e Concorsi di Architettura',
      references: 'Referenze Professionali'
    },

    dublinAuditView: {
      backToPortfolio: 'Torna al Portfolio dei Lavori',
      headerTitle: 'Torre Dublin Tech Hub a 7 Piani & Audit BIM LOD 350',
      headerBadge: 'STANDARD BREEAM EXCELLENT // DUBLINO, IRLANDA',
      tabOverview: 'Panoramica',
      tabMep: 'Impianti MEP & Strutture',
      tabDataCenter: 'Data Center Tier-3',
      tabCompliance: 'Audit di Conformità BIM',
      complianceScore: 'Punteggio di Conformità BIM'
    },

    bottomToolbar: {
      zonesLabel: 'ZONE //'
    }
  }
};

/**
 * Cookie Helper Functions with 1-Year Longevity
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export function setCookie(name: string, value: string, days: number = 365) {
  if (typeof document === 'undefined') return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

/**
 * Persist language preference to both Cookie and localStorage
 */
export function saveLanguagePreference(code: LanguageCode) {
  setCookie('preferred_language', code, 365);
  try {
    localStorage.setItem('preferred_language', code);
  } catch (e) {
    console.debug('localStorage write failed', e);
  }
}

/**
 * Synchronous initial language resolution from Cookie or localStorage
 * Ensures immediate load without waiting for async network IP checks
 */
export function getInitialLanguage(): LanguageCode {
  const cookieLang = getCookie('preferred_language') as LanguageCode | null;
  if (cookieLang && (cookieLang in TRANSLATIONS)) {
    return cookieLang;
  }
  try {
    const saved = localStorage.getItem('preferred_language') as LanguageCode | null;
    if (saved && (saved in TRANSLATIONS)) {
      return saved;
    }
  } catch (e) {
    console.debug('localStorage read failed', e);
  }
  return 'en';
}

/**
 * Smart IP Geolocation Detection Function
 * Order of priority:
 * 1. Persistent Browser Cookie (preferred_language)
 * 2. Browser localStorage (preferred_language)
 * 3. IP Geolocation (Catalonia -> ca, Iran -> fa, Spain -> es, France -> fr, Germany -> de, Italy -> it, Other -> en)
 * 4. Browser Navigator Locale
 */
export async function detectVisitorLanguage(): Promise<LanguageCode> {
  // 1. Check Cookie first!
  const cookieLang = getCookie('preferred_language') as LanguageCode | null;
  if (cookieLang && (cookieLang in TRANSLATIONS)) {
    saveLanguagePreference(cookieLang);
    return cookieLang;
  }

  // 2. Check localStorage next!
  try {
    const saved = localStorage.getItem('preferred_language') as LanguageCode | null;
    if (saved && (saved in TRANSLATIONS)) {
      saveLanguagePreference(saved);
      return saved;
    }
  } catch (e) {
    console.debug('localStorage read failed', e);
  }

  // 3. Fetch IP Geolocation via fast, CORS-enabled service (2.2s timeout)
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
          saveLanguagePreference('ca');
          return 'ca';
        }

        // Persian for Iran
        if (country === 'IR' || country === 'AF') {
          saveLanguagePreference('fa');
          return 'fa';
        }

        // Spanish for Spain (outside Catalonia) & Latin America
        const spanishCountries = ['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY'];
        if (spanishCountries.includes(country)) {
          saveLanguagePreference('es');
          return 'es';
        }

        // French for France, Belgium, etc.
        if (country === 'FR' || country === 'MC') {
          saveLanguagePreference('fr');
          return 'fr';
        }

        // German for Germany, Austria, Switzerland
        if (country === 'DE' || country === 'AT' || (country === 'CH' && !regionName.includes('genev'))) {
          saveLanguagePreference('de');
          return 'de';
        }

        // Italian for Italy
        if (country === 'IT' || country === 'SM' || country === 'VA') {
          saveLanguagePreference('it');
          return 'it';
        }

        // Default to English for all other countries in the world
        saveLanguagePreference('en');
        return 'en';
      }
    }
  } catch (err) {
    // Graceful fallback to browser navigator language
    console.debug('IP geolocation lookup skipped or timed out, falling back to navigator locale', err);
  }

  // 4. Fallback: Browser navigator language
  const browserLang = (navigator.language || navigator.languages?.[0] || 'en').toLowerCase();
  let fallback: LanguageCode = 'en';
  if (browserLang.startsWith('ca')) fallback = 'ca';
  else if (browserLang.startsWith('fa')) fallback = 'fa';
  else if (browserLang.startsWith('es')) fallback = 'es';
  else if (browserLang.startsWith('fr')) fallback = 'fr';
  else if (browserLang.startsWith('de')) fallback = 'de';
  else if (browserLang.startsWith('it')) fallback = 'it';

  saveLanguagePreference(fallback);
  return fallback;
}
