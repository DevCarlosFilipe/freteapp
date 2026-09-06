<?php

require_once __DIR__ . '/../controllers/AuthController.php';

class Router
{
    private $routes = [];

    public function __construct()
    {
        $this->registerControllers();
    }

    private function registerControllers()
    {
        $this->registerController(
            'auth',
            AuthController::class
        );
    }

    private function registerController($name, $controllerClass)
    {
        $reflection = new ReflectionClass($controllerClass);

        $methods = $reflection->getMethods(
            ReflectionMethod::IS_PUBLIC
        );

        foreach ($methods as $method) {

            if ($method->isConstructor()) {
                continue;
            }

            $action = $name . '.' . $method->getName();

            $this->routes[$action] = [
                'controller' => $controllerClass,
                'method' => $method->getName()
            ];
        }
    }

    public function run()
    {
        $data = $this->getRequestData();

        $action = $data['action'] ?? null;

        if (!$action) {
            $this->error('Ação não informada.');
            return;
        }

        if (!isset($this->routes[$action])) {
            $this->error('Ação não encontrada.');
            return;
        }

        $route = $this->routes[$action];

        $controller = new $route['controller']();

        $method = $route['method'];

        $controller->$method($data);
    }

    private function getRequestData()
    {
        $method = $_SERVER['REQUEST_METHOD'];

        if ($method === 'POST') {

            $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

            $rawBody = file_get_contents('php://input');

            if (str_contains($contentType, 'application/json')) {

                return json_decode(
                    $rawBody,
                    true
                ) ?: [];
            }

            return $_POST;
        }

        return $_GET;
    }

    private function error($message)
    {
        echo json_encode([
            'success' => false,
            'message' => $message,
            'data' => null
        ], JSON_UNESCAPED_UNICODE);
    }
}