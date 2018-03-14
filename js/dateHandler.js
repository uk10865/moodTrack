function dateYYYYMMDD(dateValue) {
	var strYear = String(dateValue.getFullYear());
	var strMonth = String(dateValue.getMonth() + 1);
	var strDay = String(dateValue.getDate());

	if (strMonth.length == 1) {
		strMonth = '0' + strMonth;
	}

	return strYear + "-" + strMonth + "-" + strDay; 
}

function strToDate(strDate){
	console.log('Converting string to date: ' + strDate);
	var strYear = strDate.substr(0 , 4);
	var strMonth = strDate.substr(5,2);
	var strDay = strDate.substr(8,2);
	var dateValue = new Date();
	
	dateValue.setFullYear(strYear);
	dateValue.setMonth(strMonth - 1);
	dateValue.setDate(strDay);
	
	return dateValue;
}

function dateAddDay(strDate, addValue) {
	var dateValue = strToDate(strDate)
	
	dateValue.setDate(dateValue.getDate() + addValue);

	return dateYYYYMMDD(dateValue);
}

function dateAddMonth(strDate, addValue) {
	var dateValue = strToDate(strDate)
	
	dateValue.setMonth(dateValue.getMonth() + addValue);

	return dateYYYYMMDD(dateValue);
}
