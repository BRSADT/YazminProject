<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);

   $params = (object) ['id_hora_extra' => 3];
   require('conexion.php');

   class Result {}  

   $sql= mysqli_query($con, "UPDATE hora_extra_clase SET id_alma = 200 WHERE id_hora_extra  = ". $params->id_hora_extra);


  if($sql) {
       $resp = new Result();
        $resp->status = 'OK';
       $resp->msg = 'La solicitud se ha firmado correctamente';

       echo json_encode($resp, true);
    } else {
       $resp = new Result();
        $resp->status = 'ERROR';
        $resp->msg = 'Error al firmar favor de solicitar ayuda de un ténico';

     echo json_encode($resp, true);
    }
   

   ?>