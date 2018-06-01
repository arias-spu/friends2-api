function GetAllFriends(){
	var xhttp = new XMLHttpRequest(); 
	xhttp.onreadystatechange = function ReceivedCallback() { 
		if (this.readyState == 4 && this.status == 200) { 
			document.getElementById("output").innerHTML = CreateTable(JSON.parse(this.responseText)); 
		}
	}; 
	xhttp.open("GET", "http://leia.cs.spu.edu:3000/api/friends", true);
	xhttp.send(); 
}
function CreateTable(data){
	var retVal = '';
	retVal =
		'<div class="jumbotron"> \n' +
		'<h2> Friends List </h2> \n' +
		'<table class="table table-bordered table-hover"> \n' +
		'	<thead> \n' +
		'		<tr> \n' +
		'			<th scope="col">Birth Date</th> \n' +
		'			<th scope="col">First Name</th> \n' +
		'			<th scope="col">Last Name</th> \n' +
		'			<th scope="col">Gender</th> \n' +
		'			<th scope="col">Phone</th \n' +
		'		</tr> \n' +
		'	</thead> \n' +
		'	<tbody> \n';
	for (var record in data){
			retVal +=
			'<tr> \n' +
			'	<td>' + new Date(data[record]["birth_date"]).toDateString() + '</td> \n' +
			'	<td>' + data[record]["first_name"] + '</td> \n' +
			'	<td>' + data[record]["last_name"] + '</td> \n' +
			'	<td>' + (data[record]["gender"] == 'M' ? 'Male' : 'Female') + '</td> \n' +
			'	<td>' + data[record]["phone"] + '</td> \n' +
			'</tr> \n';

		}
		retVal +=
			'</tbody> \n' +
			'</table> \n' +
			'</div> \n ' ;
	return retVal;
}

