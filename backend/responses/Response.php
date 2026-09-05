<?php

class Response
{
    public static function success($message, $data = null)
    {
        echo json_encode([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], JSON_UNESCAPED_UNICODE);
    }


    public static function error($message, $data = null)
    {
        echo json_encode([
            'success' => false,
            'message' => $message,
            'data' => $data
        ], JSON_UNESCAPED_UNICODE);
    }
}