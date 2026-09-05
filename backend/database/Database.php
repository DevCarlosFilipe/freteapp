<?php

class Database
{
    private PDO $connection;

    public function __construct(array $config)
    {
        $database = $config['database'];
        $dsn = sprintf(
            'mysql:host=%s;dbname=%s;charset=%s',
            $database['host'],
            $database['name'],
            $database['charset']
        );

        $this->connection = new PDO($dsn, $database['user'], $database['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }

    public function connection(): PDO
    {
        return $this->connection;
    }
}
