import os
import cv2
import numpy as np
import json

BASE_DIR = r"c:\Users\Soheil\Documents\Apply\Website Memari"
PROJECTS_DIR = os.path.join(BASE_DIR, "public", "projects")

def crop_sub_images(img_path, output_dir, file_prefix):
    os.makedirs(output_dir, exist_ok=True)
    img = cv2.imread(img_path)
    if img is None:
        return []
    
    h, w, _ = img.shape
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # 1. Background detection
    is_white_bg = np.sum(gray > 240) > (h * w * 0.10)
    is_black_bg = np.sum(gray < 15) > (h * w * 0.10)
    
    # 2. Thresholding for photographic content
    if is_white_bg:
        mask = (gray < 238).astype(np.uint8) * 255
    elif is_black_bg:
        mask = (gray > 20).astype(np.uint8) * 255
    else:
        edges = cv2.Canny(gray, 25, 80)
        mask = cv2.dilate(edges, np.ones((9, 9), np.uint8), iterations=3)
    
    # Morphological clean up
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (25, 25))
    closed = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    
    contours, _ = cv2.findContours(closed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    min_area = (w * h) * 0.05  # At least 5% of sheet
    min_w = int(w * 0.20)
    min_h = int(h * 0.10)
    
    crops = []
    
    for cnt in contours:
        x, y, bw, bh = cv2.boundingRect(cnt)
        if bw * bh >= min_area and bw >= min_w and bh >= min_h:
            sub_gray = gray[y:y+bh, x:x+bw]
            if is_white_bg:
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
    
    # Sort crops by area descending (largest first)
    crops.sort(key=lambda c: c[4], reverse=True)
    
    saved_files = []
    
    # If no significant sub-regions found, or the image is already single full-bleed render:
    if len(crops) == 0 or (len(crops) == 1 and crops[0][4] > (w * h * 0.82)):
        out_file = os.path.join(output_dir, f"{file_prefix}_render_01.jpg")
        cv2.imwrite(out_file, img, [cv2.IMWRITE_JPEG_QUALITY, 93])
        saved_files.append(out_file)
        return saved_files
        
    for i, (x1, y1, x2, y2, _) in enumerate(crops[:4]): # Keep top 4 crops per sheet
        cropped = img[y1:y2, x1:x2]
        out_file = os.path.join(output_dir, f"{file_prefix}_render_{i+1:02d}.jpg")
        cv2.imwrite(out_file, cropped, [cv2.IMWRITE_JPEG_QUALITY, 93])
        saved_files.append(out_file)
        
    return saved_files

def process_all_projects():
    total_renders = 0
    project_renders_map = {}
    
    categories = ['villas', 'apartments', 'commercial', 'interiors', 'urban', 'concepts']
    for cat in categories:
        cat_path = os.path.join(PROJECTS_DIR, cat)
        if not os.path.isdir(cat_path):
            continue
            
        for proj_folder in os.listdir(cat_path):
            proj_path = os.path.join(cat_path, proj_folder)
            if not os.path.isdir(proj_path):
                continue
                
            renders_out_dir = os.path.join(proj_path, "renders")
            os.makedirs(renders_out_dir, exist_ok=True)
            
            # Find all sheet files
            sheet_files = [f for f in os.listdir(proj_path) if f.startswith("sheet_") and f.endswith(".jpg")]
            sheet_files.sort()
            
            proj_renders = []
            for s_file in sheet_files:
                sheet_path = os.path.join(proj_path, s_file)
                sheet_stem = os.path.splitext(s_file)[0]
                extracted = crop_sub_images(sheet_path, renders_out_dir, sheet_stem)
                for ext_path in extracted:
                    web_rel = f"/projects/{cat}/{proj_folder}/renders/{os.path.basename(ext_path)}"
                    proj_renders.append(web_rel)
                    
            project_renders_map[proj_folder] = {
                "category": cat,
                "folder": proj_folder,
                "rendersCount": len(proj_renders),
                "renders": proj_renders,
                "coverRender": proj_renders[0] if proj_renders else None
            }
            total_renders += len(proj_renders)
            print(f"[{cat}] {proj_folder}: Extracted {len(proj_renders)} renders from {len(sheet_files)} sheets")
            
    # Save manifest
    manifest_path = os.path.join(BASE_DIR, "public", "project_renders_manifest.json")
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(project_renders_map, f, indent=2, ensure_ascii=False)
        
    print(f"\n==========================================")
    print(f"SUCCESS: Extracted a total of {total_renders} individual renders across {len(project_renders_map)} projects!")
    print(f"Manifest written to: {manifest_path}")

if __name__ == "__main__":
    process_all_projects()
