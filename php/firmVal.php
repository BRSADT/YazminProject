<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);
    $arregloVales = [];
    // echo '<pre>'; var_dump($params); echo '</pre>';

    require('conexion.php');

    class Result {}  

    $sqlVal = mysqli_query($con, "SELECT CONCAT(u.nombres, ' ', u.apellido_pat, ' ', u.apellido_mat) nombreDocente, CONCAT(e.grado, ' ', e.grupo) AS gradoGrupo, CONCAT(us.nombres, ' ', us.apellido_pat, ' ', us.apellido_mat ) nombreEstudiante, v.id_vale AS id_vale, v.firma_docente, l.nombre_lab, a.carrera, v.fecha, v.hora_entrada, v.hora_salida, v.fecha_creacion FROM vale AS v INNER JOIN usuario AS u ON u.id_usuario = v.id_nomina INNER JOIN personal AS p ON p.id_usuario = v.id_nomina INNER JOIN usuario AS us ON us.id_usuario = v.id_usuario INNER JOIN estudiantes AS e ON us.id_usuario = e.id_usuario INNER JOIN laboratorio AS l ON l.id_laboratorio = v.id_laboratorio INNER JOIN especialidad AS a ON a.id_division = v.id_division WHERE v.firma_docente = 0 AND v.id_nomina = $params ORDER BY v.id_vale");
    
    //echo "error".mysqli_error($con);
    
    while($row = mysqli_fetch_assoc($sqlVal)){
        array_push($arregloVales, array_map('utf8_encode', $row));
    }
    
    if($sqlVal) {
        $resp = new Result();
        $resp->status = 'OK';
        $resp->msg = 'Se han encontrado Vales para firmar';
        $resp->data = $arregloVales;
        
        echo json_encode($resp, true);
    } else {
        $resp = new Result();
        $resp->status = 'ERROR';
        $resp->msg = 'No se han encontrado vales para firmar';
    
        echo json_encode($resp, true);
    }

?>