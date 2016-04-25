<?php

function connect_to_db( $dbname ){
    $dbc = @mysqli_connect( "localhost", "username", "password", $dbname ) or
            die( "Connect failed: ". mysqli_connect_error() );
    return $dbc;
}

function disconnect_from_db( $dbc, $result ){
    if (gettype($result)==="object") mysqli_free_result($result);
    mysqli_close( $dbc );
}

function perform_query( $dbc, $query ){ 
    //echo "My query is >$query< <br />";
    $result = mysqli_query($dbc, $query) or 
            die( "bad query".mysqli_error( $dbc ) );
    return $result;
}

?>