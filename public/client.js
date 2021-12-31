var socket = io();
var log = console.log;

if (window.innerHeight < window.innerWidth) {
	parallax_img();
};


function parallax_img() {

    var elementX = 0,
        elementY = 0,
        elementW = 0,
        elementH = 0,
        mouseX = 0,
        mouseY = 0;

    $(document).mousemove(function paral(e) {


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

};

var accs_list = []
var arch_list_elem = ''
var material = []
var acc_name = ""
var desc_list = [];
var comms_list = [];

document.getElementById("arch_sel").innerHTML = '<option selected value="e_ivettta">Загрузка...</option>';

async function accs() {
	let response = await fetch('https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/accs.txt');
	let text = await response.text(); // прочитать тело ответа как текст
	accs_list = text.split("\n")
	for (var i = 0; i < accs_list.length; i++) {
		if (accs_list[i] == document.cookie.split("=")[1]) {
			arch_list_elem += '<option selected value="' + accs_list[i] + '">' + accs_list[i] + '</option>'
			var selected = true
			continue
		}
		if (accs_list[i] == "e_ivettta" && selected != true) {
			   arch_list_elem += '<option selected value="' + accs_list[i] + '">' + accs_list[i] + '</option>'
		}
		else {
			   arch_list_elem += '<option value="' + accs_list[i] + '">' + accs_list[i] + '</option>'
		};
	};
	document.getElementById("arch_sel").innerHTML = arch_list_elem;
};

accs();

async function scroll_top() {
		$('html, body').animate({
        scrollTop: $("#str_top").offset().top
    }, 100); // Скорость прокрутки

};


async function get_material(cookie_acc) {
	scroll_top();
	if (cookie_acc != null) {
		var acc_name = cookie_acc;
	}
	else {
		var acc_name = document.getElementById("arch_sel").value
	};
	let response = await fetch('https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + "/list.txt");
	let text = await response.text();
	var material = text.split("\n")
	make_arch(material.sort().reverse(), acc_name);
};

if (document.cookie.split("=")[1] != null) {
	get_material(document.cookie.split("=")[1]);
}
else {
	get_material();
};


function make_arch(material, acc_name) {
	var inner_vid = "";
    var inner_img = "";
    var inner_tik = "";
	desc_list = [];
	comms_list = [];
	

	var vids = 0;
	document.cookie = "lastseen=" + acc_name;
	
	document.getElementById("paral_photo").setAttribute("src", 'https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + '/profile_pic.jpg')

    for (var i = 0; i < material.length; i++) {
        if ((material[i].slice(-1) == "4") && (material[i].slice(-5) != "k.mp4")) {
			acc_name_ssil = "'" + acc_name + "'"
			filename_ssil = "'" + material[i] + "'"
			let year = material[i].split("_")[0].split("-")[0]
			let month = material[i].split("_")[0].split("-")[1]
			let day = material[i].split("_")[0].split("-")[2]
			let hour = material[i].split("_")[1].split("-")[0]
			let minute = material[i].split("_")[1].split("-")[1]
			let second = material[i].split("_")[1].split("-")[2]
			let time_str = "'" + day + "." + month + "." + year + " " + hour + ":" + minute + ":" + second + "'"
            inner_vid += '<div class="img_block" id="' + i + '"><img onclick="get_desc(' + acc_name_ssil + "," + filename_ssil + "," + time_str + ')" class="arrows" src="arrows.svg" width="35px" height="auto"><img class="arrows_sd" src="arrows.svg" width="35px" height="auto"><video src="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + "/" + material[i] + '" preload="none" poster="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + "/thumb_" + material[i] + '.jpg" controls></video><p class="img_date_str">' + day + "." + month + "." + year + " " + hour + ":" + minute + ":" + second + '</p></div>';
			vids = vids + 1;
        }
        if ((material[i].slice(-1) == "g") && (material[i].slice(0,1) != "t")) {
			vids = vids + 1;
			acc_name_ssil = "'" + acc_name + "'"
			filename_ssil = "'" + material[i] + "'"
			let year = material[i].split("_")[0].split("-")[0]
			let month = material[i].split("_")[0].split("-")[1]
			let day = material[i].split("_")[0].split("-")[2]
			let hour = material[i].split("_")[1].split("-")[0]
			let minute = material[i].split("_")[1].split("-")[1]
			let second = material[i].split("_")[1].split("-")[2]
			let time_str = "'" + day + "." + month + "." + year + " " + hour + ":" + minute + ":" + second + "'"
            inner_img += '<div class="img_block" id="' + i + '"><img onclick="get_desc(' + acc_name_ssil + "," + filename_ssil + "," + time_str + ')" class="arrows" src="arrows.svg" width="35px" height="auto"><img class="arrows_sd" src="arrows.svg" width="35px" height="auto"><img class="image" src="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + "/" + material[i] + '"></img><p class="img_date_str">' + day + "." + month + "." + year + " " + hour + ":" + minute + ":" + second + '</p></div>';
          

        };
        if (material[i].slice(-5) == "k.mp4") {
            inner_tik += '<video style="margin: 30px;" src="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + "/" + material[i] + '" preload="none" poster="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + "/thumb_" + material[i] + '.jpg" controls></video>';
			vids = vids + 1;

        };
		
        if (material[i].split(".")[1] == "txt" && material[i].split(".")[0] != "list") {
			desc_list.push(material[i]);

        };	

		if (material[i].split(".")[1] == "json") {
			comms_list.push(material[i]);

        };
		
    }
	
	    document.querySelector("#stats").innerHTML = "Сейчас архив насчитывает " + (vids) + " видео и фото!";
			
			document.getElementById("media_block").innerHTML = "";
			
			if (inner_vid != "") {
				document.getElementById("media_block").innerHTML += '<div class="p_block" id="video_cont"><p class="category"><span class="category" style="font-weight: 700; background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d); background-size: 400% auto;color: #000;background-clip: text;text-fill-color: transparent;-webkit-background-clip: text;-webkit-text-fill-color: transparent; animation: gradient_inst 10s linear infinite;">Instagram: </span>видео и истории</p></div><div class="container" id="video" style=""></div>';
				document.getElementById("video").innerHTML = inner_vid;
			};
			if (inner_img != "") {
				document.getElementById("media_block").innerHTML += '<div class="p_block" id="photo_cont"><p class="category" style="margin-top: 40px;"><span class="category" style="font-weight: 700; background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);  background-size: 400% auto;    color: #000;  background-clip: text;  text-fill-color: transparent;  -webkit-background-clip: text;  -webkit-text-fill-color: transparent; animation: gradient_inst 10s linear infinite;">Instagram: </span>Фотографии</p></div><div class="container" id="photo" style=""></div>';
				document.getElementById("photo").innerHTML = inner_img;
			};
			if (inner_tik != "") {
				document.getElementById("media_block").innerHTML += '<div class="p_block" id="tiktok_cont"><p class="category" style="margin-top: 40px;"><span class="category" style="margin-top: 40px; text-align:center; font-weight: 700; 	color: #fff;	font-family: sans-serif;	animation: tiktok_logo 0.6s ease infinite;">TikTok: </span>клипы</p></div><div class="container" id="tiktok" style=""></div>';
				document.getElementById("tiktok").innerHTML = inner_tik;
			};
			
			
			
};





function photo_scroll() {
	if (document.getElementById("photo_cont") == null) {
		return
	}
    $('html, body').animate({
        scrollTop: $("#photo_cont").offset().top
    }, 1000); // Скорость прокрутки
};

function video_scroll() {
		if (document.getElementById("video_cont") == null) {
		return
	}
    $('html, body').animate({
        scrollTop: $("#video_cont").offset().top
    }, 1000); // Скорость прокрутки
};

function tiktok_scroll() {
		if (document.getElementById("tiktok_cont") == null) {
		return
	}
    $('html, body').animate({
        scrollTop: $("#tiktok_cont").offset().top
    }, 1000); // Скорость прокрутки
};

async function get_desc(acc, file, time) {
	if (desc_list.includes(file.split(".")[0].split("_")[0] + "_" + file.split(".")[0].split("_")[1] + "_UTC.txt") == true) {
			let response = await fetch('https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc + "/" + file.split(".")[0].split("_")[0] + "_" + file.split(".")[0].split("_")[1] + "_UTC.txt");
			let text = await response.text();
			get_comms(acc, file, text, time);
	}
	else {
		get_comms(acc, file, "Описание отсутствует", time);
	}
};


async function get_comms(acc, file, text, time) {
		if (comms_list.includes(file.split(".")[0].split("_")[0] + "_" + file.split(".")[0].split("_")[1] + "_UTC_comments.json") == true) {
			let response = await fetch('https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc + "/" + file.split(".")[0].split("_")[0] + "_" + file.split(".")[0].split("_")[1] + "_UTC_comments.json");
			let comms = await response.json();
			show_border(acc, file, text, time, comms);
			
	}
	else {
		show_border(acc, file, text, time, "Комментарии отсутствуют");
	}
};


function show_border(acc, file, caption, time, comms) {
	var comment_str = "";
	if (comms != "Комментарии отсутствуют") {
			for (let i = 0; i < comms.length; i++) {
				comment_str += '<div class="comment"><span><span style="font-weight:bold; margin-right: 10px;">' + comms[i]["owner"]["username"] + '</span>' + comms[i]["text"] + '</span></div>'
				for (let j = 0; j < comms[i]["answers"].length; j++) {
					comment_str += '<div style="margin-left: 30px;" class="comment"><span><span style="font-weight:bold; margin-right: 10px;">' + comms[i]["answers"][j]["owner"]["username"] + '</span>' + comms[i]["answers"][j]["text"] + '</span></div>'
				};
			};
	}
	else {
		comment_str = '<div class="comment"><span>Комментарии отсутствуют</span></div>'
	}
	
	if ((file.slice(-1) == "4") && (file.slice(-5) != "k.mp4")) {
	document.body.innerHTML += '<div id="overlay" class="overlay"><img onclick="remove_ol()" style="opacity: 1;z-index: 10;width: 40px;margin: 20px;" class="arrows" src="cross.svg"></img><div id="overlay" style="display: flex;align-items: center;justify-content: center;" class="overlay"><video style="max-height: 80%;max-width: 50%;" src="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc + "/" + file + '" preload="none" poster="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc + "/thumb_" + file + '.jpg" controls></video><div style="display: flex;flex-direction: column;height: 13rem;max-width: 40%;justify-content: center;"><div class="desc_blk"><div style="margin-bottom: 10px;"><span style="font-weight: 100;"><span style="font-weight: bold;margin-right: 10px;">' + acc + '</span>' + time + '</span></div><span style="overflow: auto;">' + caption.split("\n").join("<br>") + '</span></div><div class="desc_blk"><div style="margin-bottom: 10px;"><span style="font-weight:bold;">Комментарии:</span></div><div style="overflow: auto;display: flex; flex-direction: column;">' + comment_str + '</div></div></div></div>'
	}
	else {
	document.body.innerHTML += '<div id="overlay" class="overlay"><img onclick="remove_ol()" style="opacity: 1;z-index: 10;width: 40px;margin: 20px;" class="arrows" src="cross.svg"></img><div id="overlay" style="display: flex;align-items: center;justify-content: center;" class="overlay"><img class="image" src="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc + '/' + file + '" style="max-height: 80%;max-width: 50%;"></img><div style="display: flex;flex-direction: column;height: 13rem;max-width: 40%;justify-content: center;"><div class="desc_blk"><div style="margin-bottom: 10px;"><span style="font-weight: 100;"><span style="font-weight: bold;margin-right: 10px;">' + acc + '</span>' + time + '</span></div><span style="overflow: auto;">' + caption.split("\n").join("<br>") + '</span></div><div class="desc_blk"><div style="margin-bottom: 10px;"><span style="font-weight:bold;">Комментарии:</span></div><div style="overflow: auto;display: flex; flex-direction: column;">' + comment_str + '</div></div></div></div>'
	};
};

function remove_ol() {
	document.getElementById("overlay").remove();
};

document.addEventListener('keydown', function(event) {
  if (event.code == 'Escape' && document.getElementById("overlay") != null) {
    document.getElementById("overlay").remove();
  }
});
