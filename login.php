<?php
header('Content-Type: application/json');

// Database connection
$host = 'localhost';
$db = 'your_database';
$user = 'your_username';
$pass = 'your_password';
$pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);

$username = $_POST['username'];
$password = $_POST['password'];

// Input sanitization
$username = htmlspecialchars($username);
$password = htmlspecialchars($password);

// Prepared statement to prevent SQL injection
$stmt = $pdo->prepare('SELECT * FROM users WHERE username = :username');
$stmt->execute(['username' => $username]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
}
?>
