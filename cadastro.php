<?php
require_once __DIR__ . '/conexao.php';

function validarCpf(string $cpf): bool
{
    if (strlen($cpf) !== 11 || preg_match('/^(\d)\1{10}$/', $cpf)) {
        return false;
    }

    for ($t = 9; $t < 11; $t++) {
        $soma = 0;
        for ($i = 0; $i < $t; $i++) {
            $soma += (int)$cpf[$i] * (($t + 1) - $i);
        }
        $digito = ((10 * $soma) % 11) % 10;
        if ((int)$cpf[$t] !== $digito) {
            return false;
        }
    }
    return true;
}

function e(string $valor): string
{
    return htmlspecialchars($valor, ENT_QUOTES, 'UTF-8');
}

$erros   = [];
$sucesso = '';
$dados   = ['nome' => '', 'usuario' => '', 'cpf' => '', 'nascimento' => '', 'email' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dados['nome']       = trim($_POST['nome'] ?? '');
    $dados['usuario']    = trim($_POST['usuario'] ?? '');
    $dados['cpf']        = preg_replace('/\D/', '', $_POST['cpf'] ?? '');
    $dados['nascimento'] = trim($_POST['nascimento'] ?? '');
    $dados['email']      = trim($_POST['email'] ?? '');
    $senha               = $_POST['senha'] ?? '';

    // ---------- Validações ----------
    if ($dados['nome'] === '' || mb_strlen($dados['nome']) > 120) {
        $erros[] = 'Informe o nome (até 120 caracteres).';
    }

    if (!preg_match('/^[A-Za-z0-9_.-]{3,50}$/', $dados['usuario'])) {
        $erros[] = 'O usuário deve ter de 3 a 50 caracteres (letras, números, _ . -).';
    }

    if (strlen($senha) < 4) {
        $erros[] = 'A senha deve ter pelo menos 4 caracteres.';
    }

    if (!validarCpf($dados['cpf'])) {
        $erros[] = 'CPF inválido.';
    }

    $data = DateTime::createFromFormat('Y-m-d', $dados['nascimento']);
    if (!$data || $data->format('Y-m-d') !== $dados['nascimento']) {
        $erros[] = 'Data de nascimento inválida.';
    } elseif ($data > new DateTime('today')) {
        $erros[] = 'A data de nascimento não pode estar no futuro.';
    }

    if (!filter_var($dados['email'], FILTER_VALIDATE_EMAIL) || mb_strlen($dados['email']) > 150) {
        $erros[] = 'E-mail inválido.';
    }

    if (empty($erros)) {
        try {
            $pdo = conectar();

            $verifica = $pdo->prepare(
                'SELECT usuario, cpf, email FROM usuarios
                 WHERE usuario = :usuario OR cpf = :cpf OR email = :email'
            );
            $verifica->execute([
                ':usuario' => $dados['usuario'],
                ':cpf'     => $dados['cpf'],
                ':email'   => $dados['email'],
            ]);

            foreach ($verifica->fetchAll() as $existente) {
                if (strcasecmp($existente['usuario'], $dados['usuario']) === 0) {
                    $erros[] = 'Este usuário já está em uso.';
                }
                if ($existente['cpf'] === $dados['cpf']) {
                    $erros[] = 'Este CPF já está cadastrado.';
                }
                if (strcasecmp($existente['email'], $dados['email']) === 0) {
                    $erros[] = 'Este e-mail já está cadastrado.';
                }
            }
            $erros = array_values(array_unique($erros));

            if (empty($erros)) {
                $insere = $pdo->prepare(
                    'INSERT INTO usuarios (nome, usuario, senha_hash, cpf, nascimento, email)
                     VALUES (:nome, :usuario, :senha_hash, :cpf, :nascimento, :email)'
                );
                $insere->execute([
                    ':nome'       => $dados['nome'],
                    ':usuario'    => $dados['usuario'],
                    ':senha_hash' => password_hash($senha, PASSWORD_DEFAULT),
                    ':cpf'        => $dados['cpf'],
                    ':nascimento' => $dados['nascimento'],
                    ':email'      => $dados['email'],
                ]);

                $sucesso = 'Cadastro realizado com sucesso! Você já pode fazer login.';
                $dados   = ['nome' => '', 'usuario' => '', 'cpf' => '', 'nascimento' => '', 'email' => ''];
            }
        } catch (PDOException $ex) {
            
            if ($ex->getCode() === '23000') {
                $erros[] = 'Usuário, CPF ou e-mail já cadastrado.';
            } else {
                error_log('Erro no cadastro: ' . $ex->getMessage());
                $erros[] = 'Erro ao salvar o cadastro. Tente novamente mais tarde.';
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro - Kablau</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div id="navbar">
        <a href="index.html"><img id="logo" src="Img/kablau.png" alt="logo da loja kablau"></a>
        <a href="index.html" class="btn_comprar">Voltar para a loja</a>
    </div>

    <div id="cadastro" class="login_container">

        <form class="login_card" method="post" action="cadastro.php" novalidate>

            <h2>Cadastre-se na Kablau</h2>

            <div id="alerta_cadastro" class="alerta<?= $erros ? ' alerta_visivel' : '' ?>">
                <?php foreach ($erros as $erro): ?>
                    <div><?= e($erro) ?></div>
                <?php endforeach; ?>
            </div>

            <?php if ($sucesso): ?>
                <div class="alerta alerta_sucesso alerta_visivel"><?= e($sucesso) ?></div>
            <?php endif; ?>

            <label>Nome</label>
            <input type="text" id="nome" name="nome" placeholder="Digite seu nome completo"
                   maxlength="120" value="<?= e($dados['nome']) ?>">

            <label>Usuário</label>
            <input type="text" id="usuario" name="usuario" placeholder="Digite seu login"
                   maxlength="50" value="<?= e($dados['usuario']) ?>">

            <label>Senha</label>
            <input type="password" id="senha" name="senha" placeholder="Digite sua senha" minlength="4">

            <label>CPF</label>
            <input type="text" id="cpf" name="cpf" placeholder="Digite seu cpf (apenas números)"
                   maxlength="11" value="<?= e($dados['cpf']) ?>">

            <label>Data de nascimento</label>
            <input type="date" id="nascimento" name="nascimento" value="<?= e($dados['nascimento']) ?>">

            <label>Email</label>
            <input type="email" id="email" name="email" placeholder="Digite seu email"
                   maxlength="150" value="<?= e($dados['email']) ?>">

            <button type="submit" class="btn_comprar">Cadastrar</button>

            <span>Já está cadastrado? <a href="login.html">Fazer login</a></span>
        </form>

    </div>

    <script src="cadastro.js"></script>
</body>
</html>
