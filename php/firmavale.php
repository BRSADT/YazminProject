<?php
   header('Access-Control-Allow-Origin: *');
   header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
   header('Content-Type: application/json, charset=utf-8');

   $json = file_get_contents('php://input');
   $params = json_decode($json);

   // echo "<pre>"; var_dump($params); echo "</pre>";
   require('conexion.php');

   class Result {}  

   $sql= mysqli_query($con,"UPDATE vale SET firma_docente = 1 WHERE id_vale  = $params");

   if($sql) {
      $resp = new Result();
      $resp->status = 'OK';
      $resp->msg = 'Se ha firmado correctamente';

      echo json_encode($resp, true);

    } else {
      $resp = new Result();
      $resp->status = 'ERROR';
      $resp->msg = 'Error al firmar favor de solicitar ayuda de un ténico';

      echo json_encode($resp, true);
    }
?>