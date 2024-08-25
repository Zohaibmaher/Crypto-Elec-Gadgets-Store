// Slideshow functionality
let slideIndex = 0;
showSlides();

function showSlides() {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 2000);
}

function currentSlide(n) {
    slideIndex = n - 1;
    showSlides();
}

// Add to Cart Function
function addToCart(productName, price) {
    alert(`${productName} has been added to your cart.`);
}

// Buy Now Function
function buyNow(productName, price) {
    document.getElementById('product-name').innerText = `Pay for ${productName}`;
    const paymentOptions = `
        <button onclick="payWithUSD('${productName}', ${price})">Buy with USD</button>
        <button onclick="payWithCrypto('${productName}')">Pay with Crypto</button>
    `;
    document.getElementById('payment-options').innerHTML = paymentOptions;
    document.getElementById('popup').style.display = 'block';
}

// Pay with USD Function
function payWithUSD(productName, price) {
    alert(`Processing USD payment for ${productName} costing $${price}`);
    closePopup();
}

// Pay with Crypto Function
function payWithCrypto(productName) {
    alert(`Processing Crypto payment for ${productName}`);
    closePopup();
}
// Example static exchange rates for demonstration
const exchangeRates = {
    BTC: 26000,  // 1 BTC = 26,000 USDT (example rate)
    ETH: 1600,   // 1 ETH = 1,600 USDT (example rate)
    USDT: 1,     // 1 USDT = 1 USDT
    XRP: 0.5     // 1 XRP = 0.5 USDT (example rate)
};

function payWithCrypto(productName) {
    document.getElementById('product-name').innerText = `Pay for ${productName}`;
    const paymentOptions = `
        <label for="crypto-select">Select Cryptocurrency:</label>
        <select id="crypto-select" onchange="showCryptoAddress()">
            <option value="">Select</option>
            <option value="BTC">Bitcoin</option>
            <option value="ETH">Ethereum</option>
            <option value="USDT">USDT</option>
            <option value="XRP">Ripple</option>
        </select>
        <div id="crypto-address"></div>
    `;
    document.getElementById('payment-options').innerHTML = paymentOptions;
    document.getElementById('popup').style.display = 'block';
}

function showCryptoAddress() {
    const crypto = document.getElementById('crypto-select').value;
    let address, screenshotInfo, priceComparison;

    // Example static price for a product in USDT
    const productPriceInUSDT = 300; 

    screenshotInfo = `
        <p>Please send the payment to the above address.</p>
        <p>Once done, take a screenshot and upload it in the form below to confirm your payment.</p>
        <input type="file" accept="image/*">
    `;

    switch (crypto) {
        case 'BTC':
            address = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
            break;
        case 'ETH':
            address = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
            break;
        case 'USDT':
            address = 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb';
            break;
        case 'XRP':
            address = 'rDsbeomae4FXwgQTJp9Rs64Qg9vDiTCdBv';
            break;
        default:
            address = '';
            screenshotInfo = '';
    }

    if (crypto in exchangeRates) {
        const rate = exchangeRates[crypto];
        const priceInCrypto = (productPriceInUSDT / rate).toFixed(6);
        priceComparison = `
        <p>Price in ${crypto}: ${priceInCrypto} ${crypto}</p>
            <p>You will send this amount of ${crypto}</p>
            
            
        `;
    }

    document.getElementById('crypto-address').innerHTML = `
        ${crypto} Address: <span id="crypto-address-text">${address}</span>
        <button onclick="copyToClipboard()">Copy Address</button>
        ${priceComparison || ''}
        ${screenshotInfo}
    `;
}

