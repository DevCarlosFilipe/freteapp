<?php

require_once __DIR__ . '/../responses/Response.php';
require_once __DIR__ . '/../database/Database.php';

/**
 * Único controller do app pensado pra ser público de propósito —
 * todos os outros exigem sessão. Por isso é extra importante que
 * ele NUNCA devolva dado sensível (rua, telefone, valor declarado):
 * qualquer pessoa pode chamar essa action, sem login, só com um código.
 */
class TrackingController
{
    private PDO $connection;

    public function __construct(Database $database)
    {
        $this->connection = $database->connection();
    }

    public function track($data)
    {
        $code = strtoupper(trim($data['code'] ?? ''));

        if (!$code) {
            Response::error('Informe o código do pedido.');
            return;
        }

        $statement = $this->connection->prepare(
            'SELECT code, status, origin_snapshot, destination_snapshot,
                    requested_pickup_date, estimated_delivery_at, delivered_at, created_at
             FROM orders
             WHERE code = :code
             LIMIT 1'
        );
        $statement->execute(['code' => $code]);
        $row = $statement->fetch();

        if (!$row) {
            Response::error('Pedido não encontrado. Confira o código e tente novamente.');
            return;
        }

        $origin = json_decode($row['origin_snapshot'], true);
        $destination = json_decode($row['destination_snapshot'], true);

        $historyStatement = $this->connection->prepare(
            'SELECT os.status, os.created_at
             FROM order_status_history os
             INNER JOIN orders o ON o.id = os.order_id
             WHERE o.code = :code
             ORDER BY os.created_at ASC'
        );
        $historyStatement->execute(['code' => $code]);

        Response::success('Pedido encontrado.', [
            'order' => [
                'code' => $row['code'],
                'status' => $row['status'],
                // Só cidade-estado, nunca rua/número/CEP.
                'originCity' => trim(($origin['city'] ?? '?') . ' - ' . ($origin['state'] ?? '')),
                'destinationCity' => trim(($destination['city'] ?? '?') . ' - ' . ($destination['state'] ?? '')),
                // Nome parcial do destinatário, nunca o telefone.
                'recipientFirstName' => $this->maskRecipientName($destination['recipientName'] ?? null),
                'requestedPickupDate' => $row['requested_pickup_date'],
                'estimatedDeliveryAt' => $row['estimated_delivery_at'],
                'deliveredAt' => $row['delivered_at'],
                'createdAt' => $row['created_at'],
                'history' => array_map(function ($entry) {
                    return [
                        'status' => $entry['status'],
                        'createdAt' => $entry['created_at']
                    ];
                }, $historyStatement->fetchAll())
            ]
        ]);
    }

    private function maskRecipientName($fullName)
    {
        if (!$fullName) {
            return null;
        }

        $parts = preg_split('/\s+/', trim($fullName));
        $firstName = $parts[0];

        if (isset($parts[1])) {
            return $firstName . ' ' . mb_substr($parts[1], 0, 1) . '.';
        }

        return $firstName;
    }
}