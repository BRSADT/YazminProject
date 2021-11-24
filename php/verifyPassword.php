<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);

    require('conexion.php');

    // echo '<pre>'; var_dump($params); echo '</pre>';

    class Result {}

    if ($params) {
        $sqlStudent = "SELECT id_usuario FROM usuario WHERE id_usuario = '$params' LIMIT 1";
        $resultStudent = $con->query($sqlStudent);
        if ($resultStudent->num_rows > 0) {
            initVerifyPassword($con, $params);
        }

        // $sqlPersonal = "SELECT id_nomina FROM personal WHERE id_nomina = '$params' LIMIT 1";
        // $resultPersonal = $con->query($sqlPersonal);
        // if ($resultPersonal->num_rows > 0) {
        //     initVerifyPasswordPersonal($con, $params);
        // }
    }

    function initVerifyPassword($con, $params) {
        $sqlStudent = "SELECT contrasena, recontrasena FROM usuario WHERE id_usuario = '$params' LIMIT 1";
        $resultStudent = $con->query($sqlStudent);
        if ($resultStudent->num_rows > 0) {
            if ($resp = $resultStudent->fetch_array()) {
                if ($resp[0] == $resp[1]) {
                    // echo '<pre>'; var_dump($resp[0]); echo '</pre>';
                    // Crear la sesión
                    $resp = new Result();
                    $resp->status = 'EQUALS';
                    $resp->msg = 'Password are equals';

                    // echo '<pre>'; var_dump($resp); echo '</pre>';
    
                    echo json_encode($resp, true);
                }
            }
        } else {
            $resp = new Result();
            $resp->status = 'ERROR';
            $resp->msg = 'Student error';

            echo json_encode($resp, true);
        }
    }


?>