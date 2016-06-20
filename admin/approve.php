<?php
	session_start();

	include "../includes/dbconn.php";

	$_SESSION['amountDeleted'] = 0;
	$del=0;
	
	$_SESSION['amountApproved'] = 0;
	$app=0;
	
	if(isset($_POST['approve']))
		$_SESSION['approve'] = $_POST['approve'];

	if(isset($_POST['approve']))
		$_SESSION['approve'] = $_POST['approve'];
	
	if(isset($_SESSION['delete']))
		$deleteArray = $_SESSION['delete'];
	
	if(isset($_SESSION['approve']))	
		$approveArray = $_SESSION['approve'];
	
	$dbc = connect_to_db('ProjectHappening');
	
	if(isset($_SESSION['approve'])){
    	foreach ($deleteArray as $id) {
    		//delete
    		$query = "DELETE from events where E_ID='".$id."';";
    		$result = perform_query( $dbc, $query );
            
            $del++;
        }
    }
    
    if(isset($_SESSION['delete'])){
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

	header("Location: admin.php");