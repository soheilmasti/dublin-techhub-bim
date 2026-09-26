import os
import cv2
import numpy as np

# Let's inspect a few sheets from Siavash_Categorized
sample_sheets = [
    r'C:\Users\Soheil\Pictures\Siavash_Categorized\01_Luxury_Villas\01_Concrete_Glass_Villa_Topography\WhatsApp Image 2026-09-25 at 22.54.36.jpeg',
    r'C:\Users\Soheil\Pictures\Siavash_Categorized\01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.29.58.jpeg',
    r'C:\Users\Soheil\Pictures\Siavash_Categorized\02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25 (1).jpeg',
    r'C:\Users\Soheil\Pictures\Siavash_Categorized\01_Luxury_Villas\03_Dalkhani_Forest_Villa_Organic\WhatsApp Image 2026-09-25 at 22.56.13.jpeg'
]

for s in sample_sheets:
    if not os.path.exists(s):
        print(f"Not found: {s}")
        continue
    img = cv2.imread(s)
    h, w, c = img.shape
    print(f"\n--- Analyzing: {os.path.basename(s)} ({w}x{h}) ---")
    
    # Check horizontal dividers / black or white dividing lines
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Calculate row variance or edge density
    row_diff = np.mean(np.abs(np.diff(gray.astype(float), axis=0)), axis=1)
    # Check horizontal projection
    h_proj = np.mean(gray, axis=1)
    print(f"Row mean intensity range: min={h_proj.min():.1f}, max={h_proj.max():.1f}")
