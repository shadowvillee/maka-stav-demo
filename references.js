(() => {
  const references = window.MAKA_REFERENCES || [];
  if (!references.length) return;

  const $ = selector => document.querySelector(selector);
  const comparison = $('#reference-comparison');
  const range = $('#comparison-range');
  const previousPeek = $('#reference-peek-prev');
  const nextPeek = $('#reference-peek-next');
  const progress = $('#reference-progress');
  const dialog = $('#reference-dialog');
  const detailImage = dialog.querySelector('.reference-dialog-photo');
  const detailThumbs = $('#reference-dialog-thumbs');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const imagePromises = new Map();
  let activeIndex = 0;
  let desiredIndex = 0;
  let requestId = 0;
  let detailReference = null;
  let detailIndex = 0;
  let detailOpener = null;
  let lastInquiryContext = '';
  let hasRendered = false;

  const wrap = index => (index + references.length) % references.length;
  const count = (index, total) => `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  function loadImage(src) {
    if (!imagePromises.has(src)) {
      const image = new Image();
      image.decoding = 'async';
      image.src = src;
      imagePromises.set(src, image.decode().then(() => true).catch(() => false));
    }
    return imagePromises.get(src);
  }

  function applyPhoto(element, photo) {
    element.style.backgroundImage = `url("${photo.src}")`;
    element.style.backgroundSize = photo.side ? '200% auto' : 'cover';
    element.style.backgroundPosition = photo.side ? `${photo.side} center` : (photo.position || 'center');
    element.setAttribute('aria-label', photo.alt);
  }

  function setSplit(value) {
    const split = Math.max(0, Math.min(100, Number(value)));
    range.value = String(split);
    range.setAttribute('aria-valuetext', `${split} % fotografie před, ${100 - split} % fotografie po`);
    comparison.style.setProperty('--split', `${split}%`);
  }

  function renderPeek(button, index, relation) {
    const reference = references[wrap(index)];
    applyPhoto(button.querySelector('.reference-peek-photo'), reference.coverImage);
    button.querySelector('.reference-peek-caption').textContent = reference.title;
    button.setAttribute('aria-label', `${relation}: ${reference.title}`);
  }

  function renderProgress(index) {
    progress.replaceChildren(...references.map((_, item) => {
      const segment = document.createElement('span');
      segment.className = item === index ? 'is-active' : '';
      return segment;
    }));
    progress.setAttribute('aria-label', `Ukázka ${index + 1} z ${references.length}`);
  }

  function renderReference(index, direction = 0, broken = false) {
    activeIndex = index;
    const reference = references[index];
    applyPhoto(comparison.querySelector('.comparison-before'), reference.beforeImage);
    applyPhoto(comparison.querySelector('.comparison-after'), reference.afterImage);
    comparison.classList.toggle('has-image-error', broken);
    comparison.setAttribute('aria-label', `Porovnání před a po: ${reference.title}. ${reference.isDemo ? 'Demonstrační fotografie.' : ''}`);
    setSplit(50);
    renderPeek(previousPeek, index - 1, 'Předchozí ukázka');
    renderPeek(nextPeek, index + 1, 'Další ukázka');
    $('#reference-count').textContent = count(index, references.length);
    renderProgress(index);

    $('#reference-category').textContent = `${reference.category}${reference.isDemo ? ' · návrh proměny' : ''}`;
    $('#reference-title').textContent = reference.title;
    const metadata = [reference.location, reference.year, reference.area].filter(Boolean);
    $('#reference-meta').textContent = metadata.length ? metadata.join(' · ') : 'Inspirace pro plánování vlastního prostoru';
    $('#reference-description').textContent = reference.description;
    $('#reference-work-items').replaceChildren(...reference.workItems.map(item => {
      const li = document.createElement('li');
      li.textContent = item;
      return li;
    }));

    if (hasRendered && !reducedMotion.matches) {
      for (const element of [comparison, $('.reference-info')]) {
        element.getAnimations().forEach(animation => animation.cancel());
        element.animate([
          { opacity: .72, transform: `translateX(${direction * 20}px)` },
          { opacity: 1, transform: 'translateX(0)' }
        ], { duration: 280, easing: 'ease-out' });
      }
    }
    hasRendered = true;
  }

  async function activateReference(index, direction = 0) {
    desiredIndex = wrap(index);
    const ticket = ++requestId;
    const reference = references[desiredIndex];
    comparison.classList.add('is-loading');
    comparison.setAttribute('aria-busy', 'true');
    const [beforeLoaded, afterLoaded] = await Promise.all([
      loadImage(reference.beforeImage.src), loadImage(reference.afterImage.src)
    ]);
    if (ticket !== requestId) return;
    renderReference(desiredIndex, direction, !beforeLoaded || !afterLoaded);
    comparison.classList.remove('is-loading');
    comparison.removeAttribute('aria-busy');
    loadImage(references[wrap(desiredIndex - 1)].coverImage.src);
    loadImage(references[wrap(desiredIndex + 1)].coverImage.src);
  }

  function showDetailPhoto(index) {
    detailIndex = wrapDetail(index);
    const photo = detailReference.galleryImages[detailIndex];
    applyPhoto(detailImage, photo);
    $('#reference-dialog-count').textContent = `${count(detailIndex, detailReference.galleryImages.length)} · ${photo.type}`;
    [...detailThumbs.children].forEach((thumb, item) => thumb.setAttribute('aria-pressed', String(item === detailIndex)));
  }

  function wrapDetail(index) {
    return (index + detailReference.galleryImages.length) % detailReference.galleryImages.length;
  }

  function openDetail() {
    detailReference = references[activeIndex];
    detailOpener = $('#reference-detail-open');
    $('#reference-dialog-title').textContent = detailReference.title;
    $('#reference-dialog-description').textContent = detailReference.isDemo
      ? 'Vizualizace možného řešení. Nejde o doloženou realizaci MAKA-STAV.'
      : detailReference.description;
    detailThumbs.replaceChildren(...detailReference.galleryImages.map((photo, index) => {
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = 'reference-dialog-thumb';
      thumb.setAttribute('aria-label', `${photo.type}: ${photo.alt}`);
      const visual = document.createElement('span');
      visual.className = 'reference-dialog-thumb-photo';
      applyPhoto(visual, photo);
      visual.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span');
      label.textContent = photo.type;
      thumb.append(visual, label);
      thumb.addEventListener('click', () => showDetailPhoto(index));
      return thumb;
    }));
    showDetailPhoto(0);
    dialog.showModal();
    document.body.classList.add('reference-modal-open');
    dialog.querySelector('.reference-dialog-close').focus();
  }

  range.addEventListener('input', event => setSplit(event.currentTarget.value));
  $('#reference-prev').addEventListener('click', () => activateReference(desiredIndex - 1, -1));
  $('#reference-next').addEventListener('click', () => activateReference(desiredIndex + 1, 1));
  previousPeek.addEventListener('click', () => activateReference(desiredIndex - 1, -1));
  nextPeek.addEventListener('click', () => activateReference(desiredIndex + 1, 1));
  $('#reference-detail-open').addEventListener('click', openDetail);
  $('#reference-inquiry').addEventListener('click', () => {
    const reference = references[activeIndex];
    const form = $('#inquiry-form');
    const service = form.elements.namedItem('service');
    const message = form.elements.namedItem('message');
    if ([...service.options].some(option => option.value === reference.inquiryService)) service.value = reference.inquiryService;
    if (!message.value.trim() || message.value === lastInquiryContext) {
      message.value = reference.inquiryContext;
      lastInquiryContext = reference.inquiryContext;
    }
  });
  dialog.querySelector('.reference-dialog-close').addEventListener('click', () => dialog.close());
  $('#reference-dialog-prev').addEventListener('click', () => showDetailPhoto(detailIndex - 1));
  $('#reference-dialog-next').addEventListener('click', () => showDetailPhoto(detailIndex + 1));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showDetailPhoto(detailIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showDetailPhoto(detailIndex + 1); }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('reference-modal-open');
    detailOpener?.focus();
    detailReference = null;
  });

  if (references.some(reference => !reference.isDemo)) {
    $('#references-title').textContent = 'Ukázky realizací před a po';
    $('.references-heading .eyebrow').textContent = 'Reference';
    if (references.every(reference => !reference.isDemo)) $('.references-disclaimer').hidden = true;
  }
  activateReference(0);
})();
