function goLogin(userName, userPassword) {
	var userFound;
	console.log('loging in the user ->' + userName + '<-');
	xmlhttp = new XMLHttpRequest();

	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
//			userFound = this.responseText;
			gotUser(userName);
		}
	};

	xmlhttp.open("POST","https://jpkavanagh.000webhostapp.com/login.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("userName=" + userName + "&userPassword=" + userPassword);
}

function gotUser(userFound) {

	if (userFound == -1) {
		document.getElementById("respMessage").innerHTML = 'Invalid username / password combination';
	} else {
		document.getElementById("loginForm").style.display ="none";
		document.getElementById("naviBar").style.display = "block";
	
		if(localStorage !== undefined)
		{

		  //add
		  localStorage.setItem("userName", userFound);
		  localStorage.setItem("displayDate", dateYYYYMMDD(new Date() ) );

		  console.log("Username = " + userFound);
		  console.log("displayDate = " + localStorage.getItem("displayDate"));
		}
		else
		{
		  console.log("No support");
		}
  	console.log('going home');
  	buildMyHome();
	}
}





function PhoneAppCheckUser() {
//	alert('getting user');
	username = document.getElementById("username").value;
//	alert('getting password');
	password = document.getElementById("password").value;
//	alert('getting screen area');
	loginScreen = document.getElementById("loginScreen");
	errMsg = document.getElementById("errMsg");
	
//	alert('creating http request ');
	xmlhttp = new XMLHttpRequest();


	
//	alert('creating status change listener ');
	xmlhttp.onreadystatechange = function() {
//		alert("something change: " + this.readyState + " : " + this.readyState);
		if (this.readyState == 4 && this.status == 200) {
			//check for a status change in the xmlhttp object (response from the PHP file)
			// if (this.responseText == 1 ) {
				if (this.responseText.substr(0,5) == "ERROR") {
					document.getElementById("errMsg").innerHTML = this.responseText;
				} else {
					loginScreen.innerHTML=this.responseText;
					document.body.background = '';
					goHome();
				}
		}
	}
	
//	alert('calling PHP');
	
	xmlhttp.open("POST","https://jpkavanagh.000webhostapp.com/PhoneAppLogin.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("username=" + username + "&password=" + password);

}
