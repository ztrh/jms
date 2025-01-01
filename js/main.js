// Header Scroll
let nav = document.querySelector(".navbar");
window.onscroll = function () {
    if (document.documentElement.scrollTop > 50) {
        nav.classList.add("header-scrolled");
    } else {
        nav.classList.remove("header-scrolled");
    }
};

// Navbar Hide
let navbar = document.querySelectorAll(".nav-link");
let navCollaps = document.querySelector(".navbar-collapse.collapse");
navbar.forEach(function (e) {
    e.addEventListener("click", function () {
        navCollaps.classList.remove("show");
    });
});

// Account Login/Register
// Toggle between Sign In and Register forms
document.addEventListener('DOMContentLoaded', function () {
    window.toggleForm = function (formType) {
        const signInForm = document.getElementById('signInForm');
        const signUpForm = document.getElementById('signUpForm');
        const toggleToSignIn = document.getElementById('toggleToSignIn');
        const toggleToSignUp = document.getElementById('toggleToSignUp');

        if (formType === 'signUp') {
            signInForm.style.display = 'none';
            signUpForm.style.display = 'block';
            toggleToSignUp.classList.add('active-btn');
            toggleToSignIn.classList.remove('active-btn');
        } else {
            signInForm.style.display = 'block';
            signUpForm.style.display = 'none';
            toggleToSignIn.classList.add('active-btn');
            toggleToSignUp.classList.remove('active-btn');
        }
    };

    // Toggle Password Visibility
    document.querySelectorAll('.toggle-password').forEach((button) => {
        button.addEventListener('click', function () {
            const target = document.getElementById(this.getAttribute('data-target'));
            const icon = this.querySelector('i');
            if (target.type === 'password') {
                target.type = 'text';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            } else {
                target.type = 'password';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            }
        });
    });
});

// Cart Management
let cart = [];

// Update Floating Cart Display
function updateFloatingCart() {
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    document.getElementById('itemCount').innerText = `${itemCount} ITEMS`;
    document.getElementById('totalPrice').innerText = `৳ ${totalPrice.toFixed(2)}`;
}

// Toggle Cart Popover
function toggleCart() {
    const cartPopover = document.getElementById('cartPopover');
    cartPopover.style.display = cartPopover.style.display === 'none' ? 'block' : 'none';
    renderCart();
}

// Add Item to Cart
function addToCart(name, price, image) {
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price: parseFloat(price), image, quantity: 1 });
    }

    updateFloatingCart();
    renderCart();
}

// Render Cart Items
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const salesTax = document.getElementById('salesTax');
    const cartTotal = document.getElementById('cartTotal');
    const itemCountHeader = document.getElementById('itemCountHeader');

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;

        cartItemsContainer.innerHTML += `
            <div class="cart-item d-flex justify-content-between align-items-center mb-2">
                <img src="${item.image || 'placeholder.jpg'}" alt="${item.name}" width="50" height="50" class="me-2">
                <div class="cart-item-details">
                    <p class="mb-1">${item.name}</p>
                    <p class="mb-0">৳${item.price} x ${item.quantity}</p>
                </div>
                <div class="cart-actions">
                    <button onclick="updateQuantity(${index}, -1)" style="width: 30px; height: 30px; font-size: 22px; background: none; border: none; cursor: pointer;">
                        <i class="far fa-minus-square"></i>
                    </button>
                    <button onclick="updateQuantity(${index}, 1)" style="width: 30px; height: 30px; font-size: 22px; background: none; border: none; cursor: pointer;">
                        <i class="far fa-plus-square"></i>
                    </button>
                    <button onclick="removeItem(${index})" style="width: 30px; height: 30px; background: none; border: none; cursor: pointer;">
                        <i class="fas fa-trash-alt" style="color: red; font-size: 22px;"></i>
                    </button>
                </div>
            </div>
        `;
    });

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    cartSubtotal.innerText = `৳ ${subtotal.toFixed(2)}`;
    salesTax.innerText = `৳ ${tax.toFixed(2)}`;
    cartTotal.innerText = `৳ ${total.toFixed(2)}`;
    itemCountHeader.innerText = cart.length;

    updateFloatingCart();
}

// Update Quantity of Cart Item
function updateQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    renderCart();
}

// Remove Item from Cart
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

// Checkout Functionality
function checkout() {
    const orderMessage = document.getElementById('orderMessage');

    if (cart.length === 0) {
        orderMessage.style.color = 'red';
        orderMessage.innerText = 'No product added to the cart!';
        orderMessage.style.fontSize = '18px';
    } else {
        orderMessage.style.color = 'green';
        orderMessage.style.fontSize = '18px';
    }

    setTimeout(() => {
        orderMessage.innerText = '';
    }, 3000);
}

// Attach Click Event to Shopping Bag Icons
document.querySelectorAll('.fa-shopping-bag').forEach((icon) => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();

        const productCard = icon.closest('.product-card');
        const productName = productCard.querySelector('h3').innerText;
        const productPriceText = productCard.querySelector('span').innerText;
        const productPrice = parseFloat(productPriceText.replace('$', '').trim()) || 0;
        const productImage = productCard.querySelector('img').src;

        if (productPrice > 0) {
            addToCart(productName, productPrice, productImage);
        }
    });
});

// Search function
function searchProducts(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const productContainer = document.getElementById('productContainer');
    const products = productContainer.getElementsByClassName('product-card');

    for (let i = 0; i < products.length; i++) {
      const productName = products[i].getElementsByTagName('h3')[0].innerText.toLowerCase();
      if (productName.includes(searchInput)) {
        products[i].parentElement.style.display = '';
      } else {
        products[i].parentElement.style.display = 'none';
      }
    }
  }

// Close Cart Popover
const closeCartButton = document.getElementById('closeCart');
if (closeCartButton) {
    closeCartButton.addEventListener('click', () => {
        document.getElementById('cartPopover').style.display = 'none';
    });
}

async function saveCartToDatabase() {
    console.log('Saving cart:', cart);
    if(cart.length === 0) {
        return;
    }
    try {
        const user = await fetch("https://randomuser.me/api/");;

        const userData = await user.json();

        const cartData = cart.map(item => ({name: item.name, price: item.price, quantity: item.quantity, user: userData.results[0].name.first + " " + userData.results[0].name.last, status: 'pending'}));
        console.log(cartData);

        const response = await fetch('http://localhost:9000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartData)
        });

        if (response.ok) {
            document.getElementById('orderMessage').innerText = 'Order Saved Successfully!';
            cart = [];
            renderCart();
        } else {
            document.getElementById('orderMessage').innerText = 'Failed to Save Order!';
        }
    } catch (error) {
        console.error('Error saving cart:', error);
        document.getElementById('orderMessage').innerText = 'Failed to Save Order!';
    }
}
  
  // Call this function when checkout button is clicked
  document.getElementById('checkoutButton').addEventListener('click', saveCartToDatabase);

