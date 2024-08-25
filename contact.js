document.getElementById('contact-form').addEventListener('submit', function(event) {  
    event.preventDefault(); // Prevent the default form submission  

    const subject = document.getElementById('subject').value;  
    const email = document.getElementById('email').value;  
    const message = document.getElementById('message').value;  

    // Here you can handle the form submission, e.g., send data to a server  
    alert(`Message sent!\nSubject: ${subject}\nEmail: ${email}\nMessage: ${message}`);  

    // Clear the form  
    document.getElementById('contact-form').reset();  
});