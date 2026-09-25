<?php

require_once __DIR__ . '/../services/AuthService.php';
require_once __DIR__ . '/../responses/Response.php';
require_once __DIR__ . '/../database/Database.php';

class AuthController
{
    private $authService;

    public function __construct(Database $database)
    {
        $this->authService = new AuthService($database);
    }

    public function login($data)
    {
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
        $rememberMe = filter_var(
            $data['rememberMe'] ?? false,
            FILTER_VALIDATE_BOOLEAN
        );

        if (!$email || !$password) {
            Response::error(
                'E-mail e senha são obrigatórios.',
                [
                    'field' => !$email ? 'email' : 'password'
                ]
            );

            return;
        }

        $result = $this->authService->login(
            $email,
            $password,
            $rememberMe
        );

        if (!$result['success']) {
            Response::error(
                $result['message'],
                [
                    'field' => $result['field'] ?? null
                ]
            );

            return;
        }

        $user = $result['user'];

        Response::success(
            $result['message'],
            [
                'user' => [
                    'id' => $user->getId(),
                    'name' => $user->getName(),
                    'email' => $user->getEmail()
                ]
            ]
        );
    }

    public function register($data)
    {
        $username = trim($data['username'] ?? '');
        $email = $data['email'] ?? null;
        $phone = $data['phone'] ?? '';
        $password = $data['password'] ?? null;
        $confirmPassword = $data['confirmPassword'] ?? null;
        $acceptTerms = filter_var(
            $data['acceptTerms'] ?? false,
            FILTER_VALIDATE_BOOLEAN
        );

        if (!$acceptTerms) {
            Response::error(
                'Você precisa aceitar os termos de uso para continuar.',
                ['field' => 'acceptTerms']
            );

            return;
        }

        if (!$username || !$email || !$password) {
            Response::error(
                'Nome de usuário, e-mail e senha são obrigatórios.',
                [
                    'field' => !$username ? 'username' : (!$email ? 'email' : 'password')
                ]
            );

            return;
        }

        if (strlen($password) < 6) {
            Response::error(
                'A senha deve ter pelo menos 6 caracteres.',
                ['field' => 'password']
            );

            return;
        }

        if ($password !== $confirmPassword) {
            Response::error(
                'As senhas não coincidem.',
                ['field' => 'confirmPassword']
            );

            return;
        }

        $result = $this->authService->register(
            $username,
            $email,
            $phone,
            $password
        );

        if (!$result['success']) {
            Response::error(
                $result['message'],
                ['field' => $result['field'] ?? null]
            );

            return;
        }

        $user = $result['user'];

        Response::success(
            $result['message'],
            [
                'user' => [
                    'id' => $user->getId(),
                    'name' => $user->getName(),
                    'email' => $user->getEmail()
                ]
            ]
        );
    }

    public function checkAuth($data)
    {
        Response::success(
            'Status de autenticação verificado.',
            [
                ...$this->authService->checkAuth()
            ]
        );
    }

    public function logout($data)
    {
        $result = $this->authService->logout();

        Response::success(
            $result['message']
        );
    }
}