import re

with open('src/data/initialData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

titles = re.findall(r'"title":\s*"([^"]+)"', text)
print(f"Total titles found: {len(titles)}")
for t in titles[:10]:
    print("Title:", t)
