document.addEventListener('DOMContentLoaded', function () {

    const celulas = document.querySelectorAll('table td');
    if (celulas.length === 0) return;

    celulas.forEach(function (celula) {
        celula.addEventListener('click', function () {
            const categoria = celula.textContent.trim();

            const categoriaAtiva = (typeof definirCategoria === 'function')
                ? definirCategoria(categoria)
                : null;

            celulas.forEach(function (c) {
                c.classList.remove('categoria_ativa');
            });

            if (categoriaAtiva) {
                celula.classList.add('categoria_ativa');
            }
        });
    });
});
