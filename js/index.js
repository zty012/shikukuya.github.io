$(() => {
    let current = 1;
    const page_animation = {
        page1: (animate) => {},
        page2: (animate) => {
            $("#p2 h2:nth-child(5)").addClass(animate);
            setTimeout(() => {
                $("#p2 h2:nth-child(5)").removeClass(animate);
            }, 1500);
        },
        page3: (animate) => {},
    }
    const next = async () => {
        console.log("next");
        if (current < $("#body > div").length) {
            current++;
            $(`#body > div:nth-child(${current})`)[0].scrollIntoView();
            eval(`page_animation.page${current}("bottom_to_top")`);
        }
    };
    const prev = async () => {
        console.log("prev");
        if (current > 0) {
            current--;
            $(`#body > div:nth-child(${current})`)[0].scrollIntoView();
            eval(`page_animation.page${current}("top_to_bottom")`);
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
    $("#body > div:first-child")[0].scrollIntoView();
    $("#body > div").css("height", innerHeight + "px");
    addEventListener("resize", (e) => {
        $("#body > div").css("height", innerHeight + "px");
    });
});
