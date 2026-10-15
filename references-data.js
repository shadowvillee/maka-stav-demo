// Demonstration content only. Replace entries with verified jobs and photographs
// before presenting this section as MAKA-STAV's completed work. Real photo objects
// can use { src, alt, type, position: 'center' } without the demo sprite's `side`.
(() => {
  const photo = (src, side, alt, type) => ({ src, side, alt, type });
  const pair = (file, beforeAlt, afterAlt) => {
    const src = `public/images/references/${file}`;
    return {
      beforeImage: photo(src, 'left', beforeAlt, 'Před'),
      afterImage: photo(src, 'right', afterAlt, 'Po')
    };
  };

  const bathroom = pair('demo-bathroom-pair.jpg', 'Demonstrační snímek starší koupelny před úpravou', 'Demonstrační snímek upravené koupelny');
  const living = pair('demo-living-pair.jpg', 'Demonstrační snímek obytného pokoje před dokončením', 'Demonstrační snímek hotového obytného pokoje');
  const kitchen = pair('demo-kitchen-pair.jpg', 'Demonstrační snímek starší kuchyně', 'Demonstrační snímek upravené kuchyně');

  window.MAKA_REFERENCES = [
    {
      id: 'demo-bathroom', slug: 'ukazka-koupelna', title: 'Proměna koupelny',
      category: 'Rekonstrukce koupelny', location: null, year: null, area: null,
      description: 'Ilustrační porovnání původní koupelny a její možné nové podoby. Ukazuje rozdíl v površích, vybavení a světle.',
      workItems: ['Příprava prostoru', 'Rozvody podle projektu', 'Obklady a dlažba', 'Montáž vybavení'],
      beforeImage: bathroom.beforeImage, afterImage: bathroom.afterImage, coverImage: bathroom.afterImage,
      galleryImages: [bathroom.beforeImage, bathroom.afterImage],
      inquiryService: 'Rekonstrukce koupelny', inquiryContext: 'Zajímá mě podobná rekonstrukce koupelny jako v ilustrační ukázce.',
      status: 'demo', isDemo: true
    },
    {
      id: 'demo-living', slug: 'ukazka-obytny-pokoj', title: 'Proměna obytného pokoje',
      category: 'Rekonstrukce bytu', location: null, year: null, area: null,
      description: 'Demonstrační dvojice ukazuje přechod od připravených stěn a podlahy k dokončenému obytnému prostoru.',
      workItems: ['Úprava stěn', 'Příprava podkladu', 'Nová podlaha', 'Dokončovací práce'],
      beforeImage: living.beforeImage, afterImage: living.afterImage, coverImage: living.afterImage,
      galleryImages: [living.beforeImage, living.afterImage],
      inquiryService: 'Kompletní rekonstrukce bytu', inquiryContext: 'Zajímá mě podobná úprava obytného prostoru jako v ilustrační ukázce.',
      status: 'demo', isDemo: true
    },
    {
      id: 'demo-kitchen', slug: 'ukazka-kuchyne', title: 'Proměna kuchyně',
      category: 'Stavební a dokončovací práce', location: null, year: null, area: null,
      description: 'Ilustrační příklad, jak mohou nové povrchy, podlaha a vybavení sjednotit menší kuchyňský prostor.',
      workItems: ['Příprava povrchů', 'Podlaha a obklady', 'Návazné stavební úpravy', 'Dokončení detailů'],
      beforeImage: kitchen.beforeImage, afterImage: kitchen.afterImage, coverImage: kitchen.afterImage,
      galleryImages: [kitchen.beforeImage, kitchen.afterImage],
      inquiryService: 'Stavební a dokončovací práce', inquiryContext: 'Zajímá mě podobná úprava kuchyně jako v ilustrační ukázce.',
      status: 'demo', isDemo: true
    }
  ];
})();
