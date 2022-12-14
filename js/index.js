$(() => {
    let current = 1;
    let timer_page = 0;
    // 这里用jquery就无法获取wheelDelta了
    $("body")[0].addEventListener("mousewheel", (e) => {
        clearTimeout(timer_page);
        timer_page = setTimeout(() => {
            e = e || window.event;
            e.wheelDelta = e.wheelDelta || e.detail;
            if (e.wheelDelta > 0) {
                // prev
                prev();
            }
            if (e.wheelDelta < 0) {
                // next
                next();
            }
        }, 100);
    });
    $("#prev").on("click", (e) => {
        prev();
    });
    $("#next").on("click", (e) => {
        next();
    });
    $("#menu").on("click", (e) => {
        menu();
    });
    $("#body > div:not(#body > div:first-child)").hide();

    const next = () => {
        console.log("next");
        if (!(current >= $("#body > div").length)) {
            current++;
            $("#body > div").hide();
            $(`#body > div:nth-child(${current})`).show();
        }
    };
    const prev = () => {
        console.log("prev");
        if (!(current <= 1)) {
            current--;
            $("#body > div").hide();
            $(`#body > div:nth-child(${current})`).show();
        }
    };
    const menu = () => {
        console.log("menu");
    };
});
