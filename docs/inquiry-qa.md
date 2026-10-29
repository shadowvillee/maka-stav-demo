# Kontrola poptávkového průvodce — 29. 10. 2026

## Funkční kontrola

- V prohlížeči prošla jedna koupelna s obklady, plocha 18 m², materiály a vizualizace. Změna plochy na 19 m² zůstala zachovaná při návratu.
- Tři místnosti: koupelna a dvě samostatně pojmenované ložnice, obklady / podlahy / výmalba. Plocha podlahy 24 m² se nepřenesla do odpovědí výmalby druhé ložnice.
- Kompletní rekonstrukce prošla s vlastními otázkami bez požadavku vyplnit jednotlivé profese. Předvýběr funguje z `?service=complete`.
- Odborná samostatná práce bez místnosti prošla přes společné práce. U hromosvodu se neobjevují materiály ani interiérový design.
- Přidání stejného typu místnosti přes souhrn; odstranění místnosti přes vlastní potvrzovací dialog; přejmenování místnosti a změna vybraných prací. Při odstranění celé místnosti dialog výslovně uvádí odstranění jejích prací.
- Výběr dvou JPG současně přes file picker, zobrazení připravených souborů, odebrání jedné přílohy. Nepodporovaný Markdown soubor se odmítl, zbývající obrázek zůstal zachovaný. Drag & drop používá tutéž kontrolní cestu; skutečný tah myší nebyl samostatně automatizován.
- Pokus o odeslání bez konfigurace jasně uvedl, že nic nebylo odesláno, a zachoval kontakt i přílohy. Textový export připravuje souhrn, nikoliv falešné potvrzení doručení.
- Kontrola homepage po odstranění animace: kontaktní formulář, reference, služby a blog zůstávají přítomné; konzole bez zaznamenaných chyb. Odkaz ze služby Hromosvody skutečně otevřel `/poptavka/?service=hromosvody`.

## Rozměry a dostupnost

Změřeno 9 běžných obrazovek na 8 viewpor­tech: 1920×1080, 1440×900, 1366×768, 1280×720, 320×640, 375×667, 390×844, 430×932. Kontrolovala se šířka dokumentu, přetečení hlavního obsahu a poloha spodní navigace. Žádné horizontální přetékání ani skrytá spodní navigace. Na 320×640 byly při prvním měření delší výběr místností, lokalita a odeslání. Po úpravách bylo přetečení těchto tří obrazovek znovu změřeno: 0 px.

Technické otázky mají maximálně čtyři položky na desktopu a dvě na mobilu. Při dlouhém souhrnu, rozbalení nepovinné adresy, velkém textu nebo dalších přílohách je hlavní obsah přirozeně posuvný; spodní navigace má vlastní řádek. Mobilní souhrn se otevírá v nativním HTML dialogu s focus trapem a Escape. Základní ovladače mají focus stavy; výběr rozsahu a termínu podporuje také klávesové šipky. CSS vypíná pohyb při `prefers-reduced-motion`.

Fyzická mobilní klávesnice, skutečné systémové zvětšení písma, čtečka obrazovky a systémové přepnutí reduced motion nebyly na zařízení ověřeny. Layout poskytuje posuvný obsah a `dvh`, ale ověření klávesnice na iOS/Android zůstává před ostrým provozem.

## Serverové testy

`node --test tests/inquiry.test.mjs` — 8/8 úspěšných testů: kanonický katalog, izolace odpovědí, kompletní a samostatná práce, neplatné údaje a ID, nenakonfigurované doručování, více příloh a idempotence, origin / spam / velikost / rate limit, selhání transportu bez změny dat. Úspěšný transport je pouze izolovaný testovací stub; produkční aplikace ho nepoužívá.

## Zbývající integrace

Statický Site a GitHub Pages neposkytují e-mailový server. Doručování a soukromé přílohy tedy zatím nejsou v ostrém provozu. Připravený handler a spustitelný Node adaptér vyžadují samostatné HTTPS nasazení, privátní doručovací službu, případně úložiště, nastavení limitů poskytovatele a finální firemní informace o zpracování údajů. Podrobnosti obsahuje `docs/inquiry-integration.md`.
