function shuffle(arr) {
  var a = arr;
  a.sort((a, b) => {
    return Math.random() > 0.5 ? -1 : 1;
  });
  return a;
}

$(function ($) {
  $("#background").warpDrive({
    width: innerWidth,
    height: innerHeight,
    autoResize: true,
    starCount: 4455,
    starSpeedMax: 30,
  });
  $("#splash").html(shuffle(["啊这", "但凡有20树脂", "原来你也玩原神"])[0]);
  $(document).on("scroll", (e) => {
    if ((document.body.scrollTop || document.documentElement.scrollTop) == 0)
      $("#totop").addClass("hide");
    else $("#totop").removeClass("hide");
  });
  $("#totop").addClass("hide");
  $("#totop").click((e) => {
    $(document).scrollTop(0);
  });
  $("#contextmenu").addClass("hide");
  $(document).click((e) => {
    $("#contextmenu").addClass("hide");
  });
  $(document).contextmenu((e) => {
    e = e || window.event;
    var scrollX =
      document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    $("#contextmenu").removeClass("hide");
    $("#contextmenu").offset({
      top: y,
      left: x,
    });
    return false;
  });
  $("input").contextmenu((e) => {
    e.stopPropagation();
    return true;
  });
  $(".student").click((e) => {
    alert(
      "这个功能使用了一段“非常简单”的代码：" +
        `

        var map = {
          1: "一年级",
          2: "二年级",
          3: "三年级",
          4: "四年级",
          5: "五年级",
          6: "六年级",
          7: "初一",
          8: "初二",
          9: "初三",
        };
        var year = new Date().getFullYear().toString();
        // 2018是一年级上学期的年份
        var grade = year - 2018 + 1;
        $(".student").html(map[grade]);
    `
    );
  });
  var map = {
    1: "一年级",
    2: "二年级",
    3: "三年级",
    4: "四年级",
    5: "五年级",
    6: "六年级",
    7: "初一",
    8: "初二",
    9: "初三",
  };
  var year = new Date().getFullYear().toString();
  var grade = year - 2018 + 1;
  $(".student").html(map[grade]);
  if (typeof $("html").data().darkreaderMode !== "undefined") {
    $("body *").remove();
    $("body").html(`
      <p>请禁用darkreader，然后刷新页面</p>
      <p>disable darkreader then refresh this page</p>
      <img src="/img/disable_darkreader/1.png" alt="1">
      <img src="/img/disable_darkreader/2.png" alt="2">
    `);
  }
});
