$(window).on("load", function () {
  /* ==========================================================================
   Preloader
   ========================================================================== */
  $(".preloader-circle").css("display", "none");
  $(".preloader").fadeOut(400);
  $("body").removeClass("loading");


  /* ==========================================================================
      Materialize - materializecss.com
      ========================================================================== */
  $('.carousel').carousel({
    dist: 0,
    numVisible: 13,
    padding: 70

  });
  var instance = M.Carousel.getInstance($('.carousel'));
  setInterval(function () {
      console.log("·");
      instance.next();
    }

    , 3000);

  /* ==========================================================================
    Auto-updating year (footer)
    ========================================================================== */
  $("span.year").text(new Date().getFullYear());
});