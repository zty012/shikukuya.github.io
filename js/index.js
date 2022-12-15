$(() => {
    let current = 1;
    let animate_speed = 8;
    let animate_speed_temp = animate_speed;
    let animate_speed_change = 0.01;
    let animating = false;
    const sleep = (delay) =>
        new Promise((resolve) => setTimeout(resolve, delay));
    const next = async () => {
        console.log("next");
        if (!(current >= $("#body > div").length) && !animating) {
            animating = true;
            animate_speed_temp = animate_speed;
            current++;
            $("#body > div").hide();
            $(`#body > div:nth-child(${current})`).show();
            $("body").append($("#body").clone().attr("id", "body2"));
            $("#body2").css("top", innerHeight + "px");
            while (true) {
                if (~~$("#body2").css("top").split("px")[0] <= 50) {
                    break;
                } else {
                    $("#body").css(
                        "top",
                        ~~$("#body").css("top").split("px")[0] -
                            animate_speed +
                            "px"
                    );
                    $("#body2").css(
                        "top",
                        ~~$("#body2").css("top").split("px")[0] -
                            animate_speed +
                            "px"
                    );
                    animate_speed = animate_speed - animate_speed_change;
                    await sleep(0.1);
                }
            }
            $("#body").remove();
            $("#body2").attr("id", "body");
            animate_speed = animate_speed_temp;
            animating = false;
        }
    };
    const prev = async () => {
        console.log("prev");
        if (!(current <= 1) && !animating) {
            animating = true;
            animate_speed_temp = animate_speed;
            current--;
            $("#body > div").hide();
            $(`#body > div:nth-child(${current})`).show();
            $("body").append($("#body").clone().attr("id", "body2"));
            $("#body2").css("top", "-" + (innerHeight - 120) + "px");
            while (true) {
                if (~~$("#body2").css("top").split("px")[0] >= 50) {
                    break;
                } else {
                    $("#body").css(
                        "top",
                        ~~$("#body").css("top").split("px")[0] +
                            animate_speed +
                            "px"
                    );
                    $("#body2").css(
                        "top",
                        ~~$("#body2").css("top").split("px")[0] +
                            animate_speed +
                            "px"
                    );
                    animate_speed = animate_speed - animate_speed_change;
                    await sleep(0.1);
                }
            }
            $("#body").remove();
            $("#body2").attr("id", "body");
            animate_speed = animate_speed_temp;
            animating = false;
        }
    };
    const menu = () => {
        console.log("menu");
    };
    $("body")[0].addEventListener("mousewheel", (e) => {
        e = e || window.event;
        e.wheelDelta = e.wheelDelta || e.detail;
        if (e.wheelDelta > 0) {
            prev();
        }
        if (e.wheelDelta < 0) {
            next();
        }
    });
    $("#prev")[0].addEventListener("click", (e) => {
        prev();
    });
    $("#next")[0].addEventListener("click", (e) => {
        next();
    });
    $("#menu")[0].addEventListener("click", (e) => {
        menu();
    });
    $("#body > *").css("height", innerHeight - 50 + "px");
    addEventListener("resize", (e) => {
        $("#body > *").css("height", innerHeight - 50 + "px");
    });
    $("#body > div:not(#body > div:first-child)").hide();
});
