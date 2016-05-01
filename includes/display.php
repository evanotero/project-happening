<?php
include("dbconn.php");
$dbc= connect_to_db("takc");
if ($string == "" ) {
    //$query="select * from `events`";
    $query="select * from `events` where `name` NOT IN ($list) ";
} else {
    $string = "%".$string."%";
    $query = "(select * from `events` where `name` NOT IN ($list) AND `NAME` like '$string')  union
                            (select * from `events` where `GROUP` like '$string' AND `attraction_id` NOT IN ($list)) union
                            (select * from `events` where `LOCATION` like '$string' AND `attraction_id` NOT IN ($list)) union
                            (select * from `events` where `STARTDATE` like '$string' AND `attraction_id` NOT IN ($list))";
}
$result = mysqli_query($dbc, $query) or die("bad query".mysqli_error($dbc));          
$data = array();
while ($obj = mysqli_fetch_object($result)) {
    $data[] = $obj;
}
echo json_encode($data);
disconnect_from_db($dbc, $result); 