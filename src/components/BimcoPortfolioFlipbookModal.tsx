import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { PageFlip } from 'page-flip';
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
  page: number; // 0-based page index to flip to
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
    totalPages: 32,
    pdfUrl: '/BIMCO_Volume1_Villas_Portfolio.pdf',
    pdfDownloadName: 'BIMCO_Volume1_Luxury_Villas_Portfolio_2026.pdf',
    pdfSizeText: '24.5 MB',
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
          { label: 'Dalkhani Forest Villa', page: 3 },
          { label: 'Concrete & Glass Villa', page: 5 },
          { label: 'Violet Villa (Concept)', page: 7 },
          { label: 'Violet (Site Execution)', page: 9 },
          { label: 'Mountain Chalet', page: 11 },
          { label: 'Tehran Dasht Villa', page: 13 },
          { label: 'Modern Villa Series', page: 15 },
          { label: 'Australia Curve Villa', page: 17 },
          { label: 'Brutalist Concrete', page: 19 },
          { label: 'Landscape & Pergolas', page: 21 },
          { label: 'Diamond Villa Town', page: 23 },
          { label: 'Villa Interiors & Joinery', page: 25 },
          { label: 'Execution Standards', page: 27 },
          { label: 'Project Directors', page: 29 },
          { label: 'Back Cover', page: 31 },
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
          { label: 'ویلای جنگلی دالخانی', page: 3 },
          { label: 'ویلای بتن و شیشه', page: 5 },
          { label: 'ویلای وایولت (کانسپت)', page: 7 },
          { label: 'وایولت (نظارت کارگاهی)', page: 9 },
          { label: 'شاله سنگی کوهستان', page: 11 },
          { label: 'ویلای تهراندشت', page: 13 },
          { label: 'مجموعه ویلاهای مدرن', page: 15 },
          { label: 'ویلای منحنی استرالیا', page: 17 },
          { label: 'ویلای بروتالیست صخره‌ای', page: 19 },
          { label: 'محوطه‌سازی و پرگولا', page: 21 },
          { label: 'شهرک ویلایی دایموند', page: 23 },
          { label: 'معماری داخلی و درودگری', page: 25 },
          { label: 'استانداردهای شش‌گانه', page: 27 },
          { label: 'سرپرستان پروژه', page: 29 },
          { label: 'پشت جلد', page: 31 },
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
          { label: 'Villa Dalkhani en Bosque', page: 3 },
          { label: 'Villa Hormigón y Vidrio', page: 5 },
          { label: 'Villa Violet (Concepto)', page: 7 },
          { label: 'Violet (Dirección de Obra)', page: 9 },
          { label: 'Chalet de Montaña', page: 11 },
          { label: 'Villa Tehrandasht', page: 13 },
          { label: 'Serie Villas Modernas', page: 15 },
          { label: 'Villa Curva Australia', page: 17 },
          { label: 'Villa Brutalista', page: 19 },
          { label: 'Paisajismo y Pérgolas', page: 21 },
          { label: 'Urbanización Diamond', page: 23 },
          { label: 'Interiores y Carpintería', page: 25 },
          { label: 'Protocolo de Ejecución', page: 27 },
          { label: 'Directores de Proyecto', page: 29 },
          { label: 'Contraportada', page: 31 },
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
          { label: 'Vil·la Dalkhani al Bosc', page: 3 },
          { label: 'Vil·la Formigó i Vidre', page: 5 },
          { label: 'Vil·la Violet (Concepte)', page: 7 },
          { label: 'Violet (Direcció d\'Obra)', page: 9 },
          { label: 'Chalet de Muntanya', page: 11 },
          { label: 'Vil·la Tehrandasht', page: 13 },
          { label: 'Sèrie Vil·les Modernes', page: 15 },
          { label: 'Vil·la Curba Austràlia', page: 17 },
          { label: 'Vil·la Brutalista', page: 19 },
          { label: 'Paisatgisme i Pèrgoles', page: 21 },
          { label: 'Urbanització Diamond', page: 23 },
          { label: 'Interiors i Fusteria', page: 25 },
          { label: 'Protocol d\'Execució', page: 27 },
          { label: 'Directors de Projecte', page: 29 },
          { label: 'Contraportada', page: 31 },
        ]
      }
    }
  },
  apartments: {
    id: 'apartments',
    totalPages: 32,
    pdfUrl: '/BIMCO_Volume2_Apartments_Facades.pdf',
    pdfDownloadName: 'BIMCO_Volume2_Apartments_Facades_2026.pdf',
    pdfSizeText: '23.8 MB',
    pagesFolder: '/portfolio_apartments/book_pages',
    icon: <Building2 className="w-4 h-4" />,
    translations: {
      en: {
        numberText: 'Volume II',
        badge: 'APARTMENTS & FACADES',
        title: 'Residential & Facade Engineering',
        description: 'Derous facade engineering, Dalkhani terraced housing, modular towers, classical palace and 1:20 details',
        shortcuts: [
          { label: 'Front Cover', page: 0 },
          { label: 'Facade Manifesto & Index', page: 1 },
          { label: 'Darrous Facade Entrance', page: 3 },
          { label: 'Darrous Night Lighting', page: 5 },
          { label: 'Darrous Elevation Geometry', page: 7 },
          { label: 'Darrous 1:20 Cladding Details', page: 9 },
          { label: 'Dalkhani Stepped Terraces', page: 11 },
          { label: 'Dalkhani Floor Plans', page: 13 },
          { label: 'Dalkhani Sections & Steps', page: 15 },
          { label: 'Mid-Rise Urban Enclave', page: 17 },
          { label: 'Modern Urban Apartments', page: 19 },
          { label: 'High-Rise Typology 01', page: 21 },
          { label: 'High-Rise Typology 02', page: 23 },
          { label: 'Classical Palace', page: 25 },
          { label: 'Execution Standards', page: 27 },
          { label: 'Project Directors', page: 29 },
          { label: 'Back Cover', page: 31 },
        ]
      },
      fa: {
        numberText: 'جلد دوم',
        badge: 'APARTMENTS & FACADES',
        title: 'ساختمان‌های مسکونی و مهندسی نما',
        description: 'طراحی نمای دروس، مسکونی شیب‌دار دالخانی، برج‌های مدولار و جزئیات اجرایی ۱:۲۰',
        shortcuts: [
          { label: 'روی جلد', page: 0 },
          { label: 'مانیفست نما و فهرست', page: 1 },
          { label: 'نمای دروس (ورودی و لابی)', page: 3 },
          { label: 'نورپردازی شب دروس', page: 5 },
          { label: 'هندسه لوور و سایه‌بان دروس', page: 7 },
          { label: 'جزئیات اجرایی ۱:۲۰ دروس', page: 9 },
          { label: 'مسکونی پلکانی دالخانی', page: 11 },
          { label: 'پلان‌های طبقات دالخانی', page: 13 },
          { label: 'برش و ترازهای دالخانی', page: 15 },
          { label: 'مسکونی میان‌مرتبه مدرن', page: 17 },
          { label: 'مجتمع آپارتمانی شهری', page: 19 },
          { label: 'برج مدولار تیپ یک', page: 21 },
          { label: 'برج مدولار تیپ دو', page: 23 },
          { label: 'کاخ کلاسیک مجلل', page: 25 },
          { label: 'استانداردهای مهندسی نما', page: 27 },
          { label: 'سرپرستان پروژه', page: 29 },
          { label: 'پشت جلد', page: 31 },
        ]
      },
      es: {
        numberText: 'Volumen II',
        badge: 'APARTMENTS & FACADES',
        title: 'Residencial y Fachadas Técnicas',
        description: 'Ingeniería de fachada Darrous, residencial Dalkhani en ladera, torres modulares y palacio clásico',
        shortcuts: [
          { label: 'Portada', page: 0 },
          { label: 'Manifiesto de Fachada e Índice', page: 1 },
          { label: 'Fachada Darrous (Entrada)', page: 3 },
          { label: 'Iluminación Nocturna Darrous', page: 5 },
          { label: 'Lamas y Geometría Solar', page: 7 },
          { label: 'Detalles Constructivos 1:20', page: 9 },
          { label: 'Residencial Dalkhani en Ladera', page: 11 },
          { label: 'Plantas Distribución Dalkhani', page: 13 },
          { label: 'Secciones y Terrazas Dalkhani', page: 15 },
          { label: 'Residencial Urbano Moderno', page: 17 },
          { label: 'Complejo Colectivo Urbano', page: 19 },
          { label: 'Torre Modular Tipología 01', page: 21 },
          { label: 'Torre Modular Tipología 02', page: 23 },
          { label: 'Palacio Clásico Monumental', page: 25 },
          { label: 'Protocolo de Fachadas', page: 27 },
          { label: 'Directores de Proyecto', page: 29 },
          { label: 'Contraportada', page: 31 },
        ]
      },
      ca: {
        numberText: 'Volum II',
        badge: 'APARTMENTS & FACADES',
        title: 'Apartaments i Enginyeria de Façanes',
        description: 'Enginyeria de façana Darrous, residencial en pendent Dalkhani, torres modulars i palau clàssic',
        shortcuts: [
          { label: 'Portada', page: 0 },
          { label: 'Manifest de Façana i Índex', page: 1 },
          { label: 'Façana Darrous (Entrada)', page: 3 },
          { label: 'Il·luminació Nocturna Darrous', page: 5 },
          { label: 'Lamel·les i Geometria Solar', page: 7 },
          { label: 'Detalls Constructius 1:20', page: 9 },
          { label: 'Residencial Dalkhani en Pendent', page: 11 },
          { label: 'Plantes Distribució Dalkhani', page: 13 },
          { label: 'Seccions i Terrasses Dalkhani', page: 15 },
          { label: 'Residencial Urbà Modern', page: 17 },
          { label: 'Complex Col·lectiu Urbà', page: 19 },
          { label: 'Torre Modular Tipologia 01', page: 21 },
          { label: 'Torre Modular Tipologia 02', page: 23 },
          { label: 'Palau Clàssic Monumental', page: 25 },
          { label: 'Protocol de Façanes', page: 27 },
          { label: 'Directors de Projecte', page: 29 },
          { label: 'Contraportada', page: 31 },
        ]
      }
    }
  },
  urban: {
    id: 'urban',
    totalPages: 32,
    pdfUrl: '/BIMCO_Volume3_Urban_Commercial.pdf',
    pdfDownloadName: 'BIMCO_Volume3_Urban_Commercial_2026.pdf',
    pdfSizeText: '26.1 MB',
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
          { label: 'Steel Complex Master Site', page: 3 },
          { label: 'Steel Commercial Showrooms', page: 5 },
          { label: 'Administrative & Bank HQ', page: 7 },
          { label: 'Logistics Bays & Elevation', page: 9 },
          { label: 'Erbil Department Store', page: 11 },
          { label: 'Retail Concourse & Skylight', page: 13 },
          { label: 'Store Plans & Sections', page: 15 },
          { label: 'Metropolitan Infrastructure', page: 17 },
          { label: 'Zargandeh Basin Morphology', page: 19 },
          { label: 'Riverbank Ecological Spine', page: 21 },
          { label: 'High-Density Skyline', page: 23 },
          { label: 'Transit-Oriented Development', page: 25 },
          { label: 'Execution Standards', page: 27 },
          { label: 'Project Directors', page: 29 },
          { label: 'Back Cover', page: 31 },
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
          { label: 'مجتمع فولاد شرق (سایت کلان)', page: 3 },
          { label: 'نمایشگاه‌های تخصصی فولاد', page: 5 },
          { label: 'ساختمان اداری و شعبه بانک', page: 7 },
          { label: 'بخش بارگیری و نمای اتوبان', page: 9 },
          { label: 'مرکز تجاری قوسی اربیل', page: 11 },
          { label: 'آتریوم مرکزی و نورگیر سقف', page: 13 },
          { label: 'پلان‌های طبقات و مقاطع اربیل', page: 15 },
          { label: 'تقاطع غیرهمسطح و پل شهری', page: 17 },
          { label: 'مورفولوژی روددره زرگنده', page: 19 },
          { label: 'احیای اکولوژیک روددره', page: 21 },
          { label: 'اسکای‌لاین و کوریدورهای نور', page: 23 },
          { label: 'توسعه مبتنی بر حمل‌ونقل (TOD)', page: 25 },
          { label: 'استانداردهای طراحی شهری', page: 27 },
          { label: 'سرپرستان پروژه', page: 29 },
          { label: 'پشت جلد', page: 31 },
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
          { label: 'Master Site Shargh Steel', page: 3 },
          { label: 'Naves y Showrooms Comerciales', page: 5 },
          { label: 'Sede Administrativa y Bancaria', page: 7 },
          { label: 'Muelles Logísticos y Fachada', page: 9 },
          { label: 'Centro Comercial Curvo Erbil', page: 11 },
          { label: 'Galería Central y Lucernarios', page: 13 },
          { label: 'Plantas y Secciones Erbil', page: 15 },
          { label: 'Infraestructura Metropolitana', page: 17 },
          { label: 'Morfología Cuenca Zargandeh', page: 19 },
          { label: 'Regeneración Ribera Fluvial', page: 21 },
          { label: 'Skyline Urbano Denso y CFD', page: 23 },
          { label: 'Desarrollo Orientado al Transporte', page: 25 },
          { label: 'Protocolo Urbano y BIM', page: 27 },
          { label: 'Directores de Proyecto', page: 29 },
          { label: 'Contraportada', page: 31 },
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
          { label: 'Master Site Shargh Steel', page: 3 },
          { label: 'Naus i Showrooms Comercials', page: 5 },
          { label: 'Seu Administrativa i Bancària', page: 7 },
          { label: 'Molls Logístics i Façana', page: 9 },
          { label: 'Centre Comercial Corbat Erbil', page: 11 },
          { label: 'Galeria Central i Lluernes', page: 13 },
          { label: 'Plantes i Seccions Erbil', page: 15 },
          { label: 'Infraestructura Metropolitana', page: 17 },
          { label: 'Morfologia Conca Zargandeh', page: 19 },
          { label: 'Regeneració Ribera Fluvial', page: 21 },
          { label: 'Skyline Urbà Dens i CFD', page: 23 },
          { label: 'Desenvolupament Orientat al Transport', page: 25 },
          { label: 'Protocol Urbà i BIM', page: 27 },
          { label: 'Directors de Projecte', page: 29 },
          { label: 'Contraportada', page: 31 },
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
  const containerRef = useRef<HTMLDivElement>(null);
  const flipBookInstance = useRef<PageFlip | null>(null);

  const [activeVolume, setActiveVolume] = useState<PortfolioVolumeKey>(initialVolume);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isPortraitMode, setIsPortraitMode] = useState<boolean>(false);
  const [isBookReady, setIsBookReady] = useState<boolean>(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Sync active volume with initialVolume prop if provided
  useEffect(() => {
    if (initialVolume && PORTFOLIO_VOLUMES[initialVolume]) {
      setActiveVolume(initialVolume);
    }
  }, [initialVolume]);

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
          downloadPdf: 'دانلود PDF اصلی',
          pageText: 'صفحه',
          pagesText: 'صفحات',
          ofText: 'از',
          frontCover: 'روی جلد',
          backCover: 'پشت جلد',
          zoomIn: 'بزرگنمایی شیت',
          zoomOut: 'اندازه استاندارد',
          share: 'کپی لینک این جلد',
          soundMute: 'قطع صدای ورق زدن',
          soundUnmute: 'وصل صدای ورق زدن',
          fullscreen: 'حالت تمام‌صفحه',
          exitFullscreen: 'خروج از تمام‌صفحه',
          close: 'بستن دفترچه (Esc)',
          tipText: 'ورق زدن فیزیکی کتاب: کشیدن گوشه برگه‌ها با ماوس یا لمس • دکمه‌های جهت‌نما',
          location: 'بارسلونا، اسپانیا • استودیو بیمکو',
          leadership: 'سهیل ماستی و سیاوش پازوکی',
          whatsapp: 'واتساپ: ۳۴۶۱۰۸۵۵۴۳۴+',
        };
      case 'es':
        return {
          studioSubtitle: 'Monografía Arquitectónica Interactiva | Soheil Masti & Siavash Pazouki',
          downloadPdf: 'Descargar PDF Oficial',
          pageText: 'Página',
          pagesText: 'Páginas',
          ofText: 'de',
          frontCover: 'Portada',
          backCover: 'Contraportada',
          zoomIn: 'Ampliar lámina',
          zoomOut: 'Tamaño estándar',
          share: 'Copiar enlace de este tomo',
          soundMute: 'Silenciar sonido de páginas',
          soundUnmute: 'Activar sonido de páginas',
          fullscreen: 'Pantalla completa',
          exitFullscreen: 'Salir de pantalla completa',
          close: 'Cerrar portfolio (Esc)',
          tipText: 'Giro de libro físico: arrastre esquinas con ratón o táctil • Flechas del teclado',
          location: 'Barcelona, España • BIMCO Studio',
          leadership: 'Soheil Masti & Siavash Pazouki',
          whatsapp: 'WhatsApp: +34 610 855 434',
        };
      case 'ca':
        return {
          studioSubtitle: 'Monografia Arquitectònica Interactiva | Soheil Masti & Siavash Pazouki',
          downloadPdf: 'Descarregar PDF Oficial',
          pageText: 'Pàgina',
          pagesText: 'Pàgines',
          ofText: 'de',
          frontCover: 'Portada',
          backCover: 'Contraportada',
          zoomIn: 'Ampliar làmina',
          zoomOut: 'Mida estàndard',
          share: 'Copiar enllaç d\'aquest volum',
          soundMute: 'Silenciar so de pàgines',
          soundUnmute: 'Activar so de pàgines',
          fullscreen: 'Pantalla completa',
          exitFullscreen: 'Sortir de pantalla completa',
          close: 'Tancar dossier (Esc)',
          tipText: 'Gir de llibre físic: arrossegueu cantonades amb ratolí o tàctil • Fletxes del teclat',
          location: 'Barcelona, Espanya • BIMCO Studio',
          leadership: 'Soheil Masti & Siavash Pazouki',
          whatsapp: 'WhatsApp: +34 610 855 434',
        };
      default:
        return {
          studioSubtitle: 'Interactive Architectural Monograph | Soheil Masti & Siavash Pazouki',
          downloadPdf: 'Download Official PDF',
          pageText: 'Page',
          pagesText: 'Pages',
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
          tipText: 'Authentic 2-Page Book: Drag page corners or use arrow keys / touch swipe',
          location: 'Barcelona, Spain • BIMCO Studio',
          leadership: 'Soheil Masti & Siavash Pazouki',
          whatsapp: 'WhatsApp: +34 610 855 434',
        };
    }
  }, [langKey]);

  // List of all 32 page image URLs for active volume
  const pageImages = useMemo(() => {
    return Array.from({ length: currentConfig.totalPages }, (_, i) => 
      `${currentConfig.pagesFolder}/page_${String(i + 1).padStart(2, '0')}.jpg`
    );
  }, [currentConfig]);

  // Preload images
  useEffect(() => {
    if (!isOpen) return;
    const indicesToPreload = [
      0, 1, 2, 3, 4,
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

  // Initialize PageFlip instance
  useEffect(() => {
    if (!isOpen) return;

    setIsBookReady(false);
    setCurrentPage(0);
    setIsZoomed(false);

    let localPageFlip: PageFlip | null = null;
    let fallbackTimer: any = null;

    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      // Base page dimensions (8:9 ratio: 560 x 630 -> 2 pages = 1120 x 630 = 16:9)
      const baseW = 560;
      const baseH = 630;

      try {
        localPageFlip = new PageFlip(containerRef.current, {
          width: baseW,
          height: baseH,
          size: 'stretch',
          minWidth: 280,
          maxWidth: 960,
          minHeight: 315,
          maxHeight: 1080,
          maxShadowOpacity: 0.45,
          showCover: true,
          mobileScrollSupport: false,
          usePortrait: true,
          startPage: 0,
          drawShadow: true,
          flippingTime: 700,
          useMouseEvents: true,
          showPageCorners: true,
          swipeDistance: 25,
        });

        localPageFlip.loadFromImages(pageImages);

        localPageFlip.on('flip', (e: any) => {
          const pageIndex = typeof e.data === 'number' ? e.data : (localPageFlip?.getCurrentPageIndex() ?? 0);
          setCurrentPage(pageIndex);
          if (isAudioEnabled) {
            sound.playPageFlip();
          }
        });

        localPageFlip.on('changeOrientation', (e: any) => {
          setIsPortraitMode(e.data === 'portrait');
        });

        localPageFlip.on('init', () => {
          setIsBookReady(true);
          if (localPageFlip) {
            setIsPortraitMode((localPageFlip as any).getOrientation?.() === 'portrait');
          }
        });

        fallbackTimer = setTimeout(() => {
          setIsBookReady(true);
          if (localPageFlip) {
            setIsPortraitMode((localPageFlip as any).getOrientation?.() === 'portrait');
          }
        }, 500);

        flipBookInstance.current = localPageFlip;
      } catch (err) {
        console.error('PageFlip initialization error:', err);
      }
    }, 60);

    return () => {
      clearTimeout(timer);
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (localPageFlip) {
        try {
          localPageFlip.destroy();
        } catch (e) {
          // ignore cleanup errors
        }
      }
      flipBookInstance.current = null;
    };
  }, [isOpen, activeVolume, pageImages, isAudioEnabled]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') {
      if (isZoomed) {
        setIsZoomed(false);
      } else {
        onClose();
      }
    } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      flipBookInstance.current?.flipNext();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      flipBookInstance.current?.flipPrev();
    }
  }, [isOpen, isZoomed, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handlePrev = useCallback(() => {
    flipBookInstance.current?.flipPrev();
  }, []);

  const handleNext = useCallback(() => {
    flipBookInstance.current?.flipNext();
  }, []);

  const handleJumpToPage = useCallback((pageNum: number) => {
    if (flipBookInstance.current) {
      flipBookInstance.current.flip(pageNum);
      if (isAudioEnabled) sound.playPageFlip();
    }
  }, [isAudioEnabled]);

  const handleSwitchVolume = useCallback((volKey: PortfolioVolumeKey) => {
    if (volKey === activeVolume) return;
    sound.playClick();
    setActiveVolume(volKey);
  }, [activeVolume]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  const handleCopyShareLink = useCallback(() => {
    sound.playClick();
    const shareUrl = `${window.location.origin}/?portfolio=true&vol=${activeVolume}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }).catch(() => {});
  }, [activeVolume]);

  // Touch Swipe Support
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    // Dominant horizontal swipe
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        // Swiped Left -> Next page
        handleNext();
      } else {
        // Swiped Right -> Prev page
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Centering transform calculation:
  // When closed at start (page 0): cover sits on the right half. Translate -25% shifts it to exact center!
  // When closed at end (page 31): back cover sits on the left half. Translate +25% shifts it to exact center!
  // When open (pages 1 to 30): center spine is exactly in the middle. Translate 0%!
  const bookTransformStyle = useMemo(() => {
    if (isPortraitMode) return 'none';
    if (currentPage === 0) return 'translateX(-25%)';
    if (currentPage >= currentConfig.totalPages - 1) return 'translateX(25%)';
    return 'translateX(0%)';
  }, [isPortraitMode, currentPage, currentConfig.totalPages]);

  // Compute readable page range string
  const pageStatusText = useMemo(() => {
    if (currentPage === 0) {
      return `${ui.frontCover} (1 / ${currentConfig.totalPages})`;
    }
    if (currentPage >= currentConfig.totalPages - 1) {
      return `${ui.backCover} (${currentConfig.totalPages} / ${currentConfig.totalPages})`;
    }
    if (isPortraitMode) {
      return `${ui.pageText} ${currentPage + 1} ${ui.ofText} ${currentConfig.totalPages}`;
    }
    // 2-page spread
    const leftPage = currentPage % 2 === 1 ? currentPage + 1 : currentPage;
    const rightPage = Math.min(currentConfig.totalPages, leftPage + 1);
    return `${ui.pagesText} ${String(leftPage).padStart(2, '0')} – ${String(rightPage).padStart(2, '0')} ${ui.ofText} ${currentConfig.totalPages}`;
  }, [currentPage, currentConfig.totalPages, isPortraitMode, ui]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col bg-[#080c12]/98 backdrop-blur-2xl text-slate-100 select-none overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* 1. TOP HEADER & STUDIO IDENTITY */}
      <header className="px-3 sm:px-6 py-2.5 bg-slate-950/90 border-b border-white/10 flex items-center justify-between gap-2 shrink-0 z-20 shadow-md">
        {/* Left: Studio Barcelona & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center p-1">
            <img src="/logo.png" alt="BIMCO Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-xs sm:text-sm tracking-wider font-mono">BIMCO</span>
              <span className="text-[10px] text-amber-400 font-semibold px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                BARCELONA
              </span>
            </div>
            <div className="text-[10px] text-slate-400 hidden md:block">
              {ui.studioSubtitle}
            </div>
          </div>
        </div>

        {/* Center: Volume Selector Buttons */}
        <div className="flex items-center gap-1 sm:gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
          {(['villas', 'apartments', 'urban'] as PortfolioVolumeKey[]).map((volKey) => {
            const v = PORTFOLIO_VOLUMES[volKey];
            const vLoc = v.translations[langKey] || v.translations.en;
            const isActive = activeVolume === volKey;
            return (
              <button
                key={volKey}
                onClick={() => handleSwitchVolume(volKey)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40 border border-amber-400'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {v.icon}
                <span className="hidden sm:inline">{vLoc.numberText}:</span>
                <span>{vLoc.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Actions (Download PDF, Share, Sound, Fullscreen, Close) */}
        <div className="flex items-center gap-1.5">
          {/* Official PDF Download Button */}
          <a
            href={currentConfig.pdfUrl}
            download={currentConfig.pdfDownloadName}
            className="hidden sm:flex items-center gap-1.5 text-xs bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white px-3 py-1.5 rounded-xl font-bold transition-colors shadow-sm cursor-pointer"
            title={`${ui.downloadPdf} (${currentConfig.pdfSizeText})`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
            <span className="text-[10px] bg-black/20 px-1 py-0.5 rounded font-mono text-amber-200">
              {currentConfig.pdfSizeText}
            </span>
          </a>

          {/* Zoom Toggle */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
              isZoomed 
                ? 'bg-amber-600 border-amber-400 text-white' 
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
            }`}
            title={isZoomed ? ui.zoomOut : ui.zoomIn}
          >
            {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
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
      <div className="px-4 py-1.5 bg-slate-900/70 border-b border-white/5 flex items-center justify-between text-xs text-slate-300 font-mono">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-bold text-amber-300">{volLocalized.numberText}:</span>
          <span className="truncate max-w-[280px] sm:max-w-md">{volLocalized.title}</span>
        </div>

        {/* Page status indicator */}
        <div className="flex items-center gap-3">
          <span className="text-slate-300 font-medium">
            {pageStatusText}
          </span>
          {currentPage === 0 && (
            <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 hidden sm:inline">
              {ui.frontCover}
            </span>
          )}
          {currentPage >= currentConfig.totalPages - 1 && (
            <span className="text-amber-400 font-bold text-[10px] bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 hidden sm:inline">
              {ui.backCover}
            </span>
          )}
          
          {/* Mobile Download Button */}
          <a
            href={currentConfig.pdfUrl}
            download={currentConfig.pdfDownloadName}
            className="sm:hidden flex items-center gap-1 text-[11px] bg-amber-600 hover:bg-amber-500 text-white px-2 py-0.5 rounded-md font-bold"
          >
            <Download className="w-3 h-3" />
            <span>PDF</span>
          </a>
        </div>
      </div>

      {/* 2. MAIN 3D FLIPBOOK STAGE */}
      <main 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex-1 relative flex items-center justify-center p-2 sm:p-4 overflow-hidden touch-pan-y bg-[#0a0e14]"
      >
        {/* Navigation Chevron Left */}
        <button
          onClick={handlePrev}
          disabled={currentPage <= 0}
          className={`absolute left-2 sm:left-6 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xl ${
            currentPage <= 0 
              ? 'bg-white/5 text-slate-600 opacity-20 cursor-not-allowed' 
              : 'bg-slate-900/80 hover:bg-amber-600 text-white border border-white/15 hover:scale-105 hover:border-amber-400'
          }`}
          title="Previous Page (Left Arrow)"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* 3D FlipBook Target Canvas Container */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <div 
            className="transition-transform duration-600 ease-out flex items-center justify-center pointer-events-auto"
            style={{
              transform: isZoomed ? `scale(1.28) ${bookTransformStyle}` : bookTransformStyle,
              willChange: 'transform'
            }}
          >
            <div 
              key={activeVolume}
              ref={containerRef} 
              className="shadow-2xl drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)] rounded-sm overflow-hidden"
            />
          </div>
        </div>

        {/* Navigation Chevron Right */}
        <button
          onClick={handleNext}
          disabled={currentPage >= currentConfig.totalPages - 1}
          className={`absolute right-2 sm:right-6 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xl ${
            currentPage >= currentConfig.totalPages - 1 
              ? 'bg-white/5 text-slate-600 opacity-20 cursor-not-allowed' 
              : 'bg-slate-900/80 hover:bg-amber-600 text-white border border-white/15 hover:scale-105 hover:border-amber-400'
          }`}
          title="Next Page (Right Arrow)"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </main>

      {/* 3. BOTTOM CATEGORY SHORTCUTS & VERIFICATION BAR */}
      <footer className="px-3 sm:px-6 py-2 bg-slate-950/95 border-t border-white/10 flex flex-col justify-center shrink-0 z-20">
        {/* Quick jump tags for active volume */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none justify-start sm:justify-center">
          {volLocalized.shortcuts.map((sec, idx) => {
            const isSelected = sec.page === 0 
              ? currentPage === 0 
              : sec.page === currentConfig.totalPages - 1
                ? currentPage >= currentConfig.totalPages - 1
                : currentPage === sec.page || currentPage === sec.page + 1;

            return (
              <button
                key={idx}
                onClick={() => handleJumpToPage(sec.page)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-600 text-white font-bold shadow-sm scale-105 border border-amber-400'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {sec.label}
              </button>
            );
          })}
        </div>

        {/* Interactive instruction / Studio watermark */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">{ui.tipText}</span>
            <span className="sm:hidden">ورق زدن: کشیدن برگه‌ها یا کلیدهای چپ/راست</span>
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
