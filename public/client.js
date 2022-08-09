var socket = io();
var log = console.log;

if (!Cookies.get("lastseen")) {
  Cookies.set("lastseen", "e_ivettta", { expires: 9999 });
}
if (!Cookies.get("view")) {
  Cookies.set("view", "feed", { expires: 9999 });
}
if (!Cookies.get("effects")) {
  Cookies.set("effects", "true", { expires: 9999 });
}

function turn_eff(state) {
  if (state == "on") {
    parallax_img();
    document.getElementById("style-change").href = "";
  } else {
    $(document).off("mousemove", paral);
    $(".parallax").css(
      "transform",
      "rotateX(" + 0 + "deg) rotateY(" + 0 + "deg)"
    );
    document.getElementById("style-change").href = "style-no-effect.css";
  }
}

if (Cookies.get("effects") == "false") {
  turn_eff("off");
  snowStorm.freeze();
} else {
  if (window.innerHeight < window.innerWidth) {
    parallax_img();
  }
  snowStorm.start();
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
  if (mouseX > 3.0) {
    mouseX = 3.0;
  }
  if (mouseX < -3.0) {
    mouseX = -3.0;
  }
  if (mouseY > 1.5) {
    mouseY = 1.5;
  }
  if (mouseY < -1.5) {
    mouseY = -1.5;
  }
  $(".parallax").css(
    "transform",
    "rotateX(" + mouseY * -10 + "deg) rotateY(" + mouseX * 10 + "deg)"
  );
}

function parallax_img() {
  var elementX = 0,
    elementY = 0,
    elementW = 0,
    elementH = 0,
    mouseX = 0,
    mouseY = 0;
  $(document).mousemove(paral);
}

function fadein() {
  document.querySelector("#media_block").classList.toggle("del_fade");
}

async function scroll_top() {
  await $("html, body").animate(
    {
      scrollTop: $("#str_top").offset().top,
    },
    1000
  ); // Скорость прокрутки
}

