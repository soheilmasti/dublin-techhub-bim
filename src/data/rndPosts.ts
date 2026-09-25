export interface RndPost {
  id: string;
  slug: string;
  title: string;
  titleFa: string;
  category: 'revit-api' | 'dynamo' | 'ai-aec' | 'grasshopper' | 'webgl';
  categoryLabel: string;
  categoryLabelFa: string;
  date: string;
  version: string;
  status: 'Production' | 'Open Source' | 'Research Prototype' | 'Private Beta';
  statusFa: 'عملیاتی و آماده' | 'متن‌باز' | 'نمونه اولیه پژوهشی' | 'بتا اختصاصی';
  author: string;
  techStack: string[];
  summary: string;
  summaryFa: string;
  metrics: {
    label: string;
    labelFa: string;
    value: string;
  }[];
  challenge: string;
  challengeFa: string;
  solution: string;
  solutionFa: string;
  keyFeatures: string[];
  keyFeaturesFa: string[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  repoUrl?: string;
  demoUrl?: string;
}

export const RND_POSTS: RndPost[] = [
  {
    id: 'rnd-00',
    slug: 'archiq-ai-architectural-consultant-revit',
    title: 'ArchIQ: AI-Powered Architectural Consultant & Multi-Regional Code Compliance Plugin for Autodesk Revit',
    titleFa: 'آرک‌آی‌کیو (ArchIQ): دستیار هوش مصنوعی و بازرس خودکار ضوابط معماری و مقررات ملی در رویت',
    category: 'revit-api',
    categoryLabel: 'Revit API & AI Compliance',
    categoryLabelFa: 'پلاگین رویت و هوش مصنوعی',
    date: '2026',
    version: 'v1.0 (Revit 2024 / 2025 / 2026)',
    status: 'Open Source',
    statusFa: 'متن‌باز',
    author: 'Soheil Masti',
    techStack: [
      'C# .NET 8 / .NET 4.8',
      'Autodesk Revit API (2024-2026)',
      'Google Gemini AI (RAG)',
      'Catalonia Decret 141/2012',
      'Spanish CTE DB-SUA / DB-SI',
      'Iran Building Codes (مبحث ۴)',
      'WPF MVVM'
    ],
    summary: 'An intelligent, interactive architectural consultant directly inside Autodesk Revit. Combines deep Revit API parameter extraction with Google Gemini AI and RAG memory to automatically audit rooms and spaces against regional building regulations (Catalonia Decret 141/2012, Spanish CTE, and Iran Building Codes), featuring an in-canvas AI chat and automated memory logging.',
    summaryFa: 'دستیار هوشمند و تعاملی معماری مستقر در محیط اتودسک رویت؛ ترکیب استخراج عمیق داده‌های رویت با هوش مصنوعی جمینای (Gemini AI) و فناوری RAG جهت بازرسی خودکار فضاها بر اساس ضوابط منطقه‌ای (مقررات مسکن کاتالونیا Decret 141/2012، مبحث ۴ مقررات ملی ساختمان و استانداردهای CTE اسپانیا) به همراه چت تعاملی و ثبت شناسنامه پروژه.',
    metrics: [
      { label: 'Audit Speedup', labelFa: 'افزایش سرعت بررسی ضوابط', value: '-94%' },
      { label: 'Revit Versions', labelFa: 'نسخه‌های پشتیبانی‌شده رویت', value: '2024-2026' },
      { label: 'Regional Standards', labelFa: 'کدهای مقرراتی تحت پوشش', value: 'Catalonia / CTE / مبحث ۴' }
    ],
    challenge: 'Architectural code compliance checking in BIM is traditionally a slow, fragmented manual process. Architects must manually calculate room net areas, glazing daylight ratios, ventilation quotas, and minimum ceiling heights across hundreds of spaces, leading to costly permit rejections or late-stage redesigns.',
    challengeFa: 'بررسی انطباق نقشه‌ها با ضوابط ساختمانی و شهرسازی معمولاً فرآیندی دستی، خسته‌کننده و مستعد خطا است. معماران باید مساحت خالص، نسبت بازشو و نورگیری به کف، ارتفاع مفید سقف و ابعاد خالص صدها اتاق را یک‌به‌یک با آیین‌نامه‌ها مطابقت دهند که اغلب منجر به رد نقشه‌ها در نظام مهندسی یا شهرداری‌ها می‌شود.',
    solution: 'Developed ArchIQ as a native C# Revit Add-in. The engine extracts geometry, spatial boundaries, and glazing parameters from Revit Rooms, checks them against mathematical rule sets (Catalonia Decret 141/2012, Spanish CTE, and Iranian National Codes), and feeds structured room metadata into a Google Gemini AI engine. Architects can converse with the AI in natural language to query non-compliant rooms, receive recommendations, and export automated compliance reports.',
    solutionFa: 'توسعه پلاگین بومی سی‌شارپ ArchIQ برای رویت؛ این موتور هندسه، مرز فضایی و بازشوهای پنجره را از اتاق‌های رویت استخراج کرده و به صورت خودکار با جداول استاندارد کاتالونیا (Decret 141/2012)، کد CTE اسپانیا و الزامات مبحث ۴ مقایسه می‌کند. همچنین با اتصال به هوش مصنوعی گوگل جمینای، معمار می‌تواند به زبان طبیعی با پروژه گفتگو کند و راه‌حل‌های اصلاحی فوری دریافت نماید.',
    keyFeatures: [
      'Single-click native installers for Autodesk Revit 2024, 2025, and 2026',
      'Automated audit of ceiling heights, minimum living/bedroom areas, and daylight glazing ratios',
      'RAG-powered conversational AI chat for architectural queries directly inside Revit UI',
      'Multi-regional regulatory support: Catalonia (Decret 141/2012), Spanish CTE, and National Building Codes',
      'Automatic local project memory generation (ArchIQ_Memory_[ProjectName].md)'
    ],
    keyFeaturesFa: [
      'نصب‌کننده خودکار و مستقل برای نسخه‌های رویت ۲۰۲۴، ۲۰۲۵ و ۲۰۲۶',
      'کنترل آنی حداقل مساحت اتاق‌ها، ارتفاع مفید سقف و نسبت مساحت بازشو به کف',
      'چت تعاملی مبتنی بر هوش مصنوعی جمینای (RAG) درون محیط رویت',
      'پشتیبانی از مقررات چندمنطقه‌ای: کاتالونیا (Decret 141/2012)، اسپانیا (CTE) و مبحث ۴ مقررات ملی',
      'تولید خودکار سند حافظه پروژه (ArchIQ_Memory_[ProjectName].md) برای شفافیت کامل'
    ],
    codeSnippet: {
      language: 'csharp',
      filename: 'CataloniaRegulations.cs',
      code: `// ArchIQ - Regulatory Thresholds for Catalonia & Regional Code Evaluation
public static class CataloniaRegulations
{
    public const double MinCeilingHeightHabitableM = 2.50; // Decret 141/2012
    public const double MinCeilingHeightServiceM = 2.20;
    public const double MinLightingGlazingRatio = 0.125;   // 1/8 of room area (12.5%)
    public const double MinVentilationRatio = 0.0416;       // 1/24 of room area

    public const double MinLivingRoomAreaM2 = 14.0;
    public const double MinLivingKitchenAreaM2 = 20.0;
    public const double MinDoubleBedroomAreaM2 = 8.0;
    public const double MinSingleBedroomAreaM2 = 6.0;

    public static List<ComplianceItem> EvaluateRoom(RoomData room)
    {
        var results = new List<ComplianceItem>();
        // Evaluates room spatial envelope, fenestration & ceiling heights in Revit
        // Ingested by Gemini RAG context for in-canvas interactive consultation
        return results;
    }
}`
    },
    repoUrl: 'https://github.com/soheilmasti/ArchiIQ',
    demoUrl: 'https://raw.githubusercontent.com/soheilmasti/ArchiIQ/main/Releases/ArchIQ_Full_Package.zip'
  },
  {
    id: 'rnd-01',
    slug: 'autoclash-revit-navisworks-clustering',
    title: 'AutoClash: Spatial Clustering & Multi-Discipline Resolution Engine',
    titleFa: 'اتوکِلش (AutoClash): موتور خوشه‌بندی فضایی و دسته‌بندی خودکار تداخلات در رویت و ناویزورکس',
    category: 'revit-api',
    categoryLabel: 'Revit API & Plugins',
    categoryLabelFa: 'پلاگین و API رویت',
    date: '2026',
    version: 'v2.4 Enterprise',
    status: 'Production',
    statusFa: 'عملیاتی و آماده',
    author: 'Soheil Masti',
    techStack: ['C# .NET 8', 'Autodesk Revit API', 'Navisworks XML', 'Spatial KD-Tree', 'WPF MVVM'],
    summary: 'Custom C# Revit add-in that clusters raw clash detection matrices from Navisworks into localized spatial zones, eliminating 80% of duplicate clash noise and auto-routing assignments to discipline leads.',
    summaryFa: 'پلاگین اختصاصی سی‌شارپ برای رویت که هزاران تداخل خام استخراج‌شده از ناویزورکس را بر اساس مجاورت هندسی خوشه‌بندی کرده و وظیفه رفع تداخل را بر اساس اولویت فنی به طراحان سازه، معماری یا تاسیسات تخصیص می‌دهد.',
    metrics: [
      { label: 'Coordination Time Saved', labelFa: 'صرفه‌جویی در زمان هماهنگی', value: '-65%' },
      { label: 'Clash Noise Reduction', labelFa: 'کاهش خطاهای تکراری', value: '82%' },
      { label: 'Processed Elements', labelFa: 'المان‌های بررسی‌شده در هر پروژه', value: '50,000+' }
    ],
    challenge: 'Large multi-disciplinary BIM projects routinely yield 2,000+ individual clash instances in Navisworks. Over 70% of these are repetitive geometric touches caused by a single MEP pipe piercing consecutive structural elements or ceiling grids, overwhelming BIM managers with manual report sorting.',
    challengeFa: 'پروژه‌های بزرگ و پیچیده BIM معمولاً بیش از ۲,۰۰۰ نقطه برخورد در ناویزورکس تولید می‌کنند که بیش از ۷۰٪ آن‌ها صرفاً تکرار برخورد یک لوله تاسیساتی با لایه‌های مختلف یک سقف یا دیوار است و زمان زیادی از مدیران BIM تلف می‌کند.',
    solution: 'Engineered a spatial KD-Tree clustering algorithm within a native Revit C# ExternalCommand. The tool ingests Navisworks XML reports, merges contiguous collisions within a 1.2m spherical threshold, identifies the root offending element, and generates targeted viewpoint cameras inside Revit with pre-filled BCF metadata.',
    solutionFa: 'طراحی الگوریتم خوشه‌بندی درختی (KD-Tree) در قالب یک افزونه C# رویت که فایل خروجی ناویزورکس را تحلیل کرده، تداخل‌های مجاور در شعاع ۱.۲ متری را ادغام می‌کند، عنصر ریشه‌ای را تشخیص داده و دیدهای سه‌بعدی اختصاصی با شناسنامه BCF در رویت تولید می‌کند.',
    keyFeatures: [
      'Automated batch grouping of adjacent pipe/duct penetrations',
      'One-click creation of Section Boxes and 3D Viewpoints in Revit',
      'Integration with ISO 19650 Common Data Environment workflows',
      'Direct BCF 3.0 export for Autodesk Construction Cloud (ACC)'
    ],
    keyFeaturesFa: [
      'گروه‌بندی خودکار عبور لوله‌ها و کانال‌های تاسیساتی مجاور',
      'ایجاد خودکار باکس‌های برش (Section Box) و دیدهای سه‌بعدی در رویت',
      'هماهنگی کامل با فرآیندهای مدیریت داده طبق استاندارد ISO 19650',
      'خروجی مستقیم با فرمت BCF 3.0 برای پلتفرم Autodesk ACC'
    ],
    codeSnippet: {
      language: 'csharp',
      filename: 'AutoClashClusterEngine.cs',
      code: `// Custom Revit ExternalCommand for Spatial Clustering
[Transaction(TransactionMode.Manual)]
public class AutoClashClusterCommand : IExternalCommand
{
    public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
    {
        var doc = commandData.Application.ActiveUIDocument.Document;
        var clashPoints = ParseNavisworksXml("ClashReport.xml");
        
        // KD-Tree Spatial Clustering within 1.2m radius
        var clusters = SpatialClusterEngine.GroupProximity(clashPoints, radiusMeters: 1.2);
        
        using (var trans = new Transaction(doc, "Generate Clash Views"))
        {
            trans.Start();
            foreach (var cluster in clusters)
            {
                View3D clashView = View3D.CreateIsometric(doc, GetIsometricFamilyId(doc));
                clashView.SetSectionBox(cluster.ComputeBoundingBox(expansionMargin: 0.5));
                clashView.Name = $"CLASH-{cluster.Discipline}-{cluster.Id:D4}";
            }
            trans.Commit();
        }
        return Result.Succeeded;
    }
}`
    }
  },
  {
    id: 'rnd-02',
    slug: 'dynamocore-batch-floor-generator',
    title: 'DynamoCore: Batch Floor Plate & Net-to-Gross Area Optimization',
    titleFa: 'دایناموکور (DynamoCore): پکیج اتوماسیون تولید دال طبقات و محاسبه سطوح خالص/ناخالص',
    category: 'dynamo',
    categoryLabel: 'Dynamo BIM Automation',
    categoryLabelFa: 'اتوماسیون داینامو و پایتون',
    date: '2025',
    version: 'v3.1 Open Source',
    status: 'Open Source',
    statusFa: 'متن‌باز',
    author: 'Soheil Masti',
    techStack: ['Dynamo 2.19+', 'IronPython', 'Revit API', 'Geometric Boolean Operations', 'Excel Interop'],
    summary: 'Automated Dynamo workflow for residential towers and mixed-use blocks that projects massing boundaries into structural floor slabs, calculates net internal area (NIA) ratios, and flags regulatory compliance.',
    summaryFa: 'فرآیند خودکارسازی در محیط داینامو برای برج‌های مسکونی و تجاری که خطوط مرزی احجام اولیه را به کف‌های سازه‌ای تبدیل کرده و ضرایب سطح خالص به ناخالص و انطباق با ضوابط ساختمانی را در لحظه محاسبه می‌کند.',
    metrics: [
      { label: 'Design Iteration Speed', labelFa: 'سرعت آزمون طرح‌های اولیه', value: '10x Faster' },
      { label: 'Area Calculation Accuracy', labelFa: 'دقت محاسبات متراژ', value: '99.9%' },
      { label: 'Time per 40-Storey Tower', labelFa: 'زمان مدل‌سازی یک برج ۴۰ طبقه', value: '< 90 seconds' }
    ],
    challenge: 'During concept and schematic design of high-rise developments, architects must test dozens of floor plate variations. Manually drawing and assigning floor profiles across 30+ levels takes days and leads to discrepancies in room scheduling and area efficiency tables.',
    challengeFa: 'در مراحل اولیه طراحی برج‌ها، آزمودن فرم‌های مختلف و محاسبه متراژ مفید طبقات به صورت دستی روزها زمان می‌برد و هر تغییر جزئی در پوسته نیازمند بازترسیم دال‌ها و جداول متراژ بود.',
    solution: 'Built a modular Dynamo node package with embedded Python scripts. It takes mass surfaces or CAD boundary curves, slices them at specified storey heights, creates Revit floor elements with correct structural build-ups, and populates live shared parameter schedules.',
    solutionFa: 'توسعه یک پکیج گره‌های داینامو همراه با اسکریپت‌های پایتون درون‌برنامه‌ای که پوسته‌ها را بر اساس کدهای ارتفاعی برش زده، کف‌های سازه‌ای رویت را ایجاد کرده و پارامترهای مشترک متراژ مفید را پر می‌کند.',
    keyFeatures: [
      'Multi-level floor slab generation in seconds from mass surfaces',
      'Dynamic Net Internal Area (NIA) vs Gross Internal Area (GIA) calculation',
      'Automated Revit room bounding and tag placement',
      'Direct sync with ISO 19650 naming parameters'
    ],
    keyFeaturesFa: [
      'تولید خودکار دال تمامی طبقات ظرف چند ثانیه بر اساس احجام مفهومی',
      'محاسبه بلادرنگ نسبت مساحت مفید (NIA) به مساحت کل زیربنا (GIA)',
      'تعیین خودکار مرزهای فضاها (Rooms) و جانمایی تگ‌های نام‌گذاری',
      'همگام‌سازی مستقیم با استانداردهای نام‌گذاری بین‌المللی'
    ],
    codeSnippet: {
      language: 'python',
      filename: 'BatchFloorGenerator.py',
      code: `# Dynamo Python Script: Generating Revit Floors from Mass Contours
import clr
clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import *

clr.AddReference('RevitServices')
import RevitServices
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager

doc = DocumentManager.Instance.CurrentDBDocument
levels = IN[0]
curve_loops = IN[1]
floor_type_id = IN[2]

TransactionManager.Instance.EnsureInTransaction(doc)
created_floors = []

for level, loop in zip(levels, curve_loops):
    revit_level = UnwrapElement(level)
    revit_curve_loop = CurveLoop()
    for c in loop:
        revit_curve_loop.Append(c.ToRevitType())
    
    # Modern Revit API Floor.Create method
    floor = Floor.Create(doc, [revit_curve_loop], floor_type_id, revit_level.Id)
    created_floors.append(floor)

TransactionManager.Instance.TransactionTaskDone()
OUT = created_floors`
    }
  },
  {
    id: 'rnd-03',
    slug: 'solarmorph-kinetic-facade-optimization',
    title: 'SolarMorph: Evolutionary Multi-Objective Kinetic Louver Optimization',
    titleFa: 'سولار‌مورف (SolarMorph): الگوریتم بهینه‌سازی چندهدفه لوورهای خورشیدی و پوسته‌های پارامتریک',
    category: 'grasshopper',
    categoryLabel: 'Parametric & Grasshopper',
    categoryLabelFa: 'طراحی محاسباتی و گرس‌هاپر',
    date: '2025',
    version: 'v1.8 Research',
    status: 'Research Prototype',
    statusFa: 'نمونه اولیه پژوهشی',
    author: 'Soheil Masti',
    techStack: ['Rhino 8', 'Grasshopper', 'Ladybug Tools', 'Octopus Genetic Solver', 'Python'],
    summary: 'Computational facade framework using genetic algorithms to balance natural daylight penetration against peak solar heat gain coefficient (SHGC) for energy-efficient commercial envelopes.',
    summaryFa: 'چارچوب محاسباتی نمای ساختمان با استفاده از الگوریتم‌های ژنتیک برای ایجاد تعادل ایده‌آل میان ورود نور طبیعی روز و کاهش بار سرمایشی ناشی از تابش مستقیم آفتاب در اقلیم‌های مدیترانه‌ای و اروپایی.',
    metrics: [
      { label: 'Cooling Energy Reduction', labelFa: 'کاهش بار سرمایشی تابستان', value: '-34%' },
      { label: 'Useful Daylight Illuminance', labelFa: 'افزایش نور مفید روز', value: '+46%' },
      { label: 'Fabrication Unrolling', labelFa: 'خروجی برش لیزری قطعات', value: '100% Automated' }
    ],
    challenge: 'Glazed office envelopes frequently suffer from glare and excessive solar heat gain in warm seasons, requiring heavy mechanical air-conditioning. Static sunshades often over-block light in winter while failing to shade low-angle summer rays.',
    challengeFa: 'نماهای شیشه‌ای مدرن در فصل تابستان به شدت گرما جذب کرده و مصرف انرژی سیستم‌های سرمایشی را افزایش می‌دهند، در حالی که سایبان‌های سنتی و ثابت مانع استفاده بهینه از نور خورشید در زمستان می‌شوند.',
    solution: 'Designed an algorithmic loop linking Grasshopper parametric geometry with Ladybug climate EPW data and Octopus SPEA-2 genetic optimization. The system tests thousands of louver angle/depth combinations to discover the Pareto-optimal frontier.',
    solutionFa: 'پیاده‌سازی یک چرخه الگوریتمی میان فرم پارامتریک گرس‌هاپر، اطلاعات اقلیمی شبیه‌سازی Ladybug و الگوریتم تکاملی Octopus برای یافتن بهترین زوایا و عمق سایبان‌ها در جبهه‌های مختلف نما.',
    keyFeatures: [
      'Multi-objective Pareto-front optimization (Daylight vs Thermal Load)',
      'Automated panel rationalization into standardized manufacturing sizes',
      'Live sun-vector tracking and shadow volume visualization',
      'Direct export of fabrication DXF files and Revit Adaptive Components'
    ],
    keyFeaturesFa: [
      'بهینه‌سازی چندهدفه پارتو (تعادل روشنایی طبیعی در برابر بار حرارتی)',
      'مدولارسازی و استانداردسازی ابعاد پنل‌ها برای کاهش هزینه‌های ساخت',
      'رهگیری زنده بردارهای تابش خورشید و ترسیم سایه‌های هم‌زمان',
      'خروجی مستقیم فایل‌های ساخت (DXF) و فمیلی‌های انطباقی رویت'
    ]
  },
  {
    id: 'rnd-04',
    slug: 'sitevision-ai-drone-defect-detection',
    title: 'SiteVision-AI: Drone Photogrammetry to IFC Rebar & Tolerance Inspection',
    titleFa: 'سایت‌ویژن (SiteVision-AI): پردازش تصویر پهپاد و تطبیق هوشمند آرماتوربندی با مدل IFC',
    category: 'ai-aec',
    categoryLabel: 'AI & Computer Vision',
    categoryLabelFa: 'هوش مصنوعی و بینایی ماشین در ساخت',
    date: '2026',
    version: 'v0.9 Beta',
    status: 'Private Beta',
    statusFa: 'بتا اختصاصی',
    author: 'Soheil Masti',
    techStack: ['Python 3.11', 'PyTorch', 'YOLOv8', 'OpenCV', 'OpenBIM / IFC.js', 'WebRTC'],
    summary: 'Neural network pipeline that detects reinforcement bar pitch tolerances and structural cast anomalies from high-resolution site photography, automatically tagging discrepancies onto the BIM model.',
    summaryFa: 'خط لوله یادگیری عمیق (Deep Learning) که تصاویر ارسالی از کارگاه ساختمانی را تحلیل کرده، فواصل و ضخامت آرماتورها را با تلورانس‌های آیین‌نامه‌ای مقایسه نموده و موارد عدم انطباق را به مدل BIM متصل می‌نماید.',
    metrics: [
      { label: 'Pitch Deviation Accuracy', labelFa: 'دقت تشخیص انحراف ابعادی', value: '± 2.5 mm' },
      { label: 'Site Inspection Speed', labelFa: 'افزایش سرعت بازرسی کارگاهی', value: '4.5x' },
      { label: 'Automated BCF Issues', labelFa: 'تولید خودکار گزارش‌های BCF', value: '100%' }
    ],
    challenge: 'Quality assurance of rebar spacing and formwork alignment on construction sites requires hours of dangerous manual measuring by field engineers, with paper reports frequently disconnected from the central Revit/IFC digital twin.',
    challengeFa: 'کنترل کیفیت فاصله آرماتورها و قالب‌بندی در کارگاه ساختمانی ساعت‌ها زمان مهندسین را می‌گیرد و گزارش‌های کاغذی معمولاً با مدل دیجیتال مرکزی هماهنگ نمی‌شوند.',
    solution: 'Trained a specialized YOLOv8 object-detection and segmentation model on 15,000 annotated rebar tie photos. Combined with camera extrinsics and IFC coordinate registration, the system superimposes target geometry onto reality-capture frames and generates cloud BCF 3.0 issues.',
    solutionFa: 'آموزش یک شبکه عصبی کانولوشنال بر روی ۱۵ هزار تصویر کارگاهی برای تشخیص قطعات فولادی و تطبیق آن‌ها با مختصات مدل سه‌بعدی IFC، که مغایرت‌ها را مستقیماً به صورت ایشوهای BCF ثبت می‌کند.',
    keyFeatures: [
      'Sub-centimeter rebar pitch and cover measurement',
      'Automated cloud BCF issue generation with annotated screenshots',
      'Direct compatibility with OpenBIM IFC 4x3 digital twins',
      'Edge-device ready for real-time mobile and drone tablet operation'
    ],
    keyFeaturesFa: [
      'اندازه‌گیری میلی‌متری فواصل آرماتورها و پوشش بتن (کاور)',
      'ایجاد خودکار ایشوهای ابری BCF همراه با تصاویر حاشیه‌نویسی‌شده',
      'سازگاری کامل با استانداردهای آزاد OpenBIM و فرمت IFC',
      'قابلیت اجرا روی تبلت‌های کارگاهی و پردازش تصاویر پروازی'
    ]
  },
  {
    id: 'rnd-05',
    slug: 'aec-canvas-3d-webgl-engine',
    title: 'AEC-Canvas 3D: Ultra-Lightweight Architectural WebGL Digital Twin Engine',
    titleFa: 'ای‌سی‌سی کانواس سه‌بعدی (AEC-Canvas 3D): موتور فوق‌سبک وب‌جی‌ال برای نمایش ماکت و دیجیتال توئین در مرورگر',
    category: 'webgl',
    categoryLabel: 'WebGL & Digital Twins',
    categoryLabelFa: 'دوقلوی دیجیتال و WebGL',
    date: '2026',
    version: 'v4.0 Production',
    status: 'Production',
    statusFa: 'عملیاتی و آماده',
    author: 'Soheil Masti',
    techStack: ['Three.js', 'React Three Fiber (R3F)', 'Custom PBR Shaders', 'GLSL', 'TypeScript', 'Web Workers'],
    summary: 'The proprietary 3D engine powering bimco.es: renders complex masterplans with photorealistic architectural clay, real-time daylight casting, and zone inspection with zero browser plugins.',
    summaryFa: 'موتور اختصاصی رندرینگ سه‌بعدی وب‌سایت bimco.es که امکان مرور تعاملی مسترپلن‌های شهری و ماکت‌های معماری را با متریال‌های فیزیکی PBR و نورپردازی شب و روز بدون نیاز به هیچ افزونه‌ای فراهم می‌سازد.',
    metrics: [
      { label: 'Target Frame Rate', labelFa: 'نرخ فریم روان در موبایل و دسکتاپ', value: '60 FPS' },
      { label: 'Initial Geometry Bundle', labelFa: 'حجم بارگذاری اولیه مدل', value: '< 2.8 MB' },
      { label: 'Shader Pass Time', labelFa: 'زمان رندر شیدرهای روشنایی', value: '< 16 ms' }
    ],
    challenge: 'Traditional 3D architectural viewer tools (like Autodesk Viewer or large game engine exports) require heavy downloads, loading times exceeding 30 seconds, and run sluggishly on client laptops and mobile phones.',
    challengeFa: 'نمایش‌دهنده‌های متداول فایل‌های سه‌بعدی معماری نیاز به حجم دانلود سنگین و زمان لود طولانی دارند و روی لپ‌تاپ‌های معمولی یا تلفن‌های همراه با افت فریم شدید مواجه می‌شوند.',
    solution: 'Architected an ultra-lean Three.js pipeline using progressive LOD polygon decimation, Draco compression, instanced mesh rendering for urban trees and street furniture, and a custom atmospheric scattering shader.',
    solutionFa: 'معماری یک پایپ‌لاین بسیار بهینه در Three.js با استفاده از فشرده‌سازی دراکو، رندرینگ نمونه‌ای (Instancing) و شیدرهای بهینه‌سازی‌شده برای دستیابی به حداکثر کیفیت بصری با حداقل حجم ممکن.',
    keyFeatures: [
      'Progressive geometry streaming with Draco mesh compression',
      'Realistic architectural clay and illuminated night PBR modes',
      'Integrated solar vector positioning for accurate seasonal shadows',
      'Full TypeScript typing and React lifecycle bindings'
    ],
    keyFeaturesFa: [
      'لود تدریجی مدل با فشرده‌سازی پیشرفته دراکو',
      'حالت‌های بصری متنوع از جمله ماکت گچی معماری و دید شب با نورهای نقطه‌ای',
      'شبیه‌سازی بردار تابش خورشید برای نمایش سایه‌های واقعی در ساعات مختلف',
      'کدنویسی کاملاً ماژولار و تایپ‌سیف در تایپ‌اسکریپت و ری‌اکت'
    ]
  }
];
