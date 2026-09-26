import { CategoryBuilding, Project, ResumeProfile } from '../types';
import { LanguageCode, TRANSLATIONS } from './i18n';
import { RESUME_DATA } from '../data/initialData';

// -----------------------------------------------------------------------------
// 1. PROJECT TRANSLATION CATALOG FOR ALL 25 ARCHITECTURAL WORKS (7 LANGUAGES)
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
  'urban-design-high-density': {
    "title": {
        "fa": "برنامه‌ریزی شهری، برج‌های چندمنظوره و اسکای‌لاین",
        "en": "High-Density Urban Design & Skyline Masterplan",
        "ca": "Planificació Urbana d'Alta Densitat i Skyline",
        "es": "Planificación Urbana de Alta Densidad y Skyline",
        "fr": "Planification Urbaine Haute Densité & Skyline",
        "de": "Urbane Dichteplanung & Skyline-Masterplan",
        "it": "Pianificazione Urbana ad Alta Densità & Skyline"
    },
    "concept": {
        "fa": "مطالعات پیشرفته فرم کالبدی، جهت‌گیری بادهای غالب شهری و سایه‌اندازی برج‌ها، استقرار فضاهای عمومی پیاده‌محور در تراز صفر و ارتباط متوازن خط آسمان با بافت پیرامونی با الهام از اصول منشور شهرسازی نوین.",
        "en": "Advanced physical massing studies, prevailing urban wind vector optimization, solar shadow casting of towers, pedestrian-first public ground realms, and harmonious skyline articulation respecting the surrounding metropolitan fabric.",
        "ca": "Estudis volumètrics avançats, orientació als vents dominants, estudi d'assolellament de torres i creació d'espais públics per a vianants que harmonitzen l'skyline urbà.",
        "es": "Estudios volumétricos avanzados, análisis de vientos dominantes y asoleamiento de torres, con espacios públicos peatonales a cota cero que integran la silueta urbana.",
        "fr": "Études volumétriques avancées, analyse des vents dominants et de l'ensoleillement des tours, créant des espaces piétons connectés à la silhouette urbaine.",
        "de": "Erweiterte städtebauliche Massenstudien, Windkanaloptimierung und solare Verschattungsanalysen mit fußgängerfreundlichen Plätzen auf Erdgeschossebene.",
        "it": "Studi volumetrici avanzati, orientamento ai venti urbani e ombreggiamento delle torri, con piazze pedonali che valorizzano lo skyline metropolitano."
    },
    "features": {
        "fa": [
            "تحلیل کوریدورهای دید و کوریدورهای تهویه طبیعی هوا",
            "تفکیک شبکه‌های ترافیکی سواره از پلازاهای چندسطحی پیاده",
            "طراحی برج‌های سبز مدولار با رویکرد پایداری انرژی",
            "پکیج کامل ۱۰ شیت شامل پلان سایت، دیاگرام‌ها و مقاطع کالبدی"
        ],
        "en": [
            "Visual corridor preservation and natural atmospheric ventilation channels",
            "Grade separation between vehicular networks and multi-level pedestrian plazas",
            "Modular biophilic green towers optimized for passive energy efficiency",
            "Complete 10-sheet presentation package with master site plans and physical sections"
        ],
        "ca": [
            "Preservació de corredors visuals i canals de ventilació natural",
            "Segregació de trànsit rodat i places públiques per a vianants",
            "Torres bioclimàtiques sostenibles amb estratègies d'eficiència energètica",
            "Documentació completa de 10 làmines amb plànols directors i seccions"
        ],
        "es": [
            "Preservación de corredores visuales y canales de ventilación natural",
            "Segregación del tráfico rodado y plazas públicas peatonales",
            "Torres bioclimáticas sostenibles con alta eficiencia energética",
            "Paquete completo de 10 láminas con planos maestros y secciones físicas"
        ],
        "fr": [
            "Préservation des cônes de vue et couloirs de ventilation naturelle",
            "Séparation des flux véhiculaires et des esplanades piétonnes",
            "Tours bioclimatiques intégrant une haute efficacité énergétique",
            "Dossier complet de 10 planches avec plans masses et coupes urbaines"
        ],
        "de": [
            "Sichtachsen- und Durchlüftungskorridore für das Mikroklima",
            "Trennung von Verkehrsströmen und fußgängerorientierten Stadtplätzen",
            "Nachhaltige Hochhäuser mit biophilem Fassadenkonzept",
            "Umfassendes 10-Blatt-Präsentationspaket mit Masterplan und Schnitten"
        ],
        "it": [
            "Conservazione dei corridoi visivi e canali di ventilazione naturale",
            "Separazione dei flussi veicolari dalle piazze pedonali multilivello",
            "Torri verdi modulari ad alta efficienza energetica",
            "Pacchetto completo di 10 tavole con masterplan e sezioni ambientali"
        ]
    },
    "location": {
        "fa": "تهران / حاشیه کلانشهر",
        "en": "Tehran Metropolitan Periphery",
        "ca": "Àrea Metropolitana de Teheran",
        "es": "Área Metropolitana de Teherán",
        "fr": "Périphérie Métropolitaine de Téhéran",
        "de": "Metropolregion Teheran",
        "it": "Area Metropolitana di Teheran"
    },
    "area": {
        "fa": "۱۲۰ هکتار محدوده توسعه شهری",
        "en": "120 Hectares Urban Masterplan",
        "ca": "Pla Director de 120 Hectàrees",
        "es": "Plan Maestro de 120 Hectáreas",
        "fr": "Plan Directeur de 120 Hectares",
        "de": "120 Hektar Stadtentwicklungsgebiet",
        "it": "Masterplan di 120 Ettari"
    }
},
  'zargandeh-riverside-morphology': {
    "title": {
        "fa": "مورفولوژی شهری، بازآفرینی روددره زرگنده و پهنه‌های اکولوژیک",
        "en": "Zargandeh Riverside Urban Morphology & Regeneration",
        "ca": "Morfologia Urbana i Regeneració del Riu Zargandeh",
        "es": "Morfología Urbana y Regeneración del Río Zargandeh",
        "fr": "Morphologie Urbaine & Régénération Fluviale de Zargandeh",
        "de": "Urbane Morphologie & Zargandeh Flussbett-Revitalisierung",
        "it": "Morfologia Urbana e Rigenerazione del Canale Zargandeh"
    },
    "concept": {
        "fa": "احیای اکولوژیک بستر طبیعی روددره زرگنده با مداخله کمینه‌گرا در بافت، بازتعریف حریم آب و ایجاد مسیرهای سلامت سبز، پل‌های پیاده اتصال‌دهنده دو سوی دره و فعال‌سازی دیواره‌های توپوگرافیک جهت تبدیل تهدید سیلاب به تفرجگاه عمومی پایدار.",
        "en": "Ecological urban revitalization of the natural Zargandeh riverbed through low-impact contextual interventions, waterfront buffer restoration, green health trails, suspended pedestrian bridges connecting valley banks, and activating topographic slopes into flood-resilient civic parks.",
        "ca": "Regeneració ecològica de la llera del riu Zargandeh mitjançant intervencions mínimes, passarel·les suspeses de vianants i itineraris saludables protegits d'avingudes.",
        "es": "Revitalización ecológica del cauce natural del río Zargandeh mediante pasarelas peatonales, senderos verdes e infraestructuras resilientes a inundaciones.",
        "fr": "Régénération écologique du cours d'eau de Zargandeh par des cheminements verts, passerelles suspendues et aménagements résilients face aux crues.",
        "de": "Ökologische Revitalisierung des Zargandeh-Flussbettes mit Hochwasserschutz, Fußgängerbrücken und naturnahen Erholungsräumen.",
        "it": "Rigenerazione ecologica dell'alveo fluviale di Zargandeh con percorsi pedonali nel verde e ponti sospesi a tutela idraulica."
    },
    "features": {
        "fa": [
            "طراحی پل‌های پیاده‌رو کابلی معلق بر فراز دره رودخانه",
            "مسیرهای دوچرخه‌سواری، پیاده‌روی سلامت و سکوهای تماشای منظره",
            "مهندسی تثبیت بیولوژیک شیب‌های تند با سنگ و پوشش گیاهی بومی",
            "پکیج ۵ شیت شامل تحلیل شیب، مطالعات بافت کالبدی و رندرهای چشم‌انداز"
        ],
        "en": [
            "Cable-stayed pedestrian bridges spanning across river canyon slopes",
            "Dedicated cycling lanes, walking promenades, and panoramic lookouts",
            "Bio-engineering embankment stabilization using native geology and flora",
            "Complete 5-sheet set covering slope gradients, spatial fabric, and aerial CGI"
        ],
        "ca": [
            "Ponts atirantats per a vianants sobre el congost fluvial",
            "Itineraris de mobilitat activa, carrils bici i miradors paisatgístics",
            "Bioenginyeria de talussos amb roca local i vegetació autòctona",
            "5 làmines tècniques d'anàlisi de pendents i renders paisatgístics"
        ],
        "es": [
            "Puentes atirantados peatonales sobre la vaguada del río",
            "Carriles bici, senderos de salud y miradores panorámicos",
            "Bioingeniería de laderas con piedra y vegetación autóctona",
            "Juego completo de 5 láminas con análisis morfológico y visualizaciones"
        ],
        "fr": [
            "Passerelles suspendues pour piétons reliant les deux rives",
            "Pistes cyclables, voies douces et belvédères panoramiques",
            "Génie végétal et enrochements de talus pour la stabilité naturelle",
            "5 planches thématiques d'analyse du relief et modélisations CGI"
        ],
        "de": [
            "Schrägseilbrücken für Fußgänger über das Flusstal",
            "Radwege, Gesundheitspfade und Panoramakanzeln",
            "Biologische Hangsicherung mit Naturstein und heimischer Flora",
            "5 Planungsblätter mit Geländeanalyse und Landschaftsvisualisierungen"
        ],
        "it": [
            "Ponti strallati pedonali sospesi sopra la valle naturale",
            "Piste ciclabili, passeggiate nel verde e punti panoramici",
            "Ingegneria naturalistica e terrazzamenti in pietra locale",
            "5 tavole complete con studi altimetrici e render territoriali"
        ]
    },
    "location": {
        "fa": "تهران، منطقه ۳، حاشیه روددره زرگنده",
        "en": "Zargandeh River Corridor, District 3, Tehran",
        "ca": "Corredor Fluvial Zargandeh, Teheran",
        "es": "Corredor Fluvial Zargandeh, Teherán",
        "fr": "Vallée Fluviale de Zargandeh, Téhéran",
        "de": "Zargandeh Flusstal, Teheran",
        "it": "Corridoio Fluviale di Zargandeh, Teheran"
    },
    "area": {
        "fa": "۱۸ هکتار پهنه سبز و کریدور اکولوژیک",
        "en": "18 Hectares Ecological Corridor",
        "ca": "18 ha de Corredor Ecològic",
        "es": "18 ha de Corredor Ecológico",
        "fr": "18 ha de Corridor Écologique",
        "de": "18 Hektar Grünkorridor",
        "it": "18 ha di Corridoio Ecologico"
    }
},
  'diamond-villa-masterplan': {
    "title": {
        "fa": "سایت‌پلان شهرک ویلایی دیاموند و دروازه ورودی",
        "en": "Diamond Villa Town Masterplan & Gateway",
        "ca": "Pla Director de la Urbanització Diamond i Portal d'Entrada",
        "es": "Plan Maestro de la Urbanización Diamond y Puerta de Acceso",
        "fr": "Plan Masse du Domaine Diamond & Porte Monumentale",
        "de": "Masterplan Diamond Villensiedlung & Eingangstor",
        "it": "Masterplan del Quartiere Diamond & Portale d'Ingresso"
    },
    "concept": {
        "fa": "طراحی سایت‌پلان جامع شهرک ویلایی لوکس دیاموند بر بستر تپه‌ماهور با تفکیک اراضی هندسی، شبکه‌بندی ارگانیک دسترسی‌های سواره و پیاده و طراحی دروازه ورودی المان‌محور که به عنوان شناسه بصری مجموعه عمل می‌کند.",
        "en": "Master site planning for the Diamond Luxury Villa Community over undulating terrain, utilizing geometric parcel subdivisions, organic contour-following road networks, and an iconic architectural gateway serving as the landmark identity of the private estate.",
        "ca": "Pla director de la comunitat residencial Diamond sobre terreny ondulat, amb xarxa viària que segueix les corbes de nivell i un portal d'accés escultural.",
        "es": "Plan maestro de la comunidad residencial Diamond sobre terreno ondulado, con trazado vial que respeta la topografía y una puerta de acceso monumental.",
        "fr": "Plan directeur du domaine résidentiel Diamond sur relief vallonné, avec voirie intégrée au relief et un porche d'entrée sculptural.",
        "de": "Masterplanung für die Diamond Villensiedlung auf hügeligem Areal mit topografischer Straßenführung und skulpturalem Eingangsbauwerk.",
        "it": "Masterplan per il complesso di ville Diamond su terreno collinare, con tracciati rispettosi dell'orografia e portale monumentale distintivo."
    },
    "features": {
        "fa": [
            "تفکیک قطعات ویلایی با رعایت بیشترین دید به مناظر طبیعی پیرامون",
            "دروازه ورودی یادمانی با متریال‌های بتن و فلز هماهنگ با هویت مدرن شهرک",
            "سایت‌پلان کامل و تفصیلی ۵ شیت با دیتیل‌های محوطه‌سازی و دسترسی‌ها"
        ],
        "en": [
            "Parcel subdivision optimized for unobstructed panoramic mountain vistas",
            "Monumental gateway structure combining architectural concrete and steel",
            "Comprehensive 5-sheet presentation set including landscape layout and road geometry"
        ],
        "ca": [
            "Subdivisió de parcel·les amb màximes visuals cap a l'entorn natural",
            "Portal d'accés monumental en formigó arquitectònic i acer",
            "Pla director de 5 làmines amb seccions viàries i paisatgisme"
        ],
        "es": [
            "Subdivisión de parcelas optimizada para vistas panorámicas despejadas",
            "Puerta monumental de hormigón visto y elementos de acero",
            "Paquete completo de 5 láminas con vialidad y paisajismo integral"
        ],
        "fr": [
            "Découpage parcellaire offrant des perspectives dégagées sur la nature",
            "Entrée monumentale combinant béton apparent et structure métallique",
            "5 planches de synthèse intégrant voirie, paysagement et volumétrie"
        ],
        "de": [
            "Grundstücksteilung mit optimalen Blickachsen in die Bergwelt",
            "Monumentales Torgebäude aus Sichtbeton und Stahlelementen",
            "5-teiliges Planungsset mit Straßenprofilen und Begrünungsplan"
        ],
        "it": [
            "Lottizzazione orientata verso le migliori viste panoramiche",
            "Portale d'ingresso scultoreo in cemento a vista e profili d'acciaio",
            "5 tavole esecutive con viabilità, sezioni stradali e verde attrezzato"
        ]
    },
    "location": {
        "fa": "دماوند / دشت مشاء",
        "en": "Damavand / Mosha Valley",
        "ca": "Vall de Mosha, Damavand",
        "es": "Valle de Mosha, Damavand",
        "fr": "Vallée de Mosha, Damavand",
        "de": "Damavand / Mosha-Tal",
        "it": "Valle di Mosha, Damavand"
    },
    "area": {
        "fa": "۴۵ هکتار سایت ویلایی اختصاصی",
        "en": "45 Hectares Gated Villa Estate",
        "ca": "45 ha d'Urbanització Privada",
        "es": "45 ha de Urbanización Privada",
        "fr": "Domaine Privé de 45 Hectares",
        "de": "45 Hektar Gated Community",
        "it": "45 ha di Quartiere Residenziale Privato"
    }
},
  'landscape-outdoor-living': {
    "title": {
        "fa": "معماری منظر، آلاچیق‌ها و محوطه‌سازی اقامتی",
        "en": "Landscape Architecture & Outdoor Living Pavilions",
        "ca": "Arquitectura del Paisatge i Pavellons Exteriors",
        "es": "Arquitectura del Paisaje y Pabellones Exteriores",
        "fr": "Architecture du Paysage & Pavillons de Plein Air",
        "de": "Landschaftsarchitektur & Outdoor-Wohnpavillons",
        "it": "Architettura del Paesaggio & Padiglioni all'Aperto"
    },
    "concept": {
        "fa": "ترکیب فضاهای باز و نیمه‌باز با الهام از کوشک‌های باغ ایرانی در کالبدی معاصر، ایجاد حریم‌های حرارتی مطلوب در فضای باز با سایه‌بان‌های چوبی، آب‌نماهای خطی و فضاهای نشستن دور آتشگاه در هماهنگی کامل با پوشش گیاهی بومی.",
        "en": "Contemporary spatial integration of open and semi-open outdoor living inspired by traditional pavilion typologies, utilizing timber louvers, linear reflective water basins, sunken fire-pit lounges, and xeriscape planting suited to local microclimates.",
        "ca": "Integració contemporània d'espais exteriors i pèrgoles de fusta, làmines d'aigua lineals i zones de foc exterior en harmonia amb la vegetació.",
        "es": "Diseño de espacios exteriores con pérgolas de madera natural, láminas de agua reflectantes y zonas de fuego integradas en el paisaje.",
        "fr": "Aménagement paysager associant pergolas de bois, bassins d'eau linéaires et salons extérieurs autour d'un foyer naturel.",
        "de": "Harmonische Freiraumgestaltung mit Holzlamellen-Pavillons, Wasserbecken und abgesenkter Feuerstelle in naturnahem Ambiente.",
        "it": "Composizione di spazi all'aperto con pergolati in legno, specchi d'acqua lineari e lounge con braciere integrato nel verde."
    },
    "features": {
        "fa": [
            "آلاچیق‌های مدرن با ساختار سبک چوب ترمووود و فلز",
            "آب‌نماهای آرامش‌بخش، استخرهای بی‌انتها و آتشگاه سنگی",
            "نورپردازی شبانه خطی پنهان برای پیاده‌راه‌ها و درختان کهنسال",
            "مجموعه ۶ شیت رندرهای باکیفیت و دیاگرام‌های محوطه‌سازی"
        ],
        "en": [
            "Modern pavilions with lightweight thermo-treated timber and steel frames",
            "Reflective water elements, infinity pools, and monolithic stone fire pits",
            "Concealed linear architectural night lighting for walkways and trees",
            "Complete 6-sheet series of photorealistic CGI and landscape schematics"
        ],
        "ca": [
            "Pavellons moderns amb estructura d'acer i fusta termotractada",
            "Làmines d'aigua relaxants, piscines desbordants i foc de pedra",
            "Il·luminació nocturna integrada en camins i arbrat existent",
            "Col·lecció de 6 làmines de visualització CGI d'alta resolució"
        ],
        "es": [
            "Pabellones ligeros de madera termotratada y perfiles de acero",
            "Piscinas desbordantes, láminas de agua y braseros de piedra natural",
            "Iluminación escénica indirecta en senderos y arbolado",
            "Serie de 6 láminas completas con renders y esquemas paisajísticos"
        ],
        "fr": [
            "Pavillons contemporains en bois rétifié et charpente acier fine",
            "Piscines à débordement, miroirs d'eau et cheminées extérieures en pierre",
            "Mise en lumière nocturne discrète guidant les cheminements piétons",
            "6 planches détaillées de modélisation paysagère de haute précision"
        ],
        "de": [
            "Leichtbau-Pavillons aus Thermoholz und filigranen Stahlprofilen",
            "Infinity-Pools, Reflektionswasserbecken und Natursteinfeuerstellen",
            "Blendfreie LED-Linienbeleuchtung für Wege und Großgehölze",
            "6 Blätter mit fotorealistischen Renderings und Pflanzplänen"
        ],
        "it": [
            "Padiglioni moderni in legno trattato e struttura metallica",
            "Piscine a sfioro, vasche d'acqua riflettenti e bracieri in pietra",
            "Illuminazione notturna scenografica a scomparsa lungo i sentieri",
            "Serie di 6 tavole di presentazione con rendering CGI realistici"
        ]
    },
    "location": {
        "fa": "ویلاهای دماوند و لواسان",
        "en": "Lavasan & Damavand Estates",
        "ca": "Finques a Lavasan i Damavand",
        "es": "Fincas en Lavasán y Damavand",
        "fr": "Domaines de Lavasan & Damavand",
        "de": "Residenzen in Lavasan & Damavand",
        "it": "Residenze di Lavasan e Damavand"
    },
    "area": {
        "fa": "۱۵,۰۰۰ متر مربع محوطه‌سازی ویلایی",
        "en": "15,000 m² Landscape Design",
        "ca": "15.000 m² de Paisatgisme",
        "es": "15.000 m² de Paisajismo",
        "fr": "15 000 m² d'Aménagements Paysagers",
        "de": "15.000 m² Freiflächengestaltung",
        "it": "15.000 m² di Paesaggio e Giardini"
    }
},
  'bridge-highway-infrastructure': {
    "title": {
        "fa": "تقاطع‌های غیرهمسطح، اتوبان‌های کلان‌شهری و زیرساخت پل‌ها",
        "en": "Metropolitan Highway Interchange & Bridge Infrastructure",
        "ca": "Intercanviador d'Autopistes i Infraestructura de Ponts Urbans",
        "es": "Enlace de Autopistas e Infraestructura de Puentes Urbanos",
        "fr": "Échangeur Autoroutier & Grands Ouvrages d'Art Urbains",
        "de": "Autobahnkreuz & Urbane Brückeninfrastruktur",
        "it": "Svincolo Autostradale e Infrastruttura di Ponti Urbani"
    },
    "concept": {
        "fa": "طراحی مهندسی تبادل‌های ترافیکی چندسطحی، رمپ‌ها و لوپ‌های شریانی اتوبانی و سازه پل‌های بتنی پیش‌تنیده با تمرکز بر روانی جریان ترافیک، ادغام ایمن با توپوگرافی و حفظ منظر بصری شهری.",
        "en": "Civic engineering and visual synthesis of multi-level highway interchanges, arterial directional ramps, loops, and post-tensioned segmental concrete flyover bridges designed for smooth capacity, seismic safety, and expressive structural elegance.",
        "ca": "Disseny d'enllaços d'autopista a múltiples nivells, passos elevats de formigó posttesat i integració respectuosa amb l'entorn urbà.",
        "es": "Diseño de enlaces de autopistas en varios niveles, pasos elevados de hormigón pretensado y fluidez del tráfico con impacto paisajístico reducido.",
        "fr": "Conception d'échangeurs autoroutiers étagés, viaducs en béton précontraint et optimisation des flux de trafic urbains.",
        "de": "Ingenieurtechnische Planung von mehrstöckigen Autobahnkreuzen und Spannbetonbrücken für reibungslosen Verkehrsfluss.",
        "it": "Progettazione di svincoli autostradali multilivello e viadotti in cemento armato precompresso con massima fluidità viaria."
    },
    "features": {
        "fa": [
            "طراحی هندسی دقیق رمپ‌ها و لوپ‌های ترافیکی مطابق آیین‌نامه‌های بین‌المللی",
            "پل‌های بتنی پیش‌تنیده با دهانه‌های عریض و حداقل پایه‌های میانی",
            "نورپردازی خطی معمارانه زیر پل‌ها جهت ارتقای امنیت و حس سرزندگی شبانه",
            "مجموعه ۵ شیت تحلیلی شامل پلان‌های هندسی، مقاطع عرضی و نماهای پرسپکتیو"
        ],
        "en": [
            "Geometric ramp and loop layout adhering to international highway standards",
            "Wide-span post-tensioned segmental box-girder bridge structures",
            "Integrated under-deck architectural LED lighting for night security",
            "5 comprehensive presentation sheets detailing structural sections and aerial renders"
        ],
        "ca": [
            "Geometria precisa de ramals segons normatives internacionals",
            "Ponts de formigó amb grans llums i mínim nombre de piles centrals",
            "Il·luminació integrada sota tauler per a seguretat i estètica nocturna",
            "5 làmines d'enginyeria civil amb seccions i vistes aèries"
        ],
        "es": [
            "Trazado geométrico de rampas bajo normativas internacionales de trazado",
            "Estructuras de vigas cajón pretensadas con vanos de gran luz",
            "Iluminación arquitectónica bajo tablero para seguridad vial nocturna",
            "5 láminas con secciones estructurales y perspectivas aéreas"
        ],
        "fr": [
            "Tracé géométrique des bretelles conforme aux normes internationales",
            "Tabliers de ponts précontraints à longues portées réduisant les piles",
            "Éclairage sous-face valorisant l'ouvrage et sécurisant les passages",
            "5 planches techniques avec profils en travers et visualisations aériennes"
        ],
        "de": [
            "Trassierung nach internationalen Richtlinien für Schnellstraßen",
            "Weitgespannte Spannbetonbrücken mit minimalen Zwischenstützen",
            "Architektonische Unterdeckbeleuchtung für Verkehrssicherheit bei Nacht",
            "5 Blätter mit Querprofilen, Rampengeometrie und Luftbildrenderings"
        ],
        "it": [
            "Geometria di svincoli e rampe conforme ai più elevati standard viabilistici",
            "Ponti con travi a cassone precompresso a grande luce",
            "Illuminazione architetturale sotto impalcato per sicurezza e visibilità",
            "5 tavole tecniche con sezioni strutturali e viste prospettiche"
        ]
    },
    "location": {
        "fa": "شریان‌های کلان‌شهری تهران",
        "en": "Tehran Metropolitan Arterial Ring",
        "ca": "Cinturons Ràpids de Teheran",
        "es": "Red Arterial Metropolitana de Teherán",
        "fr": "Rocades Métropolitaines de Téhéran",
        "de": "Metropol-Schnellstraßenring Teheran",
        "it": "Grande Raccordo Stradale di Teheran"
    },
    "area": {
        "fa": "۸ کیلومتر مسیر اتوبانی و تقاطع غیرهمسطح",
        "en": "8 km Highway Corridor & Interchanges",
        "ca": "8 km de Corredor Viari i Enllaços",
        "es": "8 km de Corredor y Enlaces Viarios",
        "fr": "8 km d'Infrastructures & Échangeurs",
        "de": "8 km Autobahnkorridor & Kreuzungsbauwerke",
        "it": "8 km di Tracciato Autostradale e Svincoli"
    }
},
  'violet-villa': {
    "title": {
        "fa": "ویلای لوکس وایولت و جزئیات اسکلت بتنی و فلزی",
        "en": "Violet Luxury Residence & Steel-Concrete Construction",
        "ca": "Vil·la de Luxe Violet i Estructura Mixta Formigó-Acer",
        "es": "Villa de Lujo Violet y Estructura Mixta Hormigón-Acero",
        "fr": "Villa de Luxe Violet & Structure Mixte Béton-Acier",
        "de": "Luxusvilla Violet & Stahl-Beton-Konstruktion",
        "it": "Villa di Lusso Violet & Struttura Mista Cemento-Acciaio"
    },
    "concept": {
        "fa": "معماری ویلایی مدرن و شاخص با سازه ترکیبی بتن مسلح و مقاطع فولادی اکسپوز، کنسول‌های جسورانه، دیوارهای شیشه‌ای قدی بازشو، استخر سرپوشیده و سرباز به هم پیوسته و مدارک اجرایی فاز ۲ برای تمام اتصالات و نازک‌کاری.",
        "en": "Flagship modern luxury residence showcasing composite reinforced concrete and exposed steel structures, daring overhang cantilevers, floor-to-ceiling panoramic glass walls, interconnected indoor-outdoor pool, and rigorous construction details for every steel joinery and millwork connection.",
        "ca": "Residència de luxe contemporània amb estructura mixta de formigó i acer vist, voladissos agosarats, façanes de vidre de terra a sostre i piscina continuada interior-exterior.",
        "es": "Residencia de lujo con audaz estructura mixta de hormigón y acero visto, grandes voladizos, ventanales de suelo a techo y piscina climatizada interior-exterior.",
        "fr": "Maison de prestige à structure mixte béton et acier apparent, spectaculaires porte-à-faux, parois vitrées toute hauteur et piscine communicante.",
        "de": "Moderne Luxusvilla mit Verbundtragwerk aus Stahlbeton und Sichtstahl, auskragenden Vordächern, raumhohem Glas und nahtlosem Innen-Außen-Pool.",
        "it": "Villa esclusiva con struttura mista in cemento armato e acciaio a vista, aggetti audaci, grandi vetrate e piscina collegata interno-esterno."
    },
    "features": {
        "fa": [
            "کنسول‌های فولادی ۴ متری بدون ستون با مقاومت در برابر زلزله",
            "استخر شیشه‌ای پیوسته با جریان آب از نشیمن به فضای باز",
            "پوشش نمای سنگ تراورتن خطی تیره در همنشینی با بتن اکسپوز",
            "پکیج کامل ۹ شیت شامل پلان‌های اجرایی، مقاطع فنی و جزئیات سازه‌ای"
        ],
        "en": [
            "4-meter column-free steel cantilevers engineered for seismic resilience",
            "Continuous glass-enclosed pool flowing seamlessly from living room to garden",
            "Dark linear travertine facade coupled with exposed architectural concrete",
            "Full 9-sheet construction package with executive plans, MEP sections, and connection details"
        ],
        "ca": [
            "Voladissos d'acer de 4 metres sense pilars, sismoresistents",
            "Piscina continua amb connexió directa del saló al jardí",
            "Façana de travertí lineal fosc combinat amb formigó vist",
            "Dossier executiu complet de 9 làmines amb detalls constructius"
        ],
        "es": [
            "Voladizos de acero de 4 metros sin pilares intermedios sismorresistentes",
            "Piscina que fluye de la sala de estar hacia el jardín exterior",
            "Fachada de travertino oscuro combinada con hormigón arquitectónico",
            "Paquete completo de 9 láminas ejecutivas con planos y secciones"
        ],
        "fr": [
            "Porte-à-faux en acier de 4 mètres sans poteaux intermédiaires",
            "Bassin intérieur-extérieur avec continuité spatiale vers le jardin",
            "Façade en travertin foncé et parements de béton architectonique",
            "Dossier d'exécution complet de 9 planches avec coupes et détails"
        ],
        "de": [
            "4 Meter stützenfreie Stahl-Aussteifungen mit Erdbebenbemessung",
            "Fließender Übergang des Pools vom Wohnbereich in den Garten",
            "Dunkle Travertinfassade in Kombination mit hellem Sichtbeton",
            "Kompletter 9-Blatt-Ausführungsplan mit Schnitten und Knotendetails"
        ],
        "it": [
            "Sbalzi in acciaio di 4 metri senza pilastri resistenti a sisma",
            "Piscina scenografica che collega il soggiorno alla corte verde",
            "Rivestimento in travertino scuro e cemento a vista bocciardato",
            "Pacchetto esecutivo di 9 tavole con piante, sezioni e nodi costruttivi"
        ]
    },
    "location": {
        "fa": "لواسان، تهران",
        "en": "Lavasan, Tehran",
        "ca": "Lavasan, Teheran",
        "es": "Lavasán, Teherán",
        "fr": "Lavasan, Téhéran",
        "de": "Lavasan, Teheran",
        "it": "Lavasan, Teheran"
    },
    "area": {
        "fa": "۱,۲۵۰ متر مربع زیربنا در ۳ طبقه",
        "en": "1,250 m² over 3 Levels",
        "ca": "1.250 m² en 3 Plantes",
        "es": "1.250 m² en 3 Plantas",
        "fr": "1 250 m² sur 3 Niveaux",
        "de": "1.250 m² Bruttogeschossfläche auf 3 Ebenen",
        "it": "1.250 m² su 3 Livelli"
    }
},
  'concrete-glass-topography': {
    "title": {
        "fa": "ویلای مدرن بر بستر توپوگرافی // تلفیق بتن، شیشه و چشم‌انداز",
        "en": "Topography Modern Villa // Concrete, Glass & Landscape",
        "ca": "Vil·la Moderna en Pendent // Formigó, Vidre i Paisatge",
        "es": "Villa Moderna en Ladera // Hormigón, Vidrio y Paisaje",
        "fr": "Villa Moderne en Déclivité // Béton, Verre et Paysage",
        "de": "Hangvilla // Sichtbeton, Glas & Landschaftsintegration",
        "it": "Villa Moderna su Pendio // Cemento, Vetro e Paesaggio"
    },
    "concept": {
        "fa": "طراحی ویلا روی شیب تند طبیعی با رویکرد پله‌پله و فرورفتن در کوهستان، دیوارهای حائل بتن نمایان، سقف‌های سبز عایق و بهره‌گیری از حداکثر چشم‌انداز افق بدون برهم زدن خطوط طبیعی بستر.",
        "en": "Hillside villa embedded directly into natural rock topography via a terraced cascading volumetric strategy, utilizing exposed retaining concrete walls, intensive insulating green roofs, and panoramic glass expanses preserving the pristine natural ridgeline.",
        "ca": "Vil·la esglaonada integrada en fort pendent de roca, amb murs de contenció de formigó vist, cobertes vegetals i vidrieres panoràmiques.",
        "es": "Vivienda unifamiliar escalonada en fuerte pendiente, con muros de contención de hormigón visto, cubiertas verdes y miradores acristalados.",
        "fr": "Résidence contemporaine en cascade encastrée dans la pente rocheuse, toitures végétalisées isolantes et grandes baies panoramiques.",
        "de": "Kaskadenförmige Hangvilla, direkt in den Felsuntergrund eingepasst, mit Sichtbeton-Stützwänden und extensiven Gründächern.",
        "it": "Villa a gradoni immersa nel pendio montuoso, con muri di sostegno in cemento a vista, tetti verdi e ampie vetrate panoramiche."
    },
    "features": {
        "fa": [
            "ترازهای پلکانی متعدد متناسب با شیب طبیعی زمین",
            "سقف‌های سبز گسترده با عایق‌کاری چندلایه حرارتی و رطوبتی",
            "پنجره‌های کشویی قدی بدون فریم با شیشه‌های دوجداره Low-E",
            "پکیج جامع ۱۱ شیت شامل پلان‌های کالبدی، برش‌های مقطعی و پرسپکتیوهای نورپردازی"
        ],
        "en": [
            "Stepped multi-level cascading floor plates tailored to site topography",
            "Intensive green living roofs providing advanced thermal and acoustic insulation",
            "Frameless sliding floor-to-ceiling triple-glazed Low-E window systems",
            "Comprehensive 11-sheet documentation set with structural sections and CGI night renders"
        ],
        "ca": [
            "Plantes esglaonades adaptades al pendent del terreny",
            "Cobertes vegetals d'alt aïllament tèrmic i acústic",
            "Grans finestrals corredissos sense marcs amb vidres Low-E",
            "11 làmines tècniques amb seccions de terreny i il·luminació"
        ],
        "es": [
            "Niveles escalonados adaptados a la orografía natural de la parcela",
            "Cubiertas verdes de alto rendimiento térmico y retención pluvial",
            "Ventanales correderos empotrados con vidrio bajo emisivo",
            "Serie de 11 láminas completas con planos, cortes y vistas nocturnas"
        ],
        "fr": [
            "Étages en gradins épousant fidèlement le relief naturel",
            "Toitures végétalisées à forte performance thermique et hydrique",
            "Menuiseries coulissantes minimalistes à vitrage à faible émissivité",
            "11 planches de présentation avec profils de terrain et modélisations CGI"
        ],
        "de": [
            "Abgestufte Geschossebenen, passgenau an den Geländeverlauf angeglichen",
            "Hochgedämmte Gründächer mit Regenwasser-Rückhaltevermögen",
            "Rahmenlose Dreifach-Schiebeglasfronten mit Sonnenschutzbeschichtung",
            "Umfangreicher 11-Seiten-Katalog mit Geländeschnitten und Nachtansichten"
        ],
        "it": [
            "Livelli a terrazza modellati sulla conformazione del suolo",
            "Coperture a verde pensile ad alto isolamento termico",
            "Infissi scorrevoli a filo pavimento con vetrocamera selettiva",
            "Pacchetto di 11 tavole con sezioni geologiche e render fotorealistici"
        ]
    },
    "location": {
        "fa": "دماوند، مشاء",
        "en": "Mosha, Damavand",
        "ca": "Mosha, Damavand",
        "es": "Mosha, Damavand",
        "fr": "Mosha, Damavand",
        "de": "Mosha, Damavand",
        "it": "Mosha, Damavand"
    },
    "area": {
        "fa": "۸۵۰ متر مربع زیربنا در شیب ۴۵ درجه",
        "en": "850 m² across a 45° Mountain Slope",
        "ca": "850 m² en pendent de 45°",
        "es": "850 m² en pendiente del 45°",
        "fr": "850 m² sur forte pente à 45°",
        "de": "850 m² Nutzfläche an einem 45°-Hang",
        "it": "850 m² su pendio roccioso a 45°"
    }
},
  'dalkhani-mountain-chalet': {
    "title": {
        "fa": "شله کوهستانی دالخانی // همنشینی سنگ، چوب و شیب طبیعی",
        "en": "Dalkhani Mountain Hillside Chalet // Stone & Timber",
        "ca": "Xalet de Muntanya Dalkhani // Pedra i Fusta Natural",
        "es": "Chalet de Montaña Dalkhani // Piedra y Madera Natural",
        "fr": "Chalet Alpin Dalkhani // Pierre Sèche et Bois Massif",
        "de": "Bergchalet Dalkhani // Naturstein, Holz & Hanglage",
        "it": "Chalet di Montagna Dalkhani // Pietra e Legno Massello"
    },
    "concept": {
        "fa": "طراحی شله کوهستانی در ارتفاعات جنگلی دالخانی با دیوارهای سنگ قلوه کوهی محلی، سازه چوب اشباع‌شده مقاوم در برابر رطوبت، سقف‌های شیب‌دار متناسب با برف و باران سنگین و شومینه‌های هیزمی معلق در مرکز نشیمن.",
        "en": "High-altitude mountain chalet in the lush Dalkhani forest utilizing locally-sourced dry-stack stone, treated timber post-and-beam joinery, steep gable roofs engineered for heavy rain and snow precipitation, and central suspended fire hearths.",
        "ca": "Xalet d'alta muntanya al bosc de Dalkhani amb pedra local, fusta massissa tractada i cobertes inclinades resistents a nevades.",
        "es": "Chalet de alta montaña en el bosque de Dalkhani con piedra rústica, vigas de madera vista y chimenea suspendida en el salón.",
        "fr": "Chalet d'altitude dans la forêt de Dalkhani bâti en pierre de carrière et charpente bois, avec toits à forte pente et foyer suspendu.",
        "de": "Hochgelegenes Bergchalet im Dalkhani-Wald aus lokalem Bruchstein, massivem Holztragwerk und steilen Schneedächern.",
        "it": "Chalet alpino nella foresta di Dalkhani in pietra naturale e legno lamellare, con tetti a forte pendenza e camino centrale sospeso."
    },
    "features": {
        "fa": [
            "استفاده از سنگ‌های طبیعی بستر و چوب‌های پایدار بومی",
            "سقف‌های شیبدار دوتایی با زاویه بهینه تخلیه برف و باران",
            "شومینه فولادی معلق ۳۶۰ درجه در کانون فضای نشیمن",
            "پکیج کم‌نظیر ۱۳ شیت شامل تمامی جزییات نما، فضاها و مقاطع اجرایی"
        ],
        "en": [
            "Locally sourced river stone masonry and responsibly harvested timber",
            "Dual steep-pitch gable roofs optimized for rapid rain and snow shedding",
            "360-degree floating steel fireplace anchoring the double-height great room",
            "Exceptional 13-sheet complete set documenting elevations, interiors, and details"
        ],
        "ca": [
            "Mamposteria de pedra natural de riu i fusta sostenible",
            "Cobertes a dues aigües amb pendent pronunciat per a neu i pluja",
            "Llar de foc suspesa metàl·lica de 360 graus al gran saló",
            "Dossier complet de 13 làmines amb façanes, interiors i detalls"
        ],
        "es": [
            "Mampostería de piedra natural y vigas de madera de tala controlada",
            "Cubiertas a dos aguas muy pronunciadas para evacuación de nieve",
            "Chimenea suspendida de acero con tiro visto en doble altura",
            "Colección completa de 13 láminas con todas las alzadas y cortes"
        ],
        "fr": [
            "Maçonnerie en pierre sèche locale et poteaux-poutres en bois noble",
            "Toitures à deux pans à forte déclivité conçues pour le ruissellement",
            "Cheminée suspendue à 360° au centre du séjour cathédrale",
            "Série d'exception de 13 planches détaillant intérieurs, coupes et façades"
        ],
        "de": [
            "Bruchsteinmauerwerk aus regionalem Vorkommen und massives Holz",
            "Steile Satteldachkonstruktion für schnellen Schnee- und Wasserabfluss",
            "360-Grad drehbarer Hängekamin im zweigeschossigen Wohnraum",
            "Umfangreiches 13-Blatt-Werk mit Ansichten, Innenräumen und Werkdetails"
        ],
        "it": [
            "Murature in pietra da spacco locale e carpenteria in legno strutturale",
            "Tetti a capanna a forte pendenza adatti al clima montano",
            "Camino circolare sospeso a 360° nel soggiorno a doppia altezza",
            "Ricco catalogo di 13 tavole con piante, prospetti e dettagli tecnici"
        ]
    },
    "location": {
        "fa": "رامسر، ارتفاعات جنگلی دالخانی",
        "en": "Dalkhani Forest Ridges, Ramsar",
        "ca": "Crestes de Dalkhani, Ramsar",
        "es": "Alturas de Dalkhani, Ramsar",
        "fr": "Crêtes de Dalkhani, Ramsar",
        "de": "Dalkhani Waldkamm, Ramsar",
        "it": "Boschi di Dalkhani, Ramsar"
    },
    "area": {
        "fa": "۶۲۰ متر مربع زیربنا در ۲ طبقه دوبلکس",
        "en": "620 m² Duplex Chalet",
        "ca": "620 m² en Xalet Dúplex",
        "es": "620 m² en Chalet Dúplex",
        "fr": "620 m² en Chalet Duplex",
        "de": "620 m² Wohnfläche über zwei Ebenen",
        "it": "620 m² Chalet Duplex su Due Piani"
    }
},
  'dalkhani-forest-organic': {
    "title": {
        "fa": "ویلای خاک و گِل ارگانیک دالخانی // پیوند فرم و جنگل",
        "en": "Dalkhani Forest Organic Clay Villa",
        "ca": "Vil·la Orgànica d'Argila al Bosc de Dalkhani",
        "es": "Villa Orgánica de Arcilla en el Bosque de Dalkhani",
        "fr": "Villa Organique en Terre & Argile à Dalkhani",
        "de": "Organische Lehmvilla im Dalkhani-Wald",
        "it": "Villa Organica in Terra Cruda nella Foresta di Dalkhani"
    },
    "concept": {
        "fa": "طراحی ویلای ارگانیک با فرم‌های منحنی الهام‌گرفته از تپه‌ها و درختان جنگل، استفاده از مصالح طبیعی کاهگل تثبیت‌شده و بتن خاکی، ایجاد حس پناهندگی در طبیعت و حذف زوایای تند به نفع جریان سیال فضایی.",
        "en": "Organic curvilinear villa architecture inspired by rolling forest mounds and tree canopy silhouettes, utilizing stabilized rammed earth, soil-pigmented concrete, curved lightwells, and eliminating sharp corners to achieve fluid spatial harmony with the forest.",
        "ca": "Arquitectura orgànica de línies corbes inspirades en el bosc, terra compactada, formigó amb pigments terrosos i eliminació d'angles rectes.",
        "es": "Diseño orgánico de formas curvas integradas en la naturaleza con tapial estabilizado, hormigón pigmentado y lucernarios cenitales continuos.",
        "fr": "Architecture organique fluide inspirée par les formes du vivant, utilisant la terre crue compactée et le béton teinté aux ocres locaux.",
        "de": "Organische Baukunst mit geschwungenen Erdformen, Stampflehmwänden, erdfarbenem Beton und schwellenlosem Raumkontinuum.",
        "it": "Architettura organica con linee sinuose immerse nel bosco, muri in terra battuta stabilizzata e grandi tagli di luce naturale."
    },
    "features": {
        "fa": [
            "فرم‌های منحنی سیال در نما و پلان داخلی با هندسه ارگانیک",
            "دیوارهای ضخیم عایق حرارتی از خاک کوبیده و مصالح پایدار",
            "نورگیرهای سقفی گرد جهت ورود نور ملایم روز به عمق فضا",
            "پکیج ۵ شیت شامل پرسپکتیوهای چشم‌نواز و جزئیات کالبدی"
        ],
        "en": [
            "Fluid curvilinear geometry across both exterior envelope and interior partitions",
            "Thick high-mass rammed earth walls providing superior passive climate control",
            "Circular oculus skylights channeling dappled forest daylight deep into interiors",
            "5-sheet design collection with atmospheric forest perspectives and sections"
        ],
        "ca": [
            "Geometria curvilínia fluida en envolupant i particions interiors",
            "Murs massissos de terra piconada per a estabilitat tèrmica passiva",
            "Obertures zenitals circulars que filtren la llum entre els arbres",
            "5 làmines amb renders atmosfèrics i seccions d'integració"
        ],
        "es": [
            "Geometría fluida y envolvente sin aristas vivas en toda la vivienda",
            "Muros de gran inercia térmica construidos en tapial estabilizado",
            "Lucernarios circulares en cubierta para captación de luz cenital",
            "Serie de 5 láminas con visualizaciones artísticas y cortes técnicos"
        ],
        "fr": [
            "Formes galbées continues en plan et en façade sans arêtes vives",
            "Murs épais en pisé offrant une excellente régulation hygrothermique",
            "Puits de lumière circulaires diffusant un éclairage naturel doux",
            "5 planches immersives mêlant coupes architecturales et modélisations CGI"
        ],
        "de": [
            "Fließende biomorphe Konturen im Fassaden- und Raumkonzept",
            "Massive Stampflehmwände für optimalen sommerlichen Wärmeschutz",
            "Kreisrunde Dachoberlichter für stimmungsvollen Lichteinfall",
            "5 Bildtafeln mit malerischen Waldansichten und Raumschnitten"
        ],
        "it": [
            "Volumetria curvilinea continua ispirata alla morfologia del suolo",
            "Spesse pareti in terra battuta ad altissima inerzia termica",
            "Lucernari zenitali circolari che catturano la luce del sottobosco",
            "5 tavole d'atmosfera con viste prospettiche ed elaborati grafici"
        ]
    },
    "location": {
        "fa": "دالخانی، مازندران",
        "en": "Dalkhani, Mazandaran",
        "ca": "Dalkhani, Mazandaran",
        "es": "Dalkhani, Mazandarán",
        "fr": "Dalkhani, Mazandaran",
        "de": "Dalkhani, Mazandaran",
        "it": "Dalkhani, Mazandaran"
    },
    "area": {
        "fa": "۴۸۰ متر مربع زیربنای همساز با اقلیم",
        "en": "480 m² Biophilic Residence",
        "ca": "480 m² d'Habitatge Biofílic",
        "es": "480 m² de Vivienda Biofílica",
        "fr": "480 m² d'Architecture Biophile",
        "de": "480 m² Biophiles Wohnhaus",
        "it": "480 m² di Residenza Biofilica"
    }
},
  'tehran-dasht-villa': {
    "title": {
        "fa": "ویلای تهراندشت و مدارک اجرایی استخر و سازه",
        "en": "Tehran Dasht Villa & Pool Construction Documentation",
        "ca": "Vil·la Tehran Dasht i Documentació Executiva de Piscina",
        "es": "Villa Tehran Dasht y Documentación Ejecutiva de Piscina",
        "fr": "Villa Tehran Dasht & Dossier d'Exécution Piscine",
        "de": "Tehran Dasht Villa & Ausführungsplanung Poolbereich",
        "it": "Villa Tehran Dasht & Documentazione Esecutiva Piscina"
    },
    "concept": {
        "fa": "طراحی ویلای ییلاقی در دشت تهراندشت با تمرکز بر بازشوهای حداکثری به سمت باغ و استخر، سایه‌اندازی‌های عریض با دال بتنی، طراحی سیستم تصفیه آب و گرمایش استخر چهارفصل و نقشه‌های دقیق فاز ۲ سازه و تاسیسات.",
        "en": "Weekend vacation villa in Tehran Dasht plain focusing on wide panoramic apertures opening towards the courtyard pool, cantilevered concrete shade canopies, four-season pool heating and filtration engineering, and comprehensive RIBA Stage 4 construction documents.",
        "ca": "Vil·la d'esbarjo a Tehran Dasht amb grans obertures cap a la piscina i el jardí, voladissos d'ombra de formigó i projecte executiu complet.",
        "es": "Villa de descanso en Tehran Dasht con grandes cristaleras al jardín, voladizos protectores de hormigón y proyecto ejecutivo de piscina y climatización.",
        "fr": "Villa de villégiature à Tehran Dasht largement ouverte sur le jardin et la piscine, avec auvents béton et dossier technique d'exécution.",
        "de": "Wochenendvilla in Tehran Dasht mit bodentiefen Fenstern zum Poolhof, auskragenden Betonsonnendächern und Werkplanung.",
        "it": "Villa di villeggiatura a Tehran Dasht con grandi aperture verso il solarium e la piscina, aggetti ombreggianti e disegni esecutivi completi."
    },
    "features": {
        "fa": [
            "طراحی استخر چهارفصل با سیستم گرمایش خورشیدی و موتورخانه مستقل",
            "دال‌های بتنی سایه‌انداز برای کنترل تابش شدید آفتاب تابستانی",
            "پلان‌های دقیق اندازه‌گذاری، وال‌سکشن‌ها و جزئیات نازک‌کاری",
            "پکیج ۴ شیت اجرایی شامل مدارک فنی و پرسپکتیوهای نهایی"
        ],
        "en": [
            "Four-season heated swimming pool with dedicated mechanical plant room",
            "Deep architectural concrete overhangs shading high summer solar rays",
            "Detailed dimensioned floor plans, technical wall sections, and finishes schedules",
            "Full 4-sheet construction documentation package with technical sections and 3D renders"
        ],
        "ca": [
            "Piscina climatitzada per a tot l'any amb sala de màquines independent",
            "Ràfecs de formigó que protegeixen del sol intens d'estiu",
            "Plànols de replanteig acotats, seccions constructives i memòria de qualitats",
            "4 làmines tècniques d'execució i visualitzacions finals"
        ],
        "es": [
            "Piscina climatizada cuatro estaciones con sala de filtración dedicada",
            "Vuelos de hormigón para protección solar estival pasiva",
            "Planos acotados de albañilería, secciones de fachada y carpintería",
            "Dossier de 4 láminas de planos ejecutivos y renders de entrega"
        ],
        "fr": [
            "Bassin de nage chauffé toute l'année avec local technique dédié",
            "Casquettes béton protégeant du rayonnement solaire estival",
            "Plans de pose cotés, coupes de principe sur façades et carnets de détails",
            "4 planches d'exécution technique et vues 3D photoréalistes"
        ],
        "de": [
            "Ganzjährig beheizter Pool mit eigenem Technikraum",
            "Großzügige Betonauskragungen als passiver sommerlicher Hitzeschutz",
            "Maßhaltige Werkpläne, Wanddetails und Baubeschreibung",
            "4-teiliges Ausführungsset mit technischen Schnitten und 3D-Bildern"
        ],
        "it": [
            "Piscina riscaldata utilizzabile in tutte le stagioni con vano impianti",
            "Aggetti in calcestruzzo per schermatura solare estiva passiva",
            "Tavole quotate, sezioni di parete e abaco dei materiali",
            "4 tavole esecutive complete con dettagli tecnici e render 3D"
        ]
    },
    "location": {
        "fa": "تهراندشت، استان البرز",
        "en": "Tehran Dasht, Alborz Province",
        "ca": "Tehran Dasht, Alborz",
        "es": "Tehran Dasht, Alborz",
        "fr": "Tehran Dasht, Alborz",
        "de": "Tehran Dasht, Alborz",
        "it": "Tehran Dasht, Alborz"
    },
    "area": {
        "fa": "۵۲۰ متر مربع زیربنا + استخر روباز",
        "en": "520 m² Villa + Outdoor Pool",
        "ca": "520 m² d'Habitatge + Piscina Exterior",
        "es": "520 m² de Vivienda + Piscina Exterior",
        "fr": "520 m² Habitable + Piscine Plein Air",
        "de": "520 m² Wohnfläche + Außenpool",
        "it": "520 m² Villa + Piscina Scoperta"
    }
},
  'australia-curved-residence': {
    "title": {
        "fa": "ویلای منحنی استرالیا و رزیدنس‌های ارگانیک",
        "en": "Curved Villa in Australia & Organic Residences",
        "ca": "Vil·la Corba a Austràlia i Residències Orgàniques",
        "es": "Villa Curva en Australia y Residencias Orgánicas",
        "fr": "Villa Courbe en Australie & Résidences Organiques",
        "de": "Geschwungene Villa in Australien & Organische Residenzen",
        "it": "Villa Curva in Australia & Residenze Organiche"
    },
    "concept": {
        "fa": "معماری ویلایی ساحلی با خطوط منحنی پیوسته، پوسته‌های سفید خمیده، بازشوهای وسیع به سوی اقیانوس، تلفیق المان‌های چوبی نرم با حجم‌های آیرودینامیک و طراحی پلان داخلی با تفکیک سیال زون‌های خصوصی و عمومی.",
        "en": "Coastal villa architecture driven by seamless serpentine ribbons, continuous double-curved white facade envelopes, panoramic oceanic window vistas, warm maritime timber louvers, and an open-concept interior layout harmonizing public entertainment with private sanctuaries.",
        "ca": "Vil·la costanera de façanes corbes blanques, grans vidrieres obertes cap a l'oceà, gelosies de fusta natural i distribució diàfana.",
        "es": "Vivienda costera con cintas continuas de fachada curva blanca, amplios miradores al océano y celosías de madera marina.",
        "fr": "Architecture balnéaire contemporaine aux parois ondulantes immaculées, larges baies face au large et claustras de bois chaleureux.",
        "de": "Küstenvilla mit fließend geschwungenen weißen Fassadenbändern, unverstelltem Meerblick und edlen Holzelementen.",
        "it": "Villa litoranea caratterizzata da nastri curvilinei bianchi, ampie vetrate sull'oceano e frangisole in legno marino."
    },
    "features": {
        "fa": [
            "پوسته منحنی دوتایی سفید با متریال‌های پیشرفته کامپوزیت",
            "دیدهای ۳۶۰ درجه به اقیانوس و پوشش گیاهی ساحلی",
            "طراحی داخلی مینیمال با پله‌های مارپیچ و خطوط سیال",
            "مجموعه چشمگیر ۷ شیت شامل نماها، مقاطع و پرسپکتیوهای داخلی و خارجی"
        ],
        "en": [
            "Double-curved fluid white envelope constructed with advanced solid-surface panels",
            "360-degree expansive viewing decks over coastal headlands and ocean horizon",
            "Minimalist interior featuring a sculptural floating spiral staircase",
            "Impressive 7-sheet set capturing exterior envelopes, interior CGI, and sectional dynamics"
        ],
        "ca": [
            "Envolupant doblement corba de superfícies blanques d'alta tecnologia",
            "Terrasses panoràmiques amb visuals 360° cap a l'horitzó marí",
            "Interiorisme minimalista amb escala helicoïdal escultural",
            "7 làmines completes amb vistes exteriors, interiors i seccions"
        ],
        "es": [
            "Fachada de doble curvatura acabada en paneles compuestos blancos",
            "Terrazas envolventes con vistas 360° hacia la costa y el mar",
            "Interior minimalista con escalera de caracol escultórica flotante",
            "Colección de 7 láminas con plantas fluidas, secciones y renders"
        ],
        "fr": [
            "Enveloppe à double courbure réalisée en panneaux composites blancs haute performance",
            "Plates-formes panoramiques offrant une vue à 360° sur le littoral océanique",
            "Aménagement intérieur minimaliste sublimé par un escalier hélicoïdal sculptural",
            "7 planches remarquables détaillant façades dynamiques et espaces de vie intérieurs"
        ],
        "de": [
            "Doppelt gekrümmte weiße Fassadenhülle aus modernem Verbundwerkstoff",
            "360-Grad Aussichtsterrassen mit weitem Blick über den Ozean",
            "Minimalistisches Interieur mit frei tragender skulpturaler Wendeltreppe",
            "Eindrucksvolle 7-Blatt-Serie mit Fassadenabwicklungen und Innenraumbildern"
        ],
        "it": [
            "Involucro a doppia curvatura in pannelli compositi bianchi senza giunti",
            "Terrazze a sbalzo con viste a 360 gradi sul paesaggio costiero",
            "Interni minimalisti dominati da una monumentale scala elicoidale",
            "7 tavole espositive con prospetti fluidi, sezioni e render d'interni"
        ]
    },
    "location": {
        "fa": "ساحل شرقی استرالیا (Sydney Coastal Area)",
        "en": "Sydney Coastal Headlands, Australia",
        "ca": "Costa de Sydney, Austràlia",
        "es": "Costa de Sídney, Australia",
        "fr": "Côte de Sydney, Australie",
        "de": "Sydney Küstenregion, Australien",
        "it": "Costa di Sydney, Australia"
    },
    "area": {
        "fa": "۹۵۰ متر مربع زیربنا در ۳ طبقه پیوسته",
        "en": "950 m² across 3 Flowing Levels",
        "ca": "950 m² en 3 Nivells Integrats",
        "es": "950 m² en 3 Niveles Continuos",
        "fr": "950 m² répartis sur 3 Niveaux Fluides",
        "de": "950 m² auf 3 fließenden Wohnebenen",
        "it": "950 m² distribuiti su 3 Livelli Continui"
    }
},
  'brutalist-cantilever-villa': {
    "title": {
        "fa": "ویلای بتنی بروتالیست با کنسول‌های معلق و خانه صخره‌ای",
        "en": "Brutalist Cantilever Concrete Villa & Cliff House",
        "ca": "Vil·la Brutalista de Formigó amb Grans Voladissos",
        "es": "Villa Brutalista de Hormigón con Grandes Voladizos",
        "fr": "Villa Brutaliste en Béton Brut & Maison de Falaise",
        "de": "Brutalistische Betonvilla mit Auskragung am Fels",
        "it": "Villa Brutalista in Cemento con Aggetti a Sbalzo"
    },
    "concept": {
        "fa": "معماری بروتالیست خالص با کنسول‌های بتنی عظیم معلق بر فراز صخره، خطوط صلب و قدرتمند، بتن تخته‌کوب نمایان (Board-formed concrete)، بازشوهای استراتژیک برای شکار مناظر و تضاد شاعرانه سنگینی بتن با سبکی پرواز روی دره.",
        "en": "Pure brutalist architectural expression featuring monumental reinforced concrete volumes cantilevering daringly over a rocky cliff face, board-formed textured concrete surfaces, deep-set picture windows, and the poetic tension between structural mass and gravity-defying suspension.",
        "ca": "Expressió brutalista amb volums de formigó armat en voladís sobre el penya-segat, textura de taula d'encofrat i finestrals profunds.",
        "es": "Arquitectura brutalista con potentes volúmenes de hormigón en voladizo sobre un acantilado, textura entablillada y ventanales abocinados.",
        "fr": "Manifeste brutaliste aux masses en béton banché projetées au-dessus du vide rocheux, baies profondes et lignes épurées.",
        "de": "Brutalistisches Bauwerk mit monumentalen Sichtbetonkragarmen über der Felskante und markanter Holzschalungsstruktur.",
        "it": "Architettura brutalista con imponenti volumi in calcestruzzo armato a sbalzo sulla rupe e finitura a doghe di legno."
    },
    "features": {
        "fa": [
            "کنسول‌های بتنی ۶ متری متکی به دیوارهای برشی مسلح",
            "بافت زبر بتن تخته‌کوب با الگوهای طبیعی گره‌های چوب",
            "تراس‌های معلق مشرف به دره با نرده‌های شیشه‌ای نامرئی",
            "مجموعه غنی ۹ شیت شامل مقاطع سازه‌ای، پلان‌ها و رندرهای هنری"
        ],
        "en": [
            "6-meter monumental concrete cantilevers anchored into bedrock shear walls",
            "Authentic board-formed tactile concrete texture displaying organic wood grain",
            "Suspended viewing cantilevers with invisible structural glass balustrades",
            "Rich 9-sheet set with structural calculations, sections, and dramatic CGI shots"
        ],
        "ca": [
            "Voladissos de 6 metres ancorats en murs de tall a la roca mare",
            "Acabat de formigó vist amb empremta de fusta natural",
            "Terrasses suspeses amb baranes de vidre estructural transparent",
            "9 làmines completes amb seccions de càlcul i perspectives esculturals"
        ],
        "es": [
            "Voladizos de 6 metros anclados directamente al lecho rocoso",
            "Hormigón visto con textura de tabla de encofrado artesanal",
            "Terrazas flotantes con barandillas de vidrio estructural continuo",
            "Colección de 9 láminas con secciones de detalle y perspectivas artísticas"
        ],
        "fr": [
            "Porte-à-faux en béton de 6 mètres ancrés directement dans la roche",
            "Texture soignée du béton coffré à la planche de bois véritable",
            "Terrasses suspendues équipées de garde-corps en verre invisible",
            "9 planches de haute tenue technique avec coupes structurales et vues CGI"
        ],
        "de": [
            "6 Meter weit auskragende Baukörper, rückverankert im Felsmassiv",
            "Echtholz-Schalungsstruktur mit spürbarer Haptik auf dem Sichtbeton",
            "Schwebende Balkone mit rahmenlosen Glasabsturzsicherungen",
            "Umfassende 9-Blatt-Dokumentation mit Tragschnitten und Renderings"
        ],
        "it": [
            "Sbalzi monolitici di 6 metri ancorati ai setti controterra nella roccia",
            "Faccia a vista con impronta naturale dei casseri lignei",
            "Terrazze panoramiche con parapetti in vetro stratificato invisibile",
            "9 tavole con sezioni di dettaglio, piante e suggestive viste notturne"
        ]
    },
    "location": {
        "fa": "صخره‌های کوهستانی دماوند",
        "en": "Damavand Cliff Escarpments",
        "ca": "Penya-segats de Damavand",
        "es": "Acantilados de Damavand",
        "fr": "Escarpements Rocheux de Damavand",
        "de": "Felsformationen Damavand",
        "it": "Rupi Montuose di Damavand"
    },
    "area": {
        "fa": "۷۴۰ متر مربع زیربنا با کنسول‌های معلق",
        "en": "740 m² Cliffside Residence",
        "ca": "740 m² d'Habitatge al Penya-segat",
        "es": "740 m² de Vivienda en Risco",
        "fr": "740 m² Suspendus sur la Falaise",
        "de": "740 m² Kragarmvilla am Steilhang",
        "it": "740 m² Residenza Sospesa sulla Parete Rocciosa"
    }
},
  'modern-villa-series': {
    "title": {
        "fa": "سری ویلاهای مدرن تیپولوژی ۰۱ تا ۰۵",
        "en": "Modern Villa Series Typology 01 to 05",
        "ca": "Sèrie de Viles Modernes Tipologia 01 a 05",
        "es": "Serie de Villas Modernas Tipología 01 a 05",
        "fr": "Série de Villas Contemporaines Typologies 01 à 05",
        "de": "Moderne Villenserie Typologie 01 bis 05",
        "it": "Serie di Ville Moderne Tipologia 01 a 05"
    },
    "concept": {
        "fa": "پروژه جامع مطالعات و طراحی ۵ تیپ ویلای مدرن برای زمین‌های با متراژ و ابعاد مختلف، ترکیب مکعب‌های پر و خالی، بازی نور و سایه با لوورهای متحرک و ارائه پکیج کامل نقشه‌های ساختمانی قابل انطباق.",
        "en": "Comprehensive architectural research and design portfolio spanning 5 distinct modern villa prototypes tailored to varying site sizes and aspect ratios, exploring solid-void cubist massing, dynamic operable solar louvers, and ready-to-build modular floor plan configurations.",
        "ca": "Recerca tipològica de 5 prototips de viles contemporànies per a diferents parcel·les, composició cúbica i proteccions solars.",
        "es": "Estudio tipológico de 5 prototipos de villas contemporáneas según dimensión de parcela, volumetría de llenos y vacíos y celosías móviles.",
        "fr": "Catalogue de 5 prototypes de villas modernes adaptés à différentes configurations parcellaires, jeux d'ombres et volumes cubistes.",
        "de": "Umfassende Typologiestudie mit 5 modernen Villenentwürfen für variable Grundstücksgrößen und Sonnenschutzsysteme.",
        "it": "Studio tipologico di 5 prototipi di ville contemporanee per diverse dimensioni di lotto con volumi cubici e brise-soleil."
    },
    "features": {
        "fa": [
            "۵ آلترناتیو طراحی مجزا متناسب با عرض و طول زمین‌های متفاوت",
            "مدولار بودن سازه و امکان شخصی‌سازی فضاهای داخلی",
            "بهینه‌سازی مصرف انرژی با سایه‌اندازهای هوشمند و تهویه طبیعی",
            "بزرگترین پکیج شیت‌ها شامل ۱۸ شیت جامع از تمامی نماها و رندرها"
        ],
        "en": [
            "5 independent design typologies accommodating diverse plot orientations and dimensions",
            "Modular structural grid allowing flexible internal partition customization",
            "Passive solar performance with dynamic louvers and natural stack ventilation",
            "Our largest comprehensive archive: 18 sheets covering every elevation, detail, and render"
        ],
        "ca": [
            "5 tipologies independents per a diferents mides i orientacions de parcel·la",
            "Modulació estructural que permet redistribuir fàcilment l'interior",
            "Estratègies bioclimàtiques passives amb ventilació creuada",
            "L'arxiu més extens amb 18 làmines completes de plànols i renders"
        ],
        "es": [
            "5 tipologías independientes según ancho y orientación de la parcela",
            "Retícula estructural modulada para máxima flexibilidad interior",
            "Eficiencia energética pasiva con ventilación natural y celosías",
            "El mayor dossier del estudio con 18 láminas con todas las fachadas y vistas"
        ],
        "fr": [
            "5 typologies distinctes s'adaptant à toutes orientations et géométries de parcelles",
            "Trame structurelle modulaire autorisant une totale souplesse d'aménagement intérieur",
            "Optimisation bioclimatique passive par ventilation traversante et brise-soleil",
            "Le plus vaste ensemble de présentation: 18 planches de plans, façades et rendus"
        ],
        "de": [
            "5 eigenständige Entwurfstypologien für unterschiedliche Grundstücksgrößen",
            "Modulares Tragwerksraster für anpassbare Grundrissgestaltung",
            "Passive Energieeinsparung durch Lamellen und Querlüftung",
            "Größte Einzelsammlung des Büros: 18 Tafeln mit allen Ansichten und Plänen"
        ],
        "it": [
            "5 tipologie indipendenti per lotti di varia metratura e orientamento",
            "Maglia strutturale modulare per flessibilità di partizione interna",
            "Prestazioni energetiche passive con schermature e ventilazione naturale",
            "Il portfolio più vasto con 18 tavole espositive complete di prospetti e render"
        ]
    },
    "location": {
        "fa": "سایت‌های متنوع ییلاقی و ساحلی",
        "en": "Various Suburban & Coastal Sites",
        "ca": "Emplaçaments Diversos",
        "es": "Emplazamientos Diversos",
        "fr": "Divers Sites Résidentiels & Côtiers",
        "de": "Verschiedene Standorte",
        "it": "Diversi Siti Residenziali e Costieri"
    },
    "area": {
        "fa": "۳۵۰ تا ۷۵۰ متر مربع در ۵ تیپ",
        "en": "350 m² to 750 m² across 5 Types",
        "ca": "350 a 750 m² en 5 Tipus",
        "es": "350 a 750 m² en 5 Tipologías",
        "fr": "350 à 750 m² sur 5 Modèles",
        "de": "350 bis 750 m² in 5 Typen",
        "it": "Da 350 a 750 m² su 5 Tipologie"
    }
},
  'east-tehran-steel-complex': {
    "title": {
        "fa": "مجتمع تجاری اسکلت فلزی شرق تهران و هاب لجستیک",
        "en": "East Tehran Steel Commercial Complex & Logistics Hub",
        "ca": "Complex Comercial d'Estructura d'Acer Teheran Est",
        "es": "Complejo Comercial de Estructura de Acero Teherán Este",
        "fr": "Complexe Commercial & Logistique en Acier de Téhéran Est",
        "de": "Gewerbekomplex Ost-Teheran & Stahlbau-Logistikhub",
        "it": "Complesso Commerciale in Acciaio e Polo Logistico Teheran Est"
    },
    "concept": {
        "fa": "طراحی مجتمع تجاری مقیاس بزرگ با دهانه‌های وسیع اسکلت فلزی، سیستم خرپاهای فضایی، نمای کامپوزیت مدرن صنعتی، خطوط توزیع بار، باراندازهای مکانیزه و دفاتر مدیریت مرکزی کسب‌وکار.",
        "en": "Large-scale commercial and logistics complex featuring long-span structural steel framing, space truss roof cantilevers, high-durability composite panel facade skins, mechanized logistics bays, and corporate executive headquarters.",
        "ca": "Gran complex comercial i logístic amb pòrtics d'acer de gran llum, façana composta d'alta resistència i molls de càrrega tecnificats.",
        "es": "Complejo comercial y logístico con estructura de acero de grandes luces, cerramiento compuesto industrial y muelles mecanizados.",
        "fr": "Grand ensemble tertiaire et logistique en charpente métallique grande portée, façades composites et quais automatisés.",
        "de": "Großflächiger Gewerbe- und Logistikkomplex in weitgespannter Stahlbauweise mit automatisierten Andockstationen.",
        "it": "Grande complesso commerciale e logistico in acciaio a grandi luci con pannellature composite e baie di carico automatizzate."
    },
    "features": {
        "fa": [
            "دهانه‌های بدون ستون ۲۴ متری با تیرورق‌های فولادی سنگین",
            "سیستم لجستیک و انبارداری با رمپ‌های استاندارد تریلی‌رو",
            "نمای مدرن اداری با شیشه‌های پیوسته کرتین‌وال آلومینیومی",
            "پکیج ۵ شیت شامل پلان‌های طبقات، مقاطع سازه و رندرهای هوایی"
        ],
        "en": [
            "24-meter column-free spans using heavy welded plate steel girders",
            "Industrial logistics circulation with heavy truck loading docks",
            "Sleek corporate administration facade with high-performance curtain walls",
            "5-sheet comprehensive set including warehouse plans, structural framing, and aerials"
        ],
        "ca": [
            "Llums sense pilars de 24 metres amb bigues armades d'acer",
            "Circulació de vehicles pesants amb molls de càrrega coberts",
            "Façana d'oficines amb mur cortina d'alumini d'alt aïllament",
            "5 làmines amb plànols de distribució, estructura i vistes aèries"
        ],
        "es": [
            "Vanos diáfanos de 24 metros mediante vigas armadas de acero",
            "Circuitos logísticos con muelles de atraque para camiones pesados",
            "Muro cortina continuo de aluminio en el bloque administrativo",
            "Dossier de 5 láminas con plantas operativas, estructura y vistas aéreas"
        ],
        "fr": [
            "Portées libres de 24 mètres sans appuis via poutres treillis en acier",
            "Plateforme logistique intégrant quais niveleurs et accès poids lourds",
            "Façade tertiaire moderne en mur-rideau d'aluminium et vitrage acoustique",
            "5 planches techniques avec plans de repérage, charpente et vues aériennes"
        ],
        "de": [
            "24 Meter stützenfreie Spannweiten mit geschweißten Stahlträgern",
            "Logistikterminals mit wettergeschützten Lkw-Überladebrücken",
            "Repräsentative Büro-Vorhangfassade mit hohem Schallschutz",
            "5 Blätter mit Grundrissen, Tragwerksplänen und Luftbildern"
        ],
        "it": [
            "Campate libere da 24 metri con travi composte in acciaio",
            "Zone di manovra e baie di carico per mezzi pesanti",
            "Facciata continua vetrata a montanti e traversi per gli uffici direzionali",
            "5 tavole complete con schemi funzionali, orditura strutturale e render"
        ]
    },
    "location": {
        "fa": "تهران، منطقه صنعتی و تجاری شرق",
        "en": "East Tehran Commercial Logistics District",
        "ca": "Polígon Comercial de Teheran Est",
        "es": "Distrito Comercial Teherán Este",
        "fr": "Zone Commerciale & Logistique de Téhéran Est",
        "de": "Gewerbezone Ost-Teheran",
        "it": "Distretto Commerciale Teheran Est"
    },
    "area": {
        "fa": "۳۲,۰۰۰ متر مربع زیربنا در سایت ۵ هکتاری",
        "en": "32,000 m² Built Area on a 5-Hectare Site",
        "ca": "32.000 m² en un Solar de 5 ha",
        "es": "32.000 m² en Parcela de 5 ha",
        "fr": "32 000 m² sur un Terrain de 5 Hectares",
        "de": "32.000 m² Nutzfläche auf 5-Hektar-Grundstück",
        "it": "32.000 m² su un Lotto di 5 Ettari"
    }
},
  'erbil-department-store': {
    "title": {
        "fa": "دپارتمنت استور و گالری تجاری اربیل // طاق‌های بتنی ارگانیک",
        "en": "Erbil Department Store & Galleria // Organic Vaults",
        "ca": "Grans Magatzems i Galeria Erbil // Voltes Orgàniques de Formigó",
        "es": "Grandes Almacenes y Galería Erbil // Bóvedas Orgánicas de Hormigón",
        "fr": "Grand Magasin & Galerie Erbil // Voûtes Organiques en Béton",
        "de": "Kaufhaus & Galleria Erbil // Organische Betongewölbe",
        "it": "Department Store & Galleria Erbil // Volte Organiche in Calcestruzzo"
    },
    "concept": {
        "fa": "طراحی دپارتمنت استور و مرکز خرید لوکس با طاق‌های قوسی بتنی ارگانیک، آتریوم مرکزی پرنور با سقف شیشه‌ای، ویدهای چندسطحی به هم پیوسته، پوسته‌های پارامتریک در نما و تلفیق تجربه خرید با رویدادهای فرهنگی.",
        "en": "Luxury multi-brand department store and retail galleria characterized by expressive organic concrete barrel arches, a soaring central skylit atrium, cascading multi-level mezzanine voids, parametric exterior shading lattices, and experiential lifestyle shopping spaces.",
        "ca": "Grans magatzems de luxe amb arcs de formigó orgànic, atri central amb lluerna de vidre i gelosia paramètrica de façana.",
        "es": "Grandes almacenes de lujo con bóvedas de hormigón escultórico, atrio central acristalado y celosías paramétricas de sombra.",
        "fr": "Galerie commerciale haut de gamme rythmée par des voûtes en béton sculptural, vaste atrium sous verrière et brise-soleil paramétrique.",
        "de": "Luxuskaufhaus mit skulpturalen Betongewölben, lichtdurchflutetem Zentralatrium und parametrischer Fassadengeometrie.",
        "it": "Galleria commerciale di lusso con volte in cemento organico, atrio monumentale a tutta altezza e frangisole parametrici."
    },
    "features": {
        "fa": [
            "طاق‌های قوسی بتنی یکپارچه با الهام از معماری بازارهای سنتی مشرق‌زمین",
            "آتریوم مرکزی ۵ طبقه با آسانسورهای شیشه‌ای پانورامیک",
            "پوسته نمای مشبک پارامتریک جهت کنترل نور خورشید و گرما",
            "پکیج ۵ شیت با مقاطع پرسپکتیو، پلان‌های جانمایی و رندرهای داخلی و خارجی"
        ],
        "en": [
            "Monolithic cast-in-place concrete arches evoking historic grand bazaar vaulted walkways",
            "5-story soaring skylit atrium featuring panoramic glass observation elevators",
            "Parametric solar-shading kinetic facade attenuating harsh regional desert heat",
            "5-sheet set with 3D cutaway sections, floor retail zoning, and interior CGI"
        ],
        "ca": [
            "Arcs de formigó continu que reinterpreten les voltes dels basars clàssics",
            "Atri de 5 plantes amb ascensors panoràmics de vidre",
            "Façana paramètrica que filtra la radiació solar i la calor",
            "5 làmines amb seccions tridimensionals i renders dels espais comercials"
        ],
        "es": [
            "Bóvedas continuas de hormigón visto inspiradas en los zocos tradicionales",
            "Atrio monumental de 5 alturas con ascensores panorámicos de vidrio",
            "Fachada paramétrica de control solar y protección térmica",
            "5 láminas con secciones fugadas, zonificación de tiendas y renders"
        ],
        "fr": [
            "Arcs continus en béton apparent revisitant les galeries voûtées d'Orient",
            "Atrium monumental sur 5 étages desservi par des ascenseurs de verre",
            "Façade paramétrique régulant l'ensoleillement et les surchauffes",
            "5 planches incluant écorchés perspectifs, plans de vente et vues 3D"
        ],
        "de": [
            "Monolithische Betongewölbe in Anlehnung an historische Basare",
            "5-geschossiges Atrium mit verglasten Panoramaaufzügen",
            "Parametrische Vorhangfassade zur Abschirmung starker Sonneneinstrahlung",
            "5 Blätter mit perspektivischen Schnittansichten und Retail-Konzepten"
        ],
        "it": [
            "Volte monolitiche in calcestruzzo ispirate all'architettura dei bazar storici",
            "Atrio centrale su 5 livelli con ascensori panoramici in cristallo",
            "Schermatura parametrica per il controllo della radiazione solare",
            "5 tavole con sezioni prospettiche, layout commerciale e render"
        ]
    },
    "location": {
        "fa": "اربیل، کردستان عراق (Erbil Commercial Avenue)",
        "en": "Erbil Commercial Avenue, Kurdistan",
        "ca": "Avinguda Comercial d'Erbil, Kurdistan",
        "es": "Avenida Comercial de Erbil, Kurdistán",
        "fr": "Avenue Commerciale d'Erbil, Kurdistan",
        "de": "Erbil Commercial Boulevard, Kurdistan",
        "it": "Viale Commerciale di Erbil, Kurdistan"
    },
    "area": {
        "fa": "۲۸,۰۰۰ متر مربع در ۵ طبقه تجاری",
        "en": "28,000 m² across 5 Commercial Levels",
        "ca": "28.000 m² en 5 Plantes Comercials",
        "es": "28.000 m² en 5 Niveles Comerciales",
        "fr": "28 000 m² sur 5 Niveaux de Boutiques",
        "de": "28.000 m² auf 5 Verkaufsebenen",
        "it": "28.000 m² su 5 Piani Commerciali"
    }
},
  'mid-high-rise-collection': {
    "title": {
        "fa": "کالکشن برج‌های مسکونی میان‌مرتبه و بلندمرتبه شهری",
        "en": "Mid & High-Rise Urban Residential & Mixed-Use Collection",
        "ca": "Col·lecció de Torres Residencials d'Alçada Mitjana i Alta",
        "es": "Colección de Torres Residenciales de Mediana y Gran Altura",
        "fr": "Collection de Tours Résidentielles Moyenne & Grande Hauteur",
        "de": "Wohnhochhaus-Kollektion // Mittlere & Hohe Dichte",
        "it": "Collezione di Torri Residenziali a Media e Alta Densità"
    },
    "concept": {
        "fa": "طراحی مجموعه‌ای از برج‌های آپارتمانی مسکونی و چندمنظوره برای بافت شهری متراکم با تراس‌های عمیق سبز، نمای مدولار پیش‌ساخته، لابی‌های مجلل با ارتفاع سقف دوبل و بهینه‌سازی دسترسی عمودی با آسانسورهای پرسرعت.",
        "en": "Portfolio of mid-to-high-rise multi-family residential towers tailored for dense urban fabrics, integrating stepped biophilic cantilever terraces, prefabricated modular facade systems, double-height grand arrival lobbies, and high-speed vertical transportation cores.",
        "ca": "Conjunt de torres d'habitatges plurifamiliars amb terrasses verdes en voladís, façana modular prefabricada i vestíbuls a doble alçada.",
        "es": "Edificios de viviendas en altura con terrazas ajardinadas, fachadas modulares prefabricadas y vestíbulos representativos de doble altura.",
        "fr": "Immeubles d'habitation de moyenne et grande hauteur avec loggias végétalisées, façades préfabriquées et halls d'accueil monumentaux.",
        "de": "Mehrgeschossige Wohnhochhäuser mit begrünten Balkonen, vorgehängter Elementfassade und doppelstöckigen Foyers.",
        "it": "Torri residenziali urbane con terrazzi verdi a sbalzo, facciate modulari prefabbricate e hall a doppia altezza."
    },
    "features": {
        "fa": [
            "تراس‌های سبز عمیق در تمام طبقات با سیستم آبیاری قطره‌ای اتوماتیک",
            "مدول‌های پیش‌ساخته نما با سرعت اجرای بالا و عایق‌بندی صوت و حرارت",
            "پلان‌های متنوع از آپارتمان‌های ۲ خوابه تا پنت‌هاوس‌های اختصاصی دوبلکس",
            "مجموعه ۶ شیت شامل تیپولوژی طبقات، نماها و جزئیات بالکن‌ها"
        ],
        "en": [
            "Deep biophilic balcony gardens on every floor equipped with automated drip irrigation",
            "Prefabricated modular facade cassettes ensuring rapid erection and acoustic attenuation",
            "Diverse unit layouts ranging from 2-bedroom suites to luxury double-height penthouses",
            "6-sheet presentation suite with typical floor plates, elevations, and balcony joinery"
        ],
        "ca": [
            "Balcons verds continus amb reg per degoteig automàtic integrat",
            "Mòduls de façana prefabricada de ràpida instal·lació i gran aïllament",
            "Distribució d'habitatges des de 2 dormitoris fins a àtics dúplex exclusius",
            "6 làmines tècniques amb plantes tipus, façanes i detalls de balconades"
        ],
        "es": [
            "Terrazas ajardinadas en todas las plantas con riego por goteo automatizado",
            "Fachada modular de paneles prefabricados de alto aislamiento acústico",
            "Plantas versátiles desde viviendas de 2 dormitorios hasta áticos dúplex",
            "6 láminas con plantas tipo, alzados y detalles constructivos de voladizos"
        ],
        "fr": [
            "Balcons filants végétalisés dotés d'un arrosage goutte-à-goutte automatisé",
            "Façades en modules préfabriqués garantissant isolation acoustique et rapidité de pose",
            "Typologies variées du 3-pièces aux somptueux penthouses en duplex",
            "6 planches complètes avec plans d'étages courants, façades et détails d'assemblage"
        ],
        "de": [
            "Tiefgezogene Pflanzbalkone mit automatischer Tröpfchenbewässerung",
            "Vorgefertigte Fassadenelemente für rasche Montage und hohen Schallschutz",
            "Grundrissvielfalt von 3-Zimmer-Wohnungen bis zu Luxus-Maisonette-Penthäusern",
            "6 Tafeln mit Regelgeschossen, Ansichten und Balkonanschlüssen"
        ],
        "it": [
            "Terrazze verdi a tutta facciata con impianto di microirrigazione",
            "Pannelli modulari prefabbricati ad elevata insonorizzazione",
            "Tagli alloggio flessibili dai trilocali agli attici padronali su due livelli",
            "6 tavole esplicative con piante di piano tipo, prospetti e nodi tecnici"
        ]
    },
    "location": {
        "fa": "تهران، مناطق ۱ و ۳ شهری",
        "en": "Districts 1 & 3 Urban Nodes, Tehran",
        "ca": "Zones Residencials Altes de Teheran",
        "es": "Zonas Residenciales Nobles de Teherán",
        "fr": "Quartiers Résidentiels Prisés de Téhéran",
        "de": "Zentrale Wohnlagen Teheran",
        "it": "Quartieri Pregiati di Teheran"
    },
    "area": {
        "fa": "۱۴,۰۰۰ تا ۲۵,۰۰۰ متر مربع در ۱۰ تا ۱۸ طبقه",
        "en": "14,000 to 25,000 m² across 10 to 18 Floors",
        "ca": "14.000 a 25.000 m² en 10 a 18 Plantes",
        "es": "14.000 a 25.000 m² en 10 a 18 Alturas",
        "fr": "14 000 à 25 000 m² sur 10 à 18 Niveaux",
        "de": "14.000 bis 25.000 m² in 10 bis 18 Etagen",
        "it": "Da 14.000 a 25.000 m² su 10-18 Piani"
    }
},
  'darrous-residential-facade': {
    "title": {
        "fa": "مهندسی نما و پوسته‌های مدرن آپارتمان مسکونی دروس",
        "en": "Darrous Residential Facade & Elevation Engineering",
        "ca": "Enginyeria de Façana de l'Edifici Residencial Darrous",
        "es": "Ingeniería de Fachada del Edificio Residencial Darrous",
        "fr": "Ingénierie de Façade Résidentielle Darrous",
        "de": "Fassaden-Engineering Wohngebäude Darrous",
        "it": "Ingegneria di Facciata Residenziale Darrous"
    },
    "concept": {
        "fa": "طراحی پیشرفته نما و پوسته‌های بیرونی آپارتمان مسکونی دروس با ترکیب سنگ تراورتن با فرزکاری سه‌بعدی، پنجره‌های عمیق قاب‌بندی‌شده آلومینیومی، لوورهای متحرک چوب و نورپردازی مخفی شبانه در هماهنگی با اقلیم تهران.",
        "en": "High-precision facade engineering for an upscale residential building in Darrous, marrying CNC-milled natural travertine, recessed thermally-broken aluminum frames, operable wooden solar shutters, and concealed nocturnal accent lighting.",
        "ca": "Enginyeria avançada de façana amb pedra travertí fresada, obertures abocinades d'alumini, persianes de fusta i il·luminació integrada.",
        "es": "Ingeniería de fachada con piedra travertino mecanizada, ventanales abocinados de aluminio con rotura de puente térmico y celosías de madera.",
        "fr": "Façade technique haut de gamme associant travertin taillé au millimètre, menuiseries aluminium encastrées et volets persiennés en bois.",
        "de": "Anspruchsvolle Fassadenplanung mit CNC-gefrästem Travertin, tief sitzenden Alufenstern und verstellbaren Holzlamellen.",
        "it": "Progettazione esecutiva di facciata con travertino lavorato, imbotti in alluminio a taglio termico e frangisole in legno."
    },
    "features": {
        "fa": [
            "جزئیات میلی‌متری اتصالات خشک نما بدون استفاده از ملات خیس",
            "پنجره‌های عمیق با سایه‌اندازی طبیعی در برابر آفتاب تابستان",
            "پوسته دوم متحرک جهت تنظیم میزان نور و حفظ حریم خصوصی",
            "مجموعه ۶ شیت شامل دیتیل‌های اجرایی اتصالات، برش‌ها و رندرها"
        ],
        "en": [
            "Millimeter-accurate ventilated rainscreen mechanical dry-hanging details",
            "Deep-set shadow reveal windows providing passive summer sun shading",
            "Operable secondary facade skin for glare modulation and occupant privacy",
            "6-sheet technical set with 1:10 and 1:20 joinery sections and photo CGI"
        ],
        "ca": [
            "Façana ventilada amb ancoratges mecànics d'acer inoxidable",
            "Buits profunds que ofereixen protecció solar natural",
            "Segona pell mòbil per al control de la intimitat i la llum",
            "6 làmines amb detalls constructius a escala 1:10 i 1:20"
        ],
        "es": [
            "Fachada ventilada con fijación mecánica oculta de precisión",
            "Huecos abocinados que proporcionan sombra pasiva en verano",
            "Segunda piel de celosías orientables para regular la privacidad",
            "Dossier de 6 láminas con secciones a escala 1:10 y detalles de anclaje"
        ],
        "fr": [
            "Bardage rapporté ventilé à fixation mécanique invisible sans pont thermique",
            "Ébrasements profonds générant un ombrage naturel efficace",
            "Double peau protectrice orientable préservant l'intimité des résidents",
            "6 planches détaillées comprenant carnets de détails au 1/10 et 1/20"
        ],
        "de": [
            "Hinterlüftete Natursteinfassade mit unsichtbaren Edelstahl-Hinterschnittankern",
            "Tief eingelassene Fensterleibungen für natürlichen Sonnenschutz",
            "Vorgelagerte Schiebelamellen zur Tageslichtlenkung und Privatsphäre",
            "6 Ausführungsblätter mit Detailschnitten in Maßstäben 1:10 und 1:20"
        ],
        "it": [
            "Facciata ventilata con agganci meccanici a scomparsa di precisione",
            "Spallette profonde per protezione solare passiva nei mesi caldi",
            "Schermatura scorrevole per la regolazione di luce e privacy",
            "6 tavole esecutive con nodi di raccordo in scala 1:10 e 1:20"
        ]
    },
    "location": {
        "fa": "تهران، منطقه ۳، محله دروس",
        "en": "Darrous Quarter, District 3, Tehran",
        "ca": "Barri de Darrous, Teheran",
        "es": "Barrio de Darrous, Teherán",
        "fr": "Quartier de Darrous, Téhéran",
        "de": "Darrous-Viertel, Teheran",
        "it": "Quartiere Darrous, Teheran"
    },
    "area": {
        "fa": "۳,۵۰۰ متر مربع زیربنا در ۶ طبقه مسکونی",
        "en": "3,500 m² across 6 Residential Levels",
        "ca": "3.500 m² en 6 Plantes",
        "es": "3.500 m² en 6 Plantas",
        "fr": "3 500 m² sur 6 Niveaux",
        "de": "3.500 m² auf 6 Wohngeschossen",
        "it": "3.500 m² su 6 Piani Residenziali"
    }
},
  'dalkhani-terraces': {
    "title": {
        "fa": "آپارتمان‌های پلکانی دالخانی // همنشینی با شیب کوهستان",
        "en": "Residential Dalkhani Terraces // Mountain Slope Apartments",
        "ca": "Apartaments Esglaonats Dalkhani // Integració en el Pendent",
        "es": "Apartamentos Escalonados Dalkhani // En Ladera de Montaña",
        "fr": "Résidences en Terrasses de Dalkhani // Habitat en Pente",
        "de": "Terrassenwohnanlage Dalkhani // Wohnen am Berghang",
        "it": "Appartamenti a Terrazza Dalkhani // Incastonati nel Pendio"
    },
    "concept": {
        "fa": "مجتمع آپارتمانی پلکانی مسکونی روی شیب تند جنگلی دالخانی، به گونه‌ای که بام هر واحد مسکونی به عنوان حیاط و تراس خصوصی سبز واحد بالایی عمل می‌کند، ایجاد دید پانورامای بدون مانع به دره و اقیانوس ابر.",
        "en": "Stepped hillside residential terrace complex perched on Dalkhani's forest slopes, engineered where the reinforced green roof of each residence serves as the landscaped private garden terrace of the home above, capturing unobstructed views over the mountain cloud sea.",
        "ca": "Complex residencial esglaonat on la coberta vegetal de cada habitatge és la terrassa enjardinada del pis superior amb vistes a la vall.",
        "es": "Conjunto residencial escalonado donde la azotea de cada vivienda es la terraza jardín del nivel superior con vistas al valle.",
        "fr": "Ensemble d'appartements en gradins où chaque toiture terrasse végétalisée forme le jardin suspendu du logement supérieur.",
        "de": "Terrassierte Hangwohnanlage, bei der das bepflanzte Dach jeder Einheit als private Gartenterrasse der darüberliegenden dient.",
        "it": "Complesso residenziale a gradoni dove il tetto verde di ogni unità costituisce il giardino pensile privato di quella superiore."
    },
    "features": {
        "fa": [
            "بام‌های سبز سنگین با قابلیت پیاده‌روی و کاشت درختچه‌های محلی",
            "دسترسی عمودی آسان با آسانسور شیب‌رو (Incline Elevator)",
            "حفظ حداکثری درختان کهنسال جنگلی موجود در بستر پروژه",
            "مجموعه ۵ شیت شامل سایت‌پلان مقطعی، پلان‌های تیپ و رندرهای چشم‌نواز"
        ],
        "en": [
            "Heavy-load intensive green roofs accommodating pedestrian access and native shrub planting",
            "Effortless hillside vertical mobility via an integrated inclined funicular elevator",
            "Tree preservation survey protecting mature old-growth forest specimens on site",
            "5-sheet package featuring stepped cross-sections, terrace floor plans, and aerials"
        ],
        "ca": [
            "Cobertes verdes transitables amb arbustos i plantes autòctones",
            "Mobilitat accessible mitjançant ascensor inclinat integrat",
            "Conservació dels arbres madurs existents a la parcel·la",
            "5 làmines amb perfils topogràfics, plantes de terrasses i renders"
        ],
        "es": [
            "Cubiertas ajardinadas transitables con vegetación autóctona",
            "Ascensor inclinado que salva el desnivel de la montaña",
            "Respeto y conservación del arbolado forestal centenario existente",
            "Dossier de 5 láminas con perfiles de ladera, plantas y perspectivas"
        ],
        "fr": [
            "Toitures-terrasses accessibles végétalisées plantées d'essences locales",
            "Ascenseur incliné facilitant l'accès piéton sur la totalité du dénivelé",
            "Préservation intégrale des arbres remarquables existants",
            "5 planches comprenant profils altimétriques, plans et vues plongeantes"
        ],
        "de": [
            "Begehbare intensiv begrünte Terrassendächer mit heimischen Gehölzen",
            "Barrierefreie Erschließung durch integrierten Schrägaufzug am Hang",
            "Erhalt des schützenswerten alten Baumbestandes auf dem Grundstück",
            "5 Planungsblätter mit Hangschnitten, Terrassengrundrissen und Luftbildern"
        ],
        "it": [
            "Tetti verdi praticabili allestiti con arbusti e specie autoctone",
            "Ascensore inclinato panoramico per un comodo collegamento verticale",
            "Piena salvaguardia degli alberi secolari presenti nel sito",
            "5 tavole con sezioni topografiche, layout delle terrazze e viste aeree"
        ]
    },
    "location": {
        "fa": "دالخانی، رامسر",
        "en": "Dalkhani Mountain Heights, Ramsar",
        "ca": "Muntanyes de Dalkhani, Ramsar",
        "es": "Alturas de Dalkhani, Ramsar",
        "fr": "Hauteurs de Dalkhani, Ramsar",
        "de": "Dalkhani Berghöhen, Ramsar",
        "it": "Alture di Dalkhani, Ramsar"
    },
    "area": {
        "fa": "۴,۲۰۰ متر مربع زیربنا در ۶ پله کالبدی",
        "en": "4,200 m² across 6 Stepped Terraces",
        "ca": "4.200 m² en 6 Graons Terrassats",
        "es": "4.200 m² en 6 Niveles Escalonados",
        "fr": "4 200 m² sur 6 Niveaux de Terrasses",
        "de": "4.200 m² über 6 gestufte Terrassenebenen",
        "it": "4.200 m² su 6 Terrazzamenti Gradonati"
    }
},
  'kitchen-design-appliances': {
    "title": {
        "fa": "طراحی داخلی آشپزخانه‌های لوکس، جزایر و دیتیل‌های درودگری",
        "en": "Bespoke Luxury Kitchen Design & Millwork Detailing",
        "ca": "Cuines de Disseny a Mida, Illes i Fusteria Exclusiva",
        "es": "Cocinas de Diseño a Medida, Islas y Carpintería Exclusiva",
        "fr": "Cuisines Haut de Gamme sur Mesure & Ébénisterie de Détail",
        "de": "Bespoke Luxusküchendesign, Kochinseln & Detailtischlerei",
        "it": "Cucine di Lusso su Misura, Isole e Falegnameria di Dettaglio"
    },
    "concept": {
        "fa": "طراحی جزئیات فنی و نازک‌کاری آشپزخانه‌های لوکس مدرن با جزایر سنگی یکپارچه، کابینت‌های بدون دستگیره با مکانیزم‌های پنهان، جانمایی تجهیزات توکار پیشرفته و نقشه‌های اجرایی ساخت درودگری در مقیاس ۱:۱۰.",
        "en": "Bespoke luxury kitchen architecture and joinery detailing featuring monolithic sintered stone waterfall islands, handleless cabinetry with soft-close concealed hardware, integrated European luxury appliances, and millwork shop drawings at 1:10 scale.",
        "ca": "Disseny de cuines contemporànies amb illes monolítiques de pedra, mobles sense tiradors, electrodomèstics integrats i plànols de fusteria 1:10.",
        "es": "Cocinas de alta gama con islas de piedra continua, armarios gola sin tirador, electrodomésticos integrados y planos de taller 1:10.",
        "fr": "Agencement de cuisines de prestige avec îlots en pierre frittée, façades sans poignée, électroménager affleurant et plans de fabrication au 1/10.",
        "de": "Maßgefertigte Luxusküchen mit monolithischen Steininseln, grifflosen Fronten, verdeckten Beschlägen und Werkstattplänen 1:10.",
        "it": "Cucine di alta sartoria con isole monolitiche in pietra, ante a gola, elettrodomestici a filo e disegni di falegnameria in scala 1:10."
    },
    "features": {
        "fa": [
            "جزیره آشپزخانه معلق از جنس سنگ طبیعی با سیستم بار صبحانه‌خوری",
            "کابینت‌های کف تا سقف چوب گردو و رنگ پلی‌اورتان مات ضدخش",
            "نورپردازی خطی پنهان زیر کابینت‌ها و داخل کشوها با سنسور حرکتی",
            "پکیج ۵ شیت شامل نقشه‌های دقیق اتصالات، برش‌های طولی و رندرهای نزدیک"
        ],
        "en": [
            "Cantilevered natural stone waterfall island integrating an informal breakfast bar",
            "Floor-to-ceiling American walnut veneer cabinetry with matte scratch-resistant lacquer",
            "Concealed LED light strips beneath counters and inside drawers with motion sensors",
            "5-sheet fabrication package detailing 1:10 joinery sections and close-up CGI textures"
        ],
        "ca": [
            "Illa en voladís de pedra natural amb barra d'esmorzar integrada",
            "Mobles de terra a sostre en fusta de noguera i laca mat resistent",
            "Il·luminació LED integrada sota mobles i dins de calaixos amb sensors",
            "5 làmines amb detalls de muntatge 1:10 i renders d'alta definició"
        ],
        "es": [
            "Isla flotante en piedra natural con barra de desayuno integrada",
            "Armarios de suelo a techo en nogal natural y lacado mate antiarañazos",
            "Tiras LED ocultas bajo encimeras y en cajoneras con sensor de presencia",
            "Dossier de 5 láminas con secciones de despiece 1:10 y texturas CGI"
        ],
        "fr": [
            "Îlot en cascade en pierre naturelle avec comptoir repas convivial",
            "Placards toute hauteur en noyer véritable et laque mate anti-traces",
            "Réglettes LED encastrées sous les plans de travail et dans les tiroirs",
            "5 planches d'exécution détaillant coupes d'ébénisterie et gros plans 3D"
        ],
        "de": [
            "Kragarm-Kücheninsel aus Naturstein mit integrierter Frühstücksbar",
            "Raumhohe Schränke in amerikanischem Nussbaum und mattem Polyurethanlack",
            "Verdeckte LED-Lichtbänder unter Arbeitsplatten und in Auszügen mit Sensor",
            "5 Fertigungsblätter mit 1:10-Schnittdetails und Materialnahaufnahmen"
        ],
        "it": [
            "Isola a sbalzo in pietra naturale con bancone snack integrato",
            "Colonne a tutta altezza in noce canaletto e laccatura opaca antigraffio",
            "Linee LED integrate sotto top e nei cassetti con sensori di movimento",
            "5 tavole esecutive con sezioni di falegnameria 1:10 e render materici"
        ]
    },
    "location": {
        "fa": "پروژه‌های مسکونی لوکس تهران و بارسلون",
        "en": "Luxury Residences, Tehran & Barcelona",
        "ca": "Residències de Luxe, Teheran i Barcelona",
        "es": "Residencias de Lujo, Teherán y Barcelona",
        "fr": "Résidences Haut de Gamme, Téhéran & Barcelone",
        "de": "Luxusresidenzen Teheran & Barcelona",
        "it": "Residenze di Pregio a Teheran e Barcellona"
    },
    "area": {
        "fa": "مجموعه طراحی بیش از ۲۰ آشپزخانه سفارشی",
        "en": "Portfolio of 20+ Custom Luxury Kitchens",
        "ca": "Col·lecció de Més de 20 Cuines a Mida",
        "es": "Catálogo de Más de 20 Cocinas a Medida",
        "fr": "Collection de Plus de 20 Cuisines d'Exception",
        "de": "Katalog von über 20 maßgefertigten Küchen",
        "it": "Selezione di Oltre 20 Cucine su Misura"
    }
},
  'living-lounge-interiors': {
    "title": {
        "fa": "نشیمن، سالن پذیرایی، پنت‌هاوس و وال‌کلازت اختصاصی",
        "en": "Living Lounge, Penthouse & Bespoke TV-Wall Interiors",
        "ca": "Salons Lounge, Àtics de Disseny i Panells TV a Mida",
        "es": "Salones Lounge, Áticos de Diseño y Paneles TV a Medida",
        "fr": "Salons de Réception, Penthouses & Parois TV sur Mesure",
        "de": "Wohnsalons, Penthouse-Lounges & Bespoke TV-Wände",
        "it": "Salotti di Pregio, Attici e Pareti Attrezzate TV su Misura"
    },
    "concept": {
        "fa": "طراحی فضاهای نشیمن و سالن‌های پذیرایی مجلل با مبلمان توکار سفارشی، وال‌تی‌وی با ترکیب سنگ مرمر اسلب و چوب‌های شیاردار آکوستیک، شومینه‌های اتانولی مدرن و سناریوهای نورپردازی هوشمند متناسب با سبک زندگی معاصر.",
        "en": "Luxury living rooms and penthouse salons featuring custom integrated millwork, statement TV feature walls merging bookmatched marble slabs with fluted acoustic timber paneling, sleek bioethanol fireplaces, and smart architectural ambient lighting scenes.",
        "ca": "Salons elegants i àtics de luxe amb fusteria integrada, panells de TV en marbre simètric i fusta acústica, llar de foc de bioetanol i il·luminació intel·ligent.",
        "es": "Espacios de estar y áticos exclusivos con carpintería integrada, paredes de TV en mármol a libro y palillería acústica, chimeneas de bioetanol y luz domótica.",
        "fr": "Salons de réception et penthouses raffinés associant boiseries sur mesure, parois TV en marbre livre-ouvert et tasseaux acoustiques, avec cheminée bioéthanol.",
        "de": "Elegante Wohnzimmer und Penthouse-Salons mit Wandpaneelen aus gespiegeltem Marmor, Akustik-Holzlamellen, Bioethanol-Kaminen und Smart-Lighting.",
        "it": "Saloni padronali e attici con boiserie su misura, pareti TV in marmo a macchia aperta e listelli acustici, camini a bioetanolo e domotica."
    },
    "features": {
        "fa": [
            "وال‌کلازت و وال‌تی‌وی با اسلب‌های مرمر بوک‌مچ و نورپردازی بک‌لایت",
            "پنل‌های چوبی آکوستیک شیاردار برای کاهش پژواک صوت در نشیمن‌های بزرگ",
            "شومینه‌های خطی بدون دود با شعله‌های رقصان اتانول",
            "مجموعه ۶ شیت شامل پلان‌های چیدمان مبلمان، دیتیل‌های وال‌سکشن و رندرهای شب"
        ],
        "en": [
            "Feature TV walls showcasing bookmatched marble slabs and warm perimeter backlighting",
            "Fluted acoustic wooden wall slats reducing reverberation in expansive salons",
            "Linear ventless bioethanol fireplaces offering clean contemporary warmth",
            "6-sheet documentation set with furniture layout, joinery sections, and night renders"
        ],
        "ca": [
            "Panells de TV amb marbre simètric i retroil·luminació perimetral",
            "Revestiments acústics de lamel·les de fusta per a reducció del ressò",
            "Llar de foc lineal sense fums de bioetanol d'alta eficiència",
            "6 làmines amb plànols de mobiliari, seccions de detall i escenes nocturnes"
        ],
        "es": [
            "Frentes de salón con mármol a libro y retroiluminación perimetral cálida",
            "Panelado acústico de palillería de madera para control de reverberación",
            "Chimeneas lineales de bioetanol de llama limpia sin tiro de humos",
            "6 láminas completas con planos de distribución, detalles de alzado y renders"
        ],
        "fr": [
            "Habillages TV spectaculaires en marbre livre-ouvert et rétroéclairage d'ambiance",
            "Panneaux muraux rainurés à propriétés d'absorption acoustique",
            "Foyers linéaires au bioéthanol sans conduit pour un confort contemporain",
            "6 planches comprenant plans d'aménagement, élévations d'ébénisterie et ambiances de nuit"
        ],
        "de": [
            "Akzentwände mit spiegelbildlich verlegtem Marmor und indirekter LED-Kante",
            "Gefräste Holzlamellen-Akustikpaneele zur Nachhalloptimierung",
            "Abzugsfreie lineare Bioethanol-Kamine mit atmosphärischem Flammenspiel",
            "6 Ausarbeitungsblätter mit Möblierungsplänen, Wandabwicklungen und Nachtlicht"
        ],
        "it": [
            "Pareti TV scenografiche in marmo a macchia aperta con retroilluminazione LED",
            "Listelli in legno fonoassorbente per il massimo comfort acustico",
            "Biocamini lineari da incasso a fiamma continua senza canna fumaria",
            "6 tavole esplicative con layout d'arredo, sezioni esecutive e render"
        ]
    },
    "location": {
        "fa": "پنت‌هاوس‌ها و ویلاهای فرمانیه و بارسلون",
        "en": "Farmanieh Penthouses & Barcelona Living",
        "ca": "Àtics a Farmanieh i Barcelona",
        "es": "Áticos en Farmanieh y Barcelona",
        "fr": "Penthouses à Farmanieh & Barcelone",
        "de": "Penthäuser in Farmanieh & Barcelona",
        "it": "Attici a Farmanieh e Barcellona"
    },
    "area": {
        "fa": "بیش از ۱۵ سالن پذیرایی و نشیمن اختصاصی",
        "en": "15+ Bespoke Luxury Living Salons",
        "ca": "Més de 15 Salons de Disseny",
        "es": "Más de 15 Salones de Diseño Exclusivo",
        "fr": "Plus de 15 Salons de Réception sur Mesure",
        "de": "Über 15 maßgeplante Wohnsalons",
        "it": "Oltre 15 Salotti e Living di Prestigio"
    }
},
  'master-suites-closets': {
    "title": {
        "fa": "سوئیت‌های مستر، کلوزت‌روم‌ها و دیتیل‌های اتصالات",
        "en": "Master Suites, Walk-in Closets & Millwork Details",
        "ca": "Suites Principals, Vestidors i Detalls de Fusteria",
        "es": "Suites Principales, Vestidores y Detalles de Carpintería",
        "fr": "Suites Parentales, Dressings & Détails d'Agencement",
        "de": "Master-Suiten, Walk-in Closets & Tischlerdetails",
        "it": "Master Suite, Cabine Armadio e Falegnameria d'Interni"
    },
    "concept": {
        "fa": "طراحی اتاق‌های خواب مستر و کلوزت‌روم‌های واک‌این با درهای شیشه‌ای فریم‌لس آلومینیومی، قفسه‌بندی مدولار چرم و چوب، نورپردازی اتوماتیک داخلی کمدها، طراحی حمام‌های مستر با وان‌های جزیره‌ای و جزییات درودگری اجرایی.",
        "en": "Comprehensive master bedroom suite architecture and custom walk-in dressing rooms featuring anodized slim-profile glass showcase wardrobes, leather-wrapped shelving, integrated interior LED motion illumination, and spa-inspired ensuite bathrooms with freestanding bathtubs.",
        "ca": "Suites de dormitori principal i vestidors amb armaris de vidre anoditzat, prestatgeries de pell i fusta, il·luminació automàtica i banys tipus spa.",
        "es": "Suites principales y vestidores a medida con puertas de vidrio y aluminio, estantes tapizados en piel, luz interior automática y baños spa.",
        "fr": "Suites parentales et dressings haut de gamme avec vitrines en verre teinté et profilés fins, étagères gainées de cuir et salles de bains spa attenantes.",
        "de": "Master-Schlafsuiten und begehbare Kleiderschränke mit eloxierten Glasvitrinen, lederbezogenen Tablaren, automatischer LED-Beleuchtung und Spa-Bädern.",
        "it": "Master suite e cabine armadio con ante in cristallo fumé e alluminio anodizzato, ripiani rivestiti in pelle e bagni padronali stile spa."
    },
    "features": {
        "fa": [
            "کمدهای شیشه‌ای دودی با فریم‌های آلومینیومی فوق‌باریک و یراق‌آلات بلوم",
            "کشوهای اختصاصی نگهداری ساعت و جواهرات با روکش مخمل و نور مستقیم",
            "وان‌های آزاد جزیره‌ای با شیرآلات توکار مدرن مات در حمام مستر",
            "پکیج ۵ شیت شامل نقشه‌های نجاری ۱:۲۰، مقاطع کمدها و رندرهای باکیفیت"
        ],
        "en": [
            "Smoked glass wardrobe vitrines with ultra-slim anodized profiles and Blum hardware",
            "Custom jewelry and timepiece pull-out organizer trays lined in velvet with micro-LEDs",
            "Freestanding sculptural soaking tubs with floor-mounted matte black fixtures in master spas",
            "5-sheet millwork fabrication package detailing 1:20 joinery sections and interior renders"
        ],
        "ca": [
            "Vitrines de vidre fumat amb perfils d'alumini ultrafins i ferratges alemanys",
            "Calaixts especials per a joies i rellotges entapissats amb vellut i micro-LEDs",
            "Banyeres exemptes esculturals amb aixetes encastades al bany principal",
            "5 làmines de fusteria amb seccions 1:20 i vistes interiors d'alta qualitat"
        ],
        "es": [
            "Armarios de cristal ahumado con perfilería oculta y herrajes de alta gama",
            "Cajoneras compartimentadas para joyas y relojería con iluminación interior",
            "Bañeras exentas esculturales con grifería mural empotrada de diseño",
            "5 láminas con secciones de carpintería 1:20 y visualizaciones fotorrealistas"
        ],
        "fr": [
            "Armoires vitrées en verre fumé avec profils invisibles et quincaillerie haut de gamme",
            "Tiroirs organiseurs pour horlogerie et bijoux doublés de velours rétroéclairé",
            "Baignoires îlots sculpturales avec robinetterie murale encastrée noir mat",
            "5 planches d'exécution pour menuiseries d'intérieur et élévations cotées"
        ],
        "de": [
            "Rauchglas-Garderoben mit filigranen eloxierten Profilen und Blum-Beschlägen",
            "Samtausgeschlagene Schmuck- und Uhrenauszüge mit integrierten Micro-LEDs",
            "Freistehende Design-Badewannen mit bodenstehenden mattschwarzen Armaturen",
            "5 Fertigungsblätter mit 1:20 Tischlerdetails und fotorealistischen Renderings"
        ],
        "it": [
            "Armadiature vetrate con profili minimi in alluminio e chiusure ammortizzate",
            "Cassettiere porta orologi e gioielli rivestite in velluto con micro faretti",
            "Vasche da bagno freestanding con rubinetteria incassata a parete",
            "5 tavole esecutive di falegnameria con sezioni in scala 1:20 e render"
        ]
    },
    "location": {
        "fa": "ویلاها و آپارتمان‌های لوکس بارسلون و تهران",
        "en": "Luxury Villas & Estates, Barcelona & Tehran",
        "ca": "Vil·les i Àtics de Luxe, Barcelona i Teheran",
        "es": "Villas y Áticos de Lujo, Barcelona y Teherán",
        "fr": "Villas & Penthouses de Prestige, Barcelone & Téhéran",
        "de": "Villen und Luxusresidenzen, Barcelona & Teheran",
        "it": "Ville e Dimore di Prestigio a Barcellona e Teheran"
    },
    "area": {
        "fa": "بیش از ۲۵ سوئیت مستر و کلوزت‌روم اجراشده",
        "en": "25+ Executed Master Suites & Walk-in Closets",
        "ca": "Més de 25 Suites i Vestidors Realitzats",
        "es": "Más de 25 Suites y Vestidores Ejecutados",
        "fr": "Plus de 25 Suites & Dressings d'Exception Réalisés",
        "de": "Über 25 realisierte Master-Suiten und Ankleidezimmer",
        "it": "Oltre 25 Master Suite e Cabine Armadio Realizzate"
    }
},
  'restaurants-hospitality': {
    "title": {
        "fa": "معماری و طراحی داخلی رستوران‌ها، کافه‌ها و فضاهای اقامتی",
        "en": "Restaurants, Cafes & Hospitality Architecture",
        "ca": "Restaurants, Cafeteries i Espais d'Hostaleria",
        "es": "Restaurantes, Cafeterías y Espacios de Hostelería",
        "fr": "Restaurants, Cafés & Espaces d'Hôtellerie",
        "de": "Restaurants, Cafés & Hospitality-Architektur",
        "it": "Ristoranti, Caffetterie e Architettura dell'Ospitalità"
    },
    "concept": {
        "fa": "طراحی فضاهای پذیرایی و هاسپیتالیتی با تجربه حسی غنی، چیدمان مبلمان متناسب با حریم‌های اجتماعی، کانترهای بار با متریال‌های شاخص، آکوستیک دقیق محیط و سناریوهای نورپردازی دراماتیک برای جذب مخاطب و افزایش ماندگاری مشتری.",
        "en": "Experiential hospitality architecture for dining and social venues, choreographing intimate and social seating zones, sculptural statement bar counters, engineered spatial acoustics, and evocative theatrical lighting designed to heighten the culinary journey.",
        "ca": "Disseny d'espais de restauració amb barres esculturals, condicionament acústic de màxim confort i il·luminació escènica que crea experiència de client.",
        "es": "Arquitectura de restauración y hostelería con barras escultóricas, control acústico ambiental e iluminación teatral que potencia la experiencia gastronómica.",
        "fr": "Aménagement d'espaces de restauration et d'hôtellerie combinant bars monumentaux, confort acoustique maîtrisé et éclairage théâtral immersif.",
        "de": "Gastronomie- und Hospitality-Architektur mit skulpturalen Bartheken, raumakustischer Optimierung und dramatischer Lichtinszenierung.",
        "it": "Architettura di locali per la ristorazione con banconi scultorei, comfort acustico avanzato e illuminazione scenografica immersiva."
    },
    "features": {
        "fa": [
            "کانترهای بار سنگی یکپارچه با جزئیات نورپردازی مخفی زیرپایی",
            "سقف‌های آکوستیک با متریال‌های طبیعی جاذب صوت",
            "تفکیک فضاهای VIP از سالن عمومی با پارتیشن‌های مشبک برنجی و چوبی",
            "مجموعه ۶ شیت شامل پلان‌های چیدمان میزها، جزئیات کانتر بار و رندرهای فضا"
        ],
        "en": [
            "Monolithic stone front bar counters with integrated footrest backlighting",
            "Engineered acoustic ceilings utilizing natural textured sound-dampening materials",
            "Private VIP dining alcoves screened by artisanal brass and wood fretwork screens",
            "6-sheet presentation suite with dining layouts, bar detailing, and atmosphere CGI"
        ],
        "ca": [
            "Barres de pedra contínua amb il·luminació inferior integrada",
            "Sostres acústics de materials naturals que redueixen el soroll ambiental",
            "Zones VIP privades delimitades per gelosies de llautó i fusta",
            "6 làmines amb plànols de distribució de taules, barres i renders"
        ],
        "es": [
            "Barras de piedra de una sola pieza con iluminación indirecta perimetral",
            "Techos acústicos fonoabsorbentes con texturas de madera y fibras naturales",
            "Reservados VIP diferenciados mediante celosías decorativas de latón",
            "6 làminas con planos de capacidad, despiece de barra y visualizaciones 3D"
        ],
        "fr": [
            "Comptoirs de bar en pierre massive avec rétroéclairage encastré au socle",
            "Plafonds acoustiques en matériaux biosourcés absorbant les réverbérations",
            "Salons VIP intimes séparés par des moucharabiehs contemporains en laiton",
            "6 planches comprenant plans de salle, détails de bar et modélisations immersives"
        ],
        "de": [
            "Monolithische Bartheken aus Naturstein mit Sockelbeleuchtung",
            "Schallschluckende Deckenpaneele aus natürlichen Verbundwerkstoffen",
            "Abgetrennte VIP-Lounges mit handgefertigten Raumteilern aus Messing und Holz",
            "6 Blätter mit Bestuhlungsplänen, Thekendetails und stimmungsvollen Renderings"
        ],
        "it": [
            "Banconi bar in pietra monolitica con illuminazione d'accento incassata",
            "Soffitti acustici fonoassorbenti con finiture in fibre naturali",
            "Privé VIP delimitati da eleganti separé metallici in ottone e legno",
            "6 tavole espositive con piante dei coperti, dettagli costruttivi e render"
        ]
    },
    "location": {
        "fa": "بارسلون، اسپانیا و تهران",
        "en": "Barcelona, Spain & Tehran",
        "ca": "Barcelona, Espanya i Teheran",
        "es": "Barcelona, España y Teherán",
        "fr": "Barcelone, Espagne & Téhéran",
        "de": "Barcelona, Spanien & Teheran",
        "it": "Barcellona, Spagna e Teheran"
    },
    "area": {
        "fa": "بیش از ۸ مجموعه رستوران و کافه معتبر",
        "en": "8+ High-End Restaurants & Cafes",
        "ca": "Més de 8 Restaurants i Cafès d'Autor",
        "es": "Más de 8 Restaurantes y Cafés de Autor",
        "fr": "Plus de 8 Restaurants & Cafés de Renom",
        "de": "Über 8 renommierte Restaurants und Cafés",
        "it": "Oltre 8 Ristoranti e Lounge Bar di Tendenza"
    }
},
  'classical-monumental-palace': {
    "title": {
        "fa": "کاخ و عمارت مسکونی کلاسیک با شکوه تاریخی",
        "en": "Classical Monumental Palace & Private Estate",
        "ca": "Palau Monumental Clàssic i Finca Privada",
        "es": "Palacio Monumental Clásico y Finca Privada",
        "fr": "Palais Monumental Classique & Grand Domaine Privé",
        "de": "Klassischer Monumentalpalast & Privatanwesen",
        "it": "Palazzo Monumentale Classico e Tenuta Privata"
    },
    "concept": {
        "fa": "طراحی عمارت کلاسیک اشرافی با تقارن کامل هندسی، ستون‌ها و سرستون‌های کرینتی دست‌تراش، پله‌های یادمانی ورودی، گنبدهای سنگی باشکوه، حیاط‌های ستون‌دار و تزئینات دقیق گچ‌بری و حجاری سنگ متناسب با استانداردهای کاخ‌های ماندگار تاریخی.",
        "en": "Classical monumental residence defined by axial symmetry, hand-carved Corinthian capitals and fluted stone colossals, grand horseshoe entrance stairs, neoclassical stone dome drums, peristyle courtyards, and museum-grade architectural stone masonry.",
        "ca": "Palau residencial clàssic d'estricta simetria, columnes corínties esculpides a mà, cúpula de pedra i escalinata d'accés cerimonial.",
        "es": "Palacio residencial de corte clásico con simetría axial, columnas corintias talladas a mano, cúpula de piedra y escalinata monumental.",
        "fr": "Palais classique grandiose régi par une rigoureuse symétrie, colonnades corinthiennes taillées à la main, coupole en pierre et perron monumental.",
        "de": "Monumentales Residenzschloss mit strenger Axialsymmetrie, handgefertigten korinthischen Säulen, Steinkuppel und Freitreppe.",
        "it": "Palazzo monumentale classico a perfetta simmetria assiale con colonne corinzie scolpite a mano, cupola e scalone monumentale."
    },
    "features": {
        "fa": [
            "ستون‌ها و سرستون‌های کرینتی سنگی با تناسبات طلایی کلاسیک",
            "گنبد مرکزی سنگی با پنجره‌های قوسی تامین‌کننده نور طبیعی سالن تشریفات",
            "پله‌های عظیم مدور ورودی برای تعریف ورودی تشریفاتی و باابهت",
            "مجموعه ۶ شیت شامل پلان‌های تقارن‌محور، نماهای حکاکی‌شده و رندرهای کاخ"
        ],
        "en": [
            "Hand-carved Corinthian stone capitals proportioned according to classical golden ratio canons",
            "Central arched stone dome drum infusing daylight into the grand ballroom rotunda",
            "Monumental circular entry staircase establishing a theatrical ceremonial arrival",
            "6-sheet archival package with symmetry floor plans, carved elevation details, and CGI"
        ],
        "ca": [
            "Capitells corintis de pedra tallats segons la proporció àuria",
            "Cúpula central de pedra amb obertures que il·luminen el saló noble",
            "Gran escalinata semicircular d'entrada que atorga solemnitat",
            "6 làmines amb plànols de simetria, façanes esculpides i renders"
        ],
        "es": [
            "Capiteles corintios labrados a mano bajo cánones clásicos de proporción áurea",
            "Cúpula central de piedra que baña de luz cenital el salón de recepciones",
            "Escalinata semicircular de acceso para una llegada solemne e imponente",
            "6 láminas con plantas simétricas, alzados de cantería y visualizaciones"
        ],
        "fr": [
            "Chapiteaux corinthiens sculptés dans la masse selon le nombre d'or",
            "Coupole centrale en pierre apportant une lumière zénithale à la rotonde",
            "Escalier d'honneur en fer à cheval dessinant une arrivée théâtrale",
            "6 planches comprenant plans axiaux, façades de pierre taillée et rendus"
        ],
        "de": [
            "Handbehauene korinthische Steinkapitelle nach den Gesetzen des Goldenen Schnitts",
            "Zentrale Steinkuppel für festlichen Lichteinfall im Festsaal",
            "Freitreppe in monumentaler Ausführung für einen repräsentativen Empfang",
            "6 Tafeln mit symmetrischen Schlossgrundrissen, Steinmetzdetails und CGI"
        ],
        "it": [
            "Capitelli corinzi in pietra scolpiti a mano secondo la sezione aurea",
            "Cupola centrale che illumina il grande salone d'onore e ricevimento",
            "Scalone monumentale semicircolare per un accesso regale e solenne",
            "6 tavole d'archivio con piante simmetriche, prospetti e viste 3D"
        ]
    },
    "location": {
        "fa": "لواسان، تهران",
        "en": "Lavasan Private Estate, Tehran",
        "ca": "Finca Exclusiva a Lavasan",
        "es": "Finca Exclusiva en Lavasán",
        "fr": "Grand Domaine Privé à Lavasan",
        "de": "Privatanwesen Lavasan",
        "it": "Tenuta Privata a Lavasan"
    },
    "area": {
        "fa": "۲,۸۰۰ متر مربع زیربنا در محوطه باغ ۱ هکتاری",
        "en": "2,800 m² Palace on a 1-Hectare Private Estate",
        "ca": "2.800 m² en una Finca d'1 ha",
        "es": "2.800 m² en Finca de 1 ha",
        "fr": "2 800 m² Bâtis sur un Domaine d'1 Hectare",
        "de": "2.800 m² Schlossanlage auf 1 Hektar Parkgrundstück",
        "it": "2.800 m² di Palazzo su Tenuta di 1 Ettaro"
    }
},
  'architectural-typologies': {
    "title": {
        "fa": "گونه‌شناسی‌های تطبیقی معماری // ریزورت‌ها، کلبه‌ها و فرم‌های زیستی",
        "en": "Comparative Architectural Typologies // Resorts & Cabins",
        "ca": "Tipologies Arquitectòniques Comparades // Resorts i Cabanes",
        "es": "Tipologías Arquitectónicas Comparadas // Resorts y Cabañas",
        "fr": "Typologies Architecturales Comparées // Resorts & Écolodges",
        "de": "Vergleichende Architekturtypologien // Resorts & Hütten",
        "it": "Tipologie Architettoniche Comparate // Resort e Capanne"
    },
    "concept": {
        "fa": "پژوهش و مستندسازی تطبیقی فرم‌های اقامتی و کلبه‌های کوهستانی و جنگلی، مقایسه فرم‌های سنتی بومی با الگوهای مدرن اقامتگاهی، ارزیابی سازگاری با بستر و ارائه گزینه‌های ایده‌آل برای توسعه هتل‌های بوتیک و ریزورت‌های طبیعت‌گردی.",
        "en": "Comparative typological research cataloging sustainable retreat lodges, off-grid eco-cabins, and resort vernaculars, cross-analyzing indigenous tectonic methods against modern modular prefabrication for eco-tourism hospitality developments.",
        "ca": "Recerca tipològica comparada de cabanes i allotjaments sostenibles integrats en la natura per a complexos d'ecoturisme.",
        "es": "Investigación tipológica comparada de cabañas y alojamientos sostenibles para complejos de ecoturismo y resorts de naturaleza.",
        "fr": "Étude typologique comparative d'écolodges et refuges durables pour le développement de projets hôteliers écotouristiques.",
        "de": "Typologische Vergleichsstudie über naturnahe Ferienhütten und modulare Eco-Lodges für den nachhaltigen Tourismus.",
        "it": "Ricerca tipologica comparativa su cabine sostenibili ed ecolodge per lo sviluppo di resort e complessi ecoturistici."
    },
    "features": {
        "fa": [
            "تحلیل و مقایسه تطبیقی بیش از ۱۰ تیپولوژی اقامتی در اقلیم‌های مختلف",
            "بررسی رفتار حرارتی و ایستایی سازه‌های سبک چوبی و سنگی",
            "۵ شیت تحلیلی شامل دیاگرام‌های باد، خورشید و مصالح بومی",
            "طراحی مدول‌های پیش‌ساخته اقامتی برای مناطق دوردست طبیعت"
        ],
        "en": [
            "Comparative matrix evaluating 10+ habitat typologies across diverse microclimates",
            "Thermal performance benchmarking of lightweight timber and localized masonry assemblies",
            "5 analytical sheets with wind, solar path, and material availability diagrams",
            "Off-grid prefabricated modular unit designs suited for sensitive remote ecologies"
        ],
        "ca": [
            "Matriu comparativa de més de 10 tipologies en diferents microclimes",
            "Anàlisi tèrmica i estructural de cabanes de fusta i pedra",
            "5 làmines analítiques amb diagrames de vent, sol i materials",
            "Mòduls prefabricats sostenibles per a zones naturals protegides"
        ],
        "es": [
            "Matriz comparativa de más de 10 tipologías en climas extremos",
            "Estudios de inercia térmica en madera ligera y mampostería local",
            "5 láminas analíticas con diagramas de vientos, asoleamiento y materiales",
            "Prototipos modulares industrializados para reservas naturales"
        ],
        "fr": [
            "Matrice d'évaluation comparative de plus de 10 typologies d'habitats",
            "Comportement thermique et bilan carbone des structures bois et pierre",
            "5 planches méthodologiques avec roses des vents et trajectoires solaires",
            "Modules préfabriqués autonomes pour sites naturels d'exception"
        ],
        "de": [
            "Vergleichsmatrix von über 10 Wohn- und Rückzugstypologien",
            "Thermische Simulationen für Holzleichtbau und Natursteinmauerwerk",
            "5 Analyseblätter mit Wind-, Sonnen- und Materialdiagrammen",
            "Autarke modulare Rückzugshütten für sensible Naturräume"
        ],
        "it": [
            "Matrice comparativa di oltre 10 tipologie insediative in climi diversi",
            "Simulazioni di prestazione termica tra legno leggero e muratura in pietra",
            "5 tavole analitiche con diagrammi di venti, soleggiamento e risorse locali",
            "Moduli prefabbricati autosufficienti per destinazioni a basso impatto"
        ]
    },
    "location": {
        "fa": "اقلیم‌های جنگلی، کوهستانی و کویری",
        "en": "Forest, Mountain & Desert Ecologies",
        "ca": "Ecosistemes de Bosc, Muntanya i Desert",
        "es": "Ecosistemas de Bosque, Montaña y Desierto",
        "fr": "Écosystèmes Forestiers, Montagneux & Désertiques",
        "de": "Wald-, Berg- und Wüstenregionen",
        "it": "Ecosistemi Boschivi, Montani e Desertici"
    },
    "area": {
        "fa": "مطالعه جامع ۱۰ الگوی زیستی و اقامتی",
        "en": "Research Compendium of 10 Habitat Typologies",
        "ca": "Compendi d'Investigació de 10 Tipologies",
        "es": "Compendio de Investigación de 10 Tipologías",
        "fr": "Recueil de Recherche sur 10 Typologies d'Habitat",
        "de": "Forschungskompendium über 10 Wohnformen",
        "it": "Compendio di Ricerca su 10 Tipologie Abitative"
    }
},
  'concept-sketches-watercolors': {
    "title": {
        "fa": "اسکیس‌های دستی و ایده‌پردازی‌های فرمی معماری",
        "en": "Hand Sketches, Ideation & Architectural Concept Watercolors",
        "ca": "Esbossos a Mà Alçada, Ideació i Aquarel·les de Concepte",
        "es": "Bocetos a Mano Alzada, Ideación y Acuarelas de Concepto",
        "fr": "Croquis à Main Levée, Idéation & Aquarelles d'Architecture",
        "de": "Handskizzen, Ideenfindung & Architektur-Aquarelle",
        "it": "Schizzi a Mano Libera, Ideazione e Acquerelli di Concetto"
    },
    "concept": {
        "fa": "نمایش ریشه‌های تفکر معماری از طریق کروکی‌های دست‌آزاد، خطوط پویا و راندوهای آبرنگی که نخستین جرقه‌های خلق فرم و فضاهای معمارانه را شکل داده‌اند.",
        "en": "Celebration of raw foundational architectural thinking through freehand ink sketching, dynamic analytical linework, and expressive watercolor washes that catalyze early conceptual form discovery.",
        "ca": "Mostra del procés creatiu fundacional mitjançant croquis a tinta a mà alçada, traços expressius i aiguades d'aquarel·la arquitectònica.",
        "es": "Exhibición del proceso conceptual originario mediante croquis a mano alzada, líneas de fuga dinámicas y aguadas de acuarela.",
        "fr": "Expression de la genèse architecturale par le croquis spontané à l'encre, le dessin perspectif analytique et les lavis d'aquarelle.",
        "de": "Präsentation des kreativen Ursprungs durch freie Tuschskizzen, dynamische Linienführung und atmosphärische Architektur-Aquarelle.",
        "it": "Celebrazione del pensiero architettonico embrionale attraverso schizzi a china a mano libera, prospettive e acquerelli materici."
    },
    "features": {
        "fa": [
            "۲ شیت پرزنتیشن عریض از اسکیس‌های مفهومی و ژوژمان‌ها",
            "ترکیب خطوط پرسپکتیو با بافت‌های رنگی و آنالیز بصری"
        ],
        "en": [
            "2 wide presentation portfolio sheets showcasing concept sketches and design juries",
            "Synergy of rapid perspective linework with chromatic washes and sightline analysis"
        ],
        "ca": [
            "2 làmines panoràmiques d'esbossos conceptuals i jurats de projectes",
            "Fusió de línies de perspectiva ràpida amb taques d'aquarel·la i anàlisi visual"
        ],
        "es": [
            "2 láminas de gran formato con bocetos conceptuales y jurados de proyectos",
            "Combinación de trazos de perspectiva rápida con veladuras de color"
        ],
        "fr": [
            "2 planches grand format présentant croquis de recherche et jurys de concours",
            "Harmonie des traits de perspective et des transparences de l'aquarelle"
        ],
        "de": [
            "2 großformatige Präsentationstafeln mit Ideenskizzen und Wettbewerbsentwürfen",
            "Synthese aus schneller perspektivischer Linienzeichnung und Aquarellfarben"
        ],
        "it": [
            "2 tavole di grande formato con schizzi ideativi e giurie di concorso",
            "Sintesi di tratti prospettici veloci e campiture materiche ad acquerello"
        ]
    },
    "location": {
        "fa": "آتلیه طراحی معماری",
        "en": "Architectural Design Atelier",
        "ca": "Atelier de Disseny Arquitectònic",
        "es": "Atelier de Diseño Arquitectónico",
        "fr": "Atelier de Conception Architecturale",
        "de": "Architektur-Atelier",
        "it": "Atelier di Progettazione Architettonica"
    },
    "area": {
        "fa": "ایده‌پردازی اولیه فرم",
        "en": "Foundational Form Ideation",
        "ca": "Ideació Formal Primària",
        "es": "Ideación Formal Primaria",
        "fr": "Genèse et Idéation Formelle",
        "de": "Formfindung & Konzeptgenese",
        "it": "Ideazione Formale Primaria"
    }
},
};

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
