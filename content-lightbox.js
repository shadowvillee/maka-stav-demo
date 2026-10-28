(() => {
  const triggers=[...document.querySelectorAll('.lightbox-trigger')];
  const dialog=document.querySelector('.content-lightbox');
  if(!dialog||!triggers.length)return;
  const image=dialog.querySelector('img');
  let current=0,opener=null;
  function show(index){current=(index+triggers.length)%triggers.length;image.src=triggers[current].dataset.full;image.alt=triggers[current].dataset.alt;}
  triggers.forEach((button,index)=>button.addEventListener('click',()=>{opener=button;show(index);dialog.showModal();dialog.querySelector('.content-lightbox-close').focus();}));
  dialog.querySelector('.content-lightbox-close').addEventListener('click',()=>dialog.close());
  dialog.querySelector('.content-lightbox-prev').addEventListener('click',()=>show(current-1));
  dialog.querySelector('.content-lightbox-next').addEventListener('click',()=>show(current+1));
  dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft')show(current-1);if(event.key==='ArrowRight')show(current+1);});
  dialog.addEventListener('close',()=>opener?.focus());
})();
