<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$action = "sem solicitação";

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $action = filter_input(INPUT_GET, 'action', FILTER_SANITIZE_STRING);
}

echo json_encode([
    "success" => true,
    "message" => "API funcionando! Acesse /api.",
    "tt" => "mensagem de teste",
    "action" => $action
]);