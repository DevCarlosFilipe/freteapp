<?php

require_once __DIR__ . '/../models/User.php';

class AuthService
{
    public function login($email, $senha)
    {
        // Usuário temporário para teste
        $usuario = new User(
            1,
            'Usuário Teste',
            'teste@email.com',
            '123456'
        );

        if (
            $email === $usuario->getEmail() &&
            $senha === $usuario->getPassword()
        ) {
            return [
                'success' => true,
                'message' => 'Login realizado com sucesso.',
                'user' => $usuario
            ];
        }

        return [
            'success' => false,
            'message' => 'E-mail ou senha inválidos.',
            'user' => null
        ];
    }


    public function register($name, $email, $senha)
    {
        // Usuário temporário para teste
        $usuario = new User(
            2,
            $name,
            $email,
            $senha
        );

        return [
            'success' => true,
            'message' => 'Cadastro realizado com sucesso.',
            'user' => $usuario
        ];
    }
}