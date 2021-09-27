<?php 
    include 'header.html';
    $login = 'admin';
    $password = '123456';
?>
<body class="align">
    <div class="login">
        <header class="login__header"><h2>Авторизация</h2></header>
        <div class="login__form">
            <?php
                if ($_POST['login'] == $login & $_POST['password'] == $password) {
                    echo '<p>Добро пожаловать, '.$_POST['login'].'</p>';
                } else {
                    echo '<p>Неверное имя пользователя и пароль</p>';
                    echo '<a class="button" href="index.php">Ввести снова</a>';
                }
            ?>
        </div>
    </div>
</body>
</html>