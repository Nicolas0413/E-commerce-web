// autocomplete.js
// Autocomplete para o campo de busca de produtos da Kablau

document.addEventListener('DOMContentLoaded', function () {

    // Lista de produtos disponíveis na loja (nomes usados na busca)
    const produtos = [
        "Memória DDR4 Corsair Vengeance RGB Pro, 16GB (2x8GB)",
        "Gabinete montech X3 mesh",
        "CPU Ryzen 5 5500",
        "CPU Intel Core Ultra 7 270k Plus",
        "Placa de vídeo intel ARC B580",
        "Placa mãe Maxsun Z890",
        "Placa mãe B550 Aorus Elite",
        "Fonte Coolermaster Gold 850",
        "NVME Kingston 2TB"
    ];

    const input = document.getElementById('pesquisa');
    if (!input) return; // se a página não tiver campo de busca, não faz nada

    // Cria a lista (dropdown) de sugestões e insere logo após o input
    const lista = document.createElement('ul');
    lista.id = 'lista_sugestoes';
    lista.className = 'lista_sugestoes';
    input.parentElement.appendChild(lista);

    // Cartões de produto presentes na página (só existem na página inicial)
    const produtoElementos = document.querySelectorAll('.loja .produto');

    let indiceAtivo = -1;

    function limparSugestoes() {
        lista.innerHTML = '';
        lista.style.display = 'none';
        indiceAtivo = -1;
    }

    // Mostra na tela apenas os produtos que têm relação com o termo digitado
    function filtrarProdutosNaTela(valor) {
        if (produtoElementos.length === 0) return;

        const termo = valor.trim().toLowerCase();

        produtoElementos.forEach(function (elemento) {
            const nomeElemento = elemento.querySelector('.Nome_produto');
            const nome = nomeElemento ? nomeElemento.textContent.toLowerCase() : '';

            if (!termo || nome.includes(termo)) {
                elemento.style.display = '';
            } else {
                elemento.style.display = 'none';
            }
        });
    }

    function mostrarSugestoes(valor) {
        limparSugestoes();

        const termo = valor.trim().toLowerCase();
        if (!termo) return;

        const filtrados = produtos.filter(function (produto) {
            return produto.toLowerCase().includes(termo);
        });

        if (filtrados.length === 0) return;

        filtrados.forEach(function (produto) {
            const item = document.createElement('li');
            item.className = 'item_sugestao';

            // destaca o trecho que corresponde ao termo digitado
            const idx = produto.toLowerCase().indexOf(termo);
            const antes = produto.substring(0, idx);
            const meio = produto.substring(idx, idx + termo.length);
            const depois = produto.substring(idx + termo.length);
            item.innerHTML = antes + '<strong>' + meio + '</strong>' + depois;

            item.addEventListener('mousedown', function (e) {
                // mousedown (em vez de click) evita perder o valor antes do click disparar
                e.preventDefault();
                input.value = produto;
                limparSugestoes();
                filtrarProdutosNaTela(input.value);
                input.focus();
            });

            lista.appendChild(item);
        });

        lista.style.display = 'block';
    }

    function atualizarItemAtivo(itens) {
        itens.forEach(function (item) {
            item.classList.remove('ativo');
        });
        if (indiceAtivo >= 0 && itens[indiceAtivo]) {
            itens[indiceAtivo].classList.add('ativo');
            itens[indiceAtivo].scrollIntoView({ block: 'nearest' });
        }
    }

    input.addEventListener('input', function () {
        mostrarSugestoes(input.value);
        filtrarProdutosNaTela(input.value);
    });

    input.addEventListener('keydown', function (e) {
        const itens = lista.querySelectorAll('.item_sugestao');
        if (itens.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            indiceAtivo = (indiceAtivo + 1) % itens.length;
            atualizarItemAtivo(itens);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            indiceAtivo = (indiceAtivo - 1 + itens.length) % itens.length;
            atualizarItemAtivo(itens);
        } else if (e.key === 'Enter') {
            if (indiceAtivo >= 0) {
                e.preventDefault();
                input.value = itens[indiceAtivo].textContent;
                limparSugestoes();
                filtrarProdutosNaTela(input.value);
            }
        } else if (e.key === 'Escape') {
            limparSugestoes();
        }
    });

    // fecha a lista ao clicar fora do campo de busca
    document.addEventListener('click', function (e) {
        if (!input.parentElement.contains(e.target)) {
            limparSugestoes();
        }
    });
});