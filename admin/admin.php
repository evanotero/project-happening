<?php
	// Start the session
	session_start();
	include "../includes/dbconn.php";
	if(!isset($_SESSION['name']))
		header("Location: index.php");
		
	if(!isset($_SESSION['amountDeleted']))
		$_SESSION['amountDeleted']=0;
	
	if(!isset($_SESSION['amountApproved']))
		$_SESSION['amountApproved']=0;
	
	if(isset($_POST['filter']))
		approve();
	
	if(isset($_POST['updateUsers']))
		updateUsers();
	
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
  <div class>
  	<?php displayTable() ?>
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
	
	
	?>
	
	<br>
	<form action="killSession.php" method="get" class="form-bottom">
        <div class="form-group">   
          <button type="submit" name="Logout" class="btn">Log Out</button>
        </div>
    </form>
    
    
      
    <?php
    
     
}

function displayTable() {

	$dbc = connect_to_db('takc');
	
	/******* DISPLAY UNVERIFIED EVENTS   *********/
		
	$query = "select * from events where approved=0;";
	$result = perform_query( $dbc, $query );
	
	if(!(mysqli_num_rows($result) == 0)){
		
			echo "
		 <section class='section' id='unapprovedEvents'>
			<div class='container' id='adminEventlist'>
				<form method='POST' action='admin.php'>
        	    <table id='eventsToApprove'>
            	    <thead>
                	    <tr>
                	    	<th>Approve</th>
                	    	<th>Delete</th>
                    	    <th>Name</th>
                        	<th>Organizer</th>
                   	 		<th>Location</th>
                        	<th>Description</th>
                        	<th>Media URL</th>
                        	<th>Startdate</th>
                        	<th>EndDate</th>
                        	<th>Link</th>
                    	</tr>
         	       </thead>
            	   <tbody>";
            	   	
            	   	
            	   		while($obj = $result->fetch_object()) {
            	   			//there's another unapproved event
            	   			$E_ID = $obj->E_ID;
            	   			$name = $obj->NAME;
            	   			$organizer = $obj->ORGANIZER;
            	   			$location = $obj->LOCATION;
            	   			$desc = $obj->DESCRIPTION;
            	   			$medurl = $obj->MEDIAURL;
            	   			$start = $obj->STARTDATE;
            	   			$end = $obj->ENDDATE;
            	   			$link = $obj->LINK;
            	   			
            	   			echo "<tr>";
            	   			//row
            	   				echo "<td><input type=checkbox name='approve[]' value='$E_ID'></td>";
            	   				echo "<td><input type=checkbox name='delete[]' value='$E_ID'></td>";
            	   				echo "<td>$name</td>";
            	   				echo "<td>$organizer</td>";
            	   				echo "<td>$location</td>";
            	   				echo "<td>$desc</td>";
            	   				echo "<td>$medurl</td>";
            	   				echo "<td>$start</td>";
            	   				echo "<td>$end</td>";
            	   				echo "<td>$link</td>";
            	   			
            	   			echo "</tr>";
            	   		}
            	   		
            	   	echo "
            	   </tbody>
           	 </table>
           	 	<input type='submit' name='filter' class='btn' value='FILTER!'>
           	 </form>";
           	 echo "<br> You deleted ".$_SESSION['amountDeleted']." events, and approved ".$_SESSION['amountApproved']." events<br>";
           	 echo "
       	 </div>
   	 </section>";
		
		
	
	}
	else{
		echo "All events are up to date!";
		//all events are approved
	
	}
	
	/********* DISPLAY USERS ***********/
	
	$query = "select * from users;";
	
	$result = perform_query( $dbc, $query );
	
	if(!(mysqli_num_rows($result) == 0)){
		
			echo "
		 <section class='section' id='usersAdminSection'>
			<div class='container' id='userslist'>
				<form method='POST' action='admin.php'>
        	    <table id='usersAvailable'>
            	    <thead>
                	    <tr>
                	    	<th>Delete</th>
                	    	<th>First Name</th>
                    	    <th>Last Name</th>
                        	<th>Username</th>
                   	 		<th>Email</th>
                        	<th>Privacy</th>
                    	</tr>
         	       </thead>
            	   <tbody>";
            	   	
            	   	
            	   		while($obj = $result->fetch_object()) {
            	   			//there's another unapproved event
            	   			$U_ID = $obj->U_ID;
            	   			$fname = $obj->FIRSTNAME;
            	   			$lname = $obj->LASTNAME;
            	   			$username = $obj->USERNAME;
            	   			$email = $obj->EMAIL;
            	   			$priv = $obj->PRIV;
            	   			
            	   			echo "<tr>";
            	   			//row
            	   				echo "<td><input type=checkbox name='deleteUser[]' value='$U_ID'></td>";
            	   				echo "<td>$fname</td>";
            	   				echo "<td>$lname</td>";
            	   				echo "<td>$username</td>";
            	   				echo "<td>$email</td>";
            	   				echo "<td>
            	   						<select name='updatePriv[]'>
            	   							<option value='$U_ID=>admin' "; if($priv=='admin') echo "selected"; echo ">Admin</option>
            	   							<option value='$U_ID=>user' "; if($priv=='user') echo "selected"; echo ">User</option>
            	   							<option value='$U_ID=>unverified' "; if($priv=='unverified') echo "selected"; echo ">Unverified</option>
            	   						</select>
            	   					  </td>";
            	   				
            	   			echo "</tr>";
            	   		}
            	   		
            	   	echo "
            	   </tbody>
           	 </table>
           	 	<input type='submit' name='updateUsers' class='btn' value='UPDATE USERS!'>
           	 </form>";
           	 
           	 echo "
       	 </div>
   	 </section>";
		
		
	
	}
	else{
		echo "No users found!";
		//all events are approved
	
	}
	
	
	
	 disconnect_from_db( $dbc, $result );
	
}


