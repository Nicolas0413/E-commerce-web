<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/conexao.php';

function e(string $valor): string
{
    return htmlspecialchars($valor, ENT_QUOTES, 'UTF-8');
}

function formatarPreco(string|float $valor): string
{
    return 'R$' . number_format((float)$valor, 2, ',', '.');
}

$produtos = [];
$erroBanco = false;

try {
    $produtos = conectar()
        ->query('SELECT id, nome, categoria, imagem, preco FROM produtos ORDER BY id')
        ->fetchAll();
} catch (PDOException $ex) {
    error_log('Erro ao listar produtos: ' . $ex->getMessage());
    $erroBanco = true;
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Kablau</title>
</head>
<body>
    <div id="navbar">
        <img id="logo" src="Img/kablau.png" alt="logo da loja kablau">
        <label id="barra_pesquisa" for="pesquisa"><input type="text" id="pesquisa" placeholder="Busque na Kablau"></label>
        <span>
            <?php if (estaLogado()): ?>
                Olá, <?= e($_SESSION['usuario_nome']) ?>
                <a href="logout.php" class="btn_comprar">Sair</a>
            <?php else: ?>
                <a href="login.php" class="btn_comprar">Fazer login</a>
            <?php endif; ?>
            <a href="carrinho.php" class="btn_comprar">Carrinho</a>
        </span>
    </div>

    <div>
        <table>
            <tr>
                <td>Placa-mãe</td>
                <td>CPU</td>
                <td>GPU</td>
                <td>RAM</td>
                <td>Armazenamento</td>
                <td>Fonte</td>
                <td>Gabinete</td>
            </tr>
        </table>
    </div>

    <div class="loja">
        <?php if ($erroBanco): ?>
            <p>Não foi possível carregar os produtos no momento. Tente novamente mais tarde.</p>
        <?php elseif (empty($produtos)): ?>
            <p>Nenhum produto cadastrado.</p>
        <?php else: ?>
            <?php foreach ($produtos as $p): ?>
                <div class="produto" data-categoria="<?= e($p['categoria']) ?>">
                    <img class="Img_produto" src="<?= e($p['imagem']) ?>" alt="<?= e($p['nome']) ?>">
                    <div class="info_produto">
                        <div class="Nome_produto"><?= e($p['nome']) ?></div>
                        <div class="Preco"><?= formatarPreco($p['preco']) ?></div>
                    </div>
                    <a href="produto.html?id=<?= (int)$p['id'] ?>" class="btn_comprar">Comprar</a>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>

    <script src="js/filtro-produtos.js"></script>
    <script src="js/autocomplete.js"></script>
    <script src="js/categorias.js"></script>
</body>
</html>
