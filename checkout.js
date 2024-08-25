document.addEventListener('DOMContentLoaded', function() {
    // Retrieve cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Display order summary
    const orderSummary = document.getElementById('order-summary');
    let totalAmount = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('p');
        itemElement.innerText = `${item.productName} - $${item.price} x ${item.quantity}`;
        orderSummary.appendChild(itemElement);
        totalAmount += item.price * item.quantity;
    });

    // Update total amount
    document.getElementById('total-amount').innerText = totalAmount.toFixed(2);
});

function processCheckout() {
    // Capture form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zip = document.getElementById('zip').value;

    // Payment processing logic here (e.g., integrate with Stripe, PayPal, etc.)
    // For simplicity, let's just alert the user for now

    alert(`Thank you for your purchase, ${name}! Your order will be shipped to ${address}, ${city} - ${zip}.`);

    // Clear cart
    localStorage.removeItem('cart');
    window.location.href = "index.html";  // Redirect to homepage after checkout
}
