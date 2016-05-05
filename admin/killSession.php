<?php
/*********Kills the Session**********/
	session_start();
	
	session_unset();
	
	session_destroy(); 
	
	header("Location: ../index.html");
