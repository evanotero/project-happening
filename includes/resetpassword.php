<?php
include("dbconn.php");
$msg = "";
$email = $_POST['lostemail'];
$dbc = connect_to_db("ProjectHappening");
// Verify Email is already registered
$query = "SELECT * FROM users WHERE EMAIL='$email';";
$result = perform_query($dbc, $query);
if (!mysqli_fetch_array($result, MYSQLI_ASSOC)) {
       $msg .= "nouser";
} else {
    $pwd = bin2hex(openssl_random_pseudo_bytes(8));
    $query = "UPDATE users SET PASSWORD=sha1('$pwd') WHERE EMAIL='$email';";
    $result = perform_query($dbc, $query);
    if ($result) {
        $to = $email;
        $subject = 'Password Reset - Happening';
        $message = "<p>Your password was requested to be reset for Happening.</p><p>Your new password is: '$pwd'.</p>   ";
        $headers = "From: happening.bc@gmail.com" . "\n" .
                "Reply-To:". $to . "\n" .
                "Return-Path: happening.bc@gmail.com" . "\n" .
                "X-Mailer: PHP/" . phpversion() .
                "MIME-Version: 1.0\n" .
                "Content-type: text/html; charset=iso-8859-1\n";
        $mail_status = mail($to, $subject, $message, $headers);
        if ($mail_status) {
            $msg .= "reset";
        } else {
            $msg .= "emailfail";
        }
    } else {
        $msg .= "resetfail";
    }
}
echo $msg;
disconnect_from_db($dbc, $result);
?>