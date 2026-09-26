import os, re
from PIL import Image

base = r'C:\Users\Soheil\Pictures\Siavash_Categorized'

with open('scripts/generate_aligned_thematic_portfolios.py', 'r', encoding='utf-8') as f:
    text = f.read()

def check_volume(name, block):
    print(f"=== {name} ===")
    matches = re.findall(r"r'([^']+\.(?:jpeg|jpg|png))'", block)
    for idx, rel in enumerate(matches):
        full = os.path.join(base, rel)
        if os.path.exists(full):
            with Image.open(full) as im:
                print(f"  [{idx+1}] {rel} | size: {im.size} | ratio: {im.width/im.height:.2f}")
        else:
            print(f"  [{idx+1}] NOT FOUND: {rel}")

apt_block = text[text.find('def generate_apartments_volume'):text.find('def generate_urban_commercial_volume')]
check_volume('APARTMENTS', apt_block)

urban_block = text[text.find('def generate_urban_commercial_volume'):text.find("if __name__ == '__main__':")]
check_volume('URBAN', urban_block)
