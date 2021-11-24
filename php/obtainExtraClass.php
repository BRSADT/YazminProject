  <?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json, charset=utf-8');

    $json = file_get_contents('php://input');
    $params = $json;
    $extraHours = [];

    require('conexion.php');
    
    class Result {}  
    
    // echo "<pre>"; var_dump($params); echo "</pre>";

    $sqlHour = mysqli_query($con, "SELECT CONCAT(us.nombres, ' ', us.apellido_pat, ' ', us.apellido_mat) nombreDocente, h.id_hora_extra, l.nombre_lab, h.fecha, n.nombre, h.firma_coordinador FROM hora_extra AS h INNER JOIN usuario AS us ON us.id_usuario = h.id_usuario INNER JOIN personal AS p ON us.id_usuario = p.id_usuario INNER JOIN laboratorio AS l ON l.id_laboratorio = h.id_laboratorio INNER JOIN asignatura AS n ON n.id_asignatura = h.id_asignatura WHERE h.firma_coordinador = 0");
    while($row = mysqli_fetch_assoc($sqlHour)){
          array_push($extraHours, array_map('utf8_encode', $row));
      }
      
    if($sqlHour) {
        $resp = new Result();
        $resp->status = 'OK';
        $resp->data = $extraHours;
        
        echo json_encode($resp, true);
      } else {
        $resp = new Result();
        $resp->status = 'ERROR';
        $resp->msg = 'No se han encontrado horas extra clase para firmar';
            
        echo json_encode($resp, true);
      }
  ?>