  var socket = io();
  var log = console.log;


$(document).ready(function(){
  
  var elementX = 0, 
      elementY = 0,
      elementW = 0,
      elementH = 0,
      mouseX = 0,
      mouseY = 0;
  
$(document).mousemove(function(e){
  
   var position = $(".parallax").offset(),
   obj = $(".parallax");
   elementX = position.left;
   elementY = position.top;
  
   elementW = obj.width();
   elementH = obj.height();
  
   var halfW = elementW/2;
   var halfH = elementH/2;
   
   mouseX = (e.pageX - elementX - halfW)/halfW;
   mouseY = (e.pageY - elementY - halfH)/halfH;
   mouseX = Math.round(mouseX * 100)/200;
   mouseY = Math.round(mouseY * 100)/200;
  
   // console.log(elementX+" "+elementY+" "+halfW+" "+halfH);
  
   $(".parallax").css("transform", "rotateX("+mouseY*-10+"deg) rotateY("+mouseX*10+"deg)");
}); 
  
});


  
socket.on("catalog_upd", (material) => {

	
	var inner_vid = "";
	var inner_img = "";
	var inner_tik = "";


	for (var i = 0; i < material.length; i++) {
		if ((material[i].slice(-1) == "4") && (material[i].slice(-5) != "k.mp4")) {
		inner_vid += '<video src="https://e-ivettta-files.s3.eu-central-1.amazonaws.com/' + material[i] + '" preload = "none" controls></video>';
		}
		if (material[i].slice(-1) == "g") {
		inner_img += '<img class="image" src="https://e-ivettta-files.s3.eu-central-1.amazonaws.com/' + material[i] + '"></img>';
		};		
		if (material[i].slice(-5) == "k.mp4") {
		inner_tik += '<video src="https://e-ivettta-files.s3.eu-central-1.amazonaws.com/' + material[i] + '" preload = "none" controls></video>';
		};
	}
	
	document.querySelector("#videos").innerHTML = inner_vid;
	document.querySelector("#photos").innerHTML = inner_img;
	document.querySelector("#tiktok").innerHTML = inner_tik;
	
	
	document.querySelector("#stats").innerHTML = "Сейчас архив насчитывает " + material.length + " видео и фото!";
	
});




