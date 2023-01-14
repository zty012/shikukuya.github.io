// jquery
import "./libs/jquery/jquery.js";
import "./libs/jquery/jquery-mousewheel.js";
import "./libs/jquery/jquery-ui.js";
import "./libs/jquery/jquery-ui-touch-punch.js";
// i18n
import * as i18n from "./libs/i18n/i18n.js";
// logger
import log from "./libs/logger/logger.js";

$(() => {
    //#region 方法和变量定义
    /**
     * 是否为移动端访问
     *
     * @type {boolean}
     */
    const mobile = navigator.userAgent.toLowerCase().indexOf("mobi") > -1;
    /**
     * 当前页数，从1开始，初始值0是为了进入页面时第一页动画
     *
     * @type {number}
     */
    let current = 0;
    /**
     * 移动端：开始滚动页面时，页面的offset.top值
     *
     * @type {undefined | number}
     */
    let offset_top_backup;
    /**
     * 翻页动画
     *
     * @type {object}
     */
    const page_animation = {
        page1: function (animate) {
            $("#p1 h2:nth-child(5)").addClass(animate);
            setTimeout(() => {
                $("#p1 h2:nth-child(5)").removeClass(animate);
            }, 1500);
        },
        page2: function (animate) {
            $("#p2 h2:nth-child(5)").addClass(animate);
            setTimeout(() => {
                $("#p2 h2:nth-child(5)").removeClass(animate);
            }, 1500);
        },
        page3: function (animate) {
            //
        },
    };
    /**
     * 是否为第一页
     *
     * @returns {boolean}
     */
    const is_first = () => current === 1;
    /**
     * 是否为最后一页
     *
     * @returns {boolean}
     */
    const is_last = () => current === $("#body > div").length;
    /**
     * 下一页
     */
    const next = function () {
        if (!is_last()) {
            current++;
            log("下一页", `当前页数 ${current}`);
            $(`#body > div:nth-child(${current})`)[0].scrollIntoView();
            log("翻页动画", `page${current} (btt)`);
            eval(`page_animation.page${current}("bottom_to_top")`);
        }
    };
    /**
     * 上一页
     */
    const prev = function () {
        if (!is_first()) {
            current--;
            log("上一页", `当前页数 ${current}`);
            $(`#body > div:nth-child(${current})`)[0].scrollIntoView();
            log("翻页动画", `page${current} (ttb)`);
            eval(`page_animation.page${current}("top_to_bottom")`);
        }
    };
    /**
     * 跳转页面
     * 
     * @param {number} page 页数
     */
    const goto = function (page) {
        var current_ = current;
        current = page;
        log("跳转页面", `当前页数 ${current}`);
        $(`#body > div:nth-child(${current})`)[0].scrollIntoView();
        if (page > current_) {
            log("翻页动画", `page${current} (btt)`);
            eval(`page_animation.page${current}("bottom_to_top")`);
        } else if (page < current_) {
            log("翻页动画", `page${current} (ttb)`);
            eval(`page_animation.page${current}("top_to_bottom")`);
        }
    };
    //#endregion
    //#region 检测不兼容的浏览器扩展
    setTimeout(() => {
        if ("supercopy" in window) {
            document.body.innerHTML =
                "<h2>检测到不兼容的扩展：supercopy，请使用无痕模式</h2>";
        }
    }, 300);
    //#endregion
    //#region 加载页面
    log("开始加载页面", `移动端: ${mobile}`);
    goto(1);
    i18n.i18n();
    $("#language").val(i18n.defaultlang());
    $("#language").on("change", (e) => {
        log("切换语言", $("#language").val());
        i18n.defaultlang($("#language").val());
        window.location.reload();
    })
    if (mobile) {
        $("#body").draggable({
            drag: (e, params) => {
                log("页面滚动(移动端)", `top:${params.offset.top}`);
                if (typeof offset_top_backup === "undefined") {
                    offset_top_backup = params.offset.top;
                    log(
                        "页面滚动(移动端)",
                        `开始滚动，top_backup:${offset_top_backup}`
                    );
                } else {
                    if (params.offset.top > offset_top_backup) {
                        if (is_first()) {
                            $("#body").css("top", `${offset_top_backup}px`);
                            offset_top_backup = undefined;
                            return false;
                        }
                    }
                    if (params.offset.top < offset_top_backup) {
                        if (is_last()) {
                            $("#body").css("top", `${params.offset.top}px`);
                            offset_top_backup = undefined;
                            return false;
                        }
                    }
                }
            },
            stop: (e, params) => {
                log(
                    "停止滚动(移动端)",
                    `top:${params.offset.top} top_backup:${offset_top_backup}`
                );
                if (params.offset.top > offset_top_backup) {
                    if (params.offset.top - offset_top_backup > 100) {
                        offset_top_backup = undefined;
                        return prev();
                    }
                }
                if (params.offset.top < offset_top_backup) {
                    if (offset_top_backup - params.offset.top > 100) {
                        offset_top_backup = undefined;
                        return next();
                    }
                }
                log("停止滚动(移动端)", "top变化过小，重置top");
                $("#body").css("top", `${offset_top_backup}px`);
                offset_top_backup = undefined;
            },
        });
    } else {
        $("body").on("mousewheel", (e, delta) => {
            if (delta > 0) {
                prev();
            }
            if (delta < 0) {
                next();
            }
        });
    }
    //#endregion
});
