const products = [
  {name:"Camiseta Oversize", price:"$79.900", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80", discount:"-20%"},
  {name:"Buzo Hoodie", price:"$119.900", img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80", discount:"-15%"},
  {name:"Pantalón Cargo", price:"$109.900", img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80", discount:"-21%"},
  {name:"Tenis Urbanos", price:"$159.900", img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80", discount:""},
  {name:"Gorra Clásica", price:"$49.900", img:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=80", discount:"-18%"}
];

const grid = document.querySelector("#products");
grid.innerHTML = products.map(p => `
  <article class="product">
    <div style="position:relative">
      <img src="${p.img}" alt="${p.name}">
      ${p.discount ? `<span style="position:absolute;left:9px;top:9px;background:#f2b900;padding:5px 7px;border-radius:5px;font-size:10px;font-weight:800">${p.discount}</span>` : ""}
    </div>
    <div class="product-info">
      <h3>${p.name}</h3>
      <div class="price">${p.price}</div>
      <div class="rating">★★★★★ <span style="color:#777">(96)</span></div>
      <button class="add">🛒 Agregar al carrito</button>
    </div>
  </article>
`).join("");

let count = 0;
const counter = document.querySelector("#cartCount");
const toast = document.querySelector("#toast");

document.addEventListener("click", e => {
  if(e.target.classList.contains("add")){
    count++;
    counter.textContent = count;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  }
});

document.querySelector("#searchInput").addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".product").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(query) ? "" : "none";
  });
});
