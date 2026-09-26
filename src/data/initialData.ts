import { CategoryBuilding, ResumeProfile, SiteSettings } from '../types';

export interface StudioPartner {
  id: string;
  name: string;
  englishName: string;
  roleFa: string;
  roleEn: string;
  titleBadge: string;
  location: string;
  email: string;
  phone?: string;
  instagram?: string;
  image: string;
  bioFa: string;
  bioEn: string;
  education: {
    degree: string;
    university: string;
    year: string;
  }[];
  strengths: {
    titleFa: string;
    titleEn: string;
    descFa: string;
    descEn: string;
  }[];
  softwareStack: string[];
  cvSheets?: string[];
}

export const STUDIO_PRINCIPALS: StudioPartner[] = [
  {
    id: 'soheil-masti',
    name: 'سهیل مستی',
    englishName: 'Soheil Masti',
    roleFa: 'معمار ارشد، موسس و استراتژیست سیستم‌های BIM و هوش مصنوعی',
    roleEn: 'Senior Architect, Founder & BIM/AI Systems Strategist',
    titleBadge: 'LEAD BIM COORDINATOR & FOUNDER',
    location: 'Barcelona, Spain (Sant Cugat del Vallès) | International Delivery',
    email: 'soheil.masti@gmail.com',
    phone: '+34 610 855 434',
    instagram: '@Gaa.std',
    image: '/team/soheil-masti.png',
    bioFa: 'معمار ارشد و متخصص سیستم‌های مدلسازی اطلاعات ساختمان (BIM) با بیش از ۱۵ سال تجربه بین‌المللی در هدایت، طراحی و اجرای پروژه‌های مسکونی لوکس، مجموعه‌های تجاری و زیرساخت‌های کلان شهری در اروپا و خاورمیانه. تسلط جامع بر متدولوژی‌های استاندارد بین‌المللی ISO 19650، برنامه‌نویسی اتوماسیون مهندسی با پایتون و داینامو و استقرار پایپ‌لاین‌های هوش مصنوعی سازمانی.',
    bioEn: 'Senior Architect and BIM Systems Strategist with over 15 years of international experience leading architectural design, advanced BIM workflows (LOD 350/400), computational engineering scripts, and AI-driven organizational transformation across Europe and the Middle East.',
    education: [
      {
        degree: 'کارشناسی ارشد معماری (M.Arch.)',
        university: 'دانشگاه آزاد اسلامی واحد تهران مرکزی',
        year: '2011 – 2013'
      },
      {
        degree: 'کارشناسی معماری (B.Arch.)',
        university: 'دانشگاه پیام نور بندرعباس',
        year: '2006 – 2010'
      }
    ],
    strengths: [
      {
        titleFa: 'مدلسازی و هماهنگی پیشرفته BIM',
        titleEn: 'Advanced BIM Coordination (LOD 350-400)',
        descFa: 'توسعه پکیج‌های فنی اجرایی، مدلسازی فمیلی‌های پارامتریک و ماتریس رفع تداخلات سازه و تاسیسات (Clash Detection).',
        descEn: 'Full execution BIM packages, complex parametric Revit family libraries, and multi-service clash matrices.'
      },
      {
        titleFa: 'برنامه‌نویسی و اتوماسیون مهندسی',
        titleEn: 'Engineering Automation & Scripting',
        descFa: 'توسعه اسکریپت‌های اختصاصی پایتون، سی‌شارپ و داینامو جهت حذف خطای انسانی و اتوماسیون فرآیندهای نقشه‌کشی.',
        descEn: 'Custom Python, C#, and Dynamo scripts for engineering process automation, quality audits, and parameter sync.'
      },
      {
        titleFa: 'الگوریتم‌های هوش مصنوعی و معماری سازمان',
        titleEn: 'AI Organizational Architecture',
        descFa: 'طراحی پایپ‌لاین‌های هوش مصنوعی، ساختارهای Reverse-RAG و بهینه‌سازی جریان کاری دفاتر مهندسی.',
        descEn: 'Architecting AI workflows, Reverse-RAG indexing, and restructuring architectural practices for peak operational velocity.'
      }
    ],
    softwareStack: [
      'Autodesk Revit (LOD 400)',
      'Navisworks Manage',
      'Python / Dynamo Scripting',
      'Rhino / Grasshopper',
      'ISO 19650 CDE Lead',
      'Solibri Model Checker'
    ]
  },
  {
    id: 'siavash-pazooki',
    name: 'سیاوش پازوکی',
    englishName: 'Siavash Pazooki',
    roleFa: 'معمار ارشد، طراح کانسپت و سرپرست رندرینگ و تجسم‌سازی پیشرفته',
    roleEn: 'Senior Architectural Designer, Concept Lead & CGI Visualizer',
    titleBadge: 'SENIOR ARCHITECTURAL DESIGNER & CGI LEAD',
    location: 'Tehran / Barcelona Remote Collaboration',
    email: 'siavashpazookiart@gmail.com',
    instagram: '@Siavash_pzk',
    image: '/team/siavash-pazooki.jpg',
    bioFa: 'معمار خلاق و طراح ارشد کانسپت با تسلط استثنایی بر تجسم‌سازی فوق‌واقع‌گرایانه (High-End CGI) پروژه‌های مسکونی، ویلایی، تجاری و طراحی شهری. فارغ‌التحصیل کارشناسی ارشد طراحی شهری با بینش عمیق در ترکیب فرم‌های مدرن، دیتیلینگ درودگری لوکس، شناخت مصالح ساختمانی و نظارت کارگاهی دقیق بر مراحل اجرای سازه و نازک‌کاری.',
    bioEn: 'Creative, detail-oriented Senior Architect and High-End CGI Visualizer with comprehensive expertise in concept development, functional space planning, luxury millwork detailing, and photorealistic 3D visualization for residential, hospitality, and urban developments.',
    education: [
      {
        degree: 'کارشناسی ارشد طراحی شهری (M.Sc. Urban Design)',
        university: 'دانشگاه سراسری قزوین (معدل ۱۷.۲۳)',
        year: '2016 – 2018'
      },
      {
        degree: 'کارشناسی معماری (B.Arch.)',
        university: 'دانشگاه آزاد اسلامی واحد تهران غرب (معدل ۱۷.۱۱)',
        year: '2013 – 2015'
      }
    ],
    strengths: [
      {
        titleFa: 'طراحی کانسپت و زیبایی‌شناسی فضایی',
        titleEn: 'Concept Design & Aesthetic Space Planning',
        descFa: 'ترکیب خلوص مینیمال، سازگاری فرم با بستر سایت و خلق هندسه‌های پیشرو در ویلاها، آپارتمان‌ها و مراکز تجاری.',
        descEn: 'Transforming complex client briefs into elegant, functionally resolved, and contextually grounded architectural forms.'
      },
      {
        titleFa: 'رندرینگ فتورئالیستیک و انیمیشن CGI',
        titleEn: 'High-End Photorealistic 3D CGI',
        descFa: 'تخصص عمیق در شبیه‌سازی نور، متریال، اتمسفر اقلیمی و تولید شیت‌های فوق‌حرفه‌ای پرزنتیشن با تری‌دی‌مکس و وی‌ری.',
        descEn: 'Industry-leading mastery of architectural lighting, materials, ForestPack landscaping, and cinematic presentations.'
      },
      {
        titleFa: 'دیتیلینگ درودگری و نظارت کارگاهی',
        titleEn: 'Luxury Millwork & On-Site Detailing',
        descFa: 'طراحی نقشه‌های اجرایی میلی‌متری کابینت‌ها، شومینه، وال‌کلازت و نظارت بر اجرای سازه‌های بتنی و اسکلت فلزی.',
        descEn: 'Production-ready millwork detailing, bespoke joinery specifications, and meticulous on-site construction oversight.'
      }
    ],
    softwareStack: [
      '3ds Max & V-Ray',
      'Forest Pack & RailClone',
      'AutoCAD & Detail Drafting',
      'Rhino & Organic Form',
      'Adobe Photoshop CGI',
      'Revit Architecture'
    ],
    cvSheets: [
      '/team/siavash-cv-sheet-1.jpg',
      '/team/siavash-cv-sheet-2.jpg'
    ]
  }
];

