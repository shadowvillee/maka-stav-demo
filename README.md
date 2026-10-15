# MAKA-STAV — ukázkový web

Statický web pro rekonstrukce bytů a koupelen v Praze a okolí. Spuštění bez instalace balíčků: `node serve.mjs`, potom `http://127.0.0.1:4173/`.

## Struktura

- `dist/index.html` — obsah, navigace, formulář a vrstvená ilustrace pokoje.
- `dist/redesign.css` — barvy, typografie, layout a responzivní komponenty.
- `dist/room.css` — konsolidované styly původní vrstvené ilustrace pokoje.
- `dist/scenes.js` — sedm etap a jejich texty.
- `dist/app.js` — přímé přepínání etap, mobilní menu a příprava e-mailu.
- `dist/references-data.js` — snadno rozšiřitelná data ukázek; položky jsou výslovně označené jako demo.
- `dist/references.js` a `dist/references.css` — porovnání před/po, carousel a detail jednotlivé ukázky.

Návštěvník vybírá etapu kliknutím na její tlačítko nebo šipkami. Stránka se při tom automaticky neposouvá a běžný scroll etapu nemění.

Fotografie v sekci před/po jsou **vygenerované demonstrační vizualizace**, nikoli zakázky MAKA-STAV. Fotografie v úvodu a na kartách jsou také ilustrační. Skutečné realizace ani klientské recenze zatím nejsou zveřejněny. Poptávkový formulář připraví zprávu v poštovní aplikaci návštěvníka; neodesílá údaje na server a nepotvrzuje odeslání. Před produkčním spuštěním je potřeba doplnit skutečné fotografie, ověřené firemní údaje, doručování formuláře a právní informace o zpracování osobních údajů.

Skutečnou zakázku přidejte jako další položku v `dist/references-data.js`: zadejte ověřený název, kategorii, popis a fotografie stejného prostoru před a po. `location`, `year` a `area` ponechte `null`, pokud nejsou potvrzené. Pro samostatné fotografie použijte objekty `{ src, alt, type, position: 'center' }`, nastavte `isDemo: false` a do `galleryImages` zařaďte jen snímky dané zakázky. Pokud úhly záběrů nesouhlasí, nepoužívejte překryvné porovnání bez úpravy prezentace.

Web používá relativní cesty, aby fungoval také v podadresáři GitHub Pages `/maka-stav-demo/`.
