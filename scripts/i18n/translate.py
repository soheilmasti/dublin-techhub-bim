"""Build static locale catalogs from public website copy; no translation calls at runtime."""
import concurrent.futures, json, re, time, urllib.parse, urllib.request
from pathlib import Path

folder = Path(__file__).parent
source = json.loads((folder / 'source.json').read_text(encoding='utf-8'))
codes = ['ca', 'es', 'fr', 'de', 'it', 'fa', 'zh', 'ru', 'pt', 'nl']
cache_path = folder / 'translations.json'
cache = json.loads(cache_path.read_text(encoding='utf-8')) if cache_path.exists() else source['existing']

def translate(lang, batch):
    params = [('client', 'dict-chrome-ex'), ('sl', 'en'), ('tl', 'zh-CN' if lang == 'zh' else lang)]
    params.extend(('q', text) for _, text in batch)
    url = 'https://translate.googleapis.com/translate_a/t?' + urllib.parse.urlencode(params)
    for attempt in range(4):
        try:
            request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(request, timeout=35) as response:
                result = json.load(response)
            if len(result) != len(batch) or not all(isinstance(value,str) and value.strip() for value in result):
                raise ValueError('Unexpected translation response')
            return lang, {text: value for (_,text),value in zip(batch,result)}
        except Exception:
            if attempt == 3: raise
            time.sleep(3 + attempt * 5)

jobs = []
for lang in codes:
    available = cache.setdefault(lang, {})
    batch = []; size = 0
    for i,text in enumerate(source['strings']):
        if text in available: continue
        if batch and (size + len(text) + 10 > 2200 or len(batch) >= 18):
            jobs.append((lang,batch));batch=[];size=0
        batch.append((i,text));size += len(text) + 10
    if batch:jobs.append((lang,batch))
print(f'Translating {len(jobs)} batches into static locale catalogs',flush=True)
failures=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
    futures={executor.submit(translate,*job):job for job in jobs}
    for n,future in enumerate(concurrent.futures.as_completed(futures),1):
        try:
            lang,values=future.result();cache[lang].update(values)
        except Exception as error:
            job=futures[future];failures.append((job,str(error)))
        if n % 12 == 0 or n==len(jobs):
            cache_path.write_text(json.dumps(cache,ensure_ascii=False,indent=2),encoding='utf-8')
            print(f'{n}/{len(jobs)} batches processed; failed: {len(failures)}',flush=True)
cache_path.write_text(json.dumps(cache,ensure_ascii=False,indent=2),encoding='utf-8')
if failures:
    raise RuntimeError(f'{len(failures)} failed batches; rerun to resume: {failures[0][1]}')

def map_locale(value, lang):
    if isinstance(value,str):return cache[lang][value]
    if isinstance(value,dict):return {k:map_locale(v,lang) for k,v in value.items()}
    if isinstance(value,list):return [map_locale(v,lang) for v in value]
    return value

root=folder.parent.parent
(root/'src/utils/localeText.json').write_text(json.dumps(cache,ensure_ascii=False,indent=2),encoding='utf-8')
(root/'src/utils/additionalLocales.json').write_text(json.dumps({lang:map_locale(source['dictionary'],lang) for lang in ['zh','ru','pt','nl']},ensure_ascii=False,indent=2),encoding='utf-8')
print('Static locale catalogs saved; runtime translation requires no network.',flush=True)
