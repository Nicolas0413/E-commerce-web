// categorias.js
// Ao clicar em uma categoria da tabela (CPU, GPU, RAM, etc.), filtra os
// cards de produto na página inicial para mostrar só aquela categoria.
// Clicar de novo na mesma categoria remove o filtro e mostra tudo de novo.

document.addEventListener('DOMContentLoaded', function () {

    const celulas = document.querySelectorAll('table td');
    if (celulas.length === 0) return;

    celulas.forEach(function (celula) {
        celula.addEventListener('click', function () {
            const categoria = celula.textContent.trim();

            const categoriaAtiva = (typeof definirCategoria === 'function')
                ? definirCategoria(categoria)
                : null;

            // destaca visualmente qual categoria está selecionada
            celulas.forEach(function (c) {
                c.classList.remove('categoria_ativa');
            });

            if (categoriaAtiva) {
                celula.classList.add('categoria_ativa');
            }
        });
    });
});
