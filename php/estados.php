<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
   // $params = json_decode($json);
   $params = (object) ['id_almacen' => 24];
   require('conexion.php');

   class Result {} 
   $opc = 1;
   switch($opc)
   {
       case 1: 
    $sqlAlmacen = mysqli_query($con, "UPDATE almacen SET estado = 1  WHERE id_almacen = '$params->id_almacen'");
    if ($sqlAlmacen) {
        $resp = new Result();
            $resp->status = 'OK';
            $resp->msg = 'El estado se ha asignado correctamente';
            
            echo json_encode($resp, true);
        } else {
          $resp = new Result();
          $resp->status = 'ERROR';
          $resp->msg = 'Error';

          echo json_encode($resp, true);
        } 
        break; 
            case 2:  
            $sqlAlmacen = mysqli_query($con, "UPDATE almacen SET estado = 2  WHERE id_almacen = '$params->id_almacen'");
            if ($sqlAlmacen) {
                $resp = new Result();
                    $resp->status = 'OK';
                    $resp->msg = 'El estado se ha asignado correctamente';
                    
                    echo json_encode($resp, true);
                } else {
                  $resp = new Result();
                  $resp->status = 'ERROR';
                  $resp->msg = 'Error';
        
                  echo json_encode($resp, true);
                } 
                break;

                    case 3:  
                    $sqlAlmacen = mysqli_query($con, "UPDATE almacen SET estado = 3  WHERE id_almacen = '$params->id_almacen'");
                    if ($sqlAlmacen) {
                        $resp = new Result();
                            $resp->status = 'OK';
                            $resp->msg = 'El estado se ha asignado correctamente';
                            
                            echo json_encode($resp, true);
                        } else {
                          $resp = new Result();
                          $resp->status = 'ERROR';
                          $resp->msg = 'Error';
                
                          echo json_encode($resp, true);
                        } 
                        break;

                            case 4:  
                            $sqlAlmacen = mysqli_query($con, "UPDATE almacen SET estado = 4  WHERE id_almacen = '$params->id_almacen'");
                            if ($sqlAlmacen) {
                                $resp = new Result();
                                    $resp->status = 'OK';
                                    $resp->msg = 'El estado se ha asignado correctamente';
                                    
                                    echo json_encode($resp, true);
                                } else {
                                  $resp = new Result();
                                  $resp->status = 'ERROR';
                                  $resp->msg = 'Error';
                        
                                  echo json_encode($resp, true);
                                } 
                                break;
                                    case 5:  
                                    $sqlAlmacen = mysqli_query($con, "UPDATE almacen SET estado = 5  WHERE id_almacen = '$params->id_almacen'");
                                    if ($sqlAlmacen) {
                                        $resp = new Result();
                                            $resp->status = 'OK';
                                            $resp->msg = 'El estado se ha asignado correctamente';
                                            
                                            echo json_encode($resp, true);
                                        } else {
                                          $resp = new Result();
                                          $resp->status = 'ERROR';
                                          $resp->msg = 'Error';
                                
                                          echo json_encode($resp, true);
                                        } 
                                        break;
                                        }
   ?>