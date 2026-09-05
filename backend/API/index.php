<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/../controllers/AuthController.php';

$method = $_SERVER['REQUEST_METHOD'];

$data = $_GET;

if ($method === 'POST') {
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    $rawBody = file_get_contents('php://input');

    $data = str_contains($contentType, 'application/json')
        ? (json_decode($rawBody, true) ?: [])
        : $_POST;
}

$action = $data['action'] ?? null;


switch ($action) {

    case 'login':

        $controller = new AuthController();
        $controller->login($data);

        break;


    case 'register':

        $controller = new AuthController();
        $controller->register($data);

        break;


    default:

        echo json_encode([
            'success' => false,
            'message' => 'Ação não encontrada.',
            'data' => null
        ], JSON_UNESCAPED_UNICODE);

        break;
}