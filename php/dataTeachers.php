<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    $dataTeacher = [];
    require('conexion.php');

    class Result {}

    $sql = mysqli_query($con, "SELECT u.id_usuario, CONCAT(u.nombres, ' ', u.apellido_pat, ' ', u.apellido_mat) as nombreDoc FROM usuario AS u INNER JOIN personal AS p ON u.id_usuario = p.id_usuario ORDER BY nombreDoc ASC");

    while($row = mysqli_fetch_assoc($sql)){
        array_push($dataTeacher, array_map('utf8_encode', $row));
    }

    if ($dataTeacher) {
        $resp = new Result();
        $resp->status = 'OK';
        $resp->data = $dataTeacher;

        echo json_encode($resp);
    } else {
        $resp = new Result();
        $resp->status = 'ERROR';
        $resp->msg = 'Ha ocurrido un error';

        echo json_encode($resp);
    }
?>