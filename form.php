<?php

    $named = $_POST['firstname'];
    $lastnamed = $_POST['lastname'];
    $telephone = $_POST['tel'];

    $username = 'u1923960_test';
    $password = '89537845840Rustam';
    $database = 'u1923960_test';
    $host = 'localhost';

    $conn = new mysqli($host, $username, $password, $database);
    mysqli_set_charset($conn, 'utf8');

    if($conn->connect_error) {   
        die('Connection error: " . $conn->connect_error"');
    };

    $sql = "INSERT INTO hellobrand (name, lastname, telephone)
    VALUES ('$named', '$lastnamed', '$telephone')";

    if($conn->query($sql) === TRUE) {
        $message = 'Форма успешна отправлена';
    } else {
        $message = 'Ошибка отправки формы';
    }

    $response = ["message" => $message];
    header('Content-type: application/json');

    echo json_encode($response);

    $conn->close();

?>