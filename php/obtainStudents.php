<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    $dataStudents = [];
    
    require('conexion.php');
   // echo "<pre>"; var_dump($params); echo "</pre>";

    class Result {}

    $sqlStudent = mysqli_query($con, "SELECT e.*, CONCAT(u.nombres, ' ', u.apellido_pat, ' ', u.apellido_mat) AS nombreEstudiante, u.id_division FROM estudiantes e INNER JOIN usuario u ON e.id_usuario = u.id_usuario WHERE grado = $params AND grupo = '$params'");
    
    while($row = mysqli_fetch_assoc($sqlStudent)){
        array_push($dataStudents, array_map('utf8_encode', $row));
    }
    // echo "<pre>"; var_dump($dataStudents); echo "</pre>";
    
    if ($flag == true) {
        $resp = new Result();
        $resp->status = 'OK';
        $resp->data = $dataStudents;
        
        echo json_encode($resp);
    } else {
        $resp = new Result();
        $resp->status = 'AVISO';
        $resp->msg = 'No se han encontrado paquetes.';

        echo json_encode($resp);
    }
?>