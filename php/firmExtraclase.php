<?php
   header('Access-Control-Allow-Origin: *');
   header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
   header('Content-Type: application/json, charset=utf-8');

   $json = file_get_contents('php://input');
   $params = json_decode($json);

   // echo "<pre>"; var_dump($params); echo "</pre>";
   require('conexion.php');

   class Result {}   

   $sql = mysqli_query($con,"UPDATE hora_extra SET firma_coordinador = 1 WHERE id_hora_extra = $params");

   if($sql) {
      $resp = new Result();
      $resp->status = 'OK';
      $resp->msg = 'La solicitud se ha firmado con éxito!';

      echo json_encode($resp, true);
   } else {
      $resp = new Result();
      $resp->status = 'ERROR';
      $resp->msg = 'Ha ocurrido un error';

     echo json_encode($resp, true);
   }

?>