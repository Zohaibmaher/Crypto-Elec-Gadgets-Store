<?php
header('Content-Type: application/json');

// Database connection
$host = 'localhost';
$db = 'your_database';
$user = 'your_username';
$pass = 'your_password';
$pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);

$username = $_POST['username'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$password = $_POST['password'];

// Input sanitization
$username = htmlspecialchars($username);
$email = htmlspecialchars($email);
$phone = htmlspecialchars($phone);
$password = htmlspecialchars($password);

// Check if user already exists
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);
if ($stmt->fetch()) {
    echo json_encode(['success' => false, 'message' => 'Email already registered']);
    exit;
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Insert user into database
$stmt = $pdo->prepare('INSERT INTO users (username, email, phone, password) VALUES (:username, :email, :phone, :password)');
if ($stmt->execute([
    'username' => $username,
    'email' => $email,
    'phone' => $phone,
    'password' => $hashedPassword
])) {
    // Send verification email (you need to configure SMTP settings for this to work)
    $verificationCode = bin2hex(random_bytes(16)); // Generate a random verification code
    $stmt = $pdo->prepare('UPDATE users SET verification_code = :verification_code WHERE email = :email');
    $stmt->execute(['verification_code' => $verificationCode, 'email' => $email]);

    $to = $email;
    $subject = 'Verify your email address';
    $message = "Please click the link below to verify your email address:\n";
    $message .= "http://yourdomain.com/
