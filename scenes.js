/* Edit scene copy and transitions here. Add stages without changing the page structure. */
window.MAKA_SCENES = [
  { id: "construction", copy: "Všechno začíná přípravou prostoru. Bourací a stavební práce připraví základ pro novou podobu interiéru.", phase: "Hrubá stavba", start: 0, end: .14 },
  { id: "installations", copy: "Připravíme potřebné rozvody vody, odpadů a elektřiny podle konkrétního projektu.", phase: "Instalace a rozvody", start: .14, end: .28 },
  { id: "plaster", copy: "Stěny dostávají nový základ. Přichází na řadu omítky, štuky a další úpravy povrchů.", phase: "Omítky a povrchy", start: .28, end: .43 },
  { id: "paint", copy: "Dokončujeme povrchy stěn a postupně se začíná ukazovat nový charakter místnosti.", phase: "Výmalba", start: .43, end: .57 },
  { id: "ceiling", copy: "Podhledy a osvětlení doplňují funkčnost i atmosféru prostoru.", phase: "Strop a osvětlení", start: .57, end: .71 },
  { id: "floor", copy: "Podklad a finální podlahová krytina dodávají místnosti sjednocený vzhled.", phase: "Podlahy", start: .71, end: .86 },
  { id: "finished", copy: "Poslední úpravy jsou dokončené. Z původního prostoru vzniká nový domov.", phase: "Hotový interiér", start: .86, end: 1 }
];

/* Add supplied images here when ready. Paths are optional until the real sequence arrives. */
window.MAKA_FRAMES = Array.from({ length: 14 }, (_, index) => {
  const id = `scene-${String(index + 1).padStart(2, "0")}`;
  return { id, desktop: null, mobile: null, suggestedDesktop: `public/images/scenes/desktop/${id}.webp`, suggestedMobile: `public/images/scenes/mobile/${id}.webp`, status: "awaiting-owner-artwork" };
});
