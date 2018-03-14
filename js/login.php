
<?php
include 'dbConVar.php';


//get the passed variable
$loginName = $_POST["userName"];
$loginPassword = $_POST["userPassword"];

echo "user name = " . $loginName . "<br>";
echo "password = " . $loginPassword . "<br>";

// Create connection
$con = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

mysqli_select_db($con,"id4081412_mymood");
$sql="SELECT * FROM usrProfile WHERE loginName = '" . $loginName . "' AND loginPassword = '" . $loginPassword . "'";
$result = mysqli_query($con,$sql);

if (mysqli_num_rows($result)==0) {
	echo '-1';
} else {
	while($row = mysqli_fetch_array($result)) {

		// Store Session Data
		$_SESSION['login_user']= $row['loginName'];

		
		include 'setMyHome.php';
	}
}

	mysqli_close($con);


?>
