<?php
    $server = 'localhost';
    $user = 'root';
    $password = '';
    $db = 'systemval';

    $con = new mysqli($server, $user, $password, $db) or die ("Error conexión server");
    $con->query("SET NAMES 'utf8'");

    if (!$con) {
        die('No pudo conectase: '.mysqli_error($con));
    }
?>