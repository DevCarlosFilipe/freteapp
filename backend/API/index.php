<?php

$allowedOrigins = [
    'http://localhost:5173',
    'http://192.168.18.123:5173',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
}

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/../database/Database.php';

$config = require __DIR__ . '/../config/config.php';

try {
    $database = new Database($config);
} catch (PDOException $exception) {
    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Não foi possível conectar ao banco de dados.',
        'data' => null
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

require_once __DIR__ . '/../router/Router.php';

$router = new Router();

$router->run();