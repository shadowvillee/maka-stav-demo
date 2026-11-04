(() => {
 const dialog=document.querySelector('#team-profile-dialog');if(!dialog)return;
 const profiles={michal:{name:'Barber Michal',role:'Projektový manažer'},vlada:{name:'Vláďa Happy',role:'Stavbyvedoucí'}};let opener=null;
 document.querySelectorAll('.team-profile-open').forEach(button=>button.addEventListener('click',()=>{
  const id=button.dataset.profile,profile=profiles[id],source=document.querySelector(`#profile-${id}`);if(!profile||!source)return;
  opener=button;dialog.querySelector('#team-profile-title').textContent=profile.name;dialog.querySelector('#team-profile-role').textContent=profile.role;dialog.querySelector('.team-profile-content').replaceChildren(source.content.cloneNode(true));dialog.showModal();dialog.scrollTop=0;dialog.querySelector('.team-profile-close').focus();
 }));
 dialog.querySelector('.team-profile-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>opener?.focus());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
})();
