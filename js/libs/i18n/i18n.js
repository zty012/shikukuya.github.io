import * as languages from "./lang.js";

export function i18n(lang = undefined, node = document.body) {
    if (typeof lang === "undefined") {
        if (window.localStorage.getItem("lang") === null) {
            window.localStorage.setItem("lang", "zh_CN");
            lang = languages.zh_CN;
        } else {
            lang = eval(`languages.${window.localStorage.getItem("lang")}`);
        }
    }
    for (let el of node.querySelectorAll("[data-key]")) {
        if (el.dataset.key in lang) {
            el.innerText = lang[el.dataset.key];
        } else {
            el.innerText = el.dataset.key;
        }
    }
}

export function defaultlang(lang = undefined) {
    if (typeof lang === "undefined") {
        if (window.localStorage.getItem("lang") === null) {
            return "zh_CN";
        } else {
            return window.localStorage.getItem("lang");
        }
    } else {
        window.localStorage.setItem("lang", lang);
    }
}
