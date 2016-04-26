<?php
	
	session_start();

	
		$username;
		$password;
		$encPass;
		$hasError = 0;
		$_SESSION['hasError'] = 0;
		
		$hasUserError = 0;
		$usernameError = "You must provide a valid username.";
		
		$hasPassError = 0;
		$passError = "You must provide a valid password.";
		
		
		if(isset($_POST['username'])) {    //validate username
			$username = $_POST['username'];
			if(strlen($username)==0){       //no username
				$hasUserError = 1;
				$hasError = 1;
			}
		}
		else {
			$hasUserError = 1;
			$hasError = 1;		
		}
		
		
		
		if(isset($_POST['password'])){     //validate password
			$password = $_POST['password'];
			if (strlen($password) == 0){    //password not enterred
				$hasPassError = 1;
				$hasError = 1;
			}
			else {
				$encPass = sha1($password);
			}
		}
		else {
			$hasPassError = 1;
			$hasError = 1;
		}
		
		if ($hasError == 1) {    //form has some sort of error
			$_SESSION['hasError'] = 1;
			if($hasUserError == 1 && $hasPassError == 1){   //has not provided either user or pass
			 	$_SESSION['error'] = "You must provide a valid username and password.";
			}
			else if ($hasUserError == 1){   //user error
				$_SESSION['error']=$usernameError;
			}
			else{                           //pass error
				$_SESSION['error'] = $passError;
			}
			header("Location: index.php");
		}
		else {                  //no error. Check the server if user is admin
			
			
			/*
			
				Connect to server.
				Check if user is an admin
				display admin page.
			
			*/
			$_SESSION['name'] = "Administrator";
			
			header("Location: admin.php");
		
		}
		
		


	
	
	
	