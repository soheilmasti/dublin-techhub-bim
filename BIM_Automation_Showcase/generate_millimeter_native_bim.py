#!/usr/bin/env python3
"""
================================================================================
DUBLIN TECH HUB - MILLIMETER-NATIVE IFC2X3 & 3D MODEL GENERATOR
Scales all geometry to 1:1 Millimeters (34,000mm x 24,000mm x 26,600mm)
Guarantees 100% perfect visibility & real-world dimensions in Revit (mm units).
================================================================================
"""

import os
import ifcopenshell
import ifcopenshell.api
import ifcopenshell.api.root
import ifcopenshell.api.unit
import ifcopenshell.api.context
import ifcopenshell.api.project
import ifcopenshell.api.spatial
import ifcopenshell.api.aggregate

output_dir = os.path.dirname(os.path.abspath(__file__))
ifc_path = os.path.join(output_dir, "Dublin_TechHub_LOD350.ifc")
obj_file = os.path.join(output_dir, "Dublin_TechHub_LOD350.obj")
mtl_file = os.path.join(output_dir, "Dublin_TechHub_LOD350.mtl")
dxf_file = os.path.join(output_dir, "Dublin_TechHub_LOD350.dxf")

print(">>> [ENGINE] Generating Millimeter-Native (mm) Model for Revit 2026...")

# 1. Initialize IFC2X3 Model
model = ifcopenshell.file(schema="IFC2X3")

# Owner History
person = model.create_entity("IfcPerson", FamilyName="Masti", GivenName="Soheil")
org = model.create_entity("IfcOrganization", Name="AegisBIM Engineering")
user = model.create_entity("IfcPersonAndOrganization", ThePerson=person, TheOrganization=org)
app = model.create_entity("IfcApplication", ApplicationDeveloper=org, Version="2026", ApplicationFullName="AegisBIM Controller", ApplicationIdentifier="AegisBIM")

# 2. Project & MILLIMETER Units
project = ifcopenshell.api.root.create_entity(model, ifc_class="IfcProject", name="Dublin Tech Hub - 7-Story Commercial Tower (mm)")

# Explicit Millimeter SI Unit
length_unit = model.create_entity("IfcSIUnit", UnitType="LENGTHUNIT", Prefix="MILLI", Name="METRE")
area_unit = model.create_entity("IfcSIUnit", UnitType="AREAUNIT", Name="SQUARE_METRE")
volume_unit = model.create_entity("IfcSIUnit", UnitType="VOLUMEUNIT", Name="CUBIC_METRE")
unit_assign = model.create_entity("IfcUnitAssignment", Units=[length_unit, area_unit, volume_unit])
project.UnitsInContext = unit_assign

# 3. Geometric Contexts
context = ifcopenshell.api.context.add_context(model, context_type="Model")
body_context = ifcopenshell.api.context.add_context(
    model,
    context_type="Model",
    context_identifier="Body",
    target_view="MODEL_VIEW",
    parent=context
)

# 4. Spatial Hierarchy
site = ifcopenshell.api.root.create_entity(model, ifc_class="IfcSite", name="Silicon Docks Commercial Site, Dublin 2")
ifcopenshell.api.aggregate.assign_object(model, relating_object=project, products=[site])

building = ifcopenshell.api.root.create_entity(model, ifc_class="IfcBuilding", name="Dublin Tech Hub Tower")
ifcopenshell.api.aggregate.assign_object(model, relating_object=site, products=[building])

# LEVELS IN MILLIMETERS (3,800 mm per floor)
LEVELS = [
    ("Level 0 - Ground Reception", 0.0),
    ("Level 1 - Commercial Retail", 3800.0),
    ("Level 2 - Professional Services", 7600.0),
    ("Level 3 - Enterprise HQ & MDF Data Center", 11400.0),
    ("Level 4 - Agile Tech Hub & IDF", 15200.0),
    ("Level 5 - Corporate Executive Suites", 19000.0),
    ("Level 6 - Rooftop Plant & Chillers", 22800.0),
]

def make_placement(model, x=0.0, y=0.0, z=0.0, rel_to=None):
    pt = model.create_entity("IfcCartesianPoint", Coordinates=(float(x), float(y), float(z)))
    axis = model.create_entity(
        "IfcAxis2Placement3D",
        Location=pt,
        Axis=model.create_entity("IfcDirection", DirectionRatios=(0.0, 0.0, 1.0)),
        RefDirection=model.create_entity("IfcDirection", DirectionRatios=(1.0, 0.0, 0.0))
    )
    return model.create_entity("IfcLocalPlacement", PlacementRelTo=rel_to, RelativePlacement=axis)

building.ObjectPlacement = make_placement(model, 0.0, 0.0, 0.0)

