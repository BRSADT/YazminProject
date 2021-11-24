<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    require('conexion.php');

    class Result {}
    $sqlDeleteHourExtraEstudiante = mysqli_query($con, "DELETE FROM hora_extra_estudiante WHERE id_hora_extra = $params"); 
     //echo '<pre>'; var_dump($params); echo '</pre>';
     //echo "Error: ".mysqli_error($con);

    if($sqlDeleteHourExtraEstudiante){
        $sqlDeleteHourExtra = mysqli_query($con, "DELETE FROM hora_extra_horario WHERE id_hora_extra = $params"); 
        //echo "Error: ".mysqli_error($con);
        
            if($sqlDeleteHourExtra){
                $sqlDeleteH = mysqli_query($con, "DELETE FROM hora_extra WHERE id_hora_extra = $params");
                //echo "Error: ".mysqli_error($con);
                
                if($sqlDeleteH) {
                $resp = new Result();
                $resp->status = 'OK';
                $resp->msg = 'El formato extra clase se ha eliminado correctamente';
                echo json_encode($resp, true); 
            
            } else {
                $resp = new Result();
                $resp->status = 'ERROR';
                $resp->msg = 'No se ha podido eliminar el formato extra clase';

                echo json_encode($resp, true); 
                    }
                }    
          }
    ?>