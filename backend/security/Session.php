<?php

class Session
{
    public static function start()
    {
        if (session_status() === PHP_SESSION_ACTIVE) {
            return;
        }

        session_set_cookie_params([
            'httponly' => true,
            'secure' => false,
            'samesite' => 'Lax'
        ]);

        session_start();
    }

    public static function login($userId)
    {
        self::start();

        session_regenerate_id(true);

        $_SESSION['user_id'] = $userId;
    }

    public static function checkAuth()
    {
        self::start();

        return isset($_SESSION['user_id']);
    }

    public static function getUserId()
    {
        self::start();

        return $_SESSION['user_id'] ?? null;
    }

    public static function logout()
    {
        self::start();

        $_SESSION = [];

        if (ini_get('session.use_cookies')) {

            $params = session_get_cookie_params();

            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params['path'],
                $params['domain'],
                $params['secure'],
                $params['httponly']
            );
        }

        session_destroy();
    }
}