<?php

// Variable setting 
$nameEl = $_REQUEST['name'];
$phoneNumber = $_REQUEST['phoneNumber'];
$subject = $_REQUEST['subject'];

// Check input fields 
if(empty($nameEl) || empty($phoneNumber) || empty($subject))
{
    header('Location: '']);
}

else {
    mail("devgarg3788@gmail.com", "ABS New Student","From : $nameEl", "Contact Number $phoneNumber");
    echo "<script type='text/javascript'>alert('Your message send');
    window.history.log(-1);
    </script>";
}
?>
