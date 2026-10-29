# Úprava podle původní předlohy — verze 28, 29. 10. 2026

## Provedené změny

Původní obecné ikony a volné plochy nahradila krémová prezentace s izometrickým domem, fotografické karty místností, checklist prací s krátkým vysvětlením a materiálovým náhledem a malé fotografické karty v souhrnu. Rozložení respektuje původní barevnost #F3F0EA / #E5DED4 / #A84632 / #8D694F / #252320. Uživatel vidí aktivní krok, nikoliv celou infografiku najednou.

Horní fáze jsou skutečná tlačítka. Lze se vracet a upravovat výběry bez ztráty odpovědí. Chybějící nutný údaj při skoku dopředu otevře příslušný krok s vysvětlením. Technické otázky jsou nadále nepovinné.

Otázky na místa obkladu, vodu a odpady, sanitární vybavení, sádrokartonové konstrukce a design mají skutečný vícenásobný výběr. Odpovědi se ukládají jako pole u konkrétní instance práce. Otevřená nabídka obsahuje viditelné checkboxy; jedna odpověď využívá radio ovladače. Volba „Nevím“ je výlučná a server odmítá nepovolené či duplicitní hodnoty. Číselná pole mají jednotky a samostatnou volbu zaměření. Desktop zobrazuje až šest souvisejících otázek, mobil dvě.

Kalendář počítá skutečné dny a názvy měsíců, umožňuje přechod mezi měsíci a respektuje minulá data. Volba dne je pouze preference. Na mobilu je kalendář rozbalovací panel; termín, odpovědi a souhrn zůstávají zachované při navigaci.

## Podklady a grafický asset

- `poptavka/assets/room-reference.png` je dodaný výřez `02_vyber_mistnosti.png`. Fotografie se zobrazují pomocí SVG viewBoxů jako části stejného podkladu; texty a ovladače jsou skutečné HTML.
- `poptavka/assets/material-reference.png` je dodaný výřez `03_vyber_praci.png`. V UI se zobrazuje pouze materiálová fotografie, nikoliv screenshot formuláře.
- `poptavka/assets/house-clean.png` je upravená ilustrace z dodaného izolovaného obrázku domu. Vytvořena vestavěným nástrojem imagegen, bez API/CLI fallbacku. Finální asset je `poptavka/assets/house-clean.png`. Originální pracovní soubor je uložen lokálně mimo veřejný export.

Prompt použitý pro obrázek domu:

> Use case: precise-object-edit. Edit target: the attached existing isometric cutaway house illustration. Preserve this exact house composition, camera angle, rooms, architecture, furniture, landscaping, warm neutral materials, soft cream-white background and lighting. Remove ALL floating white text labels, their shadows, all letters, orange marker dots and connecting lines. Reconstruct the small areas of house covered by those labels seamlessly. Output only the same complete house illustration without any text or callouts, clean edges, high quality asset for a website, landscape 16:9 framing. Do not add rooms or change the geometry or visual style. Preserve the entire house without cropping.

Nové popisky jsou HTML, takže neobsahují původní překlepy a neopakují se přes text z obrázku. Fotografie a dům jsou ilustrativní, nikoliv reference zakázek MAKA-STAV.

## Kontrola

- Ověřeno přímé přepínání horních kroků, zachování výměry 18 m² a kombinace Stěny + Podlaha + Sprchový kout po přechodu zpět a dopředu.
- Ověřeno více místností a výběr samostatných prací, přesun na nevyplněnou místnost s vysvětlením, kompaktní souhrn a odkazy pro úpravy.
- Změřeny běžné kroky na 1920×1080, 1440×900, 1366×768, 1280×720, 320×640, 375×667, 390×844 a 430×932. Žádné horizontální přetékání ani skrytá spodní navigace. Zjištěná přetečení výběru místností, prací a šesti otázek při malé výšce byla opravena úpravou rozestupů; příslušné případy znovu ověřeny.
- Ověřen mobilní checkboxový panel na 320×640: více současných odpovědí, panel uvnitř viewportu, nulové přetečení běžného kroku.
- Ověřen mobilní kalendář: změna měsíce nezavře výběr, výběr dne aktualizuje souhrn a konkrétní preferovaný termín.
- `node --test tests/inquiry.test.mjs`: 10/10 testů, nově včetně více odpovědí a odmítnutí neplatných polí odpovědí.

Fyzická mobilní klávesnice, čtečka obrazovky a systémové zvětšení písma nebyly ověřeny na zařízení. Obsah zůstává přirozeně posuvný při skutečné potřebě. Serverové doručování nadále vyžaduje infrastrukturu popsanou v `docs/inquiry-integration.md`; úspěšné doručení se nesimuluje.
