const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '../..');
const cache = new Map();
function load(filename) {
  filename = path.resolve(root, filename);
  if (cache.has(filename)) return cache.get(filename);
  if (filename.endsWith('.json')) return JSON.parse(fs.readFileSync(filename, 'utf8'));
  const exports = {}; cache.set(filename, exports);
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  vm.runInNewContext(code, {exports, require: name => {
    if (name === 'react') return {useEffect() {}};
    return load(path.resolve(path.dirname(filename), name) + (path.extname(name) ? '' : '.ts'));
  }});
  return exports;
}
const dictionaries = load('src/utils/i18n.ts').TRANSLATIONS;
const projects = load('src/utils/localizedData.ts').PROJECT_TRANSLATIONS;
const strings = new Set();
const existing = {};
function collect(value) { if (typeof value === 'string') strings.add(value); else if (value && typeof value === 'object') Object.values(value).forEach(collect); }
function pairs(en, other, lang) {
  if (typeof en === 'string' && typeof other === 'string') (existing[lang] ??= {})[en] = other;
  else if (en && typeof en === 'object') Object.keys(en).forEach(k => pairs(en[k], other?.[k], lang));
}
collect(dictionaries.en);
for (const lang of Object.keys(dictionaries)) pairs(dictionaries.en, dictionaries[lang], lang);
for (const project of Object.values(projects)) {
  for (const field of Object.values(project)) {
    collect(field.en);
    for (const lang of Object.keys(dictionaries)) pairs(field.en, field[lang], lang);
  }
}
const edits = {};
function human(s) {
  return /[A-Za-z]/.test(s) && !/^(https?:|\/|#|mailto:|tel:)/.test(s) && !/\.(pdf|png|jpg|glb|mp4)$/.test(s)
    && !/^[a-z0-9_:-]+$/.test(s) && !/^(flex|grid|bg-|text-|w-|h-|border-|rotate-|scale-|ltr|rtl)/.test(s)
    && !['BIMCO','WhatsApp','ISO 19650','Revit','Autodesk Revit','JSON','BIM','LOD','3D','PDF'].includes(s);
}
for (const file of fs.readdirSync(path.join(root,'src/components')).filter(f=>f.endsWith('.tsx'))) {
  const relative = 'src/components/' + file;
  const source = fs.readFileSync(path.join(root,relative),'utf8');
  if (!/currentLanguage|language: LanguageCode/.test(source)) continue;
  const lang = file === 'BimOutsourcingSection.tsx' ? 'language' : 'currentLanguage';
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const changes = [];
  function change(node, text) { changes.push({start:node.getStart(ast),end:node.end,text}); }
  function visit(node) {
    if (ts.isConditionalExpression(node) && node.condition.getText(ast) === 'isRTL' && ts.isStringLiteral(node.whenTrue) && ts.isStringLiteral(node.whenFalse) && human(node.whenFalse.text)) {
      const text=node.whenFalse.text; strings.add(text); (existing.fa ??= {})[text]=node.whenTrue.text;
      change(node, `localizeText(${JSON.stringify(text)}, ${lang})`); return;
    }
    if (ts.isJsxText(node)) {
      const text=node.text.replace(/\s+/g,' ').trim();
      if (human(text)) { strings.add(text); change(node, `{localizeText(${JSON.stringify(text)}, ${lang})}`); }
      return;
    }
    if (ts.isJsxAttribute(node) && ['title','placeholder','aria-label','alt'].includes(node.name.text) && node.initializer && ts.isStringLiteral(node.initializer) && human(node.initializer.text)) {
      strings.add(node.initializer.text); change(node.initializer, `{localizeText(${JSON.stringify(node.initializer.text)}, ${lang})}`); return;
    }
    ts.forEachChild(node,visit);
  }
  visit(ast);
  if(changes.length) edits[relative]={lang,changes};
}
const data = load('src/utils/localizedData.ts');
const resume = data.getLocalizedResume('en');
collect(resume);
for (const lang of Object.keys(dictionaries)) pairs(resume, data.getLocalizedResume(lang), lang);
for(const file of ['src/utils/seo.ts','src/utils/localizedData.ts']) {
 const source=fs.readFileSync(path.join(root,file),'utf8'); const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true);
 function literals(node){ if(ts.isStringLiteral(node)) strings.add(node.text); ts.forEachChild(node,literals); }
 function visit(node){ if(ts.isPropertyAssignment(node) && node.name.getText(ast).replace(/["']/g,'')==='en') {literals(node.initializer);return;} ts.forEachChild(node,visit); }visit(ast);
}
fs.writeFileSync(path.join(__dirname,'source.json'),JSON.stringify({strings:[...strings],existing,dictionary:dictionaries.en,edits},null,2));
console.log(JSON.stringify({strings:strings.size,components:Object.keys(edits).length,characters:[...strings].join('').length}));
