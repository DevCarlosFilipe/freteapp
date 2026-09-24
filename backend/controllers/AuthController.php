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
        $senha = $data['senha'] ?? null;
        $rememberMe = filter_var(
            $data['rememberMe'] ?? false,
            FILTER_VALIDATE_BOOLEAN
        );

        if (!$email || !$senha) {
            Response::error(
                'E-mail e senha são obrigatórios.',
                [
                    'field' => !$email ? 'email' : 'senha'
                ]
            );

            return;
        }

        $result = $this->authService->login(
            $email,
            $senha,
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
        $senha = $data['senha'] ?? null;
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

        if (!$username || !$email || !$senha) {
            Response::error(
                'Nome de usuário, e-mail e senha são obrigatórios.',
                [
                    'field' => !$username ? 'username' : (!$email ? 'email' : 'senha')
                ]
            );

            return;
        }

        if (strlen($senha) < 6) {
            Response::error(
                'A senha deve ter pelo menos 6 caracteres.',
                ['field' => 'senha']
            );

            return;
        }

        if ($senha !== $confirmPassword) {
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
            $senha
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