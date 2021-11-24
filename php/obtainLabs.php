<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = $json;
    $dataLabs = [];
    require('conexion.php');

    // echo '<pre>'; var_dump($params); echo '</pre>';

    class Result {}

    $sql = mysqli_query($con, "SELECT * FROM laboratorio WHERE id_division = $params ORDER BY nombre_lab ASC");
    while($row = mysqli_fetch_assoc($sql)){
        array_push($dataLabs, array_map('utf8_encode', $row));
    }

    if ($dataLabs) {
        $resp = new Result();
        $resp->status = 'OK';
        $resp->data = $dataLabs;

        echo json_encode($resp);
    } else {
        $resp = new Result();
        $resp->status = 'ERROR';
        $resp->msg = 'Ha ocurrido un error';

        echo json_encode($resp);
    }
?>