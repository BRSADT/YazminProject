<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = json_decode($json);
	$materialsPerVale = [];

    // echo '<pre>'; var_dump($params); echo '</pre>';

    require('conexion.php');

    class Result {}
    
    $sql = mysqli_query($con, "SELECT a.nombre, a.no_inventario AS no_inv FROM vale_item AS cv INNER JOIN item AS a ON cv.id_item = a.id_item WHERE id_vale = $params");

    while($row = mysqli_fetch_assoc($sql)){
        array_push($materialsPerVale, array_map('utf8_encode', $row));
    }

    // echo '<pre>'; var_dump($materialsPerVale); echo '</pre>';
    if ($materialsPerVale) {
        $resp = new Result();
        $resp->status = 'OK';
        $resp->data = $materialsPerVale;

        echo json_encode($resp);
    } else {
        $resp = new Result();
        $resp->status = 'AVISO';
        // $resp->msg = 'Ha ocurrido un error';
        $resp->msg = 'El vale no contiene materiales';

        echo json_encode($resp);
    }
?>