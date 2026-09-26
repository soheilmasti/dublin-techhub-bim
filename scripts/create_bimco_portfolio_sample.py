import os
import glob
from PIL import Image, ImageDraw, ImageFont
import fitz # PyMuPDF

TARGET_W = 1920
TARGET_H = 1080

PUBLIC_DIR = r'c:\Users\Soheil\Documents\Apply\Website Memari\public'
SAMPLE_DIR = os.path.join(PUBLIC_DIR, 'portfolio_sample')
os.makedirs(SAMPLE_DIR, exist_ok=True)

LOGO_PATH = os.path.join(PUBLIC_DIR, 'logo.png')
FONT_BOLD = r'C:\Windows\Fonts\segoeui.ttf'
FONT_REGULAR = r'C:\Windows\Fonts\segoeui.ttf'

def get_font(size, bold=False):
    font_file = r'C:\Windows\Fonts\segoeuib.ttf' if bold else r'C:\Windows\Fonts\segoeui.ttf'
    if not os.path.exists(font_file):
        font_file = r'C:\Windows\Fonts\arialbd.ttf' if bold else r'C:\Windows\Fonts\arial.ttf'
    return ImageFont.truetype(font_file, size)

logo_img = Image.open(LOGO_PATH).convert('RGBA')

pages = []

# --- PAGE 1: COVER ---
def create_cover():
    im = Image.new('RGB', (TARGET_W, TARGET_H), (15, 20, 24)) # Deep architectural slate
    draw = ImageDraw.Draw(im)
    
    # Subtle geometric border
    draw.rectangle([50, 50, TARGET_W - 50, TARGET_H - 50], outline=(45, 60, 68), width=1)
    draw.rectangle([55, 55, TARGET_W - 55, TARGET_H - 55], outline=(30, 40, 46), width=1)
    
    # BIMCO Logo
    l_size = 280
    logo_resized = logo_img.resize((l_size, l_size), Image.Resampling.LANCZOS)
    im.paste(logo_resized, ((TARGET_W - l_size) // 2, 170), logo_resized)
    
    # Typography
    f_brand = get_font(52, bold=True)
    f_sub = get_font(24, bold=True)
    f_desc = get_font(18, bold=False)
    f_team = get_font(20, bold=True)
    f_loc = get_font(15, bold=False)
    
    # Brand title
    draw.text((TARGET_W // 2, 490), "B I M C O", fill=(255, 255, 255), font=f_brand, anchor="mm")
    draw.text((TARGET_W // 2, 550), "ARCHITECTURE & ENGINEERING SOLUTIONS", fill=(194, 125, 83), font=f_sub, anchor="mm")
    
    # Line divider
    draw.line([(TARGET_W // 2 - 180, 585), (TARGET_W // 2 + 180, 585)], fill=(60, 85, 95), width=2)
    
    # Portfolio Title
    draw.text((TARGET_W // 2, 630), "COLLABORATIVE ARCHITECTURAL & BIM PORTFOLIO", fill=(230, 235, 240), font=get_font(22, bold=True), anchor="mm")
    draw.text((TARGET_W // 2, 670), "Luxury Residential • Commercial Complexes • Interior Architecture • Urban Masterplanning", fill=(140, 160, 170), font=f_desc, anchor="mm")
    
    # Project Leads box
    box_w, box_h = 750, 110
    bx = (TARGET_W - box_w) // 2
    by = 750
    draw.rectangle([bx, by, bx + box_w, by + box_h], fill=(22, 30, 36), outline=(50, 70, 80), width=1)
    
    draw.text((TARGET_W // 2, by + 30), "PRINCIPALS & PROJECT DIRECTORS", fill=(194, 125, 83), font=get_font(14, bold=True), anchor="mm")
    draw.text((TARGET_W // 2, by + 65), "SOHEIL MASTI   &   SIAVASH PAZOOKI", fill=(255, 255, 255), font=f_team, anchor="mm")
    draw.text((TARGET_W // 2, by + 92), "BIM Director & Computational Architect  |  Senior Architectural Designer & Visualizer", fill=(130, 150, 160), font=get_font(13), anchor="mm")
    
    # Footer
    draw.text((TARGET_W // 2, TARGET_H - 85), "DUBLIN  •  TEHRAN  •  INTERNATIONAL PROJECTS  |  EDITION 2026", fill=(100, 120, 130), font=f_loc, anchor="mm")
    return im

# --- PAGE 2: EXECUTIVE STATEMENT & TEAM ---
def create_statement():
    im = Image.new('RGB', (TARGET_W, TARGET_H), (20, 26, 32))
    draw = ImageDraw.Draw(im)
    draw.rectangle([50, 50, TARGET_W - 50, TARGET_H - 50], outline=(40, 55, 65), width=1)
    
    # Small header logo
    sm_logo = logo_img.resize((60, 60), Image.Resampling.LANCZOS)
    im.paste(sm_logo, (80, 75), sm_logo)
    draw.text((155, 95), "BIMCO STUDIO", fill=(255, 255, 255), font=get_font(20, bold=True), anchor="lm")
    draw.text((155, 120), "Collaborative Architecture, Engineering & BIM Systems", fill=(194, 125, 83), font=get_font(13), anchor="lm")
    
    draw.line([(80, 155), (TARGET_W - 80, 155)], fill=(45, 60, 70), width=1)
    
    # Title
    draw.text((80, 210), "EXECUTIVE STATEMENT & COLLABORATIVE VISION", fill=(255, 255, 255), font=get_font(28, bold=True))
    
    # Content left & right columns
    statement_text = (
        "BIMCO represents the seamless convergence of innovative architectural design, rigorous BIM coordination,\n"
        "and meticulous executive execution. Through an integrated partnership between Soheil Masti and Siavash Pazooki,\n"
        "our multidisciplinary studio delivers comprehensive design solutions spanning luxury private villas,\n"
        "high-density commercial developments, precision-crafted interior architecture, and urban masterplanning."
    )
    y = 280
    for line in statement_text.split('\n'):
        draw.text((80, y), line, fill=(200, 215, 225), font=get_font(18))
        y += 32
        
    # Pillars
    pillars = [
        ("01 / ARCHITECTURAL CONCEPT & DESIGN", "Visionary aesthetic concepts tailored to site topography, climate, and modern functional luxury."),
        ("02 / BIM AUDIT & LOD 350 COORDINATION", "Complete parametric BIM models, clash detection, multi-trade MEP coordination, and quantity takeoffs."),
        ("03 / INTERIOR ARCHITECTURE & MILLWORK", "Bespoke joinery, lighting calculations, material specifications, and turnkey executive shop drawings."),
        ("04 / SITE SUPERVISION & BUILD INTEGRITY", "Bridging the gap between 3D design and actual construction through rigorous on-site quality control.")
    ]
    py = 440
    for title, desc in pillars:
        draw.rectangle([80, py, 920, py + 85], fill=(26, 35, 44), outline=(50, 70, 85), width=1)
        draw.text((105, py + 26), title, fill=(194, 125, 83), font=get_font(14, bold=True))
        draw.text((105, py + 55), desc, fill=(170, 185, 195), font=get_font(12))
        py += 100

    # Right side: Collaborative Leadership Profiles
    # Soheil Masti Box
    draw.rectangle([980, 280, TARGET_W - 80, 480], fill=(24, 32, 40), outline=(55, 75, 90), width=1)
    draw.text((1010, 315), "SOHEIL MASTI", fill=(255, 255, 255), font=get_font(20, bold=True))
    draw.text((1010, 345), "BIM Director & Computational Architecture Specialist", fill=(194, 125, 83), font=get_font(14, bold=True))
    soheil_desc = (
        "• Strategic BIM implementation & quality audits across LOD 300-400\n"
        "• Lead computational design, workflow automation & Revit systems\n"
        "• International project delivery across Ireland, Europe & Middle East\n"
        "• Multidisciplinary team management & digital construction integration"
    )
    sy = 375
    for l in soheil_desc.split('\n'):
        draw.text((1010, sy), l, fill=(175, 190, 200), font=get_font(13))
        sy += 24

    # Siavash Pazooki Box
    draw.rectangle([980, 510, TARGET_W - 80, 710], fill=(24, 32, 40), outline=(55, 75, 90), width=1)
    draw.text((1010, 545), "SIAVASH PAZOOKI", fill=(255, 255, 255), font=get_font(20, bold=True))
    draw.text((1010, 575), "Senior Architectural Designer & High-End 3D Visualizer", fill=(194, 125, 83), font=get_font(14, bold=True))
    siavash_desc = (
        "• M.Arch & B.Arch | 8+ years leading architectural concept development\n"
        "• Expert in luxury villas, residential facades, retail & hospitality\n"
        "• Photorealistic visualization (3ds Max, Corona, V-Ray, Unreal Engine)\n"
        "• Complete construction documentation, millwork detailing & site oversight"
    )
    sy = 605
    for l in siavash_desc.split('\n'):
        draw.text((1010, sy), l, fill=(175, 190, 200), font=get_font(13))
        sy += 24
        
    # Footer
    draw.line([(80, TARGET_H - 120), (TARGET_W - 80, TARGET_H - 120)], fill=(45, 60, 70), width=1)
    draw.text((80, TARGET_H - 85), "BIMCO STUDIO | PORTFOLIO INTRODUCTION", fill=(120, 140, 150), font=get_font(14))
    draw.text((TARGET_W - 80, TARGET_H - 85), "PAGE 02 / 12", fill=(120, 140, 150), font=get_font(14, bold=True), anchor="ra")
    return im

# Helper to place spread image with BIMCO frame
def create_project_page(spread_img_path, project_title, category_name, page_num):
    im = Image.new('RGB', (TARGET_W, TARGET_H), (248, 249, 250)) # Crisp architectural white/light
    draw = ImageDraw.Draw(im)
    
    # Top header bar
    draw.rectangle([0, 0, TARGET_W, 70], fill=(20, 26, 32))
    
    # Header logo & titles
    sm_logo = logo_img.resize((48, 48), Image.Resampling.LANCZOS)
    im.paste(sm_logo, (40, 11), sm_logo)
    
    draw.text((100, 35), "BIMCO ARCHITECTURAL STUDIO", fill=(255, 255, 255), font=get_font(16, bold=True), anchor="lm")
    draw.text((430, 35), f"|   {category_name.upper()}   |   {project_title.upper()}", fill=(194, 125, 83), font=get_font(13, bold=True), anchor="lm")
    draw.text((TARGET_W - 50, 35), "SOHEIL MASTI  •  SIAVASH PAZOOKI", fill=(160, 180, 190), font=get_font(13), anchor="rm")
    
    # Main content area: 70px to TARGET_H - 50px
    avail_w = TARGET_W - 80
    avail_h = TARGET_H - 70 - 50
    
    with Image.open(spread_img_path) as sp:
        sp_rgb = sp.convert('RGB')
        # Scale to fit
        scale = min(avail_w / sp_rgb.width, avail_h / sp_rgb.height)
        new_w = int(sp_rgb.width * scale)
        new_h = int(sp_rgb.height * scale)
        sp_resized = sp_rgb.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        pos_x = (TARGET_W - new_w) // 2
        pos_y = 70 + (avail_h - new_h) // 2
        
        # Soft shadow behind image
        draw.rectangle([pos_x - 3, pos_y - 3, pos_x + new_w + 3, pos_y + new_h + 3], fill=(225, 228, 230))
        im.paste(sp_resized, (pos_x, pos_y))
        
    # Footer bar
    draw.line([(40, TARGET_H - 45), (TARGET_W - 40, TARGET_H - 45)], fill=(210, 215, 220), width=1)
    draw.text((40, TARGET_H - 25), "BIMCO STUDIO  •  ARCHITECTURE • BIM LOD 350 • INTERIORS", fill=(110, 125, 135), font=get_font(12), anchor="lm")
    draw.text((TARGET_W // 2, TARGET_H - 25), f"{project_title}", fill=(50, 60, 70), font=get_font(12, bold=True), anchor="mm")
    draw.text((TARGET_W - 40, TARGET_H - 25), f"PAGE {page_num:02d} / 12", fill=(110, 125, 135), font=get_font(12, bold=True), anchor="rm")
    
    return im

# --- PAGE 12: BACK COVER ---
def create_back_cover():
    im = Image.new('RGB', (TARGET_W, TARGET_H), (15, 20, 24))
    draw = ImageDraw.Draw(im)
    draw.rectangle([50, 50, TARGET_W - 50, TARGET_H - 50], outline=(45, 60, 68), width=1)
    
    l_size = 180
    logo_resized = logo_img.resize((l_size, l_size), Image.Resampling.LANCZOS)
    im.paste(logo_resized, ((TARGET_W - l_size) // 2, 240), logo_resized)
    
    draw.text((TARGET_W // 2, 470), "B I M C O", fill=(255, 255, 255), font=get_font(42, bold=True), anchor="mm")
    draw.text((TARGET_W // 2, 520), "INTEGRATED ARCHITECTURAL & BIM EXCELLENCE", fill=(194, 125, 83), font=get_font(20, bold=True), anchor="mm")
    draw.line([(TARGET_W // 2 - 140, 555), (TARGET_W // 2 + 140, 555)], fill=(55, 75, 85), width=2)
    
    # Contact info
    contacts = [
        "Website: www.bimco.ir   |   Client Portal & 3D Interactive Hub",
        "Principals: Soheil Masti & Siavash Pazooki",
        "Locations: Dublin, Ireland  •  Tehran, Iran",
        "Services: Architectural Design  •  BIM LOD 350 Coordination  •  High-End CGI  •  Site Supervision"
    ]
    cy = 600
    for c in contacts:
        draw.text((TARGET_W // 2, cy), c, fill=(180, 200, 210), font=get_font(16), anchor="mm")
        cy += 38
        
    draw.text((TARGET_W // 2, TARGET_H - 100), "© 2026 BIMCO STUDIO. ALL RIGHTS RESERVED.", fill=(90, 110, 120), font=get_font(13), anchor="mm")
    return im

# BUILD PAGES LIST
print("Building cover...")
pages.append(create_cover())

print("Building statement...")
pages.append(create_statement())

# Curation of prime spreads from Siavash folder
project_items = [
    (
        r'C:\Users\Soheil\Pictures\Siavash_Categorized\01_Luxury_Villas\03_Dalkhani_Forest_Villa_Organic\WhatsApp Image 2026-09-25 at 23.26.18 (6).jpeg',
        "Dalkhani Forest Villa (Organic Architecture & Topography)",
        "Luxury Villas & Private Residences"
    ),
    (
        r'C:\Users\Soheil\Pictures\Siavash_Categorized\01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.29.58.jpeg',
        "Violet Luxury Villa (Site Plan & Architectural Renders)",
        "Luxury Villas & Private Residences"
    ),
    (
        r'C:\Users\Soheil\Pictures\Siavash_Categorized\01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.29.59 (1).jpeg',
        "Violet Villa (Floor Plans, Daylight & Construction Progress)",
        "Luxury Villas & Executive Supervision"
    ),
    (
        r'C:\Users\Soheil\Pictures\Siavash_Categorized\02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25 (5).jpeg',
        "Darrous Luxury Residential Facade Design (Details & Execution)",
        "Residential & Facade Engineering"
    ),
    (
        r'C:\Users\Soheil\Pictures\Siavash_Categorized\02_Residential_Buildings_Facades\10_Residential_Dalkhani_Terraces\WhatsApp Image 2026-09-25 at 23.29.09.jpeg',
        "Dalkhani Terraced Mountain Residential Project",
        "Residential Architecture"
    ),
    (
        r'C:\Users\Soheil\Pictures\Siavash_Categorized\03_Commercial_and_Infrastructure\13_East_Tehran_Steel_Commercial_Complex\WhatsApp Image 2026-09-25 at 23.30.34 (6).jpeg',
        "East Tehran Steel Complex (Commercial Showroom, Bank & Logistics)",
        "Commercial & Infrastructure"
    ),
    (
        r'C:\Users\Soheil\Pictures\Siavash_Categorized\03_Commercial_and_Infrastructure\14_Erbil_Department_Store\WhatsApp Image 2026-09-25 at 23.31.33 (4).jpeg',
        "Erbil Department Store & Shopping Center (Organic Facade)",
        "Commercial & Retail Architecture"
    ),
    (
        r'C:\Users\Soheil\Pictures\Siavash_Categorized\04_Interior_Architecture\16_Kitchen_Design_and_Appliances\WhatsApp Image 2026-09-25 at 23.32.32 (3).jpeg',
        "High-End Kitchen Design, Joinery Elevations & Smeg Specifications",
        "Interior Architecture & Millwork"
    ),
    (
        r'C:\Users\Soheil\Pictures\Siavash_Categorized\05_Urban_Planning_and_Landscape\20_Diamond_Villa_Town_Masterplan\WhatsApp Image 2026-09-25 at 23.28.07 (2).jpeg',
        "Diamond Villa Town Masterplan & Riverside Development",
        "Urban Planning & Masterplanning"
    )
]

for idx, (img_path, title, cat) in enumerate(project_items, start=3):
    print(f"Building page {idx}: {title}...")
    pages.append(create_project_page(img_path, title, cat, idx))

print("Building back cover...")
pages.append(create_back_cover())

# Save images to public/portfolio_sample for Flipbook web viewer
print(f"Saving {len(pages)} page images to {SAMPLE_DIR}...")
for i, page_img in enumerate(pages):
    out_img = os.path.join(SAMPLE_DIR, f"page_{i+1:02d}.jpg")
    page_img.save(out_img, quality=90)

# Compile into PDF
pdf_path = os.path.join(PUBLIC_DIR, "BIMCO_Architectural_Portfolio_Sample.pdf")
print(f"Compiling PDF into {pdf_path}...")
pdf_doc = fitz.open()

for page_img in pages:
    temp_img_path = os.path.join(SAMPLE_DIR, "_temp.jpg")
    page_img.save(temp_img_path, quality=92)
    
    img_doc = fitz.open(temp_img_path)
    rect = fitz.Rect(0, 0, TARGET_W, TARGET_H)
    pdf_page = pdf_doc.new_page(width=TARGET_W, height=TARGET_H)
    pdf_page.insert_image(rect, filename=temp_img_path)
    img_doc.close()
    
if os.path.exists(temp_img_path):
    os.remove(temp_img_path)

pdf_doc.save(pdf_path)
pdf_doc.close()

print(f"SUCCESS! BIMCO Portfolio PDF generated: {pdf_path} (Pages: {len(pages)})")
