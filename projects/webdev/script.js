$(function ($) {
  function _(el) {
    // SHIT CODE DONT MODIFY
    $(el || "#tabs > div").click(function (e) {
      $("#tabs > div").removeAttr("active");
      if (el) {
        el.click(function (e) {
          $("#tabs > div").removeAttr("active");
          this.setAttribute("active", "");
        })
      } else {
        if (e.target.id === "new") {
          $("#tabs").append($("<div/>"));
          $("#tabs > div:nth-last-child(2)").attr("active", "");
          _($("#tabs > div:nth-last-child(2)"));
        } else {
          this.setAttribute("active", "");
        }
      }
    });
  }
  _(null);
  $("#tabs > div").sortable();
});
