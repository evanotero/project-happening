<?php
include("dbconn.php");
date_default_timezone_set('America/New_York'); 
// Get RSS URL
$URL = "http://events.bc.edu/calendar.xml";
// Verify Application
$options = array(
    "http" => array(
        'method' => "GET",
        'header' => "Accept-language: en\r\n"."User-Agent: ProjectHappening/v1.0"."(http://whatshappening.io/; contact.happening.bc@gmail.com)"
    )
);
try {
    $context = stream_context_create($options);
    $rssinfo = file_get_contents($URL, false, $context);
    $rssobject = new SimpleXMLElement($rssinfo);
} catch (Exception $e) {
   echo 'Caught exception: ',  $e->getMessage(), "\n";
}
$dbc = connect_to_db("ProjectHappening"); // Connect to DB
$items = $rssobject->channel->item; // One or the other will work
if (!$items) $items = $rssobject->item;
foreach ($items as $item) {
    // Scrape Title for Information
    $fulltitle = mysqli_real_escape_string($dbc ,$item->title);
    $title = substr(strchr($fulltitle,":"), 2);

    if (strrpos($title, " at ")) {
        $location = substr($title, strrpos($title, " at ") + 4);
        $name = substr($title, 0, strrpos($title, " at "));
    } else {
        $name = $title;
        $location = "";
    }
    
    $description = mysqli_real_escape_string($dbc, $item->description);
    $description = strip_tags($description, '<p><a>');
    $description = substr($description, 0, strpos($description, "http://events.bc.edu/event/") - 13);

    $categories = $item->category;
    $group = "";
    foreach ($categories as $category) {
        $group .= $category . ", ";
    }
    $group = substr($group, 0, strlen($group) - 2);

    $date = mysqli_real_escape_string($dbc, $item->children("dc", true)->date[0]);

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
    $date = date_create($date);
    if ($allday == date_format($date, 'H:i')) {
        $date = date_format($date, 'c');
    } else {
        date_timezone_set($date, timezone_open('America/New_York'));
        $date = date_format($date, 'c');
    }

    // Query to see if event already exits in database
    $query1 = "select NAME from events where NAME = '$name' AND STARTDATE = '$date'";
    $result1 = perform_query( $dbc, $query1);

    $query2 = "select NAME from events where LINK = '$eventlink' AND STARTDATE = '$date'";
    $result2 = perform_query( $dbc, $query2);

    if (mysqli_fetch_array($result1, MYSQLI_ASSOC)) {
        // Event already exists with this name and date
        $query = "UPDATE events
                    SET ORGANIZER = '$group', LOCATION = '$location', DESCRIPTION = '$description', 
                    MEDIAURL = '$mediaurl', LINK = '$eventlink', HIDDENINFO = '$fulltitle' 
                    WHERE NAME = '$name' AND STARTDATE = '$date';";
    } elseif (mysqli_fetch_array($result2, MYSQLI_ASSOC)) {
        // Event already exists with this link
        $query = "UPDATE events
                    SET NAME = '$name', ORGANIZER = '$group', LOCATION = '$location', 
                    DESCRIPTION = '$description', MEDIAURL = '$mediaurl', HIDDENINFO = '$fulltitle' 
                    WHERE LINK = '$eventlink' AND STARTDATE = '$date';";
    } else {                  
        // Insert Event into DB
        $query = "INSERT INTO events (
                    NAME, ORGANIZER, LOCATION, DESCRIPTION, 
                    MEDIAURL, STARTDATE, LINK, HIDDENINFO, APPROVED, U_ID) 
                    VALUES ('$name','$group','$location','$description','$mediaurl',
                    '$date', '$eventlink', '$fulltitle', 1, 2);";
    }    
    $result = perform_query( $dbc, $query); 
}
disconnect_from_db( $dbc, $result );
?>