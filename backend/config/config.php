<?php

return [
    'database' => [
        'host' => 'localhost',
        'name' => 'freteapp',
        'user' => 'root',
        'password' => '',
        'charset' => 'utf8mb4',
    ],

    // Credenciais da Sandbox Inbox do Mailtrap.
    // Em produção, troque só esses valores por um provedor real (Brevo, Resend, SES...).
    'mail' => [
        'host' => 'sandbox.smtp.mailtrap.io',
        'port' => 2525,
        'username' => '1fff206c856379',
        'password' => '1c11770edf9f66',
        'encryption' => 'tls',
        'from_address' => 'no-reply@freteapp.local',
        'from_name' => 'FreteApp',
    ],

    'app' => [
        // Usado para montar os links de verificação/redefinição enviados por e-mail.
        'frontend_url' => 'http://localhost:5173',
    ],
];