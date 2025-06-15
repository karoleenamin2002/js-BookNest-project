var products= []
var categories = ['All', 'Electronics', 'Books', 'Clothing', 'Home Appliances'];
var xhr=new XMLHttpRequest();
xhr.open("GET","./products.json");
xhr.send()
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        products = JSON.parse(xhr.responseText);
        displayProducts();
        setupCategoryFilters();
    }
};

var cart = JSON.parse(localStorage.getItem('cart')) || [];


function addToCart(productId) {
    var product = null;
    for (var i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            product = products[i];
            break;
        }
    }
    if (!product) return;

    var existingItem = null;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            existingItem = cart[i];
            break;
        }
    }

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    updateCart();
    showToast('The product has been added to the cart.');
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    var count = 0;
    for (var i = 0; i < cart.length; i++) {
        count += cart[i].quantity;
    }

    var cartCountElements = document.querySelectorAll('.cart-count');
    for (var i = 0; i < cartCountElements.length; i++) {
        cartCountElements[i].textContent = count;
    }
}

function showToast(message) {
    var toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(function() {
        toast.remove();
    }, 3000);
}

function displayCartItems() {
    var container = document.getElementById('cart-items-container');
    if (!container) return;

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Your shopping cart is empty</p>';
        updateSummary();
        return;
    }

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="item-info">
                <h3>${item.title}</h3>
                <p>$${item.price} × ${item.quantity}</p>
            </div>
            <div class="item-actions">
                <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                <button class="remove-btn" data-id="${item.id}">delete</button>
            </div>
        `;
        container.appendChild(itemElement);
    }

    updateSummary();
}

function updateSummary() {
    var totalItems = 0;
    var totalPrice = 0;

    for (var i = 0; i < cart.length; i++) {
        totalItems += cart[i].quantity;
        totalPrice += cart[i].price * cart[i].quantity;
    }

    document.getElementById('items-count').textContent = totalItems;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

function updateQuantity(productId, action) {
    var item = null;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            item = cart[i];
            break;
        }
    }
    if (!item) return;

    if (action === 'increase') {
        item.quantity += 1;
    } else if (action === 'decrease') {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].id === productId) {
                    cart.splice(i, 1);
                    break;
                }
            }
        }
    }

    updateCart();
    displayCartItems();
}

function removeFromCart(productId) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart.splice(i, 1);
            break;
        }
    }
    updateCart();
    displayCartItems();
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('quantity-btn')) {
        var productId = parseInt(e.target.getAttribute('data-id'));
        var action = e.target.getAttribute('data-action');
        updateQuantity(productId, action);
    }

    if (e.target.classList.contains('remove-btn')) {
        var productId = parseInt(e.target.getAttribute('data-id'));
        removeFromCart(productId);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    displayCartItems();
});