function make_feed(acc_name) {
  let ind = 0;
  let vids = 0;
  document
    .getElementById("paral_photo")
    .setAttribute(
      "src",
      `https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/${acc_name}/profile_pic.jpg`
    );
  Cookies.set("lastseen", acc_name, { expires: 9999 });
  let inner_posts = "";
  let post_item = "";
  let slide_one = "";
  let comment_str;
  for (material of all_mat["accs"]) {
    if (material[acc_name]) {
      dir_mat = material[acc_name];
    }
  }
  all_post = dir_mat["feed"].slice();
  for (post of all_post.reverse()) {
    comment_str = "";
    post_item = "";
    for (file of post["files"]) {
      vids += 1;
      if (file["file_type"] == "image") {
        post_item += `<div class="slide_wrap"><img class="image feed ${
          post["files"].length > 1 ? "slick_material" : ""
        }" src="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/${acc_name}/${
          file["file"]
        }" loading="lazy"></img></div>`;
      }
      if (file["file_type"] == "video") {
        post_item += `<div class="slide_wrap"><video id="${vids}" class="feed ${
          post["files"].length > 1 ? "slick_material" : ""
        }" src="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/${acc_name}/${
          file["file"]
        }" preload="none" poster="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/${acc_name}/${
          file["thumbnail"]
        }" controls></video></div>`;
      }
    }
    if (post["description"] == "") {
      description = "";
    } else {
      description = `<div class="post_bottom"><div class="post_desc"><span><span class="post_name_comms">${
        post["json_data"]
          ? post["json_data"]["node"]["owner"]["username"]
          : acc_name
      }</span>${post["description"]
        .split("\n")
        .join("<br>")}</span></div></div>`;
    }
    if (post["files"][0]["file_type"] == "tiktok") {
      post["date"] = "Видео из ТикТока";
    }
    post["files"].length > 1
      ? (slide_one = "post_slide")
      : (slide_one = "post_slide_one");
    if (post["comments"] != "") {
      all_comms = post["comments"].slice();
      for (comm of all_comms.reverse()) {
        comment_str += `<div style="margin: 10px;" class="comment"><span><span class="post_name_comms" style="font-weight:bold; margin-right: 10px;">${comm["owner"]["username"]}</span>${comm["text"]}</span></div>`;
        all_answ = comm["answers"].slice();
        for (answer of all_answ.reverse()) {
          comment_str += `<div style="margin-left: 3rem;" class="comment"><span><span class="post_name_comms" style="font-weight:bold; margin-right: 10px;">${answer["owner"]["username"]}</span>${answer["text"]}</span></div>`;
        }
      }
      comment_str = `<hr style="margin: 10px 0 10px 0" size="1px" color="#4d4d4d"><div class="post_comms"><p class="comms_title">Комментарии:</p><div class="comms_scroll">${comment_str}</div></div>`;
    } else {
      comment_str = "";
    }
    if (post["geolocation"] != "") {
      geo = `<div class="geo_blk"><img class="geo_icon" src="geo.png"/><a class="post_time link" href="${
        post["geolocation"].split("\n")[1]
      }">${post["geolocation"].split("\n")[0]}</a></div>`;
    } else {
      geo = false;
    }
    if (post["json_data"]) {
      if (post["json_data"]["node"]["owner"]["username"] != acc_name) {
        link = "no_signal.png";
      } else {
        link = `https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/${acc_name}/profile_pic.jpg`;
      }
    }
    inner_posts += `<div class="post_main">
    <div class="main_wrap">
       <div class="post_upper">
          <img class="post_logo" src="${link}"></img>
          <div class="post_info">
             <p class="post_name">${
               post["json_data"]
                 ? post["json_data"]["node"]["owner"]["username"]
                 : acc_name
             }</p class="post_time">
             <p class="post_time">${post["date"]["hour"]}:${
      post["date"]["minute"]
    }:${post["date"]["second"]} ${post["date"]["day"]}.${
      post["date"]["month"]
    }.${post["date"]["year"]}
             </p>
             ${geo ? geo : ""}
          </div>
       </div>
       <div id="post_slide" class="${slide_one}">${post_item}</div>
       ${description}     
       ${comment_str}
    </div>
 </div>`;
  }
  document.querySelector(
    "#stats"
  ).innerHTML = `Сейчас архив насчитывает ${vids} видео и фото!`;
  document.getElementById("media_block").innerHTML = "";
  document
    .getElementById("media_block")
    .insertAdjacentHTML(
      "beforeend",
      '<div class="p_block" id="video_cont"><p class="category"><span class="category anim_gradient">Instagram: </span>публикации</p></div><div class="container" id="video" style="flex-direction: column;"></div>'
    );
  document.getElementById("video").insertAdjacentHTML("beforeend", inner_posts);

  $(document).ready(function () {
    $(".post_slide").slick({
      infinite: true,
      dots: true,
      variableWidth: true,
      slidesToShow: 1,
      centerMode: true,
    });
  });
}
function get_material(selected) {
  scroll_top();
  acc_name = selected || Cookies.get("lastseen");
  if (Cookies.get("view") == "feed") {
    make_feed(acc_name);
  }
  if (Cookies.get("view") == "gallery") {
    make_arch(acc_name);
  }
}

