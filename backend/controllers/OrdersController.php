<?php

require_once __DIR__ . '/../services/OrderService.php';
require_once __DIR__ . '/../responses/Response.php';
require_once __DIR__ . '/../security/Session.php';
require_once __DIR__ . '/../database/Database.php';

class OrdersController
{
    private $orderService;

    public function __construct(Database $database)
    {
        $this->orderService = new OrderService($database);
    }

    public function create($data)
    {
        $userId = Session::getUserId();

        if (!$userId) {
            Response::error('Você precisa estar logado para criar um pedido.');
            return;
        }

        $ordersPayload = json_decode($data['orders'] ?? '', true);

        if (!is_array($ordersPayload) || empty($ordersPayload)) {
            Response::error('Nenhum pedido informado.');
            return;
        }

        $result = $this->orderService->createBatch($userId, $ordersPayload);

        if (!$result['success']) {
            Response::error(
                $result['message'],
                [
                    'field' => $result['field'] ?? null,
                    'index' => $result['index'] ?? null
                ]
            );
            return;
        }

        Response::success(
            'Pedido(s) criado(s) com sucesso.',
            ['orders' => $result['orders']]
        );
    }

    public function list($data)
    {
        $userId = Session::getUserId();

        if (!$userId) {
            Response::error('Você precisa estar logado.');
            return;
        }

        $orders = $this->orderService->listForClient($userId);

        Response::success('Pedidos carregados.', ['orders' => $orders]);
    }
}