// Products
const products = [
  {name:"Arc Lighter", price:850, image:"assets/images/arc-lighter.jpg"},
  {name:"Nose Hair Trimmer", price:840, image:"assets/images/nose-hair-trimmer.jpg"}
];

// Render products on homepage
function renderProducts(){
  const container = document.getElementById("productContainer");
  products.forEach((p,i)=>{
    const card = document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div class="price">৳ ${p.price}</div>
      <button onclick="buyNow(${i})">Buy Now</button>
    `;
    container.appendChild(card);
  });
}

// Buy Now
function buyNow(index){
  const p=products[index];
  window.location.href=`checkout.html?product=${encodeURIComponent(p.name)}&price=${p.price}`;
}

// Checkout page functions
function loadCheckout(){
  const params = new URLSearchParams(window.location.search);
  const product = params.get("product");
  const price = parseInt(params.get("price"));
  document.getElementById("product").innerText=product;
  document.getElementById("price").innerText=price;
  document.getElementById("productImg").src=products.find(p=>p.name===product).image;

  // Load districts & thana from JSON
  fetch("bangladesh_upazilas.json")
    .then(r=>r.json())
    .then(data=>{
      window.upazilaData = data;
      populateDistricts();
    });

  function populateDistricts(){
    const sel=document.getElementById("district");
    Object.keys(upazilaData).forEach(d=>{
      let o=document.createElement("option");
      o.value=d; o.text=d; sel.add(o);
    });
    populateThana();
  }

  function populateThana(){
    const sel=document.getElementById("thana");
    sel.innerHTML="";
    const dist=document.getElementById("district").value;
    (upazilaData[dist]||[]).forEach(t=>{
      let o=document.createElement("option");
      o.value=t; o.text=t; sel.add(o);
    });
    calc();
  }

  function calc(){
    const qty=parseInt(document.getElementById("qty").value);
    const dist=document.getElementById("district").value.trim();
    let delivery=120; if(dist==="Dhaka"){delivery=60;}
    document.getElementById("delivery").innerText=delivery;
    document.getElementById("total").innerText=price*qty+delivery;
  }

  document.getElementById("qty").onchange=calc;
  document.getElementById("district").onchange=populateThana;
  document.getElementById("district").onchange=calc;
}

// Place order via WhatsApp
function placeOrder(){
  const name=document.getElementById("name").value.trim();
  const phone=document.getElementById("phone").value.trim();
  const address=document.getElementById("address").value.trim();
  const district=document.getElementById("district").value;
  const thana=document.getElementById("thana").value;
  const product=document.getElementById("product").innerText;
  const price=parseInt(document.getElementById("price").innerText);
  const qty=parseInt(document.getElementById("qty").value);

  if(!name || !phone || !address){alert("Please fill name, phone, address"); return;}

  let delivery=120; if(district==="Dhaka"){delivery=60;}
  let total=price*qty+delivery;
  let id="TM"+Math.floor(100000+Math.random()*900000);

  const msg=`Order ID: ${id}
Name: ${name}
Phone: ${phone}
Address: ${address}
District: ${district}
Thana/Upazila: ${thana}
Product: ${product}
Quantity: ${qty}
Delivery: ৳${delivery}
Total: ৳${total}`;

  window.open("https://wa.me/8801980236917?text="+encodeURIComponent(msg), "_blank");
}
