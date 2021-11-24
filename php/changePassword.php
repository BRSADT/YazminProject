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
        $sql = mysqli_query($con, "SELECT id_usuario, contrasena FROM usuario WHERE id_usuario = '$params->username' LIMIT 1");
        $result = mysqli_fetch_assoc($sql);
        if ($params->password != $result['contrasena']) {
            initChangePassword($con, $params);
        } else {
            $resp = new Result();
            $resp->status = 'EQUALS';
            $resp->msg = 'La contraseña es igual!';

            echo json_encode($resp, true);
        }
    }

    function initChangePassword($con, $params) {
        $sql = mysqli_query($con, "UPDATE usuario SET contrasena = '$params->password' WHERE id_usuario = '$params->username'");

        if ($sql) {
            $resp = new Result();
            $resp->status = 'OK';
            $resp->msg = 'La contraseña se ha modificado exitosamente!';

            echo json_encode($resp, true);
        } else {
            $resp = new Result();
            $resp->status = 'ERROR';
            $resp->msg = 'Ha ocurrido un error';

            echo json_encode($resp, true);
        }
    }

?>