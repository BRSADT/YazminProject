<?php
      header('Access-Control-Allow-Origin: *');
      header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
      header('Content-Type: application/json, charset=utf-8');
  
      $json = file_get_contents('php://input');
      $params = json_decode($json);
    
      require('conexion.php');

    class Result {}  

        if ($params->asignature){
	  $sqlAsignature = mysqli_query($con, "UPDATE horario SET asignatura = '$params->asignatura'  WHERE id_modulo = '$params->Asignatura'");
	  if ($sqlAsignature) {
            $resp = new Result();
            $resp->status = 'OK';
            $resp->msg = 'La asignatura se ha modificado correctamente';

            echo json_encode($resp, true);
          } else {
            $resp = new Result();
            $resp->status = 'ERROR';
            $resp->msg = 'Error';

            echo json_encode($resp, true);
          } 
	} else if ($params->laboratory) {
          $sqlLaboratory = mysqli_query($con, "UPDATE horario SET id_laboratorio = '$params->id_laboratorio'  WHERE id_modulo = '$params->Laboratorio'");
	  if ($sqlLaboratory) {
            $resp = new Result();
            $resp->status = 'OK';
            $resp->msg = 'La nombre del laboratorio se ha modificado correctamente';

            echo json_encode($resp, true);
	  } else {
            $resp = new Result();
            $resp->status = 'ERROR';
            $resp->msg = 'Error';

            echo json_encode($resp, true);
	  }
      } else if ($params->$sqlAsignature && $params->laboratory) {
	    $sqlGenerate = mysqli_query($con, "UPDATE horario SET asignatura, id_laboratorio = '$params->asignatura', '$params->id_laboratorio' WHERE id_modulo = '$params->Asignatura', '$params->Laboratorio");
	    if ($sqlGenerate) {            
		$resp = new Result();
            	$resp->status = 'OK';
            	$resp->msg = 'Los datos se han modificado correctamente';

	        echo json_encode($resp, true);
     	    } else {
                $resp = new Result();
                $resp->status = 'ERROR';
                $resp->msg = 'Error';

		echo json_encode($resp, true);
	    }
        } 
      ?>