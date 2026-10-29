// Keep links relative so the same export works under GitHub Pages' repository path.
(() => {
 const wizardURL=new URL('poptavka/',document.baseURI);
 function target(link){const url=new URL(wizardURL);const label=link.dataset.inquiry||link.dataset.service||'';const service=window.MAKA_CONTENT?.services.find(s=>s.name===label);if(service)url.searchParams.set('service',service.id);else if(label.includes('Kompletní'))url.searchParams.set('service','complete');else if(label.includes('design'))url.searchParams.set('service','design');return url.href;}
 document.querySelectorAll('a[data-inquiry]:not([data-simple-contact])').forEach(a=>{a.href=target(a);});
 document.addEventListener('click',event=>{const link=event.target.closest('a');if(!link||link.hasAttribute('data-simple-contact'))return;if(link.dataset.inquiry){link.href=target(link);}},true);
})();
