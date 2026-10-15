(() => {
  const cards = [...document.querySelectorAll('.gallery-card')];
  const dialog = document.querySelector('#gallery-dialog');
  const image = dialog.querySelector('.gallery-dialog-image');
  const names = ['Výchozí prostor', 'Příprava povrchů', 'Hotová koupelna', 'Hotový interiér'];
  const photoClasses = ['photo-start', 'photo-process', 'photo-bathroom', 'photo-finished'];
  let activePhoto = 0;
  let opener = null;

  function renderPhoto(index) {
    activePhoto = (index + cards.length) % cards.length;
    image.className = `gallery-dialog-image ${photoClasses[activePhoto]}`;
    image.setAttribute('aria-label', `Ilustrační fotografie: ${names[activePhoto]}`);
    dialog.querySelector('#gallery-dialog-title').textContent = names[activePhoto];
    dialog.querySelector('#gallery-dialog-count').textContent = `0${activePhoto + 1} / 0${cards.length} · Ilustrační fotografie`;
  }

  cards.forEach((card, index) => card.addEventListener('click', () => {
    opener = card;
    renderPhoto(index);
    dialog.showModal();
    document.body.classList.add('gallery-open');
    dialog.querySelector('.gallery-close').focus();
  }));
  dialog.querySelector('.gallery-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.gallery-prev').addEventListener('click', () => renderPhoto(activePhoto - 1));
  dialog.querySelector('.gallery-next').addEventListener('click', () => renderPhoto(activePhoto + 1));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); renderPhoto(activePhoto - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); renderPhoto(activePhoto + 1); }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('gallery-open');
    opener?.focus();
  });
})();
