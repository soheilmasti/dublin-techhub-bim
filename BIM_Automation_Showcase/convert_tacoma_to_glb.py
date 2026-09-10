import os
import trimesh

obj_path = r"c:\Users\Soheil\Documents\Apply\Website Memari\public\models\tacoma\Tacoma_Neighborhood.obj"
glb_path = r"c:\Users\Soheil\Documents\Apply\Website Memari\public\models\tacoma\Tacoma_Neighborhood.glb"

print(f">>> Loading OBJ: {obj_path}...")
scene = trimesh.load(obj_path, process=False)

print(f">>> Exporting optimized GLB to: {glb_path}...")
glb_data = scene.export(file_type='glb')
with open(glb_path, 'wb') as f:
    f.write(glb_data)

sz_mb = os.path.getsize(glb_path) / (1024 * 1024)
print(f">>> [SUCCESS] Exported Tacoma_Neighborhood.glb ({sz_mb:.2f} MB)")
