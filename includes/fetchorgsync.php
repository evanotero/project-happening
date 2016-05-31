<?php
include("dbconn.php");
date_default_timezone_set('America/New_York'); 
// Get RSS URL
$URL = "https://api.orgsync.com/api/v3/communities/510/events.rss?key=8mr8ZuXiuuuyQD9j2QRoyKSY_zw6K3Sw_52uGzgpZ-Q";
$pages = "100";
$upcoming = "true";
// Verify Application
$options = array(
    "http" => array(
        'method' => "GET",
        'header' => "Accept-language: en\r\n"."User-Agent: ProjectHappening/v1.0"."(http://whatshappening.io/; contact.happening.bc@gmail.com)"
    )
);
try {
    $context = stream_context_create($options);
    $rssinfo = file_get_contents($URL."&per_page=".$pages."&upcoming=".$upcoming, false, $context);
    $rssobject = new SimpleXMLElement($rssinfo);
} catch (Exception $e) {
   echo 'Caught exception: ',  $e->getMessage(), "\n";
}
$dbc = connect_to_db("ProjectHappening"); // Connect to DB
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

    // Convert to appropriate Time Zone and account
    // for DST.
    $allday = date_create('00:00');
    $allday = date_format($allday, 'H:i');

    date_default_timezone_set('America/New_York');
    $startdate = date_create($startdate);
    $enddate = date_create($enddate);
    if ($allday == date_format($startdate, 'H:i') && $allday == date_format($enddate, 'H:i')) {
        $startdate = date_format($startdate, 'c');
        $enddate = date_format($enddate, 'c');
    } else {
        date_timezone_set($startdate, timezone_open('America/New_York'));
        $startdate = date_format($startdate, 'c');
        date_timezone_set($enddate, timezone_open('America/New_York'));
        $enddate = date_format($enddate, 'c');
    }

    // Do NOT add events from Academic Calendar (BC event calendar contains this information)
    if (strcmp($group, "Academic") != 0) {
        // Query to see if event already exits in database
        $query = "select NAME from events where LINK = '$eventlink'";

        $result = perform_query( $dbc, $query);
        if (mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            // Event already exists with this link
            $query = "UPDATE events
                        SET NAME = '$name', ORGANIZER = '$group', LOCATION = '$location', 
                        DESCRIPTION = '$description', MEDIAURL = '$mediaurl', STARTDATE = '$startdate',
                        ENDDATE = '$enddate' WHERE LINK = '$eventlink';";
        } else {                  
            // Insert Event into DB
            $query = "INSERT INTO events (
                        NAME, ORGANIZER, LOCATION, DESCRIPTION, 
                        MEDIAURL, STARTDATE, ENDDATE, LINK, APPROVED, U_ID) 
                        VALUES ('$name','$group','$location','$description','$mediaurl',
                        '$startdate','$enddate', '$eventlink', 1, 1);";
        }    
        $result = perform_query( $dbc, $query);
    }
}
disconnect_from_db( $dbc, $result );
?>