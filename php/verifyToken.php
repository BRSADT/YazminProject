<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);

    // echo '<pre>'; var_dump($params); echo '</pre>';

    require('conexion.php');

    class Result {}

    if ($params) {
        $sqlToken = mysqli_query($con, "SELECT u.id_tipo_usuario, t.token FROM token t INNER JOIN usuario u ON t.id_usuario = u.id_usuario WHERE token = '$params'");
        $type = mysqli_fetch_row($sqlToken);

        if ($sqlToken) {
            $resp = new Result();
            $resp->status = 'OK';
            $resp->msg = 'Token exist';
            $resp->type = $type;
            
            echo json_encode($resp, true);
        } else {
            $resp = new Result();
            $resp->status = 'ERROR';
            $resp->msg = 'Token not exist';
            
            echo json_encode($resp, true);
        }
    }

?>