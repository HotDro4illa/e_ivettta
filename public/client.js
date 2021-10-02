  var socket = io();
  var log = console.log;


  
socket.on("catalog_upd", (material) => {

	
	var inner_vid = "";
	var inner_img = "";


	for (var i = 0; i < material.length; i++) {
		if (material[i].slice(-1) == "4") {
		inner_vid += '<video src="https://e-ivettta-files.s3.eu-central-1.amazonaws.com/' + material[i] + '" preload = "none" controls></video>';
		}
		if (material[i].slice(-1) == "g") {
		inner_img += '<img src="https://e-ivettta-files.s3.eu-central-1.amazonaws.com/' + material[i] + '"></img>';
		};
	}
	
	document.querySelector("#videos").innerHTML = inner_vid;
	document.querySelector("#photos").innerHTML = inner_img;
	
	document.querySelector("#stats").innerHTML = "Сейчас архив насчитывает " + material.length + " видео и фото!";
	
});
