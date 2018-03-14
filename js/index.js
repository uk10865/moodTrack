/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 
*/



function checkUser() {
	userName = localStorage.getItem("userName");
	console.log("userName=" + userName);

	if (userName == null) {
		//load the page as normal
	} else {
		console.log('found a username system variable');
		goHome();
	}
}

function logoutUser() {
	var mainScreen = document.getElementById("mainScreen");

	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementsByTagName("html")[0].innerHTML = this.responseText;
		} else {
		}
	};

	xmlhttp.open("GET","https://jpkavanagh.000webhostapp.com/logout.php", true);
	xmlhttp.send();
	console.log("Cleared local storage.");
}


function goHome(showDate) {
	document.getElementById("loading").style.display = "block";
	console.log('going home');
 	buildMyHome(showDate);
	setTimeout(function() {document.getElementById("loading").style.display = "none"}, 2000);

}

function goMood(showDate) {
	console.log('building Mood screen..');	
	buildMyMood(showDate);
	
}

function goInspiration() {
	document.getElementById("loading").style.display = "block";
	console.log('building Inspiration screen..');

	buildInspire();
	setTimeout(function() {document.getElementById("loading").style.display = "none"}, 2000);
	
}
function goSurvey() {
	document.getElementById("loading").style.display = "block";
	console.log('building Survey screen..');
	buildMySurveyList();
	setTimeout(function() {document.getElementById("loading").style.display = "none"}, 2000);
	
}
function goPositive() {
	console.log('building Positive screen..');

	mainScreen.innerHTML = "<h1>positive</h1>";
	
}

function getNext (showDate) {
	console.log('getNext received show date as: ' + showDate);
	goHome(showDate);
}