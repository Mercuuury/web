<?php 
    include 'header.html';
    if (isset($_GET['name'])) {
        $name = $_GET['name'];
        $email = $_GET['email'];
        $source = $_GET['source'];
    }
?>
    <main class="main-form">
        <h1>Форма обратной связи</h1>
        <div class="container">
            <form action="home.php" method="post">
                <input type="hidden" name="user-id" value="01">
                <div class="form-group">
                    <label class="form-label" for="name">ФИО</label>
                    <input type="text" name="name" id="name" value="<?= $name; ?>" required>
                </div>

                <div class="form-group">
                    <div class="flex">
                        <input type="checkbox" name="send" id="send">
                        <label class="form-label" for="send">Отправить текст сообщения на почту?</label>
                    </div>
                    <div class="e-mail">
                        <label class="form-label" for="email">Email</label>
                        <input type="email" name="email" id="email" value="<?= $email; ?>" placeholder="Введите email">
                    </div>
                </div>

                <div class="form-group">
                    <p class="form-label" style="margin-bottom: 10px;">Как вы узнали о нас?</p>
                    
                    <input type="radio" name="source" id="ads" value="ads" <?php if ($source == 'ads') echo 'checked';?>>
                    <label for="ads" style="font-size: 20px;">Реклама в интернете</label>
                    
                    <input type="radio" name="source" id="friends" value="friends" <?php if ($source == 'friends') echo 'checked';?>>
                    <label for="friends" style="font-size: 20px;">Рассказали друзья</label>
                </div>

                <div class="form-group">
                    <label class="form-label" for="category">Категория обращения</label>
                    <select name="category" id="category">
                        <option value="propose">Предложение</option>
                        <option value="grievance">Жалоба</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label" for="message">Сообщение</label>
                    <textarea name="message" id="message" cols="30" rows="10" placeholder="Введите сообщение"></textarea>
                </div>

                <div class="form-group">
                    <label class="form-label" for="attachment">Вложение</label>
                    <input type="file" name="attachment" id="attachment">
                </div>

                <div class="form-group">
                    <input type="checkbox" name="agreement" id="agreement" value="yes">
                    <label for="agreement">Даю согласие на обработку данных</label>
                </div>

                <div class="form-group">
                    <input class="btn" type="submit" value="Отправить" id="submit" disabled></button>
                </div>
            </form>
        </div>
    </main>
    <footer></footer>
    <script src="scripts\script.js"></script>
</body>
</html>