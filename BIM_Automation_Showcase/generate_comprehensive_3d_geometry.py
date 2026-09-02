#!/usr/bin/env python3
"""
================================================================================
DUBLIN TECH HUB - HIGH-DENSITY 3D CAD/OBJ & DXF GEOMETRY GENERATOR (LOD 350/400)
================================================================================
"""

import os

output_dir = os.path.dirname(os.path.abspath(__file__))
obj_file = os.path.join(output_dir, "Dublin_TechHub_LOD350.obj")
mtl_file = os.path.join(output_dir, "Dublin_TechHub_LOD350.mtl")
dxf_file = os.path.join(output_dir, "Dublin_TechHub_LOD350.dxf")

print(">>> Generating comprehensive 3D geometry across all formats...")

vertices = []
faces = []

def add_box(cx, cy, cz, sx, sy, sz, group_name, material_name):
    global vertices, faces
    hx, hy, hz = sx / 2.0, sy / 2.0, sz / 2.0
    v_start = len(vertices) + 1

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

    box_faces = [
        (v_start + 4, v_start + 5, v_start + 6), (v_start + 4, v_start + 6, v_start + 7),
        (v_start + 1, v_start + 0, v_start + 3), (v_start + 1, v_start + 3, v_start + 2),
        (v_start + 3, v_start + 7, v_start + 6), (v_start + 3, v_start + 6, v_start + 2),
        (v_start + 0, v_start + 1, v_start + 5), (v_start + 0, v_start + 5, v_start + 4),
        (v_start + 1, v_start + 2, v_start + 6), (v_start + 1, v_start + 6, v_start + 5),
        (v_start + 0, v_start + 4, v_start + 7), (v_start + 0, v_start + 7, v_start + 3),
    ]
    faces.append({"group": group_name, "material": material_name, "triangles": box_faces})

level_height = 3.8

# 1. 7-Story Slabs, Columns & Cores
for lvl in range(7):
    elev_y = lvl * level_height
    # Slab (34m x 24m)
    add_box(0, elev_y, 0, 34.0, 0.35, 24.0, f"Level_{lvl}_Structure", "Concrete_Slab")
    # Core Shear Walls
    add_box(0, elev_y + 1.9, -3.0, 6.0, 3.45, 0.25, f"Level_{lvl}_Core", "Concrete_Column")
    add_box(0, elev_y + 1.9, 3.0, 6.0, 3.45, 0.25, f"Level_{lvl}_Core", "Concrete_Column")
    # Columns (24 per floor)
    for cx in [-15.0, -9.0, -3.0, 3.0, 9.0, 15.0]:
        for cz in [-10.0, -3.5, 3.5, 10.0]:
            add_box(cx, elev_y + 1.9, cz, 0.6, 3.45, 0.6, f"Level_{lvl}_Columns", "Concrete_Column")
    # Facade Mullions
    for mx in range(-16, 17, 2):
        add_box(mx, elev_y + 1.9, 12.0, 0.1, 3.45, 0.15, f"Level_{lvl}_Facade", "Aluminum_Mullion")
        add_box(mx, elev_y + 1.9, -12.0, 0.1, 3.45, 0.15, f"Level_{lvl}_Facade", "Aluminum_Mullion")

