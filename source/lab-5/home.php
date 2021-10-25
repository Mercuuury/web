<?php include 'header.html'; ?>
    <main class="main-form">
        <?php
            echo '<p>Здравствуйте, '.$_POST['name'].'</p>';
            if ($_POST['category'] == 'propose') {
                echo '<p>Спасибо за ваше предложение: </p>';
                echo '<textarea>'.$_POST['message'].'</textarea>';
            } else {
                echo '<p>Ваша жалоба будет рассмотрена: </p>';
                echo '<textarea>'.$_POST['message'].'</textarea>';
            }
            if (isset($_POST['attachment']) & $_POST['attachment'] != ''){
                echo '<p>Вы приложили следующий файл: '.$_POST['attachment'].'</p>';
            }
            echo '<a class="btn" href="index.php?name='.$_POST['name'].'&email='.$_POST['email'].'&source='.$_POST['source'].'">Заполнить снова</a>';
        ?>
    </main>
    <footer>

    </footer>
</body>
</html>