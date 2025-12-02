const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// === Single Product Page Logic ===
var MainImg = document.getElementById("MainImg");
var smallimg = document.getElementsByClassName("small-img");

// 1. Image Gallery Logic
if (MainImg) {
    if(smallimg.length > 0) {
        for(let i=0; i<smallimg.length; i++){
            smallimg[i].onclick = function() {
                MainImg.src = smallimg[i].src;
            }
        }
    }
    
    // 2. Load Image from URL (for dynamic product loading)
    const urlParams = new URLSearchParams(window.location.search);
    const imageParam = urlParams.get('image');

    if (imageParam) {
        MainImg.src = imageParam;
        for(let i=0; i<smallimg.length; i++){
            smallimg[i].src = imageParam;
        }
    }
}

// === Shopping Cart Logic ===

// Function to Add Item to Cart (called from sproduct.html)
const addToCartBtn = document.getElementById('addToCartBtn');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
        const product = {
            id: Date.now(), // Unique ID for removal
            name: document.getElementById('pro-name').innerText,
            price: document.getElementById('pro-price').innerText,
            size: document.getElementById('pro-size').value,
            quantity: document.getElementById('pro-qty').value,
            image: document.getElementById('MainImg').src
        };

        // Basic validation
        if (product.size === "Select Size") {
            alert("Please select a size");
            return;
        }

        // Get existing cart or initialize empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        alert("Item added to cart!");
    });
}

// Function to Load Cart Items (called on cart.html)
const cartBody = document.getElementById('cart-body');
if (cartBody) {
    loadCart();
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBody = document.getElementById('cart-body');
    const emptyMsg = document.getElementById('empty-cart-msg');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');

    cartBody.innerHTML = ''; // Clear current rows

    if (cart.length === 0) {
        emptyMsg.style.display = 'block';
        if(subtotalEl) subtotalEl.innerText = "$ 0";
        if(totalEl) totalEl.innerText = "$ 0";
        return;
    } else {
        emptyMsg.style.display = 'none';
    }

    let total = 0;

    cart.forEach((item, index) => {
        // Calculate subtotal for this item (Price * Qty)
        // Remove '$' and convert to float
        let price = parseFloat(item.price.replace('$', '')); 
        let itemSubtotal = price * item.quantity;
        total += itemSubtotal;

        let row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" onclick="removeFromCart(${index})"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${item.image}" alt=""></td>
            <td>${item.name}</td>
            <td>${item.size}</td>
            <td>${item.price}</td>
            <td><input type="number" value="${item.quantity}" readonly></td>
            <td>$${itemSubtotal.toFixed(2)}</td>
        `;
        cartBody.appendChild(row);
    });

    if(subtotalEl) subtotalEl.innerText = `$ ${total.toFixed(2)}`;
    if(totalEl) totalEl.innerText = `$ ${total.toFixed(2)}`;
}

// Function to Remove Item
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove item at index
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Re-render cart
}