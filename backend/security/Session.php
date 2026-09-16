<?php

class Session
{
    private const REMEMBER_ME_LIFETIME = 2592000;

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

    public static function login($userId, $rememberMe = false, $userData = [])
    {
        self::start();

        session_regenerate_id(true);

        $_SESSION['user_id'] = $userId;
        $_SESSION['user'] = $userData;

        self::setCookieLifetime($rememberMe);
    }

    private static function setCookieLifetime($rememberMe)
    {
        if (!headers_sent()) {
            $params = session_get_cookie_params();
            $expires = $rememberMe
                ? time() + self::REMEMBER_ME_LIFETIME
                : 0;

            setcookie(
                session_name(),
                session_id(),
                [
                    'expires' => $expires,
                    'path' => $params['path'],
                    'domain' => $params['domain'],
                    'secure' => $params['secure'],
                    'httponly' => $params['httponly'],
                    'samesite' => $params['samesite'] ?? 'Lax'
                ]
            );
        }
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

    public static function getUser()
    {
        self::start();

        return $_SESSION['user'] ?? null;
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