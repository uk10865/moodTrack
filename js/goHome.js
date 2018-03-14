function buildMyHome(passDate) {
console.log('------ running buildMyHome -----------');

	var mainScreen = document.getElementById("mainScreen");
	
	console.log('the date passed was ' + passDate);
	var d = new Date();
	if (passDate === undefined) {
		console.log('No date passed to buildMyHome()');
		showDate = d;
	} else {
		showDate = strToDate(passDate);
	}
	if (showDate > d ) {
		showDate = d;
	}
	console.log('passing ' + showDate + ' to setMyHome');
	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			mainScreen.innerHTML = this.responseText;
			console.log('**********calling buildAreaChartArray ****************');
			buildAreaChartArray();

		} 
	}

	
	console.log('sending a request to setMyHome.php with date as: ' + showDate);
	xmlhttp.open("POST", "https://jpkavanagh.000webhostapp.com/php/setMyHome.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("showDate=" + dateYYYYMMDD(showDate));
}	


function buildAreaChartArray() {
	console.log('-------- starting buildAreaChartArray -----------------');
	//PHP call to build a JSON array of data from the database
	var xmlhttp = new XMLHttpRequest();
	var x = window.matchMedia("(max-width: 600px)");

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
//			console.log('building the JSON array....');

//			console.log(this.responseText);
			console.log(this.responseText);
			var myArr = JSON.parse(this.responseText);
			for (i=1;i<myArr.length;i++) {
					myArr[i][1] = parseInt(myArr[i][1]);
//					console.log(myArr[i][2]);
				}

				if (x.matches) {
					console.log("small window");
					// Optional add a title and set the width and height of the chart
					var options = {'width':'100%',
							'height':'75%',
							title: 'Mood Comparison',
							hAxis: {title: 'Days',  titleTextStyle: {color: '#333'}, direction: -1},
							vAxis: {minValue: 0},
							vAxis: {ticks: [1,2,3,4,5]}
							}
				} else {
					console.log("BIG window");
					var options = {'width':'100%',
							'height':'75%',
							title: 'Mood Comparison',
							hAxis: {title: 'Days',  titleTextStyle: {color: '#333'}, direction: -1},
							vAxis: {minValue: 0},
							vAxis: {ticks: [1,2,3,4,5]}
							}
				}
			if (myArr.length>1) {
				drawAreaChart(myArr, options);
			}
		}
	}
	console.log('- posting to setAreaChartSummary-php p');
	xmlhttp.open("POST","https://jpkavanagh.000webhostapp.com/php/setAreaChartSummary.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send();
}
