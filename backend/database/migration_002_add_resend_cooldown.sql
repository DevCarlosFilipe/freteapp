-- Rode depois da primeira migração (migration_add_email_verification.sql).

ALTER TABLE users
    ADD COLUMN verification_sent_at DATETIME NULL DEFAULT NULL AFTER email_verified_at;