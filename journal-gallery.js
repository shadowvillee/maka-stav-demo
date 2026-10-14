(() => {
  const services = {
    byt: {
      index: 'Složka 01 / 05', label: 'Kompletní rekonstrukce',
      title: 'Byt od první přípravy až po předání.',
      lead: 'Jedna koordinovaná proměna prostoru. Na sebe navazující práce od bourání a rozvodů po povrchy, podlahy a dokončovací detaily.',
      points: ['Prohlídka prostoru a domluva rozsahu', 'Návaznost jednotlivých řemesel', 'Dokončení podle konkrétního zadání'],
      note: 'Konkrétní postup a termíny určíme po prohlídce bytu.', photo: 3,
      imageAlt: 'Ilustrační interiér po rekonstrukci', caption: '01 — V každém detailu záleží na návaznosti prací.', form: 'Kompletní rekonstrukce bytu'
    },
    koupelny: {
      index: 'Složka 02 / 05', label: 'Koupelny a bytová jádra',
      title: 'Nová koupelna. Promyšlená do detailu.',
      lead: 'Změna dispozice, rozvody, hydroizolace, obklady a vybavení musí fungovat jako celek. Společně určíme, co prostor dovolí a jaký postup dává smysl.',
      points: ['Příprava prostoru a nové rozvody', 'Obklady, dlažba a povrchové úpravy', 'Montáž zařízení a finální dokončení'],
      note: 'Výběr materiálů i rozsah zásahu doladíme podle vašeho prostoru.', photo: 2,
      imageAlt: 'Ilustrační fotografie dokončené koupelny', caption: '02 — Funkční základ a čistá finální podoba.', form: 'Rekonstrukce koupelny'
    },
    povrchy: {
      index: 'Složka 03 / 05', label: 'Zednické a obkladačské práce',
      title: 'Rovné stěny. Přesné návaznosti.',
      lead: 'Povrchy určují dojem z celé místnosti. Připravíme podklad, opravíme nerovnosti a navážeme štukem, obkladem nebo dlažbou podle zvoleného řešení.',
      points: ['Opravy zdiva a příprava podkladu', 'Omítky, štuky a finální stěrky', 'Obklady a dlažby v potřebném rozsahu'],
      note: 'Správnou skladbu prací stanovíme podle skutečného stavu konstrukcí.', photo: 1,
      imageAlt: 'Ilustrační fotografie připravených stěn', caption: '03 — Kvalita finální vrstvy začíná pod ní.', form: 'Zednické a obkladačské práce'
    },
    podlahy: {
      index: 'Složka 04 / 05', label: 'Podlahy a sádrokarton',
      title: 'Pevný základ pro každodenní život.',
      lead: 'Podlaha potřebuje připravený podklad a pečlivé napojení na okolní konstrukce. Sádrokarton umožní upravit příčky, podhledy i vedení instalací.',
      points: ['Posouzení a vyrovnání podkladu', 'Pokládka podlahové krytiny a detaily hran', 'Příčky a podhledy podle návrhu prostoru'],
      note: 'Typ podlahy a konstrukce vybereme podle zadání a technických možností.', photo: 3,
      imageAlt: 'Ilustrační fotografie hotové dřevěné podlahy', caption: '04 — Materiály, které drží celek pohromadě.', form: 'Podlahářské práce'
    },
    instalace: {
      index: 'Složka 05 / 05', label: 'Elektro a instalace',
      title: 'To podstatné se skrývá pod povrchem.',
      lead: 'Voda, odpady a elektřina tvoří technické zázemí každé rekonstrukce. Jejich umístění sladíme s budoucí dispozicí a plánem navazujících prací.',
      points: ['Příprava tras a umístění vývodů', 'Koordinace elektro a instalatérských prací', 'Zakrytí rozvodů a navázání dalších vrstev'],
      note: 'Technické řešení vždy vychází z prohlídky a platných požadavků.', photo: 1,
      imageAlt: 'Ilustrační fotografie prostoru během rekonstrukce', caption: '05 — Poctivě připravené to, co později není vidět.', form: 'Elektroinstalační a instalatérské práce'
    }
  };

  const tabs = [...document.querySelectorAll('.folder-tab')];
  const page = document.querySelector('#service-page');
  const photo = document.querySelector('#service-photo');
  const fields = {
    index: document.querySelector('#service-index'), label: document.querySelector('#service-label'),
    title: document.querySelector('#service-title'), lead: document.querySelector('#service-lead'),
    points: document.querySelector('#service-points'), note: document.querySelector('#service-fineprint'),
    caption: document.querySelector('.folder-visual>p')
  };
  let turnTimer;

  function showService(tab, focus = false) {
    const data = services[tab.dataset.service];
    if (!data) return;
    clearTimeout(turnTimer);
    tabs.forEach(item => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    page.setAttribute('aria-labelledby', tab.id);
    if (focus) tab.focus();
    page.classList.add('is-turning');
    const update = () => {
      fields.index.textContent = data.index;
      fields.label.textContent = data.label;
      fields.title.textContent = data.title;
      fields.lead.textContent = data.lead;
      fields.note.textContent = data.note;
      fields.caption.textContent = data.caption;
      fields.points.replaceChildren(...data.points.map(text => {
        const li = document.createElement('li');
        li.textContent = text;
        return li;
      }));
      photo.className = `contact-photo photo--${data.photo}`;
      photo.setAttribute('aria-label', data.imageAlt);
      document.querySelector('#service-cta').dataset.formService = data.form;
      page.classList.remove('is-turning');
    };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) update();
    else turnTimer = setTimeout(update, 130);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showService(tab));
    tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      showService(tabs[next], true);
    });
  });
  document.querySelector('#service-cta').addEventListener('click', event => {
    const selected = event.currentTarget.dataset.formService || services.byt.form;
    const select = document.querySelector('.inquiry-form select[name="service"]');
    select.value = selected;
  });

  const marquee = document.querySelector('.gallery-marquee');
  const firstRun = marquee.querySelector('.gallery-run');
  const track = document.createElement('div');
  track.className = 'gallery-track';
  firstRun.replaceWith(track);
  track.append(firstRun);
  const duplicate = firstRun.cloneNode(true);
  duplicate.setAttribute('aria-hidden', 'true');
  duplicate.querySelectorAll('button').forEach(button => button.tabIndex = -1);
  track.append(duplicate);

  const galleryNames = ['Na začátku', 'Příprava povrchů', 'Hotová koupelna', 'Hotový interiér'];
  const dialog = document.querySelector('#gallery-dialog');
  const dialogImage = dialog.querySelector('.gallery-dialog-image');
  const dialogTitle = dialog.querySelector('#gallery-dialog-title');
  const dialogCount = dialog.querySelector('#gallery-dialog-count');
  let currentPhoto = 0;
  let opener = null;
  function renderPhoto(index) {
    currentPhoto = (index + galleryNames.length) % galleryNames.length;
    dialogImage.className = `gallery-dialog-image contact-photo photo--${currentPhoto}`;
    dialogImage.setAttribute('aria-label', `Ilustrační snímek: ${galleryNames[currentPhoto]}`);
    dialogTitle.textContent = galleryNames[currentPhoto];
    dialogCount.textContent = `0${currentPhoto + 1} / 0${galleryNames.length}`;
  }
  marquee.addEventListener('click', event => {
    const button = event.target.closest('.gallery-card');
    if (!button) return;
    opener = button;
    renderPhoto(Number(button.dataset.photo));
    dialog.showModal();
    document.body.classList.add('gallery-open');
    dialog.querySelector('.gallery-close').focus();
  });
  dialog.querySelector('.gallery-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.gallery-prev').addEventListener('click', () => renderPhoto(currentPhoto - 1));
  dialog.querySelector('.gallery-next').addEventListener('click', () => renderPhoto(currentPhoto + 1));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); renderPhoto(currentPhoto - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); renderPhoto(currentPhoto + 1); }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('gallery-open');
    if (opener) {
      const original = firstRun.querySelector(`[data-photo="${opener.dataset.photo}"]`);
      original?.focus();
    }
  });
})();
