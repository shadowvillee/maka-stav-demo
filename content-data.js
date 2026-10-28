// One content source. Only status: 'published' may appear on the public site.
window.MAKA_CONTENT = (() => {
  const items = [
    ['Rekonstrukce bytů','Rekonstrukce bytů a domů','home','Navazující práce od přípravy prostoru po dokončení interiéru.','Příprava prostoru|Rozvody a stavební úpravy|Povrchy a dokončení'],
    ['Rekonstrukce domů','Rekonstrukce bytů a domů','home','Úpravy interiéru domu podle technického stavu a domluveného rozsahu.','Prohlídka a rozsah|Stavební úpravy|Dokončovací práce'],
    ['Částečné rekonstrukce','Rekonstrukce bytů a domů','plan','Proměna vybraných místností nebo částí interiéru.','Návrh rozsahu|Úprava dispozice|Nové povrchy'],
    ['Rekonstrukce koupelen','Koupelny','bath','Stavební a obkladačské práce při proměně koupelny.','Příprava prostoru|Hydroizolace|Obklady a montáž'],
    ['Rekonstrukce bytových jader','Koupelny','bath','Nové řešení bytového jádra podle možností prostoru.','Demontáž|Příčky a rozvody|Obklady a vybavení'],
    ['Bourací práce','Stavební práce','hammer','Příprava prostoru a odstranění vybraných konstrukcí.','Zajištění prostoru|Demontáž|Odvoz odpadu dle dohody'],
    ['Zednické práce','Stavební práce','wall','Opravy a úpravy zdiva a navazujících stavebních částí.','Zdivo|Zapravení|Příprava povrchů'],
    ['Příčky a úpravy dispozic','Stavební práce','plan','Úprava členění místností podle technického řešení.','Zaměření|Příprava konstrukce|Dokončení příčky'],
    ['Sádrokartony','Stavební práce','wall','Příčky, podhledy a další konstrukce ze sádrokartonu.','Nosná konstrukce|Desky a tmelení|Příprava povrchu'],
    ['Omítky a štuky','Stavební práce','wall','Sjednocení a vyhlazení stěn před finální úpravou.','Příprava podkladu|Omítání|Štukování'],
    ['Obklady a dlažby','Koupelny','tiles','Pokládka obkladů a dlažeb v koupelně i dalších prostorech.','Příprava podkladu|Pokládka|Spárování'],
    ['Elektroinstalace','Elektroinstalace','bolt','Rozvody a úpravy elektroinstalace v rámci rekonstrukce prostřednictvím odborné profese.','Návrh tras|Rozvody|Zapojení a kontrola odborníkem'],
    ['Osvětlení a zásuvky','Elektroinstalace','light','Příprava světelných bodů a zásuvek podle budoucího využití prostoru.','Rozmístění|Příprava kabeláže|Montáž odborníkem'],
    ['Vodoinstalace','Vodoinstalace','drop','Úpravy přívodů vody a odpadů při rekonstrukci prostřednictvím odborné profese.','Návrh vedení|Příprava rozvodů|Montáž a kontrola odborníkem'],
    ['Sanitární vybavení','Vodoinstalace','drop','Osazení vybavení koupelny podle zvoleného řešení.','Výběr a příprava|Montáž|Dokončení'],
    ['Malířské práce','Výmalby a podlahy','brush','Nová výmalba a finální vzhled stěn a stropů.','Příprava a zakrytí|Penetrace|Výmalba'],
    ['Pokládka podlah','Výmalby a podlahy','floor','Pokládka podlahové krytiny podle typu prostoru a podkladu.','Příprava podkladu|Pokládka|Lišty'],
    ['Vyrovnávání podlah','Výmalby a podlahy','floor','Příprava rovného a vhodného podkladu pro novou krytinu.','Posouzení podkladu|Vyrovnání|Kontrola'],
    ['Montáž dveří a obložek','Stavební práce','door','Osazení dveří a obložek jako součást dokončení interiéru.','Zaměření|Příprava otvoru|Montáž'],
    ['Drobné opravy a dokončení','Stavební práce','tools','Menší úpravy a poslední detaily po rekonstrukci.','Opravy|Zapravení|Dokončení detailů'],
  ];
  const serviceImages = {
    'Rekonstrukce bytů a domů':'public/images/gallery-contact.jpg',
    'Koupelny':'public/images/references/demo-bathroom-pair.jpg',
    'Stavební práce':'public/images/gallery-contact.jpg',
    'Elektroinstalace':'public/images/gallery-contact.jpg',
    'Vodoinstalace':'public/images/gallery-contact.jpg',
    'Výmalby a podlahy':'public/images/gallery-contact.jpg'
  };
  const services = items.map(([name,category,icon,description,work],index) => ({
    id:`service-${index+1}`,name,category,icon,description,
    work:work.split('|'),image:serviceImages[category],status:'published'
  }));
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
    {work:['Elektrické rozvody','Vodoinstalace','Odpady','Příprava zásuvek'],service:'Elektroinstalace'},
    {work:['Vyrovnání stěn','Štukování','Sádrokartony','Příprava povrchů'],service:'Stavební práce'},
    {work:['Penetrace','Malířské práce','Dokončení stěn'],service:'Výmalby a podlahy'},
    {work:['Stropní konstrukce','Příprava osvětlení','Montáž svítidel'],service:'Elektroinstalace'},
    {work:['Příprava podkladů','Pokládka','Soklové lišty'],service:'Výmalby a podlahy'},
    {work:['Dokončovací práce','Kontrola','Úklid','Předání'],service:'Rekonstrukce bytů a domů'}
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
