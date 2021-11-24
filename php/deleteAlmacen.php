<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    
    // echo "<pre>"; var_dump($params); echo "</pre>";

    require('conexion.php');

    class Result {}

    $sqlDeleteEquip = mysqli_query($con, "DELETE FROM item WHERE no_inventario = $params"); 
        
        if($sqlDeletemat) {
            $resp = new Result();
            $resp->status = 'OK';
            $resp->msg = 'La herramienta o equipo se ha eliminado correctamente';

           echo json_encode($resp, true); 
        } else {
            $resp = new Result();
            $resp->status = 'ERROR';
            $resp->msg = 'No se ha podido eliminar la herramienta o equipo';

           echo json_encode($resp, true); 
        }
    }
?>