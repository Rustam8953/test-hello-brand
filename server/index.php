<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tzeezotje</title>
    <meta name="description" content="Test layout page">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="icon" href="./img/logo/logo.svg">
    <link rel="stylesheet" href="./style/reset.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/10.2.0/swiper-bundle.min.css" integrity="sha512-s6khMl5GDS1HbQ5/SwL1wzMayPwHXPjKoBN5kHUTDqKEPkkGyEZWKyH2lQ3YO2q3dxueG3rE0NHjRawMHd2b6g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="./../style/style.css">
    <style>
    
        .server {
            padding: 20px 0;
        }
        
        .server__item {
            border: 2px solid #000;
            padding: 15px 10px;
            display: flex;
            gap: 10px;
            border-radius: 10px;
        }
        
        .server__item:not(:last-child) {
            margin-bottom: 20px;
        }
        
        .server__length {
            padding: 20px 10px;
            border: 3px solid #000;
            border-radius: 10px;
            margin-bottom: 30px;
            font-weight: 600;
            font-size: 20px;
        }
        
        .server a {
            color: #000;
            border-bottom: 1px dotted #000;
            padding-bottom: 2px;
        }
        
        @media(max-width: 500px) {
            .server__item {
                flex-direction: column;
            }
            .server a {
                border-width: 0px;
                opacity: .8;
            }
        }
        
    </style>
</head>
<body>
    
    <section class="server">
        
        <div class="server__box box">
            
            <div class="server__length"></div>
            
            <div class="server__items">
                
                <?php
        
                    $con = mysqli_connect('localhost', 'user', 'password', 'dbname');
                    
                    $con->set_charset('utf8');
                    
                    $sql = 'SELECT * FROM db';
                    $result = mysqli_query($con, $sql);
                    
                    while ($row = mysqli_fetch_assoc($result)) {
                        
                        $row['name'] = mb_convert_encoding($row['name'], 'UTF-8');
                        $row['lastname'] = mb_convert_encoding($row['lastname'], 'UTF-8');
                        $row['telephone'] = mb_convert_encoding($row['telephone'], 'UTF-8');
                        
                        echo "<div class='server__item'>" . $row['name'] = mb_convert_encoding($row['name'], 'UTF-8') . ' ' . $row["lastname"] . ' ' . '<a href="tel:' . $row["telephone"] . '">' . $row["telephone"] . '</a>' . '</div>';
                        
                    }
                    
                    mysqli_close($con);
                
                ?>
                
            </div>
            
        </div>
        
    </section>
    
    <script>
        const serverItem = document.querySelectorAll('.server__item');
        const serverLength = document.querySelector('.server__length');
        serverLength.innerText = `Количество заявок: ${serverItem.length}`;
    </script>
    
</body>
</html>