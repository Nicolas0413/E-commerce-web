<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/conexao.php';
exigirLogin();

$usuarioId = $_SESSION['usuario_id'];
$nomeUsuario = htmlspecialchars($_SESSION['usuario_nome'], ENT_QUOTES, 'UTF-8');

$pdo = conectar();
$erroBanco = false;
$itensCarrinho = [];

try {
    // Busca os itens do carrinho vinculados ao usuário logado, unindo com a tabela de produtos
    $stmt = $pdo->prepare('
        SELECT c.id AS carrinho_id, c.quantidade, 
               p.id AS produto_id, p.nome, p.preco, p.imagem, p.categoria 
        FROM carrinho c
        JOIN produtos p ON c.produto_id = p.id
        WHERE c.usuario_id = :usuario_id
    ');
    $stmt->execute([':usuario_id' => $usuarioId]);
    $itensCarrinho = $stmt->fetchAll();
} catch (PDOException $ex) {
    error_log('Erro ao carregar o carrinho: ' . $ex->getMessage());
    $erroBanco = true;
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrinho - Kablau</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div id="navbar">
        <a href="index.php"><img id="logo" src="Img/kablau.png" alt="logo da loja kablau"></a>
        <span>
            Olá, <?= $nomeUsuario ?>
            <a href="index.php" class="btn_comprar">Continuar comprando</a>
            <a href="logout.php" class="btn_comprar">Sair</a>
        </span>
    </div>

    <div class="carrinho_container">
        <h2>Seu Carrinho</h2>

        <div id="lista_itens_carrinho">
            <?php if ($erroBanco): ?>
                <p>Não foi possível carregar seu carrinho no momento. Tente novamente mais tarde.</p>
            <?php elseif (empty($itensCarrinho)): ?>
                <p>Seu carrinho está vazio.</p>
            <?php else: ?>
                <?php foreach ($itensCarrinho as $item): ?>
                    <div class="item_carrinho" data-id="<?= (int)$item['produto_id'] ?>" data-preco="<?= (float)$item['preco'] ?>">
                        <img src="<?= htmlspecialchars($item['imagem']) ?>" class="img_carrinho" alt="<?= htmlspecialchars($item['nome']) ?>">
                        <div class="info_carrinho">
                            <h3><?= htmlspecialchars($item['nome']) ?></h3>
                            <p>Preço unitário: <b>R$ <?= number_format($item['preco'], 2, ',', '.') ?></b></p>
                            <label>Quantidade:
                                <input type="number" class="quantidade_carrinho" min="0" value="<?= (int)$item['quantidade'] ?>">
                            </label>
                            <p class="preco_total_item">Total: R$ <?= number_format($item['preco'] * $item['quantidade'], 2, ',', '.') ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>

        <div class="frete_box">
            <h3>Calcular Frete</h3>
            <label>CEP:</label>
            <input type="text" id="cep" placeholder="Digite seu CEP (ex: 88780-000)" maxlength="9">
            <p id="mensagem_frete" class="mensagem_status"></p>
            <p>Frete: <b id="valor_frete">R$ 0,00</b></p>
        </div>

        <div class="frete_box">
            <h3>Cupom de desconto</h3>
            <label>Cupom:</label>
            <input type="text" id="cupom" placeholder="Digite seu cupom">
            <button type="button" id="btn_aplicar_cupom" class="btn_comprar">Aplicar cupom</button>
            <p id="mensagem_cupom" class="mensagem_status"></p>
        </div>

        <div class="resumo_compra">
            <h2>Resumo do Pedido</h2>
            <p>Subtotal: <b id="subtotal_valor">R$ 0,00</b></p>
            <p id="linha_desconto" class="linha_desconto">Desconto: <b id="desconto_valor">- R$ 0,00</b></p>
            <p>Frete: <b id="frete_resumo">R$ 0,00</b></p>
            <h3 class="total_final">Total da Compra: <span id="total_final_valor">R$ 0,00</span></h3>
            <button class="btn_comprar">
                Finalizar Compra
            </button>
        </div>
    </div>

    <!-- Mantém os scripts originais para o cálculo dinâmico de frete, cupom e totais na tela -->
    <script src="js/carrinho-utils.js"></script>
    <script src="js/carrinho.js"></script>
</body>
</html>