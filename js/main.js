const products = [
  { name: "Arc Lighter", price: 850, image: "images/arc-lighter.jpg" },
  { name: "Nose Hair Trimmer", price: 840, image: "images/nose-hair-trimmer.jpg" }
];

const container = document.getElementById("productContainer");
products.forEach((p,i)=>{
  const card=document.createElement("div");
  card.className="card";
  card.innerHTML=`<img src="${p.image}" alt="${p.name}">
                  <h3>${p.name}</h3>
                  <div class="price">৳ ${p.price}</div>
                  <button class="btn" onclick="buyNow(${i})">Buy Now</button>`;
  container.appendChild(card);
});

function buyNow(index){
  const p=products[index];
  window.location.href=`checkout.html?product=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.image)}`;
}
