// ServiceDefinition and QuestionDefinition: names and descriptions come from the site's catalog.
const choice=(id,label,options,when)=>({id,label,type:'select',options:[...options,'Nevím / potřebuji poradit'],when});
const multi=(id,label,options)=>({id,label,type:'multi',options:[...options,'Nevím / potřebuji poradit']});
const number=(id,label)=>({id,label,type:'number'});
const text=(id,label,when)=>({id,label,type:'text',when});
const yes=(id,label)=>choice(id,label,['Ano','Ne']);
const materials=choice('materials','Materiály',['Mám vlastní','Chci poradit','Chci zajistit dodání','Ještě nevím']);
const design=multi('design','Návrh a design',['Chci návrh','Chci 3D vizualizaci','Chci konzultaci','Nemám zájem']);
export const profiles={
 tiles:[multi('surface','Kde chcete nové obklady?',['Stěny','Podlaha','Sprchový kout','Jiné místo']),number('area','Přibližná plocha obkladu (m²)'),yes('remove','Odstranit původní obklady?'),choice('base','Stav podkladu',['Připravený','Potřebuje opravu','Potřebuje vyrovnat']),materials,design,text('otherSurface','Popište jiné místo obkladu',a=>Array.isArray(a.surface)&&a.surface.includes('Jiné místo'))],
 paint:[number('area','Plocha stěn a stropů (m²)'),yes('ceiling','Malovat také strop?'),yes('repair','Jsou potřeba opravy povrchů?'),yes('colors','Poradit s výběrem barev?'),materials,design],
 floor:[number('area','Podlahová plocha (m²)'),choice('cover','Typ krytiny',['Dřevo','Vinyl','Laminát','Parkety','Jiná']),yes('remove','Odstranit původní krytinu?'),yes('level','Vyrovnat podklad?'),yes('skirting','Soklové lišty?'),materials],
 electric:[choice('mode','Rozsah elektroinstalace',['Nové rozvody','Úprava stávajících','Oprava','Revize']),number('sockets','Počet zásuvek'),number('switches','Počet vypínačů'),number('lights','Počet světelných bodů'),yes('revision','Požadujete revizi?'),yes('assess','Potřebujete odborné posouzení?')],
 water:[multi('system','Jaké rozvody?',['Voda','Odpady']),choice('mode','Nové rozvody nebo oprava?',['Nové rozvody','Oprava / úprava']),text('equipment','Připojovaná zařízení'),yes('remove','Demontovat staré rozvody?'),materials],
 sanitary:[multi('equipment','Jaké vybavení chcete osadit?',['WC','Umyvadlo','Vana','Sprcha','Baterie']),number('count','Počet kusů'),choice('mode','Typ montáže',['Výměna','Nová instalace']),yes('existing','Připojení na stávající rozvody?'),materials,design],
 drywall:[multi('type','Typ konstrukce',['Příčka','Podhled','Předstěna']),text('dimensions','Přibližné rozměry / plocha'),choice('insulation','Izolace a akustika',['Tepelná izolace','Akustická izolace','Obojí','Bez zvláštního požadavku']),yes('lights','Příprava osvětlení?'),materials],
 demolition:[text('what','Co se má odstranit?'),text('size','Přibližný rozsah'),yes('waste','Odvoz suti?'),choice('structure','Typ konstrukce',['Nenosná','Nosná','Vybavení / povrchy'])],
 doors:[number('count','Počet dveří'),choice('type','Typ dveří',['Otočné','Posuvné','Jiné']),choice('mode','Typ montáže',['Výměna','Nová montáž']),yes('frame','Nové zárubně?'),yes('opening','Úprava stavebních otvorů?'),materials],
 lightning:[choice('mode','Požadovaná práce',['Nová instalace','Oprava','Revize','Návrh / dokumentace']),choice('building','Typ objektu',['Rodinný dům','Bytový dům','Jiný objekt']),yes('documents','Máte dokumentaci?'),yes('assess','Potřebujete odborné posouzení?')],
 complete:[choice('building','Typ objektu',['Byt','Dům']),number('area','Přibližná podlahová plocha (m²)'),number('rooms','Počet místností'),text('scope','Co má rekonstrukce zahrnovat?'),choice('systems','Stav rozvodů',['Původní','Částečně obnovené','Nové']),design],
 drilling:[number('count','Počet otvorů'),text('diameter','Průměr a hloubka otvorů'),text('structure','Materiál konstrukce'),yes('assess','Potřebujete zaměření nebo posouzení?')],
 design:[design,number('area','Přibližná plocha (m²)'),text('style','Představa o interiéru'),materials],
 general:[text('scope','Co potřebujete provést?'),text('size','Přibližný rozsah'),yes('visit','Potřebujete zaměření?'),materials]
};
export function buildCatalog(content){
 const mapping={elektroinstalace:['electric','electric','electric','electric','electric'],'stavebni-prace':['demolition','drywall','tiles','general','doors','drilling','paint','general'],vodoinstalace:['water','sanitary'],'podlaharske-prace':['floor','floor','floor','floor'],hromosvody:['lightning','lightning','lightning','lightning']};
 const entries=content.services.filter(s=>s.status==='published').flatMap(s=>s.work.map(([name,description],i)=>({id:s.id+'-'+i,name,description,group:s.name,groupId:s.id,icon:s.icon,profile:mapping[s.id]?.[i]||'general',questions:profiles[mapping[s.id]?.[i]||'general']})));
 return [...entries,{id:'complete',name:'Kompletní rekonstrukce',group:'Celkový projekt',profile:'complete',questions:profiles.complete,icon:'home'}, {id:'design',name:'Interiérový design a vizualizace',group:'Návrh interiéru',profile:'design',questions:profiles.design,icon:'plan'}];
}
export const roomTypes=['Koupelna','WC','Kuchyně','Obývací pokoj','Ložnice','Dětský pokoj','Pracovna','Chodba','Další místnost','Celý byt nebo dům'];
export const scopes=['Jedna místnost','Více místností','Celý byt nebo dům','Konkrétní stavební práce','Potřebuji poradit'];
export const phases=['Rozsah','Místnosti','Práce','Podrobnosti','Místo a termín','Kontrola a kontakt'];
export const limits={count:10,fileBytes:15*1024*1024,totalBytes:50*1024*1024};
export function relevantWorks(catalog,type){const wet=['Koupelna','WC','Kuchyně'].includes(type);const priority=wet?['tiles','water','sanitary','electric','paint','complete']:['paint','general','floor','electric','drywall','doors','complete'];return priority.map(p=>catalog.find(s=>s.profile===p)).filter(Boolean);}
