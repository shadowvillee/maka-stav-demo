(() => {
  const scenes = window.MAKA_SCENES || [];
  const room = document.querySelector('.room');
  const title = document.querySelector('#stage-title');
  const copy = document.querySelector('#stage-copy');
  const kicker = document.querySelector('#stage-kicker');
  const stageCount = document.querySelector('#stage-count');
  const buttons = document.querySelector('#stage-buttons');
  const progress = document.querySelector('#stage-progress');
  const artwork = document.querySelector('#room-artwork');
  const wirePaths = [...document.querySelectorAll('.room-wires path')];
  const pipePaths = [...document.querySelectorAll('.room-plumbing path')].map(path => ({ path, length: Math.max(1, path.getTotalLength()) }));
  const frames = (window.MAKA_FRAMES || []).filter(frame => frame.desktop || frame.mobile);
  const frameNodes = frames.map(frame => {
    const picture = document.createElement('picture');
    picture.className = 'room-frame';
    const mobile = document.createElement('source');
    mobile.media = '(max-width: 760px)';
    mobile.srcset = frame.mobile || frame.desktop;
    const image = document.createElement('img');
    image.alt = '';
    image.decoding = 'async';
    image.dataset.src = frame.desktop || frame.mobile;
    image.addEventListener('load', () => picture.classList.add('is-ready'), { once: true });
    picture.append(mobile, image);
    artwork.append(picture);
    return { picture, image, frame, requested: false };
  });
  const nav = document.querySelector('.main-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const status = document.querySelector('#form-status');
  let activeStageIndex = 0;

  document.querySelector('#year').textContent = new Date().getFullYear();

  scenes.forEach((scene, index) => {
    const bar = document.createElement('span');
    bar.className = 'progress-segment';
    progress.append(bar);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'stage-button';
    button.id = `stage-tab-${index + 1}`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', 'stage-panel');
    button.setAttribute('aria-selected', String(index === 0));
    button.tabIndex = index === 0 ? 0 : -1;
    button.setAttribute('aria-label', `Zobrazit fázi ${index + 1}: ${scene.phase}`);
    button.innerHTML = `<span class="stage-button-no">0${index + 1}</span><span class="stage-button-label">${scene.phase}</span>`;
    button.addEventListener('click', () => activateStage(index));
    button.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % scenes.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + scenes.length) % scenes.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = scenes.length - 1;
      else return;
      event.preventDefault();
      activateStage(next);
      buttons.children[next].focus();
    });
    buttons.append(button);
  });

  function setScene(index, p) {
    const scene = scenes[index];
    if (!scene) return;
    title.textContent = scene.phase;
    copy.textContent = scene.copy;
    kicker.textContent = `0${index + 1} / 0${scenes.length} · ${scene.phase}`;
    stageCount.textContent = `0${index + 1} / 0${scenes.length}`;
    document.querySelector('#mobile-stage-name').textContent = scene.phase;
    document.querySelector('#stage-panel').setAttribute('aria-labelledby', `stage-tab-${index + 1}`);
    buttons.querySelectorAll('.stage-button').forEach((button, i) => {
      button.classList.toggle('is-active', i === index);
      button.setAttribute('aria-selected', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
    });
    progress.querySelectorAll('.progress-segment').forEach((bar, i) => {
      bar.style.setProperty('--fill', i <= index ? '1' : '0');
    });
    room.dataset.stage = String(index);
    const clamp = value => Math.max(0, Math.min(1, value));
    room.style.setProperty('--story-progress', Math.max(0, Math.min(1, p)));
    room.style.setProperty('--story-progress-percent', `${Math.max(0, Math.min(1, p)) * 100}%`);
    room.style.setProperty('--plaster-reveal', `${clamp((p - .3) / .12) * 100}%`);
    room.style.setProperty('--paint-reveal', `${clamp((p - .43) / .13) * 100}%`);
    room.style.setProperty('--plaster-opacity', clamp((p - .29) / .12));
    room.style.setProperty('--paint-opacity', p >= .43 ? 1 : 0);
    room.style.setProperty('--side-paint-opacity', clamp((p - .43) / .13));
    room.style.setProperty('--wire-opacity', index === 1 ? 1 : 0);
    const wireOffset = 1 - clamp((p - .1) / .08);
    const wireLength = (410 * room.clientWidth + 610 * room.clientHeight) / 1000 + 2;
    wirePaths.forEach(path => {
      path.style.strokeDasharray = `${wireLength}px`;
      path.style.strokeDashoffset = `${wireLength * wireOffset}px`;
    });
    room.style.setProperty('--pipe-opacity', index === 1 ? 1 : 0);
    const pipeOffset = 1 - clamp((p - .19) / .09);
    pipePaths.forEach(({ path, length }) => {
      path.style.strokeDasharray = `${length}px`;
      path.style.strokeDashoffset = `${length * pipeOffset}px`;
    });
    room.style.setProperty('--ceiling-opacity', clamp((p - .56) / .12));
    room.style.setProperty('--light-opacity', index >= 4 ? 1 : 0);
    room.style.setProperty('--switch-opacity', clamp((p - .23) / .025));
    room.style.setProperty('--lamp-opacity', clamp((p - .8) / .13));
    const floorProgress = clamp((p - .72) / .14);
    room.style.setProperty('--floor-art-opacity', floorProgress);
    room.style.setProperty('--floor-art-reveal', `${floorProgress * 100}%`);
    room.style.setProperty('--furniture-opacity', clamp((p - .84) / .12));
    room.style.setProperty('--rug-opacity', clamp((p - .9) / .08));
    room.style.setProperty('--art-opacity', clamp((p - .87) / .1));
    const newWindow = clamp((p - .46) / .08);
    room.style.setProperty('--old-window-opacity', 1 - newWindow);
    room.style.setProperty('--new-window-opacity', newWindow);
    setArtwork(p);
    document.querySelector('#stage-prev').disabled = index === 0;
    document.querySelector('#stage-next').disabled = index === scenes.length - 1;
  }

  function setArtwork(p) {
    if (!frameNodes.length) return;
    const position = Math.max(0, Math.min(1, p)) * (frameNodes.length - 1);
    const first = Math.floor(position);
    const second = Math.min(frameNodes.length - 1, first + 1);
    const mix = position - first;
    frameNodes.forEach((node, index) => {
      const visible = index === first || index === second;
      node.picture.style.opacity = visible ? '1' : '0';
      node.picture.style.clipPath = index === second && second !== first ? `inset(0 ${100 - mix * 100}% 0 0)` : 'inset(0 0 0 0)';
      if (visible && !node.requested) {
        node.requested = true;
        node.image.src = node.image.dataset.src;
      }
    });
  }

  function activateStage(index) {
    activeStageIndex = Math.max(0, Math.min(scenes.length - 1, index));
    const scene = scenes[activeStageIndex];
    // The first step stops before the wiring appears. Later steps use the
    // settled end of their own interval, independent of scroll position.
    const visualProgress = activeStageIndex === 0 ? .07 : activeStageIndex === scenes.length - 1 ? 1 : scene.end - .001;
    setScene(activeStageIndex, visualProgress);
  }
  document.querySelector('#stage-prev').addEventListener('click', () => activateStage(activeStageIndex - 1));
  document.querySelector('#stage-next').addEventListener('click', () => activateStage(activeStageIndex + 1));
  activateStage(0);
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.focus();
    }
  });
  document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
    const select = document.querySelector('#inquiry-form select[name="service"]');
    select.value = link.dataset.service;
  }));

  for (const input of ['name', 'phone']) {
    document.querySelector(`#inquiry-form [name="${input}"]`).addEventListener('input', event => event.currentTarget.setCustomValidity(''));
  }
  document.querySelector('#inquiry-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.elements.website.value) return;
    const name = form.elements.name;
    const phone = form.elements.phone;
    name.setCustomValidity(name.value.trim() ? '' : 'Vyplňte prosím jméno a příjmení.');
    const digits = phone.value.replace(/\D/g, '');
    phone.setCustomValidity(/^[+]?[-0-9 ()]+$/.test(phone.value.trim()) && digits.length >= 9 && digits.length <= 15 ? '' : 'Zadejte platné telefonní číslo.');
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const subject = encodeURIComponent(`Nezávazná poptávka — ${values.get('name')}`);
    const body = encodeURIComponent([
      `Jméno: ${values.get('name')}`,
      `Telefon: ${values.get('phone')}`,
      `E-mail: ${values.get('email')}`,
      `Služba: ${values.get('service') || 'neuvedeno'}`,
      `Lokalita: ${values.get('location') || 'neuvedeno'}`,
      '', String(values.get('message') || '')
    ].join('\n'));
    status.textContent = 'Otevře se váš e-mailový program s připravenou poptávkou. Zprávu odešlete až po kontrole.';
    window.location.href = `mailto:makarastavby@gmail.com?subject=${subject}&body=${body}`;
  });
})();
