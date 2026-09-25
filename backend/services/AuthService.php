<?php

require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../security/Password.php';
require_once __DIR__ . '/../security/Session.php';
require_once __DIR__ . '/../database/Database.php';

class AuthService
{
    private PDO $connection;

    public function __construct(Database $database)
    {
        $this->connection = $database->connection();
    }

    public function login($identifier, $password, $rememberMe = false)
    {
        /*
         * O identifier pode ser:
         * - nome de usuário
         * - e-mail
         * - telefone
         */
        $normalizedIdentifier = trim($identifier);

        $normalizedPhone = preg_replace(
            '/\D/',
            '',
            $normalizedIdentifier
        );

        try {
            $statement = $this->connection->prepare(
                'SELECT id, username, first_name, last_name, email, phone, password
                 FROM users
                 WHERE username = :username
                    OR email = :email
                    OR phone = :phone
                 LIMIT 1'
            );

            $statement->execute([
                'username' => $normalizedIdentifier,
                'email' => $normalizedIdentifier,
                'phone' => $normalizedPhone
            ]);

            $userData = $statement->fetch();
        } catch (PDOException $exception) {
            return [
                'success' => false,
                'message' => 'Não foi possível consultar o usuário.',
                'field' => 'email',
                'user' => null
            ];
        }

        if (!$userData) {
            return [
                'success' => false,
                'message' => 'Usuário incorreto ou não existe.',
                'field' => 'email',
                'user' => null
            ];
        }

        if (!Password::verify($password, $userData['password'])) {
            return [
                'success' => false,
                'message' => 'Senha incorreta.',
                'field' => 'password',
                'user' => null
            ];
        }

        $user = $this->createUserFromData($userData);

        if (Session::checkAuth()) {
            Session::logout();
        }

        Session::login(
            $user->getId(),
            $rememberMe,
            [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'username' => $user->getUsername(),
                'email' => $user->getEmail()
            ]
        );

        return [
            'success' => true,
            'message' => 'Login realizado com sucesso.',
            'user' => $user
        ];
    }

    public function register($username, $email, $phone, $password)
    {
        $username = trim($username);
        $email = trim($email);
        $phone = preg_replace('/\D/', '', $phone ?: '');

        try {
            $statement = $this->connection->prepare(
                'SELECT username, email
                 FROM users
                 WHERE username = :username OR email = :email'
            );
            $statement->execute([
                'username' => $username,
                'email' => $email
            ]);

            $usernameExists = false;
            $emailExists = false;

            foreach ($statement->fetchAll() as $existingUser) {
                $usernameExists = $usernameExists || $existingUser['username'] === $username;
                $emailExists = $emailExists || $existingUser['email'] === $email;
            }

            if ($usernameExists) {
                return [
                    'success' => false,
                    'message' => 'Esse nome de usuário já está em uso.',
                    'field' => 'username',
                    'user' => null
                ];
            }

            if ($emailExists) {
                return [
                    'success' => false,
                    'message' => 'Esse e-mail já está cadastrado.',
                    'field' => 'email',
                    'user' => null
                ];
            }

            $statement = $this->connection->prepare(
                'INSERT INTO users
                    (username, first_name, last_name, email, phone, password, token)
                 VALUES
                    (:username, :first_name, :last_name, :email, :phone, :password, :token)'
            );

            $statement->execute([
                'username' => $username,
                'first_name' => null,
                'last_name' => null,
                'email' => $email,
                'phone' => $phone,
                'password' => Password::hash($password),
                'token' => bin2hex(random_bytes(32))
            ]);

            $user = new User(
                $this->connection->lastInsertId(),
                $username,
                $username,
                $email,
                $phone,
                null
            );
        } catch (PDOException $exception) {
            return [
                'success' => false,
                'message' => 'E-mail ou nome de usuário já cadastrado.',
                'field' => null,
                'user' => null
            ];
        }

        Session::login(
            $user->getId(),
            false,
            [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'username' => $user->getUsername(),
                'email' => $user->getEmail()
            ]
        );

        return [
            'success' => true,
            'message' => 'Cadastro realizado com sucesso.',
            'user' => $user
        ];
    }

    public function checkAuth()
    {
        if (!Session::checkAuth()) {
            return [
                'authenticated' => false,
                'user' => null
            ];
        }

        return [
            'authenticated' => true,
            'user' => Session::getUser()
        ];
    }

    public function logout()
    {
        Session::logout();

        return [
            'success' => true,
            'message' => 'Logout realizado com sucesso.'
        ];
    }

    private function createUserFromData($userData)
    {
        return new User(
            $userData['id'],
            trim($userData['first_name'] . ' ' . $userData['last_name']),
            $userData['username'],
            $userData['email'],
            $userData['phone'],
            $userData['password']
        );
    }

    private function generateUsername($email)
    {
        $emailName = strstr(trim($email), '@', true);
        $base = strtolower(preg_replace('/[^a-z0-9]+/i', '', $emailName ?: 'usuario'));
        $base = substr($base ?: 'usuario', 0, 45);
        $username = $base;
        $suffix = 1;

        $statement = $this->connection->prepare(
            'SELECT COUNT(*) FROM users WHERE username = :username'
        );

        while (true) {
            $statement->execute(['username' => $username]);

            if ((int) $statement->fetchColumn() === 0) {
                return $username;
            }

            $username = substr($base, 0, 50 - strlen((string) $suffix) - 1)
                . '-' . $suffix;
            $suffix++;
        }
    }
}