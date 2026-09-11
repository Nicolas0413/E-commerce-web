document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('.login_card');
    const inputUsuario = document.getElementById('usuario');
    const inputSenha = document.getElementById('senha');
    const alerta = document.getElementById('alerta_login');

    if (!form || !inputUsuario || !inputSenha || !alerta) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const usuario = inputUsuario.value.trim();
        const senha = inputSenha.value.trim();

        if (!usuario || !senha) {

            alerta.textContent = 'É necessário digitar usuário e senha para prosseguir';
            alerta.classList.add('alerta_visivel');
        } else {
            alerta.textContent = '';
            alerta.classList.remove('alerta_visivel');

        }
    });
});
