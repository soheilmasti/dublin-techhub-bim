import os
import re

obj_path = r"c:\Users\Soheil\Documents\Apply\Website Memari\public\models\tacoma\Tacoma_Neighborhood.obj"
mtl_path = r"c:\Users\Soheil\Documents\Apply\Website Memari\public\models\tacoma\Tacoma_Neighborhood.mtl"

print(">>> Analyzing Tacoma_Neighborhood OBJ and MTL...")

# Check MTL reference in OBJ
with open(obj_path, "r", encoding="utf-8", errors="ignore") as f:
    first_lines = [next(f) for _ in range(30)]

print("First 30 lines of OBJ:")
for line in first_lines:
    if line.startswith("mtllib") or line.startswith("o ") or line.startswith("g ") or line.startswith("usemtl"):
        print(" ", line.strip())

# Count objects / groups and calculate bounding boxes
objects = {}
current_obj = "Default"
min_x, max_x = float('inf'), float('-inf')
min_y, max_y = float('inf'), float('-inf')
min_z, max_z = float('inf'), float('-inf')

with open(obj_path, "r", encoding="utf-8", errors="ignore") as f:
    for line in f:
        if line.startswith("o ") or line.startswith("g "):
            current_obj = line.strip().split(maxsplit=1)[1] if len(line.strip().split(maxsplit=1)) > 1 else "Unnamed"
            if current_obj not in objects:
                objects[current_obj] = {"v_count": 0, "min": [float('inf')]*3, "max": [float('-inf')]*3}
        elif line.startswith("v "):
            parts = line.strip().split()
            if len(parts) >= 4:
                x, y, z = float(parts[1]), float(parts[2]), float(parts[3])
                min_x = min(min_x, x); max_x = max(max_x, x)
                min_y = min(min_y, y); max_y = max(max_y, y)
                min_z = min(min_z, z); max_z = max(max_z, z)
                if current_obj in objects:
                    obj_data = objects[current_obj]
                    obj_data["v_count"] += 1
                    obj_data["min"][0] = min(obj_data["min"][0], x)
                    obj_data["max"][0] = max(obj_data["max"][0], x)
                    obj_data["min"][1] = min(obj_data["min"][1], y)
                    obj_data["max"][1] = max(obj_data["max"][1], y)
                    obj_data["min"][2] = min(obj_data["min"][2], z)
                    obj_data["max"][2] = max(obj_data["max"][2], z)

print(f"\nTotal Overall Bounding Box:")
print(f"X: {min_x:.2f} to {max_x:.2f} (Width: {max_x - min_x:.2f})")
print(f"Y: {min_y:.2f} to {max_y:.2f} (Height: {max_y - min_y:.2f})")
print(f"Z: {min_z:.2f} to {max_z:.2f} (Depth: {max_z - min_z:.2f})")

print(f"\nFound {len(objects)} Groups/Objects in OBJ:")
sorted_objs = sorted(objects.items(), key=lambda item: item[1]["v_count"], reverse=True)
for name, data in sorted_objs[:25]:
    cx = (data['min'][0] + data['max'][0]) / 2 if data['v_count'] > 0 else 0
    cy = (data['min'][1] + data['max'][1]) / 2 if data['v_count'] > 0 else 0
    cz = (data['min'][2] + data['max'][2]) / 2 if data['v_count'] > 0 else 0
    dx = data['max'][0] - data['min'][0] if data['v_count'] > 0 else 0
    dy = data['max'][1] - data['min'][1] if data['v_count'] > 0 else 0
    dz = data['max'][2] - data['min'][2] if data['v_count'] > 0 else 0
    print(f"- '{name}': {data['v_count']:,} vertices | Center: ({cx:.1f}, {cy:.1f}, {cz:.1f}) | Size: ({dx:.1f} x {dy:.1f} x {dz:.1f})")
