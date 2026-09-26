import os
import glob
import shutil
import textwrap
from PIL import Image, ImageDraw, ImageFont, ImageFilter
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

# =========================================================================
# 1. LANDSCAPE FRONT COVER (PAGE 01)
# =========================================================================
def create_landscape_cover(vol_title_upper, vol_sub_upper, vol_desc, total_pages):
    cov = Image.new('RGB', (TARGET_W, TARGET_H), (14, 18, 24))
    cd = ImageDraw.Draw(cov)
    
    # Outer double perimeter hairlines
    cd.rectangle([40, 40, TARGET_W - 40, TARGET_H - 40], outline=(38, 50, 62), width=1)
    cd.rectangle([46, 46, TARGET_W - 46, TARGET_H - 46], outline=(25, 34, 44), width=1)
    
    # Studio top banner
    cd.text((TARGET_W // 2, 85), "B I M C O   S T U D I O   B A R C E L O N A", fill=(194, 125, 83), font=get_font(13, bold=True), anchor="mm")
    cd.text((TARGET_W // 2, 115), "BARCELONA, SPAIN   •   OFFICIAL ARCHITECTURAL MONOGRAPH   •   EDITION 2026", fill=(130, 150, 165), font=get_font(11), anchor="mm")
    cd.line([(TARGET_W // 2 - 160, 140), (TARGET_W // 2 + 160, 140)], fill=(45, 60, 75), width=1)
    
    # 3D Emblem
    l_size = 240
    logo_r = logo_img.resize((l_size, l_size), Image.Resampling.LANCZOS)
    cov.paste(logo_r, ((TARGET_W - l_size) // 2, 175), logo_r)
    
    # Titles
    cd.text((TARGET_W // 2, 465), "B  I  M  C  O", fill=(255, 255, 255), font=get_font(48, bold=True), anchor="mm")
    cd.text((TARGET_W // 2, 525), vol_title_upper, fill=(194, 125, 83), font=get_font(19, bold=True), anchor="mm")
    cd.text((TARGET_W // 2, 560), vol_sub_upper, fill=(220, 230, 240), font=get_font(13, bold=True), anchor="mm")
    cd.text((TARGET_W // 2, 590), vol_desc, fill=(140, 160, 175), font=get_font(13), anchor="mm")
    
    # Collaborative Leadership Card
    bx, by, bw, bh = 460, 655, 1000, 175
    cd.rectangle([bx, by, bx + bw, by + bh], fill=(20, 27, 35), outline=(48, 65, 80), width=1)
    cd.text((TARGET_W // 2, by + 28), "COLLABORATIVE ARCHITECTURAL PRACTICE & BIM DIRECTION", fill=(194, 125, 83), font=get_font(12, bold=True), anchor="mm")
    cd.line([(bx + 80, by + 48), (bx + bw - 80, by + 48)], fill=(38, 52, 65), width=1)
    
    # Soheil Masti Profile
    cd.text((bx + 250, by + 82), "SOHEIL MASTI", fill=(255, 255, 255), font=get_font(20, bold=True), anchor="mm")
    cd.text((bx + 250, by + 112), "BIM Director & Computational Architect", fill=(194, 125, 83), font=get_font(12, bold=True), anchor="mm")
    cd.text((bx + 250, by + 135), "Information Architecture & LOD 350 Audit", fill=(130, 150, 165), font=get_font(11), anchor="mm")
    
    # Divider
    cd.line([(TARGET_W // 2, by + 65), (TARGET_W // 2, by + bh - 20)], fill=(40, 55, 70), width=1)
    
    # Siavash Pazooki Profile
    cd.text((bx + 750, by + 82), "SIAVASH PAZOOKI", fill=(255, 255, 255), font=get_font(20, bold=True), anchor="mm")
    cd.text((bx + 750, by + 112), "Senior Architectural Designer & Visualizer", fill=(194, 125, 83), font=get_font(12, bold=True), anchor="mm")
    cd.text((bx + 750, by + 135), "M.Arch & Lead Concept Formulator", fill=(130, 150, 165), font=get_font(11), anchor="mm")
    
    # Footer
    cd.line([(70, TARGET_H - 55), (TARGET_W - 70, TARGET_H - 55)], fill=(40, 52, 65), width=1)
    cd.text((70, TARGET_H - 38), "BARCELONA, CATALONIA, SPAIN   •   TEL/WHATSAPP: +34 610 855 434   •   WWW.BIMCO.ES", fill=(120, 140, 155), font=get_font(10), anchor="lm")
    cd.text((TARGET_W // 2, TARGET_H - 38), "CONFIDENTIAL & VERIFIED PORTFOLIO MONOGRAPH   •   © 2026 BIMCO BARCELONA", fill=(194, 125, 83), font=get_font(9, bold=True), anchor="mm")
    cd.text((TARGET_W - 70, TARGET_H - 38), f"PAGE 01 / {total_pages:02d}", fill=(150, 170, 185), font=get_font(10, bold=True), anchor="rm")
    
    return cov

# =========================================================================
# 2. LANDSCAPE EDITORIAL & PROJECT INDEX SPREAD (PAGE 02)
# =========================================================================
def create_editorial_sheet(vol_title, essay_title, essay_sub, essay_paragraphs, project_index, page_num, total_pages):
    spread = Image.new('RGB', (TARGET_W, TARGET_H), (18, 24, 30))
    draw = ImageDraw.Draw(spread)
    
    # Outer hairline
    draw.rectangle([40, 40, TARGET_W - 40, TARGET_H - 40], outline=(38, 50, 62), width=1)
    
    # Hairline header & footer
    draw.line([(70, 55), (TARGET_W - 70, 55)], fill=(45, 60, 72), width=1)
    draw.text((70, 38), "BIMCO STUDIO BARCELONA", fill=(255, 255, 255), font=get_font(11, bold=True), anchor="lm")
    draw.text((TARGET_W // 2, 38), f"{vol_title.upper()}   |   CURATORIAL STATEMENT & PROJECT ARCHIVE", fill=(194, 125, 83), font=get_font(11, bold=True), anchor="mm")
    draw.text((TARGET_W - 70, 38), "SOHEIL MASTI  •  SIAVASH PAZOOKI", fill=(150, 170, 185), font=get_font(10, bold=True), anchor="rm")
    
    # Left Page: Essay
    draw.rectangle([70, 95, 920, TARGET_H - 95], fill=(22, 29, 37), outline=(42, 56, 70), width=1)
    draw.text((105, 140), essay_title, fill=(255, 255, 255), font=get_font(22, bold=True))
    draw.text((105, 175), essay_sub, fill=(194, 125, 83), font=get_font(13, bold=True))
    draw.line([(105, 202), (885, 202)], fill=(45, 60, 72), width=1)
    
    y = 230
    for p in essay_paragraphs:
        for line in p.split('\n'):
            draw.text((105, y), line, fill=(195, 210, 220), font=get_font(13))
            y += 24
        y += 20
        
    # Practice commitment seal
    draw.rectangle([105, TARGET_H - 180, 885, TARGET_H - 120], fill=(26, 35, 45), outline=(48, 65, 80), width=1)
    draw.text((495, TARGET_H - 158), "UNINTERRUPTED MONOGRAPH PROTOCOL", fill=(194, 125, 83), font=get_font(11, bold=True), anchor="mm")
    draw.text((495, TARGET_H - 138), "Every project is presented with complete continuity from plans to execution.", fill=(160, 180, 195), font=get_font(11), anchor="mm")
        
    # Right Page: Project Index (Consecutive presentation order)
    draw.rectangle([980, 95, TARGET_W - 70, TARGET_H - 95], fill=(22, 29, 37), outline=(42, 56, 70), width=1)
    draw.text((1015, 140), "PROJECT ARCHIVE & SEQUENCE", fill=(255, 255, 255), font=get_font(22, bold=True))
    draw.text((1015, 175), "Chronological Architectural Records (All Sheets in Consecutive Order)", fill=(194, 125, 83), font=get_font(13, bold=True))
    draw.line([(1015, 202), (TARGET_W - 105, 202)], fill=(45, 60, 72), width=1)
    
    iy = 235
    for num, title, count_text, pages_text in project_index:
        draw.rectangle([1015, iy, TARGET_W - 105, iy + 62], fill=(27, 36, 46), outline=(48, 65, 80), width=1)
        draw.text((1035, iy + 31), num, fill=(194, 125, 83), font=get_font(15, bold=True), anchor="lm")
        draw.text((1080, iy + 21), title, fill=(255, 255, 255), font=get_font(13, bold=True), anchor="lm")
        draw.text((1080, iy + 43), count_text, fill=(145, 165, 175), font=get_font(11), anchor="lm")
        draw.text((TARGET_W - 125, iy + 31), pages_text, fill=(194, 125, 83), font=get_font(12, bold=True), anchor="rm")
        iy += 74
        
    # Bottom hairline
    draw.line([(70, TARGET_H - 55), (TARGET_W - 70, TARGET_H - 55)], fill=(45, 60, 72), width=1)
    draw.text((70, TARGET_H - 38), "BARCELONA, SPAIN   •   WWW.BIMCO.ES   •   +34 610 855 434", fill=(140, 160, 170), font=get_font(10), anchor="lm")
    draw.text((TARGET_W // 2, TARGET_H - 38), "VERIFIED BIMCO ARCHITECTURAL SHEET   •   © 2026 BIMCO BARCELONA", fill=(194, 125, 83), font=get_font(9, bold=True), anchor="mm")
    draw.text((TARGET_W - 70, TARGET_H - 38), f"PAGE {page_num:02d} / {total_pages:02d}", fill=(255, 255, 255), font=get_font(10, bold=True), anchor="rm")
    
    return spread

# =========================================================================
# 3. MINIMALIST GALLERY PROJECT SHEET
# =========================================================================
def create_minimalist_sheet(image_path, vol_title, project_title, sheet_info, page_num, total_pages):
    canvas = Image.new('RGB', (TARGET_W, TARGET_H), (255, 255, 255))
    draw = ImageDraw.Draw(canvas)
    
    # 1. Scale and position presentation board (centered with breathing margins)
    avail_w = TARGET_W - 60
    avail_h = TARGET_H - 120
    
    with Image.open(image_path) as sp:
        sp_rgb = sp.convert('RGB')
        scale = min(avail_w / sp_rgb.width, avail_h / sp_rgb.height)
        nw = int(sp_rgb.width * scale)
        nh = int(sp_rgb.height * scale)
        resized = sp_rgb.resize((nw, nh), Image.Resampling.LANCZOS)
        # Enhance CAD lines, text annotations, and render textures
        resized = resized.filter(ImageFilter.UnsharpMask(radius=1.0, percent=105, threshold=1))
        
        pos_x = (TARGET_W - nw) // 2
        pos_y = 56 + (avail_h - nh) // 2
        
        # Subtle perimeter hairline around the image
        draw.rectangle([pos_x - 1, pos_y - 1, pos_x + nw + 1, pos_y + nh + 1], outline=(226, 232, 240), width=1)
        canvas.paste(resized, (pos_x, pos_y))
        
    # 2. Minimalist Architectural Framing (Top hairline)
    line_col = (226, 232, 240)
    text_dark = (15, 23, 42)
    text_muted = (100, 116, 139)
    accent_gold = (194, 125, 83)
    
    draw.line([(35, 46), (TARGET_W - 35, 46)], fill=line_col, width=1)
    
    # Left: Studio & Volume
    draw.text((35, 24), "BIMCO STUDIO BARCELONA", fill=text_dark, font=get_font(11, bold=True), anchor="lm")
    draw.text((220, 24), "•", fill=accent_gold, font=get_font(10), anchor="mm")
    draw.text((235, 24), vol_title.upper(), fill=text_muted, font=get_font(10), anchor="lm")
    
    # Center: Project Name & Sheet Number
    center_label = f"{project_title.upper()}   |   {sheet_info.upper()}"
    draw.text((TARGET_W // 2, 24), center_label, fill=text_dark, font=get_font(11, bold=True), anchor="mm")
    
    # Right: Principals
    draw.text((TARGET_W - 35, 24), "SOHEIL MASTI  •  SIAVASH PAZOOKI", fill=text_muted, font=get_font(10, bold=True), anchor="rm")
    
    # 3. Minimalist Architectural Framing (Bottom hairline)
    draw.line([(35, TARGET_H - 42), (TARGET_W - 35, TARGET_H - 42)], fill=line_col, width=1)
    
    # Left: Studio Location & Verification
    draw.text((35, TARGET_H - 22), "BARCELONA, SPAIN   •   TEL/WHATSAPP: +34 610 855 434   •   WWW.BIMCO.ES", fill=text_muted, font=get_font(10), anchor="lm")
    
    # Center: Discreet Anti-Tamper Security Seal
    draw.text((TARGET_W // 2, TARGET_H - 22), "VERIFIED BIMCO ARCHITECTURAL SHEET   •   © 2026 BIMCO BARCELONA", fill=accent_gold, font=get_font(9, bold=True), anchor="mm")
    
    # Right: Exact matching page number
    draw.text((TARGET_W - 35, TARGET_H - 22), f"PAGE {page_num:02d}  /  {total_pages:02d}", fill=text_dark, font=get_font(10, bold=True), anchor="rm")
    
    return canvas

# =========================================================================
# 4. LEADERSHIP & PRACTICE SPECIALIZATION SPREAD
# =========================================================================
def create_leadership_sheet(vol_title, page_num, total_pages):
    spread = Image.new('RGB', (TARGET_W, TARGET_H), (18, 24, 30))
    draw = ImageDraw.Draw(spread)
    
    # Outer hairline
    draw.rectangle([40, 40, TARGET_W - 40, TARGET_H - 40], outline=(38, 50, 62), width=1)
    
    draw.line([(70, 55), (TARGET_W - 70, 55)], fill=(45, 60, 72), width=1)
    draw.text((70, 38), "BIMCO STUDIO BARCELONA", fill=(255, 255, 255), font=get_font(11, bold=True), anchor="lm")
    draw.text((TARGET_W // 2, 38), f"{vol_title.upper()}   |   PRACTICE LEADERSHIP & ARCHITECTURAL PRINCIPALS", fill=(194, 125, 83), font=get_font(11, bold=True), anchor="mm")
    draw.text((TARGET_W - 70, 38), "SOHEIL MASTI  •  SIAVASH PAZOOKI", fill=(150, 170, 185), font=get_font(10, bold=True), anchor="rm")
    
    # Left: Soheil Masti Box
    draw.rectangle([70, 95, 920, TARGET_H - 95], fill=(22, 29, 37), outline=(48, 68, 82), width=1)
    draw.text((105, 140), "SOHEIL MASTI", fill=(255, 255, 255), font=get_font(28, bold=True))
    draw.text((105, 180), "BIM Director & Computational Architect", fill=(194, 125, 83), font=get_font(15, bold=True))
    draw.text((105, 208), "BIMCO Studio Barcelona  •  Spain & International", fill=(140, 160, 170), font=get_font(12))
    draw.line([(105, 235), (885, 235)], fill=(45, 65, 78), width=1)
    
    soh_lines = [
        "EXECUTIVE ROLES & PRACTICE SPECIALIZATION:",
        "• Strategic BIM Implementation & Information Architecture",
        "• Multi-discipline Clash Detection & LOD 350 Coordination",
        "• Parametric Façade Engineering & Environmental Optimization",
        "• Automated Quantities, Cost Modeling & Fabrication Schedules",
        "• Executive Supervision & Construction Quality Assurance",
        "• International Project Delivery across Spain, EU & Middle East"
    ]
    sy = 270
    for l in soh_lines:
        if l.startswith("EXECUTIVE"):
            draw.text((105, sy), l, fill=(194, 125, 83), font=get_font(13, bold=True))
            sy += 32
        else:
            draw.text((105, sy), l, fill=(185, 200, 210), font=get_font(13))
            sy += 28
            
    # Right: Siavash Pazooki Box
    draw.rectangle([980, 95, TARGET_W - 70, TARGET_H - 95], fill=(22, 29, 37), outline=(48, 68, 82), width=1)
    draw.text((1015, 140), "SIAVASH PAZOOKI", fill=(255, 255, 255), font=get_font(28, bold=True))
    draw.text((1015, 180), "Senior Architectural Designer & High-End Visualizer", fill=(194, 125, 83), font=get_font(15, bold=True))
    draw.text((1015, 208), "M.Arch & B.Arch  •  BIMCO Studio Barcelona Partner", fill=(140, 160, 170), font=get_font(12))
    draw.line([(1015, 235), (TARGET_W - 105, 235)], fill=(45, 65, 78), width=1)
    
    sia_lines = [
        "EXECUTIVE ROLES & PRACTICE SPECIALIZATION:",
        "• Lead Architectural Concept Designer & Spatial Formulator",
        "• Advanced 3D Photorealistic CGI & Atmospheric Visualizations",
        "• Complex Elevation Tectonics, Louver Systems & Material Studies",
        "• Executive Floor Plans, Sectional Studies & Millwork Details",
        "• Active On-Site Construction Monitoring & Build Integrity Control",
        "• Over 8 Years Leading Signature High-End Commissions"
    ]
    sy = 270
    for l in sia_lines:
        if l.startswith("EXECUTIVE"):
            draw.text((1015, sy), l, fill=(194, 125, 83), font=get_font(13, bold=True))
            sy += 32
        else:
            draw.text((1015, sy), l, fill=(185, 200, 210), font=get_font(13))
            sy += 28
            
    # Bottom hairline
    draw.line([(70, TARGET_H - 55), (TARGET_W - 70, TARGET_H - 55)], fill=(45, 60, 72), width=1)
    draw.text((70, TARGET_H - 38), "BARCELONA, SPAIN   •   TEL/WHATSAPP: +34 610 855 434   •   WWW.BIMCO.ES", fill=(140, 160, 170), font=get_font(10), anchor="lm")
    draw.text((TARGET_W // 2, TARGET_H - 38), "VERIFIED BIMCO ARCHITECTURAL SHEET   •   © 2026 BIMCO BARCELONA", fill=(194, 125, 83), font=get_font(9, bold=True), anchor="mm")
    draw.text((TARGET_W - 70, TARGET_H - 38), f"PAGE {page_num:02d} / {total_pages:02d}", fill=(255, 255, 255), font=get_font(10, bold=True), anchor="rm")
    
    return spread

# =========================================================================
# 5. LANDSCAPE BACK COVER & ARCHIVE VERIFICATION (PAGE N)
# =========================================================================
def create_landscape_back(vol_title_upper, total_pages):
    b_cov = Image.new('RGB', (TARGET_W, TARGET_H), (14, 18, 24))
    draw = ImageDraw.Draw(b_cov)
    
    # Outer double perimeter hairlines
    draw.rectangle([40, 40, TARGET_W - 40, TARGET_H - 40], outline=(38, 50, 62), width=1)
    draw.rectangle([46, 46, TARGET_W - 46, TARGET_H - 46], outline=(25, 34, 44), width=1)
    
    # Header
    draw.line([(70, 60), (TARGET_W - 70, 60)], fill=(40, 52, 65), width=1)
    draw.text((70, 42), "BIMCO STUDIO BARCELONA", fill=(255, 255, 255), font=get_font(12, bold=True), anchor="lm")
    draw.text((TARGET_W // 2, 42), "OFFICIAL VERIFICATION ARCHIVE & QUALITY ASSURANCE", fill=(194, 125, 83), font=get_font(12, bold=True), anchor="mm")
    draw.text((TARGET_W - 70, 42), "SOHEIL MASTI  •  SIAVASH PAZOOKI", fill=(130, 150, 165), font=get_font(11), anchor="rm")
    
    # Left Side: Technical Verification Standards Box
    draw.rectangle([70, 100, 920, TARGET_H - 90], fill=(20, 27, 35), outline=(42, 56, 70), width=1)
    draw.text((110, 140), "ARCHITECTURAL VERIFICATION STANDARDS", fill=(255, 255, 255), font=get_font(19, bold=True))
    draw.text((110, 172), "Executive Quality Assurance & Practice Protocols", fill=(194, 125, 83), font=get_font(12, bold=True))
    draw.line([(110, 198), (880, 198)], fill=(45, 60, 75), width=1)
    
    standards = [
        ("01. UNBROKEN PROJECT CONTINUITY", "Every architectural commission in this monograph is presented in full chronological sequence without isolated or fragmented sheet sampling."),
        ("02. COMPUTATIONAL BIM LOD 350 INTEGRITY", "All designs are backed by coordinated Building Information Models with Clash Detection, accurate material schedules, and parametric modeling."),
        ("03. VERIFIED SITE EXECUTION & SUPERVISION", "Executive on-site supervisory records substantiate physical constructability, structural fidelity, and bespoke craftsmanship."),
        ("04. PERIMETER INTELLECTUAL PROPERTY", "All original concepts, structural solutions, and renders are protected by international copyright under BIMCO Studio Barcelona."),
        ("05. COLLABORATIVE CLIENT ADVISORY", "Direct partner access to principals Soheil Masti and Siavash Pazooki for international commissions across Spain, the EU, and the Middle East.")
    ]
    sy = 225
    for code, desc in standards:
        draw.text((110, sy), code, fill=(194, 125, 83), font=get_font(12, bold=True))
        lines = textwrap.wrap(desc, width=68)
        for line in lines:
            sy += 22
            draw.text((110, sy), line, fill=(185, 200, 212), font=get_font(12))
        sy += 36
        
    # Right Side: Studio Closing & Contacts
    draw.rectangle([980, 100, TARGET_W - 70, TARGET_H - 90], fill=(20, 27, 35), outline=(42, 56, 70), width=1)
    
    l_size = 180
    logo_r = logo_img.resize((l_size, l_size), Image.Resampling.LANCZOS)
    cx = 980 + (TARGET_W - 70 - 980) // 2
    b_cov.paste(logo_r, (cx - l_size // 2, 140), logo_r)
    
    draw.text((cx, 350), "B  I  M  C  O", fill=(255, 255, 255), font=get_font(36, bold=True), anchor="mm")
    draw.text((cx, 390), vol_title_upper, fill=(194, 125, 83), font=get_font(14, bold=True), anchor="mm")
    draw.text((cx, 420), "BARCELONA, CATALONIA, SPAIN", fill=(210, 225, 235), font=get_font(13, bold=True), anchor="mm")
    draw.line([(cx - 150, 445), (cx + 150, 445)], fill=(45, 60, 75), width=1)
    
    contacts = [
        ("STUDIO HEADQUARTERS", "Barcelona, Catalonia, Spain"),
        ("PRACTICE DIRECTORS", "Soheil Masti & Siavash Pazooki"),
        ("DIRECT TELEPHONE & WHATSAPP", "+34 610 855 434"),
        ("OFFICIAL WEB PORTAL", "www.bimco.es"),
        ("DIRECT INQUIRIES & COMMISSIONS", "info@bimco.es")
    ]
    cy = 485
    for label, val in contacts:
        draw.text((cx, cy), label, fill=(130, 150, 165), font=get_font(11), anchor="mm")
        draw.text((cx, cy + 22), val, fill=(255, 255, 255), font=get_font(15, bold=True), anchor="mm")
        cy += 58
        
    draw.text((cx, TARGET_H - 125), "© 2026 BIMCO STUDIO BARCELONA. ALL RIGHTS RESERVED.", fill=(90, 110, 125), font=get_font(11), anchor="mm")
    
    # Footer
    draw.line([(70, TARGET_H - 55), (TARGET_W - 70, TARGET_H - 55)], fill=(40, 52, 65), width=1)
    draw.text((70, TARGET_H - 38), "BARCELONA, SPAIN   •   TEL/WHATSAPP: +34 610 855 434   •   WWW.BIMCO.ES", fill=(120, 140, 155), font=get_font(10), anchor="lm")
    draw.text((TARGET_W // 2, TARGET_H - 38), "VERIFIED BIMCO ARCHITECTURAL SHEET   •   © 2026 BIMCO BARCELONA", fill=(194, 125, 83), font=get_font(9, bold=True), anchor="mm")
    draw.text((TARGET_W - 70, TARGET_H - 38), f"PAGE {total_pages:02d} / {total_pages:02d}", fill=(150, 170, 185), font=get_font(10, bold=True), anchor="rm")
    
    return b_cov

# =========================================================================
# COMPILATION HELPER
# =========================================================================
def compile_pdf(pages_list, pdf_path):
    print(f"Compiling PDF to {pdf_path} ({len(pages_list)} landscape pages)...")
    pdf_doc = fitz.open()
    temp_sp = os.path.join(PUBLIC_DIR, '_temp_comp.jpg')
    
    for idx, p in enumerate(pages_list):
        p.save(temp_sp, "JPEG", quality=97, subsampling=0, optimize=True)
        pdf_page = pdf_doc.new_page(width=TARGET_W, height=TARGET_H)
        pdf_page.insert_image(fitz.Rect(0, 0, TARGET_W, TARGET_H), filename=temp_sp)
        
    if os.path.exists(temp_sp):
        os.remove(temp_sp)
        
    pdf_doc.save(pdf_path, deflate=True)
    pdf_doc.close()
    print(f"SUCCESS! Saved PDF to {pdf_path}")
    
    # Also sync with dist/ if dist exists
    if os.path.exists(DIST_DIR):
        shutil.copy2(pdf_path, os.path.join(DIST_DIR, os.path.basename(pdf_path)))

# =========================================================================
# VOLUME 1: LUXURY VILLAS & PRIVATE RESIDENCES (24 PAGES)
# =========================================================================
def generate_volume_1():
    VOL_TITLE = "Volume I: Luxury Villas & Private Residences"
    TOTAL_PAGES = 24
    out_dir = os.path.join(PUBLIC_DIR, 'portfolio_villas', 'book_pages')
    os.makedirs(out_dir, exist_ok=True)
    pdf_out = os.path.join(PUBLIC_DIR, 'BIMCO_Volume1_Villas_Portfolio.pdf')
    
    print(f"\n==========================================")
    print(f"BUILDING {VOL_TITLE} ({TOTAL_PAGES} PAGES)")
    print(f"==========================================")
    
    # 1. Front Cover (Page 01)
    cov = create_landscape_cover(
        "VOLUME I: LUXURY VILLAS & PRIVATE RESIDENCES",
        "TOPOGRAPHY, VOLUMETRIC FORM & EXECUTIVE SITE RECORDS",
        "Comprehensive monographs of signature residential estates presented in uninterrupted project continuity",
        TOTAL_PAGES
    )
    
    # 2. Editorial Statement & Project Archive (Page 02)
    essay = [
        "A private residence is the purest expression of architectural poetry and structural integrity.\nAt BIMCO Studio Barcelona, our villa designs do not impose themselves upon the landscape;\nthey grow organically from the earth's natural contours.",
        "Whether carving into steep mountain hillsides or framing panoramic desert horizons, each\nresidence is conceived through a harmonious balance of raw materiality—exposed concrete,\ntactile timber, natural stone—and endless natural daylight.",
        "Crucially, every project in this monograph is presented in its entirety: starting from initial\nvolumetric concepts through verified floor plans, cross-sections, and active worksite execution records."
    ]
    index = [
        ("01", "VIOLET LUXURY RESIDENCE", "Complete Project Presentation (9 Consecutive Sheets)", f"PGS 03 - 11 / {TOTAL_PAGES:02d}"),
        ("02", "TEHRAN DASHT MODERN VILLA", "Complete Project Presentation (4 Consecutive Sheets)", f"PGS 12 - 15 / {TOTAL_PAGES:02d}"),
        ("03", "AUSTRALIA VILLA & CURVED RESIDENCES", "Complete Project Presentation (7 Consecutive Sheets)", f"PGS 16 - 22 / {TOTAL_PAGES:02d}"),
        ("04", "PRACTICE LEADERSHIP & ARCHITECTS", "Soheil Masti & Siavash Pazooki Credentials", f"PAGE 23 / {TOTAL_PAGES:02d}"),
        ("05", "BIMCO VERIFICATION ARCHIVE", "Technical Standards & Quality Assurance Protocols", f"PAGE 24 / {TOTAL_PAGES:02d}")
    ]
    editorial = create_editorial_sheet(
        VOL_TITLE,
        "THE ARCHITECTURE OF LIVING WITH NATURE",
        "Form, Topography, and the Boundary Between Inside & Outside",
        essay, index, 2, TOTAL_PAGES
    )
    
    # 3. 20 Project Sheets (Pages 03 to 22)
    v1_project_sheets = [
        # --- PROJECT 1: VIOLET LUXURY RESIDENCE (9 CONSECUTIVE SHEETS: PGS 03 - 11) ---
        (r'01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.29.58.jpeg', "Violet Luxury Residence", "Executive Architectural Record • Sheet 01 / 09", 3),
        (r'01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.29.59.jpeg', "Violet Luxury Residence", "Executive Architectural Record • Sheet 02 / 09", 4),
        (r'01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.29.59 (1).jpeg', "Violet Luxury Residence", "Executive Architectural Record • Sheet 03 / 09", 5),
        (r'01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.29.59 (2).jpeg', "Violet Luxury Residence", "Executive Architectural Record • Sheet 04 / 09", 6),
        (r'01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.29.59 (3).jpeg', "Violet Luxury Residence", "Executive Architectural Record • Sheet 05 / 09", 7),
        (r'01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.29.59 (4).jpeg', "Violet Luxury Residence", "Executive Architectural Record • Sheet 06 / 09", 8),
        (r'01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.29.59 (5).jpeg', "Violet Luxury Residence", "Executive Architectural Record • Sheet 07 / 09", 9),
        (r'01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.30.00 (8).jpeg', "Violet Luxury Residence", "Executive Architectural Record • Sheet 08 / 09", 10),
        (r'01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.30.00 (9).jpeg', "Violet Luxury Residence", "Executive Architectural Record • Sheet 09 / 09", 11),
        
        # --- PROJECT 2: TEHRAN DASHT MODERN VILLA (4 CONSECUTIVE SHEETS: PGS 12 - 15) ---
        (r'01_Luxury_Villas\05_Tehran_Dasht_Villa\WhatsApp Image 2026-09-25 at 23.28.48.jpeg', "Tehran Dasht Modern Villa", "Executive Architectural Record • Sheet 01 / 04", 12),
        (r'01_Luxury_Villas\05_Tehran_Dasht_Villa\WhatsApp Image 2026-09-25 at 23.28.49.jpeg', "Tehran Dasht Modern Villa", "Executive Architectural Record • Sheet 02 / 04", 13),
        (r'01_Luxury_Villas\05_Tehran_Dasht_Villa\WhatsApp Image 2026-09-25 at 23.28.49 (1).jpeg', "Tehran Dasht Modern Villa", "Executive Architectural Record • Sheet 03 / 04", 14),
        (r'01_Luxury_Villas\05_Tehran_Dasht_Villa\WhatsApp Image 2026-09-25 at 23.28.49 (2).jpeg', "Tehran Dasht Modern Villa", "Executive Architectural Record • Sheet 04 / 04", 15),
        
        # --- PROJECT 3: AUSTRALIA VILLA & CURVED RESIDENCES (7 CONSECUTIVE SHEETS: PGS 16 - 22) ---
        (r'01_Luxury_Villas\07_Villa_in_Australia_and_Curved_Residences\WhatsApp Image 2026-09-25 at 23.27.44.jpeg', "Villa in Australia & Curved Architecture", "Executive Architectural Record • Sheet 01 / 07", 16),
        (r'01_Luxury_Villas\07_Villa_in_Australia_and_Curved_Residences\WhatsApp Image 2026-09-25 at 23.27.46 (7).jpeg', "Villa in Australia & Curved Architecture", "Executive Architectural Record • Sheet 02 / 07", 17),
        (r'01_Luxury_Villas\07_Villa_in_Australia_and_Curved_Residences\WhatsApp Image 2026-09-25 at 23.27.46 (8).jpeg', "Villa in Australia & Curved Architecture", "Executive Architectural Record • Sheet 03 / 07", 18),
        (r'01_Luxury_Villas\07_Villa_in_Australia_and_Curved_Residences\WhatsApp Image 2026-09-25 at 23.30.00.jpeg', "Villa in Australia & Curved Architecture", "Executive Architectural Record • Sheet 04 / 07", 19),
        (r'01_Luxury_Villas\07_Villa_in_Australia_and_Curved_Residences\WhatsApp Image 2026-09-25 at 23.30.00 (1).jpeg', "Villa in Australia & Curved Architecture", "Executive Architectural Record • Sheet 05 / 07", 20),
        (r'01_Luxury_Villas\07_Villa_in_Australia_and_Curved_Residences\WhatsApp Image 2026-09-25 at 23.30.00 (2).jpeg', "Villa in Australia & Curved Architecture", "Executive Architectural Record • Sheet 06 / 07", 21),
        (r'01_Luxury_Villas\07_Villa_in_Australia_and_Curved_Residences\WhatsApp Image 2026-09-25 at 23.30.00 (3).jpeg', "Villa in Australia & Curved Architecture", "Executive Architectural Record • Sheet 07 / 07", 22),
    ]
    
    project_sheets = []
    for rel_path, proj_name, sheet_str, p_num in v1_project_sheets:
        full_path = os.path.join(BASE_IMG_DIR, rel_path)
        sh = create_minimalist_sheet(full_path, "Volume I: Luxury Villas", proj_name, sheet_str, p_num, TOTAL_PAGES)
        project_sheets.append(sh)
        
    # 4. Leadership Profile (Page 23)
    leadership = create_leadership_sheet(VOL_TITLE, 23, TOTAL_PAGES)
    
    # 5. Back Cover & Verification Archive (Page 24)
    back_cov = create_landscape_back("VOLUME I: LUXURY VILLAS & PRIVATE RESIDENCES", TOTAL_PAGES)
    
    all_pages = [cov, editorial] + project_sheets + [leadership, back_cov]
    compile_pdf(all_pages, pdf_out)
    
    # Clean output dir first so no stale halved files remain
    if os.path.exists(out_dir):
        for f in os.listdir(out_dir):
            if f.endswith('.jpg'):
                try:
                    os.remove(os.path.join(out_dir, f))
                except Exception:
                    pass

    # Save complete unbroken landscape pages for flipbook
    for i, p in enumerate(all_pages):
        page_file = os.path.join(out_dir, f"page_{i+1:02d}.jpg")
        p.save(page_file, "JPEG", quality=98, subsampling=0, optimize=True)
        
    print(f"Volume 1 Complete: {len(all_pages)} full landscape pages generated!")

# =========================================================================
# VOLUME 2: RESIDENTIAL APARTMENTS & FACADE ENGINEERING (22 PAGES)
# =========================================================================
def generate_volume_2():
    VOL_TITLE = "Volume II: Residential Mid/High-Rise & Facades"
    TOTAL_PAGES = 22
    out_dir = os.path.join(PUBLIC_DIR, 'portfolio_apartments', 'book_pages')
    os.makedirs(out_dir, exist_ok=True)
    pdf_out = os.path.join(PUBLIC_DIR, 'BIMCO_Volume2_Apartments_Facades.pdf')
    
    print(f"\n==========================================")
    print(f"BUILDING {VOL_TITLE} ({TOTAL_PAGES} PAGES)")
    print(f"==========================================")
    
    # 1. Front Cover (Page 01)
    cov = create_landscape_cover(
        "VOLUME II: RESIDENTIAL APARTMENTS & ADVANCED FACADES",
        "BUILDING ENVELOPE TECTONICS & URBAN COLLECTIVE FORM",
        "Comprehensive monographs of multi-family dwellings and facade engineering in uninterrupted project continuity",
        TOTAL_PAGES
    )
    
    # 2. Editorial Statement & Project Archive (Page 02)
    essay = [
        "The facade is the public face of architecture—the mediator between the urban realm\nand private human dwelling. At BIMCO Studio Barcelona, we treat the building skin\nas a high-performance tectonic system that balances light, privacy, acoustic buffering,\nand energy conservation.",
        "Our residential projects—from terraced mountain dwellings in Dalkhani to mid-rise luxury\nenclaves in Darrous and high-density modular towers—demonstrate rigorous structural logic.",
        "Every joint, reveal, and stone anchor is coordinated in BIM to bridge the gap between\nbold aesthetic visions and flawless on-site installation."
    ]
    index = [
        ("01", "DARROUS RESIDENTIAL FACADE 2020", "Complete Project Presentation (6 Consecutive Sheets)", f"PGS 03 - 08 / {TOTAL_PAGES:02d}"),
        ("02", "DALKHANI RESIDENTIAL TERRACES", "Complete Project Presentation (5 Consecutive Sheets)", f"PGS 09 - 13 / {TOTAL_PAGES:02d}"),
        ("03", "URBAN MID-RISE & MONUMENTAL PALACE", "Complete Facade Typologies (7 Consecutive Sheets)", f"PGS 14 - 20 / {TOTAL_PAGES:02d}"),
        ("04", "PRACTICE LEADERSHIP & ARCHITECTS", "Soheil Masti & Siavash Pazooki Credentials", f"PAGE 21 / {TOTAL_PAGES:02d}"),
        ("05", "BIMCO VERIFICATION ARCHIVE", "Technical Standards & Quality Assurance Protocols", f"PAGE 22 / {TOTAL_PAGES:02d}")
    ]
    editorial = create_editorial_sheet(
        VOL_TITLE,
        "THE ARCHITECTURE OF URBAN SKINS & COLLECTIVE HOUSING",
        "Tectonic Depth, Material Permanence, and Solar Modulation",
        essay, index, 2, TOTAL_PAGES
    )
    
    # 3. 18 Project Sheets (Pages 03 to 20)
    v2_project_sheets = [
        # --- PROJECT 1: DARROUS RESIDENTIAL FACADE (6 CONSECUTIVE SHEETS: PGS 03 - 08) ---
        (r'02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25.jpeg', "Darrous Residential Facade 2020", "Executive Architectural Record • Sheet 01 / 06", 3),
        (r'02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25 (1).jpeg', "Darrous Residential Facade 2020", "Executive Architectural Record • Sheet 02 / 06", 4),
        (r'02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25 (2).jpeg', "Darrous Residential Facade 2020", "Executive Architectural Record • Sheet 03 / 06", 5),
        (r'02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25 (3).jpeg', "Darrous Residential Facade 2020", "Executive Architectural Record • Sheet 04 / 06", 6),
        (r'02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25 (4).jpeg', "Darrous Residential Facade 2020", "Executive Architectural Record • Sheet 05 / 06", 7),
        (r'02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25 (5).jpeg', "Darrous Residential Facade 2020", "Executive Architectural Record • Sheet 06 / 06", 8),
        
        # --- PROJECT 2: DALKHANI RESIDENTIAL TERRACES (5 CONSECUTIVE SHEETS: PGS 09 - 13) ---
        (r'02_Residential_Buildings_Facades\10_Residential_Dalkhani_Terraces\WhatsApp Image 2026-09-25 at 23.29.09.jpeg', "Dalkhani Mountain Terraces", "Executive Architectural Record • Sheet 01 / 05", 9),
        (r'02_Residential_Buildings_Facades\10_Residential_Dalkhani_Terraces\WhatsApp Image 2026-09-25 at 23.29.10.jpeg', "Dalkhani Mountain Terraces", "Executive Architectural Record • Sheet 02 / 05", 10),
        (r'02_Residential_Buildings_Facades\10_Residential_Dalkhani_Terraces\WhatsApp Image 2026-09-25 at 23.29.10 (1).jpeg', "Dalkhani Mountain Terraces", "Executive Architectural Record • Sheet 03 / 05", 11),
        (r'02_Residential_Buildings_Facades\10_Residential_Dalkhani_Terraces\WhatsApp Image 2026-09-25 at 23.29.10 (2).jpeg', "Dalkhani Mountain Terraces", "Executive Architectural Record • Sheet 04 / 05", 12),
        (r'02_Residential_Buildings_Facades\10_Residential_Dalkhani_Terraces\WhatsApp Image 2026-09-25 at 23.29.10 (3).jpeg', "Dalkhani Mountain Terraces", "Executive Architectural Record • Sheet 05 / 05", 13),
        
        # --- PROJECT 3: URBAN MID/HIGH-RISE FACADES & PALACE (7 CONSECUTIVE SHEETS: PGS 14 - 20) ---
        (r'02_Residential_Buildings_Facades\11_Mid_and_High_Rise_Residential_Collection\WhatsApp Image 2026-09-25 at 23.26.51 (1).jpeg', "Urban Residential Architecture", "Façade Engineering Record • Sheet 01 / 07", 14),
        (r'02_Residential_Buildings_Facades\11_Mid_and_High_Rise_Residential_Collection\WhatsApp Image 2026-09-25 at 23.26.51 (2).jpeg', "Urban Residential Architecture", "Façade Engineering Record • Sheet 02 / 07", 15),
        (r'02_Residential_Buildings_Facades\11_Mid_and_High_Rise_Residential_Collection\WhatsApp Image 2026-09-25 at 23.26.51 (3).jpeg', "Urban Residential Architecture", "Façade Engineering Record • Sheet 03 / 07", 16),
        (r'02_Residential_Buildings_Facades\11_Mid_and_High_Rise_Residential_Collection\WhatsApp Image 2026-09-25 at 23.34.06.jpeg', "Urban Residential Architecture", "Façade Engineering Record • Sheet 04 / 07", 17),
        (r'02_Residential_Buildings_Facades\11_Mid_and_High_Rise_Residential_Collection\WhatsApp Image 2026-09-25 at 23.34.07.jpeg', "Urban Residential Architecture", "Façade Engineering Record • Sheet 05 / 07", 18),
        (r'02_Residential_Buildings_Facades\11_Mid_and_High_Rise_Residential_Collection\WhatsApp Image 2026-09-25 at 23.34.08.jpeg', "Urban Residential Architecture", "Façade Engineering Record • Sheet 06 / 07", 19),
        (r'02_Residential_Buildings_Facades\12_Classical_Monumental_Palace\WhatsApp Image 2026-09-25 at 23.37.25 (3).jpeg', "Classical Monumental Palace", "Façade Engineering Record • Sheet 07 / 07", 20),
    ]
    
    project_sheets = []
    for rel_path, proj_name, sheet_str, p_num in v2_project_sheets:
        full_path = os.path.join(BASE_IMG_DIR, rel_path)
        sh = create_minimalist_sheet(full_path, "Volume II: Residential & Facades", proj_name, sheet_str, p_num, TOTAL_PAGES)
        project_sheets.append(sh)
        
    # 4. Leadership Profile (Page 21)
    leadership = create_leadership_sheet(VOL_TITLE, 21, TOTAL_PAGES)
    
    # 5. Back Cover & Verification Archive (Page 22)
    back_cov = create_landscape_back("VOLUME II: RESIDENTIAL APARTMENTS & FACADES", TOTAL_PAGES)
    
    all_pages = [cov, editorial] + project_sheets + [leadership, back_cov]
    compile_pdf(all_pages, pdf_out)
    
    # Clean output dir first so no stale halved files remain
    if os.path.exists(out_dir):
        for f in os.listdir(out_dir):
            if f.endswith('.jpg'):
                try:
                    os.remove(os.path.join(out_dir, f))
                except Exception:
                    pass

    # Save complete unbroken landscape pages for flipbook
    for i, p in enumerate(all_pages):
        page_file = os.path.join(out_dir, f"page_{i+1:02d}.jpg")
        p.save(page_file, "JPEG", quality=98, subsampling=0, optimize=True)
        
    print(f"Volume 2 Complete: {len(all_pages)} full landscape pages generated!")

# =========================================================================
# VOLUME 3: COMMERCIAL ARCHITECTURE, INFRASTRUCTURE & URBAN DESIGN (32 PAGES)
# =========================================================================
def generate_volume_3():
    VOL_TITLE = "Volume III: Commercial Architecture & Urban Design"
    TOTAL_PAGES = 32
    out_dir = os.path.join(PUBLIC_DIR, 'portfolio_urban', 'book_pages')
    os.makedirs(out_dir, exist_ok=True)
    pdf_out = os.path.join(PUBLIC_DIR, 'BIMCO_Volume3_Urban_Commercial.pdf')
    
    print(f"\n==========================================")
    print(f"BUILDING {VOL_TITLE} ({TOTAL_PAGES} PAGES)")
    print(f"==========================================")
    
    # 1. Front Cover (Page 01)
    cov = create_landscape_cover(
        "VOLUME III: COMMERCIAL ARCHITECTURE & URBAN DESIGN",
        "CIVIC SCALE, MOBILITY & RESILIENT URBAN MORPHOLOGY",
        "Comprehensive monographs of commercial complexes, infrastructure and masterplans in uninterrupted project continuity",
        TOTAL_PAGES
    )
    
    # 2. Editorial Statement & Project Archive (Page 02)
    essay = [
        "Cities thrive on the seamless exchange of people, goods, and civic ideas.\nAt BIMCO Studio Barcelona, our commercial and urban design practice operates at the\nintersection of macro-scale regional planning and precise architectural detailing.",
        "From the heavy logistical dynamics of the East Tehran Steel Campus to the fluid arched\ngallerias of Erbil Department Store, multi-level highway interchanges, and the ecological\nrejuvenation of river basins in Zargandeh, each project is engineered for resilience and vitality.",
        "Every project is presented with complete technical documentation: master site plans,\ncirculation analyses, structural spans, and execution frameworks."
    ]
    index = [
        ("01", "EAST TEHRAN STEEL COMPLEX", "Complete Project Presentation (7 Consecutive Sheets)", f"PGS 03 - 09 / {TOTAL_PAGES:02d}"),
        ("02", "ERBIL DEPARTMENT STORE & GALLERIA", "Complete Project Presentation (5 Consecutive Sheets)", f"PGS 10 - 14 / {TOTAL_PAGES:02d}"),
        ("03", "METROPOLITAN HIGHWAY INFRASTRUCTURE", "Highway Interchange & Flyovers (1 Sheet)", f"PAGE 15 / {TOTAL_PAGES:02d}"),
        ("04", "ZARGANDEH RIVERSIDE URBAN MORPHOLOGY", "Complete Urban River Study (5 Consecutive Sheets)", f"PGS 16 - 20 / {TOTAL_PAGES:02d}"),
        ("05", "HIGH-DENSITY URBAN MASTERPLAN", "Complete Urban Masterplan (10 Consecutive Sheets)", f"PGS 21 - 30 / {TOTAL_PAGES:02d}"),
        ("06", "PRACTICE LEADERSHIP & ARCHITECTS", "Soheil Masti & Siavash Pazooki Credentials", f"PAGE 31 / {TOTAL_PAGES:02d}"),
        ("07", "BIMCO VERIFICATION ARCHIVE", "Technical Standards & Quality Assurance Protocols", f"PAGE 32 / {TOTAL_PAGES:02d}")
    ]
    editorial = create_editorial_sheet(
        VOL_TITLE,
        "THE CIVIC SCALE: COMMERCE, MOBILITY & URBAN SYSTEMS",
        "Infrastructure, Human Movement, and Large-Scale Architectural Identity",
        essay, index, 2, TOTAL_PAGES
    )
    
    # 3. 28 Project Sheets (Pages 03 to 30)
    v3_project_sheets = [
        # --- PROJECT 1: EAST TEHRAN STEEL COMPLEX (7 CONSECUTIVE SHEETS: PGS 03 - 09) ---
        (r'03_Commercial_and_Infrastructure\13_East_Tehran_Steel_Commercial_Complex\WhatsApp Image 2026-09-25 at 23.30.34.jpeg', "East Tehran Steel Commercial Campus", "Executive Commercial Record • Sheet 01 / 07", 3),
        (r'03_Commercial_and_Infrastructure\13_East_Tehran_Steel_Commercial_Complex\WhatsApp Image 2026-09-25 at 23.30.34 (1).jpeg', "East Tehran Steel Commercial Campus", "Executive Commercial Record • Sheet 02 / 07", 4),
        (r'03_Commercial_and_Infrastructure\13_East_Tehran_Steel_Commercial_Complex\WhatsApp Image 2026-09-25 at 23.30.34 (2).jpeg', "East Tehran Steel Commercial Campus", "Executive Commercial Record • Sheet 03 / 07", 5),
        (r'03_Commercial_and_Infrastructure\13_East_Tehran_Steel_Commercial_Complex\WhatsApp Image 2026-09-25 at 23.30.34 (3).jpeg', "East Tehran Steel Commercial Campus", "Executive Commercial Record • Sheet 04 / 07", 6),
        (r'03_Commercial_and_Infrastructure\13_East_Tehran_Steel_Commercial_Complex\WhatsApp Image 2026-09-25 at 23.30.34 (4).jpeg', "East Tehran Steel Commercial Campus", "Executive Commercial Record • Sheet 05 / 07", 7),
        (r'03_Commercial_and_Infrastructure\13_East_Tehran_Steel_Commercial_Complex\WhatsApp Image 2026-09-25 at 23.30.34 (5).jpeg', "East Tehran Steel Commercial Campus", "Executive Commercial Record • Sheet 06 / 07", 8),
        (r'03_Commercial_and_Infrastructure\13_East_Tehran_Steel_Commercial_Complex\WhatsApp Image 2026-09-25 at 23.30.34 (6).jpeg', "East Tehran Steel Commercial Campus", "Executive Commercial Record • Sheet 07 / 07", 9),
        
        # --- PROJECT 2: ERBIL DEPARTMENT STORE (5 CONSECUTIVE SHEETS: PGS 10 - 14) ---
        (r'03_Commercial_and_Infrastructure\14_Erbil_Department_Store\WhatsApp Image 2026-09-25 at 23.31.33.jpeg', "Erbil Department Store & Galleria", "Executive Retail Record • Sheet 01 / 05", 10),
        (r'03_Commercial_and_Infrastructure\14_Erbil_Department_Store\WhatsApp Image 2026-09-25 at 23.31.33 (1).jpeg', "Erbil Department Store & Galleria", "Executive Retail Record • Sheet 02 / 05", 11),
        (r'03_Commercial_and_Infrastructure\14_Erbil_Department_Store\WhatsApp Image 2026-09-25 at 23.31.33 (2).jpeg', "Erbil Department Store & Galleria", "Executive Retail Record • Sheet 03 / 05", 12),
        (r'03_Commercial_and_Infrastructure\14_Erbil_Department_Store\WhatsApp Image 2026-09-25 at 23.31.33 (3).jpeg', "Erbil Department Store & Galleria", "Executive Retail Record • Sheet 04 / 05", 13),
        (r'03_Commercial_and_Infrastructure\14_Erbil_Department_Store\WhatsApp Image 2026-09-25 at 23.31.33 (4).jpeg', "Erbil Department Store & Galleria", "Executive Retail Record • Sheet 05 / 05", 14),
        
        # --- PROJECT 3: HIGHWAY INFRASTRUCTURE (1 SHEET: PG 15) ---
        (r'03_Commercial_and_Infrastructure\15_Bridge_and_Highway_Infrastructure\WhatsApp Image 2026-09-25 at 23.26.51.jpeg', "Metropolitan Highway Interchange", "Civic Infrastructure Record • Sheet 01 / 01", 15),
        
        # --- PROJECT 4: ZARGANDEH RIVERSIDE URBAN MORPHOLOGY (5 CONSECUTIVE SHEETS: PGS 16 - 20) ---
        (r'05_Urban_Planning_and_Landscape\22_Zargandeh_Riverside_Urban_Morphology\WhatsApp Image 2026-09-25 at 23.53.04.jpeg', "Zargandeh Riverside Urban Morphology", "Urban Research & Planning • Sheet 01 / 05", 16),
        (r'05_Urban_Planning_and_Landscape\22_Zargandeh_Riverside_Urban_Morphology\WhatsApp Image 2026-09-25 at 23.53.04 (1).jpeg', "Zargandeh Riverside Urban Morphology", "Urban Research & Planning • Sheet 02 / 05", 17),
        (r'05_Urban_Planning_and_Landscape\22_Zargandeh_Riverside_Urban_Morphology\WhatsApp Image 2026-09-25 at 23.53.04 (2).jpeg', "Zargandeh Riverside Urban Morphology", "Urban Research & Planning • Sheet 03 / 05", 18),
        (r'05_Urban_Planning_and_Landscape\22_Zargandeh_Riverside_Urban_Morphology\WhatsApp Image 2026-09-25 at 23.53.04 (3).jpeg', "Zargandeh Riverside Urban Morphology", "Urban Research & Planning • Sheet 04 / 05", 19),
        (r'05_Urban_Planning_and_Landscape\22_Zargandeh_Riverside_Urban_Morphology\WhatsApp Image 2026-09-25 at 23.53.04 (4).jpeg', "Zargandeh Riverside Urban Morphology", "Urban Research & Planning • Sheet 05 / 05", 20),
        
        # --- PROJECT 5: HIGH-DENSITY URBAN MASTERPLAN (10 CONSECUTIVE SHEETS: PGS 21 - 30) ---
        (r'05_Urban_Planning_and_Landscape\23_Urban_Design_High_Density_Masterplan\WhatsApp Image 2026-09-25 at 23.53.05.jpeg', "High-Density Urban Masterplan", "Masterplan & Skyline Design • Sheet 01 / 10", 21),
        (r'05_Urban_Planning_and_Landscape\23_Urban_Design_High_Density_Masterplan\WhatsApp Image 2026-09-25 at 23.53.05 (1).jpeg', "High-Density Urban Masterplan", "Masterplan & Skyline Design • Sheet 02 / 10", 22),
        (r'05_Urban_Planning_and_Landscape\23_Urban_Design_High_Density_Masterplan\WhatsApp Image 2026-09-25 at 23.53.05 (2).jpeg', "High-Density Urban Masterplan", "Masterplan & Skyline Design • Sheet 03 / 10", 23),
        (r'05_Urban_Planning_and_Landscape\23_Urban_Design_High_Density_Masterplan\WhatsApp Image 2026-09-25 at 23.53.05 (3).jpeg', "High-Density Urban Masterplan", "Masterplan & Skyline Design • Sheet 04 / 10", 24),
        (r'05_Urban_Planning_and_Landscape\23_Urban_Design_High_Density_Masterplan\WhatsApp Image 2026-09-25 at 23.53.05 (4).jpeg', "High-Density Urban Masterplan", "Masterplan & Skyline Design • Sheet 05 / 10", 25),
        (r'05_Urban_Planning_and_Landscape\23_Urban_Design_High_Density_Masterplan\WhatsApp Image 2026-09-25 at 23.53.05 (5).jpeg', "High-Density Urban Masterplan", "Masterplan & Skyline Design • Sheet 06 / 10", 26),
        (r'05_Urban_Planning_and_Landscape\23_Urban_Design_High_Density_Masterplan\WhatsApp Image 2026-09-25 at 23.53.05 (6).jpeg', "High-Density Urban Masterplan", "Masterplan & Skyline Design • Sheet 07 / 10", 27),
        (r'05_Urban_Planning_and_Landscape\23_Urban_Design_High_Density_Masterplan\WhatsApp Image 2026-09-25 at 23.53.05 (7).jpeg', "High-Density Urban Masterplan", "Masterplan & Skyline Design • Sheet 08 / 10", 28),
        (r'05_Urban_Planning_and_Landscape\23_Urban_Design_High_Density_Masterplan\WhatsApp Image 2026-09-25 at 23.53.05 (8).jpeg', "High-Density Urban Masterplan", "Masterplan & Skyline Design • Sheet 09 / 10", 29),
        (r'05_Urban_Planning_and_Landscape\23_Urban_Design_High_Density_Masterplan\WhatsApp Image 2026-09-25 at 23.53.05 (9).jpeg', "High-Density Urban Masterplan", "Masterplan & Skyline Design • Sheet 10 / 10", 30),
    ]
    
    project_sheets = []
    for rel_path, proj_name, sheet_str, p_num in v3_project_sheets:
        full_path = os.path.join(BASE_IMG_DIR, rel_path)
        sh = create_minimalist_sheet(full_path, "Volume III: Commercial & Urban", proj_name, sheet_str, p_num, TOTAL_PAGES)
        project_sheets.append(sh)
        
    # 4. Leadership Profile (Page 31)
    leadership = create_leadership_sheet(VOL_TITLE, 31, TOTAL_PAGES)
    
    # 5. Back Cover & Verification Archive (Page 32)
    back_cov = create_landscape_back("VOLUME III: COMMERCIAL ARCHITECTURE & URBAN DESIGN", TOTAL_PAGES)
    
    all_pages = [cov, editorial] + project_sheets + [leadership, back_cov]
    compile_pdf(all_pages, pdf_out)
    
    # Clean output dir first so no stale halved files remain
    if os.path.exists(out_dir):
        for f in os.listdir(out_dir):
            if f.endswith('.jpg'):
                try:
                    os.remove(os.path.join(out_dir, f))
                except Exception:
                    pass

    # Save complete unbroken landscape pages for flipbook
    for i, p in enumerate(all_pages):
        page_file = os.path.join(out_dir, f"page_{i+1:02d}.jpg")
        p.save(page_file, "JPEG", quality=98, subsampling=0, optimize=True)
        
    print(f"Volume 3 Complete: {len(all_pages)} full landscape pages generated!")

if __name__ == '__main__':
    generate_volume_1()
    generate_volume_2()
    generate_volume_3()
    print("\nALL 3 MINIMALIST THEMATIC PORTFOLIOS GENERATED SUCCESSFULLY!")
