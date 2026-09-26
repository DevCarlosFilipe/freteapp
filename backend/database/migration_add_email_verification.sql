-- Rode isso direto no MySQL (phpMyAdmin, Adminer, ou linha de comando)
-- antes de subir o novo AuthService/AuthController.

ALTER TABLE users
    ADD COLUMN email_verified_at DATETIME NULL DEFAULT NULL AFTER token,
    ADD COLUMN reset_token VARCHAR(64) NULL DEFAULT NULL AFTER email_verified_at,
    ADD COLUMN reset_token_expires_at DATETIME NULL DEFAULT NULL AFTER reset_token;