<?php
$con = new mysqli("localhost", "root", "root", "contacts") or die("Unable to connect");
if ($con->connect_error) {
    die("Connection Failed:" . $con->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $contact_id = $_POST["index0"];
    
    //update name
    $changed_name = $_POST["index1"];
    $update_name  = "UPDATE contact SET Fname='$changed_name[0]',Mname='$changed_name[1]',Lname='$changed_name[2]' WHERE Contact_id='$contact_id';";
    $con->query($update_name);
    
    //update numbers
    $num_length  = $_POST["index5"];
    $changed_num = $_POST["index2"];
    $drop_number = "DELETE FROM phone WHERE contact_id='$contact_id';";
    $con->query($drop_number);
    
    for ($i = 0; $i < $num_length * 2; $i += 2) {
        $i1         = $i;
        $i2         = 1 + $i;
        // echo "$changed_num[$i1]";
        $update_num = "INSERT INTO phone(contact_id, phone_type, number) VALUES ('$contact_id','$changed_num[$i1]','$changed_num[$i2]');";
        $con->query($update_num);
    }
    
    //update address
    $addr_length  = $_POST["index6"];
    $changed_addr = $_POST["index3"];
    $drop_addr    = "DELETE from address where contact_id='$contact_id';";
    $con->query($drop_addr);
    
    for ($i = 0; $i < $addr_length * 5; $i += 5) {
        $i1          = $i;
        $i2          = 1 + $i;
        $i3          = 2 + $i;
        $i4          = 3 + $i;
        $i5          = 4 + $i;
        $update_addr = "INSERT INTO address (contact_id, address_type, address, City, State, Zip) VALUES ('$contact_id','$changed_addr[$i1]','$changed_addr[$i2]','$changed_addr[$i3]','$changed_addr[$i4]','$changed_addr[$i5]')";
        $con->query($update_addr);
    }
    
    //update date
    $dates_length  = $_POST["index7"];
    $changed_dates = $_POST["index4"];
    $drop_date     = "DELETE FROM date WHERE contact_id='$contact_id';";
    $con->query($drop_date);
    
    for ($i = 0; $i < $dates_length * 2; $i += 2) {
        $i1          = $i;
        $i2          = 1 + $i;
        $update_date = "INSERT INTO date (contact_id, date_type, date) VALUES ('$contact_id','$changed_dates[$i1]','$changed_dates[$i2]');";
        $con->query($update_date);
    }
    
    $con->close();
    echo "success";
}

?>