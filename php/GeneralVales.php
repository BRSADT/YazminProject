<?php
   header('Access-Control-Allow-Origin: *');
   header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
   header('Content-Type: application/json, charset=utf-8');

   $json = file_get_contents('php://input');
   $params = $json;
   $debtsTeach = [];
   $debtsStudent = [];
   require('conexion.php');
   
   class Result {}  
   
   // echo "<pre>"; var_dump($params); echo "</pre>";

   if ($params == "0") {
      $sql = mysqli_query($con, "SELECT CONCAT(u.nombres, ' ', u.apellido_pat, ' ', u.apellido_mat) nombreDocente, v.id_vale AS id_vale, v.firma_docente, l.nombre_lab, a.carrera, v.fecha, v.hora_entrada, v.hora_salida, v.fecha_creacion FROM vale AS v INNER JOIN usuario AS u ON u.id_usuario = v.id_nomina INNER JOIN personal AS p ON p.id_usuario = v.id_nomina INNER JOIN usuario AS us ON us.id_usuario = v.id_usuario INNER JOIN laboratorio AS l ON l.id_laboratorio = v.id_laboratorio INNER JOIN especialidad AS a ON a.id_division = v.id_division WHERE p.id_nomina = $params");
      
      while($row = mysqli_fetch_assoc($sql)) {
         array_push($debtsTeach, array_map('utf8_encode', $row));
      }

      if($debtsTeach) {
         $resp = new Result();
         $resp->status = 'OK';
         $resp->data = $debtsTeach;
            
         echo json_encode($resp, true);
      } else {
         $resp = new Result();
         $resp->status = 'ERROR';
         $resp->msg = 'No se han encontrado Vales de docentes';
            
         echo json_encode($resp, true);
      }
   } else {
      $sql = mysqli_query($con, "SELECT CONCAT(u.nombres, ' ', u.apellido_pat, ' ', u.apellido_mat) nombreDocente, CONCAT(us.nombres, ' ', us.apellido_pat, ' ', us.apellido_mat) nombreEstudiante, CONCAT(e.grado, ' ', e.grupo) gradoGrupo,v.id_vale AS id_vale, l.nombre_lab, v.fecha, v.hora_entrada, v.hora_salida, v.plantel, v.firma_docente, esp.carrera, v.id_estado_vale FROM vale AS v 
      INNER JOIN usuario AS u ON u.id_usuario = v.id_nomina INNER JOIN personal AS p ON p.id_usuario = v.id_nomina 
      INNER JOIN usuario AS us ON us.id_usuario = v.id_usuario INNER JOIN estudiantes AS e ON us.id_usuario = e.id_usuario
      INNER JOIN laboratorio AS l ON l.id_laboratorio = v.id_laboratorio 
      INNER JOIN especialidad AS a ON a.id_division = v.id_division 
      INNER JOIN estado_vale AS ev ON v.id_estado_vale = ev.id_estado_vale 
      INNER JOIN especialidad AS esp ON esp.id_division = v.id_division 
      WHERE e.grado = "$params" AND e.grupo = "$params"");

      while($row = mysqli_fetch_assoc($sql)) {
         array_push($debtsStudent, array_map('utf8_encode', $row));
      }
      
      if ($debtsStudent) {
         $resp = new Result();
         $resp->status = 'OK';
         $resp->data = $debtsStudent;
         
         echo json_encode($resp, true);
      } else {
         $resp = new Result();
         $resp->status = 'ERROR';
         $resp->msg = 'No se han encontrado Vales de Estudiantes';
   
         echo json_encode($resp, true);
      }
   }
?>