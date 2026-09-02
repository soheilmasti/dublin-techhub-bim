#!/usr/bin/env python3
"""
================================================================================
DUBLIN TECH HUB - AUTODESK 3D DXF GENERATOR
Generates native AutoCAD / Revit 3D DXF file with dedicated layers:
- S-COLS, S-SLAB, A-WALL, M-DUCT, E-TRAY, E-CCTV, E-RACK, F-SPRN
================================================================================
"""

import os

output_dir = os.path.dirname(os.path.abspath(__file__))
dxf_file = os.path.join(output_dir, "Dublin_TechHub_LOD350.dxf")

def write_dxf_box(f, cx, cy, cz, sx, sy, sz, layer, color):
    hx, hy, hz = sx / 2.0, sy / 2.0, sz / 2.0
    # 8 corners
    v = [
        (cx - hx, cy - hy, cz - hz),
        (cx + hx, cy - hy, cz - hz),
        (cx + hx, cy + hy, cz - hz),
        (cx - hx, cy + hy, cz - hz),
        (cx - hx, cy - hy, cz + hz),
        (cx + hx, cy - hy, cz + hz),
        (cx + hx, cy + hy, cz + hz),
        (cx - hx, cy + hy, cz + hz),
    ]

    # 6 3DFACE entities
    faces = [
        (4, 5, 6, 7), # Front
        (1, 0, 3, 2), # Back
        (3, 7, 6, 2), # Top
        (0, 1, 5, 4), # Bottom
        (1, 2, 6, 5), # Right
        (0, 4, 7, 3), # Left
    ]

    for p in faces:
        f.write("0\n3DFACE\n")
        f.write(f"8\n{layer}\n")
        f.write(f"62\n{color}\n")
        f.write(f"10\n{v[p[0]][0]:.3f}\n20\n{v[p[0]][1]:.3f}\n30\n{v[p[0]][2]:.3f}\n")
        f.write(f"11\n{v[p[1]][0]:.3f}\n21\n{v[p[1]][1]:.3f}\n31\n{v[p[1]][2]:.3f}\n")
        f.write(f"12\n{v[p[2]][0]:.3f}\n22\n{v[p[2]][1]:.3f}\n32\n{v[p[2]][2]:.3f}\n")
        f.write(f"13\n{v[p[3]][0]:.3f}\n23\n{v[p[3]][1]:.3f}\n33\n{v[p[3]][2]:.3f}\n")

with open(dxf_file, "w") as f:
    # DXF Header
    f.write("0\nSECTION\n2\nHEADER\n0\nENDSEC\n")
    # Tables & Layers
    f.write("0\nSECTION\n2\nTABLES\n0\nTABLE\n2\nLAYER\n")
    layers = [
        ("S-SLAB", 8), ("S-COLS", 9), ("A-WALL", 7), ("M-DUCT", 4),
        ("E-TRAY", 1), ("E-RACK", 5), ("E-CCTV", 3), ("F-SPRN", 1)
    ]
    for l_name, l_col in layers:
        f.write(f"0\nLAYER\n2\n{l_name}\n70\n0\n62\n{l_col}\n6\nCONTINUOUS\n")
    f.write("0\nENDTAB\n0\nENDSEC\n")

    # Entities Section
    f.write("0\nSECTION\n2\nENTITIES\n")

    level_height = 3.6
    # 7 Stories
    for lvl in range(7):
        elev_z = lvl * level_height
        # Slabs (X=32m, Y=24m, Z=0.3m)
        write_dxf_box(f, 0, 0, elev_z, 32.0, 24.0, 0.3, "S-SLAB", 8)
        # Columns
        for x in [-16.0, -8.0, 0.0, 8.0, 16.0]:
            for y in [-12.0, -4.0, 4.0, 12.0]:
                write_dxf_box(f, x, y, elev_z + 1.8, 0.6, 0.6, 3.3, "S-COLS", 9)

    # Floor 3 & 4 Fit-Out
    for lvl in [3, 4]:
        elev_z = lvl * level_height
        # Partition Walls
        write_dxf_box(f, -8.0, -6.0, elev_z + 1.5, 12.0, 0.15, 3.0, "A-WALL", 7)
        write_dxf_box(f, -2.0, -9.0, elev_z + 1.5, 0.15, 6.0, 3.0, "A-WALL", 7)
        # HVAC Ducts
        write_dxf_box(f, 0, 0, elev_z + 3.0, 30.0, 0.6, 0.35, "M-DUCT", 4)
        # Cable Trays
        write_dxf_box(f, 0, -4.0, elev_z + 2.7, 30.0, 0.4, 0.08, "E-TRAY", 1)
        # Sprinklers
        write_dxf_box(f, 0, 7.0, elev_z + 3.2, 30.0, 0.08, 0.08, "F-SPRN", 1)

    # Level 3 MDF Server Rack & CRAC
    lvl3_z = 3 * level_height
    write_dxf_box(f, -9.0, -9.0, lvl3_z + 1.15, 0.8, 1.2, 2.0, "E-RACK", 5)
    write_dxf_box(f, -7.8, -9.0, lvl3_z + 1.15, 0.4, 1.2, 2.0, "M-DUCT", 4)
    # CCTV Cameras
    write_dxf_box(f, -14.0, 10.0, lvl3_z + 2.6, 0.3, 0.3, 0.3, "E-CCTV", 3)
    write_dxf_box(f, 0.0, 2.0, lvl3_z + 2.6, 0.3, 0.3, 0.3, "E-CCTV", 3)

    f.write("0\nENDSEC\n0\nEOF\n")

print(f"[SUCCESS] Native Autodesk 3D DXF file created at: {dxf_file}")
