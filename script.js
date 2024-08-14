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
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";  
    dots[slideIndex - 1].className += " active";
}

// Automatic slideshow
setInterval(() => {
    plusSlides(1);
}, 5000); // Change slide every 5 seconds
let currentImageIndex = 0;
const watchImages = [
    'images/watch-thumb1.jpg',
    'images/watch-thumb2.jpg',
    'images/watch-thumb3.jpg'
];

function showProductGallery(product) {
    if (product === 'Watch') {
        document.getElementById('product-gallery').style.display = 'block';
        setMainImage(0);
    }
}

function setMainImage(index) {
    currentImageIndex = index;
    document.getElementById('main-product-image').src = watchImages[currentImageIndex];
}

function changeImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex >= watchImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = watchImages.length - 1;
    }

    setMainImage(currentImageIndex);
}

function closeGallery() {
    document.getElementById('product-gallery').style.display = 'none';
}
async function fetchExchangeRates() {
    const response = await fetch('https://api.example.com/crypto-rates');
    const data = await response.json();
    exchangeRates.BTC = data.BTC_USDT;
    exchangeRates.ETH = data.ETH_USDT;
    exchangeRates.USDT = 1;
    exchangeRates.XRP = data.XRP_USDT;
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
