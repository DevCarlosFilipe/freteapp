<?php

require_once __DIR__ . '/../enums/OrderStatus.php';
require_once __DIR__ . '/../database/Database.php';

class OrderService
{
    private PDO $connection;

    private const REQUIRED_FIELDS = [
        'originCityId', 'originStreet', 'originNumber', 'originNeighborhood', 'originZip',
        'destinationCityId', 'destinationStreet', 'destinationNumber', 'destinationNeighborhood', 'destinationZip',
        'weight', 'length', 'width', 'height', 'pickupDate'
    ];

    public function __construct(Database $database)
    {
        $this->connection = $database->connection();
    }

    /**
     * Cria um ou mais pedidos de uma vez, todos amarrados pelo mesmo
     * batch_id. Se qualquer um do pacote falhar na validação, nenhum
     * é gravado (tudo ou nada).
     */
    public function createBatch($clientId, array $ordersPayload)
    {
        $batchId = $this->generateUuid();
        $createdOrders = [];

        try {
            $this->connection->beginTransaction();

            foreach ($ordersPayload as $index => $orderData) {
                $validation = $this->validateOrder($orderData);

                if (!$validation['success']) {
                    $this->connection->rollBack();

                    return [
                        'success' => false,
                        'message' => $validation['message'],
                        'field' => $validation['field'] ?? null,
                        'index' => $index
                    ];
                }

                $originCity = $this->findActiveCity($orderData['originCityId']);
                $destinationCity = $this->findActiveCity($orderData['destinationCityId']);

                if (!$originCity || !$destinationCity) {
                    $this->connection->rollBack();

                    return [
                        'success' => false,
                        'message' => 'Cidade de origem ou destino inválida.',
                        'field' => !$originCity ? 'originCityId' : 'destinationCityId',
                        'index' => $index
                    ];
                }

                $code = $this->generateOrderCode();

                $originSnapshot = $this->buildAddressSnapshot($orderData, 'origin', $originCity);
                $destinationSnapshot = $this->buildAddressSnapshot($orderData, 'destination', $destinationCity);

                $statement = $this->connection->prepare(
                    'INSERT INTO orders
                        (code, batch_id, client_id,
                         origin_snapshot, destination_snapshot,
                         origin_city_id, destination_city_id,
                         weight_kg, length_cm, width_cm, height_cm,
                         hazard_level, declared_value,
                         status, requested_pickup_date)
                     VALUES
                        (:code, :batch_id, :client_id,
                         :origin_snapshot, :destination_snapshot,
                         :origin_city_id, :destination_city_id,
                         :weight_kg, :length_cm, :width_cm, :height_cm,
                         :hazard_level, :declared_value,
                         :status, :requested_pickup_date)'
                );

                $statement->execute([
                    'code' => $code,
                    'batch_id' => $batchId,
                    'client_id' => $clientId,
                    'origin_snapshot' => json_encode($originSnapshot, JSON_UNESCAPED_UNICODE),
                    'destination_snapshot' => json_encode($destinationSnapshot, JSON_UNESCAPED_UNICODE),
                    'origin_city_id' => $originCity['id'],
                    'destination_city_id' => $destinationCity['id'],
                    'weight_kg' => $orderData['weight'],
                    'length_cm' => $orderData['length'],
                    'width_cm' => $orderData['width'],
                    'height_cm' => $orderData['height'],
                    'hazard_level' => $orderData['hazardLevel'] ?? 'none',
                    'declared_value' => $orderData['declaredValue'] ?? null,
                    'status' => OrderStatus::PENDING_REVIEW,
                    'requested_pickup_date' => $orderData['pickupDate']
                ]);

                $orderId = $this->connection->lastInsertId();

                $historyStatement = $this->connection->prepare(
                    'INSERT INTO order_status_history (order_id, status)
                     VALUES (:order_id, :status)'
                );
                $historyStatement->execute([
                    'order_id' => $orderId,
                    'status' => OrderStatus::PENDING_REVIEW
                ]);

                $createdOrders[] = [
                    'id' => (int) $orderId,
                    'code' => $code,
                    'status' => OrderStatus::PENDING_REVIEW
                ];
            }

            $this->connection->commit();
        } catch (PDOException $exception) {
            $this->connection->rollBack();

            return [
                'success' => false,
                'message' => 'Não foi possível criar o(s) pedido(s).'
            ];
        }

        return [
            'success' => true,
            'orders' => $createdOrders
        ];
    }

    /**
     * Lista os pedidos do cliente já no formato que a tabela
     * "Minhas entregas" do dashboard espera (código, rota, status, previsão).
     */
    public function listForClient($clientId)
    {
        $statement = $this->connection->prepare(
            'SELECT id, code, status, origin_snapshot, destination_snapshot,
                    estimated_delivery_at, requested_pickup_date, created_at
             FROM orders
             WHERE client_id = :client_id
             ORDER BY created_at DESC'
        );
        $statement->execute(['client_id' => $clientId]);

        return array_map(function ($row) {
            $origin = json_decode($row['origin_snapshot'], true);
            $destination = json_decode($row['destination_snapshot'], true);

            return [
                'id' => (int) $row['id'],
                'code' => $row['code'],
                'status' => $row['status'],
                'route' => ($origin['city'] ?? '?') . ' → ' . ($destination['city'] ?? '?'),
                'estimatedDeliveryAt' => $row['estimated_delivery_at'],
                'requestedPickupDate' => $row['requested_pickup_date']
            ];
        }, $statement->fetchAll());
    }

    private function validateOrder($orderData)
    {
        foreach (self::REQUIRED_FIELDS as $field) {
            if (!isset($orderData[$field]) || $orderData[$field] === '') {
                return [
                    'success' => false,
                    'message' => 'Preencha todos os campos obrigatórios do pedido.',
                    'field' => $field
                ];
            }
        }

        return ['success' => true];
    }

    private function findActiveCity($cityId)
    {
        $statement = $this->connection->prepare(
            'SELECT id, name, state FROM cities WHERE id = :id AND active = 1 LIMIT 1'
        );
        $statement->execute(['id' => $cityId]);

        return $statement->fetch() ?: null;
    }

    private function buildAddressSnapshot($orderData, $prefix, $city)
    {
        return [
            'street' => $orderData[$prefix . 'Street'],
            'number' => $orderData[$prefix . 'Number'],
            'complement' => $orderData[$prefix . 'Complement'] ?? null,
            'neighborhood' => $orderData[$prefix . 'Neighborhood'],
            'city' => $city['name'],
            'state' => $city['state'],
            'zipCode' => $orderData[$prefix . 'Zip']
        ];
    }

    private function generateOrderCode()
    {
        $statement = $this->connection->prepare(
            'SELECT COUNT(*) FROM orders WHERE code = :code'
        );

        do {
            $code = 'MX' . random_int(100000, 999999);
            $statement->execute(['code' => $code]);
        } while ((int) $statement->fetchColumn() > 0);

        return $code;
    }

    private function generateUuid()
    {
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
}