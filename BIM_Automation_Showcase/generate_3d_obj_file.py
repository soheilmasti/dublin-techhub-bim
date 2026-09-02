#!/usr/bin/env python3
"""
================================================================================
DUBLIN TECH HUB - 3D CAD / BIM MODEL GENERATOR (.OBJ / .MTL EXPORTER)
Generates physical 3D geometry files for Revit, Rhino, AutoCAD & Windows 3D Viewer
================================================================================
"""

import os
import math

output_dir = os.path.dirname(os.path.abspath(__file__))
obj_file = os.path.join(output_dir, "Dublin_TechHub_LOD350.obj")
mtl_file = os.path.join(output_dir, "Dublin_TechHub_LOD350.mtl")

print(">>> Generating physical 3D CAD / BIM model: Dublin_TechHub_LOD350.obj ...")

vertices = []
normals = []
faces = []

def add_box(center_x, center_y, center_z, size_x, size_y, size_z, group_name, material_name):
    global vertices, faces
    hx, hy, hz = size_x / 2.0, size_y / 2.0, size_z / 2.0
    cx, cy, cz = center_x, center_y, center_z

    v_start = len(vertices) + 1

    # 8 corner vertices (Y is UP in standard 3D)
    box_verts = [
        (cx - hx, cy - hy, cz - hz),
        (cx + hx, cy - hy, cz - hz),
        (cx + hx, cy + hy, cz - hz),
        (cx - hx, cy + hy, cz - hz),
        (cx - hx, cy - hy, cz + hz),
        (cx + hx, cy - hy, cz + hz),
        (cx + hx, cy + hy, cz + hz),
        (cx - hx, cy + hy, cz + hz),
    ]
    vertices.extend(box_verts)

    # 6 quad faces (12 triangles)
    box_faces = [
        # Front
        (v_start + 4, v_start + 5, v_start + 6),
        (v_start + 4, v_start + 6, v_start + 7),
        # Back
        (v_start + 1, v_start + 0, v_start + 3),
        (v_start + 1, v_start + 3, v_start + 2),
        # Top
        (v_start + 3, v_start + 7, v_start + 6),
        (v_start + 3, v_start + 6, v_start + 2),
        # Bottom
        (v_start + 0, v_start + 1, v_start + 5),
        (v_start + 0, v_start + 5, v_start + 4),
        # Right
        (v_start + 1, v_start + 2, v_start + 6),
        (v_start + 1, v_start + 6, v_start + 5),
        # Left
        (v_start + 0, v_start + 4, v_start + 7),
        (v_start + 0, v_start + 7, v_start + 3),
    ]

    faces.append({"group": group_name, "material": material_name, "triangles": box_faces})

# 1. 7-STORY STRUCTURE & SLABS (Levels 0 to 6)
level_height = 3.6
floor_width_x = 32.0
floor_depth_z = 24.0

for lvl in range(7):
    elev_y = lvl * level_height
    # Concrete Slab (32m x 24m x 0.3m)
    add_box(0, elev_y, 0, floor_width_x, 0.3, floor_depth_z, f"Level_{lvl}_Structure", "Concrete_Slab")
    
    # Columns at 8m bays
    for x in [-16.0, -8.0, 0.0, 8.0, 16.0]:
        for z in [-12.0, -4.0, 4.0, 12.0]:
            add_box(x, elev_y + 1.8, z, 0.6, 3.3, 0.6, f"Level_{lvl}_Columns", "Concrete_Column")

# 2. FLOOR 3 & 4 ARCHITECTURE (Walls, Comms Room, Boardroom)
for lvl in [3, 4]:
    elev_y = lvl * level_height
    # Perimeter Glass Facade Panels
    add_box(0, elev_y + 1.8, 12.0, 31.8, 3.2, 0.1, f"Level_{lvl}_Facade", "Glass_Facade")
    add_box(0, elev_y + 1.8, -12.0, 31.8, 3.2, 0.1, f"Level_{lvl}_Facade", "Glass_Facade")
    add_box(16.0, elev_y + 1.8, 0, 0.1, 3.2, 23.8, f"Level_{lvl}_Facade", "Glass_Facade")
    add_box(-16.0, elev_y + 1.8, 0, 0.1, 3.2, 23.8, f"Level_{lvl}_Facade", "Glass_Facade")

    # Interior Acoustic Partition Walls (Comms Room & Meeting Rooms)
    add_box(-8.0, elev_y + 1.5, -6.0, 12.0, 3.0, 0.15, f"Level_{lvl}_Architecture", "Interior_Drywall")
    add_box(-2.0, elev_y + 1.5, -9.0, 0.15, 3.0, 6.0, f"Level_{lvl}_Architecture", "Interior_Drywall")