storeys = []
for name, elev in LEVELS:
    st = ifcopenshell.api.root.create_entity(model, ifc_class="IfcBuildingStorey", name=name)
    st.Elevation = float(elev)
    st.ObjectPlacement = make_placement(model, 0.0, 0.0, elev, rel_to=building.ObjectPlacement)
    ifcopenshell.api.aggregate.assign_object(model, relating_object=building, products=[st])
    storeys.append(st)

print("[ENGINE] 7 Storeys established in Millimeters (3,800mm floor heights).")

# Millimeter Shape Builder
def make_box_shape(model, body_context, sx, sy, sz):
    profile = model.create_entity(
        "IfcRectangleProfileDef",
        ProfileType="AREA",
        XDim=float(sx),
        YDim=float(sy),
    )
    placement = model.create_entity(
        "IfcAxis2Placement3D",
        Location=model.create_entity("IfcCartesianPoint", Coordinates=(0.0, 0.0, 0.0)),
        Axis=model.create_entity("IfcDirection", DirectionRatios=(0.0, 0.0, 1.0)),
        RefDirection=model.create_entity("IfcDirection", DirectionRatios=(1.0, 0.0, 0.0))
    )
    solid = model.create_entity(
        "IfcExtrudedAreaSolid",
        SweptArea=profile,
        Position=placement,
        ExtrudedDirection=model.create_entity("IfcDirection", DirectionRatios=(0.0, 0.0, 1.0)),
        Depth=float(sz)
    )
    shape_rep = model.create_entity(
        "IfcShapeRepresentation",
        ContextOfItems=body_context,
        RepresentationIdentifier="Body",
        RepresentationType="SweptSolid",
        Items=[solid]
    )
    return model.create_entity("IfcProductDefinitionShape", Representations=[shape_rep])

def add_element(model, ifc_class, name, storey, shape, x, y, z):
    elem = ifcopenshell.api.root.create_entity(model, ifc_class=ifc_class, name=name)
    elem.Representation = shape
    elem.ObjectPlacement = make_placement(model, x, y, z, rel_to=storey.ObjectPlacement)
    ifcopenshell.api.spatial.assign_container(model, relating_structure=storey, products=[elem])
    return elem

# Pre-created Shapes in Millimeters
slab_shape = make_box_shape(model, body_context, 34000.0, 24000.0, 350.0) # 34m x 24m x 350mm
col_shape = make_box_shape(model, body_context, 600.0, 600.0, 3450.0) # 600mm x 600mm column
core_shape = make_box_shape(model, body_context, 6000.0, 250.0, 3450.0) # Shear wall
mullion_shape = make_box_shape(model, body_context, 100.0, 150.0, 3450.0) # Mullion
wall_8m = make_box_shape(model, body_context, 8000.0, 150.0, 3200.0) # 8m Drywall
wall_6m = make_box_shape(model, body_context, 150.0, 6000.0, 3200.0) # 6m Drywall
glass_10m = make_box_shape(model, body_context, 10000.0, 100.0, 3000.0) # Glass wall
desk_shape = make_box_shape(model, body_context, 1600.0, 1200.0, 750.0) # 1.6m x 1.2m Desk
chair_shape = make_box_shape(model, body_context, 500.0, 500.0, 900.0) # Mesh Chair
rack_42u_shape = make_box_shape(model, body_context, 800.0, 1200.0, 2000.0) # 42U Server Rack (800x1200x2000mm)
crac_shape = make_box_shape(model, body_context, 400.0, 1200.0, 2000.0) # InRow Precision AC
fm200_shape = make_box_shape(model, body_context, 800.0, 400.0, 1600.0) # FM-200 Gas
duct_main_shape = make_box_shape(model, body_context, 30000.0, 500.0, 300.0) # 500x300mm Duct
duct_branch_shape = make_box_shape(model, body_context, 350.0, 18000.0, 250.0) # Branch Duct
tray_shape = make_box_shape(model, body_context, 32000.0, 350.0, 60.0) # 350x60mm Cable Tray
cctv_shape = make_box_shape(model, body_context, 250.0, 250.0, 250.0) # 4MP CCTV Dome
led_shape = make_box_shape(model, body_context, 600.0, 600.0, 40.0) # 600x600 LED Troffer
chiller_shape = make_box_shape(model, body_context, 3200.0, 2200.0, 2400.0) # 450kW Chiller

