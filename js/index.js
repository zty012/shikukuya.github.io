import './libs/jquery.js'
import './libs/jquery-mousewheel.js'
import './libs/jquery-ui.js'
import './libs/jquery-ui-touch-punch.js'

$(() => {
    //#region 方法和变量定义
    /**
     * 在控制台打印日志，格式：[type] info
     * 
     * 只能打印string,number，打印object请使用console.log
     * 
     * @param {string} type 日志发送者，即方括号中的内容
     * @param {string | number} info 日志内容
     */
    const log = (type, info) => {
        console.log(`%c[${type || ''}] %c${info || ''}`, 'color: lightblue; font-weight: bold;', '')
    }
    /**
     * 是否为移动端访问
     * 
     * @type {boolean}
     */
    const mobile = navigator.userAgent.toLowerCase().indexOf('mobi') > -1
    /**
     * 当前页数，从1开始
     * 
     * @type {number}
     */
    let current = 1
    /**
     * 翻页动画
     * 
     * 调用：page_animation.page{page}('{animation_name}')
     * 
     * @type {object}
     */
    const page_animation = {
        page1: (animate) => { },
        page2: (animate) => {
            $('#p2 h2:nth-child(5)').addClass(animate)
            setTimeout(() => {
                $('#p2 h2:nth-child(5)').removeClass(animate)
            }, 1500)
        },
        page3: (animate) => { },
    }
    /**
     * 是否为第一页
     * 
     * @returns {boolean}
     */
    const is_first = () => current === 1
    /**
     * 是否为最后一页
     * 
     * @returns {boolean}
     */
    const is_last = () => current === $('#body > div').length
    /**
     * 下一页
     */
    const next = () => {
        if (!is_last()) {
            current++
            log('下一页', `当前页数 ${current}`)
            $(`#body > div:nth-child(${current})`)[0].scrollIntoView()
            log('翻页动画', `page${current} (bottom_to_top)`)
            eval(`page_animation.page${current}('bottom_to_top')`)
        }
    }
    /**
     * 上一页
     */
    const prev = () => {
        if (!is_first()) {
            current--
            log('上一页', `当前页数 ${current}`)
            $(`#body > div:nth-child(${current})`)[0].scrollIntoView()
            log('翻页动画', `page${current} (top_to_bottom)`)
            eval(`page_animation.page${current}('top_to_bottom')`)
        }
    }
    //#endregion
    //#region 加载页面
    log('开始加载页面', `移动端: ${mobile}`)
    $('#body > div:first-child')[0].scrollIntoView()
    if (mobile) {
        $('#body').draggable({
            drag: (e, params) => {
                log('页面滚动(移动端)', `top:${params.offset.top}`)
                if (params.offset.top > 130) {
                    log('页面滚动(移动端)', 'top > 130，停止滚动')
                    return false
                }
                if (params.offset.top < -80) {
                    log('页面滚动(移动端)', 'top < -80，停止滚动')
                    return false
                }
            },
            stop: (e, params) => {
                log('停止滚动(移动端)', `top:${params.offset.top}`)
                if (params.offset.top > 130) {
                    if (!is_first()) {
                        return prev()
                    }
                }
                if (params.offset.top < -80) {
                    if (!is_last()) {
                        return next()
                    }
                }
                log('停止滚动(移动端)', '-80 < top < 130，重置top')
                $(`#body > div:nth-child(${current})`)[0].scrollIntoView()
            }
        })
    } else {
        $('body').on('mousewheel', (e, delta) => {
            if (delta > 0) {
                prev()
            }
            if (delta < 0) {
                next()
            }
        })
        $('#body > div:first-child')[0].scrollIntoView()
    }
    //#endregion
})