function make_arch(acc_name) {
  var inner_vid = "";
  var inner_img = "";
  var inner_tik = "";
  var vids = 0;
  Cookies.set("lastseen", acc_name, { expires: 9999 });
  document
    .getElementById("paral_photo")
    .setAttribute(
      "src",
      `https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/${acc_name}/profile_pic.jpg`
    );
  for (material of all_mat["accs"]) {
    if (material[acc_name]) {
      dir_mat = material[acc_name].slice();
    }
  }
  dir_mat["gallery"][0]["videos"].reverse();
  dir_mat["gallery"][0]["photos"].reverse();
  dir_mat["gallery"][0]["tiktok"].reverse();

  for (vid of dir_mat["gallery"][0]["videos"]) {
    inner_vid += `<div class="img_block"><video id="mat_${vid["file"]}" class="clickable" src="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/${acc_name}/${vid["file"]}" preload="none" poster="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/${acc_name}/${vid["thumbnail"]}" controls></video><p class="img_date_str">${vid["date"]["hour"]}:${vid["date"]["minute"]}:${vid["date"]["second"]} ${vid["date"]["day"]}.${vid["date"]["month"]}.${vid["date"]["year"]}</p></div>`;
    vids = vids + 1;
  }
  for (vid of dir_mat["gallery"][0]["photos"]) {
    inner_img += `<div class="img_block"><img full="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/${acc_name}/${vid["file"]}" class="image clickable" src="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/${acc_name}/${vid["thumbnail"]}" loading="lazy"></img><p class="img_date_str">${vid["date"]["hour"]}:${vid["date"]["minute"]}:${vid["date"]["second"]} ${vid["date"]["day"]}.${vid["date"]["month"]}.${vid["date"]["year"]}</p></div>`;
    vids = vids + 1;
  }
  for (vid of dir_mat["gallery"][0]["tiktok"]) {
    inner_tik += `<video style="margin: 30px;" class="clickable" src="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/${acc_name}/${vid["file"]}" preload="none" poster="https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/${acc_name}/${vid["thumbnail"]}" controls></video>`;
    vids = vids + 1;
  }

  document.querySelector(
    "#stats"
  ).innerHTML = `Сейчас архив насчитывает ${vids} видео и фото!`;
  document.getElementById("media_block").innerHTML = "";
  if (inner_vid) {
    document
      .getElementById("media_block")
      .insertAdjacentHTML(
        "beforeend",
        '<div class="p_block" id="video_cont"><p class="category"><span class="category anim_gradient">Instagram: </span>видео и истории</p></div><div class="container" id="video" style=""></div>'
      );
    document.getElementById("video").insertAdjacentHTML("beforeend", inner_vid);
  }
  if (inner_img) {
    document
      .getElementById("media_block")
      .insertAdjacentHTML(
        "beforeend",
        '<div class="p_block" id="photo_cont"><p class="category" style="margin-top: 40px;"><span class="category anim_gradient">Instagram: </span>Фотографии</p></div><div class="container" id="photo" style=""></div>'
      );
    document.getElementById("photo").insertAdjacentHTML("beforeend", inner_img);
  }
  if (inner_tik) {
    document
      .getElementById("media_block")
      .insertAdjacentHTML(
        "beforeend",
        '<div class="p_block" id="tiktok_cont"><p class="category" style="margin-top: 40px;"><span class="category anim_gradient_tiktok">TikTok: </span>клипы</p></div><div class="container" id="tiktok" style=""></div>'
      );
    document
      .getElementById("tiktok")
      .insertAdjacentHTML("beforeend", inner_tik);
  }

  for (elem of document.getElementsByClassName("clickable")) {
    elem.addEventListener("click", get_desc);
  }
}

function photo_scroll() {
  if (document.getElementById("photo_cont") == null) {
    return;
  }
  $("html, body").animate(
    {
      scrollTop: $("#photo_cont").offset().top,
    },
    1000
  ); // Скорость прокрутки
}

function video_scroll() {
  if (document.getElementById("video_cont") == null) {
    return;
  }
  $("html, body").animate(
    {
      scrollTop: $("#video_cont").offset().top,
    },
    1000
  ); // Скорость прокрутки
}