# 2. Floors 3 & 4 Fit-Out
for lvl in [3, 4]:
    elev_y = lvl * level_height
    # Comms Room Acoustic Drywalls
    add_box(-9.0, elev_y + 1.6, -9.0, 8.0, 3.2, 0.15, f"Level_{lvl}_Architecture", "Interior_Drywall")
    add_box(-5.0, elev_y + 1.6, -6.0, 0.15, 3.2, 6.0, f"Level_{lvl}_Architecture", "Interior_Drywall")
    # Boardroom Glass Partition
    add_box(8.0, elev_y + 1.5, 6.0, 10.0, 3.0, 0.1, f"Level_{lvl}_Architecture", "Glass_Facade")
    # Workstations (Desks & Chairs)
    for wx in [-12.0, -8.0, 6.0, 10.0]:
        for wz in [-6.0, -2.0, 2.0, 6.0]:
            add_box(wx, elev_y + 0.38, wz, 1.6, 0.75, 1.2, f"Level_{lvl}_Furniture", "Furniture_Wood")
            add_box(wx, elev_y + 0.95, wz - 0.3, 0.6, 0.4, 0.05, f"Level_{lvl}_Furniture", "Monitor_Screen")
            add_box(wx, elev_y + 0.45, wz + 0.6, 0.5, 0.9, 0.5, f"Level_{lvl}_Furniture", "Mesh_Chair")

    # Boardroom Table & Display
    add_box(8.0, elev_y + 0.38, 6.0, 4.8, 0.76, 1.6, f"Level_{lvl}_Furniture", "Furniture_Wood")
    add_box(8.0, elev_y + 1.8, 11.8, 2.2, 1.2, 0.08, f"Level_{lvl}_Furniture", "Monitor_Screen")

    # Overhead HVAC Ducts & Diffusers
    add_box(0, elev_y + 3.1, 0, 30.0, 0.3, 0.5, f"Level_{lvl}_HVAC_Ducts", "HVAC_Galvanized_Duct")
    for dx in [-10.0, 0.0, 10.0]:
        add_box(dx, elev_y + 3.1, 5.0, 0.35, 0.25, 10.0, f"Level_{lvl}_HVAC_Ducts", "HVAC_Galvanized_Duct")
    for fx in [-12.0, -6.0, 0.0, 6.0, 12.0]:
        for fz in [-6.0, 0.0, 6.0]:
            add_box(fx, elev_y + 3.3, fz, 0.6, 0.08, 0.6, f"Level_{lvl}_HVAC_Ducts", "Air_Diffuser")

    # Cable Trays & Distribution Boards
    add_box(0, elev_y + 2.8, -4.0, 32.0, 0.06, 0.35, f"Level_{lvl}_Electrical_Tray", "Cable_Tray_Steel")
    add_box(-13.0, elev_y + 1.5, -4.0, 0.25, 1.2, 0.8, f"Level_{lvl}_Electrical_Panels", "Electrical_Panel_DB")

    # Sprinkler Network
    add_box(0, elev_y + 3.3, 7.0, 30.0, 0.08, 0.08, f"Level_{lvl}_Fire_Sprinklers", "Fire_Sprinkler_Pipe")

# Level 3 Data Center (MDF Racks, InRow CRAC, FM-200)
lvl3_y = 3 * level_height
add_box(-10.0, lvl3_y + 1.15, -10.0, 0.8, 2.0, 1.2, "Level_3_ELV_MDF", "Server_Rack_42U")
add_box(-8.8, lvl3_y + 1.15, -10.0, 0.8, 2.0, 1.2, "Level_3_ELV_MDF", "Server_Rack_42U")
add_box(-7.6, lvl3_y + 1.15, -10.0, 0.4, 2.0, 1.2, "Level_3_HVAC_CRAC", "InRow_CRAC")
add_box(-12.0, lvl3_y + 0.95, -10.0, 0.8, 1.6, 0.4, "Level_3_Fire_Gas", "FM200_Gas_Tank")

# Rooftop Level 6 Chillers
lvl6_y = 6 * level_height
add_box(-6.0, lvl6_y + 1.4, 0, 3.2, 2.4, 2.2, "Level_6_Plant", "InRow_CRAC")
add_box(6.0, lvl6_y + 1.4, 0, 3.2, 2.4, 2.2, "Level_6_Plant", "InRow_CRAC")

