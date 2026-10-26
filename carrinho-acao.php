<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/conexao.php';

// Garante que apenas usuários logados mexam no carrinho do banco
if (!estaLogado()) {
    header('Location: login.php');
    exit;
}

$usuario_id = $_SESSION['usuario_id'];
$acao = $_POST['acao'] ?? $_GET['acao'] ?? '';
$pdo = conectar();

if ($acao === 'adicionar') {
    $produto_id = (int)($_POST['produto_id'] ?? 0);
    $quantidade = max(1, (int)($_POST['quantidade'] ?? 1));

    if ($produto_id > 0) {
        // Verifica se o item já está no carrinho do usuário
        $stmt = $pdo->prepare('SELECT id, quantidade FROM carrinho WHERE usuario_id = :uid AND produto_id = :pid');
        $stmt->execute([':uid' => $usuario_id, ':pid' => $produto_id]);
        $item = $stmt->fetch();

        if ($item) {
            // Atualiza somando a quantidade
            $novaQtd = $item['quantidade'] + $quantidade;
            $update = $pdo->prepare('UPDATE carrinho SET quantidade = :qtd WHERE id = :id');
            $update->execute([':qtd' => $novaQtd, ':id' => $item['id']]);
        } else {
            // Insere novo registro
            $insert = $pdo->prepare('INSERT INTO carrinho (usuario_id, produto_id, quantidade) VALUES (:uid, :pid, :qtd)');
            $insert->execute([':uid' => $usuario_id, ':pid' => $produto_id, ':qtd' => $quantidade]);
        }
    }
    header('Location: carrinho.php');
    exit;
}