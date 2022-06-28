function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}

function selectLanguage() {
  window.location.href = "//shikukuya.github.io/language";
}

function checkLanguage() {
  var lang = getCookie("lang");
  if (lang == null) {
    selectLanguage();
  } else if (lang == "zh-cn") {
    window.location.href = "//shikukuya.github.io/zh-cn";
  } else {
    window.location.href = "//shikukuya.github.io/en-us";
  }
}

function language(lang) {
  var d = new Date();
  d.setTime(d.getTime() + (1000*1000*1000*1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = "lang=" + lang + "; " + expires;
  window.location.href = "//shikukuya.github.io/" + lang;
}