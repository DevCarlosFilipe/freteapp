<?php

require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../security/Password.php';
require_once __DIR__ . '/../security/Session.php';
require_once __DIR__ . '/../database/Database.php';
require_once __DIR__ . '/Mailer.php';

class AuthService
{
    private PDO $connection;
    private Mailer $mailer;
    private string $frontendUrl;

    private const RESET_TOKEN_LIFETIME = 1800; // 30 minutos
    private const VERIFICATION_RESEND_COOLDOWN = 60; // 1 minuto
    private const PASSWORD_RESET_COOLDOWN = 60; // 1 minuto

    public function __construct(Database $database, array $config)
    {
        $this->connection = $database->connection();
        $this->mailer = new Mailer($config);
        $this->frontendUrl = rtrim($config['app']['frontend_url'] ?? '', '/');
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
                'SELECT id, username, first_name, last_name, email, phone, password, email_verified_at
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

            $verificationToken = bin2hex(random_bytes(32));

            $statement = $this->connection->prepare(
                'INSERT INTO users
                    (username, first_name, last_name, email, phone, password, token, verification_sent_at)
                 VALUES
                    (:username, :first_name, :last_name, :email, :phone, :password, :token, NOW())'
            );

            $statement->execute([
                'username' => $username,
                'first_name' => null,
                'last_name' => null,
                'email' => $email,
                'phone' => $phone,
                'password' => Password::hash($password),
                'token' => $verificationToken
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

        $this->sendVerificationEmail($email, $username, $verificationToken);

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

        $sessionUser = Session::getUser();

        $statement = $this->connection->prepare(
            'SELECT first_name, email_verified_at FROM users WHERE id = :id LIMIT 1'
        );
        $statement->execute(['id' => Session::getUserId()]);
        $row = $statement->fetch();
        $firstName = trim($row['first_name'] ?? '');

        return [
            'authenticated' => true,
            'user' => [
                ...$sessionUser,
                'firstName' => $firstName !== '' ? $firstName : null,
                'emailVerified' => $row ? $row['email_verified_at'] !== null : false
            ]
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

    public function verifyEmail($token)
    {
        if (!$token) {
            return [
                'success' => false,
                'message' => 'Token inválido.'
            ];
        }

        $statement = $this->connection->prepare(
            'SELECT id FROM users WHERE token = :token AND email_verified_at IS NULL LIMIT 1'
        );
        $statement->execute(['token' => $token]);
        $user = $statement->fetch();

        if (!$user) {
            return [
                'success' => false,
                'message' => 'Link de verificação inválido ou já utilizado.'
            ];
        }

        $update = $this->connection->prepare(
            'UPDATE users SET email_verified_at = NOW() WHERE id = :id'
        );
        $update->execute(['id' => $user['id']]);

        return [
            'success' => true,
            'message' => 'E-mail verificado com sucesso!'
        ];
    }

    public function resendVerification()
    {
        $userId = Session::getUserId();

        if (!$userId) {
            return [
                'success' => false,
                'message' => 'Você precisa estar logado.'
            ];
        }

        $statement = $this->connection->prepare(
            'SELECT username, email, token, email_verified_at, verification_sent_at
             FROM users WHERE id = :id LIMIT 1'
        );
        $statement->execute(['id' => $userId]);
        $user = $statement->fetch();

        if (!$user || $user['email_verified_at'] !== null) {
            return [
                'success' => false,
                'message' => 'E-mail já verificado ou usuário não encontrado.'
            ];
        }

        if ($user['verification_sent_at']) {
            $secondsSinceLastSend = time() - strtotime($user['verification_sent_at']);

            if ($secondsSinceLastSend < self::VERIFICATION_RESEND_COOLDOWN) {
                $wait = self::VERIFICATION_RESEND_COOLDOWN - $secondsSinceLastSend;

                return [
                    'success' => false,
                    'message' => "Aguarde {$wait} segundos antes de reenviar de novo."
                ];
            }
        }

        $this->sendVerificationEmail($user['email'], $user['username'], $user['token']);

        $update = $this->connection->prepare(
            'UPDATE users SET verification_sent_at = NOW() WHERE id = :id'
        );
        $update->execute(['id' => $userId]);

        return [
            'success' => true,
            'message' => 'E-mail de verificação reenviado.'
        ];
    }

    public function requestPasswordReset($email)
    {
        $email = trim($email);

        $statement = $this->connection->prepare(
            'SELECT id, username, reset_token_expires_at FROM users WHERE email = :email LIMIT 1'
        );
        $statement->execute(['email' => $email]);
        $user = $statement->fetch();

        $genericMessage = 'Se esse e-mail estiver cadastrado, você vai receber um link de redefinição.';

        // Resposta idêntica mesmo se o e-mail não existir, pra não revelar
        // quais e-mails estão cadastrados na base (enumeration attack).
        if (!$user) {
            return [
                'success' => true,
                'message' => $genericMessage
            ];
        }

        // Se um link já foi pedido há pouco tempo, não manda outro e-mail
        // (evita spam e gasto de cota), mas mantém a mesma resposta genérica.
        if ($user['reset_token_expires_at']) {
            $secondsUntilExpiry = strtotime($user['reset_token_expires_at']) - time();
            $secondsSinceRequest = self::RESET_TOKEN_LIFETIME - $secondsUntilExpiry;

            if ($secondsSinceRequest >= 0 && $secondsSinceRequest < self::PASSWORD_RESET_COOLDOWN) {
                return [
                    'success' => true,
                    'message' => $genericMessage
                ];
            }
        }

        $token = bin2hex(random_bytes(32));
        $tokenHash = hash('sha256', $token);
        $expiresAt = date('Y-m-d H:i:s', time() + self::RESET_TOKEN_LIFETIME);

        $update = $this->connection->prepare(
            'UPDATE users SET reset_token = :token, reset_token_expires_at = :expires WHERE id = :id'
        );
        $update->execute([
            'token' => $tokenHash,
            'expires' => $expiresAt,
            'id' => $user['id']
        ]);

        $link = $this->frontendUrl . '/reset-password?token=' . $token;

        $this->mailer->send(
            $email,
            'Redefinição de senha — FreteApp',
            "<p>Olá, {$user['username']}!</p>"
            . '<p>Clique no link abaixo para redefinir sua senha. Ele expira em 30 minutos.</p>'
            . "<p><a href=\"{$link}\">{$link}</a></p>"
        );

        return [
            'success' => true,
            'message' => $genericMessage
        ];
    }

    public function resetPassword($token, $newPassword)
    {
        if (!$token || !$newPassword) {
            return [
                'success' => false,
                'message' => 'Dados inválidos.',
                'field' => null
            ];
        }

        if (strlen($newPassword) < 6) {
            return [
                'success' => false,
                'message' => 'A senha deve ter pelo menos 6 caracteres.',
                'field' => 'password'
            ];
        }

        $tokenHash = hash('sha256', $token);

        $statement = $this->connection->prepare(
            'SELECT id FROM users WHERE reset_token = :token AND reset_token_expires_at > NOW() LIMIT 1'
        );
        $statement->execute(['token' => $tokenHash]);
        $user = $statement->fetch();

        if (!$user) {
            return [
                'success' => false,
                'message' => 'Link inválido ou expirado.',
                'field' => null
            ];
        }

        $update = $this->connection->prepare(
            'UPDATE users
             SET password = :password, reset_token = NULL, reset_token_expires_at = NULL
             WHERE id = :id'
        );
        $update->execute([
            'password' => Password::hash($newPassword),
            'id' => $user['id']
        ]);

        return [
            'success' => true,
            'message' => 'Senha redefinida com sucesso.'
        ];
    }

    private function sendVerificationEmail($email, $username, $token)
    {
        $link = $this->frontendUrl . '/verify-email?token=' . $token;

        $this->mailer->send(
            $email,
            'Confirme seu e-mail — FreteApp',
            "<p>Olá, {$username}!</p>"
            . '<p>Confirme seu e-mail clicando no link abaixo:</p>'
            . "<p><a href=\"{$link}\">{$link}</a></p>"
        );
    }

    private function createUserFromData($userData)
    {
        return new User(
            $userData['id'],
            trim($userData['first_name'] . ' ' . $userData['last_name']),
            $userData['username'],
            $userData['email'],
            $userData['phone'],
            $userData['password'],
            $userData['email_verified_at'] ?? null
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