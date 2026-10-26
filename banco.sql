CREATE DATABASE IF NOT EXISTS kablau
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE kablau;

CREATE TABLE IF NOT EXISTS usuarios (
    id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome          VARCHAR(120) NOT NULL,
    usuario       VARCHAR(50)  NOT NULL UNIQUE,
    senha_hash    VARCHAR(255) NOT NULL,
    cpf           CHAR(11)     NOT NULL UNIQUE,
    nascimento    DATE         NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    criado_em     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
