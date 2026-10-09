<?php

require_once __DIR__ . '/../responses/Response.php';
require_once __DIR__ . '/../database/Database.php';

class CitiesController
{
    private PDO $connection;

    public function __construct(Database $database)
    {
        $this->connection = $database->connection();
    }

    public function list($data)
    {
        $statement = $this->connection->prepare(
            'SELECT id, name, state FROM cities WHERE active = 1 ORDER BY name ASC'
        );
        $statement->execute();

        Response::success(
            'Cidades carregadas.',
            ['cities' => $statement->fetchAll()]
        );
    }
}