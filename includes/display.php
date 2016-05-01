<?php
$string = isset($_GET['q']) ? $_GET['q'] : "";
$list = "0";
if (isset($_COOKIE['bobc'])) {
    $hidden_attractions = unserialize($_COOKIE['bobc']);
    $list = "'". implode("', '", $hidden_attractions) ."'";
}
//====================insert username/password later========//
$dbc= @mysqli_connect("localhost", "username", "password", "csci2254") or die("Connect failed: ". mysqli_connect_error());
if ($string == "" ) {
    //$query="select * from `events`";
    $query="select * from `events` where `name` NOT IN ($list) ";
} else {
    $string = "%".$string."%";
    $query = "(select * from `events` where `name` NOT IN ($list) AND `NAME` like '$string')  union
                            (select * from `events` where `GROUP` like '$string' AND `attraction_id` NOT IN ($list)) union
                            (select * from `events` where `LOCATION` like '$string' AND `attraction_id` NOT IN ($list)) union
                            (select * from `events` where `STARTDATE` like '$string' AND `attraction_id` NOT IN ($list))";
}
$result = mysqli_query($dbc, $query) or die("bad query".mysqli_error($dbc));          
$data = array();
while ($obj = mysqli_fetch_object($result)) {
    $data[] = $obj;
}
echo json_encode($data);
if (gettype($result)==="object")
    mysqli_free_result($result);
mysqli_close($dbc);