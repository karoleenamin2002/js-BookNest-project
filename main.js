// تعريف المتغيرات
var products = [];
var categories = ['All', 'Electronics', 'Books', 'Clothing', 'Home Appliances'];

// تحميل المنتجات من ملف JSON
document.addEventListener('DOMContentLoaded', function () {
    setupBackToTopButton();

    // تحميل المنتجات بعد ما الصفحة تكون جاهزة
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./products.json");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            products = JSON.parse(xhr.responseText);
            
            updateCartCount();

            var container = document.getElementById('products-container');
            if (container) {
                displayProducts('All');
                
            }

            displayProductDetails();
        }
    };
});


// عرض المنتجات
function displayProducts(category) {
    var container = document.getElementById('products-container');
    if (!container) return;

    var filteredProducts = products;
    if (category && category !== 'All') {
        filteredProducts = products.filter(function (p) {
            return p.category === category;
        });
    }

    var productsHTML = '';
    for (var i = 0; i < filteredProducts.length; i++) {
        var product = filteredProducts[i];
        productsHTML += `
            <div class="product-card">
                <a href="product.html?id=${product.id}" class="details-link">
                    <img src="${product.image}" alt="${product.title}">
                </a>
                <div class="product-info">
                    <h3 style="height:50px">${product.title}</h3>
                    <p class="price">${product.price} $</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
                    <a href="product.html?id=${product.id}" class="details-link">Details</a>
                </div>
            </div>
        `;
    }

    container.innerHTML = productsHTML;

    var addToCartButtons = document.getElementsByClassName('add-to-cart');
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener('click', function () {
            var productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    }
}

// عرض تفاصيل منتج
function displayProductDetails() {
    var container = document.getElementById('product-container');
    if (!container) return;

    var urlParams = new URLSearchParams(window.location.search);
    var productId = parseInt(urlParams.get('id'));

    var product = products.find(item => item.id === productId);

    if (!product) {
        container.innerHTML = '<p style="text-align:center;">Product not found.</p>';
        return;
    }

    container.innerHTML = `
        <div class="product-container">
            <div class="product-row">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-price">Price: <strong>${product.price} $</strong></p>
                    <p class="product-category">Category: <strong>${product.category}</strong></p>
                    <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.add-to-cart-btn').addEventListener('click', function () {
        addToCart(product.id);
    });
}


// الزر الخاص بالرجوع لأعلى الصفحة
function setupBackToTopButton() {
    var backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
        });

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// زر تسجيل الدخول
var loginBtn = document.getElementById("login");
if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        window.location.href = "./login.html";
    });
}

// البحث
document.getElementById("searchBtn").addEventListener("click", function () {
    var query = document.getElementById("searchInput").value.toLowerCase().trim();
    if (!query) {
        displayProducts();
        return;
    }

    var filtered = products.filter(function (product) {
        return product.title.toLowerCase().includes(query);
    });

    displayFilteredProducts(filtered);
});

document.getElementById("searchInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        document.getElementById("searchBtn").click();
    }
});

document.getElementById("searchInput").addEventListener("input", function () {
    var query = this.value.toLowerCase().trim();
    if (!query) {
        displayProducts();
        return;
    }

    var filtered = products.filter(function (product) {
        return product.title.toLowerCase().includes(query);
    });

    displayFilteredProducts(filtered);
});

// عرض نتائج البحث
function displayFilteredProducts(filteredProducts) {
    var container = document.getElementById('products-container');
    if (!container) return;

    var productsHTML = '';
    for (var i = 0; i < filteredProducts.length; i++) {
        var product = filteredProducts[i];
        productsHTML += `
            <div class="product-card">
                <a href="product.html?id=${product.id}" class="details-link">
                    <img src="${product.image}" alt="${product.title}">
                </a>
                <div class="product-info">
                    <h3 style="height:50px">${product.title}</h3>
                    <p class="price">${product.price} $</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
                    <a href="product.html?id=${product.id}" class="details-link">Details</a>
                </div>
            </div>
        `;
    }

    container.innerHTML = productsHTML;

    var addToCartButtons = document.getElementsByClassName('add-to-cart');
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener('click', function () {
            var productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    }
}



