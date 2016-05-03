<?php
include("dbconn.php");
$Firstname = $_POST['register_firstname'];
$Lastname = $_POST['register_lastname'];
$Username=$_POST['username'];
$Register_email=$_POST['email'];
$Password1=$_POST['password'];

$PWEncrypt = shaw1($Password1);
$dbc= connect_to_db("takc");


$insertsql = "INSERT INTO users (FIRSTNAME, LASTNAME, USERNAME, EMAIL, PASSWORD, PRIV) VALUES ('$Firstname','$Lastname','$Username', '$Register_email','$PWEncrypt', 'unverified')";
$result = mysqli_query($dbc, $insertsql) or die("bad query".mysqli_error($dbc)); 
if (gettype($result)==="object") mysqli_free_result($result);
mysqli_close($dbc);