<?php

session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'httponly' => true,
    'samesite' => 'Lax',
    'secure'   => !empty($_SERVER['HTTPS']),
]);
session_start();

function estaLogado(): bool
{
    return isset($_SESSION['usuario_id']);
}

function exigirLogin(): void
{

    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');

    if (!estaLogado()) {
        header('Location: login.php?acesso=negado');
        exit;
    }
}
