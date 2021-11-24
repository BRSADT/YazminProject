<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    $dataSubjects = [];
    require('conexion.php');
    // echo "<pre>"; var_dump($params); echo "</pre>";

    class Result {}

    $sqlSubjects = mysqli_query($con, "SELECT id_asignatura, nombre FROM asignatura WHERE id_division = $params");
    
    while($row = mysqli_fetch_assoc($sqlSubjects)){
        array_push($dataSubjects, array_map('utf8_encode', $row));
    }
    
    if ($dataSubjects) {
        $resp = new Result();
        $resp->status = 'OK';
        $resp->data = $dataSubjects;
        
        echo json_encode($resp);
    } else {
        $resp = new Result();
        $resp->status = 'ERROR';
        $resp->msg = 'Ha ocurrido un error';

        echo json_encode($resp);
    }
?>