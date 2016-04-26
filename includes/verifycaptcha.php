<?php
  $response = array();
  $errMsg = "";
  if(isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])) {
    // Secret Key
    $secret = '6LciMB4TAAAAAHC62dLUopifKuaJlF6XT1kLKPcZ';
    // Verify Response Data
    $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_POST['g-recaptcha-response']);
    $responseData = json_decode($verifyResponse);
    if($responseData->success) {
      // Do nothing...
    } else {
      $errMsg = 'Robot verification failed, please try again.';
    }
  } else {
    $errMsg = 'Please click on the reCAPTCHA box.';
  }

  if($errMsg) {
    $response['status'] = 'failure';
    $response['errormsg'] = $errMsg;
  } else {
    $response['status'] = 'success';
  }
  header('Content-type: application/json');
  echo json_encode($response);
?>