<?php
include("dbconn.php");
$string = isset($_GET['q']) ? $_GET['q'] : "";
$dbc= connect_to_db("takc");
if ($string == "" ) {
    //$query="select * from `events`";
    $query="select * from `events` where `name`";
} else {
    $string = "%".$string."%";
    $query = "(select * from `events` where `name` NOT IN ($list) AND `NAME` like '$string')  union
                            (select * from `events` where `GROUP` like '$string' AND `attraction_id`) union
                            (select * from `events` where `LOCATION` like '$string' AND `attraction_id`) union
                            (select * from `events` where `STARTDATE` like '$string' AND `attraction_id`)";
}
$result = perform_query( $dbc, $query );       
$data = array();
while ($obj = mysqli_fetch_object($result)) {
    $data[] = $obj;
}
echo json_encode($data);
disconnect_from_db($dbc, $result); 