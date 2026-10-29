// One content source. Only status: 'published' may appear on the public site.
window.MAKA_CONTENT = (() => {
  // Owner-approved service groups (28 October 2026). Work items are nested under each group.
  // Generated photographs illustrate the trade; they are not photographs of MAKA-STAV jobs.
  const services = [
    {
      id:'elektroinstalace', name:'Elektroinstalační práce', icon:'bolt',
      description:'Nové elektrické rozvody, světla i ovládací prvky v návaznosti na rekonstrukci. Součástí může být návrh LED osvětlení a potřebná revize.',
      image:'public/images/services/elektroinstalace.jpg', imageAlt:'Ilustrační fotografie montáže stropního světla a vypínače',
      work:[
        ['Nové rozvody','Příprava a vedení elektrických okruhů podle využití prostoru.'],
        ['Instalace osvětlení','Montáž svítidel a příprava světelných bodů.'],
        ['Zásuvky a vypínače','Umístění a montáž podle domluveného řešení.'],
        ['LED osvětlení a pásky','Návrh umístění a instalace včetně potřebného napájení.'],
        ['Revize','Kontrola a revizní zpráva podle rozsahu provedených prací.']
      ], status:'published'
    },
    {
      id:'stavebni-prace', name:'Stavební práce', icon:'wall',
      description:'Příprava prostoru, úpravy dispozic, povrchy a dokončení. Jednotlivé práce lze spojit do navazující rekonstrukce nebo poptat samostatně.',
      image:'public/images/services/stavebni-prace.jpg', imageAlt:'Ilustrační fotografie pokládky obkladů při stavebních pracích',
      work:[
        ['Bourací a vyklízecí práce','Odstranění původních prvků a příprava prostoru na další práce.'],
        ['Sádrokartony, příčky a dispozice','Nové konstrukce a změny členění interiéru podle technického řešení.'],
        ['Obklady a dlažby','Příprava podkladu, pokládka a dokončení spár.'],
        ['Omítky a štuky','Oprava a sjednocení povrchů stěn a stropů.'],
        ['Montáž dveří a zárubní','Zaměření, osazení a dokončení dveřních otvorů.'],
        ['Jádrové vrtání','Přesné průchody konstrukcemi pro navazující instalace.'],
        ['Výmalby a stěrky','Příprava povrchů a finální úprava stěn.'],
        ['Dokončovací práce','Zapravení detailů a dokončení prostoru před předáním.']
      ], status:'published'
    },
    {
      id:'vodoinstalace', name:'Vodoinstalace', icon:'drop',
      description:'Nové rozvody vody a instalace sanitárního vybavení pro koupelny, kuchyně a další části interiéru.',
      image:'public/images/services/vodoinstalace.jpg', imageAlt:'Ilustrační fotografie instalace vodovodního potrubí a sanity',
      work:[
        ['Nové rozvody','Příprava a montáž přívodů vody podle dispozice prostoru.'],
        ['Sanita a vybavení','Osazení vybraných zařizovacích předmětů a jejich připojení.']
      ], status:'published'
    },
    {
      id:'podlaharske-prace', name:'Podlahářské práce', icon:'floor',
      description:'Nové podlahy i obnova stávajících povrchů. Vhodný postup se odvíjí od typu krytiny a stavu podkladu.',
      image:'public/images/services/podlaharske-prace.jpg', imageAlt:'Ilustrační fotografie pokládky dřevěné podlahy',
      work:[
        ['Pokládka podlah','Dřevěné, vinylové a laminátové krytiny podle prostoru a podkladu.'],
        ['Parkety','Pokládka nebo úprava parketových podlah.'],
        ['Renovace podlah','Obnova vhodných stávajících podlah podle jejich stavu.'],
        ['Vyrovnání podkladů','Příprava rovného podkladu pro finální krytinu.']
      ], status:'published'
    },
    {
      id:'hromosvody', name:'Hromosvody', icon:'lightning',
      description:'Řešení ochrany objektu před bleskem od návrhu přes dokumentaci a montáž po revizi.',
      image:'public/images/services/hromosvody.jpg', imageAlt:'Ilustrační fotografie instalace ochranného vodiče na střeše',
      work:[
        ['Návrh řešení','Posouzení objektu a volba vhodného postupu.'],
        ['Projektová dokumentace','Příprava podkladů pro navržený systém.'],
        ['Realizace','Montáž hromosvodu podle schváleného řešení.'],
        ['Revize','Kontrola provedení a potřebná revizní zpráva.']
      ], status:'published'
    }
  ].map(service => ({...service, category:service.name}));
  const steps = [
    ['První setkání','Probereme vaše představy a podle potřeby si prohlédneme prostor. Seznámíme se s technickým stavem a navrhovanými úpravami.'],
    ['Návrh řešení','Společně upřesníme vhodný postup, rozsah prací a možnosti provedení. U rozsáhlejších projektů lze zapojit projektanta nebo interiérového designéra.'],
    ['Cenová nabídka','Připravíme návrh rozsahu prací a rozpočet podle konkrétního zadání. Společně projdeme materiály, návaznosti a podmínky.'],
    ['Dohoda a plánování','Po odsouhlasení podmínek stanovíme postup, harmonogram a organizační detaily. U větších projektů vše vhodně upravíme smluvně.'],
    ['Realizace','Zahájíme práce a koordinujeme jednotlivé činnosti. Průběžně řešíme případné změny a technické okolnosti.'],
    ['Dokončení a předání','Po dokončení prací společně zkontrolujeme výsledek a předáme hotový prostor v dohodnutém rozsahu.']
  ];
  const stages = [
  {
    "work": [
      "Vyklizení a ochrana prostoru",
      "Demontáže a bourací práce",
      "Úprava příček podle projektu",
      "Příprava na nové instalace"
    ],
    "service": "Stavební práce"
  },
  {
    "work": [
      "Příprava elektrických okruhů",
      "Umístění zásuvek a vypínačů",
      "Vedení potřebných instalací",
      "Kontroly před zakrytím"
    ],
    "service": "Elektroinstalační práce"
  },
  {
    "work": [
      "Montáž konstrukcí",
      "Dokončení příček",
      "Příprava stropních prvků",
      "Zakrytí vybraných instalací"
    ],
    "service": "Stavební práce"
  },
  {
    "work": [
      "Omítání a stěrkování",
      "Vyrovnání povrchů",
      "Příprava podkladů",
      "Dokončení stavebních detailů"
    ],
    "service": "Stavební práce"
  },
  {
    "work": [
      "Penetrace a malířské práce",
      "Dokončení stěn",
      "Povrchové úpravy",
      "Příprava na kompletaci"
    ],
    "service": "Stavební práce"
  },
  {
    "work": [
      "Pokládka podlah",
      "Dokončení elektroinstalačních prvků",
      "Montáž dveří a lišt",
      "Finální instalační a montážní práce"
    ],
    "service": "Podlahářské práce"
  },
  {
    "work": [
      "Závěrečná kontrola",
      "Dokončení detailů",
      "Úklid prostoru",
      "Předání dokončeného díla"
    ],
    "service": "Stavební práce"
  }
];
  // Add verified customer media and metadata before setting status to published.
  const projects = [];
  const partners = [];
  // Three practical, price-free guides for the site's core search topics.
  // The update below reports only a change verifiable on this website.
  const articles = [
    {
      slug:'rekonstrukce-bytu-praha-jak-pripravit-poptavku',
      title:'Rekonstrukce bytu v Praze: jak připravit zadání a poptávku',
      seoTitle:'Rekonstrukce bytu v Praze: jak připravit poptávku',
      seoDescription:'Přehled toho, co si ujasnit před rekonstrukcí bytu v Praze a jak připravit srozumitelnou poptávku pro stavební firmu.',
      category:'Rady a tipy',date:'2026-10-28',
      excerpt:'Seznam priorit, fotografie prostoru, rozsah prací a představa o termínu. Co připravit, aby první domluva měla konkrétní základ?',
      image:'public/images/references/demo-living-pair.jpg',imageAlt:'Ilustrační vizualizace proměny obytného prostoru',
      sections:[
        {heading:'Začněte tím, co má být po rekonstrukci jiné',paragraphs:['Sepište si místnosti a problémy, které chcete vyřešit. U každé položky rozlišujte, co je pro vás nezbytné a co by bylo příjemné, pokud to umožní rozpočet a stav bytu. Takový seznam pomůže při první prohlídce i při pozdějším rozhodování.','Přemýšlejte také o tom, jak prostor používáte dnes a jak ho chcete používat po úpravě. Někdo potřebuje více zásuvek, jiný úložný prostor nebo koupelnu, která se lépe udržuje. Výsledek se plánuje snáz, když je jasný důvod změny.']},
        {heading:'Připravte podklady k bytu',paragraphs:['Do první poptávky se hodí lokalita, přibližná velikost bytu, seznam dotčených místností a několik aktuálních fotografií. Máte-li půdorys nebo informace o předchozích úpravách, přiložte je také. Nevadí, pokud dokumentace není úplná; nejasnosti se dají upřesnit při prohlídce.','U staršího bytu nemusí být vše vidět před začátkem prací. Považujte proto první zadání za výchozí podklad pro domluvu, ne za definitivní technický projekt.']},
        {heading:'Ujasněte rozsah, termín a způsob bydlení',paragraphs:['Napište, zda plánujete jednu místnost, několik navazujících úprav nebo kompletní rekonstrukci. Zmínka o koupelně, rozvodech, podlahách či dispoziční změně pomůže zvolit správný postup a zapojit potřebné profese.','Přidejte představu o termínu zahájení a o tom, zda budete během prací v bytě bydlet. Přesný harmonogram vznikne až po upřesnění rozsahu, ale tyto informace jsou pro plánování důležité.']},
        {heading:'Co poslat v první zprávě',paragraphs:['Stručná poptávka může obsahovat adresu nebo městskou část, seznam požadovaných prací, fotografie, očekávaný termín a kontakt. Pokud máte orientační rozpočtový rámec, pomůže při hledání odpovídajícího řešení. Konkrétní nabídka má vycházet z domluveného rozsahu a stavu prostoru.'],bullets:['Lokalita a typ prostoru','Co chcete změnit a co ponechat','Fotografie a dostupný půdorys','Představa o termínu','Telefon nebo e-mail pro domluvu prohlídky']}
      ],cta:'Probrat rekonstrukci bytu',status:'published'
    },
    {
      slug:'rekonstrukce-koupelny-co-si-ujasnit',
      title:'Rekonstrukce koupelny: co si ujasnit před zahájením prací',
      seoTitle:'Rekonstrukce koupelny: příprava před začátkem prací',
      seoDescription:'Praktický přehled otázek k dispozici, vybavení, rozvodům a povrchům před rekonstrukcí koupelny.',
      category:'Rady a tipy',date:'2026-10-27',
      excerpt:'Sprcha nebo vana, úložné místo, zásuvky, obklady a návaznost prací. Připravte si rozhodnutí, která ovlivní podobu nové koupelny.',
      image:'public/images/services/vodoinstalace.jpg',imageAlt:'Ilustrační fotografie montáže rozvodů a sanitárního vybavení',
      sections:[
        {heading:'Jak má koupelna fungovat každý den',paragraphs:['Nejdřív si představte běžný provoz. Kolik lidí koupelnu používá, co potřebujete ukládat a kde by měl zůstat volný prostor? Rozhodnutí o sprše, vaně, umyvadle a úložných místech spolu souvisejí, proto je dobré řešit je jako celek.','Fotografie současné koupelny a jednoduchý náčrt s rozměry pomohou popsat, co vám dnes vyhovuje a co chcete změnit. Inspirativní snímky jsou užitečné, když ukazují konkrétní detail, který se vám líbí.']},
        {heading:'Rozvody, osvětlení a vybavení řešte společně',paragraphs:['Umístění zařizovacích předmětů ovlivňuje přípravu vodovodních rozvodů. Podobně je potřeba včas promyslet světla, vypínače a zásuvky. Konkrétní technické řešení má vždy vycházet z prostoru a posouzení příslušných odborníků.','Před zahájením je vhodné ujasnit, které prvky zůstávají na místě a které se mají přesunout. Předejdete tak zbytečnému vracení k již dokončeným částem.']},
        {heading:'Povrchy a detaily tvoří jeden celek',paragraphs:['U obkladů, dlažby a dalších povrchů neřešte jen vzhled. Promyslete také jejich návaznost na vybavení, výšku obkladů, umístění zrcadla a způsob údržby. Vzorky materiálů je dobré porovnat přímo v prostoru a v jeho světle.','Ptejte se, co bude součástí nabídky: příprava podkladu, instalace, obklady, montáž vybavení a dokončovací práce. Přehledný rozsah usnadní porovnání variant.']},
        {heading:'Před poptávkou si připravte krátký seznam',paragraphs:['Stačí několik fotografií, rozměry prostoru, seznam požadovaného vybavení a poznámka, co vám na současné koupelně vadí. Pokud některé rozhodnutí ještě nemáte, napište to otevřeně. Návrh lze společně upřesnit.'],bullets:['Rozměry a fotografie současné koupelny','Co z vybavení ponechat nebo vyměnit','Představa o sprše, vaně a úložném prostoru','Požadavky na světlo a zásuvky','Materiály, které se vám líbí']}
      ],cta:'Poptat rekonstrukci koupelny',status:'published'
    },
    {
      slug:'jak-vybrat-podlahu-do-bytu',
      title:'Jak vybrat podlahu do bytu: dřevo, vinyl nebo laminát?',
      seoTitle:'Jak vybrat podlahu do bytu: dřevo, vinyl, laminát',
      seoDescription:'Na co se ptát při výběru nové podlahy do bytu a proč je důležité posoudit i stav podkladu.',
      category:'Rady a tipy',date:'2026-10-26',
      excerpt:'Vzhled krytiny je jen jedna část rozhodnutí. Důležitý je způsob používání místnosti, stav podkladu i návaznost na dveře a další povrchy.',
      image:'public/images/services/podlaharske-prace.jpg',imageAlt:'Ilustrační fotografie pokládky dřevěné podlahy',
      sections:[
        {heading:'Začněte místností, ne katalogem',paragraphs:['Podlaha v obývacím pokoji, chodbě nebo ložnici dostává jiné nároky podle toho, jak prostor používáte. Sepište si, co od nové krytiny čekáte: vzhled, pocit při chůzi, způsob údržby a návaznost na zbytek bytu. Až potom vybírejte konkrétní dekor.','Pokud sjednocujete více místností, promyslete přechody mezi nimi. Rozdílné výšky a dveřní otvory mohou ovlivnit výsledný detail stejně jako samotná krytina.']},
        {heading:'Dřevo, vinyl a laminát porovnávejte podle konkrétního výrobku',paragraphs:['Každá z těchto skupin nabízí různé podoby a konstrukce. Nelze proto rozhodnout jen podle názvu materiálu. Porovnejte vybraný výrobek, jeho doporučené použití, vzhled na větším vzorku a požadavky výrobce na pokládku a údržbu.','U dřevěné podlahy může být důležitá možnost budoucí obnovy povrchu, u jiných krytin zase zvolený systém pokládky. Nejlepší volba závisí na konkrétním prostoru a vašich prioritách.']},
        {heading:'Podklad je součástí výsledku',paragraphs:['Před výběrem je potřeba posoudit stávající podlahu a podklad. Nerovnosti nebo nevhodná skladba mohou vyžadovat přípravu ještě před pokládkou nové krytiny. Rozsah těchto prací nelze spolehlivě určit pouze z fotografie dekoru.','Při poptávce proto ukažte nejen materiál, který se vám líbí, ale také současný stav místnosti. Pomůže to připravit smysluplný postup a nabídku.']},
        {heading:'Otázky, které si položit před objednáním',paragraphs:['Vzorky si prohlédněte v denním i umělém světle a ověřte doporučení pro konkrétní výrobek. Zeptejte se také, jak budou řešeny lišty, prahy a napojení na sousední místnosti.'],bullets:['Kde bude podlaha položená a jak se místnost používá?','Jaký je stav původního podkladu?','Jak bude krytina navazovat na dveře a okolní místnosti?','Jaké pokyny výrobce platí pro pokládku a údržbu?']}
      ],cta:'Poptat podlahářské práce',status:'published'
    },
    {
      slug:'novy-prehled-sluzeb-maka-stav',
      title:'Nový přehled služeb na webu MAKA-STAV',
      seoTitle:'Nový přehled služeb MAKA-STAV',
      seoDescription:'Na webu MAKA-STAV je nyní přehled pěti hlavních kategorií prací a jejich konkrétního rozsahu.',
      category:'Aktuality',date:'2026-10-28',
      excerpt:'Služby jsme na webu uspořádali do pěti oblastí: elektroinstalační, stavební, vodoinstalační a podlahářské práce a hromosvody.',
      image:'public/images/services/stavebni-prace.jpg',imageAlt:'Ilustrační fotografie stavebních prací v interiéru',
      sections:[
        {heading:'Pět přehledných oblastí',paragraphs:['Přehled na webu nyní sdružuje elektroinstalační práce, stavební práce, vodoinstalaci, podlahářské práce a hromosvody. Po otevření kategorie uvidíte konkrétní činnosti, které do ní patří.','Cílem změny je usnadnit orientaci při menší opravě i při plánování větší rekonstrukce. Rozsah jednotlivé zakázky vždy upřesníme podle prostoru a vaší poptávky.']},
        {heading:'Kde začít',paragraphs:['Můžete projít přehled služeb nebo rovnou popsat svůj projekt v nezávazné poptávce. Pokud si nejste jistí, do které oblasti vaše zadání patří, zvolte v poptávce možnost „Potřebuji poradit“.']}
      ],cta:'Prohlédnout služby',status:'published'
    }
  ];
  const designProjects = [];
  const articleIdeas = ['Jak naplánovat rekonstrukci bytu','Kolik stojí rekonstrukce bytu v Praze','Rekonstrukce koupelny krok za krokem','Jak vybrat podlahovou krytinu','Kompletní versus částečná rekonstrukce','Kdy vyměnit elektroinstalaci','Jak připravit byt před rekonstrukcí','Nejčastější chyby při rekonstrukci','Výhody interiérových vizualizací','Co zahrnuje rekonstrukce na klíč'].map(title=>({title,status:'draft'}));
  // Supply an audited HTTPS endpoint and server-side spam protection before enabling direct submission.
  const formEndpoint = null;
  return {services,steps,stages,projects,partners,articles,designProjects,articleIdeas,formEndpoint};
})();
