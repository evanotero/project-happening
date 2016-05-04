<?php
include("dbconn.php");
$msg = "";

$EventName = $_POST['name'];
$GroupName = $_POST['group'];
$Location=$_POST['location'];
$Link=$_POST['link'];
$Media=$_POST['media'];
$Startdate = $_POST['datestart'];
$Enddate = $_POST['dateend'];
$Description = $_POST['description'];

$dbc= connect_to_db("takc");

// Check if link already exists & 
//if event w/ that name on that day
$query = "SELECT * FROM events WHERE LINK='$Link' OR EVENTNAME='$EventName' AND STARTDATE = '$Startdate';";
$result = perform_query($dbc, $query);

if (mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $msg .= "exists";
} else {
	//check user id and privledges, if admin approved = 1, if user approved = 0
    $query = "insert into events 
    	(NAME, ORGANIZER, LOCATION, DESCRIPTION, MEDIAURL, STARTDATE, ENDDATE, LINK, APPROVED, U_ID) values 
    	('$EventName', '$GroupName', '$Location', '$Description', '$Media', '$Startdate', '$Enddate', '$Link', 0, );";
    $result = perform_query( $dbc, $query);
    $msg .= "success";
}
echo $msg;
disconnect_from_db( $dbc, $result );
?>