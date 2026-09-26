import os
import glob
from PIL import Image, ImageDraw, ImageFont
import fitz # PyMuPDF

TARGET_W = 1920
TARGET_H = 1080
PAGE_W = 960
PAGE_H = 1080

PUBLIC_DIR = r'c:\Users\Soheil\Documents\Apply\Website Memari\public'
BASE_IMG_DIR = r'C:\Users\Soheil\Pictures\Siavash_Categorized'
LOGO_PATH = os.path.join(PUBLIC_DIR, 'logo.png')
logo_img = Image.open(LOGO_PATH).convert('RGBA')

def get_font(size, bold=False):
    font_file = r'C:\Windows\Fonts\segoeuib.ttf' if bold else r'C:\Windows\Fonts\segoeui.ttf'
    if not os.path.exists(font_file):
        font_file = r'C:\Windows\Fonts\arialbd.ttf' if bold else r'C:\Windows\Fonts\arial.ttf'
    return ImageFont.truetype(font_file, size)

def apply_bimco_framing(
    canvas, 
    vol_title,
    project_code, 
    category_title, 
    project_title, 
    page_left_num, 
    page_right_num, 
    total_pages,
    brief_text="", 
    technical_specs=""
):
    draw = ImageDraw.Draw(canvas)
    
    # 1. TOP HEADER BAR
    draw.rectangle([0, 0, TARGET_W, 72], fill=(16, 22, 28))
    draw.line([(0, 72), (TARGET_W, 72)], fill=(45, 60, 72), width=1)
    
    # Left Header: Logo + Studio Barcelona
    sm_logo = logo_img.resize((48, 48), Image.Resampling.LANCZOS)
    canvas.paste(sm_logo, (35, 12), sm_logo)
    
    draw.text((95, 27), "BIMCO STUDIO BARCELONA", fill=(255, 255, 255), font=get_font(15, bold=True), anchor="lm")
    draw.text((95, 48), f"{vol_title.upper()}  •  BARCELONA, SPAIN", fill=(194, 125, 83), font=get_font(11, bold=True), anchor="lm")
    
    # Center Header: Project Identification
    draw.line([(460, 20), (460, 52)], fill=(55, 70, 80), width=1)
    draw.text((485, 27), f"[{project_code}]  {category_title.upper()}", fill=(140, 165, 180), font=get_font(11, bold=True), anchor="lm")
    draw.text((485, 48), f"{project_title.upper()}", fill=(240, 245, 250), font=get_font(13, bold=True), anchor="lm")
    
    # Right Header: Co-Authorship & Principals
    draw.text((TARGET_W - 35, 27), "SOHEIL MASTI  •  SIAVASH PAZOOKI", fill=(255, 255, 255), font=get_font(13, bold=True), anchor="rm")
    draw.text((TARGET_W - 35, 48), "PROJECT DIRECTORS & PRINCIPALS  |  BARCELONA", fill=(170, 185, 195), font=get_font(11), anchor="rm")
    
    # 2. BOTTOM TECHNICAL RUNNING FOOTER
    draw.rectangle([0, TARGET_H - 46, TARGET_W, TARGET_H], fill=(16, 22, 28))
    draw.line([(0, TARGET_H - 46), (TARGET_W, TARGET_H - 46)], fill=(45, 60, 72), width=1)
    
    # Left footer: Studio Location & Direct Contact
    draw.text((35, TARGET_H - 24), "BARCELONA, SPAIN  •  TEL: +34 610 855 434  •  WWW.BIMCO.IR", fill=(130, 150, 160), font=get_font(11), anchor="lm")
    
    # Center footer: Technical Services
    draw.text((TARGET_W // 2, TARGET_H - 24), "ARCHITECTURAL DESIGN  |  BIM LOD 350 AUDIT  |  EXECUTIVE SUPERVISION", fill=(194, 125, 83), font=get_font(11, bold=True), anchor="mm")
    
    # Page Numbers on Left & Right Margins
    draw.text((120, TARGET_H - 24), f"PAGE {page_left_num:02d}", fill=(255, 255, 255), font=get_font(11, bold=True), anchor="rm")
    draw.text((TARGET_W - 35, TARGET_H - 24), f"PAGE {page_right_num:02d} / {total_pages}", fill=(255, 255, 255), font=get_font(11, bold=True), anchor="rm")
    
    # 3. ANTI-PLAGIARISM / AUTHENTICITY STAMPS
    draw.rectangle([35, 85, 210, 115], fill=(24, 32, 40, 210), outline=(50, 68, 82), width=1)
    draw.text((45, 100), "VERIFIED BIMCO SHEET", fill=(194, 125, 83), font=get_font(9, bold=True), anchor="lm")
    draw.text((200, 100), "BCN", fill=(120, 140, 150), font=get_font(9, bold=True), anchor="rm")

    draw.rectangle([TARGET_W - 210, 85, TARGET_W - 35, 115], fill=(24, 32, 40, 210), outline=(50, 68, 82), width=1)
    draw.text((TARGET_W - 200, 100), "© 2026 BIMCO BARCELONA", fill=(194, 125, 83), font=get_font(9, bold=True), anchor="lm")
    draw.text((TARGET_W - 45, 100), "SPAIN", fill=(120, 140, 150), font=get_font(9, bold=True), anchor="rm")

    # Brief Overlay
    if brief_text:
        cw, ch = 520, 65
        cx, cy = 35, TARGET_H - 120
        draw.rectangle([cx, cy, cx + cw, cy + ch], fill=(22, 28, 35, 240), outline=(55, 75, 90), width=1)
        draw.text((cx + 12, cy + 18), "ARCHITECTURAL BRIEF & SPATIAL CONCEPT", fill=(194, 125, 83), font=get_font(10, bold=True))
        draw.text((cx + 12, cy + 38), brief_text[:85] + ("..." if len(brief_text) > 85 else ""), fill=(200, 215, 225), font=get_font(10))

    if technical_specs:
        cw, ch = 480, 65
        cx, cy = TARGET_W - 35 - cw, TARGET_H - 120
        draw.rectangle([cx, cy, cx + cw, cy + ch], fill=(22, 28, 35, 240), outline=(55, 75, 90), width=1)
        draw.text((cx + 12, cy + 18), "BIM & STRUCTURAL INTEGRITY SPECS", fill=(194, 125, 83), font=get_font(10, bold=True))
        draw.text((cx + 12, cy + 38), technical_specs[:80] + ("..." if len(technical_specs) > 80 else ""), fill=(200, 215, 225), font=get_font(10))

def create_project_spread(
    spread_img_path, 
    vol_title,
    project_code, 
    category_title, 
    project_title, 
    page_left_num, 
    page_right_num,
    total_pages,
    brief_text="",
    technical_specs=""
):
    canvas = Image.new('RGB', (TARGET_W, TARGET_H), (246, 248, 250))
    draw = ImageDraw.Draw(canvas)
    
    avail_w = TARGET_W - 70
    avail_h = TARGET_H - 72 - 46
    
    with Image.open(spread_img_path) as sp:
        sp_rgb = sp.convert('RGB')
        scale = min(avail_w / sp_rgb.width, avail_h / sp_rgb.height)
        new_w = int(sp_rgb.width * scale)
        new_h = int(sp_rgb.height * scale)
        sp_resized = sp_rgb.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        pos_x = (TARGET_W - new_w) // 2
        pos_y = 72 + (avail_h - new_h) // 2
        
        draw.rectangle([pos_x - 2, pos_y - 2, pos_x + new_w + 2, pos_y + new_h + 2], fill=(220, 225, 230))
        canvas.paste(sp_resized, (pos_x, pos_y))
        
    apply_bimco_framing(
        canvas,
        vol_title,
        project_code,
        category_title,
        project_title,
        page_left_num,
        page_right_num,
        total_pages,
        brief_text=brief_text,
        technical_specs=technical_specs
    )
    return canvas

# =========================================================================
# VOLUME 1: LUXURY VILLAS & PRIVATE RESIDENCES (32 PAGES)
# =========================================================================
def generate_villas_volume():
    VOL_ID = "villas"
    VOL_TITLE = "Volume I: Luxury Villas & Private Residences"
    TOTAL_PAGES = 32
    
    out_dir = os.path.join(PUBLIC_DIR, 'portfolio_villas', 'book_pages')
    os.makedirs(out_dir, exist_ok=True)
    pdf_out = os.path.join(PUBLIC_DIR, 'BIMCO_Volume1_Villas_Portfolio.pdf')
    
    print(f"--- GENERATING {VOL_TITLE} ({TOTAL_PAGES} PAGES) ---")
    
    book_pages = []
    
    # Page 1: Cover
    cov = Image.new('RGB', (PAGE_W, PAGE_H), (14, 18, 22))
    cd = ImageDraw.Draw(cov)
    cd.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(40, 52, 60), width=1)
    cd.text((PAGE_W // 2, 90), "BARCELONA, SPAIN  •  ARCHITECTURAL MONOGRAPH", fill=(194, 125, 83), font=get_font(12, bold=True), anchor="mm")
    
    l_size = 230
    logo_r = logo_img.resize((l_size, l_size), Image.Resampling.LANCZOS)
    cov.paste(logo_r, ((PAGE_W - l_size) // 2, 160), logo_r)
    
    cd.text((PAGE_W // 2, 435), "B I M C O", fill=(255, 255, 255), font=get_font(42, bold=True), anchor="mm")
    cd.text((PAGE_W // 2, 485), "VOLUME I: LUXURY VILLAS & RESIDENCES", fill=(194, 125, 83), font=get_font(17, bold=True), anchor="mm")
    cd.line([(PAGE_W // 2 - 140, 515), (PAGE_W // 2 + 140, 515)], fill=(60, 80, 90), width=2)
    
    cd.text((PAGE_W // 2, 555), "A DIALOGUE BETWEEN TOPOGRAPHY, FORM & BUILD INTEGRITY", fill=(230, 235, 240), font=get_font(14, bold=True), anchor="mm")
    cd.text((PAGE_W // 2, 590), "Curated Collection of Sloped Villas, Desert Retreats & Executive Construction Records", fill=(140, 160, 170), font=get_font(11), anchor="mm")
    
    bx, by, bw, bh = 55, 660, PAGE_W - 110, 135
    cd.rectangle([bx, by, bx + bw, by + bh], fill=(20, 27, 33), outline=(50, 68, 78), width=1)
    cd.text((PAGE_W // 2, by + 26), "COLLABORATIVE LEADERSHIP & PRINCIPALS", fill=(194, 125, 83), font=get_font(12, bold=True), anchor="mm")
    cd.text((PAGE_W // 2, by + 60), "SOHEIL MASTI   &   SIAVASH PAZOOKI", fill=(255, 255, 255), font=get_font(18, bold=True), anchor="mm")
    cd.text((PAGE_W // 2, by + 90), "BIM Director & Computational Architect  |  Senior Architectural Designer & Visualizer", fill=(140, 160, 170), font=get_font(12), anchor="mm")
    cd.text((PAGE_W // 2, by + 115), "BIMCO STUDIO  •  BARCELONA, SPAIN", fill=(110, 130, 140), font=get_font(11, bold=True), anchor="mm")
    
    cd.text((PAGE_W // 2, PAGE_H - 70), "BARCELONA, SPAIN  •  EDITION 2026", fill=(100, 120, 130), font=get_font(12), anchor="mm")
    cd.text((PAGE_W // 2, PAGE_H - 50), "PAGE 01 / 32", fill=(80, 100, 110), font=get_font(10, bold=True), anchor="mm")
    
    cov.save(os.path.join(out_dir, "page_01.jpg"), quality=92)
    book_pages.append(cov)
    
    # Page 2: Inside Cover
    inc = Image.new('RGB', (PAGE_W, PAGE_H), (18, 24, 30))
    idr = ImageDraw.Draw(inc)
    idr.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(38, 50, 60), width=1)
    idr.text((60, 90), "BIMCO STUDIO BARCELONA", fill=(255, 255, 255), font=get_font(22, bold=True))
    idr.text((60, 120), "VOLUME I: LUXURY VILLAS & RESIDENTIAL ARCHITECTURE", fill=(194, 125, 83), font=get_font(13, bold=True))
    idr.line([(60, 145), (PAGE_W - 60, 145)], fill=(45, 60, 70), width=1)
    
    blocks = [
        ("STUDIO LOCATION", "Barcelona, Catalonia, Spain (Headquarters & Architectural Direction)"),
        ("VOLUME FOCUS", "Exclusive Residential Architecture: Sloped Villas, Private Compounds, Topography"),
        ("COLLABORATORS", "Soheil Masti (BIM & Information Systems) & Siavash Pazooki (Architectural Concept & CGI)"),
        ("EXECUTIVE COMMITMENT", "Every project features verified architectural floor plans, sections, and active on-site photos."),
        ("CONTACT & VERIFICATION", "Phone/WhatsApp: +34 610 855 434 | Web: www.bimco.ir | Barcelona, Spain")
    ]
    y = 210
    for t, v in blocks:
        idr.text((60, y), t, fill=(194, 125, 83), font=get_font(12, bold=True))
        idr.text((60, y + 25), v, fill=(185, 200, 210), font=get_font(13))
        y += 85
        
    idr.text((PAGE_W // 2, PAGE_H - 60), "PAGE 02 / 32  •  BIMCO STUDIO BARCELONA", fill=(100, 120, 130), font=get_font(11, bold=True), anchor="mm")
    inc.save(os.path.join(out_dir, "page_02.jpg"), quality=92)
    book_pages.append(inc)
    
    # Pages 3 & 4: Manifesto & Villa Table of Contents
    v_man = Image.new('RGB', (TARGET_W, TARGET_H), (20, 26, 33))
    md = ImageDraw.Draw(v_man)
    apply_bimco_framing(
        v_man, VOL_TITLE, "PROLOGUE", "VILLA MANIFESTO & INDEX", 
        "THE ARCHITECTURE OF LIVING WITH NATURE", 3, 4, TOTAL_PAGES,
        brief_text="From Barcelona, BIMCO redefines luxury residential design through harmonious integration with earth slopes.",
        technical_specs="Revit BIM LOD 350, Sloped Topography Mesh, Parametric Sun/Shadow Studies, Corona Renders."
    )
    
    md.text((70, 150), "THE PHILOSOPHY OF THE VILLA", fill=(255, 255, 255), font=get_font(26, bold=True))
    md.text((70, 185), "Form, Topography, and the Boundary Between Inside & Outside", fill=(194, 125, 83), font=get_font(14, bold=True))
    v_text = (
        "A private residence is the purest expression of architectural poetry and structural integrity.\n"
        "At BIMCO Studio Barcelona, our villa designs do not impose themselves upon the landscape;\n"
        "they grow organically from the earth's natural contours. Whether carving into steep forest hillsides\n"
        "or framing panoramic desert horizons, each residence is conceived through a harmonious balance\n"
        "of raw materiality—exposed concrete, tactile timber, natural stone—and endless natural daylight.\n\n"
        "Every villa in this volume showcases complete architectural documentation:\n"
        "from initial hand sketches and parametric BIM models to active on-site construction supervision."
    )
    y = 230
    for l in v_text.split('\n'):
        md.text((70, y), l, fill=(195, 210, 220), font=get_font(15))
        y += 24
        
    # Table of Villa Projects Right (Page 4)
    md.text((1020, 150), "VILLA PROJECTS SCENARIO & INDEX", fill=(255, 255, 255), font=get_font(26, bold=True))
    md.text((1020, 185), "Structured Progression from Mountain Slopes to Built Realities", fill=(194, 125, 83), font=get_font(14, bold=True))
    
    v_index = [
        ("01", "DALKHANI FOREST VILLA", "Organic Curved Earthen Architecture", "PGS 05-06"),
        ("02", "CONCRETE & GLASS TOPOGRAPHY VILLA", "Ground/First Plans, Pool & Daylight", "PGS 07-08"),
        ("03", "VIOLET LUXURY RESIDENCE (CONCEPT)", "Volumetric Masterpiece & Site Renders", "PGS 09-10"),
        ("04", "VIOLET RESIDENCE EXECUTION", "On-Site Steel/Concrete Construction Records", "PGS 11-12"),
        ("05", "MOUNTAIN STONE & TIMBER CHALET", "Slope Architecture & Active Worksite Photos", "PGS 13-14"),
        ("06", "TEHRAN DASHT MODERN VILLA", "Villa Renders & Pool Foundation Execution", "PGS 15-16"),
        ("07", "MODERN VILLA SERIES 01 - 05", "Modular Luxury Compounds & Olive Landscaping", "PGS 17-18"),
        ("08", "VILLA IN AUSTRALIA", "Double-Height Interior, Fireplace & Built Joinery", "PGS 19-20"),
        ("09", "BRUTALIST CONCRETE & CANTILEVER VILLA", "Glass Bottom Pool & Cliffside Pavilion", "PGS 21-22"),
        ("10", "LANDSCAPE, PERGOLAS & POOL REALMS", "Outdoor Living & Water Architecture", "PGS 23-24"),
        ("11", "DIAMOND VILLA TOWN MASTERPLAN", "Gated Riverside Villa Community", "PGS 25-26"),
        ("12", "VILLA INTERIORS & BESPOKE JOINERY", "Luxury Kitchen & Master Dressing Suites", "PGS 27-28")
    ]
    
    vy = 225
    for num, name, desc, pgs in v_index:
        md.rectangle([1020, vy, TARGET_W - 70, vy + 40], fill=(24, 32, 40), outline=(45, 60, 72), width=1)
        md.text((1035, vy + 20), num, fill=(194, 125, 83), font=get_font(11, bold=True), anchor="lm")
        md.text((1070, vy + 20), name, fill=(255, 255, 255), font=get_font(11, bold=True), anchor="lm")
        md.text((1440, vy + 20), desc, fill=(150, 170, 180), font=get_font(10), anchor="lm")
        md.text((TARGET_W - 85, vy + 20), pgs, fill=(194, 125, 83), font=get_font(10, bold=True), anchor="rm")
        vy += 45
        
    p3 = v_man.crop((0, 0, PAGE_W, PAGE_H))
    p4 = v_man.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
    p3.save(os.path.join(out_dir, "page_03.jpg"), quality=90)
    p4.save(os.path.join(out_dir, "page_04.jpg"), quality=90)
    book_pages.extend([p3, p4])
    
    # 12 PURE VILLA SPREADS (Pages 5 to 28)
    villa_spreads = [
        (
            r'01_Luxury_Villas\03_Dalkhani_Forest_Villa_Organic\WhatsApp Image 2026-09-25 at 23.26.18 (6).jpeg',
            "VIL-01", "Dalkhani Forest Villa", "Organic Curved Earthen Architecture", 5, 6,
            "Organic villa contoured into the dense mountain forest of Dalkhani with natural earth finishes.",
            "Topographic contour integration, thermal mass walls, environmental site drainage."
        ),
        (
            r'01_Luxury_Villas\01_Concrete_Glass_Villa_Topography\WhatsApp Image 2026-09-25 at 22.54.37.jpeg',
            "VIL-02", "Concrete & Glass Villa", "Topographical Harmony & Ground/First Plans", 7, 8,
            "Complete Ground & First floor plans with seamless connection between interior spaces and private pool.",
            "Structural concrete frame, floor-to-ceiling double-glazed curtain walls, sun shade louvers."
        ),
        (
            r'01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.29.58.jpeg',
            "VIL-03", "Violet Luxury Residence", "Volumetric Design & Spatial Site Synthesis", 9, 10,
            "Signature luxury villa layout featuring master suite wings, outdoor lounge, and garden pathways.",
            "BIM LOD 350 architectural model, stone facade cladding schedules, daylight optimization."
        ),
        (
            r'01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.29.59 (1).jpeg',
            "VIL-04", "Violet Residence Execution", "Floor Plans & On-Site Construction Photos", 11, 12,
            "Comprehensive execution documentation displaying physical on-site steel/concrete erection and frame progress.",
            "Active site supervision, structural beam-column verification, daylight analysis & floor plan set."
        ),
        (
            r'01_Luxury_Villas\02_Mountain_Hillside_Chalet_Stone_Timber\WhatsApp Image 2026-09-25 at 23.38.58 (1).jpeg',
            "VIL-05", "Mountain Hillside Chalet", "Stone & Timber Renders + Worksite Scaffolding", 13, 14,
            "Hillside stone chalet nestled in mountain slopes with real construction scaffolding and concrete site photos.",
            "Rubble masonry retaining walls, timber roof trusses, seismic sloped foundation calculations."
        ),
        (
            r'01_Luxury_Villas\05_Tehran_Dasht_Villa\WhatsApp Image 2026-09-25 at 23.28.49.jpeg',
            "VIL-06", "Tehran Dasht Modern Villa", "Villa Retreat & Pool Foundation Rebar Execution", 15, 16,
            "Villa retreat with private pool and expansive gardens, verified by foundation and pool rebar construction photos.",
            "Reinforced concrete pool shell, hydraulic MEP coordination, integrated landscape lighting."
        ),
        (
            r'01_Luxury_Villas\04_Modern_Villa_Series_01_to_05\WhatsApp Image 2026-09-25 at 23.31.01 (1).jpeg',
            "VIL-07", "Modern Villa Series 01-05", "Modular Luxury Compounds & Olive Landscaping", 17, 18,
            "Modular cubic villas featuring white cantilever frames, dark volcanic stone, and Japanese-style gardens.",
            "Modular structural bay spacing, cantilevered terrace engineering, drip irrigation landscape."
        ),
        (
            r'01_Luxury_Villas\07_Villa_in_Australia_and_Curved_Residences\WhatsApp Image 2026-09-25 at 23.30.00 (2).jpeg',
            "VIL-08", "Villa in Australia", "Curved Terraces & Organic Pool Architecture", 19, 20,
            "Modern villa in Australia featuring fluid curvilinear balconies, open-plan great room, and integrated pool.",
            "Curved formwork engineering, passive solar shading, luxury master suite layout."
        ),
        (
            r'01_Luxury_Villas\08_Brutalist_Cantilever_Concrete_Villa\WhatsApp Image 2026-09-25 at 23.40.55.jpeg',
            "VIL-09", "Brutalist Concrete Villa", "Cantilevered Glass Pool & Cliff House Pavilion", 21, 22,
            "Daring architectural statement in board-formed exposed concrete with cantilevered glass-bottom pool.",
            "Post-tensioned concrete cantilevers, structural glass balustrades, geotechnical rock anchors."
        ),
        (
            r'05_Urban_Planning_and_Landscape\21_Landscape_Pergolas_and_Outdoor_Living\WhatsApp Image 2026-09-25 at 23.36.48.jpeg',
            "VIL-10", "Landscape & Outdoor Living", "Luxury Pergolas, Water Elements & Sun Decks", 23, 24,
            "Architectural landscape integration with modern steel pergolas, sunken seating pits, and infinity water edges.",
            "Outdoor MEP coordination, waterproof timber decking, night lighting photometric calculations."
        ),
        (
            r'05_Urban_Planning_and_Landscape\20_Diamond_Villa_Town_Masterplan\WhatsApp Image 2026-09-25 at 23.28.07 (2).jpeg',
            "VIL-11", "Diamond Villa Town", "Gated Riverside Villa Community Masterplan", 25, 26,
            "Masterplanned gated residential enclave along riverfront greenway with monumental entrance gateway.",
            "Macro parcel subdivision, storm water retention swales, hierarchical private road infrastructure."
        ),
        (
            r'04_Interior_Architecture\16_Kitchen_Design_and_Appliances\WhatsApp Image 2026-09-25 at 23.32.32 (3).jpeg',
            "VIL-12", "Villa Interiors & Joinery", "Luxury Kitchen Architecture & Smeg Appliances", 27, 28,
            "Bespoke villa kitchen and joinery architecture with bookmatched marble, natural oak, and Smeg specifications.",
            "Millwork shop drawings (1:20), concealed pantry mechanisms, built-in induction & extraction."
        )
    ]
    
    full_spreads_for_pdf = [v_man]
    
    for rel_path, code, title, sub, pl, pr, br, sp in villa_spreads:
        full_path = os.path.join(BASE_IMG_DIR, rel_path)
        print(f"Generating Villa Spread: [{code}] {title} (Pages {pl}-{pr})...")
        sp_img = create_project_spread(
            full_path, VOL_TITLE, code, "Luxury Villas & Private Residences", 
            title, pl, pr, TOTAL_PAGES, brief_text=br, technical_specs=sp
        )
        full_spreads_for_pdf.append(sp_img)
        
        lp = sp_img.crop((0, 0, PAGE_W, PAGE_H))
        rp = sp_img.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
        
        lp.save(os.path.join(out_dir, f"page_{pl:02d}.jpg"), quality=90)
        rp.save(os.path.join(out_dir, f"page_{pr:02d}.jpg"), quality=90)
        book_pages.extend([lp, rp])
        
    # Pages 29 & 30: Principals Spread (Villas Focus)
    prin = Image.new('RGB', (TARGET_W, TARGET_H), (18, 24, 30))
    apply_bimco_framing(
        prin, VOL_TITLE, "DIRECTORS", "VILLA PRACTICE LEADERSHIP",
        "SOHEIL MASTI & SIAVASH PAZOOKI", 29, 30, TOTAL_PAGES,
        brief_text="BIMCO Studio Barcelona unites high-level BIM information architecture with signature spatial villa design.",
        technical_specs="Registered Architects, BIM Managers (Autodesk Certified), LOD 350 Audit Specialists."
    )
    pd = ImageDraw.Draw(prin)
    
    # Soheil Masti Box (Page 29)
    pd.rectangle([70, 140, 920, TARGET_H - 120], fill=(24, 32, 40), outline=(50, 70, 85), width=1)
    pd.text((100, 175), "SOHEIL MASTI", fill=(255, 255, 255), font=get_font(28, bold=True))
    pd.text((100, 215), "BIM Director & Computational Architecture Lead", fill=(194, 125, 83), font=get_font(15, bold=True))
    pd.text((100, 240), "BIMCO Studio Barcelona  •  Spain & International", fill=(130, 150, 160), font=get_font(12))
    pd.line([(100, 265), (890, 265)], fill=(45, 65, 78), width=1)
    
    soh_text = (
        "VILLA BIM & TECHNICAL COORDINATION LEADERSHIP:\n"
        "• Strategic BIM implementation, Revit LOD 350 parametric modeling for luxury villas\n"
        "• Multi-discipline clash audits between architectural form, structural frames, and MEP systems\n"
        "• Automated quantity takeoffs and material schedules for bespoke residential builds\n"
        "• International project delivery across Spain, Europe & Middle East\n"
        "• Digital construction workflows ensuring zero discrepancies on site"
    )
    sy = 295
    for l in soh_text.split('\n'):
        if l.endswith(':'):
            pd.text((100, sy), l, fill=(194, 125, 83), font=get_font(13, bold=True))
            sy += 26
        else:
            pd.text((100, sy), l, fill=(180, 195, 205), font=get_font(13))
            sy += 24

    # Siavash Pazooki Box (Page 30)
    pd.rectangle([980, 140, TARGET_W - 70, TARGET_H - 120], fill=(24, 32, 40), outline=(50, 70, 85), width=1)
    pd.text((1010, 175), "SIAVASH PAZOOKI", fill=(255, 255, 255), font=get_font(28, bold=True))
    pd.text((1010, 215), "Senior Architectural Designer & High-End 3D Visualizer", fill=(194, 125, 83), font=get_font(15, bold=True))
    pd.text((1010, 240), "M.Arch & B.Arch  •  BIMCO Studio Barcelona Partner", fill=(130, 150, 160), font=get_font(12))
    pd.line([(1010, 265), (TARGET_W - 100, 265)], fill=(45, 65, 78), width=1)
    
    sia_text = (
        "VILLA DESIGN & VISUALIZATION LEADERSHIP:\n"
        "• Lead Architectural Concept Designer for signature luxury villas & estates\n"
        "• Photorealistic architectural rendering, natural lighting moods & cinematic camera angles\n"
        "• Topographical terrain modeling, landscape synthesis, and stone/timber detailing\n"
        "• Turnkey executive shop drawings, joinery specifications & on-site build supervision\n"
        "• 8+ years leading award-winning private residential commissions"
    )
    sy = 295
    for l in sia_text.split('\n'):
        if l.endswith(':'):
            pd.text((1010, sy), l, fill=(194, 125, 83), font=get_font(13, bold=True))
            sy += 26
        else:
            pd.text((1010, sy), l, fill=(180, 195, 205), font=get_font(13))
            sy += 24
            
    full_spreads_for_pdf.append(prin)
    p29 = prin.crop((0, 0, PAGE_W, PAGE_H))
    p30 = prin.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
    p29.save(os.path.join(out_dir, "page_29.jpg"), quality=90)
    p30.save(os.path.join(out_dir, "page_30.jpg"), quality=90)
    book_pages.extend([p29, p30])
    
    # Page 31: Inside Back Cover
    in_b = Image.new('RGB', (PAGE_W, PAGE_H), (18, 24, 30))
    ibd = ImageDraw.Draw(in_b)
    ibd.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(38, 50, 60), width=1)
    ibd.text((60, 90), "BIMCO VILLA EXECUTION PROTOCOL", fill=(255, 255, 255), font=get_font(22, bold=True))
    ibd.text((60, 120), "END-TO-END RESIDENTIAL DESIGN STANDARDS", fill=(194, 125, 83), font=get_font(13, bold=True))
    ibd.line([(60, 145), (PAGE_W - 60, 145)], fill=(45, 60, 70), width=1)
    
    v_steps = [
        ("STAGE 1: TOPOGRAPHIC & SOLAR ANALYSIS", "High-precision drone survey, terrain slope meshing, daylight & thermal path calculations."),
        ("STAGE 2: SPATIAL CONCEPT & 3D MASSING", "Volumetric studies, private vs. entertainment zonings, pool & garden integration."),
        ("STAGE 3: BIM LOD 350 RESIDENTIAL MODEL", "Parametric Revit model, clash detection with structural concrete & MEP piping."),
        ("STAGE 4: ULTRA-HIGH-END CGI & LIGHTING", "Cinematic renders in Corona/V-Ray, material mockups, interior ambience simulation."),
        ("STAGE 5: FULL EXECUTIVE DRAWING SET", "1:20 joinery shop drawings, stone cladding details, door/window schedules."),
        ("STAGE 6: ON-SITE QUALITY ASSURANCE", "Periodic physical site inspections, contractor coordination, build integrity control.")
    ]
    y = 200
    for st, sd in v_steps:
        ibd.text((60, y), st, fill=(194, 125, 83), font=get_font(12, bold=True))
        ibd.text((60, y + 25), sd, fill=(185, 200, 210), font=get_font(12))
        y += 75
        
    ibd.text((PAGE_W // 2, PAGE_H - 60), "PAGE 31 / 32  •  BIMCO STUDIO BARCELONA", fill=(100, 120, 130), font=get_font(11, bold=True), anchor="mm")
    in_b.save(os.path.join(out_dir, "page_31.jpg"), quality=92)
    book_pages.append(in_b)
    
    # Page 32: Back Cover
    b_cov = Image.new('RGB', (PAGE_W, PAGE_H), (14, 18, 22))
    bcd = ImageDraw.Draw(b_cov)
    bcd.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(40, 52, 60), width=1)
    
    bl_size = 180
    b_logo = logo_img.resize((bl_size, bl_size), Image.Resampling.LANCZOS)
    b_cov.paste(b_logo, ((PAGE_W - bl_size) // 2, 220), b_logo)
    
    bcd.text((PAGE_W // 2, 440), "B I M C O", fill=(255, 255, 255), font=get_font(42, bold=True), anchor="mm")
    bcd.text((PAGE_W // 2, 490), "VOLUME I: LUXURY VILLAS & RESIDENCES", fill=(194, 125, 83), font=get_font(17, bold=True), anchor="mm")
    bcd.text((PAGE_W // 2, 520), "BARCELONA, SPAIN", fill=(220, 230, 240), font=get_font(14, bold=True), anchor="mm")
    bcd.line([(PAGE_W // 2 - 140, 550), (PAGE_W // 2 + 140, 550)], fill=(50, 70, 80), width=2)
    
    contacts = [
        "STUDIO HEADQUARTERS: Barcelona, Spain",
        "DIRECTORS: Soheil Masti & Siavash Pazooki",
        "TELEPHONE & WHATSAPP: +34 610 855 434",
        "OFFICIAL WEB PORTAL: www.bimco.ir",
        "SPECIALIZATION: Luxury Villas • Topography • BIM LOD 350 • Site Supervision"
    ]
    cy = 600
    for c in contacts:
        bcd.text((PAGE_W // 2, cy), c, fill=(175, 195, 205), font=get_font(14), anchor="mm")
        cy += 36
        
    bcd.text((PAGE_W // 2, PAGE_H - 70), "© 2026 BIMCO STUDIO BARCELONA. ALL RIGHTS RESERVED.", fill=(90, 110, 120), font=get_font(11), anchor="mm")
    bcd.text((PAGE_W // 2, PAGE_H - 50), "PAGE 32 / 32", fill=(80, 100, 110), font=get_font(10, bold=True), anchor="mm")
    b_cov.save(os.path.join(out_dir, "page_32.jpg"), quality=92)
    book_pages.append(b_cov)
    
    # COMPILE VOLUME 1 PDF
    print(f"Compiling PDF for Volume 1 to {pdf_out}...")
    pdf_doc = fitz.open()
    
    # 1. Front Cover Spread (Page 2 on left, Page 1 on right)
    cov_spread = Image.new('RGB', (TARGET_W, TARGET_H), (14, 18, 22))
    cov_spread.paste(inc, (0, 0))
    cov_spread.paste(cov, (PAGE_W, 0))
    
    temp_sp = os.path.join(PUBLIC_DIR, '_temp_villas.jpg')
    cov_spread.save(temp_sp, quality=92)
    c_doc = fitz.open(temp_sp)
    pdf_page = pdf_doc.new_page(width=TARGET_W, height=TARGET_H)
    pdf_page.insert_image(fitz.Rect(0, 0, TARGET_W, TARGET_H), filename=temp_sp)
    c_doc.close()
    
    # 2. All 14 Inner Spreads
    for sp in full_spreads_for_pdf:
        sp.save(temp_sp, quality=92)
        s_doc = fitz.open(temp_sp)
        pdf_page = pdf_doc.new_page(width=TARGET_W, height=TARGET_H)
        pdf_page.insert_image(fitz.Rect(0, 0, TARGET_W, TARGET_H), filename=temp_sp)
        s_doc.close()
        
    # 3. Back Cover Spread (Page 31 on left, Page 32 on right)
    b_spread = Image.new('RGB', (TARGET_W, TARGET_H), (14, 18, 22))
    b_spread.paste(in_b, (0, 0))
    b_spread.paste(b_cov, (PAGE_W, 0))
    b_spread.save(temp_sp, quality=92)
    b_doc = fitz.open(temp_sp)
    pdf_page = pdf_doc.new_page(width=TARGET_W, height=TARGET_H)
    pdf_page.insert_image(fitz.Rect(0, 0, TARGET_W, TARGET_H), filename=temp_sp)
    b_doc.close()
    
    if os.path.exists(temp_sp):
        os.remove(temp_sp)
        
    pdf_doc.save(pdf_out)
    pdf_doc.close()
    
    # Copy to dist
    dist_dir = r'c:\Users\Soheil\Documents\Apply\Website Memari\dist'
    if os.path.exists(dist_dir):
        import shutil
        shutil.copy2(pdf_out, os.path.join(dist_dir, os.path.basename(pdf_out)))
        dist_b_dir = os.path.join(dist_dir, 'portfolio_villas', 'book_pages')
        os.makedirs(dist_b_dir, exist_ok=True)
        for f in glob.glob(os.path.join(out_dir, '*.jpg')):
            shutil.copy2(f, os.path.join(dist_b_dir, os.path.basename(f)))
            
    print(f"SUCCESS! {VOL_TITLE} PDF generated: {pdf_out} ({len(book_pages)} pages)")

# =========================================================================
# VOLUME 2: RESIDENTIAL APARTMENTS & FACADE ENGINEERING (32 PAGES)
# =========================================================================
def generate_apartments_volume():
    VOL_ID = "apartments"
    VOL_TITLE = "Volume II: Residential Mid/High-Rise & Facades"
    TOTAL_PAGES = 32
    
    out_dir = os.path.join(PUBLIC_DIR, 'portfolio_apartments', 'book_pages')
    os.makedirs(out_dir, exist_ok=True)
    pdf_out = os.path.join(PUBLIC_DIR, 'BIMCO_Volume2_Apartments_Facades.pdf')
    
    print(f"--- GENERATING {VOL_TITLE} ({TOTAL_PAGES} PAGES) ---")
    
    book_pages = []
    
    # Page 1: Cover
    cov = Image.new('RGB', (PAGE_W, PAGE_H), (14, 18, 22))
    cd = ImageDraw.Draw(cov)
    cd.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(40, 52, 60), width=1)
    cd.text((PAGE_W // 2, 90), "BARCELONA, SPAIN  •  ARCHITECTURAL MONOGRAPH", fill=(194, 125, 83), font=get_font(12, bold=True), anchor="mm")
    
    l_size = 230
    logo_r = logo_img.resize((l_size, l_size), Image.Resampling.LANCZOS)
    cov.paste(logo_r, ((PAGE_W - l_size) // 2, 160), logo_r)
    
    cd.text((PAGE_W // 2, 435), "B I M C O", fill=(255, 255, 255), font=get_font(42, bold=True), anchor="mm")
    cd.text((PAGE_W // 2, 485), "VOLUME II: RESIDENTIAL & FACADE ENGINEERING", fill=(194, 125, 83), font=get_font(17, bold=True), anchor="mm")
    cd.line([(PAGE_W // 2 - 140, 515), (PAGE_W // 2 + 140, 515)], fill=(60, 80, 90), width=2)
    
    cd.text((PAGE_W // 2, 555), "THE HIGH-PERFORMANCE BUILDING ENVELOPE & COLLECTIVE LIVING", fill=(230, 235, 240), font=get_font(13, bold=True), anchor="mm")
    cd.text((PAGE_W // 2, 590), "Curated Monograph of Urban Mid-Rise, Terraced Enclaves & High-Rise Facades", fill=(140, 160, 170), font=get_font(11), anchor="mm")
    
    bx, by, bw, bh = 55, 660, PAGE_W - 110, 135
    cd.rectangle([bx, by, bx + bw, by + bh], fill=(20, 27, 33), outline=(50, 68, 78), width=1)
    cd.text((PAGE_W // 2, by + 26), "COLLABORATIVE LEADERSHIP & PRINCIPALS", fill=(194, 125, 83), font=get_font(12, bold=True), anchor="mm")
    cd.text((PAGE_W // 2, by + 60), "SOHEIL MASTI   &   SIAVASH PAZOOKI", fill=(255, 255, 255), font=get_font(18, bold=True), anchor="mm")
    cd.text((PAGE_W // 2, by + 90), "BIM Director & Computational Architect  |  Senior Architectural Designer & Visualizer", fill=(140, 160, 170), font=get_font(12), anchor="mm")
    cd.text((PAGE_W // 2, by + 115), "BIMCO STUDIO  •  BARCELONA, SPAIN", fill=(110, 130, 140), font=get_font(11, bold=True), anchor="mm")
    
    cd.text((PAGE_W // 2, PAGE_H - 70), "BARCELONA, SPAIN  •  EDITION 2026", fill=(100, 120, 130), font=get_font(12), anchor="mm")
    cd.text((PAGE_W // 2, PAGE_H - 50), "PAGE 01 / 32", fill=(80, 100, 110), font=get_font(10, bold=True), anchor="mm")
    
    cov.save(os.path.join(out_dir, "page_01.jpg"), quality=92)
    book_pages.append(cov)
    
    # Page 2: Inside Cover
    inc = Image.new('RGB', (PAGE_W, PAGE_H), (18, 24, 30))
    idr = ImageDraw.Draw(inc)
    idr.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(38, 50, 60), width=1)
    idr.text((60, 90), "BIMCO STUDIO BARCELONA", fill=(255, 255, 255), font=get_font(22, bold=True))
    idr.text((60, 120), "VOLUME II: RESIDENTIAL APARTMENTS & FACADE ENGINEERING", fill=(194, 125, 83), font=get_font(13, bold=True))
    idr.line([(60, 145), (PAGE_W - 60, 145)], fill=(45, 60, 70), width=1)
    
    blocks = [
        ("STUDIO LOCATION", "Barcelona, Catalonia, Spain (Headquarters & Architectural Direction)"),
        ("VOLUME FOCUS", "Collective Housing, Mid & High-Rise Apartments, Advanced Facade Systems"),
        ("COLLABORATORS", "Soheil Masti (BIM & Technical Direction) & Siavash Pazooki (Architectural Design & CGI)"),
        ("ENGINEERING COMMITMENT", "Full architectural elevation sets, 1:20 cladding details, and lighting simulations."),
        ("CONTACT & VERIFICATION", "Phone/WhatsApp: +34 610 855 434 | Web: www.bimco.ir | Barcelona, Spain")
    ]
    y = 210
    for t, v in blocks:
        idr.text((60, y), t, fill=(194, 125, 83), font=get_font(12, bold=True))
        idr.text((60, y + 25), v, fill=(185, 200, 210), font=get_font(13))
        y += 85
        
    idr.text((PAGE_W // 2, PAGE_H - 60), "PAGE 02 / 32  •  BIMCO STUDIO BARCELONA", fill=(100, 120, 130), font=get_font(11, bold=True), anchor="mm")
    inc.save(os.path.join(out_dir, "page_02.jpg"), quality=92)
    book_pages.append(inc)
    
    # Pages 3 & 4: Manifesto & Table of Contents
    v_man = Image.new('RGB', (TARGET_W, TARGET_H), (20, 26, 33))
    md = ImageDraw.Draw(v_man)
    apply_bimco_framing(
        v_man, VOL_TITLE, "PROLOGUE", "FACADE MANIFESTO & INDEX",
        "THE ARCHITECTURE OF URBAN SKINS & COLLECTIVE HOUSING", 3, 4, TOTAL_PAGES,
        brief_text="From Barcelona, BIMCO approaches multi-family residential architecture through high-performance envelopes.",
        technical_specs="Revit Facade Families LOD 350, Thermal Bridging Mitigation, Ventilated Stone Louvers, Photometrics."
    )
    
    md.text((70, 150), "THE URBAN FACADE & COLLECTIVE FORM", fill=(255, 255, 255), font=get_font(26, bold=True))
    md.text((70, 185), "Tectonic Depth, Material Permanence, and Solar Modulation", fill=(194, 125, 83), font=get_font(14, bold=True))
    v_text = (
        "The facade is the public face of architecture—the mediator between the urban realm\n"
        "and private human dwelling. At BIMCO Studio Barcelona, we treat the building skin\n"
        "as a high-performance tectonic system that balances light, privacy, acoustic buffering,\n"
        "and energy conservation.\n\n"
        "Our residential projects—from terraced mountain dwellings in Dalkhani to mid-rise luxury\n"
        "enclaves in Darrous and high-density modular towers—demonstrate rigorous structural logic.\n"
        "Every joint, reveal, and stone anchor is coordinated in BIM to bridge the gap between\n"
        "bold aesthetic visions and flawless on-site installation."
    )
    y = 230
    for l in v_text.split('\n'):
        md.text((70, y), l, fill=(195, 210, 220), font=get_font(15))
        y += 24
        
    md.text((1020, 150), "APARTMENTS & FACADE INDEX", fill=(255, 255, 255), font=get_font(26, bold=True))
    md.text((1020, 185), "Curated Sequence from Bespoke Facades to High-Rise Towers", fill=(194, 125, 83), font=get_font(14, bold=True))
    
    apt_index = [
        ("01", "DARROUS RESIDENTIAL FACADE", "Stone & Metal Entrance Foyer Architecture", "PGS 05-06"),
        ("02", "DARROUS NIGHT ILLUMINATION", "Photometric Studies & Nocturnal Depth", "PGS 07-08"),
        ("03", "DARROUS ELEVATION GEOMETRY", "Vertical Louvers & Solar Angle Optimization", "PGS 09-10"),
        ("04", "DARROUS 1:20 CLADDING DETAILS", "Executive Ventilated Facade Shop Drawings", "PGS 11-12"),
        ("05", "DALKHANI RESIDENTIAL TERRACES", "Stepped Mountain Collective Dwellings", "PGS 13-14"),
        ("06", "DALKHANI TERRACES FLOOR PLANS", "Contour Distribution & Dual-Aspect Layouts", "PGS 15-16"),
        ("07", "DALKHANI SECTIONS & SLOPES", "Structural Cascade & Panoramic Verandas", "PGS 17-18"),
        ("08", "MID-RISE URBAN APARTMENTS", "Stepped Green Terraces & Modern Framing", "PGS 19-20"),
        ("09", "MODERN URBAN APARTMENT COMPLEX", "Balcony Rhythms & Day/Night Expression", "PGS 21-22"),
        ("10", "HIGH-RISE TOWER COLLECTION 01", "Prefabricated Modular Concrete & Glazing", "PGS 23-24"),
        ("11", "HIGH-RISE TOWER COLLECTION 02", "Corner Articulation, Louvers & Penthouse", "PGS 25-26"),
        ("12", "CLASSICAL MONUMENTAL PALACE", "Grand Neoclassical Orders & Limestone Facade", "PGS 27-28")
    ]
    
    vy = 225
    for num, name, desc, pgs in apt_index:
        md.rectangle([1020, vy, TARGET_W - 70, vy + 40], fill=(24, 32, 40), outline=(45, 60, 72), width=1)
        md.text((1035, vy + 20), num, fill=(194, 125, 83), font=get_font(11, bold=True), anchor="lm")
        md.text((1070, vy + 20), name, fill=(255, 255, 255), font=get_font(11, bold=True), anchor="lm")
        md.text((1440, vy + 20), desc, fill=(150, 170, 180), font=get_font(10), anchor="lm")
        md.text((TARGET_W - 85, vy + 20), pgs, fill=(194, 125, 83), font=get_font(10, bold=True), anchor="rm")
        vy += 45
        
    p3 = v_man.crop((0, 0, PAGE_W, PAGE_H))
    p4 = v_man.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
    p3.save(os.path.join(out_dir, "page_03.jpg"), quality=90)
    p4.save(os.path.join(out_dir, "page_04.jpg"), quality=90)
    book_pages.extend([p3, p4])
    
    # 12 SPREADS (Pages 5 to 28)
    apt_spreads = [
        (
            r'02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25 (1).jpeg',
            "APT-01", "Darrous Residential Facade", "Stone & Metal Tectonic Assembly & Foyer Entrance", 5, 6,
            "Luxury residential entrance foyer in Darrous district featuring travertine masonry, bronze louvers, and bespoke lighting.",
            "Ventilated facade substructure, stainless steel brackets, concealed mechanical joints, thermal insulation."
        ),
        (
            r'02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25 (2).jpeg',
            "APT-02", "Darrous Facade Night Illumination", "Photometric Studies & Nocturnal Architectural Expression", 7, 8,
            "Nocturnal illumination design integrated into stone reveals and window frames, emphasizing volumetric depth.",
            "Warm 3000K LED linear wall grazing, anti-glare baffles, IP67 waterproof rated fixtures, DALI lighting control."
        ),
        (
            r'02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25 (3).jpeg',
            "APT-03", "Darrous Elevation Geometry", "Solar Shading Analysis & Fenestration Proportions", 9, 10,
            "South-facing facade geometry utilizing vertical louver elements to regulate solar gain while maintaining expansive mountain vistas.",
            "Parametric shadow calculation, extruded aluminum profiles, dual low-E insulated glass units (U-value 1.1 W/m²K)."
        ),
        (
            r'02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25.jpeg',
            "APT-04", "Darrous Technical Details", "1:20 Cladding Junctions, Parapets & Base Details", 11, 12,
            "Executive construction drawings with 1:20 joinery, stone reveal brackets, thermal flashing, and damp-proof membranes.",
            "Revit LOD 350 facade details, seismic movement joints, air barrier continuity, drainage weep holes."
        ),
        (
            r'02_Residential_Buildings_Facades\10_Residential_Dalkhani_Terraces\WhatsApp Image 2026-09-25 at 23.29.09.jpeg',
            "APT-05", "Dalkhani Residential Terraces", "Stepped Mountain Dwellings & Forest Topography", 13, 14,
            "Multi-family stepped collective housing contoured along steep mountainsides, providing sky terraces for all apartments.",
            "Terraced concrete foundation, soil-nail retaining structures, green roof water retention and drainage membranes."
        ),
        (
            r'02_Residential_Buildings_Facades\10_Residential_Dalkhani_Terraces\WhatsApp Image 2026-09-25 at 23.29.10 (1).jpeg',
            "APT-06", "Dalkhani Terraces Floor Plans", "Architectural Level Distribution & Mountain Contours", 15, 16,
            "Contoured architectural floor plans stepping up the terrain with private entries, natural cross-ventilation, and view corridors.",
            "Stepped shear-wall grid, dual-aspect ventilation, acoustic party-wall assemblies, seismic slope safety factor > 1.5."
        ),
        (
            r'02_Residential_Buildings_Facades\10_Residential_Dalkhani_Terraces\WhatsApp Image 2026-09-25 at 23.29.10 (2).jpeg',
            "APT-07", "Dalkhani Sections & Structural Steps", "Longitudinal Cross-Section & Terraced Verandas", 17, 18,
            "Longitudinal building section demonstrating balcony overhangs, daylight penetration, and hillside stormwater channels.",
            "Cascading structural calculations, inverted roof waterproofing, exterior grade thermal envelope."
        ),
        (
            r'02_Residential_Buildings_Facades\11_Mid_and_High_Rise_Residential_Collection\WhatsApp Image 2026-09-25 at 23.26.51 (1).jpeg',
            "APT-08", "Mid-Rise Urban Enclave", "Stepped Green Terraces & Modern Stone Framing", 19, 20,
            "Urban mid-rise residential architecture with deep cantilevered green balconies, integrating biophilic living into urban fabric.",
            "Automated micro-drip planter irrigation, structural cantilever load calculations, composite wood soffits."
        ),
        (
            r'02_Residential_Buildings_Facades\11_Mid_and_High_Rise_Residential_Collection\WhatsApp Image 2026-09-25 at 23.26.51 (2).jpeg',
            "APT-09", "Modern Urban Apartment Complex", "Day & Night Renders with Balcony Rhythm", 21, 22,
            "Rhythmic facade articulation balancing textured masonry with full-height floor-to-ceiling glass balconies.",
            "Thermal break structural brackets, laminated acoustic balustrades, integrated hidden roller shutter housings."
        ),
        (
            r'02_Residential_Buildings_Facades\11_Mid_and_High_Rise_Residential_Collection\WhatsApp Image 2026-09-25 at 23.34.06.jpeg',
            "APT-10", "Modular Facade Typology 01", "High-Rise Prefabricated Panels & Window Rhythm", 23, 24,
            "Architectural tower facade modularity exploring repetitive prefabricated panels with subtle rhythmic variations.",
            "GFRC lightweight composite panels, unitized facade crane installation sequence, wind load testing per EN 1991."
        ),
        (
            r'02_Residential_Buildings_Facades\11_Mid_and_High_Rise_Residential_Collection\WhatsApp Image 2026-09-25 at 23.34.07.jpeg',
            "APT-11", "Modular Facade Typology 02", "Corner Articulation & Sky Terraces", 25, 26,
            "Dynamic corner tower articulation with wrap-around continuous balconies and recessed penthouse levels.",
            "Vortex-shedding corner geometry, wind pressure relief, high-performance solar control glass coatings."
        ),
        (
            r'02_Residential_Buildings_Facades\12_Classical_Monumental_Palace\WhatsApp Image 2026-09-25 at 23.37.25 (3).jpeg',
            "APT-12", "Classical Monumental Palace", "Classical Proportions, Colonnades & Grand Portico", 27, 28,
            "Monumental residential palace exhibiting classical Roman and Neoclassical orders, grand colonnades, and carved friezes.",
            "Natural limestone masonry, structural entablature tie-backs, carved stone cornice anchor engineering."
        )
    ]
    
    full_spreads_for_pdf = [v_man]
    
    for rel_path, code, title, sub, pl, pr, br, sp in apt_spreads:
        full_path = os.path.join(BASE_IMG_DIR, rel_path)
        print(f"Generating Apartment Spread: [{code}] {title} (Pages {pl}-{pr})...")
        sp_img = create_project_spread(
            full_path, VOL_TITLE, code, "Residential Buildings & Facade Engineering",
            title, pl, pr, TOTAL_PAGES, brief_text=br, technical_specs=sp
        )
        full_spreads_for_pdf.append(sp_img)
        
        lp = sp_img.crop((0, 0, PAGE_W, PAGE_H))
        rp = sp_img.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
        
        lp.save(os.path.join(out_dir, f"page_{pl:02d}.jpg"), quality=90)
        rp.save(os.path.join(out_dir, f"page_{pr:02d}.jpg"), quality=90)
        book_pages.extend([lp, rp])
        
    # Pages 29 & 30: Principals Profile (Residential & Facades Focus)
    prin = Image.new('RGB', (TARGET_W, TARGET_H), (18, 24, 30))
    apply_bimco_framing(
        prin, VOL_TITLE, "DIRECTORS", "FACADE PRACTICE LEADERSHIP",
        "SOHEIL MASTI & SIAVASH PAZOOKI", 29, 30, TOTAL_PAGES,
        brief_text="BIMCO Studio Barcelona coordinates advanced building envelope systems with high-end residential living.",
        technical_specs="Revit Facade Coordination, Thermal Envelope Compliance, Wind Load Optimization, LOD 350."
    )
    pd = ImageDraw.Draw(prin)
    
    # Soheil Masti Box (Page 29)
    pd.rectangle([70, 140, 920, TARGET_H - 120], fill=(24, 32, 40), outline=(50, 70, 85), width=1)
    pd.text((100, 175), "SOHEIL MASTI", fill=(255, 255, 255), font=get_font(28, bold=True))
    pd.text((100, 215), "BIM Director & Computational Facade Lead", fill=(194, 125, 83), font=get_font(15, bold=True))
    pd.text((100, 240), "BIMCO Studio Barcelona  •  Spain & International", fill=(130, 150, 160), font=get_font(12))
    pd.line([(100, 265), (890, 265)], fill=(45, 65, 78), width=1)
    
    soh_text = (
        "FACADE BIM & TECHNICAL COORDINATION LEADERSHIP:\n"
        "• Advanced parametric curtain wall & ventilated facade modeling in Revit LOD 350\n"
        "• Clash detection between structural concrete slabs, facade brackets, and MEP risers\n"
        "• Automated bill of materials, stone panel optimization & glass panel scheduling\n"
        "• Thermal envelope compliance (U-values, thermal bridging) and solar gain analysis\n"
        "• International standard compliance across Spanish CTE & Eurocodes"
    )
    sy = 295
    for l in soh_text.split('\n'):
        if l.endswith(':'):
            pd.text((100, sy), l, fill=(194, 125, 83), font=get_font(13, bold=True))
            sy += 26
        else:
            pd.text((100, sy), l, fill=(180, 195, 205), font=get_font(13))
            sy += 24

    # Siavash Pazooki Box (Page 30)
    pd.rectangle([980, 140, TARGET_W - 70, TARGET_H - 120], fill=(24, 32, 40), outline=(50, 70, 85), width=1)
    pd.text((1010, 175), "SIAVASH PAZOOKI", fill=(255, 255, 255), font=get_font(28, bold=True))
    pd.text((1010, 215), "Senior Architectural Designer & Facade Visualizer", fill=(194, 125, 83), font=get_font(15, bold=True))
    pd.text((1010, 240), "M.Arch & B.Arch  •  BIMCO Studio Barcelona Partner", fill=(130, 150, 160), font=get_font(12))
    pd.line([(1010, 265), (TARGET_W - 100, 265)], fill=(45, 65, 78), width=1)
    
    sia_text = (
        "RESIDENTIAL & FACADE DESIGN LEADERSHIP:\n"
        "• Lead designer for mid-rise, high-rise, and classical residential facade aesthetics\n"
        "• Photorealistic material rendering: Travertine, GFRC panels, bronze metal, and glass\n"
        "• Architectural lighting design: nocturnal facade illumination and shadow play\n"
        "• Turnkey executive shop drawings (1:20 junctions, parapets, and window details)\n"
        "• Comprehensive site supervision ensuring precision installation on active sites"
    )
    sy = 295
    for l in sia_text.split('\n'):
        if l.endswith(':'):
            pd.text((1010, sy), l, fill=(194, 125, 83), font=get_font(13, bold=True))
            sy += 26
        else:
            pd.text((1010, sy), l, fill=(180, 195, 205), font=get_font(13))
            sy += 24
            
    full_spreads_for_pdf.append(prin)
    p29 = prin.crop((0, 0, PAGE_W, PAGE_H))
    p30 = prin.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
    p29.save(os.path.join(out_dir, "page_29.jpg"), quality=90)
    p30.save(os.path.join(out_dir, "page_30.jpg"), quality=90)
    book_pages.extend([p29, p30])
    
    # Page 31: Inside Back Cover
    in_b = Image.new('RGB', (PAGE_W, PAGE_H), (18, 24, 30))
    ibd = ImageDraw.Draw(in_b)
    ibd.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(38, 50, 60), width=1)
    ibd.text((60, 90), "BIMCO FACADE & HOUSING PROTOCOL", fill=(255, 255, 255), font=get_font(22, bold=True))
    ibd.text((60, 120), "HIGH-PERFORMANCE ENVELOPE DESIGN STAGES", fill=(194, 125, 83), font=get_font(13, bold=True))
    ibd.line([(60, 145), (PAGE_W - 60, 145)], fill=(45, 60, 70), width=1)
    
    apt_steps = [
        ("STAGE 1: SOLAR & CLIMATIC MODELLING", "Annual sunlight exposure, solar heat gain coefficient (SHGC), and dynamic shading analysis."),
        ("STAGE 2: FACADE TECTONICS & VOLUMETRIC CONCEPT", "Proportioning of solid vs. void, balustrade integration, and urban street wall alignment."),
        ("STAGE 3: BIM LOD 350 ENVELOPE COORDINATION", "Complete bracket-by-bracket modeling in Revit, clash resolution with structural concrete edges."),
        ("STAGE 4: THERMAL & ACOUSTIC OPTIMIZATION", "Mitigation of thermal bridges, acoustic transmission loss calculations (Rw > 45 dB)."),
        ("STAGE 5: 1:20 & 1:5 SHOP DRAWING PACKAGE", "Ventilated facade anchors, flashing membranes, stone reveals, and perimeter fire barriers."),
        ("STAGE 6: MOCK-UP REVIEW & SITE INSPECTION", "Visual prototype inspection, water-tightness field testing, and installation sign-off.")
    ]
    y = 200
    for st, sd in apt_steps:
        ibd.text((60, y), st, fill=(194, 125, 83), font=get_font(12, bold=True))
        ibd.text((60, y + 25), sd, fill=(185, 200, 210), font=get_font(12))
        y += 75
        
    ibd.text((PAGE_W // 2, PAGE_H - 60), "PAGE 31 / 32  •  BIMCO STUDIO BARCELONA", fill=(100, 120, 130), font=get_font(11, bold=True), anchor="mm")
    in_b.save(os.path.join(out_dir, "page_31.jpg"), quality=92)
    book_pages.append(in_b)
    
    # Page 32: Back Cover
    b_cov = Image.new('RGB', (PAGE_W, PAGE_H), (14, 18, 22))
    bcd = ImageDraw.Draw(b_cov)
    bcd.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(40, 52, 60), width=1)
    
    bl_size = 180
    b_logo = logo_img.resize((bl_size, bl_size), Image.Resampling.LANCZOS)
    b_cov.paste(b_logo, ((PAGE_W - bl_size) // 2, 220), b_logo)
    
    bcd.text((PAGE_W // 2, 440), "B I M C O", fill=(255, 255, 255), font=get_font(42, bold=True), anchor="mm")
    bcd.text((PAGE_W // 2, 490), "VOLUME II: RESIDENTIAL & FACADE ENGINEERING", fill=(194, 125, 83), font=get_font(16, bold=True), anchor="mm")
    bcd.text((PAGE_W // 2, 520), "BARCELONA, SPAIN", fill=(220, 230, 240), font=get_font(14, bold=True), anchor="mm")
    bcd.line([(PAGE_W // 2 - 140, 550), (PAGE_W // 2 + 140, 550)], fill=(50, 70, 80), width=2)
    
    contacts = [
        "STUDIO HEADQUARTERS: Barcelona, Spain",
        "DIRECTORS: Soheil Masti & Siavash Pazooki",
        "TELEPHONE & WHATSAPP: +34 610 855 434",
        "OFFICIAL WEB PORTAL: www.bimco.ir",
        "SPECIALIZATION: Multi-Family Housing • Ventilated Facades • BIM LOD 350 • Lighting"
    ]
    cy = 600
    for c in contacts:
        bcd.text((PAGE_W // 2, cy), c, fill=(175, 195, 205), font=get_font(14), anchor="mm")
        cy += 36
        
    bcd.text((PAGE_W // 2, PAGE_H - 70), "© 2026 BIMCO STUDIO BARCELONA. ALL RIGHTS RESERVED.", fill=(90, 110, 120), font=get_font(11), anchor="mm")
    bcd.text((PAGE_W // 2, PAGE_H - 50), "PAGE 32 / 32", fill=(80, 100, 110), font=get_font(10, bold=True), anchor="mm")
    b_cov.save(os.path.join(out_dir, "page_32.jpg"), quality=92)
    book_pages.append(b_cov)
    
    # COMPILE VOLUME 2 PDF
    print(f"Compiling PDF for Volume 2 to {pdf_out}...")
    pdf_doc = fitz.open()
    
    # 1. Front Cover Spread
    cov_spread = Image.new('RGB', (TARGET_W, TARGET_H), (14, 18, 22))
    cov_spread.paste(inc, (0, 0))
    cov_spread.paste(cov, (PAGE_W, 0))
    
    temp_sp = os.path.join(PUBLIC_DIR, '_temp_apartments.jpg')
    cov_spread.save(temp_sp, quality=92)
    c_doc = fitz.open(temp_sp)
    pdf_page = pdf_doc.new_page(width=TARGET_W, height=TARGET_H)
    pdf_page.insert_image(fitz.Rect(0, 0, TARGET_W, TARGET_H), filename=temp_sp)
    c_doc.close()
    
    # 2. All 14 Inner Spreads
    for sp in full_spreads_for_pdf:
        sp.save(temp_sp, quality=92)
        s_doc = fitz.open(temp_sp)
        pdf_page = pdf_doc.new_page(width=TARGET_W, height=TARGET_H)
        pdf_page.insert_image(fitz.Rect(0, 0, TARGET_W, TARGET_H), filename=temp_sp)
        s_doc.close()
        
    # 3. Back Cover Spread
    b_spread = Image.new('RGB', (TARGET_W, TARGET_H), (14, 18, 22))
    b_spread.paste(in_b, (0, 0))
    b_spread.paste(b_cov, (PAGE_W, 0))
    b_spread.save(temp_sp, quality=92)
    b_doc = fitz.open(temp_sp)
    pdf_page = pdf_doc.new_page(width=TARGET_W, height=TARGET_H)
    pdf_page.insert_image(fitz.Rect(0, 0, TARGET_W, TARGET_H), filename=temp_sp)
    b_doc.close()
    
    if os.path.exists(temp_sp):
        os.remove(temp_sp)
        
    pdf_doc.save(pdf_out)
    pdf_doc.close()
    
    # Copy to dist if dist exists
    dist_dir = r'c:\Users\Soheil\Documents\Apply\Website Memari\dist'
    if os.path.exists(dist_dir):
        import shutil
        shutil.copy2(pdf_out, os.path.join(dist_dir, os.path.basename(pdf_out)))
        dist_b_dir = os.path.join(dist_dir, 'portfolio_apartments', 'book_pages')
        os.makedirs(dist_b_dir, exist_ok=True)
        for f in glob.glob(os.path.join(out_dir, '*.jpg')):
            shutil.copy2(f, os.path.join(dist_b_dir, os.path.basename(f)))
            
    print(f"SUCCESS! {VOL_TITLE} PDF generated: {pdf_out} ({len(book_pages)} pages)")

# =========================================================================
# VOLUME 3: COMMERCIAL ARCHITECTURE & URBAN DESIGN (32 PAGES)
# =========================================================================
def generate_urban_commercial_volume():
    VOL_ID = "urban"
    VOL_TITLE = "Volume III: Commercial Architecture & Urban Design"
    TOTAL_PAGES = 32
    
    out_dir = os.path.join(PUBLIC_DIR, 'portfolio_urban', 'book_pages')
    os.makedirs(out_dir, exist_ok=True)
    pdf_out = os.path.join(PUBLIC_DIR, 'BIMCO_Volume3_Urban_Commercial.pdf')
    
    print(f"--- GENERATING {VOL_TITLE} ({TOTAL_PAGES} PAGES) ---")
    
    book_pages = []
    
    # Page 1: Cover
    cov = Image.new('RGB', (PAGE_W, PAGE_H), (14, 18, 22))
    cd = ImageDraw.Draw(cov)
    cd.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(40, 52, 60), width=1)
    cd.text((PAGE_W // 2, 90), "BARCELONA, SPAIN  •  ARCHITECTURAL MONOGRAPH", fill=(194, 125, 83), font=get_font(12, bold=True), anchor="mm")
    
    l_size = 230
    logo_r = logo_img.resize((l_size, l_size), Image.Resampling.LANCZOS)
    cov.paste(logo_r, ((PAGE_W - l_size) // 2, 160), logo_r)
    
    cd.text((PAGE_W // 2, 435), "B I M C O", fill=(255, 255, 255), font=get_font(42, bold=True), anchor="mm")
    cd.text((PAGE_W // 2, 485), "VOLUME III: COMMERCIAL & URBAN DESIGN", fill=(194, 125, 83), font=get_font(17, bold=True), anchor="mm")
    cd.line([(PAGE_W // 2 - 140, 515), (PAGE_W // 2 + 140, 515)], fill=(60, 80, 90), width=2)
    
    cd.text((PAGE_W // 2, 555), "CIVIC SCALE, COMMERCIAL FLOWS & RESILIENT URBAN MORPHOLOGY", fill=(230, 235, 240), font=get_font(13, bold=True), anchor="mm")
    cd.text((PAGE_W // 2, 590), "Curated Monograph of Commercial Hubs, Transit Infrastructure & Masterplans", fill=(140, 160, 170), font=get_font(11), anchor="mm")
    
    bx, by, bw, bh = 55, 660, PAGE_W - 110, 135
    cd.rectangle([bx, by, bx + bw, by + bh], fill=(20, 27, 33), outline=(50, 68, 78), width=1)
    cd.text((PAGE_W // 2, by + 26), "COLLABORATIVE LEADERSHIP & PRINCIPALS", fill=(194, 125, 83), font=get_font(12, bold=True), anchor="mm")
    cd.text((PAGE_W // 2, by + 60), "SOHEIL MASTI   &   SIAVASH PAZOOKI", fill=(255, 255, 255), font=get_font(18, bold=True), anchor="mm")
    cd.text((PAGE_W // 2, by + 90), "BIM Director & Computational Architect  |  Senior Architectural Designer & Visualizer", fill=(140, 160, 170), font=get_font(12), anchor="mm")
    cd.text((PAGE_W // 2, by + 115), "BIMCO STUDIO  •  BARCELONA, SPAIN", fill=(110, 130, 140), font=get_font(11, bold=True), anchor="mm")
    
    cd.text((PAGE_W // 2, PAGE_H - 70), "BARCELONA, SPAIN  •  EDITION 2026", fill=(100, 120, 130), font=get_font(12), anchor="mm")
    cd.text((PAGE_W // 2, PAGE_H - 50), "PAGE 01 / 32", fill=(80, 100, 110), font=get_font(10, bold=True), anchor="mm")
    
    cov.save(os.path.join(out_dir, "page_01.jpg"), quality=92)
    book_pages.append(cov)
    
    # Page 2: Inside Cover
    inc = Image.new('RGB', (PAGE_W, PAGE_H), (18, 24, 30))
    idr = ImageDraw.Draw(inc)
    idr.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(38, 50, 60), width=1)
    idr.text((60, 90), "BIMCO STUDIO BARCELONA", fill=(255, 255, 255), font=get_font(22, bold=True))
    idr.text((60, 120), "VOLUME III: COMMERCIAL ARCHITECTURE & URBAN DESIGN", fill=(194, 125, 83), font=get_font(13, bold=True))
    idr.line([(60, 145), (PAGE_W - 60, 145)], fill=(45, 60, 70), width=1)
    
    blocks = [
        ("STUDIO LOCATION", "Barcelona, Catalonia, Spain (Headquarters & Architectural Direction)"),
        ("VOLUME FOCUS", "Commercial Hubs, Transit Infrastructure, Urban Morphology & Masterplanning"),
        ("COLLABORATORS", "Soheil Masti (Computational Urbanism & BIM) & Siavash Pazooki (Spatial Design & CGI)"),
        ("MACRO COMMITMENT", "Regional masterplans, high-capacity retail concourses, and river basin restoration."),
        ("CONTACT & VERIFICATION", "Phone/WhatsApp: +34 610 855 434 | Web: www.bimco.ir | Barcelona, Spain")
    ]
    y = 210
    for t, v in blocks:
        idr.text((60, y), t, fill=(194, 125, 83), font=get_font(12, bold=True))
        idr.text((60, y + 25), v, fill=(185, 200, 210), font=get_font(13))
        y += 85
        
    idr.text((PAGE_W // 2, PAGE_H - 60), "PAGE 02 / 32  •  BIMCO STUDIO BARCELONA", fill=(100, 120, 130), font=get_font(11, bold=True), anchor="mm")
    inc.save(os.path.join(out_dir, "page_02.jpg"), quality=92)
    book_pages.append(inc)
    
    # Pages 3 & 4: Manifesto & Table of Contents
    v_man = Image.new('RGB', (TARGET_W, TARGET_H), (20, 26, 33))
    md = ImageDraw.Draw(v_man)
    apply_bimco_framing(
        v_man, VOL_TITLE, "PROLOGUE", "URBAN MANIFESTO & INDEX",
        "THE CIVIC SCALE: COMMERCE, MOBILITY & URBAN SYSTEMS", 3, 4, TOTAL_PAGES,
        brief_text="From Barcelona, BIMCO synthesizes complex commercial programs with resilient macro urban design.",
        technical_specs="Macro GIS/BIM Integration, Transit Isochrone Modeling, High-Span Steel Frames, Environmental CFD."
    )
    
    md.text((70, 150), "THE URBAN REALM & COMMERCIAL VITALITY", fill=(255, 255, 255), font=get_font(26, bold=True))
    md.text((70, 185), "Infrastructure, Human Movement, and Large-Scale Architectural Identity", fill=(194, 125, 83), font=get_font(14, bold=True))
    v_text = (
        "Cities thrive on the seamless exchange of people, goods, and civic ideas.\n"
        "At BIMCO Studio Barcelona, our commercial and urban design practice operates at the\n"
        "intersection of macro-scale regional planning and precise architectural detailing.\n\n"
        "From the heavy logistical and commercial dynamics of the East Tehran Steel Campus to\n"
        "the fluid arched monumental gallerias of Erbil Department Store, multi-level highway\n"
        "interchanges, and the ecological rejuvenation of river basins in Zargandeh, each project\n"
        "is engineered for longevity, pedestrian vitality, and sustainable economic performance."
    )
    y = 230
    for l in v_text.split('\n'):
        md.text((70, y), l, fill=(195, 210, 220), font=get_font(15))
        y += 24
        
    md.text((1020, 150), "COMMERCIAL & URBAN INDEX", fill=(255, 255, 255), font=get_font(26, bold=True))
    md.text((1020, 185), "Structured Progression from Commercial Hubs to Regional Masterplans", fill=(194, 125, 83), font=get_font(14, bold=True))
    
    urb_index = [
        ("01", "EAST TEHRAN STEEL COMPLEX", "Master Site Layout, Showrooms & Bank", "PGS 05-06"),
        ("02", "STEEL COMMERCIAL SHOWROOMS", "Industrial Sheds & High-Bay Storage", "PGS 07-08"),
        ("03", "ADMINISTRATIVE & BANK HQ", "Composite Metal Cladding & Dynamic Glazing", "PGS 09-10"),
        ("04", "LOGISTICS BAYS & URBAN ELEVATION", "Heavy Vehicle Turning & Street Signage", "PGS 11-12"),
        ("05", "ERBIL DEPARTMENT STORE", "Parametric Arched Vaults & Monumental Retail", "PGS 13-14"),
        ("06", "ERBIL RETAIL CONCOURSE", "Elliptical Skylight Galleria & Food Terraces", "PGS 15-16"),
        ("07", "ERBIL STORE PLANS & SECTIONS", "Multi-Level Retail Layouts & Span Engineering", "PGS 17-18"),
        ("08", "METROPOLITAN INFRASTRUCTURE", "Grade-Separated Highway Flyover Interchange", "PGS 19-20"),
        ("09", "ZARGANDEH BASIN MORPHOLOGY", "River Corridor Topography & Density Analysis", "PGS 21-22"),
        ("10", "RIVERBANK ECOLOGICAL DESIGN", "Linear Green Waterfront & Pedestrian Links", "PGS 23-24"),
        ("11", "HIGH-DENSITY URBAN SKYLINE", "3D Massing, Solar Envelopes & Wind Corridors", "PGS 25-26"),
        ("12", "TRANSIT-ORIENTED DEVELOPMENT", "Multimodal Hubs, Zoning & Walkability Grids", "PGS 27-28")
    ]
    
    vy = 225
    for num, name, desc, pgs in urb_index:
        md.rectangle([1020, vy, TARGET_W - 70, vy + 40], fill=(24, 32, 40), outline=(45, 60, 72), width=1)
        md.text((1035, vy + 20), num, fill=(194, 125, 83), font=get_font(11, bold=True), anchor="lm")
        md.text((1070, vy + 20), name, fill=(255, 255, 255), font=get_font(11, bold=True), anchor="lm")
        md.text((1440, vy + 20), desc, fill=(150, 170, 180), font=get_font(10), anchor="lm")
        md.text((TARGET_W - 85, vy + 20), pgs, fill=(194, 125, 83), font=get_font(10, bold=True), anchor="rm")
        vy += 45
        
    p3 = v_man.crop((0, 0, PAGE_W, PAGE_H))
    p4 = v_man.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
    p3.save(os.path.join(out_dir, "page_03.jpg"), quality=90)
    p4.save(os.path.join(out_dir, "page_04.jpg"), quality=90)
    book_pages.extend([p3, p4])
    
    # 12 SPREADS (Pages 5 to 28)
    urb_spreads = [
        (
            r'03_Commercial_and_Infrastructure\13_East_Tehran_Steel_Commercial_Complex\WhatsApp Image 2026-09-25 at 23.30.34 (1).jpeg',
            "COM-01", "Steel Complex Master Site", "Master Site Layout, Wholesale Showrooms & Bank", 5, 6,
            "Integrated industrial-commercial campus combining wholesale steel retail, bank branch, and heavy logistics arterial roads.",
            "Heavy vehicular circulation turning radii, 36m clear-span steel trusses, fire separation zoning."
        ),
        (
            r'03_Commercial_and_Infrastructure\13_East_Tehran_Steel_Commercial_Complex\WhatsApp Image 2026-09-25 at 23.30.34 (2).jpeg',
            "COM-02", "Steel Commercial Showroom", "High-Bay Industrial Sheds & Transparent Retail Front", 7, 8,
            "Dual-function commercial facility combining high-bay inventory storage with glazed display pavilions facing major avenues.",
            "15-ton overhead gantry crane coordination, insulated sandwich panels, heavy-duty industrial floor screed."
        ),
        (
            r'03_Commercial_and_Infrastructure\13_East_Tehran_Steel_Commercial_Complex\WhatsApp Image 2026-09-25 at 23.30.34 (3).jpeg',
            "COM-03", "Administrative & Bank HQ", "Composite Metal Cladding & Corporate Architectural Identity", 9, 10,
            "Corporate headquarters and full-service commercial bank branch featuring dynamic angled glass curtains and metal rainscreens.",
            "Anthracite aluminum composite rainscreens, point-supported glass fittings, central VRF climate control system."
        ),
        (
            r'03_Commercial_and_Infrastructure\13_East_Tehran_Steel_Commercial_Complex\WhatsApp Image 2026-09-25 at 23.30.34 (4).jpeg',
            "COM-04", "Logistics Bays & Urban Elevation", "Loading Bays, Street Elevation & Integrated Signage", 11, 12,
            "Executive street elevation with synchronized loading docks, automated rolling sectional doors, and commercial branding band.",
            "Hydraulic dock levelers, semi-trailer circulation clearance, architectural exterior floodlights."
        ),
        (
            r'03_Commercial_and_Infrastructure\14_Erbil_Department_Store\WhatsApp Image 2026-09-25 at 23.31.33 (1).jpeg',
            "COM-05", "Erbil Department Store Architecture", "Parametric Vaults & Monumental Retail Facade", 13, 14,
            "Regional department store landmark in Erbil featuring monumental parabolic arches and sandstone cladding.",
            "Parametric curved steel arches, exterior tensioned fabric solar screens, high-capacity passenger elevators."
        ),
        (
            r'03_Commercial_and_Infrastructure\14_Erbil_Department_Store\WhatsApp Image 2026-09-25 at 23.31.33 (2).jpeg',
            "COM-06", "Erbil Retail Concourse & Skylight", "Commercial Circulation & Daylit Central Galleria", 15, 16,
            "Expansive retail galleria centered around an elliptical daylight atrium with panoramic escalators and food court verandas.",
            "Atrium smoke extraction venting, automated NFPA sprinkler zoning, acoustic baffle ceiling systems."
        ),
        (
            r'03_Commercial_and_Infrastructure\14_Erbil_Department_Store\WhatsApp Image 2026-09-25 at 23.31.33 (3).jpeg',
            "COM-07", "Erbil Store Floor Plans & Sections", "Multi-Level Retail Layouts & Structural Span Sections", 17, 18,
            "Comprehensive retail floor plans detailing anchor department zones, boutique tenant layouts, and underground delivery.",
            "Post-tensioned two-way slab (12x12m column grid), emergency egress stair calculations, MEP distribution shafts."
        ),
        (
            r'03_Commercial_and_Infrastructure\15_Bridge_and_Highway_Infrastructure\WhatsApp Image 2026-09-25 at 23.26.51.jpeg',
            "INF-08", "Metropolitan Infrastructure", "Grade-Separated Highway Flyover Interchange", 19, 20,
            "Civil and urban highway interchange optimizing vehicle flow through multi-level curved flyovers and grade separations.",
            "Prestressed concrete box-girder superstructures, elastomeric bridge bearings, stormwater runoff detention."
        ),
        (
            r'05_Urban_Planning_and_Landscape\22_Zargandeh_Riverside_Urban_Morphology\WhatsApp Image 2026-09-25 at 23.53.04 (1).jpeg',
            "URB-09", "Zargandeh Basin Morphology Analysis", "River Corridor Topography & Micro-District Density", 21, 22,
            "Spatial morphology research evaluating historic development patterns, steep slope risks, and tissue permeability.",
            "GIS spatial statistics, parcel density mapping, slope stability calculations, riparian buffer zoning."
        ),
        (
            r'05_Urban_Planning_and_Landscape\22_Zargandeh_Riverside_Urban_Morphology\WhatsApp Image 2026-09-25 at 23.53.04 (2).jpeg',
            "URB-10", "Riverbank Ecological Regeneration", "Linear Green Waterfront & Pedestrian Corridors", 23, 24,
            "Urban renewal masterplan converting degraded riverbanks into accessible green recreational spines with pedestrian bridges.",
            "Bioengineered slope stabilization, permeable surfaces, urban bioswales and drought-tolerant native vegetation."
        ),
        (
            r'05_Urban_Planning_and_Landscape\23_Urban_Design_High_Density_Masterplan\WhatsApp Image 2026-09-25 at 23.53.05 (1).jpeg',
            "URB-11", "High-Density Skyline & Solar Corridors", "3D Massing, Urban Skyline & Microclimate Simulation", 25, 26,
            "Macro urban massing strategy sculpting high-rise envelopes to maximize street-level sunlight and pedestrian wind comfort.",
            "Ladybug daylight envelope analysis, CFD urban microclimate modeling, Floor Area Ratio optimization up to 800%."
        ),
        (
            r'05_Urban_Planning_and_Landscape\23_Urban_Design_High_Density_Masterplan\WhatsApp Image 2026-09-25 at 23.53.05 (2).jpeg',
            "URB-12", "Transit-Oriented Development (TOD)", "Multimodal Mobility, Mixed-Use Zoning & Urban Fabric", 27, 28,
            "Transit-oriented district masterplan integrating high-speed rail, metro stations, pedestrian boulevards, and public squares.",
            "Pedestrian isochrone 5/10 min walksheds, underground automated logistics, district-scale geothermal energy grid."
        )
    ]
    
    full_spreads_for_pdf = [v_man]
    
    for rel_path, code, title, sub, pl, pr, br, sp in urb_spreads:
        full_path = os.path.join(BASE_IMG_DIR, rel_path)
        print(f"Generating Urban Spread: [{code}] {title} (Pages {pl}-{pr})...")
        sp_img = create_project_spread(
            full_path, VOL_TITLE, code, "Commercial Architecture & Urban Design",
            title, pl, pr, TOTAL_PAGES, brief_text=br, technical_specs=sp
        )
        full_spreads_for_pdf.append(sp_img)
        
        lp = sp_img.crop((0, 0, PAGE_W, PAGE_H))
        rp = sp_img.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
        
        lp.save(os.path.join(out_dir, f"page_{pl:02d}.jpg"), quality=90)
        rp.save(os.path.join(out_dir, f"page_{pr:02d}.jpg"), quality=90)
        book_pages.extend([lp, rp])
        
    # Pages 29 & 30: Principals Profile (Commercial & Urban Focus)
    prin = Image.new('RGB', (TARGET_W, TARGET_H), (18, 24, 30))
    apply_bimco_framing(
        prin, VOL_TITLE, "DIRECTORS", "URBAN PRACTICE LEADERSHIP",
        "SOHEIL MASTI & SIAVASH PAZOOKI", 29, 30, TOTAL_PAGES,
        brief_text="BIMCO Studio Barcelona unites computational urban modeling with civic commercial architecture.",
        technical_specs="GIS & Macro BIM Integration, Transit Isochrones, Civil Infrastructure Systems, LOD 350."
    )
    pd = ImageDraw.Draw(prin)
    
    # Soheil Masti Box (Page 29)
    pd.rectangle([70, 140, 920, TARGET_H - 120], fill=(24, 32, 40), outline=(50, 70, 85), width=1)
    pd.text((100, 175), "SOHEIL MASTI", fill=(255, 255, 255), font=get_font(28, bold=True))
    pd.text((100, 215), "BIM Director & Computational Urban Lead", fill=(194, 125, 83), font=get_font(15, bold=True))
    pd.text((100, 240), "BIMCO Studio Barcelona  •  Spain & International", fill=(130, 150, 160), font=get_font(12))
    pd.line([(100, 265), (890, 265)], fill=(45, 65, 78), width=1)
    
    soh_text = (
        "COMMERCIAL BIM & URBAN SYSTEMS LEADERSHIP:\n"
        "• Strategic BIM implementation for large-scale commercial complexes & logistics hubs\n"
        "• Civil & infrastructure BIM coordination with Revit, Civil 3D, and Navisworks\n"
        "• Automated quantities, heavy structural steel scheduling & MEP clash resolutions\n"
        "• Computational urban massing, solar exposure analysis & microclimate optimization\n"
        "• Digital management of complex multi-stakeholder commercial developments"
    )
    sy = 295
    for l in soh_text.split('\n'):
        if l.endswith(':'):
            pd.text((100, sy), l, fill=(194, 125, 83), font=get_font(13, bold=True))
            sy += 26
        else:
            pd.text((100, sy), l, fill=(180, 195, 205), font=get_font(13))
            sy += 24

    # Siavash Pazooki Box (Page 30)
    pd.rectangle([980, 140, TARGET_W - 70, TARGET_H - 120], fill=(24, 32, 40), outline=(50, 70, 85), width=1)
    pd.text((1010, 175), "SIAVASH PAZOOKI", fill=(255, 255, 255), font=get_font(28, bold=True))
    pd.text((1010, 215), "Senior Architectural Designer & Urban Visualizer", fill=(194, 125, 83), font=get_font(15, bold=True))
    pd.text((1010, 240), "M.Arch & B.Arch  •  BIMCO Studio Barcelona Partner", fill=(130, 150, 160), font=get_font(12))
    pd.line([(1010, 265), (TARGET_W - 100, 265)], fill=(45, 65, 78), width=1)
    
    sia_text = (
        "COMMERCIAL & URBAN DESIGN LEADERSHIP:\n"
        "• Lead Architectural Concept Designer for regional commercial hubs & department stores\n"
        "• Urban masterplanning, spatial morphology research, and skyline massing strategies\n"
        "• Advanced photorealistic visualization of civic retail gallerias, flyovers & public spaces\n"
        "• Comprehensive floor plan layouts, multi-level retail circulation & structural bays\n"
        "• Over 8 years directing high-impact commercial and urban infrastructure commissions"
    )
    sy = 295
    for l in sia_text.split('\n'):
        if l.endswith(':'):
            pd.text((1010, sy), l, fill=(194, 125, 83), font=get_font(13, bold=True))
            sy += 26
        else:
            pd.text((1010, sy), l, fill=(180, 195, 205), font=get_font(13))
            sy += 24
            
    full_spreads_for_pdf.append(prin)
    p29 = prin.crop((0, 0, PAGE_W, PAGE_H))
    p30 = prin.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
    p29.save(os.path.join(out_dir, "page_29.jpg"), quality=90)
    p30.save(os.path.join(out_dir, "page_30.jpg"), quality=90)
    book_pages.extend([p29, p30])
    
    # Page 31: Inside Back Cover
    in_b = Image.new('RGB', (PAGE_W, PAGE_H), (18, 24, 30))
    ibd = ImageDraw.Draw(in_b)
    ibd.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(38, 50, 60), width=1)
    ibd.text((60, 90), "BIMCO COMMERCIAL & URBAN PROTOCOL", fill=(255, 255, 255), font=get_font(22, bold=True))
    ibd.text((60, 120), "MACRO-TO-MICRO INTEGRATION STANDARDS", fill=(194, 125, 83), font=get_font(13, bold=True))
    ibd.line([(60, 145), (PAGE_W - 60, 145)], fill=(45, 60, 70), width=1)
    
    urb_steps = [
        ("STAGE 1: MACRO GIS & REGIONAL DEMAND", "Demographic catchment analysis, transit isochrone mapping, regional freight logistics access."),
        ("STAGE 2: URBAN MORPHOLOGY & MASSING", "Solar envelope sculpting, prevailing wind microclimate analysis, open space networks."),
        ("STAGE 3: BIM LOD 350 INTEGRATED HUBS", "Clear-span structural truss coordination, multi-tier underground parking, MEP central plant."),
        ("STAGE 4: PEDESTRIAN FLOW & EGRESS SIMULATION", "Atrium circulation optimization, fire life safety egress compliance, queueing calculations."),
        ("STAGE 5: CIVIC MATERIALITY & FAÇADE ENGINEERING", "Heavy-traffic resilient floorings, high-span curtain walls, acoustic reverberation control."),
        ("STAGE 6: MULTI-PHASE CONSTRUCTION STAGING", "Continuous site logistics management, crane positioning studies, municipal handover.")
    ]
    y = 200
    for st, sd in urb_steps:
        ibd.text((60, y), st, fill=(194, 125, 83), font=get_font(12, bold=True))
        ibd.text((60, y + 25), sd, fill=(185, 200, 210), font=get_font(12))
        y += 75
        
    ibd.text((PAGE_W // 2, PAGE_H - 60), "PAGE 31 / 32  •  BIMCO STUDIO BARCELONA", fill=(100, 120, 130), font=get_font(11, bold=True), anchor="mm")
    in_b.save(os.path.join(out_dir, "page_31.jpg"), quality=92)
    book_pages.append(in_b)
    
    # Page 32: Back Cover
    b_cov = Image.new('RGB', (PAGE_W, PAGE_H), (14, 18, 22))
    bcd = ImageDraw.Draw(b_cov)
    bcd.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(40, 52, 60), width=1)
    
    bl_size = 180
    b_logo = logo_img.resize((bl_size, bl_size), Image.Resampling.LANCZOS)
    b_cov.paste(b_logo, ((PAGE_W - bl_size) // 2, 220), b_logo)
    
    bcd.text((PAGE_W // 2, 440), "B I M C O", fill=(255, 255, 255), font=get_font(42, bold=True), anchor="mm")
    bcd.text((PAGE_W // 2, 490), "VOLUME III: COMMERCIAL & URBAN DESIGN", fill=(194, 125, 83), font=get_font(17, bold=True), anchor="mm")
    bcd.text((PAGE_W // 2, 520), "BARCELONA, SPAIN", fill=(220, 230, 240), font=get_font(14, bold=True), anchor="mm")
    bcd.line([(PAGE_W // 2 - 140, 550), (PAGE_W // 2 + 140, 550)], fill=(50, 70, 80), width=2)
    
    contacts = [
        "STUDIO HEADQUARTERS: Barcelona, Spain",
        "DIRECTORS: Soheil Masti & Siavash Pazooki",
        "TELEPHONE & WHATSAPP: +34 610 855 434",
        "OFFICIAL WEB PORTAL: www.bimco.ir",
        "SPECIALIZATION: Commercial Hubs • Department Stores • Urban Masterplans • Infrastructure"
    ]
    cy = 600
    for c in contacts:
        bcd.text((PAGE_W // 2, cy), c, fill=(175, 195, 205), font=get_font(14), anchor="mm")
        cy += 36
        
    bcd.text((PAGE_W // 2, PAGE_H - 70), "© 2026 BIMCO STUDIO BARCELONA. ALL RIGHTS RESERVED.", fill=(90, 110, 120), font=get_font(11), anchor="mm")
    bcd.text((PAGE_W // 2, PAGE_H - 50), "PAGE 32 / 32", fill=(80, 100, 110), font=get_font(10, bold=True), anchor="mm")
    b_cov.save(os.path.join(out_dir, "page_32.jpg"), quality=92)
    book_pages.append(b_cov)
    
    # COMPILE VOLUME 3 PDF
    print(f"Compiling PDF for Volume 3 to {pdf_out}...")
    pdf_doc = fitz.open()
    
    # 1. Front Cover Spread
    cov_spread = Image.new('RGB', (TARGET_W, TARGET_H), (14, 18, 22))
    cov_spread.paste(inc, (0, 0))
    cov_spread.paste(cov, (PAGE_W, 0))
    
    temp_sp = os.path.join(PUBLIC_DIR, '_temp_urban.jpg')
    cov_spread.save(temp_sp, quality=92)
    c_doc = fitz.open(temp_sp)
    pdf_page = pdf_doc.new_page(width=TARGET_W, height=TARGET_H)
    pdf_page.insert_image(fitz.Rect(0, 0, TARGET_W, TARGET_H), filename=temp_sp)
    c_doc.close()
    
    # 2. All 14 Inner Spreads
    for sp in full_spreads_for_pdf:
        sp.save(temp_sp, quality=92)
        s_doc = fitz.open(temp_sp)
        pdf_page = pdf_doc.new_page(width=TARGET_W, height=TARGET_H)
        pdf_page.insert_image(fitz.Rect(0, 0, TARGET_W, TARGET_H), filename=temp_sp)
        s_doc.close()
        
    # 3. Back Cover Spread
    b_spread = Image.new('RGB', (TARGET_W, TARGET_H), (14, 18, 22))
    b_spread.paste(in_b, (0, 0))
    b_spread.paste(b_cov, (PAGE_W, 0))
    b_spread.save(temp_sp, quality=92)
    b_doc = fitz.open(temp_sp)
    pdf_page = pdf_doc.new_page(width=TARGET_W, height=TARGET_H)
    pdf_page.insert_image(fitz.Rect(0, 0, TARGET_W, TARGET_H), filename=temp_sp)
    b_doc.close()
    
    if os.path.exists(temp_sp):
        os.remove(temp_sp)
        
    pdf_doc.save(pdf_out)
    pdf_doc.close()
    
    # Copy to dist if dist exists
    dist_dir = r'c:\Users\Soheil\Documents\Apply\Website Memari\dist'
    if os.path.exists(dist_dir):
        import shutil
        shutil.copy2(pdf_out, os.path.join(dist_dir, os.path.basename(pdf_out)))
        dist_b_dir = os.path.join(dist_dir, 'portfolio_urban', 'book_pages')
        os.makedirs(dist_b_dir, exist_ok=True)
        for f in glob.glob(os.path.join(out_dir, '*.jpg')):
            shutil.copy2(f, os.path.join(dist_b_dir, os.path.basename(f)))
            
    print(f"SUCCESS! {VOL_TITLE} PDF generated: {pdf_out} ({len(book_pages)} pages)")

if __name__ == '__main__':
    import sys
    arg = sys.argv[1] if len(sys.argv) > 1 else 'all'
    if arg in ('1', 'villas'):
        generate_villas_volume()
    elif arg in ('2', 'apartments'):
        generate_apartments_volume()
    elif arg in ('3', 'urban'):
        generate_urban_commercial_volume()
    else:
        # Generate both volume 2 and volume 3 (volume 1 already generated, or generate all)
        print("Executing generation for Volume 2 & Volume 3...")
        generate_apartments_volume()
        generate_urban_commercial_volume()

