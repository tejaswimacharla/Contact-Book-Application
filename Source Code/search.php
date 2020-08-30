<?php
$con = new mysqli("localhost", "root", "root", "contacts") or die("Unable to connect");

if ($con->connect_error) {
    die("Connection Failed:" . $con->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["index1"])) {
    $search = $_POST["index1"];
    
    $search_query = "SELECT DISTINCT c.fname,c.lname,c.contact_id from contact c INNER JOIN address a ON c.Contact_id = a.contact_id  WHERE a.state LIKE '%$search%' OR a.address LIKE '%$search%' OR a.city LIKE '%$search%' OR cast(a.zip as char(10)) LIKE '%$search%' OR a.address_type LIKE '%$search%' UNION SELECT DISTINCT c.fname,c.lname,c.Contact_id from contact c INNER JOIN date d ON c.Contact_id = d.contact_id WHERE d.date_type LIKE '%$search%' OR cast(d.date as char(10)) LIKE '%$search%' UNION SELECT DISTINCT  c.fname,c.lname,c.contact_id  from contact c INNER JOIN phone p ON c.Contact_id = p.contact_id WHERE p.phone_type LIKE '%$search%' OR number LIKE '%$search%' UNION SELECT  c.fname,c.lname,c.contact_id  FROM contact c WHERE c.fname LIKE '%$search%' OR c.mname LIKE '%$search%' OR c.lname LIKE '%$search%';";
    
    
    $search_res = $con->query($search_query);
    
    while ($row = $search_res->fetch_assoc()) {
        $array[] = $row;
    }
    
    echo json_encode($array);
}


?>