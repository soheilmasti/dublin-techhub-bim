import json
import re

with open('public/project_renders_manifest.json', 'r', encoding='utf-8') as f:
    renders_map = json.load(f)

with open('src/data/initialData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# For each project in renders_map, update coverImage and gallery in initialData.ts
updated_count = 0
for proj_id, p_data in renders_map.items():
    renders = p_data['renders']
    cover = p_data['coverRender']
    if not renders or not cover:
        continue
        
    # Find the block for this project id
    # Regex matching "id": "proj_id" and its coverImage and gallery
    pattern = rf'(\"id\":\s*\"{re.escape(proj_id)}\"[\s\S]*?\"coverImage\":\s*)\"[^\"]+\"([\s\S]*?\"gallery\":\s*)\[[\s\S]*?\]'
    
    formatted_gallery = json.dumps(renders, indent=10)
    # Adjust indent
    formatted_gallery = formatted_gallery.replace('[\n', '[\n          ').replace('\n]', '\n        ]').replace('\n  ', '\n          ')
    
    replacement = rf'\1"{cover}"\2{formatted_gallery}'
    new_content, count = re.subn(pattern, replacement, content)
    if count > 0:
        content = new_content
        updated_count += 1
        print(f"Updated project: {proj_id} with {len(renders)} renders (cover: {cover})")
    else:
        print(f"WARNING: Could not find regex match for project id: {proj_id}")

# Also update category buildingImage to use the first project's coverRender
for cat_id, p_id in [
    ('residential-luxury', 'concrete-glass-topography'),
    ('urban-design', 'diamond-villa-masterplan'),
    ('commercial-complexes', 'east-tehran-steel-complex'),
    ('retail-stores', 'kitchen-design-appliances'),
    ('institutional-competitions', 'classical-monumental-palace')
]:
    if p_id in renders_map and renders_map[p_id]['coverRender']:
        cover = renders_map[p_id]['coverRender']
        cat_pattern = rf'(\"id\":\s*\"{cat_id}\"[\s\S]*?\"buildingImage\":\s*)\"[^\"]+\"'
        content = re.sub(cat_pattern, rf'\1"{cover}"', content)
        print(f"Updated category {cat_id} buildingImage to {cover}")

# Update backgroundImageUrl in INITIAL_SETTINGS
if 'violet-villa' in renders_map and renders_map['violet-villa']['coverRender']:
    violet_cover = renders_map['violet-villa']['coverRender']
    content = re.sub(r'\"backgroundImageUrl\":\s*\"[^\"]+\"', f'"backgroundImageUrl": "{violet_cover}"', content)
    print(f"Updated backgroundImageUrl to {violet_cover}")

with open('src/data/initialData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\nDone! Updated {updated_count} projects in src/data/initialData.ts with authentic extracted renders.")
