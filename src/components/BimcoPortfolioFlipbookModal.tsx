import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Home, 
  Building2, 
  Landmark, 
  Share2, 
  Check,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { sound } from '../utils/audio';
import { LanguageCode } from '../utils/i18n';

export type PortfolioVolumeKey = 'villas' | 'apartments' | 'urban';

export interface VolumeShortcut {
  label: string;
  page: number;
}

export interface VolumeConfig {
  id: PortfolioVolumeKey;
  totalPages: number;
  pdfUrl: string;
  pdfDownloadName: string;
  pdfSizeText: string;
  pagesFolder: string;
  icon: React.ReactNode;
  translations: Record<string, {
    numberText: string;
    badge: string;
    title: string;
    description: string;
    shortcuts: VolumeShortcut[];
  }>;
}

export const PORTFOLIO_VOLUMES: Record<PortfolioVolumeKey, VolumeConfig> = {
  villas: {
    id: 'villas',
    totalPages: 24,
    pdfUrl: '/BIMCO_Volume1_Villas_Portfolio.pdf',
    pdfDownloadName: 'BIMCO_Volume1_Luxury_Villas_Portfolio_2026.pdf',
    pdfSizeText: '18.1 MB',
    pagesFolder: '/portfolio_villas/book_pages',
    icon: <Home className="w-4 h-4" />,
    translations: {
      en: {
        numberText: 'Volume I',
        badge: 'LUXURY VILLAS',
        title: 'Luxury Villas & Topography',
        description: 'Topography-harmonized architecture, Violet Villa, Tehrandasht, Australia and site execution',
        shortcuts: [
          { label: 'Front Cover', page: 0 },
          { label: 'Manifesto & Index', page: 1 },
          { label: 'Violet Villa (Concept)', page: 2 },
          { label: 'Violet (Plans & Site)', page: 4 },
          { label: 'Violet (Facades & Materials)', page: 6 },
          { label: 'Violet (Night Lighting)', page: 9 },
          { label: 'Tehrandasht Villa', page: 11 },
          { label: 'Tehrandasht (Foundation & Frame)', page: 13 },
          { label: 'Australia Curve Villa', page: 15 },
          { label: 'Australia (Joinery)', page: 17 },
          { label: 'Project Directors', page: 22 },
          { label: 'Back Cover & Standards', page: 23 },
        ]
      },
      fa: {
        numberText: 'جلد اول',
        badge: 'LUXURY VILLAS',
        title: 'ویلاهای لوکس و اقامتگاه‌ها',
        description: 'معماری همساز با شیب، ویلاهای مجلل وایولت، تهراندشت، استرالیا و نظارت کارگاهی',
        shortcuts: [
          { label: 'روی جلد', page: 0 },
          { label: 'مانیفست و فهرست', page: 1 },
          { label: 'ویلای وایولت (کانسپت)', page: 2 },
          { label: 'وایولت (پلان و کارگاه)', page: 4 },
          { label: 'وایولت (نما و متریال)', page: 6 },
          { label: 'وایولت (نورپردازی شب)', page: 9 },
          { label: 'ویلای تهراندشت', page: 11 },
          { label: 'تهراندشت (پی و اسکلت)', page: 13 },
          { label: 'ویلای استرالیا و فرم منحنی', page: 15 },
          { label: 'استرالیا (درودگری داخلی)', page: 17 },
          { label: 'سرپرستان پروژه', page: 22 },
          { label: 'پشت جلد و استانداردها', page: 23 },
        ]
      },
      es: {
        numberText: 'Volumen I',
        badge: 'LUXURY VILLAS',
        title: 'Villas de Lujo y Topografía',
        description: 'Arquitectura integrada en pendiente, Villa Violet, Tehrandasht, Australia y dirección de obra',
        shortcuts: [
          { label: 'Portada', page: 0 },
          { label: 'Manifiesto e Índice', page: 1 },
          { label: 'Villa Violet (Concepto)', page: 2 },
          { label: 'Violet (Planos y Obra)', page: 4 },
          { label: 'Violet (Fachadas y Materiales)', page: 6 },
          { label: 'Violet (Iluminación Nocturna)', page: 9 },
          { label: 'Villa Tehrandasht', page: 11 },
          { label: 'Tehrandasht (Estructura)', page: 13 },
          { label: 'Villa Curva Australia', page: 15 },
          { label: 'Australia (Carpintería)', page: 17 },
          { label: 'Directores de Proyecto', page: 22 },
          { label: 'Contraportada y Normas', page: 23 },
        ]
      },
      ca: {
        numberText: 'Volum I',
        badge: 'LUXURY VILLAS',
        title: 'Vil·les de Luxe i Topografia',
        description: 'Arquitectura integrada en pendent, Vil·la Violet, Tehrandasht, Austràlia i direcció d\'obra',
        shortcuts: [
          { label: 'Portada', page: 0 },
          { label: 'Manifest i Índex', page: 1 },
          { label: 'Vil·la Violet (Concepte)', page: 2 },
          { label: 'Violet (Plànols i Obra)', page: 4 },
          { label: 'Violet (Façanes i Materials)', page: 6 },
          { label: 'Violet (Il·luminació Nocturna)', page: 9 },
          { label: 'Vil·la Tehrandasht', page: 11 },
          { label: 'Tehrandasht (Estructura)', page: 13 },
          { label: 'Vil·la Curba Austràlia', page: 15 },
          { label: 'Austràlia (Fusteria)', page: 17 },
          { label: 'Directors de Projecte', page: 22 },
          { label: 'Contraportada i Normes', page: 23 },
        ]
      }
    }
  },
  apartments: {
    id: 'apartments',
    totalPages: 22,
    pdfUrl: '/BIMCO_Volume2_Apartments_Facades.pdf',
    pdfDownloadName: 'BIMCO_Volume2_Apartments_Facades_2026.pdf',
    pdfSizeText: '16.7 MB',
    pagesFolder: '/portfolio_apartments/book_pages',
    icon: <Building2 className="w-4 h-4" />,
    translations: {
      en: {
        numberText: 'Volume II',
        badge: 'APARTMENTS & FACADES',
        title: 'Apartments & Facade Engineering',
        description: 'Derous facade engineering, Dalkhani hillside residences, modular towers, classical palace',
        shortcuts: [
          { label: 'Front Cover', page: 0 },
          { label: 'Facade Manifesto & Index', page: 1 },
          { label: 'Derous Facade (Entrance)', page: 2 },
          { label: 'Derous Night Lighting', page: 4 },
          { label: 'Louvers & Sunshades', page: 6 },
          { label: '1:20 Facade Details', page: 7 },
          { label: 'Dalkhani Hillside Residences', page: 8 },
          { label: 'Dalkhani Plans & Sections', page: 10 },
          { label: 'Collective Residential Complex', page: 13 },
          { label: 'Facade Modulation Type 1', page: 16 },
          { label: 'Classical Grand Palace', page: 19 },
          { label: 'Project Directors', page: 20 },
          { label: 'Back Cover & Standards', page: 21 },
        ]
      },
      fa: {
        numberText: 'جلد دوم',
        badge: 'APARTMENTS & FACADES',
        title: 'آپارتمان‌ها و مهندسی نما',
        description: 'پروژه نمای دروس، مسکونی طبقاتی دالخانی، برج‌های مدولار و کاخ کلاسیک',
        shortcuts: [
          { label: 'روی جلد', page: 0 },
          { label: 'مانیفست نما و فهرست', page: 1 },
          { label: 'نمای دروس (ورودی)', page: 2 },
          { label: 'نورپردازی شب دروس', page: 4 },
          { label: 'لوورها و آفتابگیرها', page: 6 },
          { label: 'جزییات ۱:۲۰ نما', page: 7 },
          { label: 'مسکونی شیبدار دالخانی', page: 8 },
          { label: 'پلان و مقطع دالخانی', page: 10 },
          { label: 'مجموعه مسکونی طبقاتی', page: 13 },
          { label: 'مدولاسیون نما تیپ ۱', page: 16 },
          { label: 'کاخ باشکوه کلاسیک', page: 19 },
          { label: 'سرپرستان پروژه', page: 20 },
          { label: 'پشت جلد و استانداردها', page: 21 },
        ]
      },
      es: {
        numberText: 'Volumen II',
        badge: 'APARTMENTS & FACADES',
        title: 'Apartamentos e Ingeniería de Fachadas',
        description: 'Ingeniería de fachada Derous, residencial en pendiente Dalkhani, torres modulares y palacio clásico',
        shortcuts: [
          { label: 'Portada', page: 0 },
          { label: 'Manifiesto de Fachada e Índice', page: 1 },
          { label: 'Fachada Derous (Entrada)', page: 2 },
          { label: 'Iluminación Nocturna Derous', page: 4 },
          { label: 'Lamas y Protección Solar', page: 6 },
          { label: 'Detalles Constructivos 1:20', page: 7 },
          { label: 'Residencial Dalkhani en Ladera', page: 8 },
          { label: 'Plantas y Secciones Dalkhani', page: 10 },
          { label: 'Conjunto Residencial Colectivo', page: 13 },
          { label: 'Modulación de Fachada Tipo 1', page: 16 },
          { label: 'Palacio Clásico Monumental', page: 19 },
          { label: 'Directores de Proyecto', page: 20 },
          { label: 'Contraportada y Normas', page: 21 },
        ]
      },
      ca: {
        numberText: 'Volum II',
        badge: 'APARTMENTS & FACADES',
        title: 'Apartaments i Enginyeria de Façanes',
        description: 'Enginyeria de façana Derous, residencial en pendent Dalkhani, torres modulars i palau clàssic',
        shortcuts: [
          { label: 'Portada', page: 0 },
          { label: 'Manifest de Façana i Índex', page: 1 },
          { label: 'Façana Derous (Entrada)', page: 2 },
          { label: 'Il·luminació Nocturna Derous', page: 4 },
          { label: 'Lamel·les i Protecció Solar', page: 6 },
          { label: 'Detalls Constructius 1:20', page: 7 },
          { label: 'Residencial Dalkhani en Pendent', page: 8 },
          { label: 'Plantes i Seccions Dalkhani', page: 10 },
          { label: 'Conjunt Residencial Col·lectiu', page: 13 },
          { label: 'Modulació de Façana Tipus 1', page: 16 },
          { label: 'Palau Clàssic Monumental', page: 19 },
          { label: 'Directors de Projecte', page: 20 },
          { label: 'Contraportada i Normes', page: 21 },
        ]
      }
    }
  },
  urban: {
    id: 'urban',
    totalPages: 32,
    pdfUrl: '/BIMCO_Volume3_Urban_Commercial.pdf',
    pdfDownloadName: 'BIMCO_Volume3_Urban_Commercial_2026.pdf',
    pdfSizeText: '21.2 MB',
    pagesFolder: '/portfolio_urban/book_pages',
    icon: <Landmark className="w-4 h-4" />,
    translations: {
      en: {
        numberText: 'Volume III',
        badge: 'URBAN & COMMERCIAL',
        title: 'Commercial & Urban Masterplanning',
        description: 'Shargh Steel commercial complex, Erbil arched mall, interchange bridges, Zargandeh valley morphology',
        shortcuts: [
          { label: 'Front Cover', page: 0 },
          { label: 'Urban Manifesto & Index', page: 1 },
          { label: 'Shargh Steel Complex', page: 2 },
          { label: 'Atrium & Skylights', page: 5 },
          { label: 'Steel Construction Frame', page: 8 },
          { label: 'Erbil Arched Mall', page: 9 },
          { label: 'Grade-Separated Junction', page: 14 },
          { label: 'Zargandeh Valley Morphology', page: 15 },
          { label: 'Ecological Valley Regeneration', page: 17 },
          { label: 'Dense Urban Fabric', page: 20 },
          { label: 'Arteries & Skyways', page: 25 },
          { label: 'Project Directors', page: 30 },
          { label: 'Back Cover & Standards', page: 31 },
        ]
      },
      fa: {
        numberText: 'جلد سوم',
        badge: 'URBAN & COMMERCIAL',
        title: 'معماری تجاری و طراحی شهری',
        description: 'مجتمع فولاد شرق، مرکز خرید اربیل، تقاطع غیرهمسطح، مورفولوژی زرگنده و اسکای‌لاین',
        shortcuts: [
          { label: 'روی جلد', page: 0 },
          { label: 'مانیفست شهری و فهرست', page: 1 },
          { label: 'مجتمع فولاد شرق', page: 2 },
          { label: 'آتریوم و نورگیرها', page: 5 },
          { label: 'سازه فولادی کارگاه', page: 8 },
          { label: 'مرکز خرید قوسی اربیل', page: 9 },
          { label: 'تقاطع غیرهمسطح و پل', page: 14 },
          { label: 'مورفولوژی روددره زرگنده', page: 15 },
          { label: 'احیای اکولوژیک روددره', page: 17 },
          { label: 'طراحی شهری متراکم', page: 20 },
          { label: 'شریان‌ها و اسکای‌وی', page: 25 },
          { label: 'سرپرستان پروژه', page: 30 },
          { label: 'پشت جلد و استانداردها', page: 31 },
        ]
      },
      es: {
        numberText: 'Volumen III',
        badge: 'URBAN & COMMERCIAL',
        title: 'Comercial y Planificación Urbana',
        description: 'Complejo comercial Shargh Steel, centro comercial Erbil, nudos viales y morfología de ribera Zargandeh',
        shortcuts: [
          { label: 'Portada', page: 0 },
          { label: 'Manifiesto Urbano e Índice', page: 1 },
          { label: 'Complejo Shargh Steel', page: 2 },
          { label: 'Atrio y Lucernarios', page: 5 },
          { label: 'Estructura Metálica de Obra', page: 8 },
          { label: 'Centro Comercial Curvo Erbil', page: 9 },
          { label: 'Intercambiador y Puentes', page: 14 },
          { label: 'Morfología Cuenca Zargandeh', page: 15 },
          { label: 'Regeneración Ecológica Fluvial', page: 17 },
          { label: 'Diseño Urbano Denso', page: 20 },
          { label: 'Arterias y Pasarelas Aéreas', page: 25 },
          { label: 'Directores de Proyecto', page: 30 },
          { label: 'Contraportada y Normas', page: 31 },
        ]
      },
      ca: {
        numberText: 'Volum III',
        badge: 'URBAN & COMMERCIAL',
        title: 'Comercial i Planificació Urbana',
        description: 'Complex comercial Shargh Steel, centre comercial Erbil, nusos viaris i morfologia fluvial Zargandeh',
        shortcuts: [
          { label: 'Portada', page: 0 },
          { label: 'Manifest Urbà i Índex', page: 1 },
          { label: 'Complex Shargh Steel', page: 2 },
          { label: 'Àtri i Lluernes', page: 5 },
          { label: 'Estructura Metàl·lica d\'Obra', page: 8 },
          { label: 'Centre Comercial Corbat Erbil', page: 9 },
          { label: 'Intercanviador i Ponts', page: 14 },
          { label: 'Morfologia Conca Zargandeh', page: 15 },
          { label: 'Regeneració Ecològica Fluvial', page: 17 },
          { label: 'Disseny Urbà Dens', page: 20 },
          { label: 'Artèries i Passarel·les Aèries', page: 25 },
          { label: 'Directors de Projecte', page: 30 },
          { label: 'Contraportada i Normes', page: 31 },
        ]
      }
    }
  }
};

interface BimcoPortfolioFlipbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVolume?: PortfolioVolumeKey;
  currentLanguage?: LanguageCode;
}

export const BimcoPortfolioFlipbookModal: React.FC<BimcoPortfolioFlipbookModalProps> = ({
  isOpen,
  onClose,
  initialVolume = 'villas',
  currentLanguage = 'en'
}) => {
  const [activeVolume, setActiveVolume] = useState<PortfolioVolumeKey>(initialVolume);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1); // +1: next, -1: prev
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const langKey = (currentLanguage === 'fa' || currentLanguage === 'es' || currentLanguage === 'ca')
    ? currentLanguage
    : 'en';

  const isRTL = currentLanguage === 'fa';
  const currentConfig = PORTFOLIO_VOLUMES[activeVolume];
  const volLocalized = currentConfig.translations[langKey] || currentConfig.translations.en;

  // Localized UI Labels
  const ui = useMemo(() => {
    switch (langKey) {
      case 'fa':
        return {
          studioSubtitle: 'دفترچه تعاملی مونوگراف معماری | سهیل ماستی و سیاوش پازوکی',
          downloadPdf: 'دانلود PDF',
          pageText: 'صفحه',
          ofText: 'از',
          frontCover: 'روی جلد',
          backCover: 'پشت جلد',
          zoomIn: 'بزرگنمایی شیت',
          zoomOut: 'اندازه استاندارد',
          share: 'کپی لینک این پورتفولیو',
          soundMute: 'قطع صدای ورق زدن',
          soundUnmute: 'وصل صدای ورق زدن',
          fullscreen: 'حالت تمام‌صفحه',
          exitFullscreen: 'خروج از تمام‌صفحه',
          close: 'بستن دفترچه (Esc)',
          tipText: 'مشاهده شیت کامل ۱۶:۹ بدون برش • امکان کشیدن صفحه با لمس در موبایل و تبلت',
          tipMobile: 'ورق زدن: کشیدن صفحه یا کلیدهای جهت‌نما',
          location: 'بارسلونا، اسپانیا • استودیو بیمکو',
          leadership: 'سهیل ماستی و سیاوش پازوکی',
          whatsapp: 'واتساپ: ۳۴۶۱۰۸۵۵۴۳۴+',
        };
      case 'es':
        return {
          studioSubtitle: 'Monografía Arquitectónica Interactiva | Soheil Masti & Siavash Pazouki',
          downloadPdf: 'Descargar PDF',
          pageText: 'Página',
          ofText: 'de',
          frontCover: 'Portada',
          backCover: 'Contraportada',
          zoomIn: 'Ampliar lámina',
          zoomOut: 'Tamaño estándar',
          share: 'Copiar enlace del portfolio',
          soundMute: 'Silenciar sonido de páginas',
          soundUnmute: 'Activar sonido de páginas',
          fullscreen: 'Pantalla completa',
          exitFullscreen: 'Salir de pantalla completa',
          close: 'Cerrar portfolio (Esc)',
          tipText: 'Lámina arquitectónica 16:9 completa sin recortes • Desliza para pasar página en táctil',
          tipMobile: 'Pasar página: deslizar o pulsar botones',
          location: 'Barcelona, España • BIMCO Studio',
          leadership: 'Soheil Masti & Siavash Pazouki',
          whatsapp: 'WhatsApp: +34 610 855 434',
        };
      case 'ca':
        return {
          studioSubtitle: 'Monografia Arquitectònica Interactiva | Soheil Masti & Siavash Pazouki',
          downloadPdf: 'Descarregar PDF',
          pageText: 'Pàgina',
          ofText: 'de',
          frontCover: 'Portada',
          backCover: 'Contraportada',
          zoomIn: 'Ampliar làmina',
          zoomOut: 'Mida estàndard',
          share: 'Copiar enllaç del dossier',
          soundMute: 'Silenciar so de pàgines',
          soundUnmute: 'Activar so de pàgines',
          fullscreen: 'Pantalla completa',
          exitFullscreen: 'Sortir de pantalla completa',
          close: 'Tancar dossier (Esc)',
          tipText: 'Làmina arquitectònica 16:9 completa sense retallades • Llisca per passar pàgina',
          tipMobile: 'Passar pàgina: lliscar o prémer botons',
          location: 'Barcelona, Espanya • BIMCO Studio',
          leadership: 'Soheil Masti & Siavash Pazouki',
          whatsapp: 'WhatsApp: +34 610 855 434',
        };
      default:
        return {
          studioSubtitle: 'Interactive Architectural Monograph | Soheil Masti & Siavash Pazouki',
          downloadPdf: 'Download Official PDF',
          pageText: 'Page',
          ofText: 'of',
          frontCover: 'Front Cover',
          backCover: 'Back Cover',
          zoomIn: 'Zoom Sheet',
          zoomOut: 'Fit to View',
          share: 'Share Volume Link',
          soundMute: 'Mute Page Turn Sound',
          soundUnmute: 'Enable Page Turn Sound',
          fullscreen: 'Fullscreen View',
          exitFullscreen: 'Exit Fullscreen',
          close: 'Close Monograph (Esc)',
          tipText: 'Complete 16:9 Master Drawing Sheet • Touch swipe supported on iPhone, Android & iPad',
          tipMobile: 'Flip: Touch swipe or arrow buttons',
          location: 'Barcelona, Spain • BIMCO Studio',
          leadership: 'Soheil Masti & Siavash Pazouki',
          whatsapp: 'WhatsApp: +34 610 855 434',
        };
    }
  }, [langKey]);

  // List of all page image URLs for the active volume
  const pageImages = useMemo(() => {
    return Array.from({ length: currentConfig.totalPages }, (_, i) => 
      `${currentConfig.pagesFolder}/page_${String(i + 1).padStart(2, '0')}.jpg`
    );
  }, [currentConfig]);

  // Preload current, previous, and next images for zero-latency instant display
  useEffect(() => {
    if (!isOpen) return;

    const indicesToPreload = [
      currentPage,
      Math.min(currentConfig.totalPages - 1, currentPage + 1),
      Math.min(currentConfig.totalPages - 1, currentPage + 2),
      Math.max(0, currentPage - 1)
    ];

    indicesToPreload.forEach(idx => {
      if (pageImages[idx]) {
        const img = new Image();
        img.src = pageImages[idx];
      }
    });
  }, [isOpen, currentPage, pageImages, currentConfig.totalPages]);

  // Reset page when switching volume or reopening
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(0);
      setIsZoomed(false);
    }
  }, [isOpen, activeVolume]);

  const handleNext = useCallback(() => {
    if (currentPage >= currentConfig.totalPages - 1) return;
    setDirection(1);
    setCurrentPage(prev => prev + 1);
    if (isAudioEnabled) sound.playPageFlip();
  }, [currentPage, currentConfig.totalPages, isAudioEnabled]);

  const handlePrev = useCallback(() => {
    if (currentPage <= 0) return;
    setDirection(-1);
    setCurrentPage(prev => prev - 1);
    if (isAudioEnabled) sound.playPageFlip();
  }, [currentPage, isAudioEnabled]);

  const handleJumpToPage = (pageNum: number) => {
    if (pageNum === currentPage) return;
    setDirection(pageNum > currentPage ? 1 : -1);
    setCurrentPage(pageNum);
    if (isAudioEnabled) sound.playPageFlip();
  };

  const handleSwitchVolume = (volKey: PortfolioVolumeKey) => {
    if (volKey === activeVolume) return;
    sound.playClick();
    setActiveVolume(volKey);
  };

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      if (isRTL) handlePrev();
      else handleNext();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      if (isRTL) handleNext();
      else handlePrev();
    } else if (e.key === 'Home') {
      handleJumpToPage(0);
    } else if (e.key === 'End') {
      handleJumpToPage(currentConfig.totalPages - 1);
    }
  }, [isOpen, onClose, handleNext, handlePrev, isRTL, currentConfig.totalPages]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Touch Swipe gestures for iPhone, Android, and Tablets
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - touchStartX.current;
    const diffY = endY - (touchStartY.current || 0);

    // If swipe distance is > 35px and mostly horizontal
    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        // Swiped Left
        if (isRTL) handlePrev();
        else handleNext();
      } else {
        // Swiped Right
        if (isRTL) handleNext();
        else handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleCopyShareLink = () => {
    sound.playClick();
    const shareUrl = `${window.location.origin}/?portfolio=true&vol=${activeVolume}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }).catch(() => {});
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[99999] isolate flex flex-col bg-[#0b0f17] text-white select-none overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ isolation: 'isolate' }}
    >
      {/* 1. TOP HEADER & BRANDING BAR */}
      <header className="px-3 sm:px-6 py-2.5 bg-[#0f172a]/95 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-2 shrink-0 z-20 shadow-lg">
        {/* Left: BIMCO Identity */}
        <div className="flex items-center justify-between md:justify-start gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600/30 to-slate-900 p-1 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-950/30">
              <img src="/logo.png" alt="BIMCO Logo" className="w-8 h-8 object-contain drop-shadow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-sm tracking-widest text-white">BIMCO STUDIO</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  BARCELONA
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hidden sm:inline-block">
                  3 VOLUMES
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                {ui.studioSubtitle}
              </p>
            </div>
          </div>

          {/* Close button for mobile inside header */}
          <button
            onClick={onClose}
            className="md:hidden w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 flex items-center justify-center text-red-300 transition-colors cursor-pointer"
            title={ui.close}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Thematic Volume Selector Tabs */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 p-1 bg-slate-950/80 rounded-xl border border-white/10 overflow-x-auto scrollbar-none">
          {(Object.keys(PORTFOLIO_VOLUMES) as PortfolioVolumeKey[]).map((key) => {
            const vol = PORTFOLIO_VOLUMES[key];
            const trans = vol.translations[langKey] || vol.translations.en;
            const isActive = activeVolume === key;
            return (
              <button
                key={key}
                onClick={() => handleSwitchVolume(key)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-900/40 border border-amber-400/50 scale-[1.02]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
                title={trans.description}
              >
                <span className={isActive ? 'text-amber-200' : 'text-slate-400'}>{vol.icon}</span>
                <span>{trans.title}</span>
                <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isActive ? 'bg-black/30 text-amber-200' : 'bg-white/5 text-slate-400'}`}>
                  {trans.numberText}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Actions, Download & Controls */}
        <div className="hidden md:flex items-center gap-2">
          {/* Download Current Volume PDF */}
          <a
            href={currentConfig.pdfUrl}
            download={currentConfig.pdfDownloadName}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs shadow-lg shadow-amber-900/30 border border-amber-400/40 transition-all duration-200 active:scale-95 cursor-pointer"
            title={`${ui.downloadPdf} ${volLocalized.numberText} (${currentConfig.pdfSizeText})`}
          >
            <Download className="w-3.5 h-3.5 animate-bounce" />
            <span>{ui.downloadPdf} {volLocalized.numberText}</span>
            <span className="text-[10px] bg-black/20 px-1 py-0.5 rounded font-mono text-amber-200">
              {currentConfig.pdfSizeText}
            </span>
          </a>

          {/* Zoom Toggle */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isZoomed ? ui.zoomOut : ui.zoomIn}
          >
            {isZoomed ? <ZoomOut className="w-3.5 h-3.5 text-amber-400" /> : <ZoomIn className="w-3.5 h-3.5" />}
          </button>

          {/* Share Link */}
          <button
            onClick={handleCopyShareLink}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={ui.share}
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isAudioEnabled ? ui.soundMute : ui.soundUnmute}
          >
            {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isFullscreen ? ui.exitFullscreen : ui.fullscreen}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Close Modal */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 flex items-center justify-center text-red-300 hover:text-white transition-colors cursor-pointer ml-1"
            title={ui.close}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Volume Info Strip (Sub-header) */}
      <div className="px-4 py-1.5 bg-[#0f172a]/70 border-b border-white/5 flex items-center justify-between text-xs text-slate-300 font-mono">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-bold text-amber-300">{volLocalized.numberText}:</span>
          <span>{volLocalized.title}</span>
        </div>

        {/* Page status indicator */}
        <div className="flex items-center gap-3">
          <span className="text-slate-300">
            {ui.pageText} <span className="text-amber-400 font-bold">{currentPage + 1}</span> {ui.ofText} {currentConfig.totalPages}
          </span>
          {currentPage === 0 && (
            <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              {ui.frontCover}
            </span>
          )}
          {currentPage === currentConfig.totalPages - 1 && (
            <span className="text-amber-400 font-bold text-[10px] bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              {ui.backCover}
            </span>
          )}
          
          {/* Mobile Download Button */}
          <a
            href={currentConfig.pdfUrl}
            download={currentConfig.pdfDownloadName}
            className="md:hidden flex items-center gap-1 text-[11px] bg-amber-600 hover:bg-amber-500 text-white px-2 py-0.5 rounded-md font-bold"
          >
            <Download className="w-3 h-3" />
            <span>PDF</span>
          </a>
        </div>
      </div>

      {/* 2. MAIN SINGLE FULL-SHEET 3D FOLIO STAGE (Centered 16:9 Architecture Display) */}
      <main 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex-1 relative flex items-center justify-center p-2 sm:p-4 overflow-hidden touch-pan-y"
        style={{ perspective: '1600px' }}
      >
        {/* Navigation Previous Button */}
        <button
          onClick={isRTL ? handleNext : handlePrev}
          disabled={isRTL ? currentPage >= currentConfig.totalPages - 1 : currentPage <= 0}
          className={`absolute left-2 sm:left-6 z-30 w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl ${
            (isRTL ? currentPage >= currentConfig.totalPages - 1 : currentPage <= 0)
              ? 'bg-white/5 text-slate-700 opacity-20 cursor-not-allowed pointer-events-none' 
              : 'bg-slate-900/90 hover:bg-amber-600 text-white border border-white/20 hover:scale-110 hover:border-amber-400 active:scale-95'
          }`}
          title={isRTL ? 'صفحه بعد' : 'Previous Page'}
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Widescreen 16:9 Architectural Folio Board (Strict Unstretched Proportions) */}
        <div 
          className={`relative flex items-center justify-center w-full h-full max-w-full transition-transform duration-300 ${
            isZoomed ? 'scale-115' : 'scale-100'
          }`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%'
          }}
        >
          <div 
            className="relative flex items-center justify-center transition-all duration-300"
            style={{ 
              maxWidth: 'min(1720px, calc((100vh - 150px) * 16 / 9))',
              aspectRatio: '16 / 9',
              width: '100%',
              height: 'auto',
              maxHeight: 'calc(100vh - 150px)'
            }}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={`${activeVolume}-${currentPage}`}
                custom={direction}
                initial={{ 
                  opacity: 0, 
                  rotateY: direction > 0 ? 8 : -8,
                  x: direction > 0 ? 25 : -25,
                  scale: 0.985
                }}
                animate={{ 
                  opacity: 1, 
                  rotateY: 0,
                  x: 0,
                  scale: 1,
                  transition: {
                    duration: 0.32,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  rotateY: direction > 0 ? -8 : 8,
                  x: direction > 0 ? -25 : 25,
                  scale: 0.985,
                  transition: {
                    duration: 0.22,
                    ease: [0.4, 0, 1, 1]
                  }
                }}
                className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#0c1017] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex items-center justify-center select-none"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={pageImages[currentPage]}
                  alt={`${volLocalized.title} - ${ui.pageText} ${currentPage + 1}`}
                  className="w-full h-full object-contain pointer-events-none select-none max-w-full max-h-full"
                  loading="eager"
                  decoding="async"
                />

                {/* Subtle paper depth edge highlight */}
                <div className="absolute inset-0 pointer-events-none rounded-xl sm:rounded-2xl ring-1 ring-inset ring-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Next Button */}
        <button
          onClick={isRTL ? handlePrev : handleNext}
          disabled={isRTL ? currentPage <= 0 : currentPage >= currentConfig.totalPages - 1}
          className={`absolute right-2 sm:right-6 z-30 w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl ${
            (isRTL ? currentPage <= 0 : currentPage >= currentConfig.totalPages - 1)
              ? 'bg-white/5 text-slate-700 opacity-20 cursor-not-allowed pointer-events-none' 
              : 'bg-slate-900/90 hover:bg-amber-600 text-white border border-white/20 hover:scale-110 hover:border-amber-400 active:scale-95'
          }`}
          title={isRTL ? 'صفحه قبل' : 'Next Page'}
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </main>

      {/* 3. BOTTOM SCRUBBER & CATEGORY SHORTCUTS BAR */}
      <footer className="px-3 sm:px-6 py-2 bg-[#0f172a]/95 border-t border-white/10 flex flex-col justify-center shrink-0 z-20 gap-1.5">
        {/* Quick jump tags for active volume */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none justify-start sm:justify-center">
          {volLocalized.shortcuts.map((sec, idx) => {
            const isSelected = currentPage === sec.page;
            return (
              <button
                key={idx}
                onClick={() => handleJumpToPage(sec.page)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-600 text-white font-bold shadow-xs scale-105 border border-amber-400'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {sec.label}
              </button>
            );
          })}
        </div>

        {/* Interactive scrubber & Studio watermark */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">{ui.tipText}</span>
            <span className="sm:hidden">{ui.tipMobile}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden md:inline">{ui.location}</span>
            <span className="text-amber-400/90 font-bold">{ui.leadership}</span>
            <span className="hidden lg:inline text-[10px] text-slate-400">{ui.whatsapp}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
