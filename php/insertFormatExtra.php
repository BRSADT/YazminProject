<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);

    require('conexion.php');

    class Result {}

     //echo '<pre>'; var_dump($params); echo '</pre>';

     /*MODIFICA PARA QUE LAS VARIABLES COINCIDAN CON EL JSON*/
    $sql_flag = false;
    /* Vale data */
    $campus = $params[0]->campus;                                                            //plantel
    $level = $params[0]-> level; 
    $period = $params[0]->period;                                                            //periodo
    $career = $params[0]->career;                                                            //carrera
    ($career == 'Desarrollo de Software') ? $career = 1 : $career = 2;                       //carrera ID
    $laboratory = $params[0]->laboratory;                                                    //laboratorio 
    $date = $params[0]->date;                                                                //fecha
    //$hr_in = $params[0]->hr_in;                                                              //hora_entrada
    //$hr_out = $params[0]->hr_out;                                                            //hora_salida
    ( isset($params[0]->nameTeacher) ) ? $teacher = $params[0]->nameTeacher : '';                          //docente_ID
    ( isset($params[0]->subject) ) ? $subject = $params[0]->subject : $subject = '0';        //asignatura
    ( isset($params[0]->group) ) ? $group = $params[0]->group : $group = '0';                //Grado y grupo
    $signature = $params[0]->signature;                                                      //firma 

   
   // $lastIdTblVales = mysqli_insert_id($con);
   
//   $sqlFormat =  mysqli_query($con,"INSERT INTO hora_extra (id_hora_extra,id_usuario,id_laboratorio,id_asignatura,id_periodo,grupo,grado,firma_coordinador,fecha) VALUES ('1', 2, 3, 4, 5, '23 nov', 'P', '4',  'NO FIRMADO')");
//SI ES NECESARIO MODIFICA LA TABLA    
$sqlFormat =  mysqli_query($con,"INSERT INTO hora_extra (id_hora_extra,id_usuario,id_laboratorio,id_asignatura,id_periodo,grupo,grado,firma_coordinador,fecha) VALUES ('1',  '$teacher','$laboratory', 4, 5, '23 nov', 'P', '4',  'NO FIRMADO')");

   
   // if ($sqlVale && $sql_flag) {
        $resp = new Result();
        $resp->status = 'OK';
        $resp->msg = 'El vale se ha registrado exitosamente';

        echo json_encode($resp, true);
   // } else {
    /*    $resp = new Result();
        $resp->status = 'ERROR';
        $resp->msg = 'Error en envio de formulario'.mysqli_error($con);

        echo json_encode($resp, true);
    }*/
?>