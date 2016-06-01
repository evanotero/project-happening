<?php
include("dbconn.php");
$string = isset($_GET['q']) ? $_GET['q'] : "";
$startdate = isset($_GET['start']) ? $_GET['start'] : "";
$enddate = isset($_GET['end']) ? $_GET['end'] : "";

$dbc = connect_to_db("ProjectHappening");

$startdate = mysqli_real_escape_string($dbc, $startdate);
$enddate = mysqli_real_escape_string($dbc, $enddate);

if ($string == "") {
    $query = "SELECT * FROM `events` WHERE `STARTDATE` BETWEEN '$startdate' AND '$enddate' ORDER BY `STARTDATE` ASC;";
    $result = perform_query( $dbc, $query );
} else {
    // $string = "%".$string."%";
    // $query = "(select * from `events` where `NAME` like '$string' and STARTDATE >= '$startdate') union (select * from `events` where `ORGANIZER` like '$string' and STARTDATE >= '$startdate') union (select * from `events` where `LOCATION` like '$string' and STARTDATE >= '$startdate') union (select * from `events` where `DESCRIPTION` like '$string' and STARTDATE >= '$startdate') ORDER BY `STARTDATE` ASC;";
    // $string = mysql_real_escape_string($string);  AND `STARTDATE` >= '$startdate' ORDER BY `STARTDATE` ASC;  WITH QUERY EXPANSION
    $query = "SELECT * FROM `events` WHERE MATCH (`NAME`,`ORGANIZER`,`LOCATION`,`DESCRIPTION`) AGAINST ('$string' IN NATURAL LANGUAGE MODE) AND `STARTDATE` >= '$startdate' LIMIT 50;";
    $result = perform_query( $dbc, $query );
    if (mysqli_num_rows($result) == 0) {
        $query = "SELECT * FROM `events` WHERE MATCH (`NAME`,`ORGANIZER`,`LOCATION`,`DESCRIPTION`) AGAINST ('$string' IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION) AND `STARTDATE` >= '$startdate' LIMIT 50;";
        $result = perform_query( $dbc, $query );
    }
}

$data = array();
while ($obj = mysqli_fetch_object($result)) {
    $data[] = $obj;
}
echo json_encode($data);
disconnect_from_db($dbc, $result); 