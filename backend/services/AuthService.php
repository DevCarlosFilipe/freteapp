<?php

require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../security/Password.php';
require_once __DIR__ . '/../security/Session.php';

class AuthService
{
    public function login($identifier, $senha, $rememberMe = false)
    {
        // Usuário temporário para teste
        $senhaHash = Password::hash('123456');

        $usuario = new User(
            1,
            'Usuário Teste',
            'usuario123',
            'teste@email.com',
            '79999999999',
            $senhaHash
        );

        /*
         * O identifier pode ser:
         * - nome de usuário
         * - e-mail
         * - telefone
         */
        $identifierNormalizado = trim($identifier);

        $telefoneNormalizado = preg_replace(
            '/\D/',
            '',
            $identifierNormalizado
        );

        $identificadorValido =
            $identifierNormalizado === $usuario->getUsername() ||
            strtolower($identifierNormalizado) === strtolower($usuario->getEmail()) ||
            $telefoneNormalizado === $usuario->getPhone();

        if (!$identificadorValido) {
            return [
                'success' => false,
                'message' => 'Usuário incorreto ou não existe.',
                'field' => 'email',
                'user' => null
            ];
        }

        if (!Password::verify($senha, $usuario->getPassword())) {
            return [
                'success' => false,
                'message' => 'Senha incorreta.',
                'field' => 'senha',
                'user' => null
            ];
        }

        if (Session::checkAuth()) {
            Session::logout();
        }

        Session::login(
            $usuario->getId(),
            $rememberMe,
            [
                'id' => $usuario->getId(),
                'name' => $usuario->getName(),
                'username' => $usuario->getUsername(),
                'email' => $usuario->getEmail()
            ]
        );

        return [
            'success' => true,
            'message' => 'Login realizado com sucesso.',
            'user' => $usuario
        ];
    }

    public function register($name, $email, $senha)
    {
        $senhaHash = Password::hash($senha);

        // Usuário temporário para teste
        $usuario = new User(
            2,
            $name,
            'usuario_novo',
            $email,
            '79988888888',
            $senhaHash
        );

        Session::login(
            $usuario->getId(),
            false,
            [
                'id' => $usuario->getId(),
                'name' => $usuario->getName(),
                'username' => $usuario->getUsername(),
                'email' => $usuario->getEmail()
            ]
        );

        return [
            'success' => true,
            'message' => 'Cadastro realizado com sucesso.',
            'user' => $usuario
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
}