import os
import cv2
import numpy as np

def find_sub_images(img_path):
    img = cv2.imread(img_path)
    if img is None:
        return []
    h, w, _ = img.shape
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # If the sheet has white or near-white background:
    # Find non-white pixels:
    # A pixel is background if all channels > 248 or < 10 (black background)
    is_white_bg = np.sum(gray > 245) > (h * w * 0.15)
    is_black_bg = np.sum(gray < 15) > (h * w * 0.15)
    
    print(f"\n{os.path.basename(img_path)}: {w}x{h}, white_bg={is_white_bg}, black_bg={is_black_bg}")
    
    # Let's find contours of large photographic regions
    # Canny edges or thresholding
    if is_white_bg:
        mask = (gray < 240).astype(np.uint8) * 255
    elif is_black_bg:
        mask = (gray > 25).astype(np.uint8) * 255
    else:
        # Gradient/edge magnitude
        edges = cv2.Canny(gray, 30, 100)
        mask = cv2.dilate(edges, np.ones((5, 5), np.uint8), iterations=3)
    
    # Morphological close to merge image content
    kernel = np.ones((15, 15), np.uint8)
    closed = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    
    contours, _ = cv2.findContours(closed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    boxes = []
    min_area = (w * h) * 0.04 # At least 4% of sheet area
    for cnt in contours:
        x, y, bw, bh = cv2.boundingRect(cnt)
        area = bw * bh
        if area >= min_area and bw > w * 0.2 and bh > h * 0.1:
            boxes.append((x, y, bw, bh))
            print(f"  Found box: x={x}, y={y}, w={bw}, h={bh} ({bw}x{bh}, {area/(w*h)*100:.1f}%)")
    
    return boxes

sample_sheets = [
    r'C:\Users\Soheil\Pictures\Siavash_Categorized\01_Luxury_Villas\01_Concrete_Glass_Villa_Topography\WhatsApp Image 2026-09-25 at 22.54.36.jpeg',
    r'C:\Users\Soheil\Pictures\Siavash_Categorized\01_Luxury_Villas\06_Violet_Villa\WhatsApp Image 2026-09-25 at 23.29.58.jpeg',
    r'C:\Users\Soheil\Pictures\Siavash_Categorized\02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25 (1).jpeg',
    r'C:\Users\Soheil\Pictures\Siavash_Categorized\01_Luxury_Villas\03_Dalkhani_Forest_Villa_Organic\WhatsApp Image 2026-09-25 at 22.56.13.jpeg'
]

for s in sample_sheets:
    find_sub_images(s)
