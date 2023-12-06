<?php
session_start();

$response = array();

if (isset($_POST['captcha_code'])) {
    if ($_SESSION["captcha_code"] == $_POST['captcha_code']) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];

        $to = "lucasggomees@gmail.com";
        $subject = "Lab Equipment Ltd - New message";
        $htmlMessage = '<!DOCTYPE html>
                        <html>
                        <head></head>
                        <body>
                        <table border="1">
                            <tr><td>Name:</td><td>' . $name . '</td></tr>
                            <tr><td>Email:</td><td>' . $email . '</td></tr>
                            <tr><td>Message:</td><td>' . $message . '</td></tr>
                        </table>
                        </body>
                        </html>';
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: logistics@lel.co.tz' . "\r\n";
        $headers .= 'Reply-To: logistics@lel.co.tz' . "\r\n";
        $headers .= 'X-Mailer: PHP/' . phpversion();

        if (mail($to, $subject, $htmlMessage, $headers)) {
            $response['success'] = true;
            $response['message'] = "Your information has been submitted successfully!";
        } else {
            $response['success'] = false;
            $response['message'] = "Please check your details!";
        }
    } else {
        $response['success'] = false;
        $response['message'] = "Captcha failed!";
    }
} else {
    $response['success'] = false;
    $response['message'] = "Invalid request";
}

// Set the Content-Type header to indicate JSON
header('Content-Type: application/json');

// Output the JSON response
echo json_encode($response);
?>
