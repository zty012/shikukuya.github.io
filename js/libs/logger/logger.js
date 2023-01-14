/**
 * 在控制台打印日志，格式：[type] info
 *
 * 只能打印string,number，打印object请使用console.log
 *
 * @param {string} type 日志发送者，即方括号中的内容
 * @param {string | number} info 日志内容
 */
function log(type, info) {
    console.log(
        `%c[${type || ""}] %c${info || ""}`,
        "color: lightblue; font-weight: bold;",
        ""
    );
};

export default log;
