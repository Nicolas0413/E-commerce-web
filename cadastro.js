document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('#cadastro .login_card');
    const alerta = document.getElementById('alerta_cadastro');

    if (!form || !alerta) return;

    const campos = [
        { id: 'nome', texto: 'o nome' },
        { id: 'usuario', texto: 'o usuário' },
        { id: 'senha', texto: 'a senha' },
        { id: 'cpf', texto: 'o cpf' },
        { id: 'nascimento', texto: 'a data de nascimento' },
        { id: 'email', texto: 'o email' }
    ];

    function limparAlerta() {
        alerta.innerHTML = '';
        alerta.classList.remove('alerta_visivel');
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const faltando = campos.filter(function (campo) {
            const input = document.getElementById(campo.id);
            return !input || input.value.trim() === '';
        });

        if (faltando.length > 0) {
            const mensagens = faltando.map(function (campo) {
                return '<div>Faltou digitar ' + campo.texto + '</div>';
            });
            alerta.innerHTML = mensagens.join('');
            alerta.classList.add('alerta_visivel');
        } else {
            limparAlerta();
        }
    });
});
