import { CategoryBuilding, ResumeProfile, SiteSettings } from '../types';

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
  bio: 'معمار ارشد و متخصص BIM با بیش از ۱۵ سال تجربه بین‌المللی در هدایت، طراحی و اجرای پروژه‌های مسکونی لوکس، مجموعه‌های تجاری و زیرساخت‌های کلان شهری در اروپا و خاورمیانه. تسلط جامع بر تمام چرخه‌های حیات پروژه از فاز کانسپت و پیش‌طرح (Anteproyecto) تا مدارک فنی اجرایی (Proyecto Básico y de Ejecución) و نظارت عالیه کارگاهی، به همراه رهبری فرآیندهای پیشرفته مدلسازی اطلاعات ساختمان (BIM LOD 350/400) و رفع تداخلات تاسیسات و سازه.',
  education: [
    {
      degree: 'کارشناسی ارشد معماری (M.Arch.)',
      university: 'دانشگاه آزاد اسلامی تهران مرکزی',
      year: '2011 – 2013 (1390 – 1392)',
      location: 'تهران، ایران'
    },
    {
      degree: 'کارشناسی معماری (B.Arch.)',
      university: 'دانشگاه پیام نور بندرعباس',
      year: '2006 – 2010 (1385 – 1389)',
      location: 'بندرعباس، ایران'
    }
  ],
  experience: [
    {
      role: 'معمار ارشد و سرپرست BIM (Lead Architect & BIM Specialist)',
      company: 'Gaam Studio',
      period: '2020 – تاکنون (Jan 2020 – Present)',
      location: 'بارسلون، اسپانیا (Barcelona, Spain)',
      highlights: [
        'هدایت طراحی معماری، فرآیندهای پیشرفته BIM (LOD 350) و تدوین مدارک اجرایی کامل در بیش از ۲۰ واحد مسکونی، ۴ مجموعه تجاری و ۶ فضای خرده‌فروشی لوکس.',
        'پروژه‌های مسکونی Ando و Lumen (۲۰۲۱–۲۰۲۲): بازطراحی کامل ساختار فضایی، طراحی دیتیل‌های چوبی و مجوزهای شهرداری بارسلون.',
        'پروژه مسکونی دربندسر (Darbandsara 2021): طراحی معماری، ترکیب سازه پیچیده بتنی و دیتیل‌های ویژه اقلیم کوهستانی آلپاین.',
        'اجرای ماتریس هماهنگی چندرشته‌ای سازه و تاسیسات (MEP/Structure) جهت Clash-Detection خودکار قبل از ورود به کارگاه.'
      ]
    },
    {
      role: 'معمار ارشد و سرپرست تیم طراحی (Senior Architect & Design Team Lead)',
      company: 'Fanoos Langargah',
      period: '2015 – 2019 (1394 – 1398)',
      location: 'تهران / جنوب ایران',
      highlights: [
        'مدیریت تیم طراحی در تحویل ۷ پروژه مسکونی، ۵ ساختمان اداری و ۳ مجموعه درمانی تخصصی از فاز صفر تا اجرا.',
        'پروژه‌های مسکونی نور و احسان (Noora & Ehsan): طراحی پکیج مهندسی نما، سازمان‌دهی فضایی و نقشه‌های فاز دو.',
        'توسعه کانسپت تجاری خرده‌فروشی و استراتژی‌های نورپردازی معماری.',
        'کسب رتبه‌های برتر در مسابقات معماری و طراحی شهری.'
      ]
    },
    {
      role: 'مدیرعامل و سرپرست پروژه‌ها (Managing Director & Project Lead)',
      company: 'شرکت مهندسی دیوار و سقف (Wall & Saghf Co.)',
      period: '2013 – 2015 (1392 – 1394)',
      location: 'ایران',
      highlights: [
        'مجتمع تجاری بزرگ بندرعباس (۵۲,۰۰۰ متر مربع): هدایت کامل فرآیند معماری، طراحی پوسته و نما برای کارفرما فرزاد وطن‌خواه.',
        'استقرار پروتکل‌های کنترل کیفیت (QA/QC) و برنامه‌ریزی نظارت دوره‌ای ساختمانی.'
      ]
    },
    {
      role: 'معمار و ناظر مقیم کارگاه (Architect & Site Supervisor)',
      company: 'معمار سازه پارسیان و ره‌پویان M.T.',
      period: '2011 – 2013 (1390 – 1392)',
      location: 'بندرعباس / رودان',
      highlights: [
        'مجتمع تجاری و اداری رودان: معمار مسئول برنامه‌ریزی عملکردی و مدارک فنی سازه.',
        'سایت‌پلان و زیرساخت بندرگاهی جدید بندرعباس: تدوین فاز صفر فنی، زون‌بندی و راهبردهای طراحی کلان سایت.',
        'نظارت کارگاهی بر مجتمع‌های مسکونی آسمان (۳۸ واحد) و گلشهر (۱۲ واحد).'
      ]
    },
    {
      role: 'مدرس نرم‌افزارهای تخصصی معماری و BIM',
      company: 'طرح و توسعه / آتلیه پانتا',
      period: '2010 – 2018',
      location: 'مراکز آموزش عالی و آتلیه‌های حرفه‌ای',
      highlights: [
        'آموزش دوره‌های حرفه‌ای Autodesk Revit Architecture, AutoCAD, SketchUp, 3ds Max, V-Ray, Lumion.'
      ]
    }
  ],
  competencies: [
    {
      category: 'BIM و مدلسازی پارامتریک',
      skills: ['Autodesk Revit (Advanced Families, LOD 300/400)', 'AutoCAD 2D/3D', 'ArchiCAD', 'Rhino', 'Parametric BIM Workflows', 'Clash Detection']
    },
    {
      category: 'مدارک اجرایی و استانداردها',
      skills: ['نقشه‌های فاز ۲ اجرایی (Proyecto de Ejecución)', 'متره و برآورد (BOQ)', 'مقررات ملی و استانداردهای اروپایی (CTE)', 'دیتیل‌های سازه و نما']
    },
    {
      category: 'رندرینگ و پرزنتیشن',
      skills: ['3ds Max', 'V-Ray Rendering', 'Lumion Architecture', 'Artlantis Studio', 'Adobe Photoshop / InDesign', 'Three.js / Web Presentation']
    },
    {
      category: 'مدیریت و نظارت کارگاهی',
      skills: ['هماهنگی MEP / سازه / معماری', 'نظارت مقیم کارگاه', 'کنترل کیفیت QA/QC', 'مذاکره و تحویل پروژه به کارفرما']
    }
  ],
  awards: [
    {
      title: 'مسابقه طراحی ساختمان مرکزی سازمان نظام مهندسی هرمزگان',
      year: '2012',
      rank: 'مقام دوم مسابقه (سرپرست تیم طراحی)'
    },
    {
      title: 'مسابقه طراحی سردر ورودی شهرک سپاد مشهد',
      year: '2013',
      rank: 'طرح فینالیست برگزیده (Finalist)'
    },
    {
      title: 'مسابقه طراحی المان فانوس دریایی بندرعباس',
      year: '2014',
      rank: 'طرح برگزیده جهت اجرا (Selected Scheme)'
    },
    {
      title: 'عضو کمیسیون زیباسازی شهری',
      year: '2011',
      rank: 'سازمان مسکن و شهرسازی'
    }
  ],
  references: [
    {
      name: 'Farzad Vatankhah (فرزاد وطن‌خواه)',
      role: 'کارفرمای مجتمع‌های تجاری و مسکونی فانوس لنگرگاه',
      quote: '«سهیل معمار بسیار باهوش، خلاق و آینده‌نگر است. او تمامی قابلیت‌هایی که یک معمار برجسته برای سودآوری و موفقیت چشمگیر یک پروژه نیاز دارد را داراست. متعهد، سخت‌کوش و عمیقاً عاشق حرفه‌اش است.»'
    },
    {
      name: 'Reza Amirizadeh (رضا امیری‌زاده)',
      role: 'مدیرعامل شرکت معمار سازه',
      quote: '«سهیل در پروژه‌های معماری بسیار تیزبین و جزئیات‌محور است. تجربیات غنی او دیدگاهی منحصر‌به‌فرد به وی داده و در مسابقات معماری همواره طرح‌های پیشرو و برنده خلق می‌کند.»'
    },
    {
      name: 'Majid Niroomandi (مجید نیرومندی)',
      role: 'مدیرعامل شرکت AP Logistic Europe',
      quote: '«معماری متین، خلاق و با بینش روشن. او همیشه راه‌های نوآورانه برای حل چالش‌های طراحی می‌یابد و به صورت بی‌نقص با متدولوژی‌های بین‌المللی هماهنگ است.»'
    }
  ]
};

