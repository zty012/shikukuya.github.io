$(() => {
    let current = 1;
    const next = async () => {
        console.log("next");
        current++;
        $(`#body > div:nth-child(${current})`)[0].scrollIntoView();
    };
    const prev = async () => {
        console.log("prev");
        current--;
        $(`#body > div:nth-child(${current})`)[0].scrollIntoView();
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
    $("#body > div").css("height", innerHeight + "px");
    addEventListener("resize", (e) => {
        $("#body > div").css("height", innerHeight + "px");
    });
});
