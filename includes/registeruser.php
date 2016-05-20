<?php
include("dbconn.php");
$msg = "";

$Firstname = $_POST['firstname'];
$Lastname = $_POST['lastname'];
$Username=$_POST['username'];
$Register_email=$_POST['email'];
$pwd=$_POST['password'];

$dbc= connect_to_db("ProjectHappening");

// Check if user already exists
$query = "SELECT * FROM users WHERE EMAIL='$Register_email' OR USERNAME='$Username';";
$result = perform_query($dbc, $query);

if (mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $msg .= "exists";
} else {
    $query = "INSERT INTO users (FIRSTNAME, LASTNAME, USERNAME, EMAIL, PASSWORD, PRIV) VALUES ('$Firstname','$Lastname','$Username', '$Register_email', sha1('$pwd'), 'unverified');";
    $result = perform_query( $dbc, $query);
    $msg .= "success";
}
echo $msg;
disconnect_from_db( $dbc, $result );
?>