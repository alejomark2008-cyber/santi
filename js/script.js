const products=[
{name:"Air Max Urban",brand:"Nike",cat:"Calzado",price:429900,old:499900,icon:"👟"},
{name:"Running Essential",brand:"Adidas",cat:"Calzado",price:329900,old:null,icon:"👟"},
{name:"Polo Sport",brand:"Puma",cat:"Hombre",price:149900,old:179900,icon:"👕"},
{name:"501 Original",brand:"Levi's",cat:"Hombre",price:279900,old:null,icon:"👖"},
{name:"Camisa Essential",brand:"Zara",cat:"Mujer",price:159900,old:null,icon:"👚"},
{name:"Básico Daily",brand:"H&M",cat:"Mujer",price:99900,old:129900,icon:"👗"},
{name:"Go Walk",brand:"Skechers",cat:"Calzado",price:289900,old:null,icon:"👟"},
{name:"Mochila Urbana",brand:"Totto",cat:"Accesorios",price:179900,old:219900,icon:"🎒"},
{name:"Billetera Cuero",brand:"Vélez",cat:"Accesorios",price:189900,old:null,icon:"👝"},
{name:"Jeans Essential",brand:"Koaj",cat:"Hombre",price:139900,old:169900,icon:"👖"},
{name:"Conjunto Comfort",brand:"Leonisa",cat:"Mujer",price:169900,old:null,icon:"👗"},
{name:"Camisa Clásica",brand:"Arturo Calle",cat:"Hombre",price:189900,old:219900,icon:"👔"},
{name:"Camiseta Básica",brand:"Gef",cat:"Hombre",price:79900,old:null,icon:"👕"},
{name:"Blusa Studio",brand:"Studio F",cat:"Mujer",price:149900,old:179900,icon:"👚"}
];
let cart=[];
const money=n=>"$"+n.toLocaleString("es-CO");
let currentFilter="Todos";

function render(filter="Todos"){
 currentFilter=filter;
 const grid=document.getElementById("productGrid");
 let list=filter==="Todos"?products:products.filter(p=>p.cat===filter||p.brand===filter);
 document.getElementById("catalogTitle").textContent=filter==="Todos"?"Todos los productos":`Catálogo: ${filter}`;
 document.getElementById("activeFilter").textContent=filter==="Todos"?"Mostrando todo el catálogo":`Filtrando por: ${filter} · ${list.length} producto(s)`;
 grid.innerHTML=list.map(p=>`<article class="product">
 ${p.old?'<span class="badge">OFERTA</span>':''}
 <div class="product-image">${p.icon}</div>
 <div class="product-info"><span class="category-name">${p.cat}</span><span class="brand-name"> · ${p.brand}</span>
 <h3>${p.name}</h3><div class="price">${money(p.price)} ${p.old?`<span class="old">${money(p.old)}</span>`:""}</div>
 <button class="add" onclick="addToCart(${products.indexOf(p)})">Agregar al carrito</button></div></article>`).join("");
 document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.filter===filter));
}
function goFilter(filter){
 render(filter);
 document.getElementById("catalogo").scrollIntoView({behavior:"smooth"});
}
document.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>goFilter(btn.dataset.filter)));
function addToCart(i){cart.push(products[i]);document.getElementById("cartCount").textContent=cart.length;showCart()}
function showCart(){
 const items=document.getElementById("cartItems");
 items.innerHTML=cart.length?cart.map(p=>`<div class="cart-row"><span>${p.icon} ${p.name}</span><strong>${money(p.price)}</strong></div>`).join(""):"<p>Tu carrito está vacío.</p>";
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0));
 document.getElementById("cartModal").classList.add("open");
}
document.getElementById("cartBtn").onclick=showCart;
document.getElementById("closeModal").onclick=()=>document.getElementById("cartModal").classList.remove("open");
document.getElementById("cartModal").onclick=e=>{if(e.target.id==="cartModal")e.currentTarget.classList.remove("open")};
document.getElementById("checkout").onclick=()=>alert("Demo: aquí puedes conectar pago, WhatsApp o checkout real.");
document.getElementById("allCatalog").onclick=()=>goFilter("Todos");
document.getElementById("searchBtn").onclick=()=>{
 const q=prompt("Busca por producto o marca:");
 if(!q)return;
 const found=products.filter(p=>(p.name+" "+p.brand+" "+p.cat).toLowerCase().includes(q.toLowerCase()));
 if(found.length){render(found[0].brand.toLowerCase().includes(q.toLowerCase())?found[0].brand:"Todos");}
 else alert("No encontramos resultados para esa búsqueda.");
 document.getElementById("catalogo").scrollIntoView({behavior:"smooth"});
};
render();