# 3. MEP: 42U MDF SERVER RACKS & INROW CRAC (Level 3 Comms Room)
lvl3_y = 3 * level_height
# 42U Heavy-Duty Server Rack (0.8m x 2.0m x 1.2m)
add_box(-9.0, lvl3_y + 1.15, -9.0, 0.8, 2.0, 1.2, "Level_3_ELV_MDF", "Server_Rack_42U")
# InRow Precision CRAC Cooling Unit (0.4m x 2.0m x 1.2m)
add_box(-7.8, lvl3_y + 1.15, -9.0, 0.4, 2.0, 1.2, "Level_3_HVAC_CRAC", "InRow_CRAC")
# FM-200 Clean Agent Gas Cylinders (0.6m x 1.6m x 0.6m)
add_box(-12.0, lvl3_y + 0.95, -9.0, 0.6, 1.6, 0.6, "Level_3_Fire_Gas", "FM200_Gas_Tank")

# 4. MEP: HVAC GALVANIZED STEEL DUCTWORK (Ceiling Void)
for lvl in [3, 4]:
    elev_y = lvl * level_height
    # Main Supply Duct (0.6m x 0.35m x 30m)
    add_box(0, elev_y + 3.0, 0, 30.0, 0.35, 0.6, f"Level_{lvl}_HVAC_Ducts", "HVAC_Galvanized_Duct")
    # Branch Ducts
    for bx in [-10.0, 0.0, 10.0]:
        add_box(bx, elev_y + 3.0, 5.0, 0.4, 0.3, 10.0, f"Level_{lvl}_HVAC_Ducts", "HVAC_Galvanized_Duct")

# 5. MEP: ELECTRICAL CABLE TRAYS (Perforated Steel)
for lvl in [3, 4]:
    elev_y = lvl * level_height
    add_box(0, elev_y + 2.7, -4.0, 30.0, 0.08, 0.4, f"Level_{lvl}_Electrical_Tray", "Cable_Tray_Steel")
    # Distribution Boards
    add_box(-14.0, elev_y + 1.5, -4.0, 0.2, 1.0, 0.8, f"Level_{lvl}_Electrical_Panels", "Electrical_Panel_DB")

# 6. MEP: FIRE SPRINKLER PIPE NETWORK
for lvl in [3, 4]:
    elev_y = lvl * level_height
    add_box(0, elev_y + 3.2, 7.0, 30.0, 0.08, 0.08, f"Level_{lvl}_Fire_Sprinklers", "Fire_Sprinkler_Pipe")

# 7. ELV: 4MP CCTV CAMERAS WITH FOV VISION CONES
add_box(-14.0, lvl3_y + 2.6, 10.0, 0.3, 0.3, 0.3, "Level_3_CCTV", "CCTV_Camera_Body")
add_box(0.0, lvl3_y + 2.6, 2.0, 0.3, 0.3, 0.3, "Level_3_CCTV", "CCTV_Camera_Body")
add_box(-9.0, lvl3_y + 2.6, -6.5, 0.3, 0.3, 0.3, "Level_3_CCTV", "CCTV_Camera_Body")

# WRITE MTL FILE (Materials)
with open(mtl_file, "w") as f:
    f.write("# Dublin Tech Hub LOD 350 Materials\n")
    f.write("newmtl Concrete_Slab\nKd 0.82 0.84 0.88\n\n")
    f.write("newmtl Concrete_Column\nKd 0.45 0.48 0.52\n\n")
    f.write("newmtl Glass_Facade\nKd 0.2 0.6 0.9\nd 0.35\n\n")
    f.write("newmtl Interior_Drywall\nKd 0.7 0.72 0.75\n\n")
    f.write("newmtl Server_Rack_42U\nKd 0.05 0.08 0.15\n\n")
    f.write("newmtl InRow_CRAC\nKd 0.02 0.45 0.75\n\n")
    f.write("newmtl FM200_Gas_Tank\nKd 0.85 0.1 0.1\n\n")
    f.write("newmtl HVAC_Galvanized_Duct\nKd 0.1 0.5 0.8\n\n")
    f.write("newmtl Cable_Tray_Steel\nKd 0.65 0.68 0.72\n\n")
    f.write("newmtl Electrical_Panel_DB\nKd 0.9 0.4 0.05\n\n")
    f.write("newmtl Fire_Sprinkler_Pipe\nKd 0.9 0.15 0.15\n\n")
    f.write("newmtl CCTV_Camera_Body\nKd 0.1 0.15 0.25\n\n")

# WRITE OBJ FILE (Geometry)
with open(obj_file, "w") as f:
    f.write(f"# Dublin Tech Hub 7-Story Commercial Tower (LOD 350 / 400)\n")
    f.write(f"mtllib Dublin_TechHub_LOD350.mtl\n\n")

    for v in vertices:
        f.write(f"v {v[0]:.4f} {v[1]:.4f} {v[2]:.4f}\n")

    f.write("\n")

    for group in faces:
        f.write(f"g {group['group']}\n")
        f.write(f"usemtl {group['material']}\n")
        for tri in group["triangles"]:
            f.write(f"f {tri[0]} {tri[1]} {tri[2]}\n")

print(f"[SUCCESS] Physical 3D CAD/BIM File generated at: {obj_file}")
print(f"[METRICS] Total Vertices: {len(vertices):,} | Total Triangles: {sum(len(g['triangles']) for g in faces):,}")
