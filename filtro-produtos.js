// filtro-produtos.js
// Controla o filtro combinado (busca + categoria) exibido na página inicial.
// autocomplete.js chama definirTermoBusca() e categorias.js chama definirCategoria().

const filtroProdutos = {
    termo: '',
    categoria: null
};

// Mostra/esconde os cards de produto conforme o termo de busca e a categoria selecionados
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

// Chamado pelo autocomplete.js sempre que o texto da busca muda
function definirTermoBusca(valor) {
    filtroProdutos.termo = valor || '';
    aplicarFiltroProdutos();
}

// Chamado pelo categorias.js ao clicar em uma categoria da tabela.
// Clicar de novo na categoria já selecionada remove o filtro (mostra tudo).
// Retorna a categoria que ficou ativa (ou null, se foi removida).
function definirCategoria(categoria) {
    filtroProdutos.categoria = (filtroProdutos.categoria === categoria) ? null : categoria;
    aplicarFiltroProdutos();
    return filtroProdutos.categoria;
}
