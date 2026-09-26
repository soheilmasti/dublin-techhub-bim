import os
import glob
from PIL import Image, ImageDraw, ImageFont
import fitz # PyMuPDF

TARGET_W = 1920
TARGET_H = 1080
PAGE_W = 960
PAGE_H = 1080

PUBLIC_DIR = r'c:\Users\Soheil\Documents\Apply\Website Memari\public'
SAMPLE_DIR = os.path.join(PUBLIC_DIR, 'portfolio_sample')
BOOK_DIR = os.path.join(SAMPLE_DIR, 'book_pages')
os.makedirs(BOOK_DIR, exist_ok=True)

BASE_IMG_DIR = r'C:\Users\Soheil\Pictures\Siavash_Categorized'
LOGO_PATH = os.path.join(PUBLIC_DIR, 'logo.png')
logo_img = Image.open(LOGO_PATH).convert('RGBA')

def get_font(size, bold=False):
    font_file = r'C:\Windows\Fonts\segoeuib.ttf' if bold else r'C:\Windows\Fonts\segoeui.ttf'
    if not os.path.exists(font_file):
        font_file = r'C:\Windows\Fonts\arialbd.ttf' if bold else r'C:\Windows\Fonts\arial.ttf'
    return ImageFont.truetype(font_file, size)

