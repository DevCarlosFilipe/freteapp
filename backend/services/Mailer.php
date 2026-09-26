<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../vendor/autoload.php';

/**
 * Só sabe enviar e-mail. Não sabe nada sobre login, cadastro
 * ou redefinição de senha — quem decide o conteúdo é o AuthService.
 */
class Mailer
{
    private array $config;

    public function __construct(array $config)
    {
        $this->config = $config['mail'];
    }

    public function send(string $to, string $subject, string $htmlBody): bool
    {
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = $this->config['host'];
            $mail->SMTPAuth = true;
            $mail->Username = $this->config['username'];
            $mail->Password = $this->config['password'];
            $mail->SMTPSecure = $this->config['encryption'];
            $mail->Port = $this->config['port'];
            $mail->CharSet = 'UTF-8';

            $mail->setFrom(
                $this->config['from_address'],
                $this->config['from_name']
            );
            $mail->addAddress($to);

            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $htmlBody;

            $mail->send();

            return true;
        } catch (Exception $exception) {
            return false;
        }
    }
}