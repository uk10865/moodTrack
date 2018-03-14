<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
?>

<!DOCTYPE html>
 <head>
<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
  <title>TrackMyMood</title>
  <link rel="stylesheet" type="text/css" href="css/index.css">
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

	<script type="text/javascript">
	// Load google charts
	google.charts.load('current', {'packages':['corechart']});
	
	// Draw the chart and set the chart values
	function drawPieChart(arr, options) {

		if (typeof(arr) !== "undefined") {
			sessionStorage.setItem("pieData", JSON.stringify(arr));
			sessionStorage.setItem("pieOptions", JSON.stringify(options));
			} else {
			arr = JSON.parse(sessionStorage.getItem("pieData"));
			options = JSON.parse(sessionStorage.getItem("pieOptions"));
		}
			var data = google.visualization.arrayToDataTable(arr);

			var chart = new google.visualization.PieChart(document.getElementById('piechart'));
			chart.draw(data, options);
	}
	
	function drawAreaChart(arr, options) {
        var data = google.visualization.arrayToDataTable(arr);
		console.log('drawing the Area Chart');

        var chart = new google.visualization.AreaChart(document.getElementById('area_chart_div'));
        chart.draw(data, options);
     }  
    
	window.onresize = function(){
          var area_chart_div = document.getElementById("area_chart_div");
			if (area_chart_div) {
				console.log('building area chart...');
				buildAreaChartArray();
			}
          var pieChart = document.getElementById("piechart");
			if (pieChart) {
				console.log('building piechart...');
				buildPopSurveyArray();
			}
	}


		function showNav() {
			var x = document.getElementsByTagName("nav");
			if (x[0].className === "") {
				x[0].className = "responsive";
              event.stopPropagation();
			} else {
				x[0].className = "";
			}
			console.log("Classname is:" + x[0].className);
		}
</script>
 </head>


<body onload='goHome()'>
	<header>
		<nav class="" onclick="showNav()">
			<ul>
             <li onclick='showNav()' class='closeIcon'>X</li>
				<li onclick='goHome()'>Home</li>
				<li onclick='goInspiration()'>Inspire</li>
				<li onclick='goSurvey()'>Survey</li>		
				<li onclick='goPositive()' onclick="myFunction()">Positive</li>
				<li onclick="surveyList()">Manage Surveys</li>
				<li onclick=''>User Profile</li>
				<li onclick='javascript:logoutUser()' target='index.html'>Logout></li>
				<li style="font-size:12px;" class="icon" onclick="showNav()">&#9776;</li>
			</ul>
		</nav>
	</header>
	<article>
		<section id="mainScreen" class='mainScreen'>
		</section>
	</article>
	
	<script type="text/javascript" src="/web/js/survey.js"></script> 
	<script type="text/javascript" src="/js/goLogin.js"></script> 
	<script type="text/javascript" src="/js/goInspire.js"></script> 
	<script type="text/javascript" src="/js/myMood.js"></script> 
	<script type="text/javascript" src="/js/goHome.js"></script> 
	<script type="text/javascript" src="/js/dateHandler.js"></script> 
	<script type="text/javascript" src="/js/index.js"></script>
	<script type="text/javascript" src="/js/goSurvey.js"></script>
  
</body>

</html>