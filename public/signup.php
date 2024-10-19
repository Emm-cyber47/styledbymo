<?php
session_start();
include_once "config.php";

$errors = [
    'name' => '',
    'email' => '',
    'passport' => '',
    'password' => '',
    'c_password' => ''
];
$name = $email = $password = $cpassword = '';
// $name='';
// $email = '';
// $password = "";

// $name = $email = $password = "";
if (isset($_POST['register'])) {
    $name = trim($_POST['fullname']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $cpassword = trim($_POST['c_password']);

    // NAME VALIDATION
    if (empty($name)) {
        $errors['name'] = "Name is required!";
    } else {
        if (!preg_match('/^[a-zA-Z\s]+$/', $name)) {
            $errors['name'] = "Enter a valid name!";
        }
    }

    // CHECK PASSPORT
    if (!isset($_FILES['passport'])) {
        $errors['passport'] = "You must upload your passport!";
    } elseif (!preg_match('!image!', $_FILES['passport']['type'])) {
        $errors['passport'] = "Passport file must be an image extension!";
    } elseif (isset($_FILES['passport'])) {
        $maxFileSize = 2 * 1024 *1024;
        if ($_FILES['passport']['size'] > $maxFileSize) {
            $errors['passport'] = "Exceed 5MB size limit. Upload less than 5MB file size!";
        }
    }

    // EMAIL VALIDATION
    if (empty($email)) {
        $errors['email'] = "Email is required!";
    } else {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = "Invalid email format!";
        }
    }

    // PASSWORD VALIDATION
    if (empty($password)) {
        $errors['password'] = "Password is required!";
    } else {
        if (strlen($password) < 8) {
            $errors['password'] = "Password must be at least 8 characters!";
        }
    }

    // CONFIRM PASSWORD VALIDATION
    if (empty($cpassword)) {
        $errors['c_password'] = "Confirm password is required!";
    } else {
        if ($password !== $cpassword) {
            $errors['c_password'] = "Confirm password and password must be the same!";
        }
    }

    if (!array_filter($errors)) {
        $psw = password_hash($password, PASSWORD_DEFAULT);

        $check = "SELECT email FROM users WHERE email='$email'";
        $verify = mysqli_query($conn, $check);
        $query = mysqli_num_rows($verify);
        
        if ($query > 0 ) {
            $_SESSION['error'] = "Email already exist!";
        } else {


            $filename = $_FILES['passport']['name'];
            // $fileExt = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
            $uniqName = uniqid('', true) . "." . $filename;
            $destination = "assets/passport/".$uniqName;
            $fileTmp = $_FILES['passport']['tmp_name'];
            if (move_uploaded_file($fileTmp, $destination)) {

                $sql = "INSERT INTO users (name, email, password, passport) VALUES ('$name', '$email', '$psw', '$uniqName')";
                $result = mysqli_query($conn, $sql);
                if ($result) {
                    $_SESSION['success'] = "Tada! Your registration is successful!";
                } else {
                    $_SESSION['error'] = "Yepa! Unable to submit your data!";
                }
            } else {
                $_SESSION['error'] = "Unable to upload your passport. Try again later!";
            }
        }
    }
 mysqli_close($conn);
 
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form</title>
    
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
         <style>
            form {
                max-width: 400px;
                margin: 20px auto;
                padding: 20px;
            }
            .brand {
                background-color: #ff5733 !important;
            }
            .brand-text {
                color: #ff5733 !important;
            }
         </style>
</head>
<body class="grey lighten-4">
    <section class="container grey-text">
        <h3 class="center brand-text">Fill this form</h3>
        <?php if (isset($_SESSION['success'])) { include_once "admin/components/success.php"; } ?>
        <?php if (isset($_SESSION['error'])) { include_once "admin/components/error.php"; } ?>
        <form action="" class="white" method="POST" enctype="multipart/form-data">
            <!-- FULL NAME INPUT -->
            <div class="input-field col-6">
                <label for="Name">Enter Your Name</label>
                <input type="text" name="fullname" value="<?php echo $name; ?>">
                <div class="red-text"><?php echo $errors['name']; ?></div>
            </div>

            <!-- EMAIL INPUT -->
            <div class="input-field col-6">
                <label for="email">Enter Your Email</label>
                <input type="text" name="email" value="<?php echo $email; ?>">
                <div class="red-text"><?php echo $errors['email']; ?></div>
            </div>

            <!-- PASSPORT INPUT -->
            <div class="file-field input-field">
                <div class="btn brand">
                    <span>Upload Passport</span>
                    <input type="file" name="passport">
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text">
                </div>
                <div class="red-text"><?php echo $errors['passport']; ?></div>
            </div>

            <!-- PASSWORD INPUT -->
            <div class="input-field col-6">
                <label for="password">Enter Your Password</label>
                <input type="text" name="password" value="<?php echo $password; ?>" >
                <div class="red-text"><?php echo $errors['password']; ?></div>
            </div>

            <!-- CONFIRM PASSWORD INPUT -->
            <div class="input-field col-6">
                <label for="c_password">Confirm Your Password</label>
                <input type="text" name="c_password" value="<?php echo $cpassword; ?>" >
                <div class="red-text"><?php echo $errors['c_password']; ?></div>
            </div>

            <!-- REGISTER BUTTON -->
            <div class="center">
                <input type="submit" name="register" class="btn z-depth-0 brand" value="SUBMIT">
            </div>
        </form>
        <div class="center">
            <p>Check out terms and conditions</p>
        </div>
    </section>
</body>
</html>
