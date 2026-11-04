(() => {
 const albums=window.MAKA_GALLERY||[],grid=document.querySelector('#gallery-grid'),dialog=document.querySelector('#gallery-dialog');
 if(!grid||!dialog)return;
 const categories={koupelny:'Koupelny',byty:'Rekonstrukce bytů',osvetleni:'Osvětlení a podhledy',exterier:'Exteriér'};
 const result=document.querySelector('#gallery-result'),more=document.querySelector('#gallery-more'),photo=document.querySelector('#gallery-photo'),error=dialog.querySelector('.gallery-image-error');
 let filter='all',limit=6,active=null,index=0,opener=null;
 const selected=()=>albums.filter(a=>filter==='all'||a.category===filter);
 function render(){
  const list=selected();grid.replaceChildren(...list.slice(0,limit).map(album=>{
   const b=document.createElement('button');b.type='button';b.className='gallery-album';b.setAttribute('aria-label',`Otevřít album ${album.title}, počet fotografií: ${album.photos.length}`);
   const visual=document.createElement('span');visual.className='gallery-cover';const img=document.createElement('img');img.src=album.photos[0].src;img.alt=album.photos[0].alt;img.loading='lazy';img.decoding='async';visual.append(img);
   const count=document.createElement('span');count.className='gallery-photo-count';count.textContent=`${album.photos.length} ${album.photos.length===1?'fotografie':album.photos.length<5?'fotografie':'fotografií'}`;visual.append(count);
   const body=document.createElement('span');body.className='gallery-album-copy';const tag=document.createElement('span');tag.className='gallery-category';tag.textContent=categories[album.category];const title=document.createElement('strong');title.textContent=album.title;const desc=document.createElement('span');desc.className='gallery-description';desc.textContent=album.description;body.append(tag,title,desc);b.append(visual,body);b.addEventListener('click',()=>open(album,b));return b;
  }));
  result.textContent=`${list.length} ${list.length===1?'album':list.length<5?'alba':'alb'} · ${list.reduce((n,a)=>n+a.photos.length,0)} fotografií`;more.hidden=limit>=list.length;
 }
 function show(next){index=(next+active.photos.length)%active.photos.length;const p=active.photos[index];error.hidden=true;photo.hidden=false;photo.src=p.src;photo.alt=p.alt;document.querySelector('#gallery-caption').textContent=p.alt;document.querySelector('#gallery-counter').textContent=`${index+1} / ${active.photos.length}`;dialog.querySelector('.gallery-prev').disabled=dialog.querySelector('.gallery-next').disabled=active.photos.length<2;}
 function open(album,button){active=album;opener=button;document.querySelector('#gallery-dialog-title').textContent=album.title;document.querySelector('#gallery-dialog-description').textContent=album.description;show(0);dialog.showModal();dialog.querySelector('.gallery-close').focus();}
 document.querySelectorAll('[data-gallery-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.galleryFilter;limit=6;document.querySelectorAll('[data-gallery-filter]').forEach(t=>t.setAttribute('aria-pressed',String(t===b)));render();}));
 more.addEventListener('click',()=>{const old=limit;limit+=6;render();grid.children[old]?.focus();});
 dialog.querySelector('.gallery-close').addEventListener('click',()=>dialog.close());dialog.querySelector('.gallery-prev').addEventListener('click',()=>show(index-1));dialog.querySelector('.gallery-next').addEventListener('click',()=>show(index+1));
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(index+(e.key==='ArrowRight'?1:-1));}});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{photo.removeAttribute('src');opener?.focus();});photo.addEventListener('error',()=>{photo.hidden=true;error.hidden=false;});render();
})();
