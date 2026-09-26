import os
import glob
import shutil
from PIL import Image, ImageDraw, ImageFont
import fitz # PyMuPDF

TARGET_W = 1920
TARGET_H = 1080
PAGE_W = 960
PAGE_H = 1080

PUBLIC_DIR = r'c:\Users\Soheil\Documents\Apply\Website Memari\public'
DIST_DIR = r'c:\Users\Soheil\Documents\Apply\Website Memari\dist'
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
    total_pages=32,
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
    draw.text((35, TARGET_H - 24), "BARCELONA, SPAIN  •  TEL: +34 610 855 434  •  WWW.BIMCO.ES", fill=(130, 150, 160), font=get_font(11), anchor="lm")
    
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
    total_pages=32,
    brief_text="",
    technical_specs=""
):
    canvas = Image.new('RGB', (TARGET_W, TARGET_H), (16, 22, 28))
    draw = ImageDraw.Draw(canvas)
    
    # Modern minimal border and full-spread architectural proportions:
    margin_x = 24
    margin_y = 12
    avail_w = TARGET_W - (margin_x * 2)  # 1920 - 48 = 1872
    avail_h = (TARGET_H - 72 - 46) - (margin_y * 2) # 962 - 24 = 938
    
    with Image.open(spread_img_path) as sp:
        sp_rgb = sp.convert('RGB')
        scale = min(avail_w / sp_rgb.width, avail_h / sp_rgb.height)
        new_w = int(sp_rgb.width * scale)
        new_h = int(sp_rgb.height * scale)
        sp_resized = sp_rgb.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        pos_x = (TARGET_W - new_w) // 2
        pos_y = 72 + margin_y + (avail_h - new_h) // 2
        
        # Modern minimal hairline architectural border (1px)
        draw.rectangle([pos_x - 1, pos_y - 1, pos_x + new_w, pos_y + new_h], outline=(55, 75, 92), width=1)
        canvas.paste(sp_resized, (pos_x, pos_y))
        
    draw.line([(PAGE_W, 72), (PAGE_W, TARGET_H - 46)], fill=(12, 16, 20), width=1)
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

def create_two_page_spread(
    left_img_path,
    right_img_path,
    vol_title,
    project_code,
    category_title,
    project_title,
    page_left_num,
    page_right_num,
    total_pages=32,
    brief_text="",
    technical_specs=""
):
    canvas = Image.new('RGB', (TARGET_W, TARGET_H), (18, 24, 30))
    draw = ImageDraw.Draw(canvas)
    
    avail_h = TARGET_H - 72 - 46
    page_w = PAGE_W
    max_w = page_w - 60
    max_h = avail_h - 40
    
    # Left Page Image (0 to 960)
    with Image.open(left_img_path) as im_l:
        l_rgb = im_l.convert('RGB')
        scale_l = min(max_w / l_rgb.width, max_h / l_rgb.height)
        new_wl = int(l_rgb.width * scale_l)
        new_hl = int(l_rgb.height * scale_l)
        l_resized = l_rgb.resize((new_wl, new_hl), Image.Resampling.LANCZOS)
        pos_xl = (page_w - new_wl) // 2
        pos_yl = 72 + (avail_h - new_hl) // 2
        draw.rectangle([pos_xl - 2, pos_yl - 2, pos_xl + new_wl + 2, pos_yl + new_hl + 2], fill=(40, 52, 64))
        canvas.paste(l_resized, (pos_xl, pos_yl))
        
    # Right Page Image (960 to 1920)
    with Image.open(right_img_path) as im_r:
        r_rgb = im_r.convert('RGB')
        scale_r = min(max_w / r_rgb.width, max_h / r_rgb.height)
        new_wr = int(r_rgb.width * scale_r)
        new_hr = int(r_rgb.height * scale_r)
        r_resized = r_rgb.resize((new_wr, new_hr), Image.Resampling.LANCZOS)
        pos_xr = page_w + (page_w - new_wr) // 2
        pos_yr = 72 + (avail_h - new_hr) // 2
        draw.rectangle([pos_xr - 2, pos_yr - 2, pos_xr + new_wr + 2, pos_yr + new_hr + 2], fill=(40, 52, 64))
        canvas.paste(r_resized, (pos_xr, pos_yr))
        
    # Center spine line
    draw.line([(PAGE_W, 72), (PAGE_W, TARGET_H - 46)], fill=(12, 16, 20), width=2)
    
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

def create_execution_standards_spread(vol_title, vol_subtitle, steps, pl=28, pr=29, total_pages=32):
    canvas = Image.new('RGB', (TARGET_W, TARGET_H), (18, 24, 30))
    apply_bimco_framing(
        canvas, vol_title, "STANDARDS", "BIM & CONSTRUCTION PROTOCOL",
        "END-TO-END EXECUTION WORKFLOW & QUALITY AUDIT", pl, pr, total_pages,
        brief_text="BIMCO Studio Barcelona mandates complete continuity from parametric BIM LOD 350 to site supervision.",
        technical_specs="ISO 19650 BIM Standards, Autodesk Revit LOD 350, Clash Zero Tolerance, Worksite Audits."
    )
    draw = ImageDraw.Draw(canvas)
    
    # Left Page: Stages 1 to 3
    draw.rectangle([70, 140, 920, TARGET_H - 120], fill=(24, 32, 40), outline=(50, 70, 85), width=1)
    draw.text((100, 175), "BIMCO PROTOCOL: DESIGN & MODELING", fill=(255, 255, 255), font=get_font(22, bold=True))
    draw.text((100, 210), f"Stages 01 – 03  •  {vol_subtitle}", fill=(194, 125, 83), font=get_font(13, bold=True))
    draw.line([(100, 235), (890, 235)], fill=(45, 65, 78), width=1)
    
    sy = 265
    for st, sd in steps[:3]:
        draw.text((100, sy), st, fill=(194, 125, 83), font=get_font(13, bold=True))
        draw.text((100, sy + 25), sd, fill=(185, 200, 210), font=get_font(12))
        sy += 95
        
    # Right Page: Stages 4 to 6
    draw.rectangle([980, 140, TARGET_W - 70, TARGET_H - 120], fill=(24, 32, 40), outline=(50, 70, 85), width=1)
    draw.text((1010, 175), "BIMCO PROTOCOL: VISUALIZATION & BUILD", fill=(255, 255, 255), font=get_font(22, bold=True))
    draw.text((1010, 210), "Stages 04 – 06  •  From CGI to On-Site Reality", fill=(194, 125, 83), font=get_font(13, bold=True))
    draw.line([(1010, 235), (TARGET_W - 100, 235)], fill=(45, 65, 78), width=1)
    
    sy = 265
    for st, sd in steps[3:6]:
        draw.text((1010, sy), st, fill=(194, 125, 83), font=get_font(13, bold=True))
        draw.text((1010, sy + 25), sd, fill=(185, 200, 210), font=get_font(12))
        sy += 95
        
    return canvas

