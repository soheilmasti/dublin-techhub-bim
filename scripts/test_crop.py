import os
import cv2
import numpy as np

def crop_sub_images(img_path, output_dir, prefix="render"):
    os.makedirs(output_dir, exist_ok=True)
    img = cv2.imread(img_path)
    if img is None:
        return []
    
    h, w, _ = img.shape
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # 1. Background detection
    is_white_bg = np.sum(gray > 240) > (h * w * 0.12)
    is_black_bg = np.sum(gray < 15) > (h * w * 0.12)
    
    # 2. Thresholding for photographic content
    if is_white_bg:
        # Non-white
        mask = (gray < 238).astype(np.uint8) * 255
    elif is_black_bg:
        # Non-black
        mask = (gray > 20).astype(np.uint8) * 255
    else:
        # Edge density based mask
        edges = cv2.Canny(gray, 20, 80)
        mask = cv2.dilate(edges, np.ones((9, 9), np.uint8), iterations=3)
    
    # Morphological clean up - close gaps inside image
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (25, 25))
    closed = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    
    # Find external contours
    contours, _ = cv2.findContours(closed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    min_area = (w * h) * 0.05  # At least 5% of sheet
    min_w = int(w * 0.22)
    min_h = int(h * 0.12)
    
    saved_paths = []
    crops = []
    
    for cnt in contours:
        x, y, bw, bh = cv2.boundingRect(cnt)
        if bw * bh >= min_area and bw >= min_w and bh >= min_h:
            # Let's refine the bounding box to avoid white margins
            sub_gray = gray[y:y+bh, x:x+bw]
            if is_white_bg:
                # Row and col trims
                row_mask = np.mean(sub_gray, axis=1) < 245
                col_mask = np.mean(sub_gray, axis=0) < 245
                if np.any(row_mask) and np.any(col_mask):
                    r_idx = np.where(row_mask)[0]
                    c_idx = np.where(col_mask)[0]
                    y1, y2 = y + r_idx[0], y + r_idx[-1] + 1
                    x1, x2 = x + c_idx[0], x + c_idx[-1] + 1
                else:
                    x1, y1, x2, y2 = x, y, x + bw, y + bh
            else:
                x1, y1, x2, y2 = x, y, x + bw, y + bh
                
            crop_w = x2 - x1
            crop_h = y2 - y1
            if crop_w >= min_w and crop_h >= min_h:
                crops.append((x1, y1, x2, y2, crop_w * crop_h))
    
    # Sort crops by area descending (largest renders first)
    crops.sort(key=lambda c: c[4], reverse=True)
    
    # If no sub-images found or the sheet is already a single full-bleed render
    if len(crops) == 0 or (len(crops) == 1 and crops[0][4] > (w * h * 0.85)):
        # The sheet itself is already a full photo/render
        out_file = os.path.join(output_dir, f"{prefix}_01.jpg")
        cv2.imwrite(out_file, img, [cv2.IMWRITE_JPEG_QUALITY, 94])
        return [out_file]
        
    for i, (x1, y1, x2, y2, _) in enumerate(crops):
        cropped = img[y1:y2, x1:x2]
        out_file = os.path.join(output_dir, f"{prefix}_{i+1:02d}.jpg")
        cv2.imwrite(out_file, cropped, [cv2.IMWRITE_JPEG_QUALITY, 94])
        saved_paths.append(out_file)
        print(f"  Cropped: {os.path.basename(out_file)} ({x2-x1}x{y2-y1})")
        
    return saved_paths

# Test on Darrous
test_sheet = r'C:\Users\Soheil\Pictures\Siavash_Categorized\02_Residential_Buildings_Facades\09_Darrous_Residential_Facade_2020\WhatsApp Image 2026-09-25 at 23.28.25 (1).jpeg'
test_out = r'public\projects\apartments\darrous-residential-facade\renders'
print(f"Testing on {test_sheet}...")
res = crop_sub_images(test_sheet, test_out, prefix="darrous_render")
print(f"Result files: {res}")
