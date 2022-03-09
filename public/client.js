var socket = io();
var log = console.log;


if (Cookies.get('lastseen') == null) {
	Cookies.set('lastseen', 'e_ivettta', {expires:9999})
};
if (Cookies.get('view') == null) {
	Cookies.set('view', 'feed', {expires:9999})
};
if (Cookies.get('effects') == null) {
	Cookies.set('effects', 'true', {expires:9999})
};

function turn_eff(state) {
	if (state == "on") {
		parallax_img();
		document.getElementById("style-change").href = "style.css";
	}
	else {
		$(document).off("mousemove", paral);
		$(".parallax").css("transform", "rotateX(" + 0 + "deg) rotateY(" + 0 + "deg)")
		document.getElementById("style-change").href = "style-no-effect.css";
	}
	
};

if (Cookies.get("effects") == "false") {
	turn_eff("off");

}
else {
	if (window.innerHeight < window.innerWidth) {
    parallax_img();
};
}

function paral(e) {
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
        if (mouseX > 3.00) {
            mouseX = 3.00;
        }
        if (mouseX < -3.00) {
            mouseX = -3.00;
        }
        if (mouseY > 1.50) {
            mouseY = 1.50;
        }
        if (mouseY < -1.50) {
            mouseY = -1.50;
        }
        $(".parallax").css("transform", "rotateX(" + mouseY * -10 + "deg) rotateY(" + mouseX * 10 + "deg)");
    }

function parallax_img() {
    var elementX = 0,
        elementY = 0,
        elementW = 0,
        elementH = 0,
        mouseX = 0,
        mouseY = 0;
    $(document).mousemove(paral);
};

