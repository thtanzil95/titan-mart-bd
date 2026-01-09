// script.js

// ১. ডেমো পণ্য ডেটা: আপনার শুধুমাত্র ২টি পণ্য
const products = [
    { id: 5, name: "রিচার্জেবল আর্ক লাইটার (LED ডিসপ্লে)", price: 850, image: "images/arc-lighter.jpg" },
    { id: 8, name: "ইলেকট্রিক নোজ হেয়ার ট্রিমার", price: 550, image: "images/nose-trimmer.jpg" },
];

let cart = []; 

// কার্ট সেভ এবং লোড করার ফাংশন
function saveCart() {
    localStorage.setItem('titanMartCart', JSON.stringify(cart));
}

function loadCart() {
    cart = JSON.parse(localStorage.getItem('titanMartCart')) || [];
    updateCartDisplay();
}

// HTML উপাদান
const productList = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// পণ্য ডিসপ্লে করা
function renderProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/280x200?text=No+Image';">
            <h4>${product.name}</h4>
            <p>৳ ${product.price.toLocaleString('bn-BD')}</p>
            <button class="btn add-to-cart" data-id="${product.id}">কার্টে যোগ করুন</button>
        `;
        productList.appendChild(card);
    });
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });
}

// কার্টে পণ্য যোগ করা
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartDisplay();
    alert(`${product.name} কার্টে যোগ করা হয়েছে!`);
}

// কার্ট ডিসপ্লে আপডেট করা
function updateCartDisplay() {
    let totalQuantity = 0;
    let totalPrice = 0;
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>৳ ${(item.price * item.quantity).toLocaleString('bn-BD')}</span>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartCount.textContent = totalQuantity;
    cartTotalElement.textContent = totalPrice.toLocaleString('bn-BD');
}

// ইভেন্ট লিসেনার ও চেকআউট লজিক
document.getElementById('view-cart-btn').addEventListener('click', () => {
    cartModal.style.display = 'block';
});

document.querySelector('.close-btn').addEventListener('click', () => {
    cartModal.style.display = 'none';
});

document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length > 0) {
        cartModal.style.display = 'none';
        window.location.href = 'checkout.html'; 
    } else {
        alert("আপনার কার্ট খালি!");
    }
});

// ওয়েবসাইট চালু করার ফাংশন কল
loadCart();
renderProducts();