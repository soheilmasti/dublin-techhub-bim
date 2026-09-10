import { CategoryBuilding, Project, ResumeProfile } from '../types';
import { LanguageCode, TRANSLATIONS } from './i18n';
import { RESUME_DATA } from '../data/initialData';

// -----------------------------------------------------------------------------
// 1. PROJECT TRANSLATION CATALOG FOR ALL 18 ARCHITECTURAL WORKS
// -----------------------------------------------------------------------------

interface ProjectTranslation {
  title: Record<LanguageCode, string>;
  concept: Record<LanguageCode, string>;
  features: Record<LanguageCode, string[]>;
  location: Record<LanguageCode, string>;
  area: Record<LanguageCode, string>;
  role?: Record<LanguageCode, string>;
  client?: Record<LanguageCode, string>;
}

export const PROJECT_TRANSLATIONS: Record<string, ProjectTranslation> = {
  // 1. Category 01: Urban Design
  'bandar-coastal-masterplan': {
    title: {
      fa: 'طراحی شهری و سایت‌پلان توسعه ساحلی بندرعباس',
      en: 'Bandar Abbas Coastal City & Port Masterplan',
      ca: 'Pla Director Urbà i Portuari de la Costa de Bandar Abbas',
      es: 'Plan Director Urbano y Portuario Costero de Bandar Abbas',
      fr: 'Schéma Directeur Urbain et Portuaire Côtier de Bandar Abbas',
      de: 'Masterplan für Küstenstadt & Hafen Bandar Abbas',
      it: 'Masterplan Urbano e Portuale Costiero di Bandar Abbas',
    },
    concept: {
      fa: 'طراحی شهری پایدار ساحلی با ایجاد کانال‌های آبی، جزایر مسکونی و تجاری متصل با پل‌های معلق، خط آسمان مدرن و بلوار پیاده‌محور در امتداد دریا جهت کاهش اثرات زیست‌محیطی و پیشگیری از گسترش بی‌رویه شهر (Urban Sprawl).',
      en: 'Sustainable coastal urban masterplan featuring navigational water channels, interconnected residential and commercial islands, cable-stayed pedestrian bridges, modern skyline typologies, and an active maritime esplanade to counter urban sprawl.',
      ca: 'Pla director urbà costaner sostenible amb canals d’aigua navegables, illes residencials i comercials interconnectades per ponts de tirants, un skyline contemporani i un passeig marítim per frenar l’expansió urbana descontrolada.',
      es: 'Plan director urbano costero sostenible con canales de agua navegables, islas residenciales y comerciales interconectadas mediante puentes atirantados, un skyline contemporáneo y un paseo marítimo para frenar la dispersión urbana.',
      fr: 'Schéma directeur urbain côtier durable comprenant des canaux navigables, des îles résidentielles et commerciales interconnectées par des ponts haubanés, une silhouette urbaine contemporaine et une promenade maritime.',
      de: 'Nachhaltiger Küsten-Masterplan mit Wasserkanälen, durch Schrägseilbrücken verbundenen Wohn- und Gewerbeinseln, einer modernen Skyline und einer Meerespromenade zur Verhinderung von Zersiedelung.',
      it: 'Masterplan urbano costiero sostenibile con canali navigabili, isole residenziali e commerciali collegate da ponti strallati, uno skyline contemporaneo e una passeggiata marittima per contrastare l’espansione urbana incontrollata.',
    },
    features: {
      fa: [
        'سایت‌پلان ۳۴۰ هکتاری با زون‌بندی تخصصی تجاری، توریستی و مسکونی',
        'پل‌های اتصالی کابلی و پیاده‌راه‌های ساحلی متصل به مارینا',
        'شبکه حمل‌ونقل پایدار و بهینه‌سازی جریان بادهای ساحلی خلیج فارس',
        'پلازاهای عمومی چندسطحی و اسکله قایقرانی'
      ],
      en: [
        '340-hectare master site plan with specialized commercial, tourism, and residential zoning',
        'Cable-stayed connecting bridges and scenic pedestrian boardwalks linked to the marina',
        'Sustainable transit network optimized for prevailing Persian Gulf coastal sea breezes',
        'Multi-level public plazas and active recreational boating marina'
      ],
      ca: [
        'Pla director de 340 hectàrees amb zonificació comercial, turística i residencial',
        'Ponts atirantats de connexió i passejos per a vianants vinculats a la marina',
        'Xarxa de mobilitat sostenible orientada als vents marítims del Golf Pèrsic',
        'Places públiques a diversos nivells i moll per a embarcacions'
      ],
      es: [
        'Plan director de 340 hectáreas con zonificación comercial, turística y residencial',
        'Puentes atirantados de conexión y paseos peatonales vinculados a la marina',
        'Red de movilidad sostenible optimizada según las brisas del Golfo Pérsico',
        'Plazas públicas multinivel y muelle deportivo'
      ],
      fr: [
        'Plan directeur de 340 hectares avec zonage commercial, touristique et résidentiel',
        'Ponts haubanés de liaison et promenades piétonnes connectées au port de plaisance',
        'Réseau de mobilité durable optimisé selon les vents marins du golfe Persique',
        'Esplanades publiques à plusieurs niveaux et marina de plaisance'
      ],
      de: [
        '340 Hektar Masterplan mit gewerblicher, touristischer und wohnbaulicher Zonierung',
        'Schrägseilbrücken und Fußgängerpromenaden mit Anbindung an den Yachthafen',
        'Nachhaltiges Verkehrsnetz, optimiert für die Windströmungen des Persischen Golfs',
        'Mehrebenen-Stadtplätze und Bootshafen'
      ],
      it: [
        'Masterplan di 340 ettari con zonizzazione commerciale, turistica e residenziale',
        'Ponti strallati di collegamento e passeggiate pedonali collegate alla marina',
        'Rete di mobilità sostenibile ottimizzata per le brezze marine del Golfo Persico',
        'Piazze pubbliche multilivello e porto turistico'
      ]
    },
    location: {
      fa: 'بندرعباس، خلیج فارس',
      en: 'Bandar Abbas, Persian Gulf',
      ca: 'Bandar Abbas, Golf Pèrsic',
      es: 'Bandar Abbas, Golfo Pérsico',
      fr: 'Bandar Abbas, Golfe Persique',
      de: 'Bandar Abbas, Persischer Golf',
      it: 'Bandar Abbas, Golfo Persico',
    },
    area: {
      fa: '۳۴۰ هکتار محدوده ساحلی و جزایر توسعه',
      en: '340 Hectares Coastal Masterplan',
      ca: '340 ha de front marítim i illes de desenvolupament',
      es: '340 ha de frente marítimo e islas de desarrollo',
      fr: '340 ha de littoral et îles de développement',
      de: '340 Hektar Küsten- und Inselentwicklungsgebiet',
      it: '340 ha di litorale e isole di sviluppo',
    },
    role: {
      fa: 'طراح ارشد شهری و مدیر برنامه‌ریزی کلان',
      en: 'Lead Urban Designer & Masterplanner',
      ca: 'Dissenyador Urbà Principal i Planificador',
      es: 'Diseñador Urbano Principal y Planificador',
      fr: 'Urbaniste Principal & Planificateur',
      de: 'Leitender Stadtplaner & Masterplan-Koordinator',
      it: 'Lead Urban Designer & Masterplanner',
    }
  },

  'bandar-port-infrastructure': {
    title: {
      fa: 'زیرساخت بندرگاهی و گمرکات جدید بندرعباس',
      en: 'New Bandar Abbas Port & Customs Infrastructure',
      ca: 'Infraestructura Portuària i Duanera de Bandar Abbas',
      es: 'Infraestructura Portuaria y Aduanera de Bandar Abbas',
      fr: 'Infrastructure Portuaire et Douanière de Bandar Abbas',
      de: 'Neue Hafen- und Zollinfrastruktur Bandar Abbas',
      it: 'Nuova Infrastruttura Portuale e Doganale di Bandar Abbas',
    },
    concept: {
      fa: 'مطالعات فاز صفر، زون‌بندی امنیتی و طرح راهبردی دسترسی‌های لجستیک بندر و ساختمان‌های گمرک با رویکرد پدافند غیرعامل و سرعت ترانزیت کالا.',
      en: 'Schematic master planning, perimeter security zoning, and strategic layout design for industrial port logistics and customs facilities, prioritizing rapid container transit and high-salinity corrosion resistance.',
      ca: 'Planificació esquemàtica, zonificació de seguretat i disseny estratègic per a la logística portuària i duanera, prioritzant el trànsit ràpid de mercaderies i la resistència a la salinitat.',
      es: 'Planificación esquemática, zonificación de seguridad y diseño estratégico para la logística portuaria y aduanera, priorizando el tránsito rápido de mercancías y la resistencia a la salinidad.',
      fr: 'Étude préliminaire, zonage de sécurité et schéma stratégique des flux logistiques portuaires et douaniers, axés sur la fluidité du transit et la résistance aux ambiances salines.',
      de: 'Masterplanung, Sicherheitszonierung und strategisches Layout für Hafenlogistik und Zollterminals mit Fokus auf rasche Frachtabwicklung und Korrosionsbeständigkeit.',
      it: 'Pianificazione di massima, zonizzazione di sicurezza e progettazione strategica dei flussi logistici portuali e doganali con focus su rapidità di transito e resistenza alla salsedine.',
    },
    features: {
      fa: ['تفکیک ترافیک سنگین کانتینری از دسترسی‌های اداری', 'پوسته مقاوم در برابر رطوبت و نمک شدید دریایی'],
      en: ['Segregation of heavy container freight from administrative traffic', 'High-durability envelope resilient against extreme coastal salinity and humidity'],
      ca: ['Segregació del trànsit pesat de contenidors dels accessos administratius', 'Façana d’alta resistència a la salinitat i humitat costanera'],
      es: ['Segregación del tráfico pesado de contenedores de los accesos administrativos', 'Envolvente de alta resistencia a la salinidad y humedad costera'],
      fr: ['Séparation des flux de fret lourd et des accès administratifs', 'Enveloppe haute résistance aux agressions salines et à l’humidité marine'],
      de: ['Trennung von Schwerlast-Containerverkehr und Büroanbindung', 'Hochbeständige Gebäudehülle gegen extreme maritime Salinität'],
      it: ['Separazione del traffico merci pesante dagli accessi amministrativi', 'Involucro ad altissima resistenza alla salinità e umidità costiera']
    },
    location: {
      fa: 'بندرعباس',
      en: 'Bandar Abbas',
      ca: 'Bandar Abbas',
      es: 'Bandar Abbas',
      fr: 'Bandar Abbas',
      de: 'Bandar Abbas',
      it: 'Bandar Abbas',
    },
    area: {
      fa: '۱۸۰,۰۰۰ متر مربع',
      en: '180,000 m²',
      ca: '180.000 m²',
      es: '180.000 m²',
      fr: '180 000 m²',
      de: '180.000 m²',
      it: '180.000 m²',
    },
    role: {
      fa: 'استراتژیست زون‌بندی سایت و لایه‌اوت کلان',
      en: 'Site Zoning & Master Layout Strategist',
      ca: 'Estrateg de Zonificació i Distribució de l’Espai',
      es: 'Estratega de Zonificación y Distribución Espacial',
      fr: 'Spécialiste Zonage de Site & Implantation',
      de: 'Stratege für Arealzonierung & Master-Layout',
      it: 'Strategist di Zonizzazione e Layout Generale',
    }
  },

  // 2. Category 02: Residential Luxury
  'residential-darbandsara': {
    title: {
      fa: 'پروژه مسکونی و پنت‌هاوس دربندسر',
      en: 'Residential Darbandsara Alpine Luxury Penthouse',
      ca: 'Àtic de Luxe Alpí Residencial Darbandsara',
      es: 'Ático de Lujo Alpino Residencial Darbandsara',
      fr: 'Penthouse de Luxe Alpin Résidentiel Darbandsara',
      de: 'Alpines Luxus-Penthouse Darbandsara',
      it: 'Attico di Lusso Alpino Residenziale Darbandsara',
    },
    concept: {
      fa: 'ادغام بتن اکسپوز، سنگ طبیعی و پنجره‌های وسیع پانوراما رو به قله‌های برفی دربندسر؛ شومینه معلق معمارانه، مبلمان ارگانیک و فضایی مینیمال برای اقامت کوهستانی لوکس.',
      en: 'Harmonious fusion of exposed architectural concrete, natural slate, and panoramic floor-to-ceiling glazing framing snow-capped alpine peaks; complemented by a sculptural suspended fireplace and bespoke organic joinery.',
      ca: 'Fusió harmònica de formigó vist, pedra natural i grans finestrals panoràmics amb vistes als cims nevats; xemeneia suspesa escultòrica, fusteria artesanal i ambient càlid alpí.',
      es: 'Fusión armónica de hormigón visto, piedra natural y grandes ventanales panorámicos hacia las cumbres nevadas; chimenea suspendida escultórica, carpintería a medida y confort alpino.',
      fr: 'Harmonie de béton brut architectural, de pierre naturelle et de baies vitrées panoramiques sur les sommets enneigés, sublimée par un foyer suspendu sculptural et un agencement épuré.',
      de: 'Harmonische Verbindung aus Sichtbeton, Naturstein und Panorama-Verglasung mit Blick auf verschneite Berggipfel; skulpturaler Hängekamin und minimalistischer alpiner Wohnkomfort.',
      it: 'Fusione armonica di cemento faccia a vista, pietra naturale e vetrate panoramiche sulle vette innevate; camino scultoreo sospeso e raffinata ebanisteria alpina.',
    },
    features: {
      fa: [
        'پنجره‌های کشویی بدون فریم با دید ۳۶۰ درجه به کوهستان',
        'شومینه معلق خطی در قلب سالن اصلی',
        'سیستم گرمایش از کف یکپارچه زیر سنگ میکروسمنت'
      ],
      en: [
        'Frameless motorized sliding glass walls with 360° alpine mountain vistas',
        'Sculptural suspended linear fireplace as the living space focal centerpiece',
        'Seamless radiant floor heating integrated beneath monolithic microcement stone'
      ],
      ca: [
        'Finestrals corredissos sense marc amb vistes de 360° a les muntanyes',
        'Xemeneia lineal suspesa com a element escultòric central de la sala',
        'Terra radiant integrat sota paviment continu de microciment'
      ],
      es: [
        'Ventanales correderos sin marco con vistas de 360° a las cumbres montañosas',
        'Chimenea lineal suspendida como pieza escultórica central del salón',
        'Suelo radiante integrado bajo pavimento continuo de microcemento'
      ],
      fr: [
        'Baies coulissantes sans cadre offrant un panorama à 360° sur les montagnes',
        'Cheminée suspendue linéaire au centre géométrique du salon principal',
        'Chauffage au sol radiant intégré sous un microciment minéral monolithique'
      ],
      de: [
        'Rahmenlose Schiebeglaselemente mit 360°-Alpenpanorama',
        'Skulpturaler freihängender Linearkamin als architektonischer Mittelpunkt',
        'Integrierte Fußbodenheizung unter fugenlosem Mikrozement-Steinboden'
      ],
      it: [
        'Vetrate scorrevoli a filo senza telaio con viste panoramiche a 360° sulle montagne',
        'Camino lineare sospeso scultoreo al centro della zona living',
        'Riscaldamento radiante a pavimento sotto pietra monolitica in microcemento'
      ]
    },
    location: {
      fa: 'دربندسر، تهران (Darbandsara, Tehran)',
      en: 'Darbandsara, Tehran',
      ca: 'Darbandsara, Teheran',
      es: 'Darbandsara, Teherán',
      fr: 'Darbandsara, Téhéran',
      de: 'Darbandsara, Teheran',
      it: 'Darbandsara, Teheran',
    },
    area: {
      fa: '۴۲۰ متر مربع',
      en: '420 m²',
      ca: '420 m²',
      es: '420 m²',
      fr: '420 m²',
      de: '420 m²',
      it: '420 m²',
    },
    role: {
      fa: 'معمار ارشد و مسئول دیتیل‌های اجرایی',
      en: 'Lead Architect & Technical Detailing',
      ca: 'Arquitecte Principal i Detall Tècnic',
      es: 'Arquitecto Principal y Detalles Técnicos',
      fr: 'Architecte Principal & Détails d’Exécution',
      de: 'Leitender Architekt & Technische Detailplanung',
      it: 'Architetto Capo & Dettagli Costruttivi',
    }
  },

  'residential-ando': {
    title: {
      fa: 'پروژه مسکونی و پنت‌هاوس آندو',
      en: 'Residential Ando Luxury Apartment',
      ca: 'Apartament de Disseny Residencial Ando',
      es: 'Apartamento de Diseño Residencial Ando',
      fr: 'Appartement de Luxe Résidentiel Ando',
      de: 'Design-Wohnung Wohnprojekt Ando',
      it: 'Appartamento di Design Residenziale Ando',
    },
    concept: {
      fa: 'ترکیب خلوص مینیمالیستی تادائو آندو با دیوارهای پنل‌بندی شده خاکستری مات، مبلمان ارگونومیک، نورپردازی خطی مخفی با دمای کلوین گرم و آثار هنری اکسپرسیونیستی.',
      en: 'Tadao Ando-inspired geometric minimalism featuring matte graphite paneled walls, bespoke joinery, warm concealed architectural cove lighting, and open spatial fluidity.',
      ca: 'Minimalisme geomètric inspirat en Tadao Ando amb panells gris mat, il·luminació lineal càlida integrada i fluïdesa espacial contemporània.',
      es: 'Minimalismo geométrico inspirado en Tadao Ando con panelados gris mate, iluminación lineal cálida integrada y fluidez espacial contemporánea.',
      fr: 'Minimalisme géométrique inspiré de Tadao Ando avec panneaux gris mat, éclairage linéaire dissimulé aux teintes chaudes et fluidité spatiale ouverte.',
      de: 'Vom Geist Tadao Andos inspirierter Minimalismus mit matten Graphit-Wandpaneelen, warmer verdeckter Lichtführung und offenem Raumkonzept.',
      it: 'Minimalismo geometrico ispirato a Tadao Ando con pannellature grigio opaco, illuminazione lineare a gola calda e continuità spaziale.',
    },
    features: {
      fa: [
        'یونیت تلویزیون معلق با سنگ اسلب و نور بک‌لایت طلایی',
        'آشپزخانه مینیمال یکپارچه با جزیره سفید و متریال ضدخش',
        'پلان باز با تعریف حریم‌های فضایی بدون دیوار صلب'
      ],
      en: [
        'Cantilevered media wall console crafted in natural slab stone with halo backlight',
        'Monolithic minimalist kitchen island with scratch-resistant solid surface finish',
        'Open-concept spatial hierarchy delineated without solid enclosing partitions'
      ],
      ca: [
        'Consola flotant de TV en pedra natural amb retroil·luminació daurada',
        'Illa de cuina minimalista d’una sola peça amb superfícies d’alta resistència',
        'Distribució oberta amb jerarquia espacial subtil sense murs cecs'
      ],
      es: [
        'Consola flotante de TV en piedra natural con retroiluminación cálida',
        'Isla de cocina minimalista monobloque con superficies de alta resistencia',
        'Distribución abierta con jerarquía espacial sutil sin tabiques ciegos'
      ],
      fr: [
        'Meuble TV en porte-à-faux en pierre naturelle avec rétroéclairage doré doux',
        'Îlot de cuisine minimaliste épuré aux finitions ultra-résistantes',
        'Organisation ouverte avec hiérarchie spatiale fluide sans cloisons pleines'
      ],
      de: [
        'Kragarm-Medienwand aus Naturstein mit warmem Hinterleuchtungseffekt',
        'Monolithische minimalistische Kücheninsel mit kratzfester Oberfläche',
        'Offenes Raumkonzept mit subtiler Zonierung ohne massive Trennwände'
      ],
      it: [
        'Mobile TV a sbalzo in pietra naturale con retroilluminazione calda',
        'Isola cucina minimalista monolitica con finiture antigraffio',
        'Layout aperto con gerarchia degli spazi fluida senza pareti cieche'
      ]
    },
    location: {
      fa: 'بارسلون / تهران (Barcelona / Tehran)',
      en: 'Barcelona / Tehran',
      ca: 'Barcelona / Teheran',
      es: 'Barcelona / Teherán',
      fr: 'Barcelone / Téhéran',
      de: 'Barcelona / Teheran',
      it: 'Barcellona / Teheran',
    },
    area: {
      fa: '۳۱۰ متر مربع',
      en: '310 m²',
      ca: '310 m²',
      es: '310 m²',
      fr: '310 m²',
      de: '310 m²',
      it: '310 m²',
    }
  },

  'residential-lumen': {
    title: {
      fa: 'پروژه مسکونی و لابی لومن',
      en: 'Residential Lumen Grand Lobby & Residences',
      ca: 'Gran Vestíbul i Residències Lumen',
      es: 'Gran Vestíbulo y Residencias Lumen',
      fr: 'Grand Hall et Résidences Lumen',
      de: 'Lobby & Residenzen Wohnprojekt Lumen',
      it: 'Grand Lobby e Residenze Lumen',
    },
    concept: {
      fa: 'ورودی با ارتفاع سقف دوگانه (Double-Height Lobby) با لوورهای عمودی چوب طبیعی، کانتر پذیرش مجسمه‌وار، و نشیمن‌های مینیمال در امتداد باغچه شیشه‌ای حیاط.',
      en: 'A double-height architectural entrance portal featuring rhythmic vertical timber louvers, a monolithic sculpted reception monolith, and low-slung lounge seating overlooking an internal glass courtyard.',
      ca: 'Vestíbul d’accés de doble alçada amb gelosies verticals de fusta noble, taulell d’atenció escultòric i zones de repòs abocades a un pati interior envidrat.',
      es: 'Vestíbulo de acceso de doble altura con celosías verticales de madera noble, mostrador de recepción escultórico y salones orientados a un patio interior acristalado.',
      fr: 'Hall d’accueil cathédrale à double hauteur avec claustras verticaux en bois naturel, comptoir de réception sculptural et salon donnant sur un patio vitré.',
      de: 'Zweigeschossiges Entree-Foyer mit vertikalen Echtholz-Lamellen, skulpturalem Empfangstresen und Loungebereichen mit Blick in einen verglasten Innenhof.',
      it: 'Atrio monumentale a doppia altezza con frangisole verticali in legno naturale, banco reception scultoreo e zona lounge affacciata su un cortile vetrato.',
    },
    features: {
      fa: [
        'لوورهای چوب آکوستیک عمودی ضد رطوبت',
        'نورپردازی اسپات‌لایت مینیمال ضدخیرگی',
        'کف سرامیک پرسلان قطع بزرگ ۱۲۰×۲۸۰'
      ],
      en: [
        'Acoustically engineered moisture-resistant vertical timber battens',
        'Low-glare architectural recessed spotlighting and linear wash luminaires',
        'Extra-large 120×280 cm bookmatched porcelain floor slabs'
      ],
      ca: [
        'Lamel·les acústiques verticals de fusta resistent a la humitat',
        'Il·luminació arquitectònica puntual antienlluernament',
        'Paviment continu de porcellànic gran format de 120×280 cm'
      ],
      es: [
        'Lamas acústicas verticales de madera resistente a la humedad',
        'Iluminación arquitectónica empotrada antideslumbrante',
        'Pavimento continuo porcelánico de gran formato de 120×280 cm'
      ],
      fr: [
        'Lames verticales en bois acoustique traitées contre l’humidité',
        'Spots architecturaux encastrés à faible éblouissement',
        'Dalles de grès cérame très grand format 120×280 cm'
      ],
      de: [
        'Akustisch wirksame, feuchtigkeitsresistente Holzlamellen',
        'Entblendete architektonische Einbauspots und Akzentleuchten',
        'Großformatige Feinsteinzeug-Platten im Format 120×280 cm'
      ],
      it: [
        'Lamelle acustiche verticali in legno trattato contro l’umidità',
        'Faretti architetturali a incasso a basso abbagliamento',
        'Lastre in gres porcellanato di grande formato 120×280 cm'
      ]
    },
    location: {
      fa: 'بارسلون / تهران (Barcelona / Tehran)',
      en: 'Barcelona / Tehran',
      ca: 'Barcelona / Teheran',
      es: 'Barcelona / Teherán',
      fr: 'Barcelone / Téhéran',
      de: 'Barcelona / Teheran',
      it: 'Barcellona / Teheran',
    },
    area: {
      fa: '۸۵۰ متر مربع (لابی و واحدهای مسکونی)',
      en: '850 m² (Lobby & Residences)',
      ca: '850 m² (Vestíbul i Residències)',
      es: '850 m² (Vestíbulo y Residencias)',
      fr: '850 m² (Hall et Résidences)',
      de: '850 m² (Lobby & Residenzen)',
      it: '850 m² (Lobby e Residenze)',
    }
  },

  'residential-arghavan': {
    title: {
      fa: 'پروژه مسکونی ارغوان',
      en: 'Residential Arghavan Luxury Residence',
      ca: 'Residència de Luxe Arghavan',
      es: 'Residencia de Lujo Arghavan',
      fr: 'Résidence de Luxe Arghavan',
      de: 'Luxusresidenz Arghavan',
      it: 'Residenza di Lusso Arghavan',
    },
    concept: {
      fa: 'طراحی کتابخانه نیم‌دایره منحنی پانوراما با نیمکت یکپارچه رو به نورگیر، شومینه سنگ ماربل سیاه و درب‌های فرانسوی شیشه‌ای.',
      en: 'Panoramic curved reading mezzanine with continuous integrated bench seating facing lightwells, Nero Marquina black marble fireplace, and bespoke steel-framed French glass doors.',
      ca: 'Biblioteca corba panoràmica amb banc integrat orientat a la llum natural, llar de foc de marbre negre Nero Marquina i fusteria metàl·lica artesanal.',
      es: 'Biblioteca curva panorámica con banco integrado orientado a la luz natural, chimenea de mármol negro Nero Marquina y carpintería metálica a medida.',
      fr: 'Mezzanine de lecture incurvée avec banquette continue face aux puits de lumière, cheminée en marbre noir Nero Marquina et portes vitrées en acier.',
      de: 'Geschwungene Panorama-Bibliothek mit integrierter Sitzbank zum Lichthof, Kamin aus schwarzem Nero Marquina Marmor und maßgefertigten Glastüren.',
      it: 'Biblioteca semicircolare panoramica con seduta integrata verso il lucernario, camino in marmo Nero Marquina e porte vetrate intelaiate in acciaio.',
    },
    features: {
      fa: ['کتابخانه کرو دست‌ساز با شیشه‌های دودی و فریم فلزی مشکی', 'سالن غذاخوری با نورپردازی متمرکز مدرن'],
      en: ['Custom curved bookcase with smoked glass and matte black steel frames', 'Formal dining volume anchored by calibrated focused pendant illumination'],
      ca: ['Biblioteca corba artesanal amb vidre fumat i estructura d’acer negre', 'Menjador formal amb il·luminació suspesa de disseny'],
      es: ['Biblioteca curva artesanal con vidrio ahumado y estructura de acero negro', 'Comedor formal con iluminación suspendida de diseño'],
      fr: ['Bibliothèque courbe sur mesure avec verre fumé et structure en acier noir', 'Salle à manger formelle rehaussée d’une suspension architecturale'],
      de: ['Maßgefertigtes gebogenes Bücherregal mit Rauchglas und schwarzem Stahl', 'Essbereich mit fokussierter architektonischer Pendelleuchte'],
      it: ['Libreria curva su misura con vetro fumé e profili in acciaio nero', 'Sala da pranzo formale con illuminazione a sospensione di design']
    },
    location: {
      fa: 'تهران',
      en: 'Tehran',
      ca: 'Teheran',
      es: 'Teherán',
      fr: 'Téhéran',
      de: 'Teheran',
      it: 'Teheran',
    },
    area: {
      fa: '۳۸۰ متر مربع',
      en: '380 m²',
      ca: '380 m²',
      es: '380 m²',
      fr: '380 m²',
      de: '380 m²',
      it: '380 m²',
    }
  },

  'residential-royal': {
    title: {
      fa: 'پروژه مسکونی رویال',
      en: 'Residential Royal Penthouse',
      ca: 'Àtic Residencial Royal',
      es: 'Ático Residencial Royal',
      fr: 'Penthouse Résidentiel Royal',
      de: 'Royal Penthouse Residenz',
      it: 'Attico Residenziale Royal',
    },
    concept: {
      fa: 'ترکیب لوکس سفید و سنگ Nero Marquina با خطوط نوری ممتد و آشپزخانه جزیره‌ای پیوسته به فضای تراس.',
      en: 'Pristine white architectural volume contrasted by dramatic Nero Marquina stone surfaces, flush continuous LED lighting reveals, and an island kitchen opening directly onto a private terrace.',
      ca: 'Contrast elegant entre volums blancs i marbre Nero Marquina, línies de llum contínua i cuina amb illa connectada directament a la terrassa.',
      es: 'Contraste elegante entre volúmenes blancos y mármol Nero Marquina, líneas de luz continua y cocina con isla abierta directamente a la terraza.',
      fr: 'Contrastes épurés entre volumes blancs et marbre Nero Marquina, gorges lumineuses LED continues et cuisine en îlot ouverte sur la terrasse.',
      de: 'Monochrome Ästhetik aus weißen Flächen und Nero Marquina Marmor, lineare Lichtbänder und fließender Übergang zur Außenterrasse.',
      it: 'Elegante dialogo tra volumi bianchi e marmo Nero Marquina, tagli di luce continua a LED e cucina a isola affacciata sulla terrazza.',
    },
    features: {
      fa: ['جزیره آشپزخانه چندعملکردی با سینک مخفی و کانتر صبحانه‌خوری'],
      en: ['Multifunctional culinary island featuring undermount flush sink and cantilevered breakfast bar'],
      ca: ['Illa de cuina multifuncional amb aigüera encastada i barra d’esmorzar en voladís'],
      es: ['Isla de cocina multifuncional con fregadero bajo encimera y barra de desayuno en voladizo'],
      fr: ['Îlot de cuisine multifonction avec évier affleurant et bar petit-déjeuner en porte-à-faux'],
      de: ['Multifunktionale Kücheninsel mit flächenbündigem Spülbecken und Frühstückstheke'],
      it: ['Isola cucina multifunzione con lavello a filo e bancone colazione a sbalzo']
    },
    location: {
      fa: 'تهران',
      en: 'Tehran',
      ca: 'Teheran',
      es: 'Teherán',
      fr: 'Téhéran',
      de: 'Teheran',
      it: 'Teheran',
    },
    area: {
      fa: '۲۹۰ متر مربع',
      en: '290 m²',
      ca: '290 m²',
      es: '290 m²',
      fr: '290 m²',
      de: '290 m²',
      it: '290 m²',
    }
  },

  'residential-noora': {
    title: {
      fa: 'پروژه مسکونی نور و نورا',
      en: 'Residential Noora & Ehsan',
      ca: 'Residència Noora & Ehsan',
      es: 'Residencia Noora y Ehsan',
      fr: 'Résidence Noora & Ehsan',
      de: 'Wohnresidenz Noora & Ehsan',
      it: 'Residenza Noora & Ehsan',
    },
    concept: {
      fa: 'سالن غذاخوری دو طبقه با اسکای‌لایت سقفی، پورتال‌های معماری به رنگ آبی کبالت و مبلمان مجسمه‌گونه مدرن.',
      en: 'Double-volume dining atrium lit by dramatic linear skylights, highlighted by bold cobalt blue spatial portals and bespoke sculptural furniture pieces.',
      ca: 'Menjador a doble alçada amb claraboies zenitals, portals arquitectònics en blau cobalt i mobiliari escultòric.',
      es: 'Comedor a doble altura con lucernarios cenitales, portales arquitectónicos en azul cobalto y mobiliario escultórico.',
      fr: 'Espace repas à double volume coiffé de verrières zénithales, articulé par des portiques bleu cobalt et un mobilier sculptural.',
      de: 'Zweigeschossiger Essbereich mit Dach-Oberlichtern, akzentuiert durch kobaltblaue Raumportale und skulpturale Möbel.',
      it: 'Zona pranzo a doppia altezza illuminata da lucernari zenitali, con portali blu cobalto e arredi scultorei su misura.',
    },
    features: {
      fa: ['نورگیر سقفی شیبدار جهت انتقال نور مستقیم به عمق پلان', 'طراحی درگاه‌های فضایی اکسنت'],
      en: ['Angled architectural roof skylight funneling daylight into deep floorplate zones', 'Accent color spatial thresholds framing key perspective vistas'],
      ca: ['Claraboia inclinada per projectar llum natural fins al fons del pla', 'Portals d’obertura emmarcant les perspectives interiors'],
      es: ['Lucernario inclinado para proyectar luz natural hasta el fondo de planta', 'Portales arquitectónicos de acento que enmarcan las perspectivas'],
      fr: ['Verrière inclinée diffusant la lumière zénithale au cœur du plan', 'Portiques d’accentuation cadrant les perspectives intérieures'],
      de: ['Geneigte Dachoberlichter zur natürlichen Belichtung der tiefen Raumzonen', 'Akzentuierte Raumöffnungen zur visuellen Staffelung'],
      it: ['Lucernario inclinato che guida la luce naturale nelle zone più profonde', 'Portali architettonici d’accento che inquadrano le viste interne']
    },
    location: {
      fa: 'تهران',
      en: 'Tehran',
      ca: 'Teheran',
      es: 'Teherán',
      fr: 'Téhéran',
      de: 'Teheran',
      it: 'Teheran',
    },
    area: {
      fa: '۳۴۰ متر مربع',
      en: '340 m²',
      ca: '340 m²',
      es: '340 m²',
      fr: '340 m²',
      de: '340 m²',
      it: '340 m²',
    }
  },

  'residential-no10': {
    title: {
      fa: 'پروژه مسکونی شماره ۱۰',
      en: 'Residential No.10 Urban Living',
      ca: 'Habitatge Urbà Residencial Núm. 10',
      es: 'Vivienda Urbana Residencial Nº 10',
      fr: 'Habitat Urbain Résidentiel N° 10',
      de: 'Städtisches Wohnen Residenz Nr. 10',
      it: 'Abitazione Urbana Residenziale N. 10',
    },
    concept: {
      fa: 'طراحی داخلی مونوکروم و تیره‌رنگ با شلف‌های فلزی با نور پس‌زمینه و صندلی‌های شیشه‌ای ترنسپرنت فیلیپ استارک.',
      en: 'Moody monochrome interior architecture featuring back-lit floating steel shelving grids, dark oak millwork, and Philippe Starck transparent ghost seating.',
      ca: 'Disseny interior monocrom fosc amb prestatgeries d’acer retroil·luminades, fusteria de roure fumat i cadires transparents de Philippe Starck.',
      es: 'Diseño interior monocromo oscuro con estanterías de acero retroiluminadas, carpintería de roble ahumado y sillas transparentes de Philippe Starck.',
      fr: 'Architecture intérieure monochrome sombre avec rayonnages métalliques rétroéclairés, ébénisterie en chêne teinté et chaises transparentes Philippe Starck.',
      de: 'Monochrome Raumgestaltung mit hinterleuchteten Stahlregalen, geräucherter Eiche und transparenten Philippe Starck Design-Stühlen.',
      it: 'Interior design monocromatico scuro con scaffalature in acciaio retroilluminate, rovere fumé e sedute trasparenti di Philippe Starck.',
    },
    features: {
      fa: ['سیستم شلفینگ مدولار متصل به سقف با نور بک‌لایت خطی'],
      en: ['Ceiling-suspended modular steel shelving system with continuous concealed backlight'],
      ca: ['Sistema modular de prestatgeries suspès del sostre amb retroil·luminació lineal'],
      es: ['Sistema modular de estanterías suspendido del techo con retroiluminación lineal'],
      fr: ['Système d’étagères modulaires suspendu au plafond avec rétroéclairage linéaire'],
      de: ['Deckenhängendes modulares Regalsystem mit verdecktem linearem Lichtband'],
      it: ['Sistema modulare di mensole sospeso a soffitto con retroilluminazione lineare']
    },
    location: {
      fa: 'تهران',
      en: 'Tehran',
      ca: 'Teheran',
      es: 'Teherán',
      fr: 'Téhéran',
      de: 'Teheran',
      it: 'Teheran',
    },
    area: {
      fa: '۲۶۰ متر مربع',
      en: '260 m²',
      ca: '260 m²',
      es: '260 m²',
      fr: '260 m²',
      de: '260 m²',
      it: '260 m²',
    }
  },

  'residential-aram': {
    title: {
      fa: 'پروژه مسکونی و بازسازی آشپزخانه آرام',
      en: 'Residential Aram Kitchen & Living Transformation',
      ca: 'Transformació de Cuina i Sala Residencial Aram',
      es: 'Transformación de Cocina y Salón Residencial Aram',
      fr: 'Rénovation Cuisine et Séjour Résidentiel Aram',
      de: 'Küchen- und Wohnraum-Transformation Aram',
      it: 'Ristrutturazione Cucina e Living Residenziale Aram',
    },
    concept: {
      fa: 'تغییر کامل ساختار پلان و تخریب دیوارهای مزاحم برای خلق جزیره آشپزخانه معلق دوطرفه از جنس چوب بلوط و کوارتز خاکستری مات (Before & After Transformation).',
      en: 'Complete structural reconfiguration and removal of obstructive load-bearing walls to create a dual-sided cantilevered oak and matte grey quartz kitchen island.',
      ca: 'Reconfiguració estructural completa per crear una illa de cuina flotant de doble cara en fusta de roure i quars gris mat.',
      es: 'Reconfiguración estructural completa para crear una isla de cocina flotante de doble cara en roble y cuarzo gris mate.',
      fr: 'Restructuration spatiale complète pour concevoir un îlot central double face en porte-à-faux en chêne naturel et quartz gris mat.',
      de: 'Vollständige Grundriss-Optimierung mit Abbruch nichttragender Wände für eine freitragende Kücheninsel aus Eiche und mattgrauem Quarz.',
      it: 'Riconfigurazione strutturale completa per dare vita a un’isola cucina a sbalzo bifacciale in rovere e quarzo grigio opaco.',
    },
    features: {
      fa: ['کانتر صبحانه‌خوری کنسول‌شده بدون پایه', 'کابینت‌های کف تا سقف بدون دستگیره'],
      en: ['Cantilevered breakfast bar with zero vertical floor posts', 'Full-height floor-to-ceiling handleless custom architectural cabinetry'],
      ca: ['Barra d’esmorzar en voladís lliure de suports verticals', 'Armaris de terra a sostre sense tiradors'],
      es: ['Barra de desayuno en voladizo libre de soportes verticales', 'Armarios de suelo a techo sin tiradores'],
      fr: ['Comptoir suspendu sans poteau d’appui au sol', 'Meubles sur mesure toute hauteur sans poignée'],
      de: ['Freitragende Frühstückstheke ohne störende Bodenstützen', 'Deckenhohe grifflose Einbauschränke mit integrierter Schattenfuge'],
      it: ['Bancone snack a sbalzo senza montanti a terra', 'Armadiature a tutta altezza dal pavimento al soffitto senza maniglie']
    },
    location: {
      fa: 'تهران',
      en: 'Tehran',
      ca: 'Teheran',
      es: 'Teherán',
      fr: 'Téhéran',
      de: 'Teheran',
      it: 'Teheran',
    },
    area: {
      fa: '۲۱۰ متر مربع',
      en: '210 m²',
      ca: '210 m²',
      es: '210 m²',
      fr: '210 m²',
      de: '210 m²',
      it: '210 m²',
    }
  },

  'residential-no4': {
    title: {
      fa: 'پروژه مسکونی شماره ۴',
      en: 'Residential No.4 Duplex Living',
      ca: 'Habitatge Dúplex Residencial Núm. 4',
      es: 'Vivienda Dúplex Residencial Nº 4',
      fr: 'Duplex Résidentiel N° 4',
      de: 'Duplex-Wohnung Residenz Nr. 4',
      it: 'Duplex Residenziale N. 4',
    },
    concept: {
      fa: 'نشیمن فرورفته (Sunken Pit)، نرده‌های شیشه‌ای فریم‌لس در وید دوبلکس و یونیت تلویزیون شناور با شلف‌های نورپردازی شده.',
      en: 'Mid-century modern sunken conversation lounge, structural glass balustrades framing the central double-height void, and floating illuminated joinery.',
      ca: 'Saló enfonsat tipus "conversation pit", baranes de vidre continu a la doble alçada i moble flotant amb prestatges il·luminats.',
      es: 'Salón hundido tipo "conversation pit", barandillas de vidrio continuo en la doble altura y mueble flotante con estantes iluminados.',
      fr: 'Salon en creux (conversation pit), garde-corps en verre structurel sans cadre sur le vide double hauteur et mobilier flottant rétroéclairé.',
      de: 'Abgesenkter Loungebereich (Sunken Pit), rahmenlose Ganzglasgeländer im Luftraum und schwebende hinterleuchtete Medienmöbel.',
      it: 'Zona conversazione ribassata (sunken pit), parapetti in vetro strutturale nel vuoto a doppia altezza e arredo sospeso con mensole illuminate.',
    },
    features: {
      fa: ['نشیمن گودافتاده با صندلی‌های پارچه‌ای سفارشی', 'آینه دکوراتیو گرد برنز'],
      en: ['Sunken conversation pit with tailored wrap-around textured upholstery', 'Oversized tinted bronze decorative circular mirror'],
      ca: ['Zona de descans enfonsada amb tapisseria tèxtil a mida', 'Mirall rodó decoratiu en bronze fumat'],
      es: ['Zona de descanso hundida con tapicería textil a medida', 'Espejo redondo decorativo en bronce ahumado'],
      fr: ['Salon surbaissé avec assises tapissées sur mesure', 'Grand miroir circulaire décoratif teinté bronze'],
      de: ['Vertiefter Sitzbereich mit maßgefertigter Textilpolsterung', 'Runder bronzierter Deko-Wandspiegel im Großformat'],
      it: ['Salotto ribassato con sedute imbottite su misura', 'Specchio circolare decorativo bronzato di grandi dimensioni']
    },
    location: {
      fa: 'تهران',
      en: 'Tehran',
      ca: 'Teheran',
      es: 'Teherán',
      fr: 'Téhéran',
      de: 'Teheran',
      it: 'Teheran',
    },
    area: {
      fa: '۳۲۰ متر مربع (دوبلکس)',
      en: '320 m² (Duplex)',
      ca: '320 m² (Dúplex)',
      es: '320 m² (Dúplex)',
      fr: '320 m² (Duplex)',
      de: '320 m² (Duplex)',
      it: '320 m² (Duplex)',
    }
  },

  'residential-bandar-abbas': {
    title: {
      fa: 'پروژه مسکونی و پنت‌هاوس بندرعباس',
      en: 'Residential Bandar Abbas Sunset Penthouse',
      ca: 'Àtic Sunset Residencial Bandar Abbas',
      es: 'Ático Sunset Residencial Bandar Abbas',
      fr: 'Penthouse Sunset Résidentiel Bandar Abbas',
      de: 'Sunset Penthouse Bandar Abbas',
      it: 'Attico Sunset Residenziale Bandar Abbas',
    },
    concept: {
      fa: 'طراحی با دیوار شیشه‌ای سرتاسری رو به غروب خلیج فارس، نورپردازی کف‌تاب گرم و ترکیب مبلمان چرم ایتالیایی.',
      en: 'Expansive curtain glass facade capturing the crimson sunset over the Persian Gulf, low-level floor uplighting, and curated Italian leather lounge ensembles.',
      ca: 'Façana envidrada contínua cap a la posta de sol del Golf Pèrsic, il·luminació càlida rasant des del terra i mobiliari de cuir italià.',
      es: 'Fachada acristalada continua hacia la puesta de sol del Golfo Pérsico, iluminación cálida rasante desde el suelo y mobiliario de cuero italiano.',
      fr: 'Façade vitrée toute hauteur orientée vers le coucher de soleil sur le golfe Persique, éclairage rasant au sol et salon en cuir italien.',
      de: 'Durchgehende Glasfront zum Sonnenuntergang über dem Persischen Golf, warme Boden-Lichtakzente und italienisches Leder-Mobiliar.',
      it: 'Facciata continua a tutta altezza verso il tramonto sul Golfo Persico, faretti radenti a pavimento e arredi in pelle italiana.',
    },
    features: {
      fa: ['نورپردازی خطی افقی زیر کنسول تلویزیون', 'دید بدون مانع به افق دریا'],
      en: ['Recessed linear floor-level illumination beneath the console', 'Unobstructed panorama across the open sea horizon'],
      ca: ['Il·luminació lineal integrada sota la consola principal', 'Vistes directes i sense obstacles cap a l’horitzó marítim'],
      es: ['Iluminación lineal integrada bajo la consola principal', 'Vistas directas y sin obstáculos hacia el horizonte marino'],
      fr: ['Bandeau lumineux linéaire encastré sous la console TV', 'Vue dégagée imprenable sur l’horizon marin'],
      de: ['Lineare Sockelbeleuchtung unter der TV-Konsole', 'Uneingeschränkter Panoramablick auf die Meereslinie'],
      it: ['Luce lineare a pavimento sotto il mobile TV', 'Vista aperta e libera verso l’orizzonte del mare']
    },
    location: {
      fa: 'بندرعباس (Bandar Abbas)',
      en: 'Bandar Abbas',
      ca: 'Bandar Abbas',
      es: 'Bandar Abbas',
      fr: 'Bandar Abbas',
      de: 'Bandar Abbas',
      it: 'Bandar Abbas',
    },
    area: {
      fa: '۲۸۰ متر مربع',
      en: '280 m²',
      ca: '280 m²',
      es: '280 m²',
      fr: '280 m²',
      de: '280 m²',
      it: '280 m²',
    }
  },

  // 3. Category 03: Commercial Complexes
  'bandar-commercial-complex': {
    title: {
      fa: 'مجتمع تجاری بزرگ بندرعباس (۵۲,۰۰۰ متر مربع)',
      en: 'Bandar Abbas Commercial Complex (52,000 m²)',
      ca: 'Gran Complex Comercial de Bandar Abbas (52.000 m²)',
      es: 'Gran Complejo Comercial de Bandar Abbas (52.000 m²)',
      fr: 'Grand Complexe Commercial de Bandar Abbas (52 000 m²)',
      de: 'Großes Geschäftszentrum Bandar Abbas (52.000 m²)',
      it: 'Grande Complesso Commerciale di Bandar Abbas (52.000 m²)',
    },
    concept: {
      fa: 'مجتمع تجاری شاخص جنوب با پوسته دولایه و لوورهای سایه‌انداز برای کنترل دمای کویری، آتریوم شیشه‌ای مرکزی ۵ طبقه و پارکینگ طبقاتی هوشمند.',
      en: 'Flagship 52,000 m² commercial lifestyle center engineered with a ventilated double-skin parametric facade, deep solar shading louvers for hot-arid climate control, a 5-story glazed central atrium, and automated parking.',
      ca: 'Complex comercial emblemàtic de 52.000 m² amb doble façana bioclimàtica, lames de protecció solar per al clima àrid, atri de 5 plantes i aparcament intel·ligent.',
      es: 'Complejo comercial emblemático de 52.000 m² con doble fachada bioclimática, lamas de protección solar para el clima árido, atrio de 5 plantas y aparcamiento inteligente.',
      fr: 'Centre commercial phare de 52 000 m² doté d’une double façade ventilée, de brise-soleil pour climat chaud, d’un atrium central vitré de 5 étages et d’un parking automatisé.',
      de: 'Einkaufs- und Geschäftszentrum mit 52.000 m², parametrischer Doppelfassade, Sonnenschutzlamellen für heiß-trockenes Klima und einem 5-geschossigen Glasatrium.',
      it: 'Complesso commerciale iconico di 52.000 m² con doppia pelle ventilata, lamelle frangisole per climi aridi, atrio centrale a tutta altezza su 5 piani e parcheggio robotizzato.',
    },
    features: {
      fa: [
        'زیربنای ۵۲ هزار متر مربع شامل ۶ طبقه تجاری، فودکورت و فضاهای تفریحی',
        'طراحی نمای پوسته دوپوسته (Double-Skin Facade) عایق حرارت',
        'نظارت کارگاهی و کنترل کیفیت مصالح QA/QC'
      ],
      en: [
        '52,000 m² gross built area across 6 commercial levels, food court, and cinema entertainment',
        'Thermally insulating high-performance double-skin kinetic louvers facade system',
        'Strict site execution supervision, structural QA/QC, and contractor coordination'
      ],
      ca: [
        '52.000 m² de superfície construïda en 6 nivells comercials, gastronomia i oci',
        'Doble façana ventilada d’alt aïllament tèrmic',
        'Direcció d’obra, control de qualitat QA/QC i coordinació tècnica'
      ],
      es: [
        '52.000 m² de superficie construida en 6 niveles comerciales, gastronomía y ocio',
        'Doble fachada ventilada de alto aislamiento térmico',
        'Dirección de obra, control de calidad QA/QC y coordinación técnica'
      ],
      fr: [
        '52 000 m² de plancher sur 6 niveaux commerciaux, espace restauration et loisirs',
        'Façade double peau haute performance avec isolation thermique renforcée',
        'Direction des travaux et contrôle qualité strict (AQ/CQ) des matériaux'
      ],
      de: [
        '52.000 m² Bruttogeschossfläche über 6 Etagen mit Gastronomie und Entertainment',
        'Hochwärmegedämmte doppelschalige Fassade mit Sonnenschutz',
        'Oberbauleitung, strenge Qualitätssicherung (QA/QC) und Koordination'
      ],
      it: [
        '52.000 m² di superficie su 6 livelli commerciali, food hall e intrattenimento',
        'Doppia facciata ad alte prestazioni per massimo isolamento termico',
        'Direzione cantiere, protocolli QA/QC e coordinamento fornitori'
      ]
    },
    location: {
      fa: 'بندرعباس، بلوار اصلی',
      en: 'Bandar Abbas, Main Boulevard',
      ca: 'Bandar Abbas, Avinguda Principal',
      es: 'Bandar Abbas, Avenida Principal',
      fr: 'Bandar Abbas, Boulevard Principal',
      de: 'Bandar Abbas, Hauptboulevard',
      it: 'Bandar Abbas, Viale Principale',
    },
    area: {
      fa: '۵۲,۰۰۰ متر مربع',
      en: '52,000 m²',
      ca: '52.000 m²',
      es: '52.000 m²',
      fr: '52 000 m²',
      de: '52.000 m²',
      it: '52.000 m²',
    }
  },

  'roudan-commercial': {
    title: {
      fa: 'مجتمع تجاری و اداری رودان',
      en: 'Roudan Commercial & Administrative Complex',
      ca: 'Complex Comercial i Administratiu de Roudan',
      es: 'Complejo Comercial y Administrativo de Roudan',
      fr: 'Complexe Commercial et Administratif de Roudan',
      de: 'Handels- und Verwaltungszentrum Roudan',
      it: 'Complesso Commerciale e Amministrativo di Roudan',
    },
    concept: {
      fa: 'ساماندهی دفاتر اداری دولتی و واحدهای تجاری در دو بلوک متصل با حیاط میانی اقلیمی و تهویه طبیعی بادگیرها.',
      en: 'Dual-block commercial and municipal administrative building organized around a shaded climatic courtyard with contemporary windcatcher micro-ventilation stacks.',
      ca: 'Edifici administratiu i comercial de dos blocs organitzat al voltant d’un pati climàtic amb xemeneies de ventilació natural.',
      es: 'Edificio administrativo y comercial de dos bloques articulado en torno a un patio bioclimático con chimeneas de ventilación natural.',
      fr: 'Ensemble tertiaire composé de deux volumes articulés autour d’un patio frais, équipé de puits de ventilation naturelle passive.',
      de: 'Zweiteiliger Gewerbe- und Verwaltungskomplex um einen klimatisierten Innenhof mit innovativen Windturm-Lüftungsschächten.',
      it: 'Complesso terziario a due blocchi organizzato attorno a una corte bioclimatica ombreggiata con camini di ventilazione naturale.',
    },
    features: {
      fa: ['پلان ماژولار اداری با قابلیت تغییر ابعاد واحدها', 'دسترسی مجزا برای ارباب‌رجوع و کارکنان'],
      en: ['Modular office floorplates allowing flexible tenant partitioning', 'Dedicated segregated circulation cores for public visitors and staff'],
      ca: ['Plantes d’oficines modulars amb gran flexibilitat de compartimentació', 'Circulacions independents per al públic i el personal'],
      es: ['Plantas de oficinas modulares con gran flexibilidad de compartimentación', 'Circulaciones independientes para público y personal'],
      fr: ['Plateaux de bureaux modulables pour un aménagement flexible', 'Noyaux de circulation indépendants pour les usagers et le personnel'],
      de: ['Modulare Büroflächen mit flexiblen Grundrisskonfigurationen', 'Getrennte Erschließungskerne für Besucher und Mitarbeiter'],
      it: ['Piante uffici modulari con elevata flessibilità distributiva', 'Percorsi di circolazione indipendenti per pubblico e dipendenti']
    },
    location: {
      fa: 'هرمزگان، رودان',
      en: 'Roudan, Hormozgan',
      ca: 'Roudan, Hormozgan',
      es: 'Roudan, Hormozgán',
      fr: 'Roudan, Hormozgan',
      de: 'Roudan, Hormozgan',
      it: 'Roudan, Hormozgan',
    },
    area: {
      fa: '۱۴,۵۰۰ متر مربع',
      en: '14,500 m²',
      ca: '14.500 m²',
      es: '14.500 m²',
      fr: '14 500 m²',
      de: '14.500 m²',
      it: '14.500 m²',
    }
  },

  'dublin-techhub-bim': {
    title: {
      fa: 'برج اداری و فناوری ۷ طبقه دوبلین (BIM Audit LOD 350)',
      en: 'Dublin Tech Hub 7-Story Tower & BIM Audit',
      ca: 'Torre Tecnològica de 7 Plantes de Dublín i Auditoria BIM',
      es: 'Torre Tecnológica de 7 Plantas de Dublín y Auditoría BIM',
      fr: 'Tour Technologique de 7 Étages à Dublin & Audit BIM',
      de: 'Dublin Tech Hub 7-stöckiger Turm & BIM-Audit',
      it: 'Torre Tecnologica a 7 Piani di Dublino & Audit BIM',
    },
    concept: {
      fa: 'برج مدرن تجاری-اداری ۷ طبقه در دوبلین با رویکرد معماری پایدار و استانداردهای پیشرفته مدلسازی اطلاعات ساختمان (LOD 350)، دیتاسنتر اختصاصی، فضاهای کار اشتراکی و سیستم تهویه هوشمند.',
      en: 'Next-generation 7-story office tower in Dublin engineered to BREEAM Excellent standards and advanced BIM Level 2 / LOD 350 coordination, housing tier-3 edge data centers, agile co-working pods, and smart chilled-beam HVAC systems.',
      ca: 'Torre d’oficines d’última generació de 7 plantes a Dublín amb certificació BREEAM Excellent i BIM LOD 350, amb centres de dades, espais de cotreball i climatització intel·ligent.',
      es: 'Torre de oficinas de última generación de 7 plantas en Dublín con certificación BREEAM Excellent y BIM LOD 350, con centros de datos, espacios de coworking y climatización inteligente.',
      fr: 'Tour de bureaux high-tech de 7 étages à Dublin conçue selon les normes BREEAM Excellent et BIM LOD 350, intégrant datacenters, espaces de coworking et génie climatique connecté.',
      de: 'Hochmoderner 7-geschossiger Büroturm in Dublin nach BREEAM Excellent und BIM LOD 350 mit Rechenzentrum, Co-Working-Zonen und smarter Lüftungstechnik.',
      it: 'Torre direzionale d’avanguardia di 7 piani a Dublino con standard BREEAM Excellent e BIM LOD 350, data center dedicato, coworking e climatizzazione intelligente.',
    },
    features: {
      fa: [
        'طراحی ۷ طبقه اداری با کرتین‌وال آکوستیک دوجداره و هسته بتنی',
        'مدلسازی جامع سازه و تاسیسات (MEP/Structure) جهت رفع تداخلات Clash Detection',
        'دیتاسنتر هوشمند زیرساختی و ایستگاه‌های کاری ارگونومیک مانیتور دوگانه',
        'بهینه‌سازی انرژی با استاندارد BREEAM Excellent'
      ],
      en: [
        '7-story high-performance acoustic double-glazed curtain wall with reinforced core',
        'Full multi-disciplinary MEP & structural Revit BIM modeling with 0 critical clashes',
        'Tier-3 resilient data center and dual-monitor ergonomic workstation pods',
        'Sustainable lifecycle design targeting BREEAM Excellent and net-zero operational readiness'
      ],
      ca: [
        'Muro cortina acústic de doble vidre i nucli de formigó armat en 7 plantes',
        'Modelatge integral BIM Revit MEP/Estructures amb eliminació total d’interferències',
        'Centre de dades resilient i llocs de treball ergonòmics amb doble pantalla',
        'Optimització energètica per a l’estàndard BREEAM Excellent'
      ],
      es: [
        'Muro cortina acústico de doble acristalamiento y núcleo de hormigón en 7 plantas',
        'Modelado integral BIM Revit MEP/Estructuras con eliminación total de interferencias',
        'Centro de datos resiliente y puestos de trabajo ergonómicos con doble monitor',
        'Optimización energética para el estándar BREEAM Excellent'
      ],
      fr: [
        'Mur-rideau acoustique double vitrage sur 7 niveaux avec noyau béton armé',
        'Modélisation BIM complète MEP & Structure sous Revit sans conflits',
        'Centre de données sécurisé et postes de travail ergonomiques double écran',
        'Performance énergétique et bas carbone conforme à BREEAM Excellent'
      ],
      de: [
        '7 Etagen mit hochschallgedämmter Doppelglas-Pfosten-Riegel-Fassade',
        'Vollständige Revit MEP & Tragwerks-BIM-Modellierung ohne Kollisionen',
        'Hochsicheres Rechenzentrum und ergonomische Doppelmonitor-Arbeitsplätze',
        'Nachhaltiges Energiekonzept nach BREEAM Excellent Standard'
      ],
      it: [
        'Facciata continua a doppio vetro acustico e nucleo in calcestruzzo su 7 piani',
        'Modellazione completa BIM MEP e strutture su Revit senza interferenze critiche',
        'Data center sicuro e postazioni di lavoro ergonomiche con doppio monitor',
        'Efficienza energetica avanzata secondo lo standard BREEAM Excellent'
      ]
    },
    location: {
      fa: 'دوبلین، ایرلند (Dublin, Ireland)',
      en: 'Dublin, Ireland',
      ca: 'Dublín, Irlanda',
      es: 'Dublín, Irlanda',
      fr: 'Dublin, Irlande',
      de: 'Dublin, Irland',
      it: 'Dublino, Irlanda',
    },
    area: {
      fa: '۱۲,۴۰۰ متر مربع',
      en: '12,400 m²',
      ca: '12.400 m²',
      es: '12.400 m²',
      fr: '12 400 m²',
      de: '12.400 m²',
      it: '12.400 m²',
    }
  },

  // 4. Category 04: Retail Stores
  'apple-store-concept': {
    title: {
      fa: 'پروژه تجاری و شوروم اپل استور',
      en: 'Apple Store & Digital Tech Concept Store',
      ca: 'Botiga Concepte Apple Store i Tecnologia Digital',
      es: 'Tienda Concepto Apple Store y Tecnología Digital',
      fr: 'Concept Store Apple Store et Technologies Digitales',
      de: 'Apple Store & Digital Tech Concept Store',
      it: 'Concept Store Apple Store e Tecnologia Digitale',
    },
    concept: {
      fa: 'طراحی استندهای چوبی یکپارچه با جعبه‌های نور مخفی، دیوار اختصاصی نمایش لوازم جانبی با هندسه منظم، کانترهای آموزش مشتری و کالبد مینیمال متناسب با استانداردهای خرده‌فروشی جهانی.',
      en: 'Precision retail interior architecture featuring solid white oak display tables with concealed electrification, a recessed backlit accessory Avenue display, Genius consulting bar, and terrazzo flooring.',
      ca: 'Arquitectura interior de botiga d’alta precisió amb taules de roure massís, mur d’accessoris retroil·luminat, taulell d’assessorament tècnic i paviment de terratzo.',
      es: 'Arquitectura interior comercial de alta precisión con mesas de roble macizo, muro de accesorios retroiluminado, mostrador de asesoramiento técnico y suelo de terrazo.',
      fr: 'Architecture d’intérieur commerciale de haute précision avec tables en chêne massif électrifiées, mur d’accessoires rétroéclairé et sol en terrazzo coulé.',
      de: 'Präziser Retail-Innenausbau mit Echtholz-Eichentischen, hinterleuchteter Zubehör-Wand, Beratungstresen und fugenlosem Terrazzoboden.',
      it: 'Interior design per retail di alta precisione con tavoli in massello di rovere elettrificati, parete accessori retroilluminata e pavimenti in terrazzo.',
    },
    features: {
      fa: [
        'میزهای مشاور چوب سالید طبیعی با پریزهای توکار مخفی',
        'دیوار پگ‌بورد اکسسوری با نورپردازی متمرکز بالای هر آیتم',
        'میز پذیرش با چوب گرم در برابر دیوارهای بتن مات'
      ],
      en: [
        'Solid European oak communal tables with concealed pop-up connectivity ports',
        'Precision modular accessory pegboard wall with calibrated accent spotlights',
        'Warm timber consultation concierge desk offset against matte architectural plaster'
      ],
      ca: [
        'Taules de roure massís europeu amb connexions elèctriques ocultes',
        'Mur d’accessoris modular amb il·luminació puntual sobre cada producte',
        'Taulell d’atenció de fusta càlida sobre fons d’estuc mineral mat'
      ],
      es: [
        'Mesas de roble macizo europeo con conexiones eléctricas ocultas',
        'Muro de accesorios modular con iluminación puntual sobre cada producto',
        'Mostrador de atención de madera cálida sobre fondo de estuco mineral mate'
      ],
      fr: [
        'Tables en chêne massif européen avec connectique intégrée escamotable',
        'Mur d’accessoires modulaire rétroéclairé avec éclairage focalisé',
        'Banque d’accueil chaleureuse en bois en contraste avec les enduits minéraux'
      ],
      de: [
        'Massive Eichenholztische mit verdeckten integrierten Anschlusspanels',
        'Modulare Zubehör-Präsentationswand mit gezielter Spotbeleuchtung',
        'Empfangstresen aus warmem Holz vor matten Sichtspachtelwänden'
      ],
      it: [
        'Tavoli in rovere massiccio europeo con connessioni a scomparsa',
        'Parete modulare accessori con faretti calibrati dedicati',
        'Banco consultazione in legno caldo a contrasto con intonaci minerali'
      ]
    },
    location: {
      fa: 'تهران (Tehran)',
      en: 'Tehran',
      ca: 'Teheran',
      es: 'Teherán',
      fr: 'Téhéran',
      de: 'Teheran',
      it: 'Teheran',
    },
    area: {
      fa: '۱۹۰ متر مربع',
      en: '190 m²',
      ca: '190 m²',
      es: '190 m²',
      fr: '190 m²',
      de: '190 m²',
      it: '190 m²',
    }
  },

  // 5. Category 05: Institutional & Competitions
  'hormozgan-engineering-hq': {
    title: {
      fa: 'ساختمان مرکزی سازمان نظام مهندسی هرمزگان (مقام دوم مسابقه)',
      en: 'Hormozgan Engineering Organization HQ Competition (2nd Prize)',
      ca: 'Seu Central de l’Organització d’Enginyeria d’Hormozgan (2n Premi)',
      es: 'Sede Central de la Organización de Ingeniería de Hormozgan (2º Premio)',
      fr: 'Siège de l’Ordre des Ingénieurs d’Hormozgan (2e Prix)',
      de: 'Zentrale der Ingenieurkammer Hormozgan (2. Preis)',
      it: 'Sede Centrale dell’Ordine degli Ingegneri di Hormozgan (2° Premio)',
    },
    concept: {
      fa: 'ترکیب هندسه مدرن با المان‌های اقلیمی بومی جنوب ایران (سایه‌بان‌های مشبک شناور و شوادان) که موفق به کسب رتبه دوم در میان ده‌ها آتلیه برجسته کشوری گردید.',
      en: '2nd Prize national competition-winning institutional headquarters synthesizing pure modernist massing with climatic vernacular devices (floating perforated mashrabiya solar screens and subterranean cooling reservoirs).',
      ca: 'Seu institucional guardonada amb el 2n Premi nacional que combina geometria moderna i estratègies bioclimàtiques locals com gelosies perforades i patis ombrejats.',
      es: 'Sede institucional galardonada con el 2º Premio nacional que combina geometría moderna y estrategias bioclimáticas locales como celosías perforadas y patios sombreados.',
      fr: 'Projet lauréat du 2e Prix au concours national, alliant écriture contemporaine et dispositifs bioclimatiques traditionnels (moucharabiehs et patios d’ombre).',
      de: 'Zweitplatzierter Wettbewerbsentwurf für eine Ingenieurkammer-Zentrale, der kubische Moderne mit lokalen passiven Kühlungselementen vereint.',
      it: 'Progetto premiato con il 2° Premio al concorso nazionale, capace di unire rigore modernista e strategie bioclimatiche tradizionali come schermi traforati.',
    },
    features: {
      fa: ['برنده رتبه دوم مسابقه معماری رسمی', 'پوسته متخلخل تهویه غیرفعال خورشیدی'],
      en: ['2nd Prize Winner in officially sanctioned national architectural design competition', 'Perforated kinetic solar shading skin generating natural convective updrafts'],
      ca: ['Guanyador del 2n Premi en concurs oficial d’arquitectura', 'Façana porosa per a ventilació passiva i control solar'],
      es: ['Ganador del 2º Premio en concurso oficial de arquitectura', 'Fachada porosa para ventilación pasiva y control solar'],
      fr: ['Lauréat du 2e Prix au concours national officiel d’architecture', 'Façade poreuse assurant ventilation passive et protection solaire'],
      de: ['2. Preis beim offiziellen nationalen Architekturwettbewerb', 'Perforierte Gebäudehülle zur passiven solaren Selbstbelüftung'],
      it: ['2° Premio al concorso nazionale ufficiale di architettura', 'Facciata microforata per ventilazione convettiva passiva e schermatura']
    },
    location: {
      fa: 'بندرعباس',
      en: 'Bandar Abbas',
      ca: 'Bandar Abbas',
      es: 'Bandar Abbas',
      fr: 'Bandar Abbas',
      de: 'Bandar Abbas',
      it: 'Bandar Abbas',
    },
    area: {
      fa: '۸,۲۰۰ متر مربع',
      en: '8,200 m²',
      ca: '8.200 m²',
      es: '8.200 m²',
      fr: '8 200 m²',
      de: '8.200 m²',
      it: '8.200 m²',
    }
  },

  'bandar-lighthouse': {
    title: {
      fa: 'المان و پاویون فانوس دریایی بندرعباس (طرح برگزیده)',
      en: 'Bandar Abbas Lighthouse Architectural Scheme',
      ca: 'Pavelló i Far Urbà de Bandar Abbas (Proposta Seleccionada)',
      es: 'Pabellón y Faro Urbano de Bandar Abbas (Propuesta Seleccionada)',
      fr: 'Pavillon Phare de Bandar Abbas (Projet Sélectionné)',
      de: 'Leuchtturm-Pavillon Bandar Abbas (Ausgewählter Entwurf)',
      it: 'Padiglione Faro di Bandar Abbas (Progetto Selezionato)',
    },
    concept: {
      fa: 'نشانه شاخص شهری (Landmark) با تلفیق فرم بادگیرهای سنتی هرمزگان و پرتوهای نور لیزری مدرن به عنوان نماد خوش‌آمدگویی دریانوردان.',
      en: 'Iconic civic maritime landmark fusing the aerodynamic geometries of historical Persian windtowers with illuminated beacon technology as an entry beacon for mariners.',
      ca: 'Fita urbana i marítima emblemàtica que fusiona la geometria dels antics captadors de vent amb una balisa lluminosa contemporània.',
      es: 'Hito urbano y marítimo emblemático que fusiona la geometría de los antiguos captadores de viento con una baliza luminosa contemporánea.',
      fr: 'Repère urbain et maritime combinant la silhouette des tours à vent traditionnelles et un signal lumineux contemporain pour les navigateurs.',
      de: 'Maritimes Wahrzeichen, das die aerodynamische Form historischer Windtürme mit moderner Laser-Leuchtfeuertechnik verbindet.',
      it: 'Segno urbano e marittimo identitario che reinterpreta le tradizionali torri del vento con una moderna lanterna luminosa.',
    },
    features: {
      fa: ['سازه فلزی اسپیس‌فریم با روکش کامپوزیت سفید مات', 'سکوی تماشای پانوراما خلیج فارس'],
      en: ['Lightweight spatial steel spaceframe clad in matte white anti-corrosion composite', 'Elevated public cantilevered viewing observation deck over the Persian Gulf'],
      ca: ['Estructura metàl·lica espacial revestida de panells blancs anticorrosius', 'Plataforma mirador en voladís amb vistes panoràmiques al mar'],
      es: ['Estructura metálica espacial revestida de paneles blancos anticorrosivos', 'Plataforma mirador en voladizo con vistas panorámicas al mar'],
      fr: ['Structure spatiale métallique légère vêtue de composite blanc résistant', 'Plateforme panoramique en belvédère sur le golfe Persique'],
      de: ['Leichte Raumfachwerk-Stahlstruktur mit korrosionsbeständiger matter Verkleidung', 'Kragarm-Aussichtsplattform mit Blick auf den Persischen Golf'],
      it: ['Struttura reticolare spaziale in acciaio rivestita in composito bianco anticorrosivo', 'Piattaforma panoramica a sbalzo affacciata sul Golfo Persico']
    },
    location: {
      fa: 'نوار ساحلی خلیج فارس، بندرعباس',
      en: 'Coastal Strip, Bandar Abbas',
      ca: 'Passeig Marítim, Bandar Abbas',
      es: 'Paseo Marítimo, Bandar Abbas',
      fr: 'Front de mer, Bandar Abbas',
      de: 'Küstenstreifen, Bandar Abbas',
      it: 'Litorale costiero, Bandar Abbas',
    },
    area: {
      fa: '۴۵۰ متر مربع',
      en: '450 m²',
      ca: '450 m²',
      es: '450 m²',
      fr: '450 m²',
      de: '450 m²',
      it: '450 m²',
    }
  },

  'sapad-gateway': {
    title: {
      fa: 'سردر ورودی مجموعه سپاد مشهد (طرح فینالیست)',
      en: 'Sapad Entrance Gateway Architectural Competition',
      ca: 'Portal d’Entrada al Complex Sapad (Finalista del Concurs)',
      es: 'Puerta de Entrada al Complejo Sapad (Finalista del Concurso)',
      fr: 'Porte d’Entrée du Complexe Sapad (Finaliste du Concours)',
      de: 'Eingangsportal Sapad-Komplex (Finalist-Auszeichnung)',
      it: 'Portale d’Ingresso del Complesso Sapad (Finalista del Concorso)',
    },
    concept: {
      fa: 'دروازه ورودی شهری با هندسه پارامتریک و ایجاد دهانه‌ای با شکوه برای هدایت ترافیک سواره و پیاده به شهرک گردشگری سپاد.',
      en: 'Monumental parametric portal canopy creating a ceremonial urban gateway that articulates pedestrian boulevards and vehicular approaches into the Sapad tourism development.',
      ca: 'Portal paramètric monumental que configura una entrada cerimonial per a vianants i vehicles al complex turístic de Sapad.',
      es: 'Portal paramétrico monumental que configura una entrada ceremonial para peatones y vehículos al complejo turístico de Sapad.',
      fr: 'Portique d’entrée paramétrique monumental matérialisant une porte urbaine majestueuse pour les flux piétons et automobiles du pôle touristique Sapad.',
      de: 'Monumentales parametrisches Vordachportal als repräsentatives Eingangstor für Fußgänger und Fahrzeuge zum Tourismusareal Sapad.',
      it: 'Portale parametrico monumentale che segna l’ingresso cerimoniale per percorsi pedonali e veicolari al polo turistico di Sapad.',
    },
    features: {
      fa: ['دهانه کنسولی بدون ستون میانی', 'نورپردازی تعاملی شبانه'],
      en: ['Column-free dramatic cantilevered structural portal spanning major dual boulevards', 'Dynamic integrated evening illuminations and night architectural lighting'],
      ca: ['Gran obertura en voladís lliure de pilars centrals', 'Il·luminació nocturna arquitectònica interactiva'],
      es: ['Gran vano en voladizo libre de pilares centrales', 'Iluminación nocturna arquitectónica interactiva'],
      fr: ['Portée impressionnante en porte-à-faux sans aucun pilier intermédiaire', 'Éclairage architectural interactif et mise en scène nocturne'],
      de: ['Freitragendes weitgespanntes Vordach ohne störende Mittelstützen', 'Interaktive Architektur-Nachtbeleuchtung'],
      it: ['Luce strutturale a sbalzo senza pilastri intermedi', 'Illuminazione notturna scenografica e interattiva']
    },
    location: {
      fa: 'مشهد',
      en: 'Mashhad',
      ca: 'Mashhad',
      es: 'Mashhad',
      fr: 'Machhad',
      de: 'Maschhad',
      it: 'Mashhad',
    },
    area: {
      fa: 'دروازه و پلازای شهری',
      en: 'Civic Gate & Plaza',
      ca: 'Portal Cívic i Plaça',
      es: 'Puerta Cívica y Plaza',
      fr: 'Porte Urbaine & Esplanade',
      de: 'Stadttor & Platzanlage',
      it: 'Portale Civico e Piazza',
    }
  }
};

