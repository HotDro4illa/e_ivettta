  var socket = io();
  var log = console.log;


  
socket.on("catalog_upd", (material) => {
	var uploader = new SocketIOFileUpload(socket);
	uploader.listenOnInput(document.getElementById("siofu_input"));
	
	var inner_vid = "";
	var inner_img = "";


	for (var i = 0; i < material.length; i++) {
		if (material[i].slice(-1) == "4") {
		inner_vid += '<video src="/e_ivettta/' + material[i] + '" preload = "none" controls></video>';
		}
		if (material[i].slice(-1) == "g") {
		inner_img += '<img src="/e_ivettta/' + material[i] + '"></img>';
		};
	}
	
	document.querySelector("#videos").innerHTML = inner_vid;
	document.querySelector("#photos").innerHTML = inner_img;
	
});

socket.on("upload_perc", (perc) => {
	document.getElementById("percent").innerHTML = perc;
});