function copyToClipboard() {
    const addressText = document.getElementById('crypto-address-text').innerText;
    navigator.clipboard.writeText(addressText).then(() => {
        alert('Address copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
// Close Popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Show Product Gallery
function showProductGallery(productName) {
    document.getElementById('product-gallery').style.display = 'block';
}

// Close Product Gallery
function closeGallery() {
    document.getElementById('product-gallery').style.display = 'none';
}

// Change Product Image in Gallery
let currentImageIndex = 0;

function changeImage(n) {
    const images = document.querySelectorAll('.gallery-content .thumbnails img');
    if (n > 0) {
        currentImageIndex = (currentImageIndex + 1) % images.length;
    } else {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    }
    setMainImage(currentImageIndex);
}

function setMainImage(index) {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.gallery-content .thumbnails img');
    mainImage.src = thumbnails[index].src;
    thumbnails.forEach(img => img.classList.remove('active'));
    thumbnails[index].classList.add('active');
}
function payWithUSD(productName, price) {
    document.getElementById('product-name').innerText = `Pay for ${productName}`;
    const paymentForm = `
        <h3>Pay with USD</h3>
        <form id="usd-payment-form">
            <label for="card-number">Card Number:</label><br>
            <input type="text" id="card-number" name="card-number" required><br><br>
            <label for="expiry-date">Expiry Date:</label><br>
            <input type="text" id="expiry-date" name="expiry-date" placeholder="MM/YY" required><br><br>
            <label for="cvv">CVV:</label><br>
            <input type="text" id="cvv" name="cvv" required><br><br>
            <label for="cardholder-name">Cardholder Name:</label><br>
            <input type="text" id="cardholder-name" name="cardholder-name" required><br><br>
            <button type="submit">Submit Payment</button>
        </form>
    `;
    document.getElementById('payment-options').innerHTML = paymentForm;
    document.getElementById('popup').style.display = 'block';

    document.getElementById('usd-payment-form').onsubmit = function(e) {
        e.preventDefault();
        alert(`Payment of $${price} for ${productName} was successful!`);
        closePopup();
    };
}

function checkout() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = "checkout.html";
}
// Example product data (you might fetch this from a database or API in a real application)
const products = {
    "Watch1": {
        title: "Watch1",
        price: 300,
        description: "This is a detailed description of Watch1. It covers features, specifications, and more.",
        images: ["images/watch1-1.jpg", "images/watch1-2.jpg", "images/watch1-3.jpg"],
        rating: 4.5,
        reviews: 100
    },
    "Watch2": {
        title: "Watch2",
        price: 350,
        description: "This is a detailed description of Watch2. It covers features, specifications, and more.",
        images: ["images/watch2-1.jpg", "images/watch2-2.jpg", "images/watch2-3.jpg"],
        rating: 4.7,
        reviews: 150
    },
    // Add more products as needed
};

function showProductDetails(productName) {
    const product = products[productName];
    if (product) {
        // Set product details
        document.getElementById('product-title').innerText = product.title;
        document.getElementById('product-price').innerText = `$${product.price}`;
        document.getElementById('product-description').innerText = product.description;
        document.getElementById('product-rating').innerText = `Rating: ${product.rating}/5`;

        // Update gallery images
        const mainImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnails img');

        product.images.forEach((image, index) => {
            if (index === 0) {
                mainImage.src = image;
            }
            thumbnails[index].src = image;
        });

        // Save selected product to sessionStorage for use on the product details page
        sessionStorage.setItem('selectedProduct', productName);

        // Redirect to the product details page
        window.location.href = 'product-details.html';
    }
}

// Populate product details page on load
window.onload = function() {
    const productName = sessionStorage.getItem('selectedProduct');
    if (productName) {
        showProductDetails(productName);
    }
}
function showProductGallery(productId) {
    // Save the selected product ID to sessionStorage
    sessionStorage.setItem('selectedProduct', productId);

    // Redirect to the product details page
    window.location.href = 'product-details.html';
}
window.onload = function() {
    const productId = sessionStorage.getItem('selectedProduct');
    if (productId) {
        // Assuming you have a products object or can fetch product data
        const product = products[productId];
        if (product) {
            document.getElementById('product-title').innerText = product.title;
            document.getElementById('product-price').innerText = `$${product.price}`;
            document.getElementById('product-description').innerText = product.description;
            document.getElementById('product-rating').innerText = `Rating: ${product.rating}/5`;

            // Update the main image and thumbnails
            document.getElementById('main-product-image').src = product.images[0];
            const thumbnails = document.querySelectorAll('.thumbnails img');
            thumbnails.forEach((thumb, index) => {
                thumb.src = product.images[index];
            });
        }
    }
};
let cart = [];

// Function to add item to cart
function addToCart(productName, price) {
    const item = cart.find(i => i.productName === productName);
    if (item) {
        item.quantity += 1; // If the item is already in the cart, increase its quantity
    } else {
        cart.push({ productName, price, quantity: 1 });
    }
    updateCartCount(cart.length);
    alert(`${productName} has been added to your cart.`);
    updateCartPopup();
}

// Function to update cart count in the navbar
function updateCartCount(count) {
    document.getElementById("cart-count").innerText = count;
}

// Function to toggle the cart popup
function toggleCartPopup() {
    const popup = document.getElementById("cart-popup");
    popup.style.display = popup.style.display === "block" ? "none" : "block";
}

// Function to update the cart popup with current items
function updateCartPopup() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ''; // Clear previous items
    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.innerHTML = `<p>${item.productName} - $${item.price} x ${item.quantity}</p>`;
        cartItemsContainer.appendChild(itemElement);
    });
}

// Function to proceed to checkout (redirect to checkout page)
function checkout() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = "checkout.html";
}
function searchProducts() {
    const searchQuery = document.querySelector('.search-bar').value.trim().toLowerCase();
    const productItems = document.querySelectorAll('.product-item');

    if (searchQuery) {
        productItems.forEach(item => {
            const productName = item.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(searchQuery)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    } else {
        productItems.forEach(item => {
            item.style.display = '';
        });
        alert('Please enter a search term.');
    }
}

// Attach the function to the search icon
document.querySelector('.search-icon-container').addEventListener('click', searchProducts);
document.getElementById('reelButton').addEventListener('click', function() {
    const reelContainer = document.getElementById('reelContainer');
    reelContainer.classList.toggle('hidden');
});

document.getElementById('shareButton').addEventListener('click', function() {
    alert('Reel shared successfully!');
    // Implement actual share functionality here.
});

document.getElementById('userInfo').addEventListener('click', function() {
    alert('User Profile: John Doe\nEmail: johndoe@example.com');
    // You could replace the alert with a modal or other UI element to display user details.
});

document.addEventListener('DOMContentLoaded', function() {
    var reelBuyNowButton = document.getElementById('buyNowButton');
    var productItems = document.querySelectorAll('.product-item');
    var productsGrid = document.querySelector('.products-grid');

    reelBuyNowButton.addEventListener('click', function() {
        var productId = this.getAttribute('data-product-id');

        // Hide reel container and show product grid
        document.getElementById('reelContainer').classList.add('hidden');
        productsGrid.classList.remove('hidden');

        // Find and highlight the product item with the matching ID
        productItems.forEach(function(item) {
            if (item.getAttribute('data-product-id') === productId) {
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                item.classList.add('highlight');
            } else {
                item.classList.remove('highlight');
            }
        });
    });

    // Optionally, add CSS to highlight the product
    var style = document.createElement('style');
    style.innerHTML = `
        .highlight {
            border: 2px solid red; /* Highlighting border */
            background-color: #f0f0f0; /* Background color for highlighting */
        }
    `;
    document.head.appendChild(style);
});

