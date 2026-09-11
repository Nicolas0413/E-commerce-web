document.addEventListener('DOMContentLoaded', function () {

    function formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    const parametros = new URLSearchParams(window.location.search);
    let id = parseInt(parametros.get('id'), 10);
    if (isNaN(id)) id = 1;

    const produto = produtos.find(function (p) { return p.id === id; }) || produtos[0];
    if (!produto) return;

    document.title = produto.nome + ' - Kablau';

    const imagemElemento = document.getElementById('imagem_produto');
    if (imagemElemento) {
        imagemElemento.src = produto.imagem;
        imagemElemento.alt = produto.alt || produto.nome;
    }

    const nomeElemento = document.getElementById('nome_produto');
    if (nomeElemento) nomeElemento.textContent = produto.nome;

    const precoElemento = document.getElementById('preco_avista');
    if (precoElemento) {
        precoElemento.dataset.preco = produto.preco;
        precoElemento.textContent = formatarMoeda(produto.preco) + ' à vista no PIX';
    }

    const parceladoElemento = document.getElementById('preco_parcelado');
    if (parceladoElemento) {
        const valorParcela = produto.preco / produto.parcelas;
        parceladoElemento.textContent =
            'ou ' + produto.parcelas + 'x de ' + formatarMoeda(valorParcela) + ' sem juros';
    }

    const listaCaracteristicas = document.getElementById('lista_caracteristicas');
    if (listaCaracteristicas) {
        listaCaracteristicas.innerHTML = '';
        produto.caracteristicas.forEach(function (item) {
            const li = document.createElement('li');
            li.textContent = item;
            listaCaracteristicas.appendChild(li);
        });
    }

    const descricaoElemento = document.getElementById('descricao_produto');
    if (descricaoElemento) descricaoElemento.textContent = produto.descricao;

    const listaAvaliacoes = document.getElementById('lista_avaliacoes');
    if (listaAvaliacoes) {
        listaAvaliacoes.innerHTML = '';
        produto.avaliacoes.forEach(function (avaliacao) {
            const div = document.createElement('div');
            div.className = 'avaliacao';

            const estrelas = '⭐'.repeat(avaliacao.estrelas);

            const spanAutor = document.createElement('span');
            spanAutor.textContent = avaliacao.autor + ' -';

            const spanData = document.createElement('span');
            spanData.textContent = '- ' + avaliacao.data;

            const paragrafo = document.createElement('p');
            paragrafo.textContent = avaliacao.texto;

            div.appendChild(document.createTextNode(estrelas));
            div.appendChild(spanAutor);
            div.appendChild(spanData);
            div.appendChild(paragrafo);

            listaAvaliacoes.appendChild(div);
        });
    }

    const inputQuantidade = document.getElementById('quantidade');
    const valorParcialElemento = document.getElementById('valor_parcial');

    if (!inputQuantidade || !valorParcialElemento) return;

    function obterQuantidadeSelecionada() {
        let quantidade = parseInt(inputQuantidade.value, 10);

        if (isNaN(quantidade) || quantidade < 1) {
            quantidade = 1;
        }

        return quantidade;
    }

    function atualizarValorParcial() {
        const total = produto.preco * obterQuantidadeSelecionada();
        valorParcialElemento.textContent = 'Valor parcial: ' + formatarMoeda(total);
    }

    inputQuantidade.addEventListener('input', atualizarValorParcial);
    inputQuantidade.addEventListener('change', atualizarValorParcial);

    atualizarValorParcial();

    const botaoAdicionar = document.getElementById('btn_adicionar_carrinho');
    const mensagemCarrinho = document.getElementById('mensagem_carrinho');

    if (botaoAdicionar && typeof adicionarAoCarrinho === 'function') {
        botaoAdicionar.addEventListener('click', function () {
            const quantidade = obterQuantidadeSelecionada();

            adicionarAoCarrinho(produto.id, quantidade);

            if (mensagemCarrinho) {
                mensagemCarrinho.textContent =
                    quantidade + 'x "' + produto.nome + '" adicionado ao carrinho!';
                mensagemCarrinho.classList.remove('mensagem_erro');
                mensagemCarrinho.classList.add('mensagem_sucesso');
            }
        });
    }
});
