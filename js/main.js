$(window).on("load", function () {
  /* ==========================================================================
   Preloader
   ========================================================================== */
  $(".preloader-circle").css("display", "none");
  $(".preloader").fadeOut(400);
  $("body").removeClass("loading");


  /* ==========================================================================
   Init Lozad - https://css-tricks.com/lozad-js-performant-lazy-loading-images/
   ========================================================================== */
  const observer = lozad(); // lazy loads elements with default selector as ".lozad"
  observer.observe();


  //load slider images asap
  var pics = document.getElementsByClassName("lozad");

  for (var i = 0, max = pics.length; i < max; i++) {
    observer.triggerLoad(pics.item(i));
  }

  /* ==========================================================================
  AOS - https://michalsnik.github.io/aos/
  ========================================================================== */
  AOS.init({
    offset: 300,
    delay: 200,
    duration: 1800,
    once: true
  });


  /* ==========================================================================
  Materialize - materializecss.com
  ========================================================================== */

  //sidenav
  $('.sidenav').sidenav({
    edge: 'right'
  });

  //acordion
  $('.collapsible').collapsible();


  $('.collapsible-header').on("click", function () {
    //define icons
    var openIcon = '<i class="fas fa-angle-down"></i>'
    var closeIcon = '<i class="fas fa-angle-up"></i>'

    //save variables
    var selector = $(this).children('span');
    var symbol = selector.html();

    //put everything on +
    $('.collapsible-header span').html(openIcon);


    //switch selected sign
    if (symbol == openIcon) {
      selector.html(closeIcon);
    } else {
      selector.html(openIcon);
    }

  });



  //carousel
  $('.carousel').carousel({
    dist: 0,
    numVisible: 13,
    padding: 70
  });

  /*autoplay*/
  if ($('.carousel').length) {
    var instance = M.Carousel.getInstance($('.carousel'));
    var play = 1;

    $('.carousel').hover(function () {
      play = false;
    }, function () {
      play = true;
    });

    function slide() {
      setInterval(function () {
        if (play) {
          instance.next();
        }
      }, 4000);
    }

    slide();
  }



  /* ==========================================================================
    Rotating Hero
    ========================================================================== */
  //custom variables
  var rotateInterval = 3500; //time between rotations in ms
  var transitionTime = 800 //transition time in ms
  var backgrounds = ['hero-01-min.jpg', 'hero-02-min.jpg', 'hero-03-min.jpg']; //filenames
  var imgDirectory = "../img/"; // image directory  from css file location


  //add css for darkening bg
  $(".hero.rotating .darken").css({
    "transition": "all " + transitionTime / 2 + "ms linear"
  });

  //run function every x miliseconds (rotate interval)
  setInterval(function () {

    //darken
    bgDarken()
    heroRotate();

    //wait some time and change image
    setTimeout(function () {
      bgRotate();
    }, transitionTime / 2);

    //wait some more and remove darkened overlay
    setTimeout(function () {
      bgDarken();
    }, transitionTime);

  }, rotateInterval);



  //Functions

  //Rotate Background
  var bgCounter = 0;

  function bgRotate() {
    //change bgCounter
    if (bgCounter == backgrounds.length - 1) {
      bgCounter = 0;
    } else {
      bgCounter += 1;
    }

    //css property
    cssBg = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(" + imgDirectory + backgrounds[bgCounter] + ")"

    //apply css
    $(".hero.rotating").css("background-image", cssBg);

  }

  //darken Background
  function bgDarken() {
    //apply css
    $(".hero.rotating .darken").toggleClass("active");
  }

  //get hero phrases
  var heroPhrase = $("#hero-phrase");
  var headers = $("#hero-phrases h1").toArray();
  var phrases = [];
  headers.forEach(header => phrases.push(header.innerHTML));

  //rotate Hero Text
  function heroRotate() {
    //rotate through headers
    heroPhrase.fadeOut(transitionTime, function () {
      $(this).text(phrases[bgCounter]).fadeIn(transitionTime);
    });
  }



  /* ==========================================================================
    Change header on scroll
    ========================================================================== */
  var logo = $("header nav .brand-logo.show-on-scroll");
  var nav = $("header nav");
  var win = $(window);

  if (nav.hasClass("small-hero")) {
    var winH = win.height() * 0.35; // smaller window height for smaller hero

  } else {
    var winH = win.height(); // Get the window height.
  }



  win.on("scroll", function () {
    if ($(this).scrollTop() > winH) {
      logo.css("opacity", "1");
      nav.removeClass("wide");
    } else {
      logo.css("opacity", "0");
      nav.addClass("wide");
    }
  }).on("resize", function () { // If the user resizes the window
    winH = $(this).height(); // you'll need the new height value
  });


  /* ==========================================================================
    Auto-updating year (footer)
    ========================================================================== */
  $("span.year").text(new Date().getFullYear());
});