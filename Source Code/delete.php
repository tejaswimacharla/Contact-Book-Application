<?php
$con = new mysqli("localhost", "root", "root", "contacts") or die("Unable to connect");

if ($con->connect_error) {
    die("Connection Failed:" . $con->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $contact_id     = $_POST["index"];
    $delete_address = "DELETE FROM address WHERE contact_id='$contact_id';";
    $con->query($delete_address);
    
    $delete_number = "DELETE FROM phone WHERE contact_id='$contact_id';";
    $con->query($delete_number);
    
    $delete_date = "DELETE FROM date WHERE contact_id='$contact_id';";
    $con->query($delete_date);
    
    $delete_contact = "DELETE FROM contact WHERE contact_id='$contact_id';";
    $con->query($delete_contact);
    
}

echo "success";

?>