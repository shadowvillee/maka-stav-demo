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
    {work:['Bourací práce','Příprava prostoru','Úpravy příček','Zednické práce'],service:'Stavební práce'},
    {work:['Elektrické rozvody','Vodoinstalace','Odpady','Příprava zásuvek'],service:'Elektroinstalační práce'},
    {work:['Vyrovnání stěn','Štukování','Sádrokartony','Příprava povrchů'],service:'Stavební práce'},
    {work:['Penetrace','Malířské práce','Dokončení stěn'],service:'Stavební práce'},
    {work:['Stropní konstrukce','Příprava osvětlení','Montáž svítidel'],service:'Elektroinstalační práce'},
    {work:['Příprava podkladů','Pokládka','Soklové lišty'],service:'Podlahářské práce'},
    {work:['Dokončovací práce','Kontrola','Úklid','Předání'],service:'Stavební práce'}
  ];
  // Add verified customer media and metadata before setting status to published.
  const projects = [];
  const partners = [];
  const articles = [];
  const designProjects = [];
  const articleIdeas = ['Jak naplánovat rekonstrukci bytu','Kolik stojí rekonstrukce bytu v Praze','Rekonstrukce koupelny krok za krokem','Jak vybrat podlahovou krytinu','Kompletní versus částečná rekonstrukce','Kdy vyměnit elektroinstalaci','Jak připravit byt před rekonstrukcí','Nejčastější chyby při rekonstrukci','Výhody interiérových vizualizací','Co zahrnuje rekonstrukce na klíč'].map(title=>({title,status:'draft'}));
  // Supply an audited HTTPS endpoint and server-side spam protection before enabling direct submission.
  const formEndpoint = null;
  return {services,steps,stages,projects,partners,articles,designProjects,articleIdeas,formEndpoint};
})();
