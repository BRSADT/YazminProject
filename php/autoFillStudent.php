<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);

    // echo '<pre>'; var_dump($params); echo '</pre>';

    require('conexion.php');

    class Result {}
    // Consulta que lleva los datos basicos al vale
    $sqlStudent = mysqli_query($con, "SELECT us.id_usuario, CONCAT(us.nombres, ' ', us.apellido_pat, ' ', us.apellido_mat ) nombreEstudiante, e.id_registro, CONCAT(e.grado, ' ', e.grupo) grupo, esp.carrera FROM estudiantes AS e INNER JOIN usuario AS us INNER JOIN especialidad AS esp ON us.id_usuario = e.id_usuario AND us.id_usuario = e.id_usuario AND us.id_division = esp.id_division WHERE us.id_usuario = $params");
    $resultStudent = mysqli_fetch_assoc($sqlStudent);

    if ($resultStudent) {
        $resp = new Result();
        $resp->status = 'OK';
        $resp->data = array_map('utf8_encode', $resultStudent);

        echo json_encode($resp);
        // echo json_encode(array_map('utf8_encode', $resp));
    } else {
        $resp = new Result();
        $resp->status = 'ERROR';
        $resp->msg = 'Ha ocurrido un error';

        echo json_encode($resp);
    }
?>