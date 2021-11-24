<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);

    // echo '<pre>'; var_dump($params); echo '</pre>';

    require('conexion.php');

    class Result {}
    
    $sqlTeacher = mysqli_query($con, "SELECT u.id_usuario, CONCAT(u.nombres, ' ', u.apellido_pat, ' ', u.apellido_mat ) nombreDocente, p.id_nomina, esp.carrera FROM personal AS p INNER JOIN usuario AS u INNER JOIN especialidad AS esp ON u.id_usuario = p.id_usuario AND u.id_division = esp.id_division WHERE u.id_usuario = $params");
    $resultTeacher = mysqli_fetch_assoc($sqlTeacher);

    if ($resultTeacher) {
        $resp = new Result();
        $resp->status = 'OK';
        $resp->msg = 'EXITO';
        $resp->data = array_map('utf8_encode', $resultTeacher);

        echo json_encode($resp, true);
    } else {
        $resp = new Result();
        $resp->status = 'ERROR';
        $resp->msg = 'Error al buscar los datos';

     echo json_encode($resp, true);
    }

?>