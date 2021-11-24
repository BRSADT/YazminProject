
<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
   // $params = json_decode($json);
   require('conexion.php');
   class Result {}

  // $params =  array("id_almacen"=>1, "nombre"=>"oscilloscopio", "no_inventario"=>1111, "estado"=>2);

   var_dump($params);
  
    
   $query = 'INSERT INTO almacen VALUES (NULL, "' . $params['nombre'] . '",' . $params['no_inventario'] . ',' . $params['estado'] . ')';
   $sql = mysqli_query($con, $query);
     

if ($sql) {
  $resp = new Result();
  $resp->status = 'Se ha agregado correctamente';
  $resp->data[] = array_map('utf8_encode', $sql);

  echo json_encode($resp);
  // echo json_encode(array_map('utf8_encode', $resp));
} else {
  $resp = new Result();
  $resp->status = 'ERROR';
  $resp->msg = 'Ha ocurrido un error';

  echo json_encode($resp);
}


   ?>
   