# WRITE MTL
with open(mtl_file, "w") as f:
    f.write("""newmtl Concrete_Slab\nKd 0.82 0.84 0.88\n\nnewmtl Concrete_Column\nKd 0.45 0.48 0.52\n\nnewmtl Glass_Facade\nKd 0.2 0.6 0.9\nd 0.4\n\nnewmtl Aluminum_Mullion\nKd 0.15 0.18 0.22\n\nnewmtl Interior_Drywall\nKd 0.7 0.72 0.75\n\nnewmtl Furniture_Wood\nKd 0.55 0.35 0.2\n\nnewmtl Monitor_Screen\nKd 0.05 0.05 0.08\n\nnewmtl Mesh_Chair\nKd 0.1 0.1 0.15\n\nnewmtl Server_Rack_42U\nKd 0.05 0.08 0.15\n\nnewmtl InRow_CRAC\nKd 0.02 0.45 0.75\n\nnewmtl FM200_Gas_Tank\nKd 0.85 0.1 0.1\n\nnewmtl HVAC_Galvanized_Duct\nKd 0.1 0.5 0.8\n\nnewmtl Air_Diffuser\nKd 0.9 0.9 0.9\n\nnewmtl Cable_Tray_Steel\nKd 0.65 0.68 0.72\n\nnewmtl Electrical_Panel_DB\nKd 0.9 0.4 0.05\n\nnewmtl Fire_Sprinkler_Pipe\nKd 0.9 0.15 0.15\n\n""")

# WRITE OBJ
with open(obj_file, "w") as f:
    f.write("mtllib Dublin_TechHub_LOD350.mtl\n\n")
    for v in vertices:
        f.write(f"v {v[0]:.4f} {v[1]:.4f} {v[2]:.4f}\n")
    f.write("\n")
    for group in faces:
        f.write(f"g {group['group']}\n")
        f.write(f"usemtl {group['material']}\n")
        for tri in group["triangles"]:
            f.write(f"f {tri[0]} {tri[1]} {tri[2]}\n")

# WRITE DXF
with open(dxf_file, "w") as f:
    f.write("0\nSECTION\n2\nHEADER\n0\nENDSEC\n0\nSECTION\n2\nTABLES\n0\nTABLE\n2\nLAYER\n")
    layers = [("S-SLAB", 8), ("S-COLS", 9), ("A-WALL", 7), ("A-FURN", 3), ("M-DUCT", 4), ("E-TRAY", 1), ("E-RACK", 5), ("F-SPRN", 1)]
    for ln, col in layers:
        f.write(f"0\nLAYER\n2\n{ln}\n70\n0\n62\n{col}\n6\nCONTINUOUS\n")
    f.write("0\nENDTAB\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n")

    for g in faces:
        grp = g["group"]
        layer = "S-SLAB" if "Structure" in grp else ("S-COLS" if "Col" in grp or "Core" in grp else ("A-WALL" if "Arch" in grp or "Facade" in grp else ("A-FURN" if "Furn" in grp else ("M-DUCT" if "HVAC" in grp or "Plant" in grp else ("E-TRAY" if "Tray" in grp else ("E-RACK" if "MDF" in grp or "Panels" in grp else "F-SPRN"))))))
        for tri in g["triangles"]:
            v1, v2, v3 = vertices[tri[0] - 1], vertices[tri[1] - 1], vertices[tri[2] - 1]
            f.write(f"0\n3DFACE\n8\n{layer}\n")
            f.write(f"10\n{v1[0]:.3f}\n20\n{v1[2]:.3f}\n30\n{v1[1]:.3f}\n")
            f.write(f"11\n{v2[0]:.3f}\n21\n{v2[2]:.3f}\n31\n{v2[1]:.3f}\n")
            f.write(f"12\n{v3[0]:.3f}\n22\n{v3[2]:.3f}\n32\n{v3[1]:.3f}\n")
            f.write(f"13\n{v3[0]:.3f}\n23\n{v3[2]:.3f}\n33\n{v3[1]:.3f}\n")
    f.write("0\nENDSEC\n0\nEOF\n")

print(f">>> [SUCCESS] Generated: {obj_file} & {dxf_file}")
