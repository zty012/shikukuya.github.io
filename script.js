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
  document.cookie = "lang=" + lang; + "; expires=Thu, 18 Dec 2043 12:00:00 GMT";
  window.location.href = "//shikukuya.github.io/" + lang;
}