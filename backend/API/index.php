<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


$action = match ($_SERVER['REQUEST_METHOD']) {
    'GET' => filter_input(INPUT_GET, 'action', FILTER_SANITIZE_STRING),
    'POST' => filter_input(INPUT_POST, 'action', FILTER_SANITIZE_STRING),
    default => "Método não requisitado",
};

$msg = match ($_SERVER['REQUEST_METHOD']) {
    'GET' => filter_input(INPUT_GET, 'msg', FILTER_SANITIZE_STRING),
    'POST' => filter_input(INPUT_POST, 'msg', FILTER_SANITIZE_STRING),
    default => "Método não requisitado",
};

echo json_encode([
    "success" => true,
    "message" => "API funcionando! Acesse /api.",
    "tt" => "mensagem de teste com variável TT",
    "method" => $_SERVER['REQUEST_METHOD'],
    "msg" => $msg,
    "action" => $action
]);