function tiktok_scroll() {
  if (document.getElementById("tiktok_cont") == null) {
    return;
  }
  $("html, body").animate(
    {
      scrollTop: $("#tiktok_cont").offset().top,
    },
    1000
  ); // Скорость прокрутки
}
function get_desc(e) {
  e.preventDefault();
  elem = e.path[1].children[0];
  if (elem.tagName == "VIDEO") {
    document
      .querySelector("body")
      .insertAdjacentHTML(
        "beforeend",
        `<div onclick="remove_ol()" id="overlay" class="overlay"><video class="video_fs" id="ol_mat" src="${elem.src}" loop autoplay poster="${elem.poster}" controls></video></div>`
      );
  } else {
    document
      .querySelector("body")
      .insertAdjacentHTML(
        "beforeend",
        `<div onclick="remove_ol()" id="overlay" class="overlay"><img id="ol_mat" class="image_fs" src="${elem.getAttribute(
          "full"
        )}"></img></div>`
      );
  }
  document.querySelector("#ol_mat").addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

function remove_ol() {
  document.getElementById("overlay").remove();
}

document.addEventListener("keydown", function (event) {
  if (event.code == "Escape" && document.getElementById("overlay")) {
    document.getElementById("overlay").remove();
  }
});
document.addEventListener("click", function (event) {
  event.stopPropagation();
  if (event.target.id == "sm_overlay") {
    remove_ol();
  }
});

function change_view() {
  if (Cookies.get("view") == "gallery") {
    Cookies.set("view", "feed", { expires: 9999 });
  } else {
    Cookies.set("view", "gallery", { expires: 9999 });
  }
  get_material();
}

async function change_effect() {
  if (Cookies.get("effects") == "true") {
    turn_eff("off");
    Cookies.set("effects", "false", { expires: 9999 });
    snowStorm.freeze();
  } else {
    turn_eff("on");
    Cookies.set("effects", "true", { expires: 9999 });
    snowStorm.start();
  }
}

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
  param =
    '<div class="settings_block"><p class="param_cat">Вид архива</p><div class="param_blk"><p class="param_set"><input class="param_input" name="view" type="radio" onchange="change_view()" ' +
    feed +
    ' value="feed">Лента</p><p class="param_set"><input ' +
    gallery +
    ' onchange="change_view()" class="param_input" name="view" type="radio" value="gallery">Галерея</p></div></div>';
  document.body.insertAdjacentHTML(
    "beforeend",
    '<div id="overlay" class="overlay"><div id="sm_overlay" class="sm_overlay"></div></div>'
  );
  document
    .getElementById("sm_overlay")
    .insertAdjacentHTML(
      "beforeend",
      '<div class="modal_settings" id="modal_settings_inner"></div>'
    );
  document
    .getElementById("modal_settings_inner")
    .insertAdjacentHTML("beforeend", param);
  if (
    Cookies.get("effects") == "true" &&
    window.innerHeight < window.innerWidth
  ) {
    checked = "checked";
  } else {
    checked = "";
  }
  param =
    '<br><div class="settings_block"><p class="param_cat">Эффекты</p><div class="param_blk"><p class="param_set"><input class="param_input" onchange="change_effect()" ' +
    checked +
    ' name="effects" type="checkbox" value="effects">Включить эффекты</p></div></div>';
  document
    .getElementById("modal_settings_inner")
    .insertAdjacentHTML("beforeend", param);
}

function change_arch() {
  get_material(document.querySelector("#arch_sel").value);
}

function accs(arch) {
  let arch_list_elem = "";
  window.all_mat = arch;
  let accs_list = all_mat["dirlist"];
  for (var i = 0; i < accs_list.length; i++) {
    if (accs_list[i] == Cookies.get("lastseen")) {
      arch_list_elem +=
        '<option selected value="' +
        accs_list[i] +
        '">' +
        accs_list[i] +
        "</option>";
      var selected = true;
      continue;
    }
    if (accs_list[i] == "e_ivettta" && selected != true) {
      arch_list_elem +=
        '<option selected value="' +
        accs_list[i] +
        '">' +
        accs_list[i] +
        "</option>";
    } else {
      arch_list_elem +=
        '<option value="' + accs_list[i] + '">' + accs_list[i] + "</option>";
    }
  }
  document.getElementById("arch_sel").innerHTML = arch_list_elem;
  document.getElementById("arch_sel").addEventListener("change", change_arch);
}
fetch(
  "https://raw.githubusercontent.com/HotDro4illa/e-ivettta-filehost/master/arch/arch.txt"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    accs(data);
    get_material(false);
  });
