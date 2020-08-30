<?php
$con = new mysqli("localhost", "root", "root", "contacts") or die("Unable to connect");
if ($con->connect_error) {
    die("Connection Failed:" . $con->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name  = $_POST["index1"];
    $fname = $name[0];
    $mname = $name[1];
    $lname = $name[2];
    
    $name_query = "call contacts_sp ('$fname','$mname','$lname',@out);";
    $contact_id = $con->query($name_query);
    
    $contact_id = $con->query("SELECT @out as contact_out");
    $row        = $contact_id->fetch_assoc();
    $contact_id = $row['contact_out'];
    
    
    //Insert numbers
    $num_length  = $_POST["index5"];
    $changed_num = $_POST["index2"];
    
    if (!empty($changed_num)) {
        for ($i = 0; $i < $num_length * 2; $i += 2) {
            $i1         = $i;
            $i2         = 1 + $i;
            $update_num = "INSERT INTO phone(contact_id, phone_type, number) VALUES ('$contact_id','$changed_num[$i1]','$changed_num[$i2]');";
            $con->query($update_num);
            $update_areacode = "UPDATE phone SET area_code = LEFT(number,3) WHERE contact_id='$contact_id';";
            $con->query($update_areacode);
        }
    }
    
    //Insert address
    $addr_length  = $_POST["index6"];
    $changed_addr = $_POST["index3"];
    
    if (!empty($changed_addr)) {
        for ($i = 0; $i < $addr_length * 5; $i += 5) {
            $i1          = $i;
            $i2          = 1 + $i;
            $i3          = 2 + $i;
            $i4          = 3 + $i;
            $i5          = 4 + $i;
            $update_addr = "INSERT INTO address (contact_id, address_type, address, City, State, Zip) VALUES ('$contact_id','$changed_addr[$i1]','$changed_addr[$i2]','$changed_addr[$i3]','$changed_addr[$i4]','$changed_addr[$i5]')";
            $con->query($update_addr);
        }
        
    }
    
    
    //Insert date
    $dates_length  = $_POST["index7"];
    $changed_dates = $_POST["index4"];
    
    if (!empty($changed_dates)) {
        for ($i = 0; $i < $dates_length * 2; $i += 2) {
            $i1          = $i;
            $i2          = 1 + $i;
            $update_date = "INSERT INTO date (contact_id, date_type, date) VALUES ('$contact_id','$changed_dates[$i1]','$changed_dates[$i2]');";
            $con->query($update_date);
        }
    }
}

echo "success";

?>