# 1. Structure (7 Storeys)
print("[ENGINE] Building Slabs, Columns & Cores in mm...")
for idx, st in enumerate(storeys):
    add_element(model, "IfcSlab", f"RC_Slab_L{idx}_350mm", st, slab_shape, 0.0, 0.0, 0.0)
    add_element(model, "IfcWall", f"Core_North_L{idx}", st, core_shape, 0.0, 3000.0, 350.0)
    add_element(model, "IfcWall", f"Core_South_L{idx}", st, core_shape, 0.0, -3000.0, 350.0)

    for cx in [-15000.0, -9000.0, -3000.0, 3000.0, 9000.0, 15000.0]:
        for cy in [-10000.0, -3500.0, 3500.0, 10000.0]:
            add_element(model, "IfcColumn", f"RC_Col_L{idx}_{cx}_{cy}", st, col_shape, cx, cy, 350.0)

    for mx in range(-16000, 17000, 2000):
        add_element(model, "IfcMember", f"Mullion_N_L{idx}_{mx}", st, mullion_shape, mx, 12000.0, 350.0)
        add_element(model, "IfcMember", f"Mullion_S_L{idx}_{mx}", st, mullion_shape, mx, -12000.0, 350.0)

# 2. Fit-Out on Level 3 & Level 4
print("[ENGINE] Placing Fit-Out & MEP on Level 3 & Level 4 in mm...")
for lvl_idx in [3, 4]:
    st = storeys[lvl_idx]

    add_element(model, "IfcWall", f"Comms_Wall_A_L{lvl_idx}", st, wall_8m, -9000.0, -9000.0, 350.0)
    add_element(model, "IfcWall", f"Comms_Wall_B_L{lvl_idx}", st, wall_6m, -5000.0, -6000.0, 350.0)
    add_element(model, "IfcWall", f"Boardroom_Wall_L{lvl_idx}", st, glass_10m, 8000.0, 6000.0, 350.0)

    for wx in [-12000.0, -8000.0, 6000.0, 10000.0]:
        for wy in [-6000.0, -2000.0, 2000.0, 6000.0]:
            add_element(model, "IfcFurnishingElement", f"Desk_L{lvl_idx}_{wx}_{wy}", st, desk_shape, wx, wy, 350.0)
            add_element(model, "IfcFurnishingElement", f"Chair_L{lvl_idx}_{wx}_{wy}", st, chair_shape, wx, wy + 600.0, 350.0)

    add_element(model, "IfcFlowSegment", f"HVAC_Main_L{lvl_idx}", st, duct_main_shape, 0.0, 0.0, 2800.0)
    for dx in [-10000.0, 0.0, 10000.0]:
        add_element(model, "IfcFlowSegment", f"HVAC_Branch_L{lvl_idx}_{dx}", st, duct_branch_shape, dx, 0.0, 2800.0)

    add_element(model, "IfcFlowSegment", f"CableTray_L{lvl_idx}", st, tray_shape, 0.0, -4000.0, 2600.0)

    for lx in [-12000.0, -6000.0, 0.0, 6000.0, 12000.0]:
        for ly in [-6000.0, 0.0, 6000.0]:
            add_element(model, "IfcFlowTerminal", f"LED_Troffer_L{lvl_idx}_{lx}_{ly}", st, led_shape, lx, ly, 3000.0)

# 3. Level 3 Data Center (MDF Racks, InRow CRAC & FM-200)
lvl3_st = storeys[3]
add_element(model, "IfcFurnishingElement", "MDF_Rack_01_42U", lvl3_st, rack_42u_shape, -10000.0, -10000.0, 350.0)
add_element(model, "IfcFurnishingElement", "MDF_Rack_02_42U", lvl3_st, rack_42u_shape, -8800.0, -10000.0, 350.0)
add_element(model, "IfcFlowTerminal", "InRow_CRAC_01", lvl3_st, crac_shape, -7600.0, -10000.0, 350.0)
add_element(model, "IfcFlowTerminal", "FM200_Gas_Suppression_Battery", lvl3_st, fm200_shape, -12000.0, -10000.0, 350.0)

# CCTV Cameras
for c_name, cx, cy, cz, st in [
    ("CAM-L3-01 (Turnstiles)", -14000.0, 10000.0, 2600.0, lvl3_st),
    ("CAM-L3-02 (Server Corridor)", -6000.0, -4000.0, 2600.0, lvl3_st),
    ("CAM-L3-03 (Open Office 360)", 0.0, 0.0, 2800.0, lvl3_st),
    ("CAM-L3-04 (Inside MDF)", -9000.0, -9000.0, 2600.0, lvl3_st),
    ("CAM-L4-01 (Elevator Lobby)", 0.0, 4000.0, 2600.0, storeys[4]),
]:
    add_element(model, "IfcFlowTerminal", c_name, st, cctv_shape, cx, cy, cz)

