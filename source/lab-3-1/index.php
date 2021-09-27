<?php include 'header.html'; ?>
<body class="align">
    <div class="login">
        <header class="login__header"><h2>Авторизация</h2></header>
        <form class="login__form" action="signin.php" method="post">
            <div>
                <label for="username">Логин (подсказка: admin)</label>       
                <input type="text" name="login" id="login" required>
            </div>
            <div>
                <label for="password">Пароль (подсказка: 123456)</label>
                <input type="password" name="password" id="password" required>
            </div>
            <div>
                <input class="button" type="submit" value="Войти">  
            </div>
        </form>
    </div>
</body>
</html>