export const RESUME_DATA: ResumeProfile = {
  name: 'سهیل مستی',
  englishName: 'Soheil Masti',
  title: 'معمار ارشد، متخصص ارشد BIM و سرپرست پروژه‌های اجرایی',
  englishTitle: 'Senior Architect & BIM Specialist | Technical Project Lead',
  location: 'Barcelona, Spain (Sant Cugat del Vallès) | Tehran, Iran',
  phone: '+34 610 855 434',
  email: 'soheil.masti@gmail.com',
  linkedin: 'linkedin.com/in/soheil-masti',
  instagram: '@Gaa.std',
  experienceYears: 15,
  bio: 'معمار ارشد و متخصص BIM با بیش از ۱۵ سال تجربه بین‌المللی در هدایت، طراحی و اجرای پروژه‌های مسکونی لوکس، مجموعه‌های تجاری و زیرساخت‌های کلان شهری در اروپا و خاورمیانه. تسلط جامع بر تمام چرخه‌های حیات پروژه از فاز کانسپت و پیش‌طرح تا مدارک فنی اجرایی و نظارت عالیه کارگاهی، به همراه رهبری فرآیندهای پیشرفته مدلسازی اطلاعات ساختمان (BIM LOD 350/400).',
  education: [
    {
      degree: 'کارشناسی ارشد معماری (M.Arch.)',
      university: 'دانشگاه آزاد اسلامی تهران مرکزی',
      year: '2011 – 2013',
      location: 'تهران، ایران'
    },
    {
      degree: 'کارشناسی معماری (B.Arch.)',
      university: 'دانشگاه پیام نور بندرعباس',
      year: '2006 – 2010',
      location: 'بندرعباس، ایران'
    }
  ],
  experience: [
    {
      role: 'معمار ارشد و سرپرست BIM',
      company: 'BIMCO Studio Barcelona // Gaam Studio',
      period: '2020 – تاکنون',
      location: 'بارسلون، اسپانیا (Barcelona, Spain)',
      highlights: [
        'هدایت طراحی معماری، فرآیندهای پیشرفته BIM (LOD 350/400) و تدوین مدارک اجرایی کامل در بیش از ۲۵ پروژه مسکونی، تجاری و شهری.',
        'همکاری استراتژیک با مهندس سیاوش پازوکی در تجسم‌سازی پیشرفته سه‌بعدی و تدوین کاتالوگ جامع پورتفولیو در سه جلد تخصصی.',
        'توسعه ابزارهای اختصاصی اتوماسیون نقشه‌کشی و استقرار استانداردهای بریتانیا و اروپا (ISO 19650).'
      ]
    },
    {
      role: 'معمار ارشد و سرپرست تیم طراحی',
      company: 'Fanoos Langargah',
      period: '2015 – 2019',
      location: 'تهران / جنوب ایران',
      highlights: [
        'مدیریت تیم طراحی در تحویل پروژه‌های مسکونی، اداری و تجاری از فاز کانسپت تا تحویل نهایی.',
        'تدوین استراتژی‌های مهندسی نما و هماهنگی چندرشته‌ای سازه و تاسیسات.'
      ]
    }
  ],
  competencies: [
    {
      category: 'BIM و مدلسازی پارامتریک',
      skills: ['Autodesk Revit (LOD 400)', 'AutoCAD', 'Navisworks Manage', 'Rhino / Grasshopper', 'Dynamo Automation', 'Clash Detection']
    },
    {
      category: 'مدارک اجرایی و استانداردها',
      skills: ['نقشه‌های فاز ۲ اجرایی', 'متره و برآورد (BOQ)', 'استاندارد بریتانیا و اروپا (CTE / ISO 19650)', 'دیتیل‌های سازه و نما']
    },
    {
      category: 'رندرینگ و تجسم‌سازی',
      skills: ['3ds Max & V-Ray', 'Lumion Architecture', 'Adobe Photoshop & InDesign', 'Three.js Interactive Presentation']
    }
  ],
  awards: [
    {
      title: 'مسابقه طراحی ساختمان مرکزی سازمان نظام مهندسی هرمزگان',
      year: '2012',
      rank: 'مقام دوم مسابقه (سرپرست تیم طراحی)'
    },
    {
      title: 'مسابقه طراحی المان فانوس دریایی بندرعباس',
      year: '2014',
      rank: 'طرح برگزیده جهت اجرا (Selected Scheme)'
    }
  ],
  references: [
    {
      name: 'Farzad Vatankhah',
      role: 'کارفرمای مجتمع‌های تجاری و مسکونی',
      quote: '«سهیل معمار بسیار باهوش، خلاق و آینده‌نگر است. او تمامی قابلیت‌هایی که یک معمار برجسته برای سودآوری و موفقیت چشمگیر یک پروژه نیاز دارد را داراست.»'
    }
  ]
};

