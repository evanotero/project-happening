<?php
include("dbconn.php");
$string = isset($_GET['q']) ? $_GET['q'] : "";
$dbc= connect_to_db("takc");
if ($string == "" ) {
    //$query="select * from `events`";
    $query="select * from `events` ORDER BY STARTDATE ASC";
} else {
    $string = "%".$string."%";
    $query = "(select * from `events` where `name` AND `NAME` like '$string')  union
                            (select * from `events` where `ORGANIZER` like '$string') union
                            (select * from `events` where `LOCATION` like '$string') union
                            (select * from `events` where `DESCRIPTION` like '$string') ORDER BY STARTDATE ASC";
}
$result = perform_query( $dbc, $query );       
$data = array();
while ($obj = mysqli_fetch_object($result)) {
    $data[] = $obj;
}
echo json_encode($data);
disconnect_from_db($dbc, $result); 