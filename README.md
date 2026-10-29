# MAKA-STAV — statický web a obsahový model

Projekt je statický HTML/CSS/JS bez CMS a bez balíčků. Spuštění: `node serve.mjs` (standardně `http://127.0.0.1:4173/`; port lze změnit proměnnou `PORT`). Nasazovanou složkou je ``.

## Struktura

- `index.html`, `redesign.css`, `v3.css` — homepage a vizuální systém.
- `content-data.js` — pět hlavních kategorií služeb podle soupisu majitele z 28. 10. 2026, jejich podkategorie, šest kroků, popisky etap a model pro realizace, partnery, články a návrhy interiérů. Veřejně se zobrazí jen položky se `status: 'published'`.
- `v3.js` — rozbalování kategorií Service Wall, časová osa, propojení poptávky a podmíněné veřejné sekce.
- `public/images/services/` — pět generovaných ilustračních fotografií jednotlivých oborů; nejde o skutečné zakázky MAKA-STAV.
- `scenes.js`, `room.css`, `app.js` — zachovaná ilustrace sedmi etap a ovládání pokoje.
- `references-data.js`, `references.js`, `references.css` — galerie před/po. Dvojice snímků jsou generované vizualizace, **nejde o zakázky MAKA-STAV**.
- `tools/generate-content-pages.mjs` — generuje `/realizace/`, `/blog/`, kategorie a detaily pro zveřejněné položky. Při změně dat spustit `node tools/generate-content-pages.mjs`.
- `blog.css` — vzhled článků, přehledu Blogu a náhledů na homepage.

Bez ověřených fotografií nejsou realizace na homepage ani v navigaci. Blog nyní obsahuje tři praktické průvodce k plánování rekonstrukce a jednu faktickou aktualitu o změně přehledu služeb na webu. Články neuvádějí neověřené ceny ani stavebněprávní nebo normové požadavky. Jejich ilustrace nejsou fotografie zakázek MAKA-STAV. Celé demo včetně blogu zůstává `noindex`; před indexací na ostré doméně je vhodná redakční kontrola a doplnění vlastních zkušeností firmy.

## Formulář

Formulář nyní **neodesílá na server**: po validaci připraví e-mail v poštovní aplikaci návštěvníka a jasně o tom informuje. Přímé odeslání je připravené přes `formEndpoint` v `content-data.js`; endpoint musí být HTTPS a vracet JSON `{ "ok": true }` až po úspěšném doručení. Před zapnutím je nutný server s ochranou proti spamu, ověřená adresa příjemce, souhlas s nakládáním s údaji a provozní kontrola. Přílohy nejsou zapnuté, protože chybí bezpečné úložiště.

## Vydání a SEO

Demo obsahuje `noindex`, protože obsahuje vizualizace a předběžný redakční obsah. `robots.txt` blokuje blog a nedokončené realizace; `sitemap.xml` je základ pro budoucí ostrou doménu. Před veřejnou indexací je potřeba přepnout canonical na finální doménu a upravit robots/sitemap. Telefon a e-mail byly ověřeny na původním webu 28. 10. 2026. Původní WordPress URL jsou zdokumentované v `docs/redirect-map.md`; přesměrování na jejich doméně nebyla nasazena.

## Chybějící podklady

Skutečné dvojice fotografií před/po, dokončené realizace, potvrzené profese a designoví partneři, jejich jména a loga, firemní aktuality, redakční schválení a doplnění vlastní zkušenosti u tří průvodců, další firemní údaje, backend formuláře a právní texty k osobním údajům. Nevkládat vymyšlené reference, statistiky ani partnerství.

## Poptávkový průvodce (29. 10. 2026)

Samostatná stránka `/poptavka/` nahrazuje původní sedmietapovou animaci. Na homepage je pouze její krátká prezentace, jednoduchý formulář zůstává zachovaný. Zdroj aplikace: `poptavka/`; propojení CTA: `wizard-links.js`; serverová integrace: `server/`. Odesílání v demu není nakonfigurované a úspěch se nesimuluje.

Spuštění serverových testů: `node --test tests/inquiry.test.mjs`. Viz `docs/inquiry-integration.md` a `docs/inquiry-qa.md`.
