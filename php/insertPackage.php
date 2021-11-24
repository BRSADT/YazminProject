<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    require('conexion.php');

    class Result {}

    $sql_flag = false;
    /* Vale data */
    $date = $params[0]->date;                                                            /*Fecha*/
    $hr_in = $params[0]->hr_in;                                                          /*Hora entrada*/
    $hr_out = $params[0]->hr_out;                                                        /*Hora salida*/
    ( isset($params[0]->subject) ) ? $subject = $params[0]->subject : $subject = 'Null'; /*Asignatura*/
    ( isset($params[0]->user) ) ? $student = $params[0]->user : $student = 'Null';       /*Estudiante ID*/
    $laboratory = $params[0]->laboratory;                                                /*Laboratorio ID*/
    $signature = $params[0]->signature;                                                  /*Firma*/
    $state = $params[0]->state + 1;                                                      /*Estado vale*/
    $valeType = $params[0]->valeType;                                                    /*Tipo vale*/
    $career = $params[0]->career;                                                        /*Carrera*/
    $teacher = $params[0]->teacher;                                                      /*Docente ID*/
    ( $career == 'Desarrollo de Software' ) ? $career = 1 : $career = 2;                 /*Carrera ID*/
    $campus = $params[0]->campus;                                                        /*Plantel*/
    ( isset($params[0]->group) ) ? $group = $params[0]->group : $group = '0';            /*Grado y grupo*/

    $sqlVale = mysqli_query($con, "INSERT INTO vale VALUES ('', '$date', NOW(), '$hr_in', '$hr_out', $signature, $student, $laboratory, $subject, $state, $valeType, $teacher, '$campus', '$career')");
    $lastIdTblVales = mysqli_insert_id($con);
    
    
    for ($i = 0; $i < count($params[1]); $i++) {
        $idMat = $params[1][$i]->idMat;
        $sqlContentVale = mysqli_query($con, "INSERT INTO  vale_item  VALUES ('', $lastIdTblVales, $idMat)");
       // echo '<pre>'; var_dump($lastIdTblVales); echo '</pre>';
        if ($sqlContentVale) {
            $sql_flag = true;
        } else {
            $sql_flag = false;
        }
    }

    if ($sqlVale && $sql_flag) {
        $resp = new Result();
        $resp->status = 'OK';
        $resp->msg = 'El vale se ha registrado exitosamente';

        echo json_encode($resp, true);
    } else {
        $resp = new Result();
        $resp->status = 'ERROR';
        $resp->msg = 'Error en envio de formulario'.mysqli_error($con);
        echo json_encode($resp, true);
    }
?>