<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    $studentsByGroup = [];
    
    require('conexion.php');
    // echo "<pre> PARAMS: "; var_dump($params); echo "</pre>";

    class Result {}

    $sqlStudentByGroup = mysqli_query($con, "SELECT e.id_registro registro, CONCAT(e.grado, e.grupo) gradoGrupo, CONCAT(u.nombres, ' ', u.apellido_pat, ' ', u.apellido_mat) nombreEstudiante FROM estudiantes e INNER JOIN usuario u ON e.id_usuario = u.id_usuario WHERE grado = ".intval($params[0])." AND grupo = '$params[1]'");
    
    while($row = mysqli_fetch_assoc($sqlStudentByGroup)){
        array_push($studentsByGroup, array_map('utf8_encode', $row));
    }
    
    if ($sqlStudentByGroup) {
        $resp = new Result();
        if (count($studentsByGroup) >= 1) {
            $resp->status = 'OK';
            $resp->msg = 'Se han encontrado '.count($studentsByGroup).' estudiante(s).';
            $resp->data = $studentsByGroup;
        } else {
            $resp->status = 'AVISO';
            $resp->msg = 'No se han encontrado estudiantes.';
            $resp->data = $studentsByGroup;
        }
        
        echo json_encode($resp);
        // echo "<pre>"; var_dump($resp); echo "</pre>";
    } else {
        $resp = new Result();
        $resp->status = 'ERROR';
        $resp->msg = 'Ha ocurrido un error';
        // $resp->msg = 'Ha ocurrido un error';

        echo json_encode($resp);
    }
?>