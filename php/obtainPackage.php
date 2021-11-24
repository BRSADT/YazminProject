<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    $dataPackage = [];
    $dataMaterial = [];
    
    require('conexion.php');
    // echo "<pre> PARAMS: "; var_dump($params); echo "</pre>";

    class Result {}

    $flag = false;

    if (!$params) {
        $sqlPackage = mysqli_query($con, "SELECT v.id_vale, CONCAT(u.nombres, ' ', u.apellido_pat, ' ', u.apellido_mat) nombreDocente, l.nombre_lab, a.carrera, v.fecha, v.fecha_creacion, v.hora_entrada, v.hora_salida, v.plantel, v.id_estado_vale, asi.nombre FROM vale AS v INNER JOIN usuario AS u ON u.id_usuario = v.id_nomina INNER JOIN personal AS p ON p.id_usuario = v.id_nomina INNER JOIN laboratorio AS l ON l.id_laboratorio = v.id_laboratorio INNER JOIN especialidad AS a ON a.id_division = v.id_division INNER JOIN asignatura AS asi ON asi.id_asignatura = v.id_asignatura WHERE v.id_tipo_vale = 3 ORDER BY v.id_vale;");
    } else {
        $sqlPackage = mysqli_query($con, "SELECT v.id_vale, CONCAT(u.nombres, ' ', u.apellido_pat, ' ', u.apellido_mat) nombreDocente, l.nombre_lab, a.carrera, v.fecha, v.fecha_creacion, v.hora_entrada, v.hora_salida, v.plantel, v.id_estado_vale, asi.nombre FROM vale AS v INNER JOIN usuario AS u ON u.id_usuario = v.id_nomina INNER JOIN personal AS p ON p.id_usuario = v.id_nomina INNER JOIN laboratorio AS l ON l.id_laboratorio = v.id_laboratorio INNER JOIN especialidad AS a ON a.id_division = v.id_division INNER JOIN asignatura AS asi ON asi.id_asignatura = v.id_asignatura WHERE v.id_tipo_vale = 3 AND v.id_nomina = $params ORDER BY v.id_vale;");
    }

    
    while($row = mysqli_fetch_assoc($sqlPackage)){
        array_push($dataPackage, array_map('utf8_encode', $row));
    }

    // Iterar en el resultado de $dataPackage para poder hacer la siguiente consulta
    for ($i=0; $i < count($dataPackage); $i++) {
        $sqlMaterial = mysqli_query($con, "SELECT a.nombre FROM item AS a INNER JOIN vale_item AS cv ON a.id_item = cv.id_item WHERE cv.id_vale = ".$dataPackage[$i]['id_vale'] );
        
        $dataPackage[$i]["materiales"] = [];
        while($row = mysqli_fetch_assoc($sqlMaterial)){
            array_push($dataPackage[$i]["materiales"], array_map('utf8_encode', $row));
        }
    }

    $flag = true;
    
    if ($flag == true) {
        $resp = new Result();
        $resp->status = 'OK';
        $resp->msg = 'Se han encontrado '.count($dataPackage).' paquete(s).';
        $resp->data = $dataPackage;
        
        echo json_encode($resp);
        // echo "<pre>"; var_dump($resp); echo "</pre>";
    } else {
        $resp = new Result();
        $resp->status = 'AVISO';
        $resp->msg = 'No se han encontrado paquetes.';
        // $resp->msg = 'Ha ocurrido un error';

        echo json_encode($resp);
    }
?>