function approve() {

		$_SESSION['amountDeleted'] = 0;
		$del=0;
		
		$_SESSION['amountApproved'] = 0;
		$app=0;
		
		if(isset($_POST['approve']))
			$_SESSION['approve'] = $_POST['approve'];
	
		if(isset($_POST['delete']))
			$_SESSION['delete'] = $_POST['delete'];
		
		if(isset($_SESSION['delete']))
			$deleteArray = $_SESSION['delete'];
		
		if(isset($_SESSION['approve']))	
			$approveArray = $_SESSION['approve'];
		
		$dbc = connect_to_db('takc');
		
		if(isset($_SESSION['delete'])){
		foreach ($deleteArray as $id) {
			//delete
			$query = "DELETE from events where E_ID='".$id."';";
			$result = perform_query( $dbc, $query );
            
            $del++;
        }
        }
        
        if(isset($_SESSION['approve'])){
        foreach ($approveArray as $id) {
             //update
            $query = "UPDATE events SET APPROVED=1 where E_ID='".$id."';";
			$result = perform_query( $dbc, $query );
             
            $app++;
        }
        }
        
        $_SESSION['amountDeleted'] = $del;
        $_SESSION['amountApproved'] = $app;
		
		disconnect_from_db( $dbc, $result );
	

}

function updateUsers(){

		
		//setting sessions
		if(isset($_POST['deleteUser']))
			$_SESSION['deleteUser'] = $_POST['deleteUser'];
	
		if(isset($_POST['updatePriv']))
			$_SESSION['updatePriv'] = $_POST['updatePriv'];
		
		//setting arrays
		if(isset($_SESSION['deleteUser']))
			$deleteArray = $_SESSION['deleteUser'];
		
		if(isset($_SESSION['updatePriv']))	
			$updateArray = $_SESSION['updatePriv'];
		
		$dbc = connect_to_db('takc');
		
		if(isset($_SESSION['deleteUser'])){
		foreach ($deleteArray as $id) {
			//delete
			$query = "DELETE from users where U_ID='".$id."';";
			$result = perform_query( $dbc, $query );
            

        }
        }
        
        if(isset($_SESSION['updatePriv'])){
        foreach ($updateArray as $arr) {
             //update
            $a = explode('=>', $arr);
            $query = "UPDATE users SET PRIV='".$a[1]."' where U_ID='".$a[0]."';";
           
			$result = perform_query( $dbc, $query );
             

        }
        }
        
		disconnect_from_db( $dbc, $result );


}

	

?>