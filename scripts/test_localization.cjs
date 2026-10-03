const fs=require('fs'),path=require('path'),vm=require('vm'),ts=require('typescript'),assert=require('assert');
const root=path.resolve(__dirname,'..'),cache=new Map();
function load(file){if(cache.has(file))return cache.get(file);if(file.endsWith('.json'))return JSON.parse(fs.readFileSync(file,'utf8'));const exports={};cache.set(file,exports);vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText,{exports,require:n=>n==='react'?{useEffect(){}}:load(path.resolve(path.dirname(file),n)+(path.extname(n)?'':'.ts')),console});return exports;}
const i=load(path.join(root,'src/utils/i18n.ts')),l=load(path.join(root,'src/utils/localizedData.ts')),d=load(path.join(root,'src/data/initialData.ts'));
assert.equal(i.LANGUAGES.length,11);
function keys(v,p=''){return Object.entries(v).flatMap(([k,x])=>typeof x==='object'?keys(x,p+k+'.'):[p+k]);}
for(const lang of ['zh','ru','pt','nl']){
 assert.deepEqual(keys(i.TRANSLATIONS[lang]).sort(),keys(i.TRANSLATIONS.en).sort());
 for(const category of d.INITIAL_CATEGORIES)for(const project of category.projects){const localized=l.getLocalizedProject(project,lang);assert(localized.title);assert(!/[\u0600-\u06ff]/.test(localized.title+localized.status),lang+' '+project.id);}
 assert(i.isLanguageCode(lang));
}
assert(!i.isLanguageCode('bogus'));console.log('PASS: 11 languages, complete UI dictionary keys, localized project titles and status in all four new languages.');
