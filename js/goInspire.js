function buildInspire() {
//	build the land screen for the INSPIRE section of the APP.  This consists of a text box to add a new URL and a list of the current articles
	var mainScreen = document.getElementById("mainScreen");
	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			mainScreen.innerHTML = this.responseText;
		} 
	}

	
	console.log('sending a request to build the intro INSPIRE screen.php');
	xmlhttp.open("POST", "https://jpkavanagh.000webhostapp.com/php/setInspire.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send();
	

}

function inspireGet() {
//	replace the search area of the INSPIRE screen with the scraped details of the URL provided by the user
console.log('------ running inspireGET -----------');

	var inspireSearch = document.getElementById("inspireGet");
	var srcURL = document.getElementById("srcURL").value;
	
	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			inspireSearch.innerHTML = this.responseText;
		} 
	}

	
	console.log('sending a request to PAGE SCRAPE.php');
	xmlhttp.open("POST", "https://jpkavanagh.000webhostapp.com/php/inspirePageScrape.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("srcURL=" + srcURL);
}	

function inspireSave() {
//	add the new insirational page to the list of articles and rebuild the INSPIRE section.
	var srcURL = document.getElementById("srcURL").value;
	var srcIMG = document.getElementById("srcIMG").value;
	var srcTITLE = document.getElementById("srcTITLE").value;
	var srcNAME = document.getElementById("srcNAME").value;
	var srcDESC = document.getElementById("srcDESC").value;
	var myComments = document.getElementById("myComments").value;



	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			buildInspire();
		} 
	}

	postStr = "srcURL=" + srcURL + "&srcIMG=" + srcIMG + "&srcTITLE=" + srcTITLE + "&srcNAME=" + srcNAME + "&srcDESC=" + srcDESC + "&myComments=" + myComments;
	console.log('sending a request to insert INSPIRE records');
	console.log(postStr);
	xmlhttp.open("POST", "https://jpkavanagh.000webhostapp.com/php/insertInspire.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(postStr);

}


function editInspire() {
	var inspireSearch = document.getElementById("inspireGet");
	var srcURL = document.getElementById("srcURL").value;
	var srcIMG = document.getElementById("srcIMG").value;
	var srcTITLE = document.getElementById("srcTITLE").value;
	var srcNAME = document.getElementById("srcNAME").value;
	var srcDESC = document.getElementById("srcDESC").value;
	var myComments = document.getElementById("myComments").value;
	
	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			inspireSearch.innerHTML = this.responseText;
		} 
	}

	postStr = "srcURL=" + srcURL + "&srcIMG=" + srcIMG + "&srcTITLE=" + srcTITLE + "&srcNAME=" + srcNAME + "&srcDESC=" + srcDESC + "&myComments=" + myComments;
	console.log('sending a request to build the intro INSPIRE screen.php');
	console.log(postStr);
	xmlhttp.open("POST", "https://jpkavanagh.000webhostapp.com/php/inspireEditPageScrape.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(postStr);

	
}