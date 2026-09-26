import os
import cv2
import numpy as np

src_dir = r'C:\Users\Soheil\Pictures\Siavash'
files = [f for f in os.listdir(src_dir) if f.endswith(('.jpg', '.jpeg', '.png'))]

print(f"Total files: {len(files)}")

# Let's inspect some of the images to see whether they are presentation sheets (with borders/text/multi-panels) or single full-bleed architectural renders
sheet_count = 0
render_count = 0

for f in files[:30]:
    path = os.path.join(src_dir, f)
    img = cv2.imread(path)
    if img is None:
        continue
    h, w, _ = img.shape
    # Check edges and aspect ratio
    print(f"{f}: {w}x{h}, aspect={w/h:.2f}")