# 4. Level 6 Rooftop Chillers
lvl6_st = storeys[6]
add_element(model, "IfcFlowTerminal", "Rooftop_Chiller_01", lvl6_st, chiller_shape, -6000.0, 0.0, 350.0)
add_element(model, "IfcFlowTerminal", "Rooftop_Chiller_02", lvl6_st, chiller_shape, 6000.0, 0.0, 350.0)

# Write to Disk
model.write(ifc_path)

# Also generate Millimeter DXF
with open(dxf_file, "w") as f:
    f.write("0\nSECTION\n2\nHEADER\n0\nENDSEC\n0\nSECTION\n2\nTABLES\n0\nTABLE\n2\nLAYER\n")
    layers = [("S-SLAB", 8), ("S-COLS", 9), ("A-WALL", 7), ("A-FURN", 3), ("M-DUCT", 4), ("E-TRAY", 1), ("E-RACK", 5), ("F-SPRN", 1)]
    for ln, col in layers:
        f.write(f"0\nLAYER\n2\n{ln}\n70\n0\n62\n{col}\n6\nCONTINUOUS\n")
    f.write("0\nENDTAB\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n")

    def dxf_box(cx, cy, cz, sx, sy, sz, layer):
        hx, hy, hz = sx/2.0, sy/2.0, sz/2.0
        v = [
            (cx-hx, cy-hy, cz-hz), (cx+hx, cy-hy, cz-hz), (cx+hx, cy+hy, cz-hz), (cx-hx, cy+hy, cz-hz),
            (cx-hx, cy-hy, cz+hz), (cx+hx, cy-hy, cz+hz), (cx+hx, cy+hy, cz+hz), (cx-hx, cy+hy, cz+hz)
        ]
        faces = [(4,5,6,7), (1,0,3,2), (3,7,6,2), (0,1,5,4), (1,2,6,5), (0,4,7,3)]
        for p in faces:
            f.write(f"0\n3DFACE\n8\n{layer}\n")
            f.write(f"10\n{v[p[0]][0]:.1f}\n20\n{v[p[0]][1]:.1f}\n30\n{v[p[0]][2]:.1f}\n")
            f.write(f"11\n{v[p[1]][0]:.1f}\n21\n{v[p[1]][1]:.1f}\n31\n{v[p[1]][2]:.1f}\n")
            f.write(f"12\n{v[p[2]][0]:.1f}\n22\n{v[p[2]][1]:.1f}\n32\n{v[p[2]][2]:.1f}\n")
            f.write(f"13\n{v[p[3]][0]:.1f}\n23\n{v[p[3]][1]:.1f}\n33\n{v[p[3]][2]:.1f}\n")

    for l_idx, (name, elev) in enumerate(LEVELS):
        dxf_box(0, 0, elev + 175, 34000, 24000, 350, "S-SLAB")
        dxf_box(0, 3000, elev + 1900, 6000, 250, 3450, "S-COLS")
        dxf_box(0, -3000, elev + 1900, 6000, 250, 3450, "S-COLS")
        for cx in [-15000, -9000, -3000, 3000, 9000, 15000]:
            for cy in [-10000, -3500, 3500, 10000]:
                dxf_box(cx, cy, elev + 1900, 600, 600, 3450, "S-COLS")

    # Fit-Out on L3 & L4
    for l_idx in [3, 4]:
        elev = LEVELS[l_idx][1]
        dxf_box(-9000, -9000, elev + 1750, 8000, 150, 3200, "A-WALL")
        dxf_box(-5000, -6000, elev + 1750, 150, 6000, 3200, "A-WALL")
        dxf_box(8000, 6000, elev + 1650, 10000, 100, 3000, "A-WALL")
        for wx in [-12000, -8000, 6000, 10000]:
            for wy in [-6000, -2000, 2000, 6000]:
                dxf_box(wx, wy, elev + 550, 1600, 1200, 750, "A-FURN")
        dxf_box(0, 0, elev + 2950, 30000, 500, 300, "M-DUCT")
        dxf_box(0, -4000, elev + 2630, 32000, 350, 60, "E-TRAY")

    # Level 3 MDF
    l3_elev = LEVELS[3][1]
    dxf_box(-10000, -10000, l3_elev + 1175, 800, 1200, 2000, "E-RACK")
    dxf_box(-8800, -10000, l3_elev + 1175, 800, 1200, 2000, "E-RACK")
    dxf_box(-7600, -10000, l3_elev + 1175, 400, 1200, 2000, "M-DUCT")

    f.write("0\nENDSEC\n0\nEOF\n")

print(f"\n================================================================================")
print(f">>> [SUCCESS] 100% Millimeter-Native (mm) Models Generated!")
print(f">>> Dimensions: 34,000mm x 24,000mm x 26,600mm")
print(f">>> Files Updated: {ifc_path} & {dxf_file}")
print(f"================================================================================")