export const INITIAL_CATEGORIES: CategoryBuilding[] = [
  {
    id: 'urban-design',
    categoryNumber: '01',
    title: 'طراحی شهری، بنادر و زیرساخت کلان',
    englishTitle: 'URBAN DESIGN // MASTERPLANNING & PORTS',
    description: 'طراحی کلان سایت‌پلان‌های شهری، جزایر توسعه ساحلی بندرعباس، پل‌های ارتباطی کابلی، شبکه‌بندی پیاده‌محور و فضاهای پایدار شهری.',
    iconName: 'Compass',
    buildingType: 'urban-bridge',
    position: { x: 50, y: 38, width: 22, height: 20 },
    position3D: [0, 1.2, -3.5],
    size3D: [6.5, 2.5, 4.0],
    buildingImage: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    colorAccent: '#0ea5e9',
    projects: [
      {
        id: 'bandar-coastal-masterplan',
        title: 'طراحی شهری و سایت‌پلان توسعه ساحلی بندرعباس',
        englishTitle: 'Bandar Abbas Coastal City & Port Masterplan',
        location: 'بندرعباس، خلیج فارس',
        year: '2016 – 2021',
        area: '۳۴۰ هکتار محدوده ساحلی و جزایر توسعه',
        typology: 'Urban Design',
        status: 'طراحی و کانسپت',
        role: 'Lead Urban Designer & Masterplanner',
        coverImage: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'طراحی شهری پایدار ساحلی با ایجاد کانال‌های آبی، جزایر مسکونی و تجاری متصل با پل‌های معلق، خط آسمان مدرن و بلوار پیاده‌محور در امتداد دریا جهت کاهش اثرات زیست‌محیطی و پیشگیری از گسترش بی‌رویه شهر (Urban Sprawl).',
        features: [
          'سایت‌پلان ۳۴۰ هکتاری با زون‌بندی تخصصی تجاری، توریستی و مسکونی',
          'پل‌های اتصالی کابلی و پیاده‌راه‌های ساحلی متصل به مارینا',
          'شبکه حمل‌ونقل پایدار و بهینه‌سازی جریان بادهای ساحلی خلیج فارس',
          'پلازاهای عمومی چندسطحی و اسکله قایقرانی'
        ],
        bimSpecs: {
          lodLevel: 'LOD 300 (Civil & Infrastructure)',
          softwareUsed: ['Autodesk Revit', 'AutoCAD Civil', 'Rhino', 'Lumion', '3ds Max']
        }
      },
      {
        id: 'bandar-port-infrastructure',
        title: 'زیرساخت بندرگاهی و گمرکات جدید بندرعباس',
        englishTitle: 'New Bandar Abbas Port & Customs Infrastructure',
        location: 'بندرعباس',
        year: '2012 – 2013',
        area: '۱۸۰,۰۰۰ متر مربع',
        typology: 'Urban Design',
        status: 'ساخته شده',
        role: 'Site Zoning & Master Layout Strategist',
        coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'مطالعات فاز صفر، زون‌بندی امنیتی و طرح راهبردی دسترسی‌های لجستیک بندر و ساختمان‌های گمرک با رویکرد پدافند غیرعامل و سرعت ترانزیت کالا.',
        features: ['تفکیک ترافیک سنگین کانتینری از دسترسی‌های اداری', 'پوسته مقاوم در برابر رطوبت و نمک شدید دریایی']
      }
    ]
  },
  {
    id: 'residential-luxury',
    categoryNumber: '02',
    title: 'پروژه‌های مسکونی لوکس و پنت‌هاوس‌ها',
    englishTitle: 'RESIDENTIAL // LUXURY HOUSES & PENTHOUSES',
    description: 'طراحی داخلی و معماری ویلاها، آپارتمان‌های مینیمال و پنت‌هاوس‌های لوکس در بارسلون، دربندسر، تهران و بندرعباس با تاکید بر دیتیلینگ چوب، بتن اکسپوز و نورپردازی پنهان.',
    iconName: 'Home',
    buildingType: 'villa',
    position: { x: 24, y: 58, width: 18, height: 18 },
    position3D: [-4.5, 1.2, 2.0],
    size3D: [3.2, 2.4, 3.2],
    buildingImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    colorAccent: '#3b82f6',
    projects: [
      {
        id: 'residential-darbandsara',
        title: 'پروژه مسکونی و پنت‌هاوس دربندسر',
        englishTitle: 'Residential Darbandsara Alpine Luxury Penthouse',
        location: 'دربندسر، تهران (Darbandsara, Tehran)',
        year: '2021 (1401)',
        area: '420 متر مربع',
        typology: 'Residential',
        status: 'ساخته شده',
        role: 'Lead Architect & Technical Detailing',
        coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'ادغام بتن اکسپوز، سنگ طبیعی و پنجره‌های وسیع پانوراما رو به قله‌های برفی دربندسر؛ شومینه معلق معمارانه، مبلمان ارگانیک و فضایی مینیمال برای اقامت کوهستانی لوکس.',
        features: ['پنجره‌های کشویی بدون فریم با دید ۳۶۰ درجه به کوهستان', 'شومینه معلق خطی در قلب سالن اصلی', 'سیستم گرمایش از کف یکپارچه زیر سنگ میکروسمنت'],
        bimSpecs: {
          lodLevel: 'LOD 350 Detailed Joinery',
          softwareUsed: ['Revit', '3ds Max', 'V-Ray', 'AutoCAD']
        }
      },
      {
        id: 'residential-ando',
        title: 'پروژه مسکونی و پنت‌هاوس آندو',
        englishTitle: 'Residential Ando Luxury Apartment',
        location: 'بارسلون / تهران (Barcelona / Tehran)',
        year: '2022 (1402)',
        area: '310 متر مربع',
        typology: 'Residential',
        status: 'ساخته شده',
        role: 'Gaam Studio // Principal Architect',
        coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'ترکیب خلوص مینیمالیستی تادائو آندو با دیوارهای پنل‌بندی شده خاکستری مات، مبلمان ارگونومیک، نورپردازی خطی مخفی با دمای کلوین گرم و آثار هنری اکسپرسیونیستی.',
        features: ['یونیت تلویزیون معلق با سنگ اسلب و نور بک‌لایت طلایی', 'آشپزخانه مینیمال یکپارچه با جزیره سفید و متریال ضدخش', 'پلان باز با تعریف حریم‌های فضایی بدون دیوار صلب'],
        bimSpecs: {
          lodLevel: 'LOD 350',
          softwareUsed: ['Revit BIM', 'Lumion', 'Photoshop']
        }
      },
      {
        id: 'residential-lumen',
        title: 'پروژه مسکونی و لابی لومن',
        englishTitle: 'Residential Lumen Grand Lobby & Residences',
        location: 'بارسلون / تهران (Barcelona / Tehran)',
        year: '2021 (1403)',
        area: '850 متر مربع (لابی و واحدهای مسکونی)',
        typology: 'Residential',
        status: 'ساخته شده',
        role: 'Gaam Studio // Architectural Lead',
        coverImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'ورودی با ارتفاع سقف دوگانه (Double-Height Lobby) با لوورهای عمودی چوب طبیعی، کانتر پذیرش مجسمه‌وار، و نشیمن‌های مینیمال در امتداد باغچه شیشه‌ای حیاط.',
        features: ['لوورهای چوب آکوستیک عمودی ضد رطوبت', 'نورپردازی اسپات‌لایت مینیمال ضدخیرگی', 'کف سرامیک پرسلان قطع بزرگ ۱۲۰×۲۸۰']
      },
      {
        id: 'residential-arghavan',
        title: 'پروژه مسکونی ارغوان',
        englishTitle: 'Residential Arghavan Luxury Residence',
        location: 'تهران',
        year: '2020 (1401)',
        area: '380 متر مربع',
        typology: 'Residential',
        status: 'ساخته شده',
        role: 'Lead Architect',
        coverImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'طراحی کتابخانه نیم‌دایره منحنی پانوراما با نیمکت یکپارچه رو به نورگیر، شومینه سنگ ماربل سیاه و درب‌های فرانسوی شیشه‌ای.',
        features: ['کتابخانه کرو دست‌ساز با شیشه‌های دودی و فریم فلزی مشکی', 'سالن غذاخوری با نورپردازی متمرکز مدرن']
      },
      {
        id: 'residential-royal',
        title: 'پروژه مسکونی رویال',
        englishTitle: 'Residential Royal Penthouse',
        location: 'تهران',
        year: '2020 (1400)',
        area: '290 متر مربع',
        typology: 'Residential',
        status: 'ساخته شده',
        role: 'Senior Architect',
        coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'ترکیب لوکس سفید و سنگ Nero Marquina با خطوط نوری ممتد و آشپزخانه جزیره‌ای پیوسته به فضای تراس.',
        features: ['جزیره آشپزخانه چندعملکردی با سینک مخفی و کانتر صبحانه‌خوری']
      },
      {
        id: 'residential-noora',
        title: 'پروژه مسکونی نور و نورا',
        englishTitle: 'Residential Noora & Ehsan',
        location: 'تهران',
        year: '2019 (1399)',
        area: '340 متر مربع',
        typology: 'Residential',
        status: 'ساخته شده',
        role: 'Fanoos Langargah // Design Team Lead',
        coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'سالن غذاخوری دو طبقه با اسکای‌لایت سقفی، پورتال‌های معماری به رنگ آبی کبالت و مبلمان مجسمه‌گونه مدرن.',
        features: ['نورگیر سقفی شیبدار جهت انتقال نور مستقیم به عمق پلان', 'طراحی درگاه‌های فضایی اکسنت']
      },
      {
        id: 'residential-no10',
        title: 'پروژه مسکونی شماره ۱۰',
        englishTitle: 'Residential No.10 Urban Living',
        location: 'تهران',
        year: '2019 (1399)',
        area: '260 متر مربع',
        typology: 'Residential',
        status: 'ساخته شده',
        role: 'Design Lead',
        coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'طراحی داخلی مونوکروم و تیره‌رنگ با شلف‌های فلزی با نور پس‌زمینه و صندلی‌های شیشه‌ای ترنسپرنت فیلیپ استارک.',
        features: ['سیستم شلفینگ مدولار متصل به سقف با نور بک‌لایت خطی']
      },
      {
        id: 'residential-aram',
        title: 'پروژه مسکونی و بازسازی آشپزخانه آرام',
        englishTitle: 'Residential Aram Kitchen & Living Transformation',
        location: 'تهران',
        year: '2018 (1396)',
        area: '210 متر مربع',
        typology: 'Residential',
        status: 'ساخته شده',
        role: 'Architect & Execution Supervisor',
        coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'تغییر کامل ساختار پلان و تخریب دیوارهای مزاحم برای خلق جزیره آشپزخانه معلق دوطرفه از جنس چوب بلوط و کوارتز خاکستری مات (Before & After Transformation).',
        features: ['کانتر صبحانه‌خوری کنسول‌شده بدون پایه', 'کابینت‌های کف تا سقف بدون دستگیره']
      },
      {
        id: 'residential-no4',
        title: 'پروژه مسکونی شماره ۴',
        englishTitle: 'Residential No.4 Duplex Living',
        location: 'تهران',
        year: '2016 (1396)',
        area: '320 متر مربع (دوبلکس)',
        typology: 'Residential',
        status: 'ساخته شده',
        role: 'Architectural Designer',
        coverImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'نشیمن فرورفته (Sunken Pit)، نرده‌های شیشه‌ای فریم‌لس در وید دوبلکس و یونیت تلویزیون شناور با شلف‌های نورپردازی شده.',
        features: ['نشیمن گودافتاده با صندلی‌های پارچه‌ای سفارشی', 'آینه دکوراتیو گرد برنز']
      },
      {
        id: 'residential-bandar-abbas',
        title: 'پروژه مسکونی و پنت‌هاوس بندرعباس',
        englishTitle: 'Residential Bandar Abbas Sunset Penthouse',
        location: 'بندرعباس (Bandar Abbas)',
        year: '2017 (1401)',
        area: '280 متر مربع',
        typology: 'Residential',
        status: 'ساخته شده',
        role: 'Lead Architect',
        coverImage: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'طراحی با دیوار شیشه‌ای سرتاسری رو به غروب خلیج فارس، نورپردازی کف‌تاب گرم و ترکیب مبلمان چرم ایتالیایی.',
        features: ['نورپردازی خطی افقی زیر کنسول تلویزیون', 'دید بدون مانع به افق دریا']
      }
    ]
  },
  {
    id: 'commercial-complexes',
    categoryNumber: '03',
    title: 'مجتمع‌های تجاری، اداری و برج‌ها',
    englishTitle: 'COMMERCIAL // TOWERS & MEGA STRUCTURES',
    description: 'هدایت و طراحی مجتمع‌های تجاری مقیاس بزرگ تا ۵۲,۰۰۰ متر مربع، ساختمان‌های اداری مدرن و مراکز چندمنظوره.',
    iconName: 'Building',
    buildingType: 'tower',
    position: { x: 74, y: 36, width: 20, height: 24 },
    position3D: [4.0, 2.5, -1.0],
    size3D: [3.2, 5.0, 3.2],
    buildingImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    colorAccent: '#6366f1',
    projects: [
      {
        id: 'bandar-commercial-complex',
        title: 'مجتمع تجاری بزرگ بندرعباس (۵۲,۰۰۰ متر مربع)',
        englishTitle: 'Bandar Abbas Commercial Complex (52,000 m²)',
        location: 'بندرعباس، بلوار اصلی',
        year: '2014 – 2015',
        area: '۵۲,۰۰۰ متر مربع',
        typology: 'Commercial',
        status: 'ساخته شده',
        client: 'Farzad Vatankhah (فرزاد وطن‌خواه)',
        role: 'Managing Director & Project Lead // Wall & Saghf Co.',
        coverImage: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'مجتمع تجاری شاخص جنوب با پوسته دولایه و لوورهای سایه‌انداز برای کنترل دمای کویری، آتریوم شیشه‌ای مرکزی ۵ طبقه و پارکینگ طبقاتی هوشمند.',
        features: [
          'زیربنای ۵۲ هزار متر مربع شامل ۶ طبقه تجاری، فودکورت و فضاهای تفریحی',
          'طراحی نمای پوسته دوپوسته (Double-Skin Facade) عایق حرارت',
          'نظارت کارگاهی و کنترل کیفیت مصالح QA/QC'
        ],
        bimSpecs: {
          lodLevel: 'LOD 400 (Fabrication & Execution)',
          softwareUsed: ['Autodesk Revit', 'AutoCAD', 'Navisworks Clash-Detection', '3ds Max']
        }
      },
      {
        id: 'roudan-commercial',
        title: 'مجتمع تجاری و اداری رودان',
        englishTitle: 'Roudan Commercial & Administrative Complex',
        location: 'هرمزگان، رودان',
        year: '2012 – 2013',
        area: '14,500 متر مربع',
        typology: 'Commercial',
        status: 'ساخته شده',
        role: 'Lead Architect & Structural Integration',
        coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'ساماندهی دفاتر اداری دولتی و واحدهای تجاری در دو بلوک متصل با حیاط میانی اقلیمی و تهویه طبیعی بادگیرها.',
        features: ['پلان ماژولار اداری با قابلیت تغییر ابعاد واحدها', 'دسترسی مجزا برای ارباب‌رجوع و کارکنان']
      },
      {
        id: 'dublin-techhub-bim',
        title: 'برج اداری و فناوری ۷ طبقه دوبلین (BIM Audit LOD 350)',
        englishTitle: 'Dublin Tech Hub 7-Story Tower & BIM Audit',
        location: 'دوبلین، ایرلند (Dublin, Ireland)',
        year: '2023 – 2024',
        area: '۱۲,۴۰۰ متر مربع',
        typology: 'Commercial',
        status: 'طراحی و کانسپت',
        role: 'Senior Architect & Lead BIM Specialist',
        coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'برج مدرن تجاری-اداری ۷ طبقه در دوبلین با رویکرد معماری پایدار و استانداردهای پیشرفته مدلسازی اطلاعات ساختمان (LOD 350)، دیتاسنتر اختصاصی، فضاهای کار اشتراکی و سیستم تهویه هوشمند.',
        features: [
          'طراحی ۷ طبقه اداری با کرتین‌وال آکوستیک دوجداره و هسته بتنی',
          'مدلسازی جامع سازه و تاسیسات (MEP/Structure) جهت رفع تداخلات Clash Detection',
          'دیتاسنتر هوشمند زیرساختی و ایستگاه‌های کاری ارگونومیک مانیتور دوگانه',
          'بهینه‌سازی انرژی با استاندارد BREEAM Excellent'
        ],
        bimSpecs: {
          lodLevel: 'LOD 350 / 400 Parametric Families',
          softwareUsed: ['Autodesk Revit', 'Navisworks', 'Rhino', 'V-Ray', 'Enscape']
        }
      }
    ]
  },
  {
    id: 'retail-stores',
    categoryNumber: '04',
    title: 'فروشگاه‌های کانسپت و فضاهای تجاری مدرن',
    englishTitle: 'RETAIL // CONCEPT STORES & SHOWROOMS',
    description: 'معماری و طراحی داخلی فروشگاه‌های تخصصی مانند اپل استور با قفسه‌بندی‌های چوبی دست‌ساز، استندهای نوری و تجربه خرید تعاملی.',
    iconName: 'ShoppingBag',
    buildingType: 'retail',
    position: { x: 44, y: 72, width: 16, height: 16 },
    position3D: [-0.5, 0.8, 3.2],
    size3D: [2.5, 1.6, 2.2],
    buildingImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    colorAccent: '#ec4899',
    projects: [
      {
        id: 'apple-store-concept',
        title: 'پروژه تجاری و شوروم اپل استور',
        englishTitle: 'Apple Store & Digital Tech Concept Store',
        location: 'تهران (Tehran)',
        year: '2015 (1396)',
        area: '190 متر مربع',
        typology: 'Retail',
        status: 'ساخته شده',
        role: 'Retail Interior Architect',
        coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'طراحی استندهای چوبی یکپارچه با جعبه‌های نور مخفی، دیوار اختصاصی نمایش لوازم جانبی با هندسه منظم، کانترهای آموزش مشتری و کالبد مینیمال متناسب با استانداردهای خرده‌فروشی جهانی.',
        features: [
          'میزهای مشاور چوب سالید طبیعی با پریزهای توکار مخفی',
          'دیوار پگ‌بورد اکسسوری با نورپردازی متمرکز بالای هر آیتم',
          'میز پذیرش با چوب گرم در برابر دیوارهای بتن مات'
        ]
      }
    ]
  },
  {
    id: 'institutional-competitions',
    categoryNumber: '05',
    title: 'مسابقات معماری و پروژه‌های عمومی',
    englishTitle: 'COMPETITIONS // AWARDS & INSTITUTIONAL',
    description: 'طرح‌های برگزیده در مسابقات ملی معماری، ساختمان مرکزی سازمان نظام مهندسی، سردر شهری سپاد، فانوس دریایی و سالن همایش‌های شیلات.',
    iconName: 'Award',
    buildingType: 'pavilion',
    position: { x: 78, y: 65, width: 18, height: 18 },
    position3D: [4.2, 0.8, 2.8],
    size3D: [3.0, 1.6, 2.8],
    buildingImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    colorAccent: '#f59e0b',
    projects: [
      {
        id: 'hormozgan-engineering-hq',
        title: 'ساختمان مرکزی سازمان نظام مهندسی هرمزگان (مقام دوم مسابقه)',
        englishTitle: 'Hormozgan Engineering Organization HQ Competition',
        location: 'بندرعباس',
        year: '2012',
        area: '8,200 متر مربع',
        typology: 'Public & Cultural',
        status: 'مسابقه و جایزه',
        role: 'Team Lead & Principal Designer',
        coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'ترکیب هندسه مدرن با المان‌های اقلیمی بومی جنوب ایران (سایه‌بان‌های مشبک شناور و شوادان) که موفق به کسب رتبه دوم در میان ده‌ها آتلیه برجسته کشوری گردید.',
        features: ['برنده رتبه دوم مسابقه معماری رسمی', 'پوسته متخلخل تهویه غیرفعال خورشیدی']
      },
      {
        id: 'bandar-lighthouse',
        title: 'المان و پاویون فانوس دریایی بندرعباس (طرح برگزیده)',
        englishTitle: 'Bandar Abbas Lighthouse Architectural Scheme',
        location: 'نوار ساحلی خلیج فارس، بندرعباس',
        year: '2014',
        area: '450 متر مربع',
        typology: 'Public & Cultural',
        status: 'مسابقه و جایزه',
        role: 'Selected Scheme // Team Lead',
        coverImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'نشانه شاخص شهری (Landmark) با تلفیق فرم بادگیرهای سنتی هرمزگان و پرتوهای نور لیزری مدرن به عنوان نماد خوش‌آمدگویی دریانوردان.',
        features: ['سازه فلزی اسپیس‌فریم با روکش کامپوزیت سفید مات', 'سکوی تماشای پانوراما خلیج فارس']
      },
      {
        id: 'sapad-gateway',
        title: 'سردر ورودی مجموعه سپاد مشهد (طرح فینالیست)',
        englishTitle: 'Sapad Entrance Gateway Architectural Competition',
        location: 'مشهد',
        year: '2013',
        area: 'Gate & Plaza',
        typology: 'Public & Cultural',
        status: 'مسابقه و جایزه',
        role: 'Finalist Award',
        coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=80'
        ],
        concept: 'دروازه ورودی شهری با هندسه پارامتریک و ایجاد دهانه‌ای با شکوه برای هدایت ترافیک سواره و پیاده به شهرک گردشگری سپاد.',
        features: ['دهانه کنسولی بدون ستون میانی', 'نورپردازی تعاملی شبانه']
      }
    ]
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  studioName: 'SOHEIL MASTI',
  studioTagline: 'SENIOR ARCHITECT & BIM SPECIALIST // BARCELONA & TEHRAN',
  backgroundImageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1920&q=80',
  maquetteStyle: 'clay-white',
  activeView: '3d',
  soundEnabled: true
};
