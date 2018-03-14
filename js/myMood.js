function moodSlider(val) {
	var moodImage = document.getElementById("myMoodImage");
	var moodText = document.getElementById("myMoodText");
	var imageSrc = "img/" + val + ".png";
	
	moodImage.src = imageSrc;
	switch (val) {
		case "1":
			moodText.innerHTML = "SAD";
			break;
		case "2":
			moodText.innerHTML = "Fed-Up";
			break;
		case "3":
			moodText.innerHTML = "Mehhh...";
			break;
		case "4":
			moodText.innerHTML = "Happy";
			break;
		case "5":
			moodText.innerHTML = "AMAZING";
	}
}

function editMood (moodValue) {
	var sliderArea = document.getElementById("moodEditArea");
	var sliderText;
	
	sliderText = "<div class='slidecontainer'>";
	sliderText = sliderText + "<input type='range' min='1' max='5' value='" + moodValue +"' class='slider' id='moodRange' oninput='moodSlider(this.value)'>";
	sliderText = sliderText + "<p><p>";
	sliderText = sliderText + "<center><input type='button' class='button' id='updateMood' onclick='updateMyMood()' value='Update...' ></center></div>";

	sliderArea.innerHTML = sliderText;

	}

function buildMyMood(currentDate) {
	var mainScreen = document.getElementById("mainScreen");
//	var currentDate = new Date();var d = currentDate.getFullYear() + "-" + ('0' + currentDate.getMonth() + 1).slice(-2) + "-" + currentDate.getDate();
	d=currentDate;

	xmlhttp = new XMLHttpRequest();


	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			mainScreen.innerHTML = this.responseText;
		}
	};

	xmlhttp.open("POST","https://jpkavanagh.000webhostapp.com/php/setMyMood.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("d=" + d);
}	
	


function updateMyMood(d) {
	var slider = document.getElementById("moodRange");
	var newMyMood = slider.value;

	var slider = document.getElementById("moodRange");
	var newMyMood = slider.value;
	var dateStamp = document.getElementById("dateStamp").value;
	var myComments = document.getElementById("comments").value;
	var reasons = document.getElementsByClassName("reasonBox");
	
	pString = "dateStamp=" + dateStamp + "&moodRange=" + newMyMood + "&comments=" + myComments;
    for(var i = 0 ; i < reasons.length ; i++){
        var item = reasons.item(i);
		if (item.checked) {
			pString = pString + "&reasons[]=" + item.value;
		}
	}
	
	console.log("- " + pString + " -");
	xmlhttp = new XMLHttpRequest();

	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			goHome(d);
		}
	};

	console.log('------------ calling updateMood-php ----------------------');
	xmlhttp.open("POST","https://jpkavanagh.000webhostapp.com/php/updateMyMood.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(pString);
	
}	
	
function insertMyMood(d) {
	var slider = document.getElementById("moodRange");
	var newMyMood = slider.value;
	var dateStamp = document.getElementById("dateStamp").value;
	var myComments = document.getElementById("comments").value;
	var reasons = document.getElementsByClassName("reasonBox");
	
	pString = "dateStamp=" + dateStamp + "&moodRange=" + newMyMood + "&comments=" + myComments;
    for(var i = 0 ; i < reasons.length ; i++){
        var item = reasons.item(i);
		if (item.checked) {
			pString = pString + "&reasons[]=" + item.value;
		}
	}
	
	console.log("- " + pString + " -");
	xmlhttp = new XMLHttpRequest();

	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			goHome(d);
		}
	};
	
	console.log('------------ calling insertMood-php ----------------------');
	xmlhttp.open("POST","https://jpkavanagh.000webhostapp.com/php/insertMyMood.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(pString);
}	
	

