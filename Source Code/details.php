<?php
$con = new mysqli("localhost", "root", "root", "contacts") or die("Unable to connect");
if ($con->connect_error) {
    die("Connection Failed:" . $con->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["userid"])) {
    $user_id      = $_POST["userid"];
    $nameQuery    = "SELECT Fname,Mname,Lname FROM contact WHERE Contact_id='$user_id';";
    $addressQuery = "SELECT address_type, address, city, state, zip FROM address where Contact_id='$user_id';";
    $numberQuery  = "SELECT phone_type, number FROM phone where Contact_id='$user_id';";
    $dateQuery    = "SELECT date_type, date FROM date where Contact_id='$user_id';";
    
    $nameresult = $con->query($nameQuery);
    while ($row = $nameresult->fetch_assoc()) {
        $array1[] = $row;
    }
    
    $addressresult = $con->query($addressQuery);
    while ($row = $addressresult->fetch_assoc()) {
        # code...
        $array2[] = $row;
        
    }
    
    $numberresult = $con->query($numberQuery);
    while ($row = $numberresult->fetch_assoc()) {
        # code...
        $array3[] = $row;
    }
    
    $dateresult = $con->query($dateQuery);
    while ($row = $dateresult->fetch_assoc()) {
        # code...
        $array4[] = $row;
    }
    
    $mainarray = array(
        "nameres" => $array1,
        "addressres" => $array2,
        "numberres" => $array3,
        "dateres" => $array4
    );
    
    echo json_encode($mainarray);
}

?>