# Common styling helper for all spreads
def apply_bimco_framing(
    canvas, 
    project_code, 
    category_title, 
    project_title, 
    page_left_num, 
    page_right_num, 
    brief_text="", 
    technical_specs=None
):
    draw = ImageDraw.Draw(canvas)
    
    # 1. TOP HEADER BAR
    draw.rectangle([0, 0, TARGET_W, 72], fill=(16, 22, 28))
    draw.line([(0, 72), (TARGET_W, 72)], fill=(45, 60, 72), width=1)
    
    # Left Header: Logo + Studio Barcelona
    sm_logo = logo_img.resize((48, 48), Image.Resampling.LANCZOS)
    canvas.paste(sm_logo, (35, 12), sm_logo)
    
    draw.text((95, 27), "BIMCO STUDIO BARCELONA", fill=(255, 255, 255), font=get_font(15, bold=True), anchor="lm")
    draw.text((95, 48), "ARCHITECTURE & BIM ENGINEERING  •  BARCELONA, SPAIN", fill=(194, 125, 83), font=get_font(11, bold=True), anchor="lm")
    
    # Center Header: Project Identification
    draw.line([(450, 20), (450, 52)], fill=(55, 70, 80), width=1)
    draw.text((475, 27), f"[{project_code}]  {category_title.upper()}", fill=(140, 165, 180), font=get_font(11, bold=True), anchor="lm")
    draw.text((475, 48), f"{project_title.upper()}", fill=(240, 245, 250), font=get_font(13, bold=True), anchor="lm")
    
    # Right Header: Co-Authorship & Principals
    draw.text((TARGET_W - 35, 27), "SOHEIL MASTI  •  SIAVASH PAZOOKI", fill=(255, 255, 255), font=get_font(13, bold=True), anchor="rm")
    draw.text((TARGET_W - 35, 48), "PROJECT DIRECTORS & PRINCIPALS  |  BARCELONA", fill=(170, 185, 195), font=get_font(11), anchor="rm")
    
    # 2. BOTTOM TECHNICAL RUNNING FOOTER
    draw.rectangle([0, TARGET_H - 46, TARGET_W, TARGET_H], fill=(16, 22, 28))
    draw.line([(0, TARGET_H - 46), (TARGET_W, TARGET_H - 46)], fill=(45, 60, 72), width=1)
    
    # Left footer: Studio Location & Direct Contact
    draw.text((35, TARGET_H - 24), "BARCELONA, SPAIN  •  TEL: +34 610 855 434  •  WWW.BIMCO.IR", fill=(130, 150, 160), font=get_font(11), anchor="lm")
    
    # Center footer: Technical Services
    draw.text((TARGET_W // 2, TARGET_H - 24), "ARCHITECTURAL DESIGN  |  BIM LOD 350 AUDIT  |  MILLWORK  |  CONSTRUCTION OVERSIGHT", fill=(194, 125, 83), font=get_font(11, bold=True), anchor="mm")
    
    # Page Numbers on Left & Right Margins
    draw.text((120, TARGET_H - 24), f"PAGE {page_left_num:02d}", fill=(255, 255, 255), font=get_font(11, bold=True), anchor="rm")
    draw.text((TARGET_W - 35, TARGET_H - 24), f"PAGE {page_right_num:02d} / 38", fill=(255, 255, 255), font=get_font(11, bold=True), anchor="rm")
    
    # 3. ANTI-PLAGIARISM / AUTHENTICITY STAMPS (Embedded in both left & right corners)
    # Left Stamp
    draw.rectangle([35, 85, 210, 115], fill=(24, 32, 40, 210), outline=(50, 68, 82), width=1)
    draw.text((45, 100), "VERIFIED BIMCO SHEET", fill=(194, 125, 83), font=get_font(9, bold=True), anchor="lm")
    draw.text((200, 100), "BCN", fill=(120, 140, 150), font=get_font(9, bold=True), anchor="rm")

    # Right Stamp
    draw.rectangle([TARGET_W - 210, 85, TARGET_W - 35, 115], fill=(24, 32, 40, 210), outline=(50, 68, 82), width=1)
    draw.text((TARGET_W - 200, 100), "© 2026 BIMCO BARCELONA", fill=(194, 125, 83), font=get_font(9, bold=True), anchor="lm")
    draw.text((TARGET_W - 45, 100), "SPAIN", fill=(120, 140, 150), font=get_font(9, bold=True), anchor="rm")

    # 4. Narrative / Brief Overlay Bar if provided
    if brief_text:
        # Bottom-left brief card
        cw, ch = 520, 65
        cx, cy = 35, TARGET_H - 120
        draw.rectangle([cx, cy, cx + cw, cy + ch], fill=(22, 28, 35, 240), outline=(55, 75, 90), width=1)
        draw.text((cx + 12, cy + 18), "ARCHITECTURAL BRIEF & NARRATIVE", fill=(194, 125, 83), font=get_font(10, bold=True))
        draw.text((cx + 12, cy + 38), brief_text[:85] + ("..." if len(brief_text) > 85 else ""), fill=(200, 215, 225), font=get_font(10))

    if technical_specs:
        # Bottom-right specs card
        cw, ch = 480, 65
        cx, cy = TARGET_W - 35 - cw, TARGET_H - 120
        draw.rectangle([cx, cy, cx + cw, cy + ch], fill=(22, 28, 35, 240), outline=(55, 75, 90), width=1)
        draw.text((cx + 12, cy + 18), "BIM & TECHNICAL SPECIFICATION", fill=(194, 125, 83), font=get_font(10, bold=True))
        draw.text((cx + 12, cy + 38), technical_specs[:80] + ("..." if len(technical_specs) > 80 else ""), fill=(200, 215, 225), font=get_font(10))

# ----------------- COVER & OPENING PAGES -----------------

def create_front_cover():
    im = Image.new('RGB', (PAGE_W, PAGE_H), (14, 18, 22)) # Deep graphite
    draw = ImageDraw.Draw(im)
    
    # Outer architectural frame
    draw.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(40, 52, 60), width=1)
    draw.rectangle([40, 40, PAGE_W - 40, PAGE_H - 40], outline=(25, 34, 40), width=1)
    
    # Barcelona location badge top
    draw.text((PAGE_W // 2, 90), "BARCELONA, SPAIN  •  MONOGRAPH EDITION 2026", fill=(194, 125, 83), font=get_font(12, bold=True), anchor="mm")
    draw.line([(PAGE_W // 2 - 120, 110), (PAGE_W // 2 + 120, 110)], fill=(50, 70, 80), width=1)
    
    # Metallic BIMCO Logo
    l_size = 240
    logo_resized = logo_img.resize((l_size, l_size), Image.Resampling.LANCZOS)
    im.paste(logo_resized, ((PAGE_W - l_size) // 2, 170), logo_resized)
    
    # Title
    draw.text((PAGE_W // 2, 455), "B I M C O", fill=(255, 255, 255), font=get_font(44, bold=True), anchor="mm")
    draw.text((PAGE_W // 2, 510), "ARCHITECTURE & ENGINEERING STUDIO", fill=(194, 125, 83), font=get_font(18, bold=True), anchor="mm")
    
    draw.line([(PAGE_W // 2 - 160, 545), (PAGE_W // 2 + 160, 545)], fill=(60, 80, 90), width=2)
    
    # Subtitle
    draw.text((PAGE_W // 2, 580), "COLLABORATIVE ARCHITECTURAL & BIM PORTFOLIO", fill=(235, 240, 245), font=get_font(17, bold=True), anchor="mm")
    draw.text((PAGE_W // 2, 615), "Luxury Villas • Facade Engineering • Commercial Complexes • Interior Millwork", fill=(140, 160, 170), font=get_font(12), anchor="mm")
    
    # Collaborative Box
    bx, by, bw, bh = 55, 680, PAGE_W - 110, 135
    draw.rectangle([bx, by, bx + bw, by + bh], fill=(20, 27, 33), outline=(50, 68, 78), width=1)
    draw.text((PAGE_W // 2, by + 28), "COLLABORATIVE LEADERSHIP & PRINCIPALS", fill=(194, 125, 83), font=get_font(12, bold=True), anchor="mm")
    draw.text((PAGE_W // 2, by + 62), "SOHEIL MASTI   &   SIAVASH PAZOOKI", fill=(255, 255, 255), font=get_font(18, bold=True), anchor="mm")
    draw.text((PAGE_W // 2, by + 92), "BIM Director & Computational Architect  |  Senior Architectural Designer & Visualizer", fill=(140, 160, 170), font=get_font(12), anchor="mm")
    draw.text((PAGE_W // 2, by + 115), "BIMCO STUDIO  •  BARCELONA, SPAIN", fill=(110, 130, 140), font=get_font(11, bold=True), anchor="mm")
    
    # Bottom stamp
    draw.text((PAGE_W // 2, PAGE_H - 70), "BARCELONA  •  TEHRAN  •  INTERNATIONAL PRACTICE", fill=(100, 120, 130), font=get_font(12), anchor="mm")
    draw.text((PAGE_W // 2, PAGE_H - 50), "PAGE 01 / 38", fill=(80, 100, 110), font=get_font(10, bold=True), anchor="mm")
    return im

def create_inside_cover():
    im = Image.new('RGB', (PAGE_W, PAGE_H), (18, 24, 30))
    draw = ImageDraw.Draw(im)
    draw.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(38, 50, 60), width=1)
    
    # Studio accreditation
    draw.text((60, 90), "BIMCO STUDIO BARCELONA", fill=(255, 255, 255), font=get_font(22, bold=True))
    draw.text((60, 120), "OFFICIAL ARCHITECTURAL & BIM PORTFOLIO PUBLICATION", fill=(194, 125, 83), font=get_font(13, bold=True))
    draw.line([(60, 145), (PAGE_W - 60, 145)], fill=(45, 60, 70), width=1)
    
    info_blocks = [
        ("STUDIO LOCATION", "Barcelona, Catalonia, Spain (Headquarters & Architectural Direction)"),
        ("COLLABORATIVE PRACTICE", "Founded on the synergy between Architectural Design & Advanced BIM LOD 350"),
        ("PROJECT DIRECTORS", "Soheil Masti (BIM & Computational Systems) & Siavash Pazooki (Design & Visualization)"),
        ("DISCIPLINES", "High-End Residential Architecture, Facade Engineering, Commercial Centers, Interior Joinery, Urban Plans"),
        ("VERIFICATION", "All drawings, 3D renders, and construction photographs are authenticated BIMCO works."),
        ("CONTACT & INQUIRIES", "Phone/WhatsApp: +34 610 855 434 | Website: www.bimco.ir | Barcelona, Spain")
    ]
    
    y = 200
    for title, val in info_blocks:
        draw.text((60, y), title, fill=(194, 125, 83), font=get_font(12, bold=True))
        draw.text((60, y + 25), val, fill=(185, 200, 210), font=get_font(13))
        y += 75
        
    draw.line([(60, PAGE_H - 100), (PAGE_W - 60, PAGE_H - 100)], fill=(45, 60, 70), width=1)
    draw.text((PAGE_W // 2, PAGE_H - 70), "PAGE 02 / 38  •  BIMCO STUDIO BARCELONA", fill=(100, 120, 130), font=get_font(11, bold=True), anchor="mm")
    return im

def create_manifesto_spread():
    canvas = Image.new('RGB', (TARGET_W, TARGET_H), (20, 26, 33))
    draw = ImageDraw.Draw(canvas)
    
    apply_bimco_framing(
        canvas, 
        "PROLOGUE", 
        "STUDIO PHILOSOPHY", 
        "THE BARCELONA ARCHITECTURAL & BIM MANIFESTO", 
        3, 
        4,
        brief_text="From our base in Barcelona, BIMCO integrates Mediterranean spatial purity with parametric BIM LOD 350 engineering.",
        technical_specs="Revit BIM LOD 350, Parametric Clash Detection, Corona/V-Ray High-End CGI, Executive Detailing."
    )
    
    # Left Column: The Manifesto (Page 3)
    draw.text((70, 150), "THE NARRATIVE OF BUILT FORM", fill=(255, 255, 255), font=get_font(26, bold=True))
    draw.text((70, 185), "Bridging Pure Concept, Topography, and Technical Execution", fill=(194, 125, 83), font=get_font(14, bold=True))
    
    manifesto_p1 = (
        "Architecture at BIMCO is conceived as an uncompromising dialogue between site geography,\n"
        "structural tectonics, and sensorial spatial experience. Operating from Barcelona, our practice\n"
        "merges the Mediterranean appreciation for natural light, tactile materiality, and open living\n"
        "with the exacting rigor of parametric BIM modeling (LOD 300 to 350).\n\n"
        "We reject the separation between 'designer' and 'builder'. Every curve, cantilever, and\n"
        "material junction showcased in this portfolio was engineered for real-world constructability—\n"
        "validated through clash audits, detailed shop drawings, and active on-site supervision."
    )
    y = 230
    for line in manifesto_p1.split('\n'):
        draw.text((70, y), line, fill=(195, 210, 220), font=get_font(15))
        y += 24

    # Core Pillars Left
    pillars = [
        ("01 / TOPOGRAPHY & CONTEXT", "Harnessing terrain slopes, climate, and vistas to shape organic, grounded architecture."),
        ("02 / BIM AUDIT & LOD 350 RIGOR", "Complete clash resolution, multi-discipline coordination, and precision quantity takeoffs."),
        ("03 / MILLWORK & TACTILE INTERIORS", "Bespoke cabinetry, lighting calculations, and turnkey executive joinery specifications."),
        ("04 / SITE VERIFICATION", "Bridging the gap between 3D visualization and physical construction on site.")
    ]
    y += 20
    for t, d in pillars:
        draw.rectangle([70, y, 900, y + 65], fill=(26, 35, 45), outline=(50, 70, 85), width=1)
        draw.text((90, y + 18), t, fill=(194, 125, 83), font=get_font(12, bold=True))
        draw.text((90, y + 40), d, fill=(165, 180, 190), font=get_font(11))
        y += 75

    # Right Column: Table of Contents & Scenario Index (Page 4)
    draw.text((1020, 150), "PORTFOLIO SCENARIO & CURATED CHAPTERS", fill=(255, 255, 255), font=get_font(26, bold=True))
    draw.text((1020, 185), "Structured Seven-Act Journey Across Scales & Typologies", fill=(194, 125, 83), font=get_font(14, bold=True))
    
    chapters = [
        ("ACT I", "TOPOGRAPHY & NATURE", "Dalkhani Forest Villa, Concrete & Glass Mountain Villa", "PAGES 05 - 08"),
        ("ACT II", "FROM MODEL TO BUILT REALITY", "Violet Villa, Mountain Chalet, Tehran Dasht (With Site Photos)", "PAGES 09 - 16"),
        ("ACT III", "URBAN FACADES & TECTONICS", "Darrous Facade 2020, Dalkhani Terraces, Modern Urban Blocks", "PAGES 17 - 22"),
        ("ACT IV", "COMMERCIAL MONUMENTALITY", "East Tehran Steel Complex, Erbil Arched Department Store", "PAGES 23 - 26"),
        ("ACT V", "THE TACTILE INTERIOR", "Smeg/Bosch Luxury Kitchens, Master Suites, Wardrobe Joinery", "PAGES 27 - 30"),
        ("ACT VI", "TERRITORIAL MORPHOLOGY", "Diamond Villa Town Masterplan, Zargandeh Riverside Analysis", "PAGES 31 - 34"),
        ("ACT VII", "LEADERSHIP & CREDENTIALS", "Soheil Masti & Siavash Pazooki Biographies, BIM Tools, Accreditation", "PAGES 35 - 38")
    ]
    
    cy = 230
    for act, title, sub, pgs in chapters:
        draw.rectangle([1020, cy, TARGET_W - 70, cy + 62], fill=(24, 32, 40), outline=(48, 65, 78), width=1)
        draw.text((1040, cy + 18), act, fill=(194, 125, 83), font=get_font(12, bold=True))
        draw.text((1110, cy + 18), title, fill=(255, 255, 255), font=get_font(13, bold=True))
        draw.text((TARGET_W - 90, cy + 18), pgs, fill=(194, 125, 83), font=get_font(11, bold=True), anchor="ra")
        draw.text((1040, cy + 40), sub, fill=(150, 170, 180), font=get_font(11))
        cy += 74

    return canvas

# Helper to place spread image with BIMCO frame
def create_project_spread(
    spread_img_path, 
    project_code, 
    category_title, 
    project_title, 
    page_left_num, 
    page_right_num,
    brief_text="",
    technical_specs=""
):
    canvas = Image.new('RGB', (TARGET_W, TARGET_H), (246, 248, 250))
    draw = ImageDraw.Draw(canvas)
    
    # Available area: 72px top to TARGET_H - 46px bottom
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
        
        # Soft architectural backdrop & border
        draw.rectangle([pos_x - 2, pos_y - 2, pos_x + new_w + 2, pos_y + new_h + 2], fill=(220, 225, 230))
        canvas.paste(sp_resized, (pos_x, pos_y))
        
    apply_bimco_framing(
        canvas,
        project_code,
        category_title,
        project_title,
        page_left_num,
        page_right_num,
        brief_text=brief_text,
        technical_specs=technical_specs
    )
    return canvas

def create_principals_spread():
    canvas = Image.new('RGB', (TARGET_W, TARGET_H), (18, 24, 30))
    draw = ImageDraw.Draw(canvas)
    
    apply_bimco_framing(
        canvas,
        "ACT VII",
        "STUDIO PRINCIPALS & QUALIFICATIONS",
        "EXECUTIVE LEADERSHIP & BIM/ARCHITECTURAL DIRECTORS",
        35,
        36,
        brief_text="BIMCO Studio Barcelona unites high-level BIM information architecture with signature spatial design.",
        technical_specs="Registered Architects, BIM Managers (Autodesk Certified), LOD 350 Audit Specialists."
    )
    
    # Left: Soheil Masti Profile (Page 35)
    draw.rectangle([70, 140, 920, TARGET_H - 120], fill=(24, 32, 40), outline=(50, 70, 85), width=1)
    draw.text((100, 175), "SOHEIL MASTI", fill=(255, 255, 255), font=get_font(28, bold=True))
    draw.text((100, 215), "BIM Director & Computational Architecture Lead", fill=(194, 125, 83), font=get_font(15, bold=True))
    draw.text((100, 240), "BIMCO Studio Barcelona  •  Spain & International", fill=(130, 150, 160), font=get_font(12))
    draw.line([(100, 265), (890, 265)], fill=(45, 65, 78), width=1)
    
    soheil_bio = (
        "CORE PROFESSIONAL COMPETENCIES:\n"
        "• Strategic BIM implementation, EIR/BEP execution & ISO 19650 compliance\n"
        "• Multi-discipline clash detection (Navisworks / Solibri) across Architecture, Structure & MEP\n"
        "• Parametric design automation, Dynamo scripting & computational facade systems\n"
        "• Quality control audits for LOD 300, 350 and 400 fabrication models\n"
        "• Comprehensive project lifecycle data management & international client relations\n\n"
        "SOFTWARE & TECHNICAL STACK:\n"
        "• Autodesk Revit (Architecture, Structure, MEP)  •  Navisworks Manage  •  Dynamo\n"
        "• IFC OpenShell  •  Solibri Model Checker  •  AutoCAD  •  Synchro 4D  •  Python"
    )
    sy = 290
    for l in soheil_bio.split('\n'):
        if l.endswith(':'):
            draw.text((100, sy), l, fill=(194, 125, 83), font=get_font(13, bold=True))
            sy += 24
        else:
            draw.text((100, sy), l, fill=(180, 195, 205), font=get_font(13))
            sy += 22

    # Right: Siavash Pazooki Profile (Page 36)
    draw.rectangle([980, 140, TARGET_W - 70, TARGET_H - 120], fill=(24, 32, 40), outline=(50, 70, 85), width=1)
    draw.text((1010, 175), "SIAVASH PAZOOKI", fill=(255, 255, 255), font=get_font(28, bold=True))
    draw.text((1010, 215), "Senior Architectural Designer & High-End 3D Visualizer", fill=(194, 125, 83), font=get_font(15, bold=True))
    draw.text((1010, 240), "M.Arch & B.Arch  •  BIMCO Studio Barcelona Partner", fill=(130, 150, 160), font=get_font(12))
    draw.line([(1010, 265), (TARGET_W - 100, 265)], fill=(45, 65, 78), width=1)

    siavash_bio = (
        "CORE PROFESSIONAL COMPETENCIES:\n"
        "• Lead Architectural Concept Design for luxury villas, residential towers & retail centers\n"
        "• Photorealistic architectural rendering, lighting simulation & cinematic camera direction\n"
        "• Facade tectonics, parametric louvers, material detailing & stone/wood joinery\n"
        "• Executive shop drawings, millwork coordination & on-site build supervision\n"
        "• Masterplanning, topographical terrain sculpting & public realm landscape design\n\n"
        "SOFTWARE & TECHNICAL STACK:\n"
        "• 3ds Max  •  Corona Renderer  •  V-Ray  •  Revit Architecture  •  Unreal Engine 5\n"
        "• Adobe Photoshop  •  AutoCAD 2D/3D  •  Rhino  •  Lumion  •  After Effects"
    )
    sy = 290
    for l in siavash_bio.split('\n'):
        if l.endswith(':'):
            draw.text((1010, sy), l, fill=(194, 125, 83), font=get_font(13, bold=True))
            sy += 24
        else:
            draw.text((1010, sy), l, fill=(180, 195, 205), font=get_font(13))
            sy += 22

    return canvas

def create_back_cover():
    im = Image.new('RGB', (PAGE_W, PAGE_H), (14, 18, 22))
    draw = ImageDraw.Draw(im)
    draw.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(40, 52, 60), width=1)
    
    l_size = 180
    logo_resized = logo_img.resize((l_size, l_size), Image.Resampling.LANCZOS)
    im.paste(logo_resized, ((PAGE_W - l_size) // 2, 220), logo_resized)
    
    draw.text((PAGE_W // 2, 440), "B I M C O", fill=(255, 255, 255), font=get_font(42, bold=True), anchor="mm")
    draw.text((PAGE_W // 2, 490), "ARCHITECTURE & ENGINEERING STUDIO", fill=(194, 125, 83), font=get_font(18, bold=True), anchor="mm")
    draw.text((PAGE_W // 2, 520), "BARCELONA, SPAIN", fill=(220, 230, 240), font=get_font(14, bold=True), anchor="mm")
    
    draw.line([(PAGE_W // 2 - 140, 550), (PAGE_W // 2 + 140, 550)], fill=(50, 70, 80), width=2)
    
    contacts = [
        "STUDIO HEADQUARTERS: Barcelona, Spain",
        "TELEPHONE & WHATSAPP: +34 610 855 434",
        "OFFICIAL WEB PORTAL: www.bimco.ir",
        "DIRECTORS: Soheil Masti & Siavash Pazooki",
        "CORE SERVICES: Architecture • BIM LOD 350 • Interiors • Site Supervision"
    ]
    cy = 600
    for c in contacts:
        draw.text((PAGE_W // 2, cy), c, fill=(175, 195, 205), font=get_font(14), anchor="mm")
        cy += 36
        
    draw.text((PAGE_W // 2, PAGE_H - 70), "© 2026 BIMCO STUDIO BARCELONA. ALL RIGHTS RESERVED.", fill=(90, 110, 120), font=get_font(11), anchor="mm")
    draw.text((PAGE_W // 2, PAGE_H - 50), "PAGE 38 / 38", fill=(80, 100, 110), font=get_font(10, bold=True), anchor="mm")
    return im

def create_inside_back_cover():
    im = Image.new('RGB', (PAGE_W, PAGE_H), (18, 24, 30))
    draw = ImageDraw.Draw(im)
    draw.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(38, 50, 60), width=1)
    
    draw.text((60, 90), "BIMCO COLLABORATIVE WORKFLOW", fill=(255, 255, 255), font=get_font(22, bold=True))
    draw.text((60, 120), "END-TO-END PROJECT DELIVERY STANDARDS", fill=(194, 125, 83), font=get_font(13, bold=True))
    draw.line([(60, 145), (PAGE_W - 60, 145)], fill=(45, 60, 70), width=1)
    
    steps = [
        ("PHASE 1: BRIEF & CONCEPTUAL MODELING", "Parametric volumetric studies, sun/shadow calculations, climate orientation, initial sketch synthesis."),
        ("PHASE 2: DETAILED ARCHITECTURAL DESIGN", "Floor plans, elevations, section tectonics, interior spaces, material palettes and daylight analysis."),
        ("PHASE 3: BIM LOD 300 - 350 IMPLEMENTATION", "Full parametric model in Revit, multi-trade clash resolution, MEP coordination, schedule takeoffs."),
        ("PHASE 4: HIGH-END VISUALIZATION & CGI", "Photorealistic rendering in Corona/V-Ray, lighting moods, virtual reality walk-throughs."),
        ("PHASE 5: EXECUTIVE SHOP DRAWINGS", "Precision construction documentation, joinery details, stone layout, ironmongery schedules."),
        ("PHASE 6: ON-SITE SUPERVISION & QA", "Regular inspection protocols, technical site reports, design integrity assurance during construction.")
    ]
    
    y = 200
    for title, desc in steps:
        draw.text((60, y), title, fill=(194, 125, 83), font=get_font(12, bold=True))
        draw.text((60, y + 25), desc, fill=(185, 200, 210), font=get_font(12))
        y += 75
        
    draw.line([(60, PAGE_H - 100), (PAGE_W - 60, PAGE_H - 100)], fill=(45, 60, 70), width=1)
    draw.text((PAGE_W // 2, PAGE_H - 70), "PAGE 37 / 38  •  BIMCO STUDIO BARCELONA", fill=(100, 120, 130), font=get_font(11, bold=True), anchor="mm")
    return im

# ----------------- CURATED SPREADS DEFINITION (ACTS I to VI) -----------------
spread_definitions = [
    # ACT I: TOPOGRAPHY & NATURE
    {
        "code": "ACT-I / VIL-01",
        "cat": "Topography & Nature",
        "title": "Dalkhani Forest Villa (Organic Architecture & Contoured Earth)",
        "file": os.path.join(BASE_IMG_DIR, '01_Luxury_Villas', '03_Dalkhani_Forest_Villa_Organic', 'WhatsApp Image 2026-09-25 at 23.26.18 (6).jpeg'),
        "p_left": 5, "p_right": 6,
        "brief": "Organic villa contoured into the dense mountain forest of Dalkhani, featuring curved earthen walls.",
        "specs": "Topographic mesh modeling, natural ventilation shafts, sustainable thermal adobe massing."
    },
    {
        "code": "ACT-I / VIL-02",
        "cat": "Topography & Nature",
        "title": "Concrete, Glass & Water Modern Villa (Topographical Harmony)",
        "file": os.path.join(BASE_IMG_DIR, '01_Luxury_Villas', '01_Concrete_Glass_Villa_Topography', 'WhatsApp Image 2026-09-25 at 22.54.37.jpeg'),
        "p_left": 7, "p_right": 8,
        "brief": "Ground & First floor plans with seamless connection between interior spaces and private infinity pool.",
        "specs": "Complete architectural layout, structural concrete grid, floor-to-ceiling double-glazed curtain walls."
    },
    # ACT II: FROM MODEL TO BUILT REALITY
    {
        "code": "ACT-II / BLT-01",
        "cat": "From Model to Built Reality",
        "title": "Violet Luxury Residence (Volumetric Design & Site Synthesis)",
        "file": os.path.join(BASE_IMG_DIR, '01_Luxury_Villas', '06_Violet_Villa', 'WhatsApp Image 2026-09-25 at 23.29.58.jpeg'),
        "p_left": 9, "p_right": 10,
        "brief": "Signature luxury villa layout featuring master suite wings, outdoor lounge, and garden pathways.",
        "specs": "BIM LOD 350 architectural model, stone facade cladding schedules, daylight optimization."
    },
    {
        "code": "ACT-II / BLT-02",
        "cat": "From Model to Built Reality",
        "title": "Violet Residence Execution (Floor Plans & On-Site Construction Photos)",
        "file": os.path.join(BASE_IMG_DIR, '01_Luxury_Villas', '06_Violet_Villa', 'WhatsApp Image 2026-09-25 at 23.29.59 (1).jpeg'),
        "p_left": 11, "p_right": 12,
        "brief": "Comprehensive execution documentation displaying physical on-site steel/concrete erection and frame progress.",
        "specs": "Active site supervision, structural beam-column verification, daylight analysis & floor plan set."
    },
    {
        "code": "ACT-II / BLT-03",
        "cat": "From Model to Built Reality",
        "title": "Mountain Stone & Timber Chalet (Forest Slope Renders & Site Execution)",
        "file": os.path.join(BASE_IMG_DIR, '01_Luxury_Villas', '02_Mountain_Hillside_Chalet_Stone_Timber', 'WhatsApp Image 2026-09-25 at 23.38.58 (1).jpeg'),
        "p_left": 13, "p_right": 14,
        "brief": "Hillside stone chalet nestled in mountain slopes with real construction scaffolding and concrete site photos.",
        "specs": "Rubble masonry retaining walls, timber roof trusses, seismic sloped foundation calculations."
    },
    {
        "code": "ACT-II / BLT-04",
        "cat": "From Model to Built Reality",
        "title": "Tehran Dasht Modern Villa (Swimming Pool & On-Site Concrete Pouring)",
        "file": os.path.join(BASE_IMG_DIR, '01_Luxury_Villas', '05_Tehran_Dasht_Villa', 'WhatsApp Image 2026-09-25 at 23.28.49.jpeg'),
        "p_left": 15, "p_right": 16,
        "brief": "Villa retreat with private pool and expansive gardens, verified by foundation and pool rebar construction photos.",
        "specs": "Reinforced concrete pool shell, hydraulic MEP coordination, integrated landscape lighting."
    },
    # ACT III: URBAN FACADES & TECTONICS
    {
        "code": "ACT-III / FAC-01",
        "cat": "Urban Facades & Tectonics",
        "title": "Darrous Luxury Residential Facade (Client: Mr. Ghorbani | Place: Darrous)",
        "file": os.path.join(BASE_IMG_DIR, '02_Residential_Buildings_Facades', '09_Darrous_Residential_Facade_2020', 'WhatsApp Image 2026-09-25 at 23.28.25 (5).jpeg'),
        "p_left": 17, "p_right": 18,
        "brief": "High-end urban facade engineering in Darrous, balancing dark natural stone, metallic louvers, and night lighting.",
        "specs": "Dry-hung stone subframe details, recessed architectural LED illumination, custom entrance gate."
    },
    {
        "code": "ACT-III / FAC-02",
        "cat": "Urban Facades & Tectonics",
        "title": "Dalkhani Terraces Residential Project (Mountain Slope Multi-Family)",
        "file": os.path.join(BASE_IMG_DIR, '02_Residential_Buildings_Facades', '10_Residential_Dalkhani_Terraces', 'WhatsApp Image 2026-09-25 at 23.29.09.jpeg'),
        "p_left": 19, "p_right": 20,
        "brief": "Stepped multi-family terraced residential block harmoniously integrated into steep mountain slope.",
        "specs": "Topographic stepping sections, cantilevered sky balconies, green roof garden drainage."
    },
    {
        "code": "ACT-III / FAC-03",
        "cat": "Urban Facades & Tectonics",
        "title": "Contemporary & Neoclassical Urban Collection (Corner Tectonics)",
        "file": os.path.join(BASE_IMG_DIR, '02_Residential_Buildings_Facades', '11_Mid_and_High_Rise_Residential_Collection', 'WhatsApp Image 2026-09-25 at 23.26.51 (2).jpeg'),
        "p_left": 21, "p_right": 22,
        "brief": "Exploration of contemporary residential mid-rises with deep green loggias alongside classical corner towers.",
        "specs": "Urban setback compliance, stone cornices, prefabricated modular facade panels."
    },
    # ACT IV: COMMERCIAL MONUMENTALITY
    {
        "code": "ACT-IV / COM-01",
        "cat": "Commercial Monumentality",
        "title": "East Tehran Steel Complex (Commercial Showroom, Bank & Logistics)",
        "file": os.path.join(BASE_IMG_DIR, '03_Commercial_and_Infrastructure', '13_East_Tehran_Steel_Commercial_Complex', 'WhatsApp Image 2026-09-25 at 23.30.34 (6).jpeg'),
        "p_left": 23, "p_right": 24,
        "brief": "Comprehensive commercial facility featuring flagship bank branch, executive offices, and heavy steel logistics hall.",
        "specs": "Long-span steel trusses, insulated composite panel envelopes, multi-modal truck circulation."
    },
    {
        "code": "ACT-IV / COM-02",
        "cat": "Commercial Monumentality",
        "title": "Erbil Department Store & Shopping Center (Fluid Arched Architecture)",
        "file": os.path.join(BASE_IMG_DIR, '03_Commercial_and_Infrastructure', '14_Erbil_Department_Store', 'WhatsApp Image 2026-09-25 at 23.31.33 (4).jpeg'),
        "p_left": 25, "p_right": 26,
        "brief": "Fluid contemporary retail mall characterized by monumental undulating arches and organic double-height atriums.",
        "specs": "Curved GRC facade panel engineering, retail circulation flow, high-capacity underground parking."
    },
    # ACT V: THE TACTILE INTERIOR
    {
        "code": "ACT-V / INT-01",
        "cat": "The Tactile Interior & Millwork",
        "title": "Bespoke Kitchen Architecture (Joinery Elevations & Smeg Built-in Specs)",
        "file": os.path.join(BASE_IMG_DIR, '04_Interior_Architecture', '16_Kitchen_Design_and_Appliances', 'WhatsApp Image 2026-09-25 at 23.32.32 (3).jpeg'),
        "p_left": 27, "p_right": 28,
        "brief": "Tailor-made kitchen architecture featuring bookmatched marble slabs, natural oak joinery, and Smeg appliances.",
        "specs": "Millwork shop drawings (1:20), concealed pantry mechanisms, built-in induction & extraction."
    },
    {
        "code": "ACT-V / INT-02",
        "cat": "The Tactile Interior & Millwork",
        "title": "Master Suites, Dressing Closets & Joinery (On-Site Fabrication Proof)",
        "file": os.path.join(BASE_IMG_DIR, '04_Interior_Architecture', '18_Master_Suites_and_Walk_in_Closets', 'WhatsApp Image 2026-09-25 at 23.32.33 (3).jpeg'),
        "p_left": 29, "p_right": 30,
        "brief": "Luxury walk-in closet with integrated LED profiles, verified with live carpentry assembly photos on site.",
        "specs": "Concealed hardware joinery, acoustic fabric panelling, warm 2700K indirect perimeter lighting."
    },
    # ACT VI: TERRITORIAL MORPHOLOGY
    {
        "code": "ACT-VI / PLN-01",
        "cat": "Territorial Planning & Morphology",
        "title": "Diamond Villa Town Masterplan (Riverside Community & Gateway)",
        "file": os.path.join(BASE_IMG_DIR, '05_Urban_Planning_and_Landscape', '20_Diamond_Villa_Town_Masterplan', 'WhatsApp Image 2026-09-25 at 23.28.07 (2).jpeg'),
        "p_left": 31, "p_right": 32,
        "brief": "Gated luxury residential community masterplanned along riverfront greenway, with landmark entry pavilion.",
        "specs": "Macro parcel subdivision, storm water retention swales, hierarchical private road infrastructure."
    },
    {
        "code": "ACT-VI / PLN-02",
        "cat": "Territorial Planning & Morphology",
        "title": "Zargandeh Riverside Urban Morphology (Fabric Analysis & Regeneration)",
        "file": os.path.join(BASE_IMG_DIR, '05_Urban_Planning_and_Landscape', '22_Zargandeh_Riverside_Urban_Morphology', 'WhatsApp Image 2026-09-25 at 23.53.04.jpeg'),
        "p_left": 33, "p_right": 34,
        "brief": "Academic urban design research analyzing morphological densities, organic pedestrian corridors, and riverfront regeneration.",
        "specs": "Morphological grain mapping, topological sectional studies, public realm sustainable revitalisation."
    }
]

# ----------------- MAIN COMPILATION SCRIPT -----------------
print("=== GENERATING BIMCO STUDIO BARCELONA MASTER PORTFOLIO ===")

# Book pages storage
book_pages = []

# Page 1: Front Cover
print("Creating Page 1 (Front Cover)...")
p1 = create_front_cover()
p1.save(os.path.join(BOOK_DIR, "page_01.jpg"), quality=92)
book_pages.append(p1)

# Page 2: Inside Cover
print("Creating Page 2 (Inside Cover - Studio Accreditation)...")
p2 = create_inside_cover()
p2.save(os.path.join(BOOK_DIR, "page_02.jpg"), quality=92)
book_pages.append(p2)

# Pages 3 & 4: Manifesto Spread
print("Creating Pages 3 & 4 (Manifesto Spread)...")
manifesto_spread = create_manifesto_spread()
p3 = manifesto_spread.crop((0, 0, PAGE_W, PAGE_H))
p4 = manifesto_spread.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
p3.save(os.path.join(BOOK_DIR, "page_03.jpg"), quality=90)
p4.save(os.path.join(BOOK_DIR, "page_04.jpg"), quality=90)
book_pages.extend([p3, p4])

# Pages 5 to 34: 15 Curated Project Spreads
full_spreads_for_pdf = [manifesto_spread]

for item in spread_definitions:
    print(f"Creating Spread: [{item['code']}] {item['title']} (Pages {item['p_left']}-{item['p_right']})...")
    spread_img = create_project_spread(
        item['file'],
        item['code'],
        item['cat'],
        item['title'],
        item['p_left'],
        item['p_right'],
        brief_text=item['brief'],
        technical_specs=item['specs']
    )
    full_spreads_for_pdf.append(spread_img)
    
    # Split into left & right book pages
    left_page = spread_img.crop((0, 0, PAGE_W, PAGE_H))
    right_page = spread_img.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
    
    p_left_file = os.path.join(BOOK_DIR, f"page_{item['p_left']:02d}.jpg")
    p_right_file = os.path.join(BOOK_DIR, f"page_{item['p_right']:02d}.jpg")
    
    left_page.save(p_left_file, quality=90)
    right_page.save(p_right_file, quality=90)
    
    book_pages.extend([left_page, right_page])

# Pages 35 & 36: Principals Spread
print("Creating Pages 35 & 36 (Principals Spread)...")
principals_spread = create_principals_spread()
full_spreads_for_pdf.append(principals_spread)

p35 = principals_spread.crop((0, 0, PAGE_W, PAGE_H))
p36 = principals_spread.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
p35.save(os.path.join(BOOK_DIR, "page_35.jpg"), quality=90)
p36.save(os.path.join(BOOK_DIR, "page_36.jpg"), quality=90)
book_pages.extend([p35, p36])

# Page 37: Inside Back Cover
print("Creating Page 37 (Inside Back Cover - Workflow)...")
p37 = create_inside_back_cover()
p37.save(os.path.join(BOOK_DIR, "page_37.jpg"), quality=92)
book_pages.append(p37)

# Page 38: Back Cover
print("Creating Page 38 (Back Cover - Barcelona Spain)...")
p38 = create_back_cover()
p38.save(os.path.join(BOOK_DIR, "page_38.jpg"), quality=92)
book_pages.append(p38)

print(f"Total book pages generated: {len(book_pages)} (Expected: 38)")

# COMPILE MASTER PDF (Both 19 Spreads Edition and Full PDF)
pdf_path = os.path.join(PUBLIC_DIR, "BIMCO_Architectural_Portfolio_Sample.pdf")
print(f"Compiling high-resolution master PDF to: {pdf_path}...")

pdf_doc = fitz.open()

# 1. Front Cover (Landscape or Single page)
# To keep PDF beautifully uniform in 1920x1080 landscape:
# We build a double-cover spread for Page 1 & 2
cover_spread = Image.new('RGB', (TARGET_W, TARGET_H), (14, 18, 22))
cover_spread.paste(p2, (0, 0)) # Inside cover on left
cover_spread.paste(p1, (PAGE_W, 0)) # Front cover on right

temp_spread_path = os.path.join(SAMPLE_DIR, "_temp_pdf_page.jpg")
cover_spread.save(temp_spread_path, quality=92)

c_doc = fitz.open(temp_spread_path)
pdf_page = pdf_doc.new_page(width=TARGET_W, height=TARGET_H)
pdf_page.insert_image(fitz.Rect(0, 0, TARGET_W, TARGET_H), filename=temp_spread_path)
c_doc.close()

# 2. All 17 Inner Spreads
for spread in full_spreads_for_pdf:
    spread.save(temp_spread_path, quality=92)
    s_doc = fitz.open(temp_spread_path)
    pdf_page = pdf_doc.new_page(width=TARGET_W, height=TARGET_H)
    pdf_page.insert_image(fitz.Rect(0, 0, TARGET_W, TARGET_H), filename=temp_spread_path)
    s_doc.close()

# 3. Back Cover Spread (Page 37 on left, Page 38 on right)
back_spread = Image.new('RGB', (TARGET_W, TARGET_H), (14, 18, 22))
back_spread.paste(p37, (0, 0))
back_spread.paste(p38, (PAGE_W, 0))
back_spread.save(temp_spread_path, quality=92)

b_doc = fitz.open(temp_spread_path)
pdf_page = pdf_doc.new_page(width=TARGET_W, height=TARGET_H)
pdf_page.insert_image(fitz.Rect(0, 0, TARGET_W, TARGET_H), filename=temp_spread_path)
b_doc.close()

if os.path.exists(temp_spread_path):
    os.remove(temp_spread_path)

pdf_doc.save(pdf_path)
pdf_doc.close()

# Also copy PDF into dist folder so preview server has it immediately!
dist_pdf_path = os.path.join(r'c:\Users\Soheil\Documents\Apply\Website Memari\dist', "BIMCO_Architectural_Portfolio_Sample.pdf")
if os.path.exists(r'c:\Users\Soheil\Documents\Apply\Website Memari\dist'):
    import shutil
    shutil.copy2(pdf_path, dist_pdf_path)
    
    # Also copy book_pages into dist/portfolio_sample/book_pages
    dist_book_dir = os.path.join(r'c:\Users\Soheil\Documents\Apply\Website Memari\dist', 'portfolio_sample', 'book_pages')
    os.makedirs(dist_book_dir, exist_ok=True)
    for bf in glob.glob(os.path.join(BOOK_DIR, '*.jpg')):
        shutil.copy2(bf, os.path.join(dist_book_dir, os.path.basename(bf)))

print(f"SUCCESS! Master PDF created with 19 full landscape spreads (38 book pages): {pdf_path}")
