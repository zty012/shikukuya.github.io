import * as languages from "./lang.js";
import log from "../logger/logger.js";

/**
 * 国际化
 * 
 * @param {object} lang 语言对象
 * @param {Element} node 要国际化的dom树
 */
export function i18n(lang, node = document.body) {
    if (typeof lang === "undefined") {
        if (window.localStorage.getItem("lang") === null) {
            window.localStorage.setItem("lang", "zh_CN");
            lang = languages.zh_CN;
        } else {
            lang = eval(`languages.${window.localStorage.getItem("lang")}`);
        }
    }
    for (let key of Object.keys(lang)) {
        log("国际化", "处理 " + key.replaceAll("_", "."))
        for (let el of node.querySelectorAll("*")) {
            el.innerHTML = el.innerHTML.replaceAll(`\{${key.replaceAll("_", ".")}\}`, lang[key]);
        }
    }
}

export function defaultlang(lang) {
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
