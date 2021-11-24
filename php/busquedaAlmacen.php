<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    
    // echo "<pre>"; var_dump($params); echo "</pre>";

    require('conexion.php');

    class Result {}

    $sqlitem = mysqli_query($con, "SELECT * FROM item WHERE no_inventario = $params");
    
        
        if($sqlNoInv) {
            $resp = new Result();
            $resp->status = 'OK';
            $resp->msg = 'La herramienta o equipo se ha encontrado correctamente';

           echo json_encode($resp, true); 
        } else {
            $resp = new Result();
            $resp->status = 'ERROR';
            $resp->msg = 'No existe herramienta o equipo';

           echo json_encode($resp, true); 
        }
    }
?>