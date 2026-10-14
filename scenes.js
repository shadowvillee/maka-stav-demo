/* Edit scene copy and transitions here. Add stages without changing the page structure. */
window.MAKA_SCENES = [
  { id: "construction", title: "Každá proměna má svůj začátek.", copy: "Od prvních přípravných prací až po kompletní rekonstrukci. Nejprve poznáme prostor a domluvíme další postup.", services: ["Kompletní rekonstrukce", "Dispoziční úpravy", "Přípravné práce"], phase: "Hrubá stavba", start: 0, end: .14, transition: "brick-mask", panelPosition: "right", frames: ["scene-01", "scene-02", "scene-03"] },
  { id: "installations", title: "To nejdůležitější často není vidět.", copy: "Rozvody vody, odpadu a elektřiny tvoří základ, na kterém stojí bezpečné a pohodlné bydlení.", services: ["Elektroinstalace", "Voda a odpady", "Technická příprava"], phase: "Instalace", start: .14, end: .28, transition: "technical-overlay", panelPosition: "right", frames: ["scene-04", "scene-05"] },
  { id: "plaster", title: "Poctivá práce se pozná v detailech.", copy: "Stěny dostávají nový povrch. Omítky, štuky a obklady připravují prostor na další vrstvu proměny.", services: ["Zednické práce", "Štukování", "Obklady a dlažby"], phase: "Povrchy a omítky", start: .28, end: .43, transition: "plaster-mask", panelPosition: "right", frames: ["scene-06", "scene-07"] },
  { id: "paint", title: "Ze stavby začíná vznikat domov.", copy: "Světlá výmalba sjednocuje místnost a nechává vyniknout její proporce i přirozené světlo.", services: ["Malířské práce", "Finální úpravy stěn"], phase: "Výmalba", start: .43, end: .57, transition: "roller-mask", panelPosition: "right", frames: ["scene-08", "scene-09"] },
  { id: "ceiling", title: "Každý prostor si zaslouží správné řešení.", copy: "Podhledy a světla dotvářejí atmosféru. Technické detaily se mění v pohodlí každodenního života.", services: ["Sádrokarton", "Podhledy", "Dokončovací elektro"], phase: "Strop a osvětlení", start: .57, end: .71, transition: "light-reveal", panelPosition: "right", frames: ["scene-10", "scene-11"] },
  { id: "floor", title: "Kvalita, kterou vidíte na každém kroku.", copy: "Vyrovnaný podklad a pečlivě položená podlaha dávají místnosti čistý, sjednocený základ.", services: ["Stěrkování", "Vinylové a plovoucí podlahy", "Dlažba"], phase: "Podlahy", start: .71, end: .86, transition: "floor-reveal", panelPosition: "right", frames: ["scene-12", "scene-13"] },
  { id: "finished", title: "Od prvního zásahu až po poslední detail.", copy: "Dokončený prostor. Stejná místnost jako na začátku, připravená stát se vaším domovem.", services: ["Dveře a obložky", "Dokončovací práce", "Kompletní rekonstrukce"], phase: "Hotovo", start: .86, end: 1, transition: "final-reveal", panelPosition: "right", frames: ["scene-14"] }
];

/* Add supplied images here when ready. Paths are optional until the real sequence arrives. */
window.MAKA_FRAMES = Array.from({ length: 14 }, (_, index) => {
  const id = `scene-${String(index + 1).padStart(2, "0")}`;
  return { id, desktop: null, mobile: null, suggestedDesktop: `public/images/scenes/desktop/${id}.webp`, suggestedMobile: `public/images/scenes/mobile/${id}.webp`, status: "awaiting-owner-artwork" };
});
