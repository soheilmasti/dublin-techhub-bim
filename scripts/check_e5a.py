import os, re, subprocess
from PIL import Image

base = r'C:\Users\Soheil\Pictures\Siavash_Categorized'

out = subprocess.check_output(['git', 'show', 'e5a36da:scripts/generate_aligned_thematic_portfolios.py'], text=True, encoding='utf-8')

start = out.find('villa_spreads = [')
end = out.find('full_spreads = [v_man]', start)
block = out[start:end]

lines = block.split('\n')
print("=== VILLA SPREADS IN COMMIT e5a36da ===")
for line in lines:
    m = re.search(r"r'([^']+)'", line)
    if m:
        rel = m.group(1)
        full = os.path.join(base, rel)
        if os.path.exists(full):
            with Image.open(full) as im:
                print(f"{rel} | size: {im.size} | ratio: {im.width/im.height:.2f}")
        else:
            print(f"NOT FOUND: {full}")

print("\n=== APARTMENT SPREADS IN COMMIT e5a36da ===")
start_apt = out.find('apt_spreads = [')
end_apt = out.find('full_spreads = [a_man]', start_apt)
block_apt = out[start_apt:end_apt]
for line in block_apt.split('\n'):
    m = re.search(r"r'([^']+)'", line)
    if m:
        rel = m.group(1)
        full = os.path.join(base, rel)
        if os.path.exists(full):
            with Image.open(full) as im:
                print(f"{rel} | size: {im.size} | ratio: {im.width/im.height:.2f}")
        else:
            print(f"NOT FOUND: {full}")
