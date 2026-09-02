#!/usr/bin/env python3
"""
================================================================================
DUBLIN TECH HUB - HIGH-PRECISION IFC4 GENERATOR WITH EXPLICIT LOCAL PLACEMENTS
Ensures 100% visibility in both Revit 2D Floor Plans (L0-L6) & Revit 3D Views.
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
import ifcopenshell.api.geometry

output_dir = os.path.dirname(os.path.abspath(__file__))
ifc_path = os.path.join(output_dir, "Dublin_TechHub_LOD350.ifc")

print(">>> [ENGINE] Initializing High-Precision IFC4 Model with Full Local Placements...")

model = ifcopenshell.file(schema="IFC4")

# Project & Units
project = ifcopenshell.api.root.create_entity(model, ifc_class="IfcProject", name="Dublin Tech Hub Commercial Tower")
ifcopenshell.api.unit.assign_unit(model, length={"is_metric": True, "raw": "METRE"})

# Representation Contexts
context = ifcopenshell.api.context.add_context(model, context_type="Model")
body_context = ifcopenshell.api.context.add_context(
    model,
    context_type="Model",
    context_identifier="Body",
    target_view="MODEL_VIEW",
    parent=context
)

# Spatial Hierarchy
site = ifcopenshell.api.root.create_entity(model, ifc_class="IfcSite", name="Silicon Docks Site, Dublin 2")
ifcopenshell.api.aggregate.assign_object(model, relating_object=project, products=[site])

building = ifcopenshell.api.root.create_entity(model, ifc_class="IfcBuilding", name="Dublin Tech Hub Tower")
ifcopenshell.api.aggregate.assign_object(model, relating_object=site, products=[building])

# Storeys with Explicit Placements
LEVELS = [
    ("Level 0 - Ground Reception", 0.0),
    ("Level 1 - Commercial Retail", 3.8),
    ("Level 2 - Professional Services", 7.6),
    ("Level 3 - Enterprise HQ & MDF Data Center", 11.4),
    ("Level 4 - Agile Tech Hub & IDF", 15.2),
    ("Level 5 - Corporate Executive Suites", 19.0),
    ("Level 6 - Rooftop Plant & Chillers", 22.8),
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

# Building Placement
building.ObjectPlacement = make_placement(model, 0.0, 0.0, 0.0)

storeys = []
for name, elev in LEVELS:
    st = ifcopenshell.api.root.create_entity(model, ifc_class="IfcBuildingStorey", name=name)
    st.Elevation = float(elev)
    st.ObjectPlacement = make_placement(model, 0.0, 0.0, elev, rel_to=building.ObjectPlacement)
    ifcopenshell.api.aggregate.assign_object(model, relating_object=building, products=[st])
    storeys.append(st)

print("[ENGINE] 7 Storey Local Placements Established.")

# Geometry Builder
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

# Shapes
slab_shape = make_box_shape(model, body_context, 34.0, 24.0, 0.35)
col_shape = make_box_shape(model, body_context, 0.6, 0.6, 3.45)
core_shape = make_box_shape(model, body_context, 6.0, 0.25, 3.45)
mullion_shape = make_box_shape(model, body_context, 0.1, 0.15, 3.45)

def add_element(model, ifc_class, name, storey, shape, x, y, z):
    elem = ifcopenshell.api.root.create_entity(model, ifc_class=ifc_class, name=name)
    elem.Representation = shape
    elem.ObjectPlacement = make_placement(model, x, y, z, rel_to=storey.ObjectPlacement)
    ifcopenshell.api.spatial.assign_container(model, relating_structure=storey, products=[elem])
    return elem

# 1. Structure Across All 7 Storeys
print("[ENGINE] Building Slabs, Columns & Shear Cores across all 7 levels...")
for idx, st in enumerate(storeys):
    # Slab at z=0 of each storey
    add_element(model, "IfcSlab", f"RC_Slab_L{idx}", st, slab_shape, 0.0, 0.0, 0.0)

    # Core Shear Walls
    add_element(model, "IfcWall", f"ShearWall_North_L{idx}", st, core_shape, 0.0, 3.0, 0.35)
    add_element(model, "IfcWall", f"ShearWall_South_L{idx}", st, core_shape, 0.0, -3.0, 0.35)

    # 24 Columns per floor
    for cx in [-15.0, -9.0, -3.0, 3.0, 9.0, 15.0]:
        for cy in [-10.0, -3.5, 3.5, 10.0]:
            add_element(model, "IfcColumn", f"Col_L{idx}_{cx}_{cy}", st, col_shape, cx, cy, 0.35)

    # Facade Mullions
    for mx in range(-16, 17, 2):
        add_element(model, "IfcMember", f"Mullion_N_L{idx}_{mx}", st, mullion_shape, mx, 12.0, 0.35)
        add_element(model, "IfcMember", f"Mullion_S_L{idx}_{mx}", st, mullion_shape, mx, -12.0, 0.35)

# 2. Level 3 & Level 4 Fit-Out
print("[ENGINE] Adding Enterprise IT, Security, HVAC & Furniture on Level 3 & Level 4...")

# Reusable Shapes
wall_shape_8m = make_box_shape(model, body_context, 8.0, 0.15, 3.2)
wall_shape_6m = make_box_shape(model, body_context, 0.15, 6.0, 3.2)
glass_part_shape = make_box_shape(model, body_context, 10.0, 0.1, 3.0)
desk_shape = make_box_shape(model, body_context, 1.6, 1.2, 0.75)
chair_shape = make_box_shape(model, body_context, 0.5, 0.5, 0.9)
rack_shape_42u = make_box_shape(model, body_context, 0.8, 1.2, 2.0)
crac_shape = make_box_shape(model, body_context, 0.4, 1.2, 2.0)
fm200_shape = make_box_shape(model, body_context, 0.8, 0.4, 1.6)
duct_main_shape = make_box_shape(model, body_context, 30.0, 0.5, 0.3)
duct_branch_shape = make_box_shape(model, body_context, 0.35, 18.0, 0.25)
tray_shape = make_box_shape(model, body_context, 32.0, 0.35, 0.06)
cctv_shape = make_box_shape(model, body_context, 0.25, 0.25, 0.25)
led_shape = make_box_shape(model, body_context, 0.6, 0.6, 0.04)

for lvl_idx in [3, 4]:
    st = storeys[lvl_idx]

    # Comms Room Acoustic Drywalls
    add_element(model, "IfcWall", f"Comms_Wall_A_L{lvl_idx}", st, wall_shape_8m, -9.0, -9.0, 0.35)
    add_element(model, "IfcWall", f"Comms_Wall_B_L{lvl_idx}", st, wall_shape_6m, -5.0, -6.0, 0.35)

    # Boardroom Glass Partition
    add_element(model, "IfcWall", f"Boardroom_Wall_L{lvl_idx}", st, glass_part_shape, 8.0, 6.0, 0.35)

    # Workstations (Desks & Chairs)
    for wx in [-12.0, -8.0, 6.0, 10.0]:
        for wy in [-6.0, -2.0, 2.0, 6.0]:
            add_element(model, "IfcFurnishingElement", f"Desk_L{lvl_idx}_{wx}_{wy}", st, desk_shape, wx, wy, 0.35)
            add_element(model, "IfcFurnishingElement", f"Chair_L{lvl_idx}_{wx}_{wy}", st, chair_shape, wx, wy + 0.6, 0.35)

    # HVAC Main & Branch Ducts at ceiling void (+2.8m)
    add_element(model, "IfcDuctSegment", f"HVAC_Main_L{lvl_idx}", st, duct_main_shape, 0.0, 0.0, 2.8)
    for dx in [-10.0, 0.0, 10.0]:
        add_element(model, "IfcDuctSegment", f"HVAC_Branch_L{lvl_idx}_{dx}", st, duct_branch_shape, dx, 0.0, 2.8)

    # Cable Trays at +2.6m
    add_element(model, "IfcCableCarrierSegment", f"CableTray_L{lvl_idx}", st, tray_shape, 0.0, -4.0, 2.6)

    # DALI-2 LED Lights at +3.0m
    for lx in [-12.0, -6.0, 0.0, 6.0, 12.0]:
        for ly in [-6.0, 0.0, 6.0]:
            add_element(model, "IfcLightFixture", f"LED_L{lvl_idx}_{lx}_{ly}", st, led_shape, lx, ly, 3.0)

# Specific Level 3 Data Center Equipment
lvl3_st = storeys[3]
add_element(model, "IfcCommunicationsAppliance", "MDF_Rack_01_42U", lvl3_st, rack_shape_42u, -10.0, -10.0, 0.35)
add_element(model, "IfcCommunicationsAppliance", "MDF_Rack_02_42U", lvl3_st, rack_shape_42u, -8.8, -10.0, 0.35)
add_element(model, "IfcUnitaryEquipment", "InRow_CRAC_01", lvl3_st, crac_shape, -7.6, -10.0, 0.35)
add_element(model, "IfcUnitaryEquipment", "FM200_Gas_Battery", lvl3_st, fm200_shape, -12.0, -10.0, 0.35)

# CCTV Cameras
cctv_cams = [
    ("CAM-L3-01 (Turnstiles)", -14.0, 10.0, 2.6, lvl3_st),
    ("CAM-L3-02 (Server Corridor)", -6.0, -4.0, 2.6, lvl3_st),
    ("CAM-L3-03 (Open Office 360)", 0.0, 0.0, 2.8, lvl3_st),
    ("CAM-L3-04 (Inside MDF)", -9.0, -9.0, 2.6, lvl3_st),
    ("CAM-L4-01 (Elevator Lobby)", 0.0, 4.0, 2.6, storeys[4]),
    ("CAM-L4-02 (Agile Space 360)", 8.0, -2.0, 2.8, storeys[4]),
]
for c_name, cx, cy, cz, st in cctv_cams:
    add_element(model, "IfcSensor", c_name, st, cctv_shape, cx, cy, cz)

# Level 6 Rooftop Chillers
lvl6_st = storeys[6]
chiller_shape = make_box_shape(model, body_context, 3.2, 2.2, 2.4)
add_element(model, "IfcUnitaryEquipment", "Rooftop_Chiller_01", lvl6_st, chiller_shape, -6.0, 0.0, 0.35)
add_element(model, "IfcUnitaryEquipment", "Rooftop_Chiller_02", lvl6_st, chiller_shape, 6.0, 0.0, 0.35)

# Write to Disk
model.write(ifc_path)

file_size_kb = os.path.getsize(ifc_path) / 1024
print(f"\n================================================================================")
print(f">>> [SUCCESS] Dublin Tech Hub IFC4 Model with Full Local Placements Saved!")
print(f">>> Location: {ifc_path}")
print(f">>> File Size: {round(file_size_kb, 1)} KB | BIM Products: {len(model.by_type('IfcProduct')):,}")
print(f"================================================================================")
