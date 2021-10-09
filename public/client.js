var socket = io();
var log = console.log;


$(document).ready(function() {

    var elementX = 0,
        elementY = 0,
        elementW = 0,
        elementH = 0,
        mouseX = 0,
        mouseY = 0;

    $(document).mousemove(function(e) {

        var position = $(".parallax").offset(),
            obj = $(".parallax");
        elementX = position.left;
        elementY = position.top;

        elementW = obj.width();
        elementH = obj.height();

        var halfW = elementW / 2;
        var halfH = elementH / 2;

        mouseX = (e.pageX - elementX - halfW) / halfW;
        mouseY = (e.pageY - elementY - halfH) / halfH;
        mouseX = Math.round(mouseX * 100) / 200;
        mouseY = Math.round(mouseY * 100) / 200;
		
		if (mouseX > 3.00){
			mouseX = 3.00;
		}
				if (mouseX < -3.00){
			mouseX = -3.00;
		}
		if (mouseY > 1.50) {
			mouseY = 1.50;
		}
				if (mouseY < -1.50) {
			mouseY = -1.50;
		}

        // console.log(elementX+" "+elementY+" "+halfW+" "+halfH);

        $(".parallax").css("transform", "rotateX(" + mouseY * -10 + "deg) rotateY(" + mouseX * 10 + "deg)");
    });

});



socket.on("catalog_upd", (material) => {

    document.querySelector("#stats").innerHTML = "Сейчас архив насчитывает " + material.length + " видео и фото!";


    var inner_vid = "";
    var inner_img = "";
    var inner_tik = "";

    var videos = []
    var photos = []
    var tiktok = []

    for (var i = 0; i < material.length; i++) {
        if ((material[i].slice(-1) == "4") && (material[i].slice(-5) != "k.mp4")) {
            videos.push(material[i])
			
        }
        if (material[i].slice(-1) == "g") {
            photos.push(material[i])
        };
        if (material[i].slice(-5) == "k.mp4") {
            tiktok.push(material[i])
        };
    }
	
	            for (var i = 0; i < 10; i++) {
                if (videos.length > 0) {
                    inner_vid = '<video src="https://e-ivettta-files.s3.eu-central-1.amazonaws.com/' + videos[0] + '" controls></video>';
                    videos.splice(0, 1);
                    document.querySelector("#videos").innerHTML += inner_vid;
                } else {
                    if (photos.length > 0) {

                        inner_img = '<img class="image" src="https://e-ivettta-files.s3.eu-central-1.amazonaws.com/' + photos[0] + '"></img>';
                        photos.splice(0, 1);
                        document.querySelector("#photos").innerHTML += inner_img;
                    } else {
                        if (tiktok.length > 0) {

                            inner_tik = '<video src="https://e-ivettta-files.s3.eu-central-1.amazonaws.com/' + tiktok[0] + '" controls></video>';
                            tiktok.splice(0, 1);
                            document.querySelector("#tiktok").innerHTML += inner_tik;
                        }
                    }
                }


            }
	

    window.onscroll = function(ev) {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 200) {

            for (var i = 0; i < 1; i++) {
                if (videos.length > 0) {
                    inner_vid = '<video src="https://e-ivettta-files.s3.eu-central-1.amazonaws.com/' + videos[0] + '" controls></video>';
                    videos.splice(0, 1);
                    document.querySelector("#videos").innerHTML += inner_vid;
                } else {
                    if (photos.length > 0) {

                        inner_img = '<img class="image" src="https://e-ivettta-files.s3.eu-central-1.amazonaws.com/' + photos[0] + '"></img>';
                        photos.splice(0, 1);
                        document.querySelector("#photos").innerHTML += inner_img;
                    } else {
                        if (tiktok.length > 0) {

                            inner_tik = '<video src="https://e-ivettta-files.s3.eu-central-1.amazonaws.com/' + tiktok[0] + '" controls></video>';
                            tiktok.splice(0, 1);
                            document.querySelector("#tiktok").innerHTML += inner_tik;
                        }
                    }
                }


            }




        }
    };


});