export const INITIAL_CATEGORIES: CategoryBuilding[] = [
  {
    "id": "urban-design",
    "categoryNumber": "01",
    "title": "طراحی شهری، برنامه‌ریزی کلان و لنداسکیپ",
    "englishTitle": "URBAN DESIGN // MASTERPLANNING & LANDSCAPE",
    "description": "برنامه‌ریزی شهری با تراکم بالا، مورفولوژی روددره زرگنده، سایت‌پلان شهرک ویلایی دیاموند، طراحی لنداسکیپ و زیرساخت پل‌های شهری.",
    "iconName": "Compass",
    "buildingType": "urban-bridge",
    "position": {
      "x": 50,
      "y": 38,
      "width": 22,
      "height": 20
    },
    "position3D": [
      0,
      1.2,
      -3.5
    ],
    "size3D": [
      6.5,
      2.5,
      4.0
    ],
    "buildingImage": "/projects/urban/diamond-villa-masterplan/renders/sheet_01_render_01.jpg",
    "colorAccent": "#0ea5e9",
    "projects": [
      {
        "id": "urban-design-high-density",
        "title": "برنامه‌ریزی شهری، برج‌های چندمنظوره و اسکای‌لاین",
        "englishTitle": "High-Density Urban Design & Skyline Masterplan",
        "location": "تهران / حاشیه کلانشهر",
        "year": "2019 – 2021",
        "area": "۱۲۰ هکتار محدوده توسعه شهری",
        "typology": "Urban Design",
        "status": "طراحی و کانسپت جامع",
        "role": "Urban Design & Skyline Strategist",
        "coverImage": "/projects/urban/urban-design-high-density/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/urban/urban-design-high-density/renders/sheet_01_render_01.jpg",
                  "/projects/urban/urban-design-high-density/renders/sheet_02_render_01.jpg",
                  "/projects/urban/urban-design-high-density/renders/sheet_03_render_01.jpg",
                  "/projects/urban/urban-design-high-density/renders/sheet_04_render_01.jpg",
                  "/projects/urban/urban-design-high-density/renders/sheet_05_render_01.jpg",
                  "/projects/urban/urban-design-high-density/renders/sheet_06_render_01.jpg",
                  "/projects/urban/urban-design-high-density/renders/sheet_07_render_01.jpg",
                  "/projects/urban/urban-design-high-density/renders/sheet_08_render_01.jpg",
                  "/projects/urban/urban-design-high-density/renders/sheet_09_render_01.jpg",
                  "/projects/urban/urban-design-high-density/renders/sheet_10_render_01.jpg"
                ],
        "concept": "مطالعات پیشرفته فرم کالبدی، جهت‌گیری بادهای غالب شهری و سایه‌اندازی برج‌ها، استقرار فضاهای عمومی پیاده‌محور در تراز صفر و ارتباط متوازن خط آسمان با بافت پیرامونی با الهام از اصول منشور شهرسازی نوین.",
        "features": [
          "تحلیل کوریدورهای دید و کوریدورهای تهویه طبیعی هوا",
          "تفکیک شبکه‌های ترافیکی سواره از پلازاهای چندسطحی پیاده",
          "طراحی برج‌های سبز مدولار با رویکرد پایداری انرژی",
          "پکیج کامل ۱۰ شیت شامل پلان سایت، دیاگرام‌ها و مقاطع کالبدی"
        ],
        "bimSpecs": {
          "lodLevel": "LOD 300 Urban Model",
          "softwareUsed": [
            "3ds Max",
            "AutoCAD Civil",
            "Rhino",
            "Photoshop"
          ]
        }
      },
      {
        "id": "zargandeh-riverside-morphology",
        "title": "مطالعه بافت و مورفولوژی روددره زرگنده تهران",
        "englishTitle": "Zargandeh Riverside Urban Morphology & Regeneration",
        "location": "زرگنده، تهران",
        "year": "2018",
        "area": "حوزه آبریز و روددره زرگنده",
        "typology": "Urban Design",
        "status": "پژوهش و طرح نوسازی",
        "role": "Urban Morphology Researcher & Designer",
        "coverImage": "/projects/urban/zargandeh-riverside-morphology/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/urban/zargandeh-riverside-morphology/renders/sheet_01_render_01.jpg",
                  "/projects/urban/zargandeh-riverside-morphology/renders/sheet_02_render_01.jpg",
                  "/projects/urban/zargandeh-riverside-morphology/renders/sheet_03_render_01.jpg",
                  "/projects/urban/zargandeh-riverside-morphology/renders/sheet_04_render_01.jpg",
                  "/projects/urban/zargandeh-riverside-morphology/renders/sheet_05_render_01.jpg"
                ],
        "concept": "تحلیل موشکافانه دانه بندی بافت، نفوذپذیری فضایی و آسیب‌شناسی زیست‌محیطی روددره زرگنده؛ ارائه مدل مداخله طراحی شهری با تاکید بر تاب‌آوری اکولوژیک، احیای بستر آب و بازآفرینی فضاهای پیاده در شیب طبیعی دره.",
        "features": [
          "شیت‌های تحلیلی ۱۶۰۰×۱۲۳۶ با دیاگرام‌های دقیق تراکم کالبدی",
          "تحلیل شیب و مقاطع ارتفاعی بستر رودخانه",
          "ارائه راهکارهای بازآفرینی شهری پایدار برای بهسازی شیب‌های تند",
          "تعریف مسیرهای حرکتی سبز و دسترسی‌های پیاده محلی"
        ],
        "bimSpecs": {
          "lodLevel": "GIS & Urban Morphology",
          "softwareUsed": [
            "GIS",
            "AutoCAD",
            "Photoshop",
            "3ds Max"
          ]
        }
      },
      {
        "id": "diamond-villa-masterplan",
        "title": "سایت‌پلان و سردر ورودی شهرک ویلایی دیاموند",
        "englishTitle": "Diamond Villa Town Masterplan & Gateway",
        "location": "شمال ایران، مجاورت رودخانه",
        "year": "2020",
        "area": "۲۵ هکتار سایت شهرکی",
        "typology": "Urban Design",
        "status": "طراحی فاز یک و دو",
        "role": "Masterplanner & Gateway Architect",
        "coverImage": "/projects/urban/diamond-villa-masterplan/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/urban/diamond-villa-masterplan/renders/sheet_01_render_01.jpg",
                  "/projects/urban/diamond-villa-masterplan/renders/sheet_01_render_02.jpg",
                  "/projects/urban/diamond-villa-masterplan/renders/sheet_02_render_01.jpg",
                  "/projects/urban/diamond-villa-masterplan/renders/sheet_02_render_02.jpg",
                  "/projects/urban/diamond-villa-masterplan/renders/sheet_02_render_03.jpg",
                  "/projects/urban/diamond-villa-masterplan/renders/sheet_03_render_01.jpg",
                  "/projects/urban/diamond-villa-masterplan/renders/sheet_03_render_02.jpg"
                ],
        "concept": "طراحی شبکه ارتباطی و تفکیک قطعات شهرک ویلایی در حاشیه رودخانه طبیعی با جدول دقیق مساحت‌ها، خیابان‌بندی شریانی و المان سردر ورودی مدرن با فرم هندسی پویا و نگهبانی هوشمند.",
        "features": [
          "سایت‌پلان مهندسی عریض با جانمایی بیش از ۵۰ پلاک ویلایی",
          "طراحی سردر ورودی آیکونیک با بتن سفید و فلز",
          "هدایت آب‌های سطحی و حریم سبز رودخانه",
          "تحلیل بافت ماهواره‌ای و دسترسی به اتوبان اصلی"
        ]
      },
      {
        "id": "landscape-outdoor-living",
        "title": "طراحی لنداسکیپ، محوطه و پرگولا",
        "englishTitle": "Landscape Architecture & Outdoor Living Pavilions",
        "location": "البرز / شمال",
        "year": "2021",
        "area": "۸,۵۰۰ متر مربع محوطه‌سازی",
        "typology": "Landscape",
        "status": "ساخته شده و اجرایی",
        "role": "Landscape Architect",
        "coverImage": "/projects/urban/landscape-outdoor-living/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/urban/landscape-outdoor-living/renders/sheet_01_render_01.jpg",
                  "/projects/urban/landscape-outdoor-living/renders/sheet_02_render_01.jpg",
                  "/projects/urban/landscape-outdoor-living/renders/sheet_02_render_02.jpg",
                  "/projects/urban/landscape-outdoor-living/renders/sheet_02_render_03.jpg",
                  "/projects/urban/landscape-outdoor-living/renders/sheet_02_render_04.jpg",
                  "/projects/urban/landscape-outdoor-living/renders/sheet_03_render_01.jpg",
                  "/projects/urban/landscape-outdoor-living/renders/sheet_03_render_02.jpg",
                  "/projects/urban/landscape-outdoor-living/renders/sheet_03_render_03.jpg",
                  "/projects/urban/landscape-outdoor-living/renders/sheet_03_render_04.jpg",
                  "/projects/urban/landscape-outdoor-living/renders/sheet_04_render_01.jpg",
                  "/projects/urban/landscape-outdoor-living/renders/sheet_04_render_02.jpg",
                  "/projects/urban/landscape-outdoor-living/renders/sheet_04_render_03.jpg",
                  "/projects/urban/landscape-outdoor-living/renders/sheet_04_render_04.jpg",
                  "/projects/urban/landscape-outdoor-living/renders/sheet_05_render_01.jpg",
                  "/projects/urban/landscape-outdoor-living/renders/sheet_05_render_02.jpg",
                  "/projects/urban/landscape-outdoor-living/renders/sheet_05_render_03.jpg",
                  "/projects/urban/landscape-outdoor-living/renders/sheet_05_render_04.jpg"
                ],
        "concept": "طراحی جامع محوطه بیرونی ویلاها شامل پرگولاهای مدرن چوب و فلز، استخرهای اینفینیتی، مسیرهای پیاده با سنگ‌های طبیعی نامنظم، بام‌های سبز اکولوژیک و نورپردازی پنهان شبانه باغ.",
        "features": [
          "پرگولاهای سازه‌ای مدرن با لوورهای متحرک ضدآفتاب",
          "استخر روباز با عرشه چوبی و باربیکیو یکپارچه",
          "سیستم زهکشی و هدایت آب گیاهان بومی",
          "پالت مصالح سنگ طبیعی، ترمووود و فولاد کورتن"
        ]
      },
      {
        "id": "bridge-highway-infrastructure",
        "title": "زیرساخت تقاطع غیرهمسطح و پل شهری",
        "englishTitle": "Metropolitan Highway Interchange & Bridge Infrastructure",
        "location": "محور مواصلاتی کلانشهری",
        "year": "2019",
        "area": "محدوده تقاطع ۳ سطحی",
        "typology": "Infrastructure",
        "status": "طراحی کانسپت و فاز یک",
        "role": "Infrastructure & Bridge Concept Architect",
        "coverImage": "/projects/commercial/bridge-highway-infrastructure/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/commercial/bridge-highway-infrastructure/renders/sheet_01_render_01.jpg",
                  "/projects/commercial/bridge-highway-infrastructure/renders/sheet_01_render_02.jpg"
                ],
        "concept": "طراحی مقیاس کلان پل و تقاطع غیرهمسطح چندسطحی شهری با تحلیل رمپ‌ها، لوپ‌ها، پایه‌های بتنی مجسمه‌گون و نورپردازی مهندسی پوسته پل در شب جهت تسهیل عبور ترافیک شریانی.",
        "features": [
          "سازه بتنی پیش‌تنیده با دهانه‌های بلند",
          "تحلیل سرعت طرح و شیب مجاز رمپ‌های ارتباطی",
          "حفاظ‌های آکوستیک کاهش صدا برای مناطق مسکونی همجوار"
        ]
      }
    ]
  },
  {
    "id": "residential-luxury",
    "categoryNumber": "02",
    "title": "ویلاها و اقامتگاه‌های لوکس خصوصی",
    "englishTitle": "RESIDENTIAL // LUXURY VILLAS & PRIVATE HOUSES",
    "description": "معماری اقامتگاه‌های خصوصی هماهنگ با توپوگرافی، ویلای وایولت، شاله سنگی دالخانی، ویلای تهراندشت، ویلای استرالیا و بتن اکسپوز.",
    "iconName": "Home",
    "buildingType": "villa",
    "position": {
      "x": 24,
      "y": 58,
      "width": 18,
      "height": 18
    },
    "position3D": [
      -4.5,
      1.2,
      2.0
    ],
    "size3D": [
      3.2,
      2.4,
      3.2
    ],
    "buildingImage": "/projects/villas/concrete-glass-topography/renders/sheet_01_render_01.jpg",
    "colorAccent": "#10b981",
    "projects": [
      {
        "id": "violet-villa",
        "title": "ویلای مجلل وایولت با نماهای شیشه‌ای و مستندات اجرا",
        "englishTitle": "Violet Luxury Residence & Steel-Concrete Construction",
        "location": "کردان / تهراندشت",
        "year": "2021 – 2022",
        "area": "۶۵۰ متر مربع زیربنا در ۳ طبقه",
        "typology": "Residential",
        "status": "ساخته شده و بهره‌برداری",
        "role": "Lead Architect & Construction Supervisor",
        "coverImage": "/projects/villas/violet-villa/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/villas/violet-villa/renders/sheet_01_render_01.jpg",
                  "/projects/villas/violet-villa/renders/sheet_01_render_02.jpg",
                  "/projects/villas/violet-villa/renders/sheet_02_render_01.jpg",
                  "/projects/villas/violet-villa/renders/sheet_03_render_01.jpg",
                  "/projects/villas/violet-villa/renders/sheet_03_render_02.jpg",
                  "/projects/villas/violet-villa/renders/sheet_03_render_03.jpg",
                  "/projects/villas/violet-villa/renders/sheet_03_render_04.jpg",
                  "/projects/villas/violet-villa/renders/sheet_04_render_01.jpg",
                  "/projects/villas/violet-villa/renders/sheet_05_render_01.jpg",
                  "/projects/villas/violet-villa/renders/sheet_06_render_01.jpg",
                  "/projects/villas/violet-villa/renders/sheet_06_render_02.jpg",
                  "/projects/villas/violet-villa/renders/sheet_06_render_03.jpg",
                  "/projects/villas/violet-villa/renders/sheet_07_render_01.jpg",
                  "/projects/villas/violet-villa/renders/sheet_07_render_02.jpg",
                  "/projects/villas/violet-villa/renders/sheet_08_render_01.jpg",
                  "/projects/villas/violet-villa/renders/sheet_09_render_01.jpg",
                  "/projects/villas/violet-villa/renders/sheet_09_render_02.jpg"
                ],
        "concept": "طراحی ویلای لوکس معاصر با دهانه‌های بزرگ شیشه‌ای بدون ستون مزاحم، وُید مرکزی دو طبقه، ارتباط بصری پیوسته با حیاط و استخر روباز؛ همراه با پکیج مستندات نظارت کارگاهی شامل آرماتوربندی، نصب اسکلت فلزی و اجرای سقف‌های عرشه فولادی.",
        "features": [
          "پلان‌های معماری طبقات همکف و اول با جزییات مبلمان",
          "نماهای شیشه‌ای کرتین‌وال با شیشه‌های کم‌گسیل Low-E",
          "استخر روباز متصل به سالن پذیرایی با عرشه آفتاب‌گیر",
          "عکس‌های واقعی کارگاهی از مراحل قالب‌بندی و بتن‌ریزی"
        ],
        "bimSpecs": {
          "lodLevel": "LOD 350 Detailed Joinery",
          "softwareUsed": [
            "3ds Max",
            "V-Ray",
            "AutoCAD",
            "Revit"
          ]
        }
      },
      {
        "id": "concrete-glass-topography",
        "title": "ویلای مدرن بتن، شیشه و طبیعت بر بستر توپوگرافی",
        "englishTitle": "Topography Modern Villa // Concrete, Glass & Landscape",
        "location": "شیب‌های کوهپایه‌ای البرز",
        "year": "2020 – 2021",
        "area": "۷۸۰ متر مربع در ۴ تراز ارتفاعی",
        "typology": "Residential",
        "status": "طراحی کامل و ویدیوی واک‌ترو",
        "role": "Principal Architectural Designer & CGI Director",
        "coverImage": "/projects/villas/concrete-glass-topography/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/villas/concrete-glass-topography/renders/sheet_01_render_01.jpg",
                  "/projects/villas/concrete-glass-topography/renders/sheet_01_render_02.jpg",
                  "/projects/villas/concrete-glass-topography/renders/sheet_02_render_01.jpg",
                  "/projects/villas/concrete-glass-topography/renders/sheet_02_render_02.jpg",
                  "/projects/villas/concrete-glass-topography/renders/sheet_03_render_01.jpg",
                  "/projects/villas/concrete-glass-topography/renders/sheet_04_render_01.jpg",
                  "/projects/villas/concrete-glass-topography/renders/sheet_05_render_01.jpg",
                  "/projects/villas/concrete-glass-topography/renders/sheet_06_render_01.jpg",
                  "/projects/villas/concrete-glass-topography/renders/sheet_07_render_01.jpg",
                  "/projects/villas/concrete-glass-topography/renders/sheet_08_render_01.jpg",
                  "/projects/villas/concrete-glass-topography/renders/sheet_08_render_02.jpg",
                  "/projects/villas/concrete-glass-topography/renders/sheet_09_render_01.jpg",
                  "/projects/villas/concrete-glass-topography/renders/sheet_10_render_01.jpg",
                  "/projects/villas/concrete-glass-topography/renders/sheet_11_render_01.jpg",
                  "/projects/villas/concrete-glass-topography/renders/sheet_11_render_02.jpg",
                  "/projects/villas/concrete-glass-topography/renders/sheet_12_render_01.jpg",
                  "/projects/villas/concrete-glass-topography/renders/sheet_12_render_02.jpg"
                ],
        "concept": "نفوذ احجام بتنی صلب به دل صخره‌ها و باز شدن احجام شیشه‌ای شفاف به سوی چشم‌انداز باز دره. خلق حیاط‌های پلکانی، پرگولا، استخر خطی در تراز میانی و نورپردازی دراماتیک شبانه با تلفیق شیشه‌های رنگی آسمانی.",
        "features": [
          "شیت‌های کامل کانسپت و دیاگرام‌های شکل‌گیری فرم بر بستر شیب",
          "پلان‌های ترازهای مختلف با تفکیک عرصه خصوصی و عمومی",
          "رندرهای پرسپکتیو روز، غروب و دید پرنده",
          "شامل ویدیوی سه بعدی واک‌ترو MP4 در پروژه نهایی"
        ]
      },
      {
        "id": "dalkhani-mountain-chalet",
        "title": "ویلای کوهستانی سنگ و چوب دالخانی با مستندات اجرا",
        "englishTitle": "Dalkhani Mountain Hillside Chalet // Stone & Timber",
        "location": "جنگل دالخانی، رامسر",
        "year": "2020 – 2022",
        "area": "۵۲۰ متر مربع زیربنا",
        "typology": "Residential",
        "status": "ساخته شده و عکس‌های کارگاه",
        "role": "Architect & Resident Site Supervisor",
        "coverImage": "/projects/villas/dalkhani-mountain-chalet/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/villas/dalkhani-mountain-chalet/renders/sheet_01_render_01.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_01_render_02.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_02_render_01.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_03_render_01.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_03_render_02.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_04_render_01.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_04_render_02.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_05_render_01.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_06_render_01.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_07_render_01.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_08_render_01.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_08_render_02.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_09_render_01.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_10_render_01.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_10_render_02.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_10_render_03.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_11_render_01.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_11_render_02.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_12_render_01.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_12_render_02.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_13_render_01.jpg",
                  "/projects/villas/dalkhani-mountain-chalet/renders/sheet_13_render_02.jpg"
                ],
        "concept": "تلفیق سنگ لاشه کوهی محلی با چوب فرآوری‌شده ترمووود در شیب تند جنگلی؛ کنسول‌های عمیق چوبی برای در امان ماندن از بارش‌های بارانی شمال، بازشوهای وسیع رو به اقیانوس ابر و ثبت تصاویر واقعی اسکلت‌بندی در کارگاه.",
        "features": [
          "سایت‌پلان شیبدار و تثبیت جداره‌ها با دیوارهای حائل سنگی",
          "شومینه هیزمی سنگی به عنوان هسته حرارتی مرکزی ویلا",
          "تراس‌های معلق چوبی بر فراز شیب جنگل",
          "۳ عکس زنده و واقعی از مرحله آرماتوربندی و داربست‌بندی در کوهستان"
        ]
      },
      {
        "id": "dalkhani-forest-organic",
        "title": "ویلای ارگانیک و جنگلی دالخانی رامسر",
        "englishTitle": "Dalkhani Forest Organic Clay Villa",
        "location": "منطقه توریستی دالخانی، رامسر",
        "year": "2021",
        "area": "۴۵۰ متر مربع",
        "typology": "Residential",
        "status": "طراحی مفهومی و شیت‌های اجرایی",
        "role": "Lead Architectural Designer",
        "coverImage": "/projects/villas/dalkhani-forest-organic/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/villas/dalkhani-forest-organic/renders/sheet_01_render_01.jpg",
                  "/projects/villas/dalkhani-forest-organic/renders/sheet_01_render_02.jpg",
                  "/projects/villas/dalkhani-forest-organic/renders/sheet_02_render_01.jpg",
                  "/projects/villas/dalkhani-forest-organic/renders/sheet_03_render_01.jpg",
                  "/projects/villas/dalkhani-forest-organic/renders/sheet_03_render_02.jpg",
                  "/projects/villas/dalkhani-forest-organic/renders/sheet_04_render_01.jpg",
                  "/projects/villas/dalkhani-forest-organic/renders/sheet_05_render_01.jpg",
                  "/projects/villas/dalkhani-forest-organic/renders/sheet_05_render_02.jpg",
                  "/projects/villas/dalkhani-forest-organic/renders/sheet_06_render_01.jpg",
                  "/projects/villas/dalkhani-forest-organic/renders/sheet_06_render_02.jpg",
                  "/projects/villas/dalkhani-forest-organic/renders/sheet_07_render_01.jpg",
                  "/projects/villas/dalkhani-forest-organic/renders/sheet_07_render_02.jpg",
                  "/projects/villas/dalkhani-forest-organic/renders/sheet_08_render_01.jpg",
                  "/projects/villas/dalkhani-forest-organic/renders/sheet_09_render_01.jpg"
                ],
        "concept": "استفاده از فرم‌های منحنی ارگانیک و پوسته با بافت خاک رس طبیعی هماهنگ با بوم جنگل؛ شکستن تقارن و خلق خطوط نرم که گویی بنا به صورت طبیعی از دل خاک سر برآورده است.",
        "features": [
          "پلان سایت هماهنگ با توپوگرافی و حفظ حداکثری درختان کهنسال",
          "نماها و مقاطع مهندسی دوصفحه‌ای با ابعاد دقیق",
          "نورگیری غیرمستقیم از طریق اسکای‌لایت‌های سقفی ارگانیک",
          "پالت متریال اندود گلی-میکروسمنت و شیشه‌های فریم‌لس"
        ]
      },
      {
        "id": "tehran-dasht-villa",
        "title": "ویلای مدرن تهراندشت و مستندات بتن‌ریزی استخر",
        "englishTitle": "Tehran Dasht Villa & Pool Construction Documentation",
        "location": "تهراندشت، استان البرز",
        "year": "2020 – 2021",
        "area": "۳۸۰ متر مربع زیربنا در زمینی به وسعت ۱,۲۰۰ متر",
        "typology": "Residential",
        "status": "ساخته شده و تحویل",
        "role": "Architect & Construction Lead",
        "coverImage": "/projects/villas/tehran-dasht-villa/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/villas/tehran-dasht-villa/renders/sheet_01_render_01.jpg",
                  "/projects/villas/tehran-dasht-villa/renders/sheet_01_render_02.jpg",
                  "/projects/villas/tehran-dasht-villa/renders/sheet_01_render_03.jpg",
                  "/projects/villas/tehran-dasht-villa/renders/sheet_02_render_01.jpg",
                  "/projects/villas/tehran-dasht-villa/renders/sheet_03_render_01.jpg",
                  "/projects/villas/tehran-dasht-villa/renders/sheet_04_render_01.jpg"
                ],
        "concept": "طراحی ویلای فلت مدرن با استخر روباز چهارفصل، آفتاب‌گیرهای بتنی شناور، جداره‌های شیشه‌ای تاشو و مستندسازی دقیق بتن‌ریزی، آرماتوربندی و تاسیسات استخر در کارگاه ساختمانی.",
        "features": [
          "پلان مدرن باز (Open-Plan) با جداسازی خواب‌ها در زون خصوصی",
          "استخر روباز با سیستم تصفیه و گرمایش اختصاصی",
          "عکس‌های اجرای عملیات قالب‌بندی و بتن‌ریزی در محل کارگاه"
        ]
      },
      {
        "id": "australia-curved-residence",
        "title": "ویلای مدرن استرالیا و اقامتگاه‌های منحنی لوکس",
        "englishTitle": "Curved Villa in Australia & Organic Residences",
        "location": "استرالیا (Australia)",
        "year": "2022",
        "area": "۸۲۰ متر مربع",
        "typology": "Residential",
        "status": "طراحی و کانسپت بین‌المللی",
        "role": "Concept Architect & CGI Specialist",
        "coverImage": "/projects/villas/australia-curved-residence/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/villas/australia-curved-residence/renders/sheet_01_render_01.jpg",
                  "/projects/villas/australia-curved-residence/renders/sheet_01_render_02.jpg",
                  "/projects/villas/australia-curved-residence/renders/sheet_02_render_01.jpg",
                  "/projects/villas/australia-curved-residence/renders/sheet_02_render_02.jpg",
                  "/projects/villas/australia-curved-residence/renders/sheet_03_render_01.jpg",
                  "/projects/villas/australia-curved-residence/renders/sheet_03_render_02.jpg",
                  "/projects/villas/australia-curved-residence/renders/sheet_04_render_01.jpg",
                  "/projects/villas/australia-curved-residence/renders/sheet_05_render_01.jpg",
                  "/projects/villas/australia-curved-residence/renders/sheet_05_render_02.jpg",
                  "/projects/villas/australia-curved-residence/renders/sheet_05_render_03.jpg",
                  "/projects/villas/australia-curved-residence/renders/sheet_06_render_01.jpg",
                  "/projects/villas/australia-curved-residence/renders/sheet_06_render_02.jpg",
                  "/projects/villas/australia-curved-residence/renders/sheet_07_render_01.jpg"
                ],
        "concept": "هندسه آزاد منحنی با تراس‌های روباز هلالی و دیوارهای شیشه‌ای قوسی متناسب با اقلیم ساحلی استرالیا. استخر ارگانیک با فرم قطره آب و سایه‌بان‌های سفید مواج که خط افق اقیانوس را قاب می‌کنند.",
        "features": [
          "پلان‌های معماری با خطوط دوار و ارگونومی فوق‌العاده بالا",
          "رندرهای نور روز درخشان و بازتاب نور آب بر سقف بتنی سفید",
          "سوئیت‌های مسکونی با بالکن‌های خصوصی ۳۶۰ درجه"
        ]
      },
      {
        "id": "brutalist-cantilever-villa",
        "title": "ویلای بروتالیست بتن اکسپوز و استخر معلق شیشه‌ای",
        "englishTitle": "Brutalist Cantilever Concrete Villa & Cliff House",
        "location": "سایت صخره‌ای ساحلی",
        "year": "2021",
        "area": "۶۱۰ متر مربع",
        "typology": "Residential",
        "status": "طراحی و فرمول‌بندی کانسپت",
        "role": "Lead Conceptual Designer",
        "coverImage": "/projects/villas/brutalist-cantilever-villa/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/villas/brutalist-cantilever-villa/renders/sheet_01_render_01.jpg",
                  "/projects/villas/brutalist-cantilever-villa/renders/sheet_02_render_01.jpg",
                  "/projects/villas/brutalist-cantilever-villa/renders/sheet_03_render_01.jpg",
                  "/projects/villas/brutalist-cantilever-villa/renders/sheet_04_render_01.jpg",
                  "/projects/villas/brutalist-cantilever-villa/renders/sheet_05_render_01.jpg",
                  "/projects/villas/brutalist-cantilever-villa/renders/sheet_05_render_02.jpg",
                  "/projects/villas/brutalist-cantilever-villa/renders/sheet_06_render_01.jpg",
                  "/projects/villas/brutalist-cantilever-villa/renders/sheet_07_render_01.jpg",
                  "/projects/villas/brutalist-cantilever-villa/renders/sheet_08_render_01.jpg",
                  "/projects/villas/brutalist-cantilever-villa/renders/sheet_09_render_01.jpg"
                ],
        "concept": "شاهکار بروتالیستی با کنسول جسورانه بتنی به طول ۸ متر بر فراز پرتگاه؛ استخر شیشه‌ای کف‌شفاف معلق در فضا، تضاد شدید بافت زبر بتن تخته‌کوب با عناصر ظریف اکسنت زرد و پاویون مستقل صخره‌ای.",
        "features": [
          "تحلیل سازه‌ای کنسول بتن مسلح و کابل‌های پیش‌تنیده",
          "کف شیشه‌ای استخر با دید مستقیم به دره زیرین",
          "راه پله اکسپوز معلق با نورپردازی متمرکز"
        ]
      },
      {
        "id": "modern-villa-series",
        "title": "مجموعه ویلاهای مدرن تیپ ۰۱ تا ۰۵",
        "englishTitle": "Modern Villa Series Typology 01 to 05",
        "location": "البرز / شمال / حومه",
        "year": "2019 – 2021",
        "area": "۵ تیپ متنوع از ۳۰۰ تا ۵۵۰ متر مربع",
        "typology": "Residential",
        "status": "پکیج کامل پرزنتیشن و پلان",
        "role": "Principal Architect & Typology Researcher",
        "coverImage": "/projects/villas/modern-villa-series/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/villas/modern-villa-series/renders/sheet_01_render_01.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_02_render_01.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_03_render_01.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_04_render_01.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_05_render_01.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_05_render_02.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_06_render_01.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_06_render_02.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_07_render_01.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_07_render_02.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_08_render_01.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_08_render_02.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_09_render_01.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_10_render_01.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_11_render_01.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_12_render_01.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_13_render_01.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_14_render_01.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_15_render_01.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_16_render_01.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_17_render_01.jpg",
                  "/projects/villas/modern-villa-series/renders/sheet_18_render_01.jpg"
                ],
        "concept": "مطالعه و فرمول‌بندی ۵ تیپ ویلای مدرن با ماژول‌های کنسولی سفید، سنگ اسلب تیره، فضاهای آب‌نما، پاسیوهای درونی با درختان زیتون و باغچه‌های ذن ژاپنی جهت ارائه راهکار تیپیک به سرمایه‌گذاران شهرک‌های ویلایی.",
        "features": [
          "پکیج جامع ۱۸ شیت شامل تمامی نقشه‌ها و نماها",
          "پلان‌های مقایسه‌ای فلت، دوبلکس و تریپلکس",
          "بهینه‌سازی مصرف متریال و سرعت ساخت در مقیاس شهرک"
        ]
      }
    ]
  },
  {
    "id": "commercial-complexes",
    "categoryNumber": "03",
    "title": "مجتمع‌های تجاری، اداری، برج‌ها و مهندسی نما",
    "englishTitle": "COMMERCIAL // TOWERS & FACADE ENGINEERING",
    "description": "مجتمع تجاری-اداری فولاد شرق، دپارتمنت‌استور ارگانیک اربیل، آپارتمان‌ها و برج‌های مسکونی مدولار، نمای دروس و مسکونی دالخانی.",
    "iconName": "Building",
    "buildingType": "tower",
    "position": {
      "x": 74,
      "y": 36,
      "width": 20,
      "height": 24
    },
    "position3D": [
      4.0,
      2.5,
      -1.0
    ],
    "size3D": [
      3.2,
      5.0,
      3.2
    ],
    "buildingImage": "/projects/commercial/east-tehran-steel-complex/renders/sheet_01_render_01.jpg",
    "colorAccent": "#6366f1",
    "projects": [
      {
        "id": "east-tehran-steel-complex",
        "title": "مجتمع تجاری-اداری و انبار آهن شرق تهران",
        "englishTitle": "East Tehran Steel Commercial Complex & Logistics Hub",
        "location": "بزرگراه شهید بابایی، شرق تهران",
        "year": "2019 – 2020",
        "area": "۱۶,۵۰۰ متر مربع زیربنا",
        "typology": "Commercial",
        "status": "طراحی فاز یک و دو و تاییدیه شهرداری",
        "role": "Lead Architect & Complex Coordinator",
        "coverImage": "/projects/commercial/east-tehran-steel-complex/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/commercial/east-tehran-steel-complex/renders/sheet_01_render_01.jpg",
                  "/projects/commercial/east-tehran-steel-complex/renders/sheet_02_render_01.jpg",
                  "/projects/commercial/east-tehran-steel-complex/renders/sheet_02_render_02.jpg",
                  "/projects/commercial/east-tehran-steel-complex/renders/sheet_02_render_03.jpg",
                  "/projects/commercial/east-tehran-steel-complex/renders/sheet_02_render_04.jpg",
                  "/projects/commercial/east-tehran-steel-complex/renders/sheet_03_render_01.jpg",
                  "/projects/commercial/east-tehran-steel-complex/renders/sheet_04_render_01.jpg",
                  "/projects/commercial/east-tehran-steel-complex/renders/sheet_05_render_01.jpg",
                  "/projects/commercial/east-tehran-steel-complex/renders/sheet_06_render_01.jpg",
                  "/projects/commercial/east-tehran-steel-complex/renders/sheet_07_render_01.jpg",
                  "/projects/commercial/east-tehran-steel-complex/renders/sheet_07_render_02.jpg",
                  "/projects/commercial/east-tehran-steel-complex/renders/sheet_07_render_03.jpg"
                ],
        "concept": "طراحی جامع مجتمع چندعملکردی شامل سوله انبار آهن‌آلات، شعبه بانک، دفاتر اداری و شوروم‌های تجاری با ترکیب مدرن ورق‌های کامپوزیت متالیک خاکستری، شیشه‌های رفلکس دوجداره و فریم‌های بتن اکسپوز سفید.",
        "features": [
          "سایت‌پلان مهندسی با پیش‌بینی تردد تریلی‌های سنگین و بارانداز",
          "طراحی نمای اداری با لوورهای عمودی کنترل‌کننده نور شرق و غرب",
          "طراحی شعب بانک با استانداردهای امنیتی بالا و گاوصندوق مرکزی",
          "پکیج ۷ شیت کامل شامل تمامی نماهای شمالی، جنوبی و مقاطع"
        ],
        "bimSpecs": {
          "lodLevel": "LOD 350 Mixed-Use",
          "softwareUsed": [
            "3ds Max",
            "Revit",
            "AutoCAD",
            "V-Ray"
          ]
        }
      },
      {
        "id": "erbil-department-store",
        "title": "مرکز خرید و دپارتمنت‌استور ارگانیک اربیل",
        "englishTitle": "Erbil Department Store & Galleria // Organic Vaults",
        "location": "اربیل، کردستان عراق (Erbil, Iraq)",
        "year": "2021",
        "area": "۲۲,۰۰۰ متر مربع زیربنا در ۵ طبقه",
        "typology": "Commercial",
        "status": "طراحی کانسپت و فاز یک",
        "role": "Lead Architectural Designer",
        "coverImage": "/projects/commercial/erbil-department-store/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/commercial/erbil-department-store/renders/sheet_01_render_01.jpg",
                  "/projects/commercial/erbil-department-store/renders/sheet_01_render_02.jpg",
                  "/projects/commercial/erbil-department-store/renders/sheet_01_render_03.jpg",
                  "/projects/commercial/erbil-department-store/renders/sheet_01_render_04.jpg",
                  "/projects/commercial/erbil-department-store/renders/sheet_02_render_01.jpg",
                  "/projects/commercial/erbil-department-store/renders/sheet_03_render_01.jpg",
                  "/projects/commercial/erbil-department-store/renders/sheet_03_render_02.jpg",
                  "/projects/commercial/erbil-department-store/renders/sheet_04_render_01.jpg",
                  "/projects/commercial/erbil-department-store/renders/sheet_04_render_02.jpg",
                  "/projects/commercial/erbil-department-store/renders/sheet_04_render_03.jpg",
                  "/projects/commercial/erbil-department-store/renders/sheet_05_render_01.jpg"
                ],
        "concept": "معماری مجلل با طاق‌های قوسی پیوسته و آتریوم مرکزی عظیم؛ تلفیق المان‌های طاق و رواق خاورمیانه‌ای با تکنولوژی مدرن پوسته‌های بتن مسلح و نورپردازی کهکشانی سقف در وید چندطبقه تجاری.",
        "features": [
          "پلان‌های طبقاتی با زون‌بندی برندهای لوکس مد، هایپرمارکت و فودکورت",
          "آتریوم نورگیر بیضوی مرکزی با پله‌های برقی معلق شیشه‌ای",
          "طراحی ورودی با پرتال‌های قوسی مجسمه‌وار",
          "۵ شیت پرزنتیشن با پرسپکتیوهای باکیفیت شب و روز"
        ]
      },
      {
        "id": "mid-high-rise-collection",
        "title": "مجموعه آپارتمان‌ها و برج‌های مسکونی-تجاری مدرن",
        "englishTitle": "Mid & High-Rise Urban Residential & Mixed-Use Collection",
        "location": "تهران / کلانشهرها",
        "year": "2019 – 2022",
        "area": "پروژه‌های متعدد ۵ تا ۱۸ طبقه",
        "typology": "Residential",
        "status": "طراحی نما و تاییدیه کمیسیون نما",
        "role": "Principal Facade Designer & 3D Artist",
        "coverImage": "/projects/apartments/mid-high-rise-collection/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/apartments/mid-high-rise-collection/renders/sheet_01_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_01_render_02.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_02_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_02_render_02.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_03_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_03_render_02.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_04_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_05_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_05_render_02.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_06_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_06_render_02.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_06_render_03.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_07_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_07_render_02.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_07_render_03.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_08_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_08_render_02.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_08_render_03.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_09_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_09_render_02.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_09_render_03.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_09_render_04.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_10_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_10_render_02.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_10_render_03.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_11_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_11_render_02.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_11_render_03.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_12_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_12_render_02.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_12_render_03.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_12_render_04.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_13_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_13_render_02.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_14_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_15_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_16_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_16_render_02.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_17_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_18_render_01.jpg",
                  "/projects/apartments/mid-high-rise-collection/renders/sheet_19_render_01.jpg"
                ],
        "concept": "آرشیو جامع ۱۹ شیت از ساختمان‌های مسکونی و برج‌های چندطبقه شهری با نماهای مدولار، تراس‌های سبز پلکانی (Vertical Forest)، ترکیب سنگ سفید تراورتن با فریم‌های مشکی و نورپردازی خطی در تقاطع‌های شهری.",
        "features": [
          "طراحی و مدولاسیون نماها بر اساس ضوابط شهرداری",
          "دیتیل وال‌های سبز و فلاورباکس‌های خودآبیار در بالکن‌ها",
          "نورپردازی شبانه نمای شهری با تاکید بر خطوط افقی و عمودی",
          "تنوع تیپ‌های معماری از مدرن خطی تا نئوکلاسیک متین"
        ]
      },
      {
        "id": "darrous-residential-facade",
        "title": "پروژه طراحی و مهندسی نمای دروس (Darrous Facade 2020)",
        "englishTitle": "Darrous Residential Facade & Elevation Engineering",
        "location": "خیابان دروس، تهران",
        "year": "2020",
        "area": "نمای ساختمان ۶ طبقه مسکونی",
        "typology": "Residential",
        "status": "ساخته شده و اجرا",
        "client": "آقای قربانی (Mr. Ghorbani)",
        "role": "Lead Facade Architect & Detailing Lead",
        "coverImage": "/projects/apartments/darrous-residential-facade/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/apartments/darrous-residential-facade/renders/sheet_01_render_01.jpg",
                  "/projects/apartments/darrous-residential-facade/renders/sheet_01_render_02.jpg",
                  "/projects/apartments/darrous-residential-facade/renders/sheet_01_render_03.jpg",
                  "/projects/apartments/darrous-residential-facade/renders/sheet_02_render_01.jpg",
                  "/projects/apartments/darrous-residential-facade/renders/sheet_02_render_02.jpg",
                  "/projects/apartments/darrous-residential-facade/renders/sheet_03_render_01.jpg",
                  "/projects/apartments/darrous-residential-facade/renders/sheet_03_render_02.jpg",
                  "/projects/apartments/darrous-residential-facade/renders/sheet_04_render_01.jpg",
                  "/projects/apartments/darrous-residential-facade/renders/sheet_05_render_01.jpg",
                  "/projects/apartments/darrous-residential-facade/renders/sheet_05_render_02.jpg",
                  "/projects/apartments/darrous-residential-facade/renders/sheet_06_render_01.jpg",
                  "/projects/apartments/darrous-residential-facade/renders/sheet_06_render_02.jpg"
                ],
        "concept": "طراحی مهندسی پوسته نمای مسکونی در منطقه دروس تهران با لوورهای آفتابگیر عمودی، سنگ‌های اسلب تراورتن کرم، پنجره‌های کشویی قدی، جزئیات وال‌سفال و اجرای ورودی اختصاصی مجزای سواره و پیاده.",
        "features": [
          "۶ شیت کامل شامل نماهای مقیاس ۱:۵۰ با کد ارتفاعی",
          "شیت دیتیل‌های بزرگنمایی ۱:۲۰ شاسی‌کشی فلزی و اتصال سنگ خشک",
          "شبیه‌سازی نورپردازی شبانه با پرژکتورهای ضدخیرگی",
          "طراحی درب ورودی لابی با ورق‌های فلزی لیزرکات و دستگیره چوبی"
        ]
      },
      {
        "id": "dalkhani-terraces",
        "title": "ساختمان مسکونی تراس‌بندی شده دالخانی",
        "englishTitle": "Residential Dalkhani Terraces // Mountain Slope Apartments",
        "location": "ارتفاعات دالخانی، مازندران",
        "year": "2020",
        "area": "۳,۲۰۰ متر مربع در ۶ تراز پلکانی",
        "typology": "Residential",
        "status": "طراحی فاز یک و دو",
        "role": "Architectural & Structural Coordinator",
        "coverImage": "/projects/apartments/dalkhani-terraces/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/apartments/dalkhani-terraces/renders/sheet_01_render_01.jpg",
                  "/projects/apartments/dalkhani-terraces/renders/sheet_01_render_02.jpg",
                  "/projects/apartments/dalkhani-terraces/renders/sheet_02_render_01.jpg",
                  "/projects/apartments/dalkhani-terraces/renders/sheet_02_render_02.jpg",
                  "/projects/apartments/dalkhani-terraces/renders/sheet_03_render_01.jpg",
                  "/projects/apartments/dalkhani-terraces/renders/sheet_03_render_02.jpg",
                  "/projects/apartments/dalkhani-terraces/renders/sheet_04_render_01.jpg",
                  "/projects/apartments/dalkhani-terraces/renders/sheet_04_render_02.jpg",
                  "/projects/apartments/dalkhani-terraces/renders/sheet_05_render_01.jpg"
                ],
        "concept": "مجتمع آپارتمانی تراس‌دار کوهستانی که سقف هر طبقه به عنوان حیاط و تراس سبز واحد بالایی عمل می‌کند؛ سازگاری فرم با شیب تند طبیعی و خلق چشم‌انداز پانورامای بدون مانع برای تک‌تک واحدها.",
        "features": [
          "۵ شیت مهندسی شامل سایت‌پلان و مقاطع طولی و عرضی بر روی شیب",
          "طراحی دیوارهای حائل بتنی مسلح برای پایدارسازی زمین",
          "پلان‌های طبقاتی با تراس‌های عمیق آفتاب‌گیر"
        ]
      }
    ]
  },
  {
    "id": "retail-stores",
    "categoryNumber": "04",
    "title": "معماری داخلی، فضاهای هاسپیتالیتی و درودگری لوکس",
    "englishTitle": "INTERIOR ARCHITECTURE // LUXURY MILLWORK & HOSPITALITY",
    "description": "طراحی تخصصی آشپزخانه‌ها و دیتیل کابینت، سالن‌های نشیمن و وال‌تی‌وی، سوئیت‌های مستر و وال‌کلازت، رستوران‌ها و هاسپیتالیتی.",
    "iconName": "ShoppingBag",
    "buildingType": "retail",
    "position": {
      "x": 44,
      "y": 72,
      "width": 16,
      "height": 16
    },
    "position3D": [
      -0.5,
      0.8,
      3.2
    ],
    "size3D": [
      2.5,
      1.6,
      2.2
    ],
    "buildingImage": "/projects/interiors/kitchen-design-appliances/renders/sheet_01_render_01.jpg",
    "colorAccent": "#ec4899",
    "projects": [
      {
        "id": "kitchen-design-appliances",
        "title": "طراحی تخصصی آشپزخانه‌های لوکس و دیتیل کابینت‌ها",
        "englishTitle": "Bespoke Luxury Kitchen Design & Millwork Detailing",
        "location": "پروژه‌های شاخص تهران و شمال",
        "year": "2020 – 2022",
        "area": "۱۴ تیپ آشپزخانه مسکونی لوکس",
        "typology": "Interior",
        "status": "اجرا شده با مشخصات فنی",
        "role": "Lead Interior Architect & Millwork Specialist",
        "coverImage": "/projects/interiors/kitchen-design-appliances/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/interiors/kitchen-design-appliances/renders/sheet_01_render_01.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_01_render_02.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_01_render_03.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_02_render_01.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_02_render_02.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_02_render_03.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_03_render_01.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_04_render_01.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_05_render_01.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_05_render_02.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_05_render_03.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_05_render_04.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_06_render_01.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_07_render_01.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_07_render_02.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_07_render_03.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_07_render_04.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_08_render_01.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_08_render_02.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_08_render_03.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_09_render_01.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_10_render_01.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_10_render_02.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_10_render_03.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_11_render_01.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_11_render_02.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_12_render_01.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_13_render_01.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_14_render_01.jpg",
                  "/projects/interiors/kitchen-design-appliances/renders/sheet_14_render_02.jpg"
                ],
        "concept": "طراحی مهندسی و درودگری کابینت‌ها با دقت میلی‌متری؛ شامل پلان چیدمان، نماهای شمالی/جنوبی/شرقی/غربی یونیت‌ها، ابعاد جزیره، پالت متریال چوب گردو و سنگ طبیعی کوارتز و جانمایی تجهیزات توکار Smeg و Bosch.",
        "features": [
          "پکیج جامع ۱۴ شیت مهندسی شامل تمامی کدهای اندازه‌گذاری",
          "طراحی جزیره‌های معلق با سیستم کانتر صبحانه‌خوری پنهان",
          "نورپردازی زیرکابینتی با سنسورهای هوشمند تاچ",
          "پالت رنگی خاکستری مات، چوب طبیعی و یراق‌آلات بلوم اتریش"
        ]
      },
      {
        "id": "living-lounge-interiors",
        "title": "طراحی داخلی سالن‌های نشیمن، پنت‌هاوس و وال‌تی‌وی",
        "englishTitle": "Living Lounge, Penthouse & Bespoke TV-Wall Interiors",
        "location": "تهران / بارسلون",
        "year": "2019 – 2022",
        "area": "سالن‌های نشیمن لوکس از ۱۰۰ تا ۲۵۰ متر مربع",
        "typology": "Interior",
        "status": "ساخته شده و عکس‌های کارگاه",
        "role": "Interior Architect & Visualizer",
        "coverImage": "/projects/interiors/living-lounge-interiors/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/interiors/living-lounge-interiors/renders/sheet_01_render_01.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_01_render_02.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_01_render_03.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_02_render_01.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_02_render_02.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_03_render_01.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_03_render_02.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_04_render_01.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_04_render_02.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_05_render_01.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_05_render_02.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_05_render_03.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_06_render_01.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_06_render_02.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_06_render_03.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_07_render_01.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_07_render_02.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_08_render_01.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_09_render_01.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_10_render_01.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_11_render_01.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_11_render_02.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_11_render_03.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_12_render_01.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_12_render_02.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_12_render_03.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_13_render_01.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_14_render_01.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_14_render_02.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_14_render_03.jpg",
                  "/projects/interiors/living-lounge-interiors/renders/sheet_15_render_01.jpg"
                ],
        "concept": "آفرینش فضاهای نشیمن با شکوه با ارتفاع سقف دوبل، شومینه‌های خطی معلق، دیوارهای دکوراتیو سنگ اسلب و لوورهای چوبی عمودی؛ همراه با مستندات مراحل اجرای واقعی کارگاه درودگری.",
        "features": [
          "۱۵ شیت شامل رندرهای فوق‌واقع‌گرایانه و تصاویر اجرای زنده",
          "طراحی یونیت وال‌تی‌وی با شلف‌های فلزی مشکی و نور پس‌زمینه",
          "انتخاب مبلمان ارگونومیک برندهای مطرح ایتالیایی مینیمال",
          "ترکیب نور طبیعی روز با نورپردازی متمرکز دیمردار"
        ]
      },
      {
        "id": "master-suites-closets",
        "title": "طراحی سوئیت‌های مستر، وال‌کلازت و دیتیل درودگری",
        "englishTitle": "Master Suites, Walk-in Closets & Millwork Details",
        "location": "پنت‌هاوس‌ها و ویلاهای لوکس",
        "year": "2020 – 2022",
        "area": "سوئیت‌های مستر ۵۰ تا ۹۰ متر مربع",
        "typology": "Interior",
        "status": "اجرا شده و مستندسازی کارگاهی",
        "role": "Interior Architect & Joinery Designer",
        "coverImage": "/projects/interiors/master-suites-closets/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/interiors/master-suites-closets/renders/sheet_01_render_01.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_01_render_02.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_02_render_01.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_03_render_01.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_04_render_01.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_05_render_01.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_06_render_01.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_06_render_02.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_07_render_01.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_07_render_02.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_07_render_03.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_08_render_01.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_08_render_02.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_08_render_03.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_08_render_04.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_09_render_01.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_09_render_02.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_09_render_03.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_09_render_04.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_10_render_01.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_11_render_01.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_11_render_02.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_12_render_01.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_12_render_02.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_13_render_01.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_13_render_02.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_13_render_03.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_13_render_04.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_14_render_01.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_14_render_02.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_14_render_03.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_14_render_04.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_15_render_01.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_15_render_02.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_15_render_03.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_15_render_04.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_16_render_01.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_16_render_02.jpg",
                  "/projects/interiors/master-suites-closets/renders/sheet_16_render_03.jpg"
                ],
        "concept": "طراحی آرامش‌بخش اتاق خواب مستر، کلوزت‌روم‌های شیشه‌ای با فریم آلومینیومی آنودایز تیره، کمدهای کف تا سقف بدون دستگیره، میز آرایش یکپارچه و عکس‌های مراحل نصب چوب در محل.",
        "features": [
          "۱۶ شیت تفکیک‌شده شامل نقشه‌های تولید در کارگاه درودگری",
          "سیستم کمد شیشه‌ای با نورپردازی خطی مخفی سنسوریک",
          "حمام مستر با وان شیشه‌ای مستقل و سنگ‌های اسلب نرو مارکینا"
        ]
      },
      {
        "id": "restaurants-hospitality",
        "title": "معماری داخلی رستوران‌ها، کافی‌شاپ‌ها و هاسپیتالیتی",
        "englishTitle": "Restaurants, Cafes & Hospitality Architecture",
        "location": "مراکز تجاری و تفریحی",
        "year": "2019 – 2021",
        "area": "فضاها از ۱۸۰ تا ۸۵۰ متر مربع",
        "typology": "Hospitality",
        "status": "طراحی و اجرا",
        "role": "Hospitality Interior Architect",
        "coverImage": "/projects/interiors/restaurants-hospitality/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/interiors/restaurants-hospitality/renders/sheet_01_render_01.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_01_render_02.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_01_render_03.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_01_render_04.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_02_render_01.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_02_render_02.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_02_render_03.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_02_render_04.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_03_render_01.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_03_render_02.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_03_render_03.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_03_render_04.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_04_render_01.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_04_render_02.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_04_render_03.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_04_render_04.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_05_render_01.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_05_render_02.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_05_render_03.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_06_render_01.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_06_render_02.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_06_render_03.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_06_render_04.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_07_render_01.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_07_render_02.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_07_render_03.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_07_render_04.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_08_render_01.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_08_render_02.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_08_render_03.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_08_render_04.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_09_render_01.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_09_render_02.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_09_render_03.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_09_render_04.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_10_render_01.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_10_render_02.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_10_render_03.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_10_render_04.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_11_render_01.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_11_render_02.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_11_render_03.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_11_render_04.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_12_render_01.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_12_render_02.jpg",
                  "/projects/interiors/restaurants-hospitality/renders/sheet_12_render_03.jpg"
                ],
        "concept": "طراحی فضاهای غذاخوری لوکس، مدرن و تلفیقی؛ شامل پلان چیدمان بهینه میزها برای حداکثر ظرفیت و حفظ حریم شخصی، کانتر پذیرش و بوفه مجسمه‌وار، سقف‌های کاذب دکوراتیو چوبی و نورپردازی گرم هاسپیتالیتی.",
        "features": [
          "۱۲ شیت جامع شامل پلان‌های مبلمان و دیدهای پرسپکتیو",
          "تفکیک زون‌های VIP، نشیمن گروهی و کانتر بار",
          "طراحی جزییات صوتی و پنل‌های آکوستیک جاذب صدا"
        ]
      }
    ]
  },
  {
    "id": "institutional-competitions",
    "categoryNumber": "05",
    "title": "کاخ‌های مجلل، کانسپت‌ها و اسکیس‌های معماری",
    "englishTitle": "ARCHITECTURAL CONCEPTS & MONUMENTAL MONOGRAPHS",
    "description": "عمارت مجلل کلاسیک و کاخ مسکونی، مطالعات تیپولوژی معماری در اقلیم‌های متنوع و اسکیس‌های دستی ایده‌پردازی فرمی.",
    "iconName": "Award",
    "buildingType": "pavilion",
    "position": {
      "x": 78,
      "y": 65,
      "width": 18,
      "height": 18
    },
    "position3D": [
      4.2,
      0.8,
      2.8
    ],
    "size3D": [
      3.0,
      1.6,
      2.8
    ],
    "buildingImage": "/projects/apartments/classical-monumental-palace/renders/sheet_01_render_01.jpg",
    "colorAccent": "#f59e0b",
    "projects": [
      {
        "id": "classical-monumental-palace",
        "title": "عمارت مجلل کلاسیک و کاخ مسکونی با ستون‌های با شکوه",
        "englishTitle": "Classical Monumental Palace & Private Estate",
        "location": "لواسان / باغ‌شهر البرز",
        "year": "2020",
        "area": "۱,۴۰۰ متر مربع در محوطه‌ای به وسعت ۳,۰۰۰ متر",
        "typology": "Residential",
        "status": "طراحی کانسپت و رندرهای نور روز",
        "role": "Monumental Architect & 3D Visualizer",
        "coverImage": "/projects/apartments/classical-monumental-palace/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/apartments/classical-monumental-palace/renders/sheet_01_render_01.jpg",
                  "/projects/apartments/classical-monumental-palace/renders/sheet_01_render_02.jpg",
                  "/projects/apartments/classical-monumental-palace/renders/sheet_01_render_03.jpg",
                  "/projects/apartments/classical-monumental-palace/renders/sheet_02_render_01.jpg",
                  "/projects/apartments/classical-monumental-palace/renders/sheet_03_render_01.jpg",
                  "/projects/apartments/classical-monumental-palace/renders/sheet_04_render_01.jpg",
                  "/projects/apartments/classical-monumental-palace/renders/sheet_05_render_01.jpg"
                ],
        "concept": "طراحی عمارت مجلل مسکونی با الهام از تقارن و تناسبات طلایی معماری کلاسیک؛ ستون‌های کورینتی، رواق‌های قوسی باشکوه، سنتوری‌های حجاری‌شده سنگی، آب‌نمای مرکزی محوطه و کالبد متین و ماندگار.",
        "features": [
          "۵ شیت پرزنتیشن با پرسپکتیوهای دید پرنده و پرسپکتیو ناظر",
          "سایت‌پلان متقارن باغ فرانسوی با محور آب‌نما و مجسمه‌های سنگی",
          "جزئیات سرستون‌ها و تراشکاری سنگ‌های نمای عمارت"
        ]
      },
      {
        "id": "architectural-typologies",
        "title": "مطالعات تطبیقی تیپولوژی‌های معماری در اقلیم‌های گوناگون",
        "englishTitle": "Comparative Architectural Typologies // Resorts & Cabins",
        "location": "اقلیم‌های کوهستانی، جنگلی و ساحلی",
        "year": "2019 – 2021",
        "area": "پژوهش گونه‌شناسی معماری",
        "typology": "Concept",
        "status": "پژوهش و توسعه کانسپت",
        "role": "Typology Researcher & Designer",
        "coverImage": "/projects/concepts/architectural-typologies/renders/sheet_01_render_01.jpg",
        "gallery": [
                            "/projects/concepts/architectural-typologies/renders/sheet_01_render_01.jpg",
                  "/projects/concepts/architectural-typologies/renders/sheet_01_render_02.jpg",
                  "/projects/concepts/architectural-typologies/renders/sheet_01_render_03.jpg",
                  "/projects/concepts/architectural-typologies/renders/sheet_01_render_04.jpg",
                  "/projects/concepts/architectural-typologies/renders/sheet_02_render_01.jpg",
                  "/projects/concepts/architectural-typologies/renders/sheet_02_render_02.jpg",
                  "/projects/concepts/architectural-typologies/renders/sheet_02_render_03.jpg",
                  "/projects/concepts/architectural-typologies/renders/sheet_02_render_04.jpg",
                  "/projects/concepts/architectural-typologies/renders/sheet_03_render_01.jpg",
                  "/projects/concepts/architectural-typologies/renders/sheet_03_render_02.jpg",
                  "/projects/concepts/architectural-typologies/renders/sheet_03_render_03.jpg",
                  "/projects/concepts/architectural-typologies/renders/sheet_04_render_01.jpg",
                  "/projects/concepts/architectural-typologies/renders/sheet_04_render_02.jpg",
                  "/projects/concepts/architectural-typologies/renders/sheet_04_render_03.jpg",
                  "/projects/concepts/architectural-typologies/renders/sheet_05_render_01.jpg",
                  "/projects/concepts/architectural-typologies/renders/sheet_05_render_02.jpg",
                  "/projects/concepts/architectural-typologies/renders/sheet_05_render_03.jpg",
                  "/projects/concepts/architectural-typologies/renders/sheet_05_render_04.jpg"
                ],
        "concept": "مطالعه تطبیقی شیوه‌های استقرار اقامتگاه‌های مدرن در اقلیم‌های گوناگون؛ تحلیل پاسخ معماری به رطوبت شمال، سرمای کوهستان و آفتاب داغ جنوب با فرم‌های بهینه‌سازی‌شده و پایداری کالبدی.",
        "features": [
          "۵ شیت تحلیلی شامل دیاگرام‌های باد، خورشید و مصالح بومی",
          "طراحی مدول‌های پیش‌ساخته اقامتی برای مناطق دوردست طبیعت"
        ]
      },
      {
        "id": "concept-sketches-watercolors",
        "title": "اسکیس‌های دستی و ایده‌پردازی‌های فرمی معماری",
        "englishTitle": "Hand Sketches, Ideation & Architectural Concept Watercolors",
        "location": "آتلیه طراحی معماری",
        "year": "2018 – 2022",
        "area": "ایده‌پردازی اولیه فرم",
        "typology": "Concept",
        "status": "طرح‌های دست‌آزاد و کروکی",
        "role": "Architectural Concept Artist",
        "coverImage": "/projects/concepts/sketches-watercolors/renders/sheet_01_render_01.jpg",
        "gallery": [
          "/projects/concepts/sketches-watercolors/renders/sheet_01_render_01.jpg",
          "/projects/concepts/sketches-watercolors/renders/sheet_01_render_02.jpg",
          "/projects/concepts/sketches-watercolors/renders/sheet_01_render_03.jpg",
          "/projects/concepts/sketches-watercolors/renders/sheet_02_render_01.jpg",
          "/projects/concepts/sketches-watercolors/renders/sheet_02_render_02.jpg",
          "/projects/concepts/sketches-watercolors/renders/sheet_02_render_03.jpg"
        ],
        "concept": "نمایش ریشه‌های تفکر معماری از طریق کروکی‌های دست‌آزاد، خطوط پویا و راندوهای آبرنگی که نخستین جرقه‌های خلق فرم و فضاهای معمارانه را شکل داده‌اند.",
        "features": [
          "۲ شیت پرزنتیشن عریض از اسکیس‌های مفهومی و ژوژمان‌ها",
          "ترکیب خطوط پرسپکتیو با بافت‌های رنگی و آنالیز بصری"
        ]
      }
    ]
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  "studioName": "BIMCO STUDIO BARCELONA",
  "studioTagline": "COMPUTATIONAL ARCHITECTURE & BIM LEADERSHIP // BARCELONA",
  "backgroundImageUrl": "/projects/villas/violet-villa/renders/sheet_01_render_01.jpg",
  "maquetteStyle": "clay-white",
  "activeView": "3d",
  "soundEnabled": true
};
