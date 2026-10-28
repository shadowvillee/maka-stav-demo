# MAKA-STAV — statický web a obsahový model

Projekt je statický HTML/CSS/JS bez CMS a bez balíčků. Spuštění: `node serve.mjs` (standardně `http://127.0.0.1:4173/`; port lze změnit proměnnou `PORT`). Nasazovanou složkou je `dist/`.

## Struktura

- `dist/index.html`, `redesign.css`, `v3.css` — homepage a vizuální systém.
- `dist/content-data.js` — pět hlavních kategorií služeb podle soupisu majitele z 28. 10. 2026, jejich podkategorie, šest kroků, popisky etap a model pro realizace, partnery, články a návrhy interiérů. Veřejně se zobrazí jen položky se `status: 'published'`.
- `dist/v3.js` — rozbalování kategorií Service Wall, časová osa, propojení poptávky a podmíněné veřejné sekce.
- `dist/public/images/services/` — pět generovaných ilustračních fotografií jednotlivých oborů; nejde o skutečné zakázky MAKA-STAV.
- `dist/scenes.js`, `room.css`, `app.js` — zachovaná ilustrace sedmi etap a ovládání pokoje.
- `dist/references-data.js`, `references.js`, `references.css` — galerie před/po. Dvojice snímků jsou generované vizualizace, **nejde o zakázky MAKA-STAV**.
- `tools/generate-content-pages.mjs` — generuje `/realizace/`, `/blog/`, kategorie a detaily pro schválené položky. Při změně dat spustit `node tools/generate-content-pages.mjs`.

Bez ověřených fotografií a článků nejsou realizace ani blog na homepage a v navigaci. Připravené podstránky mají `noindex` a neobsahují falešné karty. Stránka se generuje i bez obsahu, aby šlo zkontrolovat strukturu. Při přidání schváleného záznamu je potřeba dodat `slug`, kvalitní fotografie, ověřený popis a poté spustit generátor. Do produkční navigace lze tyto stránky zařadit až po kontrole obsahu.

## Formulář

Formulář nyní **neodesílá na server**: po validaci připraví e-mail v poštovní aplikaci návštěvníka a jasně o tom informuje. Přímé odeslání je připravené přes `formEndpoint` v `content-data.js`; endpoint musí být HTTPS a vracet JSON `{ "ok": true }` až po úspěšném doručení. Před zapnutím je nutný server s ochranou proti spamu, ověřená adresa příjemce, souhlas s nakládáním s údaji a provozní kontrola. Přílohy nejsou zapnuté, protože chybí bezpečné úložiště.

## Vydání a SEO

Demo obsahuje `noindex`, protože obsahuje vizualizace a rozpracované podstránky. `robots.txt` blokuje nedokončené podstránky; `sitemap.xml` je základ pro budoucí ostrou doménu. Před veřejnou indexací je potřeba přepnout canonical na finální doménu a upravit robots/sitemap. Telefon a e-mail byly ověřeny na původním webu 28. 10. 2026. Původní WordPress URL jsou zdokumentované v `docs/redirect-map.md`; přesměrování na jejich doméně nebyla nasazena.

## Chybějící podklady

Skutečné dvojice fotografií před/po, dokončené realizace, potvrzené profese a designoví partneři, jejich jména a loga, schválené články, další firemní údaje, backend formuláře a právní texty k osobním údajům. Nevkládat vymyšlené reference, statistiky ani partnerství.
