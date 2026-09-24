<?php

require_once __DIR__ . '/../database/Database.php';
require_once __DIR__ . '/../responses/Response.php';

class UsersController
{
    private PDO $connection;

    public function __construct(Database $database)
    {
        $this->connection = $database->connection();
    }

    public function list($data)
    {
        try {
            $statement = $this->connection->query(
                'SELECT id, username, first_name, last_name, email, phone FROM users'
            );

            Response::success(
                'Usuários listados com sucesso.',
                [
                    'users' => $statement->fetchAll()
                ]
            );
        } catch (PDOException $exception) {
            Response::error(
                'Não foi possível listar os usuários.'
            );
        }
    }
}