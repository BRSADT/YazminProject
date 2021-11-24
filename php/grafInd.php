<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    
    // echo "<pre>"; var_dump($params); echo "</pre>";

    require('conexion.php');

    class Result {}

    $sqlMostMat = mysqli_query($con, "SELECT FROM vale WHERE id_laboratorio = $params"); 
    if ($sqlMostMat){
        $sqlMostrar = mysqli_query($con, "SELECT FROM vale_item WHERE id_vale = $params");
        
        if($sqlMostrar) {
            $resp = new Result();
            $resp->status = 'OK';
            $resp->msg = 'Error en la muestra de graficos';

           echo json_encode($resp, true); 
        } else {
            $resp = new Result();
            $resp->status = 'ERROR';
            $resp->msg = 'No se ha podido visualizar los graficos deseados';

           echo json_encode($resp, true); 
        }
    }
    
?>
