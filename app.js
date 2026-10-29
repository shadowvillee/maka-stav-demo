(() => {
  const nav = document.querySelector('.main-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const status = document.querySelector('#form-status');
  document.querySelector('#year').textContent = new Date().getFullYear();
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
  document.querySelector('#inquiry-form').addEventListener('submit', async event => {
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
    const endpoint = window.MAKA_CONTENT?.formEndpoint;
    if (endpoint) {
      if (!/^https:\/\//.test(endpoint)) {
        status.textContent = 'Odesílání není správně nastavené. Kontaktujte nás prosím telefonicky nebo e-mailem.';
        return;
      }
      const payload = Object.fromEntries(['name','phone','email','service','location','message'].map(key => [key, String(values.get(key) || '').trim().slice(0, key === 'message' ? 5000 : 250)]));
      const submit = form.querySelector('button[type="submit"]');
      submit.disabled = true;
      status.textContent = 'Odesíláme poptávku…';
      try {
        const response = await fetch(endpoint, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),credentials:'omit'});
        const result = await response.json();
        if (!response.ok || result.ok !== true) throw new Error('Delivery failed');
        form.reset();
        status.textContent = 'Poptávka byla odeslána. Děkujeme, ozveme se vám.';
      } catch {
        status.textContent = 'Poptávku se nepodařilo odeslat. Zavolejte nám nebo nám napište e-mail.';
      } finally {
        submit.disabled = false;
      }
      return;
    }
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