async function accs() {
	let arch_list_elem = ''
    let response = await fetch('https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/accs.txt');
    let text = await response.text(); // прочитать тело ответа как текст
    let accs_list = text.split("\n")
    for (var i = 0; i < accs_list.length; i++) {
        if (accs_list[i] == Cookies.get("lastseen")) {
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
    document.getElementById("arch_sel").addEventListener("change", change_arch);
};
accs();

async function scroll_top() {
    $('html, body').animate({
        scrollTop: $("#str_top").offset().top
    }, 100); // Скорость прокрутки
};

function make_feed(material, acc_name) {
	let vids = 0;
	document.getElementById("paral_photo").setAttribute("src", 'https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + '/profile_pic.jpg')
	Cookies.set('lastseen', acc_name, {expires:9999})
	let inner_posts = "";
	let post_item = "";
	let slide_one = "";
	let comment_str;
	for (post of material["feed"].reverse()) {
		comment_str = "";
			post_item = "";
			for (mat of post["post"]) {
				vids += 1;
				if (mat.split(".")[1] == "jpg") {
					post_item += '<div class="slide_wrap"><img class="image" src="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + "/" + mat + '" loading="lazy"></img></div>';
				}
				if (mat.split(".")[1] == "mp4") {
					post_item += '<div class="slide_wrap"><video id="' + vids + '" src="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + "/" + mat + '" preload="none" poster="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + '/thumb_' + mat + '.jpg" controls></video></div>';
				}
			};
		if (post["description"] == '') {
			post["description"] = '<i style="font-weight: 100;color: hsl(0deg 0% 50%);">Описание отсутствует</i>'
		};

		if (post["post"][0].split("_").at(-1) == "tiktok.mp4") {
			post["time"] = "Видео_из_ТикТока"
		};
		if (post["post"].length > 1) {
			slide_one = "post_slide"
		}
		else {
			slide_one = "post_slide_one"
		};
		if (post["comments"] != "") {
			for (comm of post["comments"]) {
				comment_str += '<div style="margin: 0 10px 0 10px;" class="comment"><span><span style="font-weight:bold; margin-right: 10px;">' + comm["owner"]["username"] + '</span>' + comm["text"] + '</span></div>'
				for (answer of comm["answers"]) {
					comment_str += '<div style="margin-left: 30px;" class="comment"><span><span style="font-weight:bold; margin-right: 10px;">' + answer["owner"]["username"] + '</span>' + answer["text"] + '</span></div>'
				};
			};
			comment_str = '<p class="comms_title">Комментарии:</p><hr style="margin: 10px 0 10px 0" size="1px" color="#4d4d4d">' + comment_str
		}
		else {
			comment_str = '<i style="margin: 0 10px 0 10px;font-weight: 100;color: hsl(0deg 0% 50%);">Комментарии отсутствуют</i>'
		}
		inner_posts += '<div class="post_main"><div class="main_wrap"><div class="post_upper"><img class="post_logo" src="' + 'https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + '/profile_pic.jpg' + '"></img><div class="post_info"><p class="post_name">' + acc_name + '</p class="post_time"><p class="post_time">' + post["time"].split("_").join(" ") + '</p></div></div><div id="post_slide" class="' + slide_one + '">' + post_item + '</div><div class="post_bottom"><hr style="margin: 20px 0 20px 0" size="1px" color="#4d4d4d"><div class="post_desc"><span><span class="post_name_comms">' + acc_name + '</span>' + post["description"].split("\n").join("<br>") + '</span></div></div></div><div class="post_comms">' + comment_str + '</div></div>';	
	};
	document.querySelector("#stats").innerHTML = "Сейчас архив насчитывает " + (vids) + " видео и фото!";
	document.getElementById("media_block").innerHTML = "";
    document.getElementById("media_block").insertAdjacentHTML('beforeend', '<div class="p_block" id="video_cont"><p class="category"><span class="category anim_gradient">Instagram: </span>публикации</p></div><div class="container" id="video" style="flex-direction: column;"></div>');
    document.getElementById("video").insertAdjacentHTML('beforeend', inner_posts);

$(document).ready(function(){
  $('.post_slide').slick({	
  infinite: true,
  dots: true,
  variableWidth: true,
    slidesToShow: 1,
	centerMode: true,
  });
});

};

async function get_material(selected) {
    scroll_top();
	if (selected == "selected") {
		var acc_name = document.getElementById("arch_sel").value
	}
	else {
		var acc_name = Cookies.get("lastseen")
	}
    let response = await fetch('https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + '/' + Cookies.get("view") + '.json');
    window.material = await response.json();
	window.acc_name = acc_name;
	if (Cookies.get("view") == "feed") {
		make_feed(material, acc_name);
	};
	if (Cookies.get("view") == "gallery") {
		make_arch(material, acc_name);
	};
};


function make_arch(material, acc_name) {
    var inner_vid = "";
    var inner_img = "";
    var inner_tik = "";
    var vids = 0;
	Cookies.set('lastseen', acc_name, {expires:9999})
    document.getElementById("paral_photo").setAttribute("src", 'https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + '/profile_pic.jpg')
	material["gallery"]["videos"].reverse()
	material["gallery"]["photos"].reverse()
	material["gallery"]["tiktok"].reverse()
	
	for (vid of material["gallery"]["videos"]) {
            inner_vid += '<div class="img_block"><img class="arrows" id="' + vid["filename"] + '" src="arrows.png" width="35px" height="auto"><img class="arrows_sd" src="arrows.png" width="35px" height="auto"><video id="mat_' + vid["filename"] + '" src="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + "/" + vid["filename"] + '" preload="none" poster="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + "/thumb_" + vid["filename"] + '.jpg" controls></video><p class="img_date_str">' + vid["time"].split("_").join(" ") + '</p></div>';
            vids = vids + 1;
		};
    for (photo of material["gallery"]["photos"]) {
            inner_img += '<div class="img_block"><img class="arrows" id="' + photo["filename"] + '" src="arrows.png" width="35px" height="auto"><img class="arrows_sd" src="arrows.png" width="35px" height="auto"><img id="mat_' + photo["filename"] + '" class="image" src="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + "/thumb_" + photo["filename"] + '" loading="lazy"></img><p class="img_date_str">' + photo["time"].split("_").join(" ") + '</p></div>';
			vids = vids + 1;
		};
    for (tik of material["gallery"]["tiktok"]) {
			inner_tik += '<video style="margin: 30px;" src="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + "/" + tik["filename"] + '" preload="none" poster="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + "/thumb_" + tik["filename"] + '.jpg" controls></video>';
			vids = vids + 1;
		};

    document.querySelector("#stats").innerHTML = "Сейчас архив насчитывает " + (vids) + " видео и фото!";
    document.getElementById("media_block").innerHTML = "";
    if (inner_vid != "") {
        document.getElementById("media_block").insertAdjacentHTML('beforeend', '<div class="p_block" id="video_cont"><p class="category"><span class="category anim_gradient">Instagram: </span>видео и истории</p></div><div class="container" id="video" style=""></div>');
        document.getElementById("video").insertAdjacentHTML('beforeend', inner_vid);
    };
    if (inner_img != "") {
        document.getElementById("media_block").insertAdjacentHTML('beforeend', '<div class="p_block" id="photo_cont"><p class="category" style="margin-top: 40px;"><span class="category anim_gradient">Instagram: </span>Фотографии</p></div><div class="container" id="photo" style=""></div>');
        document.getElementById("photo").insertAdjacentHTML('beforeend', inner_img);
    };
    if (inner_tik != "") {
        document.getElementById("media_block").insertAdjacentHTML('beforeend', '<div class="p_block" id="tiktok_cont"><p class="category" style="margin-top: 40px;"><span class="category anim_gradient_tiktok">TikTok: </span>клипы</p></div><div class="container" id="tiktok" style=""></div>');
        document.getElementById("tiktok").insertAdjacentHTML('beforeend', inner_tik);
    };
	
	for (elem of document.getElementsByClassName("arrows")) {
	elem.addEventListener("click", get_desc);
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
async function get_desc(event) {
	let ident = "mat_" + event.path[0].id
	filename = document.getElementById(ident).id.split("mat_").join("")
	for (vid of material["gallery"]["videos"]) {
		if (vid["filename"] == filename) {
			desc = vid["description"]
			comms = vid["comments"]
			time = vid["time"].split("_").join(" ")
		}
	};
	for (photo of material["gallery"]["photos"]) {
		if (photo["filename"] == filename) {
			desc = photo["description"]
			comms = photo["comments"]
			time = photo["time"].split("_").join(" ")
		}
	};
	if (document.location.href.search('https') == "0") {
		window.navigator.clipboard.writeText(document.getElementById(id).src.split("thumb_").join(""))
	}
	show_border(filename, desc, time, comms);
};

function show_border(file, desc, time, comms) {
	if (desc == "") {
		desc = "Описание отсутствует";
	};
	if (comms == "") {
		comms = "Комментарии отсутствуют";
	};
    let comment_str = "";
    if (comms != "Комментарии отсутствуют" && comms.length > 0) {
        for (let i = comms.length - 1; i >= 0; i--) {
            comment_str += '<div class="comment"><span><span style="font-weight:bold; margin-right: 10px;">' + comms[i]["owner"]["username"] + '</span>' + comms[i]["text"] + '</span></div>'
            for (let j = comms[i]["answers"].length - 1; j >= 0; j--) {
                comment_str += '<div style="margin-left: 30px;" class="comment"><span><span style="font-weight:bold; margin-right: 10px;">' + comms[i]["answers"][j]["owner"]["username"] + '</span>' + comms[i]["answers"][j]["text"] + '</span></div>'
            };
        };
    } else {
        comment_str = '<div class="comment"><span>Комментарии отсутствуют</span></div>'
    }
    if ((file.slice(-1) == "4") && (file.slice(-5) != "k.mp4")) {
        document.body.insertAdjacentHTML('beforeend', '<div id="overlay" class="overlay"><img onclick="remove_ol()" style="" class="arrows cross" src="cross.svg"></img><div id="sm_overlay" class="sm_overlay"><video class="video_fs" src="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + "/" + file + '" preload="none" poster="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + "/thumb_" + file + '.jpg" controls></video><div id="sm_overlay" class="comm_blk"><div class="desc_blk"><div style="margin-bottom: 10px;"><span style="font-weight: 100;"><span style="font-weight: bold;margin-right: 10px;">' + acc_name + '</span>' + time + '</span></div><span style="overflow: auto;">' + desc.split("\n").join("<br>") + '</span></div><div class="desc_blk"><div style="margin-bottom: 10px;"><span style="font-weight:bold;">Комментарии:</span></div><div style="overflow: auto;display: flex; flex-direction: column;">' + comment_str + '</div></div></div></div>');
    } else {
        document.body.insertAdjacentHTML('beforeend', '<div id="overlay" class="overlay"><img onclick="remove_ol()" style="" class="arrows cross" src="cross.svg"></img><div id="sm_overlay" class="sm_overlay"><img class="image_fs" src="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/' + acc_name + '/' + file + '"></img><div id="sm_overlay" class="comm_blk"><div class="desc_blk"><div style="margin-bottom: 10px;"><span style="font-weight: 100;"><span style="font-weight: bold;margin-right: 10px;">' + acc_name + '</span>' + time + '</span></div><span style="overflow: auto;">' + desc.split("\n").join("<br>") + '</span></div><div class="desc_blk"><div style="margin-bottom: 10px;"><span style="font-weight:bold;">Комментарии:</span></div><div style="overflow: auto;display: flex; flex-direction: column;">' + comment_str + '</div></div></div></div>');
	};
	log(comment_str)
};

function remove_ol() {
    document.getElementById("overlay").remove();
};
document.addEventListener('keydown', function (event) {
    if (event.code == 'Escape' && document.getElementById("overlay") != null) {
        document.getElementById("overlay").remove();
    }
});
document.addEventListener('click', function (event) {
    event.stopPropagation();
    if (event.target.id == "sm_overlay") {
        remove_ol();
    };
});

function change_view() {
	if (Cookies.get("view") == "gallery") {
		Cookies.set('view', 'feed', {expires:9999})
	}
	else {
		Cookies.set('view', 'gallery', {expires:9999})
	}
	get_material();
};

function change_effect() {
	if (Cookies.get("effects") == "true") {
		turn_eff("off");
		Cookies.set('effects', 'false', {expires:9999})
	}
	
	else {
		turn_eff("on");
		Cookies.set('effects', 'true', {expires:9999})
	}
};

function modal_show_settings() {
	let checked;
	let gallery = "";
	let feed = "";
	if (Cookies.get("view") == "gallery") {
		gallery = "checked";
	}
	if (Cookies.get("view") == "feed") {
		feed = "checked";
	}
	param = '<div class="settings_block"><p class="param_cat">Вид архива</p><div class="param_blk"><p class="param_set"><input class="param_input" name="view" type="radio" onchange="change_view()" ' + feed + ' value="feed">Лента</p><p class="param_set"><input ' + gallery + ' onchange="change_view()" class="param_input" name="view" type="radio" value="gallery">Галерея</p></div></div>';
	document.body.insertAdjacentHTML('beforeend', '<div id="overlay" class="overlay"><div id="sm_overlay" class="sm_overlay"></div></div>')
	document.getElementById('sm_overlay').insertAdjacentHTML('beforeend', '<div class="modal_settings" id="modal_settings_inner"></div>')
	document.getElementById('modal_settings_inner').insertAdjacentHTML('beforeend', param)
	if (Cookies.get("effects") == "true") {
		checked = "checked";
	}
	else {
		checked = "";
	}
	param = '<br><div class="settings_block"><p class="param_cat">Эффекты</p><div class="param_blk"><p class="param_set"><input class="param_input" onchange="change_effect()" ' + checked + ' name="effects" type="checkbox" value="effects">Включить эффекты</p></div></div>';
	document.getElementById('modal_settings_inner').insertAdjacentHTML('beforeend', param)
};


function change_arch() {
	get_material('selected');
};


get_material();
