<?php
	// Start the session
	session_start();
	if(!isset($_SESSION['name']))
		header("Location: index.php");
?>

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
</head>

<body class="theme-shadows">

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
      <?php displayAdminPage() ?>
    </div>
  </div>
  <!-- Load js libs only when the page is loaded. -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
</body>
</html>
<?php


function displayAdminPage() {

	$name = $_SESSION['name'];
	$email = $_SESSION['email'];
	
	echo "Hello, ".$name."!";
	//echo "Your email is ".$email;
	/*
	$query = "select * from events where approved=0;";
	$result = search($query);
	
	if(mysqli_num_rows($result) == 0){
		//all events are approved
	
	}
	else{
		//select to approve
	}
	*/
	?>
	<div class='table'>
	
	</div>
	<br>
	<form action="killSession.php" method="get" class="form-bottom">
        <div class="form-group">   
          <button type="submit" name="Logout" class="btn">Log Out</button>
        </div>
    </form>
      
    <?php
      

}

	

?>