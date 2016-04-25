<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Admin Panel">
    <meta name="author" content="Evan Otero - Clinton Tak - Sinclair Jones">
    <title>Happening - Admin Panel</title>
    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="57x57" href="../img/icons/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="../img/icons/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="../img/icons/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="../img/icons/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="../img/icons/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="../img/icons/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="../img/icons/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="../img/icons/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="../img/icons/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="../img/icons/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="../img/icons/favicon-194x194.png" sizes="194x194">
    <link rel="icon" type="image/png" href="../img/icons/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="../img/icons/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="../img/icons/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="../img/icons/manifest.json">
    <link rel="mask-icon" href="../img/icons/safari-pinned-tab.svg" color="#571619">
    <link rel="shortcut icon" href="../img/icons/favicon.ico">
    <meta name="apple-mobile-web-app-title" content="Happening">
    <meta name="application-name" content="Happening">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="msapplication-TileImage" content="../img/icons/mstile-144x144.png">
    <meta name="msapplication-config" content="../img/icons/browserconfig.xml">
    <meta name="theme-color" content="#571619">
    <!-- Styles -->
    <link href="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="../css/main.css">
    <!-- Fonts -->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <!-- reCAPTCHA -->
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</head>

<body class="theme-shadows">
  <?php
  if(isset($_POST['submit']) && !empty($_POST['submit'])) {
    verifyReCaptcha();
  }
  ?>
  <div class="container col-sm-4 col-sm-offset-4 form-box">
    <div class="row form-top">
      <div class="form-top-left">
        <h3>Admin Panel Login</h3>
      </div>
      <div class="form-top-right">
        <i class="fa fa-lock"></i>
      </div>
    </div>
    <div class="row form-bottom">
      <?php displayForm() ?>
    </div>
  </div>
  <!-- Load js libs only when the page is loaded. -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
</body>
</html>
<?php
function displayForm() {
  $username = isset($_GET['username']) ? $_GET['username'] : "";
?>
<form action="" method="post" class="login-form">
        <div class="form-group">
          <label class="sr-only" for="form-username">Username</label>
            <input type="text" name="username" placeholder="Username..." class="form-username form-control" id="form-username" value="<?php echo$username ?>">
          </div>
          <div class="form-group">
            <label class="sr-only" for="form-password">Password</label>
            <input type="password" name="password" placeholder="Password..." class="form-password form-control" id="form-password">
          </div>
          <div class="g-recaptcha" data-sitekey="6LciMB4TAAAAACRFghDmLuY4esS0kG6W0va6M9B0"></div>
          <br>
          <button type="submit" name="submit" class="btn">Sign in</button>
      </form>
<?php
}

function verifyLogin() {
  // Write code...
}

function verifyReCaptcha() {
  if(isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])) {
    // Secret Key
    $secret = '6LciMB4TAAAAAHC62dLUopifKuaJlF6XT1kLKPcZ';
    // Verify Response Data
    $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_POST['g-recaptcha-response']);
    $responseData = json_decode($verifyResponse);
    if($responseData->success) {
      verifyLogin(); // Now verify login information
    } else {
      $errMsg = 'Robot verification failed, please try again.';
    }
  } else {
    $errMsg = 'Please click on the reCAPTCHA box.';
  }
  echo $errMsg;
}
?>