// -----------------------------------------------------------------------------
// 2. STATUS AND TYPOLOGY TRANSLATIONS
// -----------------------------------------------------------------------------

export const STATUS_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  'ساخته شده': {
    fa: 'ساخته شده',
    en: 'Completed',
    ca: 'Construït',
    es: 'Construido',
    fr: 'Construit',
    de: 'Fertiggestellt',
    it: 'Costruito',
  },
  'در حال ساخت': {
    fa: 'در حال ساخت',
    en: 'Under Construction',
    ca: 'En Construcció',
    es: 'En Construcción',
    fr: 'En Construction',
    de: 'In Bau',
    it: 'In Costruzione',
  },
  'طراحی و کانسپت': {
    fa: 'طراحی و کانسپت',
    en: 'Design & Concept',
    ca: 'Disseny i Concepte',
    es: 'Diseño y Concepto',
    fr: 'Conception & Concept',
    de: 'Entwurf & Konzept',
    it: 'Design & Concetto',
  },
  'مسابقه و جایزه': {
    fa: 'مسابقه و جایزه',
    en: 'Competition & Award',
    ca: 'Concurs i Premi',
    es: 'Concurso y Premio',
    fr: 'Concours & Prix',
    de: 'Wettbewerb & Auszeichnung',
    it: 'Concorso e Premio',
  }
};

export const TYPOLOGY_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  'Residential': {
    fa: 'مسکونی و ویلایی',
    en: 'Residential',
    ca: 'Residencial',
    es: 'Residencial',
    fr: 'Résidentiel',
    de: 'Wohnbau',
    it: 'Residenziale',
  },
  'Commercial': {
    fa: 'تجاری و اداری',
    en: 'Commercial',
    ca: 'Comercial i Oficines',
    es: 'Comercial y Oficinas',
    fr: 'Commercial et Bureaux',
    de: 'Gewerbe & Büro',
    it: 'Commerciale e Uffici',
  },
  'Urban Design': {
    fa: 'طراحی شهری و بنادر',
    en: 'Urban Design',
    ca: 'Disseny Urbà',
    es: 'Diseño Urbano',
    fr: 'Design Urbain',
    de: 'Stadtplanung',
    it: 'Design Urbano',
  },
  'Retail': {
    fa: 'خرده‌فروشی و کانسپت‌استور',
    en: 'Retail & Storefronts',
    ca: 'Comerç i Retail',
    es: 'Comercio y Retail',
    fr: 'Commerce de Détail',
    de: 'Einzelhandel & Store',
    it: 'Retail & Showroom',
  },
  'Public & Cultural': {
    fa: 'فرهنگی، عمومی و مسابقات',
    en: 'Public & Cultural',
    ca: 'Públic i Cultural',
    es: 'Público y Cultural',
    fr: 'Public & Culturel',
    de: 'Öffentlich & Kultur',
    it: 'Pubblico & Culturale',
  }
};

