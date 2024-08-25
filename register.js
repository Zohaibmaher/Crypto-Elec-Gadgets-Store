document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    fetch('register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful! Please check your email to verify your account.');
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            alert('Registration failed: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});
document.getElementById('register-form').addEventListener('submit', function(event) {
    const phoneInput = document.getElementById('phone');
    const phonePattern = /^\d{10}$/;

    if (!phonePattern.test(phoneInput.value)) {
        alert('Please enter a valid 10-digit phone number.');
        event.preventDefault(); // Prevent form submission
    }
});

