<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../controllers/AuthController.php';

$method = $_SERVER['REQUEST_METHOD'];

$data = ($method === 'POST') ? json_decode(
    file_get_contents('php://input'),
    true
) : $_GET;

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