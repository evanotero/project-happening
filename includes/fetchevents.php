<?php
include("dbconn.php");
// Get RSS URL
$URL = $_POST['url'];
$pages = $_POST['per_page'];
$upcoming = $_POST['upcoming'];
// Verify Application
$options = array(
    "http" => array(
        'method' => "GET",
        'header' => "Accept-language: en\r\n"."User-Agent: CSCI2252/v1.0"."(http://cscilab.bc.edu/; contact.happening.bc@gmail.com)"
    )
);
try {
    $context = stream_context_create($options);
    $rssinfo = file_get_contents($URL."&per_page=".$pages."&upcoming=".$upcoming, false, $context);
    $rssobject = new SimpleXMLElement($rssinfo);
} catch (Exception $e) {
   echo 'Caught exception: ',  $e->getMessage(), "\n";
}
$dbc = connect_to_db("takc"); // Connect to DB
$items = $rssobject->channel->item; // One or the other will work
if (!$items) $items = $rssobject->item;
foreach ($items as $item) {
    $name = mysqli_real_escape_string($dbc ,$item->title);
    $group = mysqli_real_escape_string($dbc, $item->children("event", true)->organizer[0]);
    $location = mysqli_real_escape_string($dbc, $item->children("event", true)->location[0]);
    $description = mysqli_real_escape_string($dbc, $item->description);
    $startdate = mysqli_real_escape_string($dbc, $item->children("event", true)->startdate[0]);
    $enddate = mysqli_real_escape_string($dbc, $item->children("event", true)->enddate[0]);
    if (isset($item->children("media", true)->content)) {
        $atts = $item->children("media", true)->content->attributes();
        $mediaurl = mysqli_real_escape_string($dbc, $atts["url"]);
    } else {
        $mediaurl = NULL;
    }
    $eventlink = mysqli_real_escape_string($dbc, $item->link);
    // Query to see if event already exits in database
    $query = "select NAME from events where NAME = '$name'";

    $result = perform_query( $dbc, $query);
    if (mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        // Event already exists with this name
    } else {                  
        // Insert Event into DB

        $query = "INSERT INTO events (
                    NAME, ORGANIZER, LOCATION, DESCRIPTION, 
                    MEDIAURL, STARTDATE, ENDDATE, LINK, APPROVED, U_ID) 
                    VALUES ('$name','$group','$location','$description','$mediaurl',
                    '$startdate','$enddate', '$eventlink', 1, 1)";

        $result = perform_query( $dbc, $query); 
    }    
}
disconnect_from_db( $dbc, $result );
?>