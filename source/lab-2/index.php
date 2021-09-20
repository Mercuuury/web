<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title><?php 
                    $title = 'Лабораторная работа 2';
                    echo $title;
                ?>
        </title>
        <link rel="stylesheet" href="styles/style.css">
    </head>
    <body>
        <header class="header">
            <div class="container">
                <nav class="main-menu">
                    <a href="<?php 
                                $ref = '#'; 
                                $text = 'Главная';
                                $current = true;
                                echo $ref;
                            ?>" <?php if($current) echo 'id="underline"';?> class="navigation"><?= $text; ?></a>
                    <a href="#about" class="navigation">Обо мне</a>
                    <a href="<?php 
                                $ref = 'skills.php'; 
                                $text = 'Навыки';
                                $current = false;
                                echo $ref;
                            ?>" <?php if($current) echo 'id="underline"';?> class="navigation"><?= $text; ?></a>
                    <a href="<?php 
                                $ref = 'technologies.php'; 
                                $text = 'Технологии';
                                $current = false;
                                echo $ref;
                            ?>" <?php if($current) echo 'id="underline"';?> class="navigation"><?= $text; ?></a>
                </nav>   
            <div class="text-center py-5">
                <h1 class="name">Ковшик Александр Сергеевич</h1>
                <h2>Веб-разработчик</h2>
                <p class="w-50 mx-auto my-3 ">
                    Привет
                </p>
                <a class="btn contact-me-btn" href="mailto:kovshiksa@gmail.com">Написать мне</a>
            </div>
            </div>
        </header>
        
        <main>
            <div class="container">
             <section id="about">
                <h1>Обо мне</h1>
                <?php 
                    if(date("s") % 2 === 0){
                        $img_name = "images\person.png";
                    } else {
                        $img_name = "images\php.png";
                    }
                ?>

                <figure class="avatar">
                   <img src="<?= $img_name; ?>" alt="Person"> 
                </figure>
                
                <p>
                    Меня зовут Александр. Мне 18. Я проживаю в г. Балашиха. С 2020 года являюсь
                     студентом Московского политехнического университета. На данный момент обучаюсь 
                     на втором курсе. Люблю программировать.
                </p>
            </section> 
            <section id="skills">
                <h1>Навыки</h1>
                <ol>
                    <li>Умение расставлять приоритеты.</li>
                    <li>Умение работать в команде.</li>
                    <li>Организационная осведомленность.</li>
                    <li>Эффективное решение проблем.</li>
                    <li>Самосознание.</li>
                    <li>Проактивность.</li>
                    <li>Способность оказывать влияние.</li>
                    <li>Эффективное принятие решений.</li>
                    <li>Способность к обучению.</li>
                    <li>Техническая смекалка.</li>
                </ol>
                <div class="text-right">
                    <a class="btn" href="skills.php">Подробнее</a>
                </div>
                
            </section>   

            <section id="technologies" style="margin-bottom: 200px;">
                <h1>Технологии</h1>
                <p>Технологии, которыми я владею:</p>

                <?php 
                    $arr = ['HTML', 'CSS', 'JavaScript', 'Bootstrap'];
                    $index = 0;
                ?>

                <ul>
                    <?php while ($index < 4): ?>
                    <li><?= $arr[$index] ?></li>
                    <?php $index = $index + 1 ?>
                    <?php endwhile; ?>
                </ul>
                <div class="text-right">
                    <a class="btn" href="technologies.php">Подробнее</a>
                </div>
            </section>
            </div>
        </main>
        
        <footer class="footer">
            <div class="container">
                &copy; Ковшик А.С.
                <?php
                    date_default_timezone_set("Europe/Moscow");
                    echo '<p> Сформировано '.date("d-m-Y H:i:s").'</p>';
                ?>
            </div>
        </footer>

    </body>
</html>