<?php
session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'httponly' => true,
    'samesite' => 'Lax',
    'secure'   => !empty($_SERVER['HTTPS']),
]);
session_start();

require_once __DIR__ . '/conexao.php';

function e(string $valor): string
{
    return htmlspecialchars($valor, ENT_QUOTES, 'UTF-8');
}

$erro         = (($_GET['acesso'] ?? '') === 'negado')
    ? 'Faça login para acessar essa página.'
    : '';
$sucesso      = '';
$usuarioDigitado = '';
$jaLogado     = isset($_SESSION['usuario_id']);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !$jaLogado) {
    $usuarioDigitado = trim($_POST['usuario'] ?? '');
    $senha           = $_POST['senha'] ?? '';

    if ($usuarioDigitado === '' || $senha === '') {
        $erro = 'É necessário digitar usuário e senha para prosseguir';
    } else {
        try {
            $pdo = conectar();
            $stmt = $pdo->prepare(
                'SELECT id, nome, usuario, senha_hash FROM usuarios WHERE usuario = :usuario LIMIT 1'
            );
            $stmt->execute([':usuario' => $usuarioDigitado]);
            $usuario = $stmt->fetch();

            // Hash "falso" para que o tempo de resposta seja parecido
            // quando o usuário não existe (evita descobrir logins válidos)
            $hash = $usuario['senha_hash'] ?? password_hash('senha-falsa', PASSWORD_DEFAULT);
            $senhaOk = password_verify($senha, $hash);

            if ($usuario && $senhaOk) {
                // Atualiza o hash caso o algoritmo padrão do PHP tenha mudado
                if (password_needs_rehash($usuario['senha_hash'], PASSWORD_DEFAULT)) {
                    $novo = $pdo->prepare('UPDATE usuarios SET senha_hash = :h WHERE id = :id');
                    $novo->execute([':h' => password_hash($senha, PASSWORD_DEFAULT), ':id' => $usuario['id']]);
                }

                // Evita fixação de sessão
                session_regenerate_id(true);

                $_SESSION['usuario_id']   = (int)$usuario['id'];
                $_SESSION['usuario_nome'] = $usuario['nome'];
                $_SESSION['usuario_login'] = $usuario['usuario'];

                $jaLogado = true;
                $sucesso  = 'Login realizado com sucesso! Bem-vindo(a), ' . $usuario['nome'] . '.';
            } else {
                // Mensagem genérica: não revela se foi o usuário ou a senha
                $erro = 'Usuário ou senha incorretos.';
            }
        } catch (PDOException $ex) {
            error_log('Erro no login: ' . $ex->getMessage());
            $erro = 'Erro ao tentar entrar. Tente novamente mais tarde.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Kablau</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div id="navbar">
        <a href="index.html"><img id="logo" src="Img/kablau.png" alt="logo da loja kablau"></a>
        <a href="index.html" class="btn_comprar">Voltar para a loja</a>
    </div>

    <div class="login_container">

        <?php if ($jaLogado): ?>

            <div class="login_card">
                <h2>Você está logado</h2>

                <?php if ($sucesso): ?>
                    <div class="alerta alerta_sucesso alerta_visivel"><?= e($sucesso) ?></div>
                <?php else: ?>
                    <p>Olá, <b><?= e($_SESSION['usuario_nome']) ?></b> (<?= e($_SESSION['usuario_login']) ?>).</p>
                <?php endif; ?>

                <a href="index.html" class="btn_comprar">Ir para a loja</a>
                <a href="logout.php" class="btn_comprar">Sair</a>
            </div>

        <?php else: ?>

            <form class="login_card" method="post" action="login.php" novalidate>

                <h2>Entrar na Kablau</h2>

                <div id="alerta_login" class="alerta<?= $erro ? ' alerta_visivel' : '' ?>"><?= e($erro) ?></div>

                <label>Usuário</label>
                <input type="text" id="usuario" name="usuario" placeholder="Digite seu login"
                       maxlength="50" value="<?= e($usuarioDigitado) ?>">

                <label>Senha</label>
                <input type="password" id="senha" name="senha" placeholder="Digite sua senha">

                <button type="submit" class="btn_comprar">Entrar</button>
                <span>Novo na Kablau? <a href="cadastro.php">Cadastrar-se</a></span>
            </form>

        <?php endif; ?>

    </div>

    <script src="login.js"></script>
</body>
</html>
