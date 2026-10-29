# Návrh přesměrování pro pozdější migraci ostré domény

Zdroj: XML sitemap `https://www.maka-stav.cz/sitemap.xml`, zkontrolováno 28. 10. 2026. Současný demo web původní doménu nespravuje; tato tabulka je návrh, nikoli nasazené přesměrování.

| Původní URL | Cíl po migraci | Stav |
| --- | --- | --- |
| `/` | `/` | Připraveno |
| `/sluzby/` | `/#sluzby` | Připraveno |
| `/o-nas/` | `/#firma` | Připraveno |
| `/kontakt/` | `/#kontakt` | Připraveno |
| `/reference/` | `/realizace/` | Až po schválení skutečných realizací |
| `/hello-world/` | 410 Gone | Výchozí WordPress příspěvek; ověřit před vypnutím |
| `/sample-page/` | 410 Gone | Výchozí WordPress stránka; ověřit před vypnutím |
| `/category/uncategorized/` | 410 Gone | Výchozí kategorie; ověřit před vypnutím |

Před migrací znovu exportovat kompletní seznam URL a zkontrolovat externí odkazy. Přesměrování nastavit na hostingu původní domény. Nesměrovat `/reference/` na prázdnou galerii.
