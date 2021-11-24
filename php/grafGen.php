<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    
    // echo "<pre>"; var_dump($params); echo "</pre>";

    require('conexion.php');

    class Result {}

    $sqlDeleteMat = mysqli_query($con, "SELECT FROM vale_item WHERE id_vale = $params"); 
        
        if($sqlDelete) {
            $resp = new Result();
            $resp->status = 'OK';
            $resp->msg = 'Error en la muestra de graficos generales';

           echo json_encode($resp, true); 
        } else {
            $resp = new Result();
            $resp->status = 'ERROR';
            $resp->msg = 'No se ha podido visualizar los graficos';

           echo json_encode($resp, true); 
        }
    }
    
?>