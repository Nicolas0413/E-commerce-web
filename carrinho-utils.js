const CHAVE_CARRINHO = 'kablau_carrinho';

function obterCarrinho() {
    try {
        const dados = localStorage.getItem(CHAVE_CARRINHO);
        return dados ? JSON.parse(dados) : [];
    } catch (erro) {
        return [];
    }
}

function salvarCarrinho(carrinho) {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}

function adicionarAoCarrinho(idProduto, quantidade) {
    const carrinho = obterCarrinho();
    const itemExistente = carrinho.find(function (item) { return item.id === idProduto; });

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({ id: idProduto, quantidade: quantidade });
    }

    salvarCarrinho(carrinho);
}

function atualizarQuantidadeCarrinho(idProduto, novaQuantidade) {
    const carrinho = obterCarrinho();
    const item = carrinho.find(function (item) { return item.id === idProduto; });

    if (item) {
        item.quantidade = novaQuantidade;
        salvarCarrinho(carrinho);
    }
}

function removerDoCarrinho(idProduto) {
    const carrinho = obterCarrinho().filter(function (item) { return item.id !== idProduto; });
    salvarCarrinho(carrinho);
}
