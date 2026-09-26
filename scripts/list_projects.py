import re

with open('src/data/initialData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's find all project definitions
projects = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"title":\s*"([^"]+)",\s*"englishTitle":\s*"([^"]+)"', text)
print(f"Total projects in initialData.ts: {len(projects)}")
for p in projects:
    print(f"- {p[0]} | {p[2]}")
