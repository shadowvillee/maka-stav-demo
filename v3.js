(() => {
  const content = window.MAKA_CONTENT;
  if (!content) return;
  const $ = selector => document.querySelector(selector);
  const iconPaths = {
    home:'M3 10 12 3l9 7v10H3V10zm5 10v-7h8v7',
    plan:'M4 4h16v16H4zM4 11h16M11 4v16',
    bath:'M3 12h18v3a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7v-3zm3 0V7a3 3 0 0 1 6 0',
    hammer:'M5 20 18 7M13 3l8 8-3 3-8-8z',
    wall:'M3 4h18v16H3zM3 10h18M3 16h18M9 4v6M15 10v6M9 16v4',
    tiles:'M3 3h18v18H3zM12 3v18M3 12h18',
    bolt:'M13 2 5 13h6l-1 9 9-12h-6z',
    light:'M9 18h6m-5 3h4M8 15a7 7 0 1 1 8 0l-1 2H9z',
    drop:'M12 2c3 5 7 9 7 13a7 7 0 0 1-14 0c0-4 4-8 7-13z',
    brush:'M5 18h12v3H5zM8 18V5a3 3 0 0 1 6 0v13M14 8h5',
    floor:'M3 7 12 3l9 4-9 4-9-4zm0 5 9 4 9-4M3 17l9 4 9-4',
    lightning:'M12 2v3m7 1-2 2M5 6l2 2M3 13h3m12 0h3M8 19l4-8h-3l5-7-1 7h3l-8 8z',
    door:'M5 3h14v18H5zM9 3v18M7 13h1',
    tools:'M4 20 17 7M14 4l6 6M5 5l4 4'
  };
  const categoryArt={bolt:0,wall:1,drop:2,floor:3,lightning:4};
  const icon = name => name in categoryArt ? `<svg class="category-art" viewBox="${categoryArt[name]*434.4} 120 434.4 480" aria-hidden="true"><image href="public/images/service-icons.png" width="2172" height="724"/></svg>` : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${iconPaths[name] || iconPaths.tools}"/></svg>`;
  const grid = $('#service-wall-grid');
  let activeService = null;

  function columns() {
    if (matchMedia('(max-width: 700px)').matches) return 2;
    if (matchMedia('(max-width: 900px)').matches) return 3;
    if (matchMedia('(max-width: 1200px)').matches) return 4;
    return 5;
  }
  function makeDetail(service) {
    const panel = document.createElement('div');
    panel.id = 'service-detail';
    panel.className = 'service-detail';
    panel.setAttribute('role','region');
    panel.setAttribute('aria-label',`Detail služby ${service.name}`);
    panel.innerHTML = `<figure class="service-detail-image"><img decoding="async"><figcaption>Ilustrační snímek</figcaption></figure><div class="service-detail-copy"><h3></h3><p></p><ul class="service-work-list"></ul><a class="button button-primary" href="#poptavka">Poptat tuto službu ↗</a></div>`;
    panel.querySelector('h3').textContent = service.name;
    panel.querySelector('p').textContent = service.description;
    panel.querySelector('ul').replaceChildren(...service.work.map(([title,description]) => {
      const li = document.createElement('li');
      const strong = document.createElement('strong'); strong.textContent = title;
      const span = document.createElement('span'); span.textContent = description;
      li.append(strong,span); return li;
    }));
    panel.querySelector('img').src = service.image;
    panel.querySelector('img').alt = service.imageAlt;
    panel.querySelector('a').dataset.inquiry = service.name;
    return panel;
  }
  function positionDetail() {
    const cards = [...grid.querySelectorAll('.service-tile')];
    const panel = grid.querySelector('#service-detail');
    if (!panel || !activeService) return;
    const index = cards.findIndex(card => card.dataset.id === activeService);
    if (index < 0) return;
    const rowEnd = Math.min(cards.length, Math.ceil((index+1)/columns())*columns());
    cards[rowEnd-1].after(panel);
  }
  function openService(id) {
    if (activeService === id) { activeService = null; grid.querySelector('#service-detail')?.remove(); }
    else {
      activeService = id;
      grid.querySelector('#service-detail')?.remove();
      const service = content.services.find(item => item.id === id);
      if (service) grid.append(makeDetail(service));
      positionDetail();
    }
    grid.querySelectorAll('.service-tile').forEach(tile => {
      const on = tile.dataset.id === activeService;
      tile.classList.toggle('is-active',on);
      tile.setAttribute('aria-expanded',String(on));
      if(on)tile.setAttribute('aria-controls','service-detail');else tile.removeAttribute('aria-controls');
    });
  }
  function renderServices() {
    activeService = null;
    const visible = content.services.filter(s=>s.status==='published');
    grid.replaceChildren(...visible.map(service => {
      const tile = document.createElement('button');
      tile.type='button'; tile.className='service-tile'; tile.dataset.id=service.id;
      tile.setAttribute('aria-expanded','false');
      tile.innerHTML = `${icon(service.icon)}<span></span><b aria-hidden="true">↗</b>`;
      tile.querySelector('span').textContent=service.name;
      tile.addEventListener('click',()=>openService(service.id));
      return tile;
    }));
  }
  renderServices();
  window.addEventListener('resize',positionDetail,{passive:true});

  const timeline=$('#process-timeline');
  const processDetail=$('#process-detail');
  let activeStep=0;
  function renderStep(index,focus=false){
    activeStep=index;
    timeline.querySelectorAll('button').forEach((button,i)=>{
      button.setAttribute('aria-selected',String(i===index)); button.tabIndex=i===index?0:-1;
    });
    processDetail.innerHTML='<span class="process-detail-number"></span><div><h3></h3><p></p></div>';
    processDetail.querySelector('.process-detail-number').textContent=String(index+1).padStart(2,'0');
    processDetail.querySelector('h3').textContent=content.steps[index][0];
    processDetail.querySelector('p').textContent=content.steps[index][1];
    processDetail.setAttribute('aria-labelledby',`process-step-${index+1}`);
    if(focus) timeline.children[index].focus();
  }
  timeline.replaceChildren(...content.steps.map(([title],index)=>{
    const button=document.createElement('button');button.type='button';button.id=`process-step-${index+1}`;
    button.setAttribute('role','tab');button.setAttribute('aria-controls','process-detail');
    button.innerHTML=`<span>${String(index+1).padStart(2,'0')}</span><strong></strong>`;
    button.querySelector('strong').textContent=title;
    button.addEventListener('click',()=>renderStep(index));
    button.addEventListener('keydown',event=>{
      let next=activeStep;
      if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(activeStep+1)%content.steps.length;
      else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(activeStep-1+content.steps.length)%content.steps.length;
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=content.steps.length-1;
      else return;
      event.preventDefault();renderStep(next,true);
    }); return button;
  }));
  renderStep(0);

  const form=$('#inquiry-form');
  const serviceSelect=form.elements.namedItem('service');
  const originalOptions=[...serviceSelect.options].map(option=>option.value);
  content.services.filter(s=>s.status==='published').forEach(service=>{
    if(originalOptions.includes(service.name))return;
    const option=document.createElement('option');option.value=service.name;option.textContent=service.name;serviceSelect.append(option);
  });
  ['Kompletní rekonstrukce na klíč','Menší oprava','Interiérový design a vizualizace'].forEach(name=>{
    if([...serviceSelect.options].some(option=>option.value===name))return;
    const option=document.createElement('option');option.value=name;option.textContent=name;serviceSelect.append(option);
  });
  document.addEventListener('click',event=>{
    const link=event.target.closest('[data-inquiry]');
    if(!link)return;
    const option=[...serviceSelect.options].find(item=>item.value===link.dataset.inquiry);
    if(option)serviceSelect.value=option.value;
  });

  const published=items=>items.filter(item=>item.status==='published');
  const projectList=published(content.projects);
  if(projectList.length){
    $('#realizace').hidden=false;
    $('#published-projects').replaceChildren(...projectList.slice(0,3).map(project=>{
      const a=document.createElement('a');a.href=`realizace/${encodeURIComponent(project.slug)}/`;
      const img=document.createElement('img');img.src=project.cover;img.alt=project.coverAlt||project.title;img.loading='lazy';
      const h=document.createElement('h3');h.textContent=project.title;a.append(img,h);return a;
    }));
  }
  const articleList=published(content.articles).sort((a,b)=>b.date.localeCompare(a.date));
  if(articleList.length){
    $('#blog-nav').hidden=false;
    $('#blog-preview').hidden=false;
    $('#published-articles').replaceChildren(...articleList.slice(0,3).map(article=>{
      const a=document.createElement('a');a.className='home-article';a.href=`blog/${encodeURIComponent(article.slug)}/`;
      const img=document.createElement('img');img.src=article.image;img.alt=article.imageAlt;img.loading='lazy';
      const body=document.createElement('div');
      const meta=document.createElement('span');meta.textContent=`${article.category} · ${new Intl.DateTimeFormat('cs-CZ',{day:'numeric',month:'long',year:'numeric'}).format(new Date(`${article.date}T12:00:00Z`))}`;
      const h=document.createElement('h3');h.textContent=article.title;
      const excerpt=document.createElement('p');excerpt.textContent=article.excerpt;
      const more=document.createElement('b');more.textContent='Číst článek →';
      body.append(meta,h,excerpt,more);a.append(img,body);return a;
    }));
  }
  const blogButton=$('#blog-nav button');
  blogButton.addEventListener('click',()=>blogButton.setAttribute('aria-expanded',String(blogButton.getAttribute('aria-expanded')!=='true')));
  document.addEventListener('keydown',event=>{if(event.key==='Escape' && blogButton.getAttribute('aria-expanded')==='true'){blogButton.setAttribute('aria-expanded','false');blogButton.focus();}});
  document.addEventListener('click',event=>{if(!event.target.closest('#blog-nav'))blogButton.setAttribute('aria-expanded','false');});
  const partnerList=published(content.partners).sort((a,b)=>(a.order||0)-(b.order||0));
  if(partnerList.length){
    $('#partner-logos').hidden=false;
    $('#partner-logos > div').replaceChildren(...partnerList.map(partner=>{
      const a=document.createElement('a');a.href=partner.url;a.rel='noopener noreferrer';a.target='_blank';a.setAttribute('aria-label',partner.name);
      const img=document.createElement('img');img.src=partner.logo;img.alt=partner.name;img.loading='lazy';a.append(img);return a;
    }));
  }

})();
