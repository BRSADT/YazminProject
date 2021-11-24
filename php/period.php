<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    require('conexion.php');
    // echo "<pre>"; var_dump($params); echo "</pre>";

    class Result {}

    $sqlPeriodo = mysqli_query($con, "SELECT * FROM periodo WHERE id_periodo = $params");
    $dataPeriod = omysqli_fetch_assoc($sqlPeriodo);
    
    if ($dataPeriod) {
        $resp = new Result();
        $resp->status = 'OK';
        $resp->data = $dataPeriod;
        
        echo json_encode($resp);
    } else {
        $resp = new Result();
        $resp->status = 'ERROR';
        $resp->msg = 'Ha ocurrido un error';

        echo json_encode($resp);
    }
?>