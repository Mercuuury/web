<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/style.css">
    <title>Лабораторная работа 4. Таблица умножения</title>
</head>
<body>
    <header>
        <img src="images\logo.png" alt="Картинка">
        <div class="container">
            <nav class="flex">
                <a href="?">Главная</a>
                <div class="right">
                    <?php
                        if(!isset($_GET['content'])) {
                            echo '<a href="?type=Table">Табличная верстка</a>';
                            echo '<a href="?type=Div">Блочная верстка</a>';
                        } else {
                            echo '<a href="?type=Table&content='.$_GET['content'].'">Табличная верстка</a>';
                            echo '<a href="?type=Div&content='.$_GET['content'].'">Блочная верстка</a>';
                        }
                    ?>
                </div>
            </nav>
        </div>
    </header>
    <main>
        <div class="container flex">
            <aside class="sidebar">
                <?php
                    if(!isset($_GET['content']))
                        echo '<a class="active" href="?">Вся таблица умножения</a>';
                    else 
                        echo '<a href="?">Вся таблица умножения</a>';

                    if(!isset($_GET['content'])){
                        for ($i = 2; $i < 10; $i++) {
                            echo '<a href="?content='.$i;
                            if(isset($_GET['type']))
                                echo '&type='.$_GET['type'].'">Умножение на '.$i.'</a>';
                            else
                                echo '">Умножение на '.$i.'</a>';
                        }
                    } else {
                        for ($i = 2; $i < 10; $i++) {
                            echo '<a href="?content='.$i;
                            if(isset($_GET['type']))
                                echo '&type='.$_GET['type'];
                            if($_GET['content'] == $i)
                                echo '" class="active';
                            echo '">Умножение на '.$i.'</a>';
                        }
                    }
                ?>
            </aside>
            <div class="flex">
                <div class="<?php 
                    if (!isset($_GET['type']) || $_GET['type'] == 'Table') 
                        echo 'table-view';
                    elseif ($_GET['type'] == 'Div') echo 'block-view';
                ?>">
                    <?php 
                        if (isset($_GET['content'])) {
                            if(isset($_GET['type'])){
                                if($_GET['type'] == 'Table') doTable($_GET['content']);
                                elseif($_GET['type'] == 'Div') doDiv($_GET['content']);
                            } else {
                                doTable($_GET['content']);
                            }
                        } else {
                            if(isset($_GET['type']) && $_GET['type'] == 'Div'){
                                for ($i=2; $i<10; $i++)
                                    doDiv($i);
                            } else {
                                for ($i=2; $i<10; $i++)
                                    doTable($i);
                            }
                        }
                    ?>
                </div>
            </div>
        </div>
        <?php 
            function doTable($number) {
                echo '<table>';
                for ($i = 2; $i < 10; $i++) {
                    $result = $i * $number;
                    echo '<tr>
                            <td><a href="?content='.$i.'">'.$i.'</a>*<a href="?content='.$number.'">'.$number.'</a></td>';
                            if($result < 10)
                                echo '<td><a href="?content='.$result.'">'.$result.'</a></td>';
                            else echo '<td>'.$result.'</td>';
                          echo '</tr>';
                }
                echo '</table>';
            }

            function doDiv($number) {
                echo '<div class="table">';
                for ($i = 2; $i < 10; $i++) {
                    $result = $i * $number;
                    if($result < 10)
                        echo '<p><a href="?content='.$i.'">'.$i.'</a>*<a href="?content='.$number.'">'.$number.'</a>=<a href="?content='.$result.'">'.$result.'</a></p>';
                    else 
                        echo '<p><a href="?content='.$i.'">'.$i.'</a>*<a href="?content='.$number.'">'.$number.'</a>='.$result.'</p>';
                }
                echo '</div>';
            }
        ?>
    </main>
    <footer>
        <?php
            if (!isset($_GET['type']))
                echo '<p> Верстка не выбрана. ';
            elseif ($_GET['type'] == 'Table')
                echo '<p> Выбрана табличная верстка. ';
            else
                echo '<p> Выбрана блочная верстка. ';

            if (!isset($_GET['content']))
                echo 'Вся таблица умножения. ';
            else
                echo 'Таблица умножения на '.$_GET['content'].'. ';

            date_default_timezone_set("Europe/Moscow");
            echo 'Дата: '.date("d.m.Y").'г. Время: '.date("H:i").'</p>';
        ?>

    </footer>
</body>
</html>

