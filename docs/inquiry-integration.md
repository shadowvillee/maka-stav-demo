# Poptávkový průvodce — integrace

## Co běží nyní

`poptavka/` je samostatná aplikace bez závislostí. Čerpá katalog z `content-data.js`, definice otázek z `catalog.mjs`. Každá místnost a instance práce má UUID. Kontakt, odpovědi a File objekty jsou pouze v paměti otevřené karty. Žádné localStorage, cookies ani veřejné ukládání příloh. Ztrátě rozepsané poptávky brání upozornění při zavírání; po reloadu ji nelze obnovit. Textový export neobsahuje samotné přílohy.

## Co je potřeba zapojit pro skutečné doručování

Spustitelný Node adaptér je `node server/start-inquiry.mjs`. Vyžaduje `INQUIRY_ALLOWED_ORIGINS` (přesné originy oddělené čárkou), volitelně `INQUIRY_PORT` a `INQUIRY_HOST`. Privátní `MAIL_RELAY_URL` a `MAIL_RELAY_TOKEN` aktivují relay; bez nich endpoint vrací 503. Současný statický hosting ani GitHub Pages serverový adaptér nespouštějí. Nasazuje se zvlášť za HTTPS proxy, která bezpečně dodá klientskou IP. Nepublikovat obsah serverové konfigurace do repozitáře.

1. Nasadit serverový endpoint s `createInquiryHandler` z `server/inquiry-handler.mjs`. Do `catalog` předat `buildCatalog` nad stejným kanonickým katalogem jako používá web. Serverový runtime musí podporovat Request, FormData, File a Buffer (Node 20+).
2. Předat přesný seznam `allowedOrigins` a důvěryhodnou klientskou IP získanou od hostingu, nikoliv z libovolné klientské hlavičky. Zapojit distribuovaný rate limiter a idempotenci pro více instancí; dodaný limiter a potvrzení jsou v paměti procesu. Na hraně omezit request na 51 MB a nastavit odpovídající timeout. Pokud emailová služba nepodporuje soubory do celkových 50 MB, snížit limity na obou stranách, nebo doplnit privátní úložiště s expirovanými odkazy a odpovídající retenční politikou.
3. Doplnit `deliver` přes serverovou e-mailovou službu. Volitelný `createMailRelay` používá privátní HTTPS relay s autentizací. Očekává JSON `to`, `replyTo`, `subject`, `text`, `attachments` (base64). Relay musí předat idempotency key poskytovateli, provést antivirovou kontrolu příloh a vrátit `{accepted:true,messageId:"..."}` až po přijetí zprávy poskytovatelem. Poskytovatele ani DNS odesílací domény tato implementace nekonfiguruje. Ověřit SPF/DKIM, doménu odesílatele a test doručení do skutečné firemní schránky. Přijetí poskytovatelem není záruka umístění zprávy do inboxu.
4. Teprve pak nastavit veřejné `deliveryConfig.endpoint` v `poptavka/config.mjs`. Tokeny patří výhradně na server. Nikdy nezapínat úspěšné potvrzení jen podle HTTP 200 bez `ok:true` a `receiptId`.
5. Odsouhlasit finální firemní informace o zpracování osobních údajů a lhůty uchování na serveru / v e-mailu. Potvrzovací email zákazníkovi není zapojen; lze jej doplnit v doručovací službě.

Endpoint přijímá multipart `project` (JSON) a opakované `files`. Kontroluje origin, honeypot, čas vyplnění, rate limit, velikost těla, typy/signatury příloh, kontakt, lokalitu, kanonická ID služeb a povolené odpovědi. E-mail je určen pevně na `makarastavby@gmail.com`; klient nemůže určit příjemce. Server nezapisuje přílohy na disk ani nevydává veřejné URL. Klient při chybě zachová stav. Bez konfigurace se vrací 503 a aplikace jasně uvádí, že zpráva nebyla odeslána.

## Rozložení

Šest fází, dynamické podkroky podle zvolených prací. Desktop zobrazuje nejvýše šest otázek, mobil dvě. Kontakt se na mobilu dělí na údaje a odeslání. Hlavička a spodní ovládání mají vlastní řádky; pouze hlavní obsah a dlouhý souhrn se mohou přirozeně posouvat. To zachovává dostupnost při velkém písmu či otevřené klávesnici. Skutečnou mobilní klávesnici je nutné ověřit na zařízení.

Aktuální vzhled a vícenásobné otázky verze 28 popisuje `docs/inquiry-reference-update.md`. Odpověď typu multi se přenáší jako pole povolených řetězců, odděleně u každé instance práce. Server tyto hodnoty kontroluje proti stejnému katalogu a pro e-mail je spojuje do čitelného textu.
