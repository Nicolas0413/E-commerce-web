document.addEventListener('DOMContentLoaded', function () {

    const faixasDeFrete = [
        { cidade: 'Paulo Lopes', min: 88490000, max: 88490000, valor: 30.00 },
        { cidade: 'Garopaba', min: 88495000, max: 88495000, valor: 25.00 },
        { cidade: 'Imbituba', min: 88780000, max: 88780000, valor: 15.00 }
    ];

    const cupons = {
        'KABLAU10': { tipo: 'desconto', valor: 0.10, mensagem: 'Cupom aplicado! 10% de desconto no valor total.' },
        'KABUMRUIM15': { tipo: 'desconto', valor: 0.15, mensagem: 'Cupom aplicado! 15% de desconto no valor total.' },
        'FRETEGRATIS': { tipo: 'frete_gratis', mensagem: 'Cupom aplicado! Frete grátis.' }
    };

    let freteCalculado = 0;
    let descontoPercentual = 0;
    let freteGratisAtivo = false;

    const containerItens = document.getElementById('lista_itens_carrinho');
    const inputCep = document.getElementById('cep');
    const mensagemFrete = document.getElementById('mensagem_frete');
    const valorFreteElemento = document.getElementById('valor_frete');

    const inputCupom = document.getElementById('cupom');
    const botaoCupom = document.getElementById('btn_aplicar_cupom');
    const mensagemCupom = document.getElementById('mensagem_cupom');

    const subtotalElemento = document.getElementById('subtotal_valor');
    const linhaDesconto = document.getElementById('linha_desconto');
    const descontoElemento = document.getElementById('desconto_valor');
    const freteResumoElemento = document.getElementById('frete_resumo');
    const totalFinalElemento = document.getElementById('total_final_valor');

    function formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    function renderizarItens() {
        const carrinho = obterCarrinho();
        containerItens.innerHTML = '';

        if (carrinho.length === 0) {
            containerItens.innerHTML = '<p>Seu carrinho está vazio.</p>';
            atualizarResumo();
            return;
        }

        carrinho.forEach(function (itemSalvo) {
            const produto = produtos.find(function (p) { return p.id === itemSalvo.id; });
            if (!produto) return;

            const div = document.createElement('div');
            div.className = 'item_carrinho';
            div.dataset.id = produto.id;
            div.dataset.preco = produto.preco;

            const img = document.createElement('img');
            img.src = produto.imagem;
            img.className = 'img_carrinho';
            img.alt = produto.alt || produto.nome;

            const info = document.createElement('div');
            info.className = 'info_carrinho';

            const titulo = document.createElement('h3');
            titulo.textContent = produto.nome;

            const precoUnitario = document.createElement('p');
            precoUnitario.innerHTML = 'Preço unitário: <b>' + formatarMoeda(produto.preco) + '</b>';

            const label = document.createElement('label');
            label.textContent = 'Quantidade:';

            const inputQuantidade = document.createElement('input');
            inputQuantidade.type = 'number';
            inputQuantidade.className = 'quantidade_carrinho';
            inputQuantidade.min = '0';
            inputQuantidade.value = itemSalvo.quantidade;
            label.appendChild(inputQuantidade);

            const totalItem = document.createElement('p');
            totalItem.className = 'preco_total_item';
            totalItem.textContent = 'Total: ' + formatarMoeda(produto.preco * itemSalvo.quantidade);

            info.appendChild(titulo);
            info.appendChild(precoUnitario);
            info.appendChild(label);
            info.appendChild(totalItem);

            div.appendChild(img);
            div.appendChild(info);
            containerItens.appendChild(div);

            inputQuantidade.addEventListener('input', function () {
                atualizarTotalItem(produto, inputQuantidade, totalItem);
                atualizarResumo();
            });

            inputQuantidade.addEventListener('change', function () {
                tratarMudancaQuantidade(produto, inputQuantidade, totalItem);
            });
        });

        atualizarResumo();
    }

    function atualizarTotalItem(produto, input, totalItemElemento) {
        let quantidadeAtual = parseInt(input.value, 10);
        if (isNaN(quantidadeAtual) || quantidadeAtual < 0) quantidadeAtual = 0;
        totalItemElemento.textContent = 'Total: ' + formatarMoeda(produto.preco * quantidadeAtual);
    }

    function tratarMudancaQuantidade(produto, input, totalItemElemento) {
        let quantidade = parseInt(input.value, 10);
        if (isNaN(quantidade) || quantidade < 0) {
            quantidade = 0;
        }

        if (quantidade === 0) {
            const confirmarRemocao = window.confirm(
                'Deseja realmente remover "' + produto.nome + '" do carrinho?'
            );

            if (confirmarRemocao) {
                removerDoCarrinho(produto.id);
                renderizarItens();
            } else {
                input.value = 1;
                atualizarQuantidadeCarrinho(produto.id, 1);
                atualizarTotalItem(produto, input, totalItemElemento);
                atualizarResumo();
            }
            return;
        }

        atualizarQuantidadeCarrinho(produto.id, quantidade);
        atualizarResumo();
    }

    function calcularSubtotal() {
        let subtotal = 0;

        document.querySelectorAll('#lista_itens_carrinho .item_carrinho').forEach(function (item) {
            const preco = parseFloat(item.dataset.preco);
            const inputQuantidade = item.querySelector('.quantidade_carrinho');

            let quantidade = parseInt(inputQuantidade.value, 10);
            if (isNaN(quantidade) || quantidade < 0) quantidade = 0;

            subtotal += preco * quantidade;
        });

        return subtotal;
    }

    function calcularFretePorCep(cepDigitado) {
        const somenteNumeros = cepDigitado.replace(/\D/g, '');

        if (somenteNumeros.length !== 8) {
            freteCalculado = 0;
            mensagemFrete.textContent = '';
            mensagemFrete.classList.remove('mensagem_sucesso', 'mensagem_erro');
            valorFreteElemento.textContent = formatarMoeda(0);
            return;
        }

        const numeroCep = parseInt(somenteNumeros, 10);
        const faixaEncontrada = faixasDeFrete.find(function (faixa) {
            return numeroCep >= faixa.min && numeroCep <= faixa.max;
        });

        if (faixaEncontrada) {
            freteCalculado = faixaEncontrada.valor;
            mensagemFrete.textContent = 'Entrega em ' + faixaEncontrada.cidade + '.';
            mensagemFrete.classList.remove('mensagem_erro');
            mensagemFrete.classList.add('mensagem_sucesso');
        } else {
            freteCalculado = 0;
            mensagemFrete.textContent = 'No momento só entregamos em Garopaba, Imbituba e Paulo Lopes.';
            mensagemFrete.classList.remove('mensagem_sucesso');
            mensagemFrete.classList.add('mensagem_erro');
        }

        valorFreteElemento.textContent = formatarMoeda(freteCalculado);
    }

    function aplicarCupom() {
        const codigo = inputCupom.value.trim().toUpperCase();

        if (!codigo) {
            mensagemCupom.textContent = 'Digite um cupom para aplicar.';
            mensagemCupom.classList.remove('mensagem_sucesso');
            mensagemCupom.classList.add('mensagem_erro');
            return;
        }

        const cupom = cupons[codigo];

        if (!cupom) {
            descontoPercentual = 0;
            freteGratisAtivo = false;
            mensagemCupom.textContent = 'Cupom inválido.';
            mensagemCupom.classList.remove('mensagem_sucesso');
            mensagemCupom.classList.add('mensagem_erro');
            atualizarResumo();
            return;
        }

        if (cupom.tipo === 'desconto') {
            descontoPercentual = cupom.valor;
            freteGratisAtivo = false;
        } else if (cupom.tipo === 'frete_gratis') {
            freteGratisAtivo = true;
            descontoPercentual = 0;
        }

        mensagemCupom.textContent = cupom.mensagem;
        mensagemCupom.classList.remove('mensagem_erro');
        mensagemCupom.classList.add('mensagem_sucesso');

        atualizarResumo();
    }

    function atualizarResumo() {
        const subtotal = calcularSubtotal();
        const desconto = subtotal * descontoPercentual;
        const subtotalComDesconto = subtotal - desconto;
        const frete = freteGratisAtivo ? 0 : freteCalculado;
        const total = subtotalComDesconto + frete;

        subtotalElemento.textContent = formatarMoeda(subtotal);

        if (descontoPercentual > 0) {
            linhaDesconto.style.display = 'block';
            descontoElemento.textContent = '- ' + formatarMoeda(desconto);
        } else {
            linhaDesconto.style.display = 'none';
        }

        freteResumoElemento.textContent = freteGratisAtivo
            ? 'Grátis'
            : formatarMoeda(frete);

        totalFinalElemento.textContent = formatarMoeda(total);
    }


    inputCep.addEventListener('input', function () {
        calcularFretePorCep(inputCep.value);
        atualizarResumo();
    });

    botaoCupom.addEventListener('click', aplicarCupom);

    inputCupom.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            aplicarCupom();
        }
    });

    linhaDesconto.style.display = 'none';
    renderizarItens();
});
