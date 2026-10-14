(() => {
  const scenes = window.MAKA_SCENES || [];
  const story = document.querySelector('.story');
  const room = document.querySelector('.room');
  const title = document.querySelector('#stage-title');
  const copy = document.querySelector('#stage-copy');
  const kicker = document.querySelector('#stage-kicker');
  const stageCount = document.querySelector('#stage-count');
  const services = document.querySelector('#stage-services');
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
  let scrollTick = false;
  let mobileStageIndex = null;
  room.addEventListener('animationend', () => room.classList.remove('is-scanning'));

  document.querySelector('#year').textContent = new Date().getFullYear();

  scenes.forEach((scene, index) => {
    const bar = document.createElement('span');
    bar.className = 'progress-segment';
    progress.append(bar);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'stage-button';
    button.setAttribute('aria-label', `Zobrazit fázi ${index + 1}: ${scene.phase}`);
    button.innerHTML = `<span class="stage-button-no">0${index + 1}</span><span class="stage-button-label">${scene.phase}</span>`;
    button.addEventListener('click', () => {
      const mobile = matchMedia('(max-width: 760px)').matches;
      const progressPoint = mobile ? index / (scenes.length - 1) : index === scenes.length - 1 ? .99 : (index + 0.5) / scenes.length;
      const storyTop = story.getBoundingClientRect().top + window.scrollY;
      if (mobile) document.documentElement.classList.add('story-jumping');
      window.scrollTo({ top: storyTop + progressPoint * (story.offsetHeight - window.innerHeight), behavior: mobile ? 'instant' : matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      if (mobile) requestAnimationFrame(() => {
        document.documentElement.classList.remove('story-jumping');
        updateStory();
      });
    });
    buttons.append(button);
    const snap = document.createElement('span');
    snap.className = 'story-snap-point';
    snap.setAttribute('aria-hidden', 'true');
    snap.style.top = `${index * 100}svh`;
    story.append(snap);
  });

  function setScene(index, p) {
    const scene = scenes[index];
    if (!scene) return;
    title.textContent = scene.title;
    copy.textContent = scene.copy;
    kicker.textContent = `Kapitola 0${index + 1} / 0${scenes.length} · ${scene.phase}`;
    stageCount.textContent = `0${index + 1} / 0${scenes.length}`;
    document.querySelector('#mobile-stage-name').textContent = scene.phase;
    services.replaceChildren(...scene.services.map(label => {
      const chip = document.createElement('span'); chip.className = 'service-chip'; chip.textContent = label; return chip;
    }));
    buttons.querySelectorAll('.stage-button').forEach((button, i) => {
      button.classList.toggle('is-active', i === index);
      if (i === index) button.setAttribute('aria-current', 'step'); else button.removeAttribute('aria-current');
    });
    progress.querySelectorAll('.progress-segment').forEach((bar, i) => {
      bar.style.setProperty('--fill', i < index ? '1' : i === index ? String(Math.max(.08, Math.min(.98, p * scenes.length - index))) : '0');
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
    room.style.setProperty('--wire-opacity', clamp((p - .1) / .025) * (1 - clamp((p - .39) / .05)));
    const wireOffset = 1 - clamp((p - .1) / .08);
    const wireLength = (410 * room.clientWidth + 610 * room.clientHeight) / 1000 + 2;
    wirePaths.forEach(path => {
      path.style.strokeDasharray = `${wireLength}px`;
      path.style.strokeDashoffset = `${wireLength * wireOffset}px`;
    });
    room.style.setProperty('--pipe-opacity', clamp((p - .18) / .02) * (1 - clamp((p - .4) / .04)));
    const pipeOffset = 1 - clamp((p - .19) / .09);
    pipePaths.forEach(({ path, length }) => {
      path.style.strokeDasharray = `${length}px`;
      path.style.strokeDashoffset = `${length * pipeOffset}px`;
    });
    room.style.setProperty('--ceiling-opacity', clamp((p - .56) / .12));
    room.style.setProperty('--light-opacity', clamp((p - .63) / .1));
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
    document.querySelector('.story-sticky').style.setProperty('--story-progress', Math.max(0, Math.min(1, p)));
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

  function updateStory() {
    const rect = story.getBoundingClientRect();
    const total = story.offsetHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, -rect.top / Math.max(1, total)));
    const mobile = matchMedia('(max-width: 760px)').matches;
    const index = mobile ? Math.min(scenes.length - 1, Math.round(p * (scenes.length - 1))) : Math.min(scenes.length - 1, Math.floor(p * scenes.length));
    if (mobile) {
      if (index !== mobileStageIndex) {
        const visualProgress = index === 0 ? .07 : Math.min(.99, (index + 1) / scenes.length - .001);
        const shouldScan = mobileStageIndex !== null && !matchMedia('(prefers-reduced-motion: reduce)').matches;
        setScene(index, visualProgress);
        room.classList.remove('is-scanning');
        if (shouldScan) {
          void room.offsetWidth;
          room.classList.add('is-scanning');
        }
        mobileStageIndex = index;
      }
    } else {
      mobileStageIndex = null;
      setScene(index, p);
    }
    document.querySelector('.site-header').classList.toggle('is-visible', window.scrollY > window.innerHeight * .72);
    scrollTick = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollTick) { window.requestAnimationFrame(updateStory); scrollTick = true; }
  }, { passive: true });
  window.addEventListener('resize', () => { mobileStageIndex = null; updateStory(); });
  updateStory();

  document.querySelector('#skip-story').addEventListener('click', () => document.querySelector('#sluzby').scrollIntoView({ behavior: 'smooth' }));
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false');
  }));

  document.querySelector('#inquiry-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.elements.website.value) return;
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