def create_principals_spread(vol_title, subtitle, pl=30, pr=31, total_pages=32):
    canvas = Image.new('RGB', (TARGET_W, TARGET_H), (18, 24, 30))
    apply_bimco_framing(
        canvas, vol_title, "DIRECTORS", "STUDIO BARCELONA LEADERSHIP",
        "SOHEIL MASTI & SIAVASH PAZOOKI", pl, pr, total_pages,
        brief_text="BIMCO Studio Barcelona unites high-level BIM information architecture with signature spatial design.",
        technical_specs="Registered Architects, BIM Managers (Autodesk Certified), LOD 350 Audit Specialists."
    )
    pd = ImageDraw.Draw(canvas)
    
    # Left Page: Soheil Masti (Page 30)
    pd.rectangle([70, 140, 920, TARGET_H - 120], fill=(24, 32, 40), outline=(50, 70, 85), width=1)
    pd.text((100, 175), "SOHEIL MASTI", fill=(255, 255, 255), font=get_font(28, bold=True))
    pd.text((100, 215), "BIM Director & Computational Architecture Lead", fill=(194, 125, 83), font=get_font(15, bold=True))
    pd.text((100, 240), "BIMCO Studio Barcelona  •  Spain & International", fill=(130, 150, 160), font=get_font(12))
    pd.line([(100, 265), (890, 265)], fill=(45, 65, 78), width=1)
    
    soh_text = (
        "BIM MANAGEMENT & INFORMATION ARCHITECTURE:\n"
        "• Strategic BIM implementation, Revit LOD 350 parametric modeling\n"
        "• Multi-discipline clash audits between architectural form, structural frames, and MEP systems\n"
        "• Automated quantity takeoffs and material schedules for bespoke builds\n"
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

    # Right Page: Siavash Pazouki (Page 31)
    pd.rectangle([980, 140, TARGET_W - 70, TARGET_H - 120], fill=(24, 32, 40), outline=(50, 70, 85), width=1)
    pd.text((1010, 175), "SIAVASH PAZOOKI", fill=(255, 255, 255), font=get_font(28, bold=True))
    pd.text((1010, 215), "Senior Architectural Designer & High-End 3D Visualizer", fill=(194, 125, 83), font=get_font(15, bold=True))
    pd.text((1010, 240), "M.Arch & B.Arch  •  BIMCO Studio Barcelona Partner", fill=(130, 150, 160), font=get_font(12))
    pd.line([(1010, 265), (TARGET_W - 100, 265)], fill=(45, 65, 78), width=1)
    
    sia_text = (
        "CONCEPT DESIGN & VISUALIZATION LEADERSHIP:\n"
        "• Lead Architectural Concept Designer for signature luxury commissions & masterplans\n"
        "• Photorealistic architectural rendering, natural lighting moods & cinematic camera angles\n"
        "• Topographical terrain modeling, landscape synthesis, and material detailing\n"
        "• Turnkey executive shop drawings, joinery specifications & on-site build supervision\n"
        "• 8+ years leading award-winning commissions across residential & urban typologies"
    )
    sy = 295
    for l in sia_text.split('\n'):
        if l.endswith(':'):
            pd.text((1010, sy), l, fill=(194, 125, 83), font=get_font(13, bold=True))
            sy += 26
        else:
            pd.text((1010, sy), l, fill=(180, 195, 205), font=get_font(13))
            sy += 24
            
    return canvas

def create_front_cover(vol_title_upper, vol_sub_upper, vol_desc_upper, vol_desc_sub):
    cov = Image.new('RGB', (PAGE_W, PAGE_H), (14, 18, 22))
    cd = ImageDraw.Draw(cov)
    cd.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(40, 52, 60), width=1)
    cd.text((PAGE_W // 2, 90), "BARCELONA, SPAIN  •  ARCHITECTURAL MONOGRAPH", fill=(194, 125, 83), font=get_font(12, bold=True), anchor="mm")
    
    l_size = 230
    logo_r = logo_img.resize((l_size, l_size), Image.Resampling.LANCZOS)
    cov.paste(logo_r, ((PAGE_W - l_size) // 2, 160), logo_r)
    
    cd.text((PAGE_W // 2, 435), "B I M C O", fill=(255, 255, 255), font=get_font(42, bold=True), anchor="mm")
    cd.text((PAGE_W // 2, 485), vol_title_upper, fill=(194, 125, 83), font=get_font(17, bold=True), anchor="mm")
    cd.line([(PAGE_W // 2 - 140, 515), (PAGE_W // 2 + 140, 515)], fill=(60, 80, 90), width=2)
    
    cd.text((PAGE_W // 2, 555), vol_desc_upper, fill=(230, 235, 240), font=get_font(13, bold=True), anchor="mm")
    cd.text((PAGE_W // 2, 590), vol_desc_sub, fill=(140, 160, 170), font=get_font(11), anchor="mm")
    
    bx, by, bw, bh = 55, 660, PAGE_W - 110, 135
    cd.rectangle([bx, by, bx + bw, by + bh], fill=(20, 27, 33), outline=(50, 68, 78), width=1)
    cd.text((PAGE_W // 2, by + 26), "COLLABORATIVE LEADERSHIP & PRINCIPALS", fill=(194, 125, 83), font=get_font(12, bold=True), anchor="mm")
    cd.text((PAGE_W // 2, by + 60), "SOHEIL MASTI   &   SIAVASH PAZOOKI", fill=(255, 255, 255), font=get_font(18, bold=True), anchor="mm")
    cd.text((PAGE_W // 2, by + 90), "BIM Director & Computational Architect  |  Senior Architectural Designer & Visualizer", fill=(140, 160, 170), font=get_font(12), anchor="mm")
    cd.text((PAGE_W // 2, by + 115), "BIMCO STUDIO  •  BARCELONA, SPAIN", fill=(110, 130, 140), font=get_font(11, bold=True), anchor="mm")
    
    cd.text((PAGE_W // 2, PAGE_H - 70), "BARCELONA, SPAIN  •  EDITION 2026", fill=(100, 120, 130), font=get_font(12), anchor="mm")
    cd.text((PAGE_W // 2, PAGE_H - 50), "PAGE 01 / 32", fill=(80, 100, 110), font=get_font(10, bold=True), anchor="mm")
    return cov

def create_back_cover(vol_title_upper):
    b_cov = Image.new('RGB', (PAGE_W, PAGE_H), (14, 18, 22))
    bcd = ImageDraw.Draw(b_cov)
    bcd.rectangle([35, 35, PAGE_W - 35, PAGE_H - 35], outline=(40, 52, 60), width=1)
    
    bl_size = 180
    b_logo = logo_img.resize((bl_size, bl_size), Image.Resampling.LANCZOS)
    b_cov.paste(b_logo, ((PAGE_W - bl_size) // 2, 220), b_logo)
    
    bcd.text((PAGE_W // 2, 440), "B I M C O", fill=(255, 255, 255), font=get_font(42, bold=True), anchor="mm")
    bcd.text((PAGE_W // 2, 490), vol_title_upper, fill=(194, 125, 83), font=get_font(17, bold=True), anchor="mm")
    bcd.text((PAGE_W // 2, 520), "BARCELONA, SPAIN", fill=(220, 230, 240), font=get_font(14, bold=True), anchor="mm")
    bcd.line([(PAGE_W // 2 - 140, 550), (PAGE_W // 2 + 140, 550)], fill=(50, 70, 80), width=2)
    
    contacts = [
        "STUDIO HEADQUARTERS: Barcelona, Spain",
        "DIRECTORS: Soheil Masti & Siavash Pazooki",
        "TELEPHONE & WHATSAPP: +34 610 855 434",
        "OFFICIAL WEB PORTAL: WWW.BIMCO.ES",
        "SERVICES: Architecture • BIM LOD 350 • CGI • Site Supervision"
    ]
    cy = 600
    for c in contacts:
        bcd.text((PAGE_W // 2, cy), c, fill=(175, 195, 205), font=get_font(14), anchor="mm")
        cy += 36
        
    bcd.text((PAGE_W // 2, PAGE_H - 70), "© 2026 BIMCO STUDIO BARCELONA. ALL RIGHTS RESERVED.", fill=(90, 110, 120), font=get_font(11), anchor="mm")
    bcd.text((PAGE_W // 2, PAGE_H - 50), "PAGE 32 / 32", fill=(80, 100, 110), font=get_font(10, bold=True), anchor="mm")
    return b_cov

def build_pdf_from_spreads(pdf_path, cover_img, full_spreads, back_cover_img):
    print(f"Compiling PDF to {pdf_path}...")
    pdf_doc = fitz.open()
    temp_img = os.path.join(PUBLIC_DIR, '_temp_comp.jpg')
    
    # 1. Front Cover Spread (Dark on left, Cover on right)
    cov_spread = Image.new('RGB', (TARGET_W, TARGET_H), (14, 18, 22))
    cov_spread.paste(cover_img, (PAGE_W, 0))
    cov_spread.save(temp_img, quality=98, subsampling=0)
    pdf_page = pdf_doc.new_page(width=TARGET_W, height=TARGET_H)
    pdf_page.insert_image(fitz.Rect(0, 0, TARGET_W, TARGET_H), filename=temp_img)
    
    # 2. Spreads 1 to 15 (15 spreads x 2 = 30 pages)
    for sp in full_spreads:
        sp.save(temp_img, quality=98, subsampling=0)
        pdf_page = pdf_doc.new_page(width=TARGET_W, height=TARGET_H)
        pdf_page.insert_image(fitz.Rect(0, 0, TARGET_W, TARGET_H), filename=temp_img)
        
    # 3. Back Cover Spread (Back Cover on left, Dark on right)
    b_spread = Image.new('RGB', (TARGET_W, TARGET_H), (14, 18, 22))
    b_spread.paste(back_cover_img, (0, 0))
    b_spread.save(temp_img, quality=98, subsampling=0)
    pdf_page = pdf_doc.new_page(width=TARGET_W, height=TARGET_H)
    pdf_page.insert_image(fitz.Rect(0, 0, TARGET_W, TARGET_H), filename=temp_img)
    
    if os.path.exists(temp_img):
        os.remove(temp_img)
        
    pdf_doc.save(pdf_path)
    pdf_doc.close()
    
    if os.path.exists(DIST_DIR):
        shutil.copy2(pdf_path, os.path.join(DIST_DIR, os.path.basename(pdf_path)))
    print(f"SUCCESS: PDF saved to {pdf_path}")

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
    
    print(f"\n=======================================================")
    print(f"--- GENERATING {VOL_TITLE} (EXACTLY {TOTAL_PAGES} PAGES) ---")
    print(f"=======================================================")
    
    # 1. Page 01: Front Cover (PAGE_W x PAGE_H)
    cov = create_front_cover(
        "VOLUME I: LUXURY VILLAS & RESIDENCES",
        "A DIALOGUE BETWEEN TOPOGRAPHY, FORM & BUILD INTEGRITY",
        "A DIALOGUE BETWEEN TOPOGRAPHY, FORM & BUILD INTEGRITY",
        "Curated Collection of Sloped Villas, Desert Retreats & Executive Construction Records"
    )
    cov.save(os.path.join(out_dir, "page_01.jpg"), quality=98, subsampling=0)
    
    # 2. Spread 1: Pages 02 & 03 (Prologue: Manifesto Left + Index Right)
    v_man = Image.new('RGB', (TARGET_W, TARGET_H), (20, 26, 33))
    md = ImageDraw.Draw(v_man)
    apply_bimco_framing(
        v_man, VOL_TITLE, "PROLOGUE", "VILLA MANIFESTO & INDEX", 
        "THE ARCHITECTURE OF LIVING WITH NATURE", 2, 3, TOTAL_PAGES,
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
        
    # Table of Villa Projects Right (Page 03)
    md.text((1020, 150), "VILLA PROJECTS SCENARIO & INDEX", fill=(255, 255, 255), font=get_font(26, bold=True))
    md.text((1020, 185), "Structured Progression from Mountain Slopes to Built Realities", fill=(194, 125, 83), font=get_font(14, bold=True))
    
    v_index = [
        ("01", "VIOLET LUXURY RESIDENCE", "Volumetric Design & Spatial Site Synthesis", "PGS 04-05"),
        ("02", "VIOLET VILLA FLOOR PLANS", "Architectural Layouts & Environmental Sections", "PGS 06-07"),
        ("03", "VIOLET VILLA STEEL FRAME", "Structural Steel Erection & Frame Progress", "PGS 08-09"),
        ("04", "VIOLET VILLA CONSTRUCTION", "Concrete Pouring & On-Site Engineering Audit", "PGS 10-11"),
        ("05", "TEHRAN DASHT MODERN VILLA", "Villa Retreat Design & Expansive Pool Integration", "PGS 12-13"),
        ("06", "TEHRAN DASHT SITE WORKS", "Foundation Rebar & Worksite Construction Records", "PGS 14-15"),
        ("07", "MODERN VILLA SERIES 01-05", "Modular Luxury Compounds & Olive Landscaping", "PGS 16-17"),
        ("08", "MODERN VILLA PLANS & WOOD", "Natural Wood Joinery & Concrete Spatial Layouts", "PGS 18-19"),
        ("09", "VILLA IN AUSTRALIA", "Curved Terraces & Organic Pool Architecture", "PGS 20-21"),
        ("10", "AUSTRALIA TERRACED LIVING", "Terraced Living & Integrated Pool Pavilion", "PGS 22-23"),
        ("11", "DIAMOND VILLA TOWN", "Gated Riverside Villa Community Masterplan", "PGS 24-25"),
        ("12", "LANDSCAPE & OUTDOOR LIVING", "Luxury Pergolas, Water Elements & Sun Decks", "PGS 26-27")
    ]
    
    vy = 225
    for num, name, desc, pgs in v_index:
        md.rectangle([1020, vy, TARGET_W - 70, vy + 40], fill=(24, 32, 40), outline=(45, 60, 72), width=1)
        md.text((1035, vy + 20), num, fill=(194, 125, 83), font=get_font(11, bold=True), anchor="lm")
        md.text((1070, vy + 20), name, fill=(255, 255, 255), font=get_font(11, bold=True), anchor="lm")
        md.text((1440, vy + 20), desc, fill=(150, 170, 180), font=get_font(10), anchor="lm")
        md.text((TARGET_W - 85, vy + 20), pgs, fill=(194, 125, 83), font=get_font(10, bold=True), anchor="rm")
        vy += 45
        
    p2 = v_man.crop((0, 0, PAGE_W, PAGE_H))
    p3 = v_man.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
    p2.save(os.path.join(out_dir, "page_02.jpg"), quality=98, subsampling=0)
    p3.save(os.path.join(out_dir, "page_03.jpg"), quality=98, subsampling=0)
    
    # 3. Spreads 2 to 13: 12 Pure Villa Spreads (Pages 04 to 27) - 100% Authentic 2:1 Spreads
    villa_spreads = [
        (
            r'01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.29.58.jpeg',
            "VIL-01", "Violet Luxury Residence", "Volumetric Design & Spatial Site Synthesis",
            "Signature luxury villa layout featuring master suite wings, outdoor lounge, and garden pathways.",
            "BIM LOD 350 architectural model, stone facade cladding schedules, daylight optimization."
        ),
        (
            r'01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.29.59 (2).jpeg',
            "VIL-02", "Violet Villa Floor Plans", "Architectural Layouts & Environmental Sections",
            "Comprehensive architectural floor plans detailing circulation cores, double-height living, and service zoning.",
            "Precision CAD dimensioning, acoustic isolation walls, passive solar shading integration."
        ),
        (
            r'01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.29.59 (1).jpeg',
            "VIL-03", "Violet Villa Steel Frame", "Structural Steel Erection & Frame Progress",
            "Comprehensive execution documentation displaying physical on-site steel/concrete erection and frame progress.",
            "Active site supervision, structural beam-column verification, daylight analysis & floor plan set."
        ),
        (
            r'01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.29.59 (3).jpeg',
            "VIL-04", "Violet Villa Construction", "Concrete Pouring & On-Site Engineering Audit",
            "Active construction supervision ensuring structural tolerances and seamless MEP integration.",
            "Post-tensioned concrete slabs, waterproof retaining walls, zero clash tolerance on site."
        ),
        (
            r'01_Luxury_Villas\05_Tehran_Dasht_Villa\WhatsApp Image 2026-09-25 at 23.28.48.jpeg',
            "VIL-05", "Tehran Dasht Modern Villa", "Villa Retreat Design & Expansive Pool Integration",
            "Modern villa retreat harmonizing indoor-outdoor living with private pool, garden pergolas, and sun decks.",
            "Thermal envelope engineering, double-glazed curtain walls, structural pool shell."
        ),
        (
            r'01_Luxury_Villas\05_Tehran_Dasht_Villa\WhatsApp Image 2026-09-25 at 23.28.49.jpeg',
            "VIL-06", "Tehran Dasht Site Works", "Foundation Rebar & Worksite Construction Records",
            "Verified physical construction records showcasing foundation excavation, rebar tying, and pool shell casting.",
            "Reinforced concrete pool shell, hydraulic MEP coordination, integrated landscape lighting."
        ),
        (
            r'01_Luxury_Villas\04_Modern_Villa_Series_01_to_05\WhatsApp Image 2026-09-25 at 23.31.01 (1).jpeg',
            "VIL-07", "Modern Villa Series 01-05", "Modular Luxury Compounds & Olive Landscaping",
            "Modular cubic villas featuring white cantilever frames, dark volcanic stone, and Japanese-style gardens.",
            "Modular structural bay spacing, cantilevered terrace engineering, drip irrigation landscape."
        ),
        (
            r'01_Luxury_Villas\04_Modern_Villa_Series_01_to_05\WhatsApp Image 2026-09-25 at 23.31.01 (2).jpeg',
            "VIL-08", "Modern Villa Plans & Details", "Natural Wood Joinery & Concrete Spatial Layouts",
            "Executive details of natural timber screens, polished concrete flooring, and bespoke interior cabinetry.",
            "1:20 joinery shop drawings, thermal break window frames, integrated linear HVAC slots."
        ),
        (
            r'01_Luxury_Villas\07_Villa_in_Australia_and_Curved_Residences\WhatsApp Image 2026-09-25 at 23.27.44.jpeg',
            "VIL-09", "Villa in Australia", "Curved Terraces & Organic Pool Architecture",
            "Modern villa in Australia featuring fluid curvilinear balconies, open-plan great room, and integrated pool.",
            "Curved formwork engineering, passive solar shading, luxury master suite layout."
        ),
        (
            r'01_Luxury_Villas\07_Villa_in_Australia_and_Curved_Residences\WhatsApp Image 2026-09-25 at 23.30.00 (2).jpeg',
            "VIL-10", "Australia Terraced Living", "Terraced Living & Integrated Pool Pavilion",
            "Panoramic living areas opening onto curved cantilevered decks with glass balustrades and ocean outlooks.",
            "Structural post-tensioned slabs, marine-grade stainless hardware, frameless glass balustrades."
        ),
        (
            r'05_Urban_Planning_and_Landscape\20_Diamond_Villa_Town_Masterplan\WhatsApp Image 2026-09-25 at 23.28.07.jpeg',
            "VIL-11", "Diamond Villa Town", "Gated Riverside Villa Community Masterplan",
            "Masterplanned gated residential enclave along riverfront greenway with monumental entrance gateway.",
            "Macro parcel subdivision, storm water retention swales, hierarchical private road infrastructure."
        ),
        (
            r'05_Urban_Planning_and_Landscape\21_Landscape_Pergolas_and_Outdoor_Living\WhatsApp Image 2026-09-25 at 23.36.48.jpeg',
            "VIL-12", "Landscape & Outdoor Living", "Luxury Pergolas, Water Elements & Sun Decks",
            "Architectural landscape integration with modern steel pergolas, sunken seating pits, and infinity water edges.",
            "Outdoor MEP coordination, waterproof timber decking, night lighting photometric calculations."
        )
    ]
    
    full_spreads = [v_man]
    
    for idx, (rel_path, code, title, sub, br, sp) in enumerate(villa_spreads):
        pl = 4 + idx * 2
        pr = 5 + idx * 2
        print(f"Generating Villa Spread {idx+1}: [{code}] {title} (Pages {pl:02d}-{pr:02d})...")
        full_path = os.path.join(BASE_IMG_DIR, rel_path)
        sp_img = create_project_spread(
            full_path, VOL_TITLE, code, "Luxury Villas & Private Residences", 
            title, pl, pr, TOTAL_PAGES, brief_text=br, technical_specs=sp
        )
        full_spreads.append(sp_img)
        
        lp = sp_img.crop((0, 0, PAGE_W, PAGE_H))
        rp = sp_img.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
        lp.save(os.path.join(out_dir, f"page_{pl:02d}.jpg"), quality=98, subsampling=0)
        rp.save(os.path.join(out_dir, f"page_{pr:02d}.jpg"), quality=98, subsampling=0)
        
    # 4. Spread 14: Pages 28 & 29 (Execution Standards)
    v_steps = [
        ("STAGE 1: TOPOGRAPHIC & SOLAR ANALYSIS", "High-precision drone survey, terrain slope meshing, daylight & thermal calculations."),
        ("STAGE 2: SPATIAL CONCEPT & 3D MASSING", "Volumetric studies, private vs. entertainment zones, pool & garden integration."),
        ("STAGE 3: BIM LOD 350 RESIDENTIAL MODEL", "Parametric Revit model, clash detection with structural concrete & MEP piping."),
        ("STAGE 4: ULTRA-HIGH-END CGI & LIGHTING", "Cinematic renders in Corona/V-Ray, material mockups, interior ambience simulation."),
        ("STAGE 5: FULL EXECUTIVE DRAWING SET", "1:20 joinery shop drawings, stone cladding details, door/window schedules."),
        ("STAGE 6: ON-SITE QUALITY ASSURANCE", "Periodic physical site inspections, contractor coordination, build integrity control.")
    ]
    std_spread = create_execution_standards_spread(VOL_TITLE, "Luxury Residential Protocol", v_steps, pl=28, pr=29, total_pages=32)
    full_spreads.append(std_spread)
    p28 = std_spread.crop((0, 0, PAGE_W, PAGE_H))
    p29 = std_spread.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
    p28.save(os.path.join(out_dir, "page_28.jpg"), quality=98, subsampling=0)
    p29.save(os.path.join(out_dir, "page_29.jpg"), quality=98, subsampling=0)
    
    # 5. Spread 15: Pages 30 & 31 (Principals Leadership)
    prin_spread = create_principals_spread(VOL_TITLE, "Villa Practice Leadership", pl=30, pr=31, total_pages=32)
    full_spreads.append(prin_spread)
    p30 = prin_spread.crop((0, 0, PAGE_W, PAGE_H))
    p31 = prin_spread.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
    p30.save(os.path.join(out_dir, "page_30.jpg"), quality=98, subsampling=0)
    p31.save(os.path.join(out_dir, "page_31.jpg"), quality=98, subsampling=0)
    
    # 6. Page 32: Back Cover (PAGE_W x PAGE_H)
    b_cov = create_back_cover("VOLUME I: LUXURY VILLAS & RESIDENCES")
    b_cov.save(os.path.join(out_dir, "page_32.jpg"), quality=98, subsampling=0)
    
    # Copy all to dist
    dist_b_dir = os.path.join(DIST_DIR, 'portfolio_villas', 'book_pages')
    os.makedirs(dist_b_dir, exist_ok=True)
    for f in glob.glob(os.path.join(out_dir, '*.jpg')):
        shutil.copy2(f, os.path.join(dist_b_dir, os.path.basename(f)))
        
    build_pdf_from_spreads(pdf_out, cov, full_spreads, b_cov)

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
    
    print(f"\n=======================================================")
    print(f"--- GENERATING {VOL_TITLE} (EXACTLY {TOTAL_PAGES} PAGES) ---")
    print(f"=======================================================")
    
    # 1. Page 01: Front Cover
    cov = create_front_cover(
        "VOLUME II: RESIDENTIAL APARTMENTS & FACADES",
        "THE HIGH-PERFORMANCE BUILDING ENVELOPE & COLLECTIVE LIVING",
        "THE HIGH-PERFORMANCE BUILDING ENVELOPE & COLLECTIVE LIVING",
        "Curated Monograph of Urban Mid-Rise, Terraced Enclaves & High-Rise Facades"
    )
    cov.save(os.path.join(out_dir, "page_01.jpg"), quality=98, subsampling=0)
    
    # 2. Spread 1: Pages 02 & 03 (Prologue: Manifesto Left + Index Right)
    v_man = Image.new('RGB', (TARGET_W, TARGET_H), (20, 26, 33))
    md = ImageDraw.Draw(v_man)
    apply_bimco_framing(
        v_man, VOL_TITLE, "PROLOGUE", "FACADE MANIFESTO & INDEX",
        "THE ARCHITECTURE OF URBAN SKINS & COLLECTIVE HOUSING", 2, 3, TOTAL_PAGES,
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
        ("01", "DARROUS RESIDENTIAL FACADE", "Stone & Metal Entrance Foyer Architecture", "PGS 04-05"),
        ("02", "DARROUS NIGHT ILLUMINATION", "Photometric Studies & Nocturnal Depth", "PGS 06-07"),
        ("03", "DARROUS ELEVATION GEOMETRY", "Vertical Louvers & Solar Angle Optimization", "PGS 08-09"),
        ("04", "DARROUS 1:20 CLADDING DETAILS", "Executive Ventilated Facade Shop Drawings", "PGS 10-11"),
        ("05", "DALKHANI RESIDENTIAL TERRACES", "Stepped Mountain Collective Dwellings", "PGS 12-13"),
        ("06", "DALKHANI TERRACES FLOOR PLANS", "Contour Distribution & Dual-Aspect Layouts", "PGS 14-15"),
        ("07", "DALKHANI SECTIONS & SLOPES", "Structural Cascade & Panoramic Verandas", "PGS 16-17"),
        ("08", "MID-RISE URBAN APARTMENTS", "Stepped Green Terraces & Modern Framing", "PGS 18-19"),
        ("09", "MODERN URBAN APARTMENT COMPLEX", "Balcony Rhythms & Day/Night Expression", "PGS 20-21"),
        ("10", "HIGH-RISE TOWER COLLECTION 01", "Prefabricated Modular Concrete & Glazing", "PGS 22-23"),
        ("11", "HIGH-RISE TOWER COLLECTION 02", "Corner Articulation, Louvers & Penthouse", "PGS 24-25"),
        ("12", "CLASSICAL MONUMENTAL PALACE", "Grand Neoclassical Orders & Limestone Facade", "PGS 26-27")
    ]
    
    vy = 225
    for num, name, desc, pgs in apt_index:
        md.rectangle([1020, vy, TARGET_W - 70, vy + 40], fill=(24, 32, 40), outline=(45, 60, 72), width=1)
        md.text((1035, vy + 20), num, fill=(194, 125, 83), font=get_font(11, bold=True), anchor="lm")
        md.text((1070, vy + 20), name, fill=(255, 255, 255), font=get_font(11, bold=True), anchor="lm")
        md.text((1440, vy + 20), desc, fill=(150, 170, 180), font=get_font(10), anchor="lm")
        md.text((TARGET_W - 85, vy + 20), pgs, fill=(194, 125, 83), font=get_font(10, bold=True), anchor="rm")
        vy += 45
        
    p2 = v_man.crop((0, 0, PAGE_W, PAGE_H))
    p3 = v_man.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
    p2.save(os.path.join(out_dir, "page_02.jpg"), quality=98, subsampling=0)
    p3.save(os.path.join(out_dir, "page_03.jpg"), quality=98, subsampling=0)
    
    # 3. Spreads 2 to 13: 12 Apartment Spreads (Pages 04 to 27)
    apt_spreads = [
        (
            r'02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25 (1).jpeg',
            "APT-01", "Darrous Residential Facade", "Stone & Metal Tectonic Assembly & Foyer Entrance",
            "Luxury residential entrance foyer in Darrous district featuring travertine masonry, bronze louvers, and bespoke lighting.",
            "Ventilated facade substructure, stainless steel brackets, concealed mechanical joints, thermal insulation."
        ),
        (
            r'02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25 (2).jpeg',
            "APT-02", "Darrous Facade Night Illumination", "Photometric Studies & Nocturnal Architectural Expression",
            "Nocturnal illumination design integrated into stone reveals and window frames, emphasizing volumetric depth.",
            "Warm 3000K LED linear wall grazing, anti-glare baffles, IP67 waterproof rated fixtures, DALI lighting control."
        ),
        (
            r'02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25 (3).jpeg',
            "APT-03", "Darrous Elevation Geometry", "Solar Shading Analysis & Fenestration Proportions",
            "South-facing facade geometry utilizing vertical louver elements to regulate solar gain while maintaining expansive mountain vistas.",
            "Parametric shadow calculation, extruded aluminum profiles, dual low-E insulated glass units (U-value 1.1 W/m²K)."
        ),
        (
            r'02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25.jpeg',
            "APT-04", "Darrous Technical Details", "1:20 Cladding Junctions, Parapets & Base Details",
            "Executive construction drawings with 1:20 joinery, stone reveal brackets, thermal flashing, and damp-proof membranes.",
            "Revit LOD 350 facade details, seismic movement joints, air barrier continuity, drainage weep holes."
        ),
        (
            r'02_Residential_Buildings_Facades\10_Residential_Dalkhani_Terraces\WhatsApp Image 2026-09-25 at 23.29.09.jpeg',
            "APT-05", "Dalkhani Residential Terraces", "Stepped Mountain Dwellings & Forest Topography",
            "Multi-family stepped collective housing contoured along steep mountainsides, providing sky terraces for all apartments.",
            "Terraced concrete foundation, soil-nail retaining structures, green roof water retention and drainage membranes."
        ),
        (
            r'02_Residential_Buildings_Facades\10_Residential_Dalkhani_Terraces\WhatsApp Image 2026-09-25 at 23.29.10 (1).jpeg',
            "APT-06", "Dalkhani Terraces Floor Plans", "Architectural Level Distribution & Mountain Contours",
            "Contoured architectural floor plans stepping up the terrain with private entries, natural cross-ventilation, and view corridors.",
            "Stepped shear-wall grid, dual-aspect ventilation, acoustic party-wall assemblies, seismic slope safety factor > 1.5."
        ),
        (
            r'02_Residential_Buildings_Facades\10_Residential_Dalkhani_Terraces\WhatsApp Image 2026-09-25 at 23.29.10 (2).jpeg',
            "APT-07", "Dalkhani Sections & Structural Steps", "Longitudinal Cross-Section & Terraced Verandas",
            "Longitudinal building section demonstrating balcony overhangs, daylight penetration, and hillside stormwater channels.",
            "Cascading structural calculations, inverted roof waterproofing, exterior grade thermal envelope."
        ),
        (
            r'02_Residential_Buildings_Facades\11_Mid_and_High_Rise_Residential_Collection\WhatsApp Image 2026-09-25 at 23.26.51 (1).jpeg',
            "APT-08", "Mid-Rise Urban Enclave", "Stepped Green Terraces & Modern Stone Framing",
            "Urban mid-rise residential architecture with deep cantilevered green balconies, integrating biophilic living into urban fabric.",
            "Automated micro-drip planter irrigation, structural cantilever load calculations, composite wood soffits."
        ),
        (
            r'02_Residential_Buildings_Facades\11_Mid_and_High_Rise_Residential_Collection\WhatsApp Image 2026-09-25 at 23.26.51 (2).jpeg',
            "APT-09", "Modern Urban Apartment Complex", "Day & Night Renders with Balcony Rhythm",
            "Rhythmic facade articulation balancing textured masonry with full-height floor-to-ceiling glass balconies.",
            "Thermal break structural brackets, laminated acoustic balustrades, integrated hidden roller shutter housings."
        ),
        (
            r'02_Residential_Buildings_Facades\11_Mid_and_High_Rise_Residential_Collection\WhatsApp Image 2026-09-25 at 23.34.06.jpeg',
            "APT-10", "Modular Facade Typology 01", "High-Rise Prefabricated Panels & Window Rhythm",
            "Architectural tower facade modularity exploring repetitive prefabricated panels with subtle rhythmic variations.",
            "GFRC lightweight composite panels, unitized facade crane installation sequence, wind load testing per EN 1991."
        ),
        (
            r'02_Residential_Buildings_Facades\11_Mid_and_High_Rise_Residential_Collection\WhatsApp Image 2026-09-25 at 23.34.07.jpeg',
            "APT-11", "Modular Facade Typology 02", "Corner Articulation & Sky Terraces",
            "Dynamic corner tower articulation with wrap-around continuous balconies and recessed penthouse levels.",
            "Vortex-shedding corner geometry, wind pressure relief, high-performance solar control glass coatings."
        ),
        (
            r'02_Residential_Buildings_Facades\12_Classical_Monumental_Palace\WhatsApp Image 2026-09-25 at 23.37.25 (3).jpeg',
            "APT-12", "Classical Monumental Palace", "Classical Proportions, Colonnades & Grand Portico",
            "Monumental residential palace exhibiting classical Roman and Neoclassical orders, grand colonnades, and carved friezes.",
            "Natural limestone masonry, structural entablature tie-backs, carved stone cornice anchor engineering."
        )
    ]
    
    full_spreads = [v_man]
    
    for idx, (rel_path, code, title, sub, br, sp) in enumerate(apt_spreads):
        pl = 4 + idx * 2
        pr = 5 + idx * 2
        full_path = os.path.join(BASE_IMG_DIR, rel_path)
        print(f"Generating Apartment Spread {idx+1}: [{code}] {title} (Pages {pl:02d}-{pr:02d})...")
        sp_img = create_project_spread(
            full_path, VOL_TITLE, code, "Residential Mid/High-Rise & Facades",
            title, pl, pr, TOTAL_PAGES, brief_text=br, technical_specs=sp
        )
        full_spreads.append(sp_img)
        
        lp = sp_img.crop((0, 0, PAGE_W, PAGE_H))
        rp = sp_img.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
        lp.save(os.path.join(out_dir, f"page_{pl:02d}.jpg"), quality=98, subsampling=0)
        rp.save(os.path.join(out_dir, f"page_{pr:02d}.jpg"), quality=98, subsampling=0)
        
    # 4. Spread 14: Pages 28 & 29 (Execution Standards)
    apt_steps = [
        ("STAGE 1: SOLAR & WIND MICROCLIMATE", "Parametric shadow calculations, wind pressure CFD, seasonal solar radiation mapping."),
        ("STAGE 2: TECTONIC FACADE MODULATION", "Fenestration rhythms, louver profiles, spandrel glass vs. opaque stone balance."),
        ("STAGE 3: REVIT LOD 350 FACADE FAMILIES", "BIM cladding assemblies, bracket coordination, thermal break insulation modeling."),
        ("STAGE 4: DAY & NIGHT PHOTOMETRIC CGI", "Cinematic renders in Corona, realistic nighttime illumination, glare evaluation."),
        ("STAGE 5: 1:20 CLADDING & SHOP DRAWINGS", "Executive facade detailing, anchor bolts, weep holes, thermal bridge mitigation."),
        ("STAGE 6: WORKSHOP MOCKUPS & SITE AUDIT", "Quality assurance on stone fabrication, unitized panel installation, seal testing.")
    ]
    std_spread = create_execution_standards_spread(VOL_TITLE, "Facade Engineering Protocol", apt_steps, pl=28, pr=29, total_pages=32)
    full_spreads.append(std_spread)
    p28 = std_spread.crop((0, 0, PAGE_W, PAGE_H))
    p29 = std_spread.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
    p28.save(os.path.join(out_dir, "page_28.jpg"), quality=98, subsampling=0)
    p29.save(os.path.join(out_dir, "page_29.jpg"), quality=98, subsampling=0)
    
    # 5. Spread 15: Pages 30 & 31 (Principals Leadership)
    prin_spread = create_principals_spread(VOL_TITLE, "Apartments & Facade Leadership", pl=30, pr=31, total_pages=32)
    full_spreads.append(prin_spread)
    p30 = prin_spread.crop((0, 0, PAGE_W, PAGE_H))
    p31 = prin_spread.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
    p30.save(os.path.join(out_dir, "page_30.jpg"), quality=98, subsampling=0)
    p31.save(os.path.join(out_dir, "page_31.jpg"), quality=98, subsampling=0)
    
    # 6. Page 32: Back Cover
    b_cov = create_back_cover("VOLUME II: RESIDENTIAL APARTMENTS & FACADES")
    b_cov.save(os.path.join(out_dir, "page_32.jpg"), quality=98, subsampling=0)
    
    # Copy all to dist
    dist_b_dir = os.path.join(DIST_DIR, 'portfolio_apartments', 'book_pages')
    os.makedirs(dist_b_dir, exist_ok=True)
    for f in glob.glob(os.path.join(out_dir, '*.jpg')):
        shutil.copy2(f, os.path.join(dist_b_dir, os.path.basename(f)))
        
    build_pdf_from_spreads(pdf_out, cov, full_spreads, b_cov)

# =========================================================================
# VOLUME 3: COMMERCIAL & URBAN MASTERPLANNING (32 PAGES)
# =========================================================================
def generate_urban_commercial_volume():
    VOL_ID = "urban"
    VOL_TITLE = "Volume III: Commercial & Urban Masterplanning"
    TOTAL_PAGES = 32
    
    out_dir = os.path.join(PUBLIC_DIR, 'portfolio_urban', 'book_pages')
    os.makedirs(out_dir, exist_ok=True)
    pdf_out = os.path.join(PUBLIC_DIR, 'BIMCO_Volume3_Urban_Commercial.pdf')
    
    print(f"\n=======================================================")
    print(f"--- GENERATING {VOL_TITLE} (EXACTLY {TOTAL_PAGES} PAGES) ---")
    print(f"=======================================================")
    
    # 1. Page 01: Front Cover
    cov = create_front_cover(
        "VOLUME III: COMMERCIAL & URBAN MASTERPLANNING",
        "MACRO-SCALE ARCHITECTURAL SYSTEMS & URBAN MORPHOLOGY",
        "MACRO-SCALE ARCHITECTURAL SYSTEMS & URBAN MORPHOLOGY",
        "Curated Monograph of Commercial Hubs, Retail Atriums, Infrastructure & River Basins"
    )
    cov.save(os.path.join(out_dir, "page_01.jpg"), quality=98, subsampling=0)
    
    # 2. Spread 1: Pages 02 & 03 (Prologue: Manifesto Left + Index Right)
    v_man = Image.new('RGB', (TARGET_W, TARGET_H), (20, 26, 33))
    md = ImageDraw.Draw(v_man)
    apply_bimco_framing(
        v_man, VOL_TITLE, "PROLOGUE", "URBAN MANIFESTO & INDEX",
        "THE ARCHITECTURE OF CIVIC VITALITY & URBAN SYSTEMS", 2, 3, TOTAL_PAGES,
        brief_text="From Barcelona, BIMCO approaches urban planning through systemic integration of infrastructure, commerce, and ecology.",
        technical_specs="GIS Spatial Analytics, Large-Span Steel Truss BIM LOD 350, Parametric Shells, Microclimate CFD."
    )
    
    md.text((70, 150), "THE METROPOLITAN SCALE & URBAN LIFE", fill=(255, 255, 255), font=get_font(26, bold=True))
    md.text((70, 185), "Connectivity, Spatial Complexity, and Resilient Public Realms", fill=(194, 125, 83), font=get_font(14, bold=True))
    v_text = (
        "Architecture reaches its most profound social resonance when operating at the scale\n"
        "of the city. At BIMCO Studio Barcelona, commercial and infrastructure complexes\n"
        "are not isolated objects; they are vital civic anchors that channel urban movement,\n"
        "stimulate commerce, and generate social encounters.\n\n"
        "From the industrial wholesale arteries of the Shargh Steel Complex to the fluid retail gallerias\n"
        "of the Erbil Department Store, and the regenerative ecology of the Zargandeh river valley,\n"
        "our urban masterplans synthesize complex logistic flows with humane public realms.\n"
        "Every project is grounded in rigorous BIM and engineering coordination."
    )
    y = 230
    for l in v_text.split('\n'):
        md.text((70, y), l, fill=(195, 210, 220), font=get_font(15))
        y += 24
        
    md.text((1020, 150), "COMMERCIAL & URBAN INDEX", fill=(255, 255, 255), font=get_font(26, bold=True))
    md.text((1020, 185), "Structured Progression from Logistics Complexes to Civic Masterplans", fill=(194, 125, 83), font=get_font(14, bold=True))
    
    urb_index = [
        ("01", "SHARGH STEEL COMMERCIAL MASTER SITE", "Logistics Arteries, Wholesales & Bank", "PGS 04-05"),
        ("02", "STEEL COMMERCIAL SHOWROOMS", "High-Bay Industrial Sheds & Retail Front", "PGS 06-07"),
        ("03", "ADMINISTRATIVE & BANK HQ", "Composite Rainscreens & Corporate Identity", "PGS 08-09"),
        ("04", "LOGISTICS BAYS & STREET ELEVATION", "Synchronized Docks & Highway Façade", "PGS 10-11"),
        ("05", "ERBIL DEPARTMENT STORE ARCHITECTURE", "Parametric Parabolic Arches & Sandstone", "PGS 12-13"),
        ("06", "ERBIL RETAIL CONCOURSE & SKYLIGHT", "Elliptical Daylit Galleria & Atrium", "PGS 14-15"),
        ("07", "ERBIL MULTI-LEVEL FLOOR PLANS", "Retail Zonation & Post-Tensioned Slabs", "PGS 16-17"),
        ("08", "METROPOLITAN INFRASTRUCTURE", "Grade-Separated Highway Flyover Interchange", "PGS 18-19"),
        ("09", "ZARGANDEH BASIN MORPHOLOGY", "River Corridor Topography & Micro-Density", "PGS 20-21"),
        ("10", "RIVERBANK ECOLOGICAL REGENERATION", "Linear Green Waterfront & Footbridges", "PGS 22-23"),
        ("11", "HIGH-DENSITY SKYLINE MASTERPLAN", "Urban Massing, Solar Envelopes & CFD", "PGS 24-25"),
        ("12", "TRANSIT-ORIENTED DEVELOPMENT (TOD)", "Multimodal Mobility & Mixed-Use Fabric", "PGS 26-27")
    ]
    
    vy = 225
    for num, name, desc, pgs in urb_index:
        md.rectangle([1020, vy, TARGET_W - 70, vy + 40], fill=(24, 32, 40), outline=(45, 60, 72), width=1)
        md.text((1035, vy + 20), num, fill=(194, 125, 83), font=get_font(11, bold=True), anchor="lm")
        md.text((1070, vy + 20), name, fill=(255, 255, 255), font=get_font(11, bold=True), anchor="lm")
        md.text((1440, vy + 20), desc, fill=(150, 170, 180), font=get_font(10), anchor="lm")
        md.text((TARGET_W - 85, vy + 20), pgs, fill=(194, 125, 83), font=get_font(10, bold=True), anchor="rm")
        vy += 45
        
    p2 = v_man.crop((0, 0, PAGE_W, PAGE_H))
    p3 = v_man.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
    p2.save(os.path.join(out_dir, "page_02.jpg"), quality=98, subsampling=0)
    p3.save(os.path.join(out_dir, "page_03.jpg"), quality=98, subsampling=0)
    
    # 3. Spreads 2 to 13: 12 Commercial & Urban Spreads (Pages 04 to 27)
    urb_spreads = [
        (
            r'03_Commercial_and_Infrastructure\13_East_Tehran_Steel_Commercial_Complex\WhatsApp Image 2026-09-25 at 23.30.34 (1).jpeg',
            "COM-01", "Steel Complex Master Site", "Master Site Layout, Wholesale Showrooms & Bank",
            "Integrated industrial-commercial campus combining wholesale steel retail, bank branch, and heavy logistics arterial roads.",
            "Heavy vehicular circulation turning radii, 36m clear-span steel trusses, fire separation zoning."
        ),
        (
            r'03_Commercial_and_Infrastructure\13_East_Tehran_Steel_Commercial_Complex\WhatsApp Image 2026-09-25 at 23.30.34 (2).jpeg',
            "COM-02", "Steel Commercial Showroom", "High-Bay Industrial Sheds & Transparent Retail Front",
            "Dual-function commercial facility combining high-bay inventory storage with glazed display pavilions facing major avenues.",
            "15-ton overhead gantry crane coordination, insulated sandwich panels, heavy-duty industrial floor screed."
        ),
        (
            r'03_Commercial_and_Infrastructure\13_East_Tehran_Steel_Commercial_Complex\WhatsApp Image 2026-09-25 at 23.30.34 (3).jpeg',
            "COM-03", "Administrative & Bank HQ", "Composite Metal Cladding & Corporate Architectural Identity",
            "Corporate headquarters and full-service commercial bank branch featuring dynamic angled glass curtains and metal rainscreens.",
            "Anthracite aluminum composite rainscreens, point-supported glass fittings, central VRF climate control system."
        ),
        (
            r'03_Commercial_and_Infrastructure\13_East_Tehran_Steel_Commercial_Complex\WhatsApp Image 2026-09-25 at 23.30.34 (4).jpeg',
            "COM-04", "Logistics Bays & Urban Elevation", "Loading Bays, Street Elevation & Integrated Signage",
            "Executive street elevation with synchronized loading docks, automated rolling sectional doors, and commercial branding band.",
            "Hydraulic dock levelers, semi-trailer circulation clearance, architectural exterior floodlights."
        ),
        (
            r'03_Commercial_and_Infrastructure\14_Erbil_Department_Store\WhatsApp Image 2026-09-25 at 23.31.33 (1).jpeg',
            "COM-05", "Erbil Department Store Architecture", "Parametric Vaults & Monumental Retail Facade",
            "Regional department store landmark in Erbil featuring monumental parabolic arches and sandstone cladding.",
            "Parametric curved steel arches, exterior tensioned fabric solar screens, high-capacity passenger elevators."
        ),
        (
            r'03_Commercial_and_Infrastructure\14_Erbil_Department_Store\WhatsApp Image 2026-09-25 at 23.31.33 (2).jpeg',
            "COM-06", "Erbil Retail Concourse & Skylight", "Commercial Circulation & Daylit Central Galleria",
            "Expansive retail galleria centered around an elliptical daylight atrium with panoramic escalators and food court verandas.",
            "Atrium smoke extraction venting, automated NFPA sprinkler zoning, acoustic baffle ceiling systems."
        ),
        (
            r'03_Commercial_and_Infrastructure\14_Erbil_Department_Store\WhatsApp Image 2026-09-25 at 23.31.33 (3).jpeg',
            "COM-07", "Erbil Store Floor Plans & Sections", "Multi-Level Retail Layouts & Structural Span Sections",
            "Comprehensive retail floor plans detailing anchor department zones, boutique tenant layouts, and underground delivery.",
            "Post-tensioned two-way slab (12x12m column grid), emergency egress stair calculations, MEP distribution shafts."
        ),
        (
            r'03_Commercial_and_Infrastructure\15_Bridge_and_Highway_Infrastructure\WhatsApp Image 2026-09-25 at 23.26.51.jpeg',
            "INF-08", "Metropolitan Infrastructure", "Grade-Separated Highway Flyover Interchange",
            "Civil and urban highway interchange optimizing vehicle flow through multi-level curved flyovers and grade separations.",
            "Prestressed concrete box-girder superstructures, elastomeric bridge bearings, stormwater runoff detention."
        ),
        (
            r'05_Urban_Planning_and_Landscape\22_Zargandeh_Riverside_Urban_Morphology\WhatsApp Image 2026-09-25 at 23.53.04 (1).jpeg',
            "URB-09", "Zargandeh Basin Morphology Analysis", "River Corridor Topography & Micro-District Density",
            "Spatial morphology research evaluating historic development patterns, steep slope risks, and tissue permeability.",
            "GIS spatial statistics, parcel density mapping, slope stability calculations, riparian buffer zoning."
        ),
        (
            r'05_Urban_Planning_and_Landscape\22_Zargandeh_Riverside_Urban_Morphology\WhatsApp Image 2026-09-25 at 23.53.04 (2).jpeg',
            "URB-10", "Riverbank Ecological Regeneration", "Linear Green Waterfront & Pedestrian Corridors",
            "Urban renewal masterplan converting degraded riverbanks into accessible green recreational spines with pedestrian bridges.",
            "Bioengineered slope stabilization, permeable surfaces, urban bioswales and drought-tolerant native vegetation."
        ),
        (
            r'05_Urban_Planning_and_Landscape\23_Urban_Design_High_Density_Masterplan\WhatsApp Image 2026-09-25 at 23.53.05 (1).jpeg',
            "URB-11", "High-Density Skyline & Solar Corridors", "3D Massing, Urban Skyline & Microclimate Simulation",
            "Macro urban massing strategy sculpting high-rise envelopes to maximize street-level sunlight and pedestrian wind comfort.",
            "Ladybug daylight envelope analysis, CFD urban microclimate modeling, Floor Area Ratio optimization up to 800%."
        ),
        (
            r'05_Urban_Planning_and_Landscape\23_Urban_Design_High_Density_Masterplan\WhatsApp Image 2026-09-25 at 23.53.05 (2).jpeg',
            "URB-12", "Transit-Oriented Development (TOD)", "Multimodal Mobility, Mixed-Use Zoning & Urban Fabric",
            "Transit-oriented district masterplan integrating high-speed rail, metro stations, pedestrian boulevards, and public squares.",
            "Pedestrian isochrone 5/10 min walksheds, underground automated logistics, district-scale geothermal energy grid."
        )
    ]
    
    full_spreads = [v_man]
    
    for idx, (rel_path, code, title, sub, br, sp) in enumerate(urb_spreads):
        pl = 4 + idx * 2
        pr = 5 + idx * 2
        full_path = os.path.join(BASE_IMG_DIR, rel_path)
        print(f"Generating Urban Spread {idx+1}: [{code}] {title} (Pages {pl:02d}-{pr:02d})...")
        sp_img = create_project_spread(
            full_path, VOL_TITLE, code, "Commercial Architecture & Urban Design",
            title, pl, pr, TOTAL_PAGES, brief_text=br, technical_specs=sp
        )
        full_spreads.append(sp_img)
        
        lp = sp_img.crop((0, 0, PAGE_W, PAGE_H))
        rp = sp_img.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
        lp.save(os.path.join(out_dir, f"page_{pl:02d}.jpg"), quality=98, subsampling=0)
        rp.save(os.path.join(out_dir, f"page_{pr:02d}.jpg"), quality=98, subsampling=0)
        
    # 4. Spread 14: Pages 28 & 29 (Execution Standards)
    urb_steps = [
        ("STAGE 1: GIS & MACRO-SCALE MOBILITY", "Spatial network analytics, isochrone pedestrian walkshed mapping, traffic flow modeling."),
        ("STAGE 2: URBAN MASSING & SOLAR ENVELOPE", "Ladybug solar rights study, sky exposure planes, wind tunnel CFD microclimate optimization."),
        ("STAGE 3: MULTI-SYSTEM BIM LOD 350", "Heavy steel clear-span trusses, long-span post-tensioned slabs, subterranean utilities."),
        ("STAGE 4: DAYLIGHT ATRIUM & NIGHT SKYLINE", "Corona high-bay photometric simulations, nocturnal retail visibility, material mockups."),
        ("STAGE 5: FULL CIVIC & RETAIL DRAWING SET", "1:50 concourse layouts, emergency egress stairs, dock loading clearances, MEP shafts."),
        ("STAGE 6: PHASING, MOBILITY & SITE AUDIT", "Construction staging schedules, precast girder crane sequence, site quality assurance.")
    ]
    std_spread = create_execution_standards_spread(VOL_TITLE, "Urban & Commercial Protocol", urb_steps, pl=28, pr=29, total_pages=32)
    full_spreads.append(std_spread)
    p28 = std_spread.crop((0, 0, PAGE_W, PAGE_H))
    p29 = std_spread.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
    p28.save(os.path.join(out_dir, "page_28.jpg"), quality=98, subsampling=0)
    p29.save(os.path.join(out_dir, "page_29.jpg"), quality=98, subsampling=0)
    
    # 5. Spread 15: Pages 30 & 31 (Principals Leadership)
    prin_spread = create_principals_spread(VOL_TITLE, "Commercial & Urban Leadership", pl=30, pr=31, total_pages=32)
    full_spreads.append(prin_spread)
    p30 = prin_spread.crop((0, 0, PAGE_W, PAGE_H))
    p31 = prin_spread.crop((PAGE_W, 0, PAGE_W * 2, PAGE_H))
    p30.save(os.path.join(out_dir, "page_30.jpg"), quality=98, subsampling=0)
    p31.save(os.path.join(out_dir, "page_31.jpg"), quality=98, subsampling=0)
    
    # 6. Page 32: Back Cover
    b_cov = create_back_cover("VOLUME III: COMMERCIAL & URBAN MASTERPLANNING")
    b_cov.save(os.path.join(out_dir, "page_32.jpg"), quality=98, subsampling=0)
    
    # Copy all to dist
    dist_b_dir = os.path.join(DIST_DIR, 'portfolio_urban', 'book_pages')
    os.makedirs(dist_b_dir, exist_ok=True)
    for f in glob.glob(os.path.join(out_dir, '*.jpg')):
        shutil.copy2(f, os.path.join(dist_b_dir, os.path.basename(f)))
        
    build_pdf_from_spreads(pdf_out, cov, full_spreads, b_cov)

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
        print("GENERATING ALL 3 VOLUMES (32 ALIGNED PAGES EACH)...")
        generate_villas_volume()
        generate_apartments_volume()
        generate_urban_commercial_volume()
        print("\nALL 3 VOLUMES GENERATED WITH 100% PERFECT SPREAD ALIGNMENT!")
