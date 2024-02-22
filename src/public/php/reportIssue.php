<?php
session_start();

$response = array();

// Assuming you have basic form validation here
if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message']) && isset($_POST['equipment']) && isset($_POST['serialNo'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phoneNo = isset($_POST['phone']) ? $_POST['phone'] : 'Not provided';
    $equipment = $_POST['equipment'];
    $serialNo = $_POST['serialNo'];
    $purchaseDate = isset($_POST['purchaseDate']) ? $_POST['purchaseDate'] : 'Not provided';
    $message = $_POST['message'];


    $to = "info@lel.co.tz";
    $subject = "Lab Equip Ltd - New Issue Reported";
    $htmlMessage = '<!DOCTYPE html>
                    <html>
                    <head></head>
                    <body>
                    <table border="1">
                        <tr><td>Name:</td><td>' . $name . '</td></tr>
                        <tr><td>Email:</td><td>' . $email . '</td></tr>
                        <tr><td>Phone:</td><td>' . $phoneNo . '</td></tr>
                        <tr><td>Equipment:</td><td>' . $equipment . '</td></tr>
                        <tr><td>Serial No.:</td><td>' . $serialNo . '</td></tr>
                        <tr><td>Purchase Date:</td><td>' . $purchaseDate . '</td></tr>
                        <tr><td>Message:</td><td>' . $message . '</td></tr>
                    </table>
                    </body>
                    </html>';
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: logistics@lel.co.tz' . "\r\n";
    $headers .= 'Reply-To: ' . $email . "\r\n"; // Reply to the sender's email
    $headers .= 'X-Mailer: PHP/' . phpversion();

    if (mail($to, $subject, $htmlMessage, $headers)) {
        $response['success'] = true;
        $response['message'] = "Your information has been submitted successfully!";
    } else {
        $response['success'] = false;
        $response['message'] = "Failed to submit your information. Please try again!";
    }
} else {
    $response['success'] = false;
    $response['message'] = "Invalid request. Please fill out all required fields!";
}

// Set the Content-Type header to indicate JSON
header('Content-Type: application/json');

// Output the JSON response
echo json_encode($response);
?>
