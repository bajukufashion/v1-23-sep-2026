const products = [
  {name:'Aruna Set / Burgundy',category:'set',categoryLabel:'Set & Rok',color:'Burgundy',price:'Rp 289.000',image:'assets/img/aruna-set-rok/aruna-set-rok-burgundy.jpg',gallery:['assets/img/aruna-set-rok/aruna-set-rok-burgundy.jpg','assets/img/aruna-set-rok/aruna-set-rok-burgundy2.jpg','assets/img/aruna-set-rok/aruna-set-rok-burgundy3.jpg'],description:'Set dua piece dengan siluet relaxed yang membuatmu bebas bergerak. Warna burgundy untuk hari yang ingin dibuat sedikit lebih berani.',badge:'Best seller'},
  {name:'Aruna Set / Blue',category:'set',categoryLabel:'Set & Rok',color:'Ocean blue',price:'Rp 289.000',image:'assets/img/aruna-set-rok/aruna-set-rok-biru.jpg',gallery:['assets/img/aruna-set-rok/aruna-set-rok-biru.jpg','assets/img/aruna-set-rok/aruna-set-rok-biru2.jpg','assets/img/aruna-set-rok/aruna-set-rok-biru3.jpg'],description:'Warna biru yang tenang dengan potongan yang tetap punya karakter. Easy set untuk weekday sampai weekend.',badge:'New in'},
  {name:'Viona Blouse / Blue',category:'atasan',categoryLabel:'Atasan',color:'Powder blue',price:'Rp 169.000',image:'assets/img/blus-atasan/blus-viona-biru.jpg',gallery:['assets/img/blus-atasan/blus-viona-biru.jpg','assets/img/blus-atasan/blus-viona-biru2.jpg'],description:'Blouse ringan dengan detail yang manis dan fit yang flattering. Pair it with denim atau rok favoritmu.',badge:''},
  {name:'Aruna Set / Cocoa',category:'set',categoryLabel:'Set & Rok',color:'Dark cocoa',price:'Rp 289.000',image:'assets/img/aruna-set-rok/aruna-set-rok-cokelatTua.jpg',gallery:['assets/img/aruna-set-rok/aruna-set-rok-cokelatTua.jpg','assets/img/aruna-set-rok/aruna-set-rok-cokelatTua2.jpg','assets/img/aruna-set-rok/aruna-set-rok-cokelatTua3.jpg'],description:'Cocoa yang hangat dan gampang dipadukan. Siluet Aruna yang membuat outfit terasa selesai dalam satu langkah.',badge:''},
  {name:'Kimono Set / Mocca',category:'set',categoryLabel:'Set & Rok',color:'Mocca',price:'Rp 299.000',image:'assets/img/set-rok-kimono/set-rok-kimono-mocca1.jpg',gallery:['assets/img/set-rok-kimono/set-rok-kimono-mocca1.jpg','assets/img/set-rok-kimono/set-rok-kimono-mocca2.jpg','assets/img/set-rok-kimono/set-rok-kimono-mocca3.jpg'],description:'Kimono set dengan flowy skirt dan detail yang playful. Untuk momen yang ingin kamu ingat lebih lama.',badge:'Editor pick'},
  {name:'Viona Blouse / Dusty Pink',category:'atasan',categoryLabel:'Atasan',color:'Dusty pink',price:'Rp 169.000',image:'assets/img/blus-atasan/blus-viona-DustyPink.jpg',gallery:['assets/img/blus-atasan/blus-viona-DustyPink.jpg','assets/img/blus-atasan/blus-viona-DustyPink2.jpg'],description:'Dusty pink yang lembut, shape yang clean. Atasan yang bisa mengubah mood seluruh look-mu.',badge:''}
];
const grid=document.querySelector('#product-grid');
const modal=document.querySelector('#product-modal');
const modalImage=document.querySelector('#modal-image');
const modalThumbs=document.querySelector('#modal-thumbs');
const modalCategory=document.querySelector('#modal-category');
const modalName=document.querySelector('#modal-name');
const modalPrice=document.querySelector('#modal-price');
const modalDescription=document.querySelector('#modal-description');
const modalOrder=document.querySelector('#modal-order');

function renderProducts(filter='all'){
  grid.innerHTML=products.map((product,index)=>{const hidden=filter!=='all'&&product.category!==filter?'hidden':'';return `<article class="product-card ${hidden}" data-category="${product.category}" data-index="${index}" style="animation-delay:${index*70}ms"><div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy" />${product.badge?`<span class="product-badge">${product.badge}</span>`:''}<span class="product-arrow">↗</span></div><div class="product-meta"><div><div class="product-name">${product.name}</div><div class="product-color">${product.color}</div></div><div class="product-price">${product.price}</div></div></article>`}).join('');
  document.querySelectorAll('.product-card').forEach(card=>card.addEventListener('click',()=>openProduct(Number(card.dataset.index))));
}
function openProduct(index){
  const product=products[index];
  modalImage.src=product.gallery[0];modalImage.alt=product.name;modalCategory.innerHTML=`<i></i> ${product.categoryLabel}`;modalName.textContent=product.name;modalPrice.textContent=product.price;modalDescription.textContent=product.description;
  modalOrder.href=`https://wa.me/6281262419674?text=${encodeURIComponent(`Halo Bajuku Fashion, saya tertarik dengan ${product.name} (${product.price}). Apakah masih tersedia?`)}`;
  modalThumbs.innerHTML=product.gallery.map((image,thumbIndex)=>`<button type="button" aria-label="Lihat foto ${thumbIndex+1}"><img src="${image}" alt="" /></button>`).join('');
  modalThumbs.querySelectorAll('button').forEach((button,thumbIndex)=>button.addEventListener('click',()=>{modalImage.src=product.gallery[thumbIndex]}));
  modal.showModal();
}
renderProducts();
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelector('.filter.active').classList.remove('active');button.classList.add('active');renderProducts(button.dataset.filter)}));
document.querySelector('.modal-close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',event=>{if(event.target===modal)modal.close()});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.13});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
const cursorGlow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',event=>{cursorGlow.style.left=`${event.clientX}px`;cursorGlow.style.top=`${event.clientY}px`});
document.querySelector('.menu-toggle').addEventListener('click',()=>document.querySelector('.nav-links').classList.toggle('mobile-open'));