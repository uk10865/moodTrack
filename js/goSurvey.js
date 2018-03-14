function buildMySurveyList() {
	
	buildActiveSurveyList();



}

function buildPopSurveyArray() {
	//PHP call to build a JSON array of data from the database
	var xmlhttp = new XMLHttpRequest();
	var x = window.matchMedia("(max-width: 600px)");

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log('building the JSON array....');
			var myArr = JSON.parse(this.responseText);
			console.log(myArr.length);
			for (i=1;i<myArr.length;i++) {
					myArr[i][1] = parseInt(myArr[i][1]);
					console.log(myArr[i]);
				}

				if (x.matches) {
					console.log("small window");
					// Optional add a title and set the width and height of the chart
					var options = {'width':'100%',
							'height':'75%',
							backgroundColor: 'transparent',
							colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
							is3D: true,
							chartArea: {left: 'auto'},
							legend: {position: 'bottom',
								textStyle: {fontSize: 8}
								}
							}
				} else {
					console.log("BIG window");
					var options = {'width':'100%',
							'height':'75%',
							backgroundColor: 'transparent',
							colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
							is3D: true,
							chartArea: {left: 'auto'},
							legend: {position: 'bottom',
								textStyle: {fontSize: 8}
								}
							}
				}
			 drawPieChart(myArr, options);
		}
	}
	xmlhttp.open("POST","https://jpkavanagh.000webhostapp.com/php/setMyPopSurveys.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send();
}
	

function buildActiveSurveyList() {
	var mainScreen = document.getElementById("mainScreen");

	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			mainScreen.innerHTML = this.responseText;
			var pieChart = document.getElementById("piechart");
			console.log(pieChart);
			if (pieChart) {
				console.log('building a chart...');
				buildPopSurveyArray();
				
			} else {
				console.log('nowhere to build a chart....');
			}		
		}
	} 
	
 
	xmlhttp.open("POST","https://jpkavanagh.000webhostapp.com/php/getMySurveys.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send();
}




function getQuestions(surveyRefID, q) {
		
	var mainScreen = document.getElementById("mainScreen");

	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			mainScreen.innerHTML = this.responseText;
		} else {
		}
	};

	xmlhttp.open("POST","https://jpkavanagh.000webhostapp.com/php/replySurvey.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("q=" + q + "&surveyRefID=" + surveyRefID);
}


function storeAnswers (endSurvey) {
	var elements = document.getElementById("myAnswers").elements;
    var obj ={};
	var surveyRefID = elements.item(0).value;
	var surveyQuestionID = elements.item(1).value;
	var surveyStatus = 0;
	
	if (endSurvey) {
		surveyStatus = 1;
	}

	console.log( "surveyRefID=" + surveyRefID);
	console.log( "<br>surveyQuestionID=" + surveyQuestionID);
	console.log( "<br>surveyStatus=" + surveyStatus);
	
	xmlhttp = new XMLHttpRequest();
	
    for(var i = 2 ; i < elements.length ; i++){
        var item = elements.item(i);
		if (item.checked) {
			addAnswerReply(surveyRefID, surveyStatus, item.value, surveyQuestionID, endSurvey);
		}
		if (endSurvey) {
			buildMySurveyList();
		} else {
			getQuestions(surveyRefID, parseInt(surveyQuestionID)+ 1);
		}
	}
}

function addAnswerReply (surveyRefID, surveyStatus, answerValue, surveyQuestionID, endSurvey) {
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log('Inserted data');
				console.log(this.responseText);
			}
		}

		xmlhttp.open("POST","https://jpkavanagh.000webhostapp.com/php/replyNext.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("surveyRefID=" + surveyRefID + "&surveyStatus=" + surveyStatus + "&answerValue=" + answerValue + "&surveyQuestionID=" + surveyQuestionID + "&endSurvey=" + endSurvey);

}