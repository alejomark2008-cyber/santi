const products=[
{name:"Camisa Lino Caribe",cat:"Hombre",price:129900,old:159900,icon:"👔"},
{name:"Vestido Tierra",cat:"Mujer",price:189900,old:229900,icon:"👗"},
{name:"Tenis Urbano",cat:"Calzado",price:219900,old:null,icon:"👟"},
{name:"Bolso Artesanal",cat:"Accesorios",price:99900,old:129900,icon:"👜"},
{name:"Camiseta Esencial",cat:"Hombre",price:79900,old:null,icon:"👕"},
{name:"Blusa Caribe",cat:"Mujer",price:119900,old:149900,icon:"👚"},
{name:"Sandalia Natural",cat:"Calzado",price:139900,old:null,icon:"👡"},
{name:"Gorra Colombia",cat:"Accesorios",price:69900,old:89900,icon:"🧢"}
];
let cart=[];
const money=n=>"$"+n.toLocaleString("es-CO");
function render(filter="Todos"){
 const grid=document.getElementById("productGrid");
 const list=filter==="Todos"?products:products.filter(p=>p.cat===filter);
 grid.innerHTML=list.map((p,i)=>`<article class="product">
 ${p.old?'<span class="badge">OFERTA</span>':''}
 <div class="product-image">${p.icon}</div>
 <div class="product-info"><span class="category-name">${p.cat}</span><h3>${p.name}</h3>
 <div class="price">${money(p.price)} ${p.old?`<span class="old">${money(p.old)}</span>`:""}</div>
 <button class="add" onclick="addToCart(${products.indexOf(p)})">Agregar al carrito</button></div></article>`).join("");
}
function addToCart(i){cart.push(products[i]);document.getElementById("cartCount").textContent=cart.length;showCart()}
function showCart(){
 const items=document.getElementById("cartItems");
 if(!cart.length){items.innerHTML="<p>Tu carrito está vacío.</p>"}else{
  items.innerHTML=cart.map((p,i)=>`<div class="cart-row"><span>${p.icon} ${p.name}</span><strong>${money(p.price)}</strong></div>`).join("");
 }
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0));
 document.getElementById("cartModal").classList.add("open");
}
document.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
 if(btn.classList.contains("filter"))btn.classList.add("active");
 render(btn.dataset.filter);document.getElementById("productos").scrollIntoView({behavior:"smooth"});
}));
document.getElementById("cartBtn").onclick=showCart;
document.getElementById("closeModal").onclick=()=>document.getElementById("cartModal").classList.remove("open");
document.getElementById("cartModal").onclick=e=>{if(e.target.id==="cartModal")e.currentTarget.classList.remove("open")};
document.getElementById("checkout").onclick=()=>alert("Demo: aquí puedes conectar tu pasarela de pago o WhatsApp.");
document.getElementById("searchBtn").onclick=()=>{const q=prompt("¿Qué producto buscas?");if(q){render("Todos");const found=products.filter(p=>(p.name+" "+p.cat).toLowerCase().includes(q.toLowerCase()));alert(found.length?`Encontramos ${found.length} producto(s).`:"No encontramos ese producto.");document.getElementById("productos").scrollIntoView({behavior:"smooth"})}};
render();