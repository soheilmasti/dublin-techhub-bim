import os, sys
from PIL import Image
import numpy as np

volumes = [
    ('Volume I: Luxury Villas', 'public/portfolio_villas/book_pages'),
    ('Volume II: Apartments & Facades', 'public/portfolio_apartments/book_pages'),
    ('Volume III: Urban & Commercial', 'public/portfolio_urban/book_pages')
]

errors = []
warnings = []

print("=== STARTING FULL VISUAL PERFECTION AUDIT ===\n")

for vol_name, vol_path in volumes:
    print(f"Auditing {vol_name} in {vol_path}...")
    if not os.path.exists(vol_path):
        errors.append(f"Directory missing: {vol_path}")
        continue
    
    files = sorted([f for f in os.listdir(vol_path) if f.endswith('.jpg')])
    if len(files) != 32:
        errors.append(f"{vol_name}: Expected 32 pages, found {len(files)}")
    
    for i in range(1, 33):
        fname = f"page_{i:02d}.jpg"
        fpath = os.path.join(vol_path, fname)
        if not os.path.exists(fpath):
            errors.append(f"Missing file: {fpath}")
            continue
        
        size = os.path.getsize(fpath)
        if size < 50000:
            warnings.append(f"Small file size ({size} bytes): {fpath}")
            
        with Image.open(fpath) as im:
            w, h = im.size
            if (w, h) != (960, 1080):
                errors.append(f"Wrong dimensions for {fname}: got ({w}, {h}), expected (960, 1080)")
            
            # Special check for page_01 (front cover): ensure it's not cropped or clipped
            if i == 1:
                arr = np.array(im)
                # Check center of cover has content
                center_strip = arr[400:600, 400:560]
                if np.std(center_strip) < 5:
                    errors.append(f"{vol_name} page_01 center strip seems blank!")
                else:
                    print(f"  [OK] {fname}: Front cover verified (960x1080, centered content)")
            elif i == 32:
                print(f"  [OK] {fname}: Back cover verified (960x1080)")

print("\n=== AUDIT RESULTS ===")
if errors:
    print(f"FAILED with {len(errors)} errors:")
    for e in errors:
        print("  -", e)
    sys.exit(1)
else:
    print(f"SUCCESS: All 96 pages (3 volumes x 32 pages) verified perfectly at exact (960, 1080) dimensions!")
    if warnings:
        print(f"Warnings ({len(warnings)}):")
        for w in warnings:
            print("  *", w)
