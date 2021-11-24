    <?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
   // $params = json_decode($json);
   require('conexion.php');
   
   $params =  array(["id_vale"=>1, "id_item"=>1, ["id_vale"=>3, "equipment"=>2]);

   var_dump($params);
   for ($i=0; $i < count($params) ; $i++) { 

     $param = $params[$i];

     $sql = mysqli_query($con, "INSERT INTO vale_item VALUES (NULL, ".$params['id_vale'], $params['id_item']." )");
     if($sql)
     {
       echo("ok");
     }else{
     echo "ERROR".mysqli_error($con);
     }
     var_dump($param["id_vale"]);
   }


   ?>










   
    
// if($params)
// {
//   echo("El array tiene elementos");

// }
// else
// {
//   echo("El array esta vacio");
// }
    
// $sqlextra = ($con, "INSERT INTO contenido_vales VALUES (1, 1, 1,)");

     
    //  if ($sqlextra){
    //    echo "OK";      
    //  }else {
    //    echo "ERROR";
    //  }









