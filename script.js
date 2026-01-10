// ====== Products Array ======
const products = [
  {
    name: "Arc Lighter",
    price: 850,
    img: "arc-lighter.jpg"
  },
  {
    name: "Nose Hair Trimmer",
    price: 840,
    img: "nose-hair-trimmer.jpg"
  }
];

// ====== Render Products Dynamically ======
const container = document.getElementById("productContainer");
products.forEach((p, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <h3>${p.name}</h3>
    <div class="price">৳ ${p.price}</div>
    <button class="btn buy" onclick="buyNow(${index})">Buy Now</button>
    <button class="btn cart" onclick="addToCart(${index})">Add to Cart</button>
  `;
  container.appendChild(card);
});

// ====== Cart Functions ======
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}
function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}
function updateCartCount() {
  document.getElementById("cartCount").innerText = getCart().length;
}

// Add to Cart
function addToCart(index) {
  const cart = getCart();
  const prod = products[index];
  const exist = cart.find(p => p.name === prod.name);
  if (exist) { exist.qty += 1; } else { cart.push({ ...prod, qty: 1 }); }
  setCart(cart);
  alert(`${prod.name} added to cart`);
}

// Buy Now -> Checkout
function buyNow(index) {
  const prod = products[index];
  window.location.href = `checkout.html?product=${encodeURIComponent(prod.name)}&price=${prod.price}&img=${prod.img}`;
}

// ====== District + Thana JSON ======
let upazilaData = {};
fetch("bangladesh_upazilas.json")
  .then(r => r.json())
  .then(d => { upazilaData = d; populateDistricts(); });

// Populate District Dropdown
function populateDistricts() {
  const sel = document.getElementById("district");
  sel.innerHTML = "";
  Object.keys(upazilaData).forEach(d => {
    const o = document.createElement("option");
    o.value = d; o.text = d; sel.add(o);
  });
  populateThana();
  calcTotal();
}

// Populate Thana Dropdown
function populateThana() {
  const sel = document.getElementById("thana");
  sel.innerHTML = "";
  const dist = document.getElementById("district").value;
  (upazilaData[dist] || []).forEach(t => {
    const o = document.createElement("option");
    o.value = t; o.text = t; sel.add(o);
  });
  calcTotal();
}

// ====== Calculate Total ======
function calcTotal() {
  const qty = parseInt(document.getElementById("qty").value);
  const price = parseInt(document.getElementById("price").innerText);
  const dist = document.getElementById("district").value.toLowerCase();
  let delivery = 120;
  if (dist === "dhaka") delivery = 60;
  document.getElementById("delivery").innerText = delivery;
  document.getElementBy
