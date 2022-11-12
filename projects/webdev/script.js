$(function ($) {
  $("#tabs > div").click(function (e) {
    $("#tabs > div").removeAttr("active");
    this.setAttribute("active", "");
  })
})