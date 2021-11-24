<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);

    require('conexion.php');

    class Result {}

    // echo '<pre> PARAMS: '; var_dump($params); echo '</pre>';
    if ($params) {
        $sqlStudent = mysqli_query($con, "SELECT u.id_tipo_usuario FROM estudiantes e INNER JOIN usuario u ON e.id_usuario = u.id_usuario WHERE id_registro = $params->username LIMIT 1");
        $resultStudent = mysqli_fetch_assoc($sqlStudent);
        if ($resultStudent) {
            $sqlStudentType = mysqli_query($con, "SELECT u.id_usuario, u.id_tipo_usuario, u.contrasena FROM estudiantes e INNER JOIN usuario u ON u.id_usuario = e.id_usuario WHERE e.id_registro = $params->username AND u.contrasena = '$params->password' LIMIT 1");
            $type = mysqli_fetch_assoc($sqlStudentType);
            initSessionStudent($con, $params, $type);
        }

        $sqlPersonal = mysqli_query($con, "SELECT u.id_tipo_usuario FROM personal p INNER JOIN usuario u ON p.id_usuario = u.id_usuario WHERE id_nomina = $params->username LIMIT 1");
        $resultPersonal = mysqli_fetch_assoc($sqlPersonal);
        if ($resultPersonal) {
            $sqlPersonalType = mysqli_query($con, "SELECT u.id_usuario, u.id_tipo_usuario, u.contrasena, u.recontrasena FROM personal p INNER JOIN usuario u ON u.id_usuario = p.id_usuario WHERE p.id_nomina = $params->username  AND u.contrasena = '$params->password' LIMIT 1");
            $type = mysqli_fetch_assoc($sqlPersonalType);
            initSessionPersonal($con, $params, $type);
        }
    }

    function initSessionStudent($con, $params, $type) {
        if ($type) {
            $sqlToken = mysqli_query($con, "INSERT INTO token VALUES ('', NOW(), '$params->token',".$type["id_usuario"].")");
            $lastId = mysqli_insert_id($con);
            $lastId = obtainLastId($con, $lastId);
            
            if ($sqlToken) {
                $resp = new Result();
                $resp->status = 'OK';
                $resp->msg = 'Student login';
                $resp->data = $lastId;

                echo json_encode($resp, true);
            } else {
                $resp = new Result();
                $resp->status = 'ERROR';
                $resp->msg = 'Student login not created';

                echo json_encode($resp, true);
            }
        } else {
            $resp = new Result();
            echo '<pre>'; var_dump($resp); echo '</pre>';
            $resp->status = 'ERROR';
            $resp->msg = 'Student error';

            echo json_encode($resp, true);
        }
    }

    function initSessionPersonal($con, $params, $type){
        if ($type) {
            $sqlToken = mysqli_query($con, "INSERT INTO token VALUES ('', NOW(), '$params->token',".$type["id_usuario"].")");
            $lastId = mysqli_insert_id($con);
            $lastId = obtainLastId($con, $lastId);
            
            if ($sqlToken) {
                $resp = new Result();
                $resp->status = 'OK';
                $resp->msg = 'Personal login';
                $resp->data = $lastId;

                echo json_encode($resp, true);
            } else {
                $resp = new Result();
                $resp->status = 'ERROR';
                $resp->msg = 'Personal login not created';
                
                echo json_encode($resp, true);
            }
        } else {
            $resp = new Result();
            $resp->status = 'ERROR';
            $resp->msg = 'Personal error';

            echo json_encode($resp, true);
        }
    }

    function obtainLastId($con, $lastId) {
        $sqlId = mysqli_query($con, "SELECT t.token, t.id_usuario, u.id_tipo_usuario FROM token t INNER JOIN usuario u ON t.id_usuario = u.id_usuario WHERE id_token = $lastId");
        
        return $resp = mysqli_fetch_assoc($sqlId);
    }
?>