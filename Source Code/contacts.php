<?php
$con = new mysqli("localhost", "root", "root", "contacts") or die("Unable to connect");

if ($con->connect_error) {
    die("Connection Failed:" . $con->connect_error);
}

$contactlist = "select Fname, Lname, contact_id from contact;";

$contactresult = $con->query($contactlist);

while ($row = $contactresult->fetch_assoc()) {
    
    $array[] = $row;
}

echo json_encode($array);

?>