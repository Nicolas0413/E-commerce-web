const filtroProdutos = {
    termo: '',
    categoria: null
};

function aplicarFiltroProdutos() {
    const produtoElementos = document.querySelectorAll('.loja .produto');
    if (produtoElementos.length === 0) return;

    const termo = filtroProdutos.termo.trim().toLowerCase();
    const categoria = filtroProdutos.categoria;

    produtoElementos.forEach(function (elemento) {
        const nomeElemento = elemento.querySelector('.Nome_produto');
        const nome = nomeElemento ? nomeElemento.textContent.toLowerCase() : '';
        const categoriaDoProduto = elemento.dataset.categoria || '';

        const combinaComBusca = !termo || nome.includes(termo);
        const combinaComCategoria = !categoria || categoriaDoProduto === categoria;

        elemento.style.display = (combinaComBusca && combinaComCategoria) ? '' : 'none';
    });
}

function definirTermoBusca(valor) {
    filtroProdutos.termo = valor || '';
    aplicarFiltroProdutos();
}

function definirCategoria(categoria) {
    filtroProdutos.categoria = (filtroProdutos.categoria === categoria) ? null : categoria;
    aplicarFiltroProdutos();
    return filtroProdutos.categoria;
}