export function getLocalizedStatus(status: string, lang: LanguageCode): string {
  return STATUS_TRANSLATIONS[status]?.[lang] || status;
}

export function getLocalizedTypology(typology: string, lang: LanguageCode): string {
  return TYPOLOGY_TRANSLATIONS[typology]?.[lang] || typology;
}

// -----------------------------------------------------------------------------
// 3. PROJECT & CATEGORY LOCALIZATION HELPER FUNCTIONS
// -----------------------------------------------------------------------------

export function getLocalizedProject(project: Project, lang: LanguageCode): Project {
  const trans = PROJECT_TRANSLATIONS[project.id];
  if (!trans) {
    return {
      ...project,
      status: getLocalizedStatus(project.status, lang) as any,
      typology: getLocalizedTypology(project.typology, lang) as any,
    };
  }

  const isFa = lang === 'fa';
  const localizedTitle = isFa ? project.title : (trans.title[lang] || project.englishTitle || project.title);
  const secondaryTitle = isFa ? project.englishTitle : project.title;

  return {
    ...project,
    title: localizedTitle,
    englishTitle: secondaryTitle,
    concept: isFa ? project.concept : (trans.concept[lang] || project.concept),
    features: isFa ? project.features : (trans.features[lang] || project.features),
    location: isFa ? project.location : (trans.location[lang] || project.location),
    area: isFa ? project.area : (trans.area[lang] || project.area),
    role: trans.role?.[lang] || project.role,
    client: trans.client?.[lang] || project.client,
    status: getLocalizedStatus(project.status, lang) as any,
    typology: getLocalizedTypology(project.typology, lang) as any,
  };
}

