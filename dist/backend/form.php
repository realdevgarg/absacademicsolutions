<?php

// Variable setting 
$name = $_REQUEST['name'];
$phoneNumber = $_REQUEST['phoneNumber'];
$subject = $_REQUEST['subject'];

// Check input fields 
if(empty($name) || empty($phoneNumber) || empty($subject))
{
    echo "Please fill all the fields";
}

else {
    mail("devgarg3788@gmail.com", "ABS New Student","From : $name", "Contact Number $phoneNumber");
    echo "<script type='text/javascript'>alert('Your message send');
    window.history.log(-1);
    </script>";
}
?>
