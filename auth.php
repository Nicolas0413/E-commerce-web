<?php
// Inclua este arquivo no topo de qualquer página que exija login:
//   require_once __DIR__ . '/auth.php';
//   exigirLogin();

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
    // Impede que o navegador guarde a página em cache:
    // depois do logout, o botão "voltar" não mostra o conteúdo protegido.
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');

    if (!estaLogado()) {
        header('Location: login.php?acesso=negado');
        exit;
    }
}