export function getLocalizedCategory(category: CategoryBuilding, lang: LanguageCode): CategoryBuilding {
  const zoneInfo = TRANSLATIONS[lang]?.zones?.[category.id as keyof typeof TRANSLATIONS[typeof lang]['zones']];
  const localizedTitle = zoneInfo?.label || (lang === 'fa' ? category.title : category.englishTitle);
  const localizedDesc = zoneInfo?.desc || category.description;

  return {
    ...category,
    title: localizedTitle,
    englishTitle: lang === 'fa' ? category.englishTitle : category.title,
    description: localizedDesc,
    projects: category.projects.map(p => getLocalizedProject(p, lang))
  };
}

export function getLocalizedCategories(categories: CategoryBuilding[], lang: LanguageCode): CategoryBuilding[] {
  return categories.map(cat => getLocalizedCategory(cat, lang));
}

// -----------------------------------------------------------------------------
// 4. MULTI-LANGUAGE RESUME PROFILE
// -----------------------------------------------------------------------------

export function getLocalizedResume(lang: LanguageCode): ResumeProfile {
  if (lang === 'fa') {
    return RESUME_DATA;
  }

  const isCatalan = lang === 'ca';
  const isSpanish = lang === 'es';
  const isFrench = lang === 'fr';
  const isGerman = lang === 'de';
  const isItalian = lang === 'it';

  let title = 'Senior Architect & BIM Specialist | Technical Project Lead';
  if (isCatalan) title = 'Arquitecte Sènior i Especialista BIM | Cap de Projectes Tècnics';
  else if (isSpanish) title = 'Arquitecto Sénior y Especialista BIM | Jefe de Proyectos Técnicos';
  else if (isFrench) title = 'Architecte Senior et Spécialiste BIM | Chef de Projet Technique';
  else if (isGerman) title = 'Leitender Architekt & BIM-Spezialist | Technischer Projektleiter';
  else if (isItalian) title = 'Architetto Senior e Specialista BIM | Responsabile Tecnico di Progetto';

  let bio = 'Senior Architect and BIM Specialist with over 15 years of international experience leading, designing, and executing luxury residential developments, large commercial complexes, and urban infrastructure across Europe and the Middle East. Comprehensive mastery across all project lifecycle stages from concept and schematic design (Anteproyecto) through construction documentation (Proyecto Básico y de Ejecución) and on-site supervision, coupled with advanced Building Information Modeling leadership (BIM LOD 350/400) and multi-disciplinary clash resolution.';
  if (isCatalan) bio = 'Arquitecte sènior i especialista en BIM amb més de 15 anys d’experiència internacional en el lideratge, disseny i execució de promocions residencials de luxe, grans complexos comercials i infraestructures urbanes a Europa i l’Orient Mitjà. Domini integral de tots els cicles de vida del projecte, des del concepte i avantprojecte fins a la documentació d’execució (Projecte Bàsic i d’Execució) i la direcció d’obra, acompanyat del lideratge avançat en BIM (LOD 350/400) i coordinació multidisciplinària.';
  else if (isSpanish) bio = 'Arquitecto sénior y especialista en BIM con más de 15 años de experiencia internacional en el liderazgo, diseño y ejecución de desarrollos residenciales de lujo, grandes complejos comerciales e infraestructuras urbanas en Europa y Oriente Medio. Dominio integral de todos los ciclos de vida del proyecto, desde la fase conceptual y anteproyecto hasta la documentación de ejecución (Proyecto Básico y de Ejecución) y dirección de obra, junto con el liderazgo avanzado en BIM (LOD 350/400) y resolución de interferencias.';
  else if (isFrench) bio = 'Architecte senior et spécialiste BIM avec plus de 15 ans d’expérience internationale dans la direction, la conception et la réalisation de projets résidentiels de luxe, de grands complexes commerciaux et d’infrastructures urbaines en Europe et au Moyen-Orient. Maîtrise complète de toutes les étapes du cycle de vie du projet, du concept (avant-projet) au dossier d’exécution et au suivi de chantier, combinée à une expertise avancée en BIM (LOD 350/400) et synthèse technique.';
  else if (isGerman) bio = 'Leitender Architekt und BIM-Spezialist mit über 15 Jahren internationaler Erfahrung in der Führung, Planung und Umsetzung von luxuriösen Wohnbauprojekten, großen Gewerbekomplexen und urbanen Infrastrukturen in Europa und dem Nahen Osten. Umfassende Beherrschung aller Projektphasen vom Konzept bis zur Ausführungsplanung und Bauüberwachung, verbunden mit führender BIM-Expertise (LOD 350/400) und multidisziplinärer Kollisionsprüfung.';
  else if (isItalian) bio = 'Architetto senior e specialista BIM con oltre 15 anni di esperienza internazionale nella direzione, progettazione e realizzazione di sviluppi residenziali di lusso, grandi complessi commerciali e infrastrutture urbane in Europa e Medio Oriente. Piena padronanza di tutte le fasi del ciclo di vita del progetto dal concept alla progettazione esecutiva e direzione lavori, unita a competenze avanzate BIM (LOD 350/400) e coordinamento multidisciplinare.';

  return {
    ...RESUME_DATA,
    name: 'Soheil Masti',
    englishName: 'Soheil Masti',
    title,
    englishTitle: 'Senior Architect & BIM Specialist | Technical Project Lead',
    location: isCatalan ? 'Barcelona, Catalunya (Sant Cugat del Vallès) | Teheran' : isSpanish ? 'Barcelona, España (Sant Cugat del Vallès) | Teherán' : 'Barcelona, Spain (Sant Cugat del Vallès) | Tehran',
    bio,
    education: [
      {
        degree: isCatalan ? 'Màster Universitari en Arquitectura (M.Arch.)' : isSpanish ? 'Máster Universitario en Arquitectura (M.Arch.)' : isFrench ? 'Master en Architecture (M.Arch.)' : isGerman ? 'Master of Architecture (M.Arch.)' : 'Master of Architecture (M.Arch.)',
        university: 'Islamic Azad University, Central Tehran Branch',
        year: '2011 – 2013',
        location: isCatalan ? 'Teheran' : isSpanish ? 'Teherán' : isFrench ? 'Téhéran' : 'Tehran'
      },
      {
        degree: isCatalan ? 'Grau en Arquitectura (B.Arch.)' : isSpanish ? 'Grado en Arquitectura (B.Arch.)' : isFrench ? 'Licence en Architecture (B.Arch.)' : isGerman ? 'Bachelor of Architecture (B.Arch.)' : 'Bachelor of Architecture (B.Arch.)',
        university: 'Payame Noor University of Bandar Abbas',
        year: '2006 – 2010',
        location: 'Bandar Abbas'
      }
    ],
    experience: [
      {
        role: isCatalan ? 'Arquitecte Principal i Coordinador BIM' : isSpanish ? 'Arquitecto Principal y Coordinador BIM' : isFrench ? 'Architecte Principal & Coordinateur BIM' : isGerman ? 'Leitender Architekt & BIM-Koordinator' : 'Lead Architect & BIM Specialist',
        company: 'Gaam Studio',
        period: '2020 – Present',
        location: isCatalan ? 'Barcelona, Catalunya' : isSpanish ? 'Barcelona, España' : isFrench ? 'Barcelone, Espagne' : isGerman ? 'Barcelona, Spanien' : 'Barcelona, Spain',
        highlights: isCatalan ? [
          'Direcció del disseny arquitectònic, processos BIM avançats (LOD 350) i redacció de projectes d’execució en més de 20 habitatges, 4 complexos comercials i 6 botigues de luxe.',
          'Projectes residencials Ando i Lumen (2021–2022): redistribució espacial completa, fusteria de detall i tramitació de llicències municipals a Barcelona.',
          'Projecte residencial Darbandsara: disseny arquitectònic, integració d’estructures de formigó complexes i detalls per a clima alpí.',
          'Coordinació interdisciplinària d’estructures i instal·lacions (MEP/Structure) per a la detecció automàtica de col·lisions abans d’entrar a obra.'
        ] : isSpanish ? [
          'Dirección del diseño arquitectónico, procesos BIM avanzados (LOD 350) y redacción de proyectos de ejecución en más de 20 viviendas, 4 complejos comerciales y 6 locales de lujo.',
          'Proyectos residenciales Ando y Lumen (2021–2022): redistribución espacial completa, detalles de carpintería y licencias municipales en Barcelona.',
          'Proyecto residencial Darbandsara: diseño arquitectónico, integración de estructuras de hormigón complejas y detalles para clima alpino.',
          'Coordinación interdisciplinar de estructuras e instalaciones (MEP/Structure) para detección automática de colisiones antes de entrar en obra.'
        ] : [
          'Directed architectural design, advanced BIM workflows (LOD 350), and complete construction documentation across 20+ residential units, 4 commercial centers, and 6 luxury retail venues.',
          'Residences Ando & Lumen (2021–2022): comprehensive spatial reconfiguration, custom woodwork detailing, and Barcelona municipal permitting.',
          'Darbandsara Alpine Residence: lead design, complex cast-in-place concrete integration, and high-altitude mountain climate detailing.',
          'Executed multi-disciplinary MEP and structural coordination matrices achieving automated clash detection prior to site mobilization.'
        ]
      },
      {
        role: isCatalan ? 'Arquitecte Sènior i Cap d’Equip de Disseny' : isSpanish ? 'Arquitecto Sénior y Jefe de Equipo de Diseño' : 'Senior Architect & Design Team Lead',
        company: 'Fanoos Langargah',
        period: '2015 – 2019',
        location: 'Tehran / South Iran',
        highlights: isCatalan ? [
          'Gestió de l’equip de disseny en el lliurament de 7 projectes residencials, 5 edificis d’oficines i 3 centres sanitaris des de fase conceptual fins a obra.',
          'Projectes residencials Noora & Ehsan: disseny complet de façanes, organització espacial i documentació de fase d’execució.',
          'Desenvolupament de conceptes comercials retail i estratègies d’il·luminació arquitectònica.',
          'Premis destacats en concursos nacionals d’arquitectura i disseny urbà.'
        ] : isSpanish ? [
          'Gestión del equipo de diseño en la entrega de 7 proyectos residenciales, 5 edificios de oficinas y 3 centros de salud desde concepto hasta obra.',
          'Proyectos residenciales Noora y Ehsan: diseño completo de fachadas, organización espacial y documentación de fase de ejecución.',
          'Desarrollo de conceptos comerciales retail y estrategias de iluminación arquitectónica.',
          'Premios destacados en concursos nacionales de arquitectura y diseño urbano.'
        ] : [
          'Led multidisciplinary design team delivering 7 residential developments, 5 office towers, and 3 specialized healthcare facilities from schematic design to handover.',
          'Noora & Ehsan Residences: facade engineering packages, spatial organization, and technical construction drawings.',
          'Developed innovative retail concept stores and architectural lighting strategies.',
          'Secured top ranks in national architecture and urban design competitions.'
        ]
      },
      {
        role: isCatalan ? 'Director General i Cap de Projectes' : isSpanish ? 'Director General y Jefe de Proyectos' : 'Managing Director & Project Lead',
        company: 'Wall & Saghf Co.',
        period: '2013 – 2015',
        location: 'Iran',
        highlights: isCatalan ? [
          'Gran Complex Comercial de Bandar Abbas (52.000 m²): gestió integral del procés arquitectònic, doble façana i envolvent tèrmica.',
          'Implantació de protocols de control de qualitat (QA/QC) i planificació de supervisió continuada d’obra.'
        ] : [
          'Bandar Abbas Mega Commercial Complex (52,000 m²): complete architectural lifecycle leadership, double-skin facade design for client Farzad Vatankhah.',
          'Established strict site QA/QC protocols and periodic construction inspection schedules.'
        ]
      },
      {
        role: isCatalan ? 'Arquitecte i Supervisor d’Obra Resident' : isSpanish ? 'Arquitecto y Supervisor de Obra Residente' : 'Architect & Resident Site Supervisor',
        company: 'Memar Sazeh Parsian & Rahpuyan M.T.',
        period: '2011 – 2013',
        location: 'Bandar Abbas / Roudan',
        highlights: isCatalan ? [
          'Complex Comercial i Administratiu de Roudan: arquitecte responsable del programa funcional i documents tècnics.',
          'Nova infraestructura i zona portuària de Bandar Abbas: estudis previs, zonificació i pla general d’ordenació.',
          'Supervisió d’obra als conjunts residencials Aseman (38 habitatges) i Golshahr (12 habitatges).'
        ] : [
          'Roudan Commercial & Administrative Complex: project architect for functional programming and technical structural integration.',
          'New Bandar Abbas Port & Infrastructure: schematic layout studies, security zoning, and master logistics layout.',
          'Resident site supervision on Aseman (38 units) and Golshahr (12 units) multi-family residential complexes.'
        ]
      }
    ],
    competencies: [
      {
        category: 'BIM & Parametric Modeling',
        skills: ['Autodesk Revit (LOD 300/400)', 'AutoCAD 2D/3D', 'ArchiCAD', 'Rhino', 'Parametric Workflows', 'Clash Detection / Navisworks']
      },
      {
        category: 'Construction Documentation & Codes',
        skills: ['Proyecto Básico y de Ejecución', 'Bills of Quantities (BOQ)', 'European Building Codes (CTE)', 'Facade & Structural Joinery Details']
      },
      {
        category: 'Rendering & Architectural Presentation',
        skills: ['3ds Max', 'V-Ray Rendering', 'Lumion Architecture', 'Adobe Photoshop / InDesign', 'Three.js / Interactive Web Presentation']
      },
      {
        category: 'Project Management & Site Supervision',
        skills: ['MEP / Structural Coordination', 'Resident Site Supervision', 'QA/QC Material Quality Assurance', 'Client Negotiation & Delivery']
      }
    ],
    awards: [
      {
        title: isCatalan ? 'Seu Central de l’Organització d’Enginyeria d’Hormozgan' : isSpanish ? 'Sede Central de la Organización de Ingeniería de Hormozgan' : 'Hormozgan Engineering Organization HQ Competition',
        year: '2012',
        rank: isCatalan ? '2n Premi Nacional' : isSpanish ? '2º Premio Nacional' : '2nd Prize National Winner'
      },
      {
        title: isCatalan ? 'Pavelló i Far Urbà de Bandar Abbas' : isSpanish ? 'Pabellón y Faro Urbano de Bandar Abbas' : 'Bandar Abbas Urban Lighthouse Landmark',
        year: '2014',
        rank: isCatalan ? 'Proposta Seleccionada' : isSpanish ? 'Propuesta Seleccionada' : 'Selected Scheme'
      },
      {
        title: isCatalan ? 'Portal d’Entrada al Complex Sapad de Mashhad' : isSpanish ? 'Puerta de Entrada al Complejo Sapad de Mashhad' : 'Sapad Entrance Gateway Competition',
        year: '2013',
        rank: isCatalan ? 'Finalista Guardonat' : isSpanish ? 'Finalista Galardonado' : 'Finalist Award'
      }
    ],
    references: [
      {
        name: 'Farzad Vatankhah',
        role: isCatalan ? 'Promotor i Inversor Immobiliari' : isSpanish ? 'Promotor e Inversor Inmobiliario' : 'Real Estate Developer & Investor',
        quote: isCatalan ? '«En Soheil és un arquitecte d’un talent i compromís excepcionals. Va liderar el complex de 52.000 m² amb un rigor tècnic impecable i una capacitat de gestió exemplar.»' : isSpanish ? '«Soheil es un arquitecto de un talento y compromiso excepcionales. Lideró el complejo de 52.000 m² con un rigor técnico impecable y una capacidad de gestión ejemplar.»' : '“Soheil is an architect of rare dedication and technical mastery. He led our 52,000 m² commercial mega-complex with flawless engineering coordination, strict quality control, and world-class design sensibility.”'
      },
      {
        name: 'Reza Amirizadeh',
        role: isCatalan ? 'Director General de Memar Sazeh Co.' : isSpanish ? 'Director General de Memar Sazeh Co.' : 'Managing Director, Memar Sazeh Co.',
        quote: isCatalan ? '«Molt precís i orientat als detalls. La seva visió rica aporta una perspectiva única als projectes i als concursos d’arquitectura.»' : isSpanish ? '«Muy preciso y orientado a los detalles. Su rica visión aporta una perspectiva única a los proyectos y a los concursos de arquitectura.»' : '“Soheil is extraordinarily sharp and detail-oriented in every phase of architectural delivery. His rich experience gives him a unique competitive edge in winning national competitions.”'
      },
      {
        name: 'Majid Niroomandi',
        role: isCatalan ? 'CEO d’AP Logistic Europe' : isSpanish ? 'CEO de AP Logistic Europe' : 'CEO, AP Logistic Europe',
        quote: isCatalan ? '«Un arquitecte amb visió clara i creativitat serena. Troba sempre solucions innovadores i s’alinea a la perfecció amb els estàndards internacionals.»' : isSpanish ? '«Un arquitecto con visión clara y creatividad serena. Encuentra siempre soluciones innovadoras y se alinea a la perfección con los estándares internacionales.»' : '“An architect of calm authority and visionary insight. He consistently innovates to resolve complex spatial challenges and aligns seamlessly with European standards.”'
      }
    ]
  };
}
