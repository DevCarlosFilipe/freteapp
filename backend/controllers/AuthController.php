<?php

require_once __DIR__ . '/../services/AuthService.php';
require_once __DIR__ . '/../responses/Response.php';
require_once __DIR__ . '/../models/User.php';

class AuthController
{
    private $authService;


    public function __construct()
    {
        $this->authService = new AuthService();
    }


    public function login($data)
    {
        $email = $data['email'] ?? null;
        $senha = $data['senha'] ?? null;


        if (!$email || !$senha) {

            Response::error(
                'E-mail e senha são obrigatórios.'
            );

            return;
        }


        $result = $this->authService->login(
            $email,
            $senha
        );


        if (!$result['success']) {

            Response::error(
                $result['message']
            );

            return;
        }


        $user = new User(
            $result['data']['user']['id'],
            $result['data']['user']['name'],
            $result['data']['user']['email']
        );


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
        $name = $data['name'] ?? null;
        $email = $data['email'] ?? null;
        $senha = $data['senha'] ?? null;


        if (!$name || !$email || !$senha) {

            Response::error(
                'Nome, e-mail e senha são obrigatórios.'
            );

            return;
        }


        $result = $this->authService->register(
            $name,
            $email,
            $senha
        );


        if (!$result['success']) {

            Response::error(
                $result['message']
            );

            return;
        }


        $user = new User(
            $result['data']['user']['id'],
            $result['data']['user']['name'],
            $result['data']['user']['email']
        );


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
}
