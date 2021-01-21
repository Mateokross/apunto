$(window).on("load", function () {
  /* ==========================================================================
   Preloader
   ========================================================================== */
  $(".preloader-circle").css("display", "none");
  $(".preloader").fadeOut(400);
  $("body").removeClass("loading");

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
    $('.sidenav').sidenav({
        edge: 'right'
    });

  $('.carousel').carousel({
    dist: 0,
    numVisible: 13,
    padding: 70

  });

  /*autoplay*/
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
  /* ==========================================================================
    Rotating Hero
    ========================================================================== */
  //variables
  rotateInterval = 8000; //time between rotations in ms
  backgrounds = ['hero-01.jpg', 'hero-02.jpg', 'hero-03.jpg']; //filenames
  imgDirectory = "../img/"; // from css file location
  bgCounter = 0;
  timeBlack = 1000 //in ms

  //debug
  counter=0;
  setInterval(function(){
    counter +=1;
    console.log(counter);
},1000);
  
  //run function every x miliseconds
   setInterval(function(){
    bgDarken()//darken
    //wait some time and change image
    setTimeout(function(){
      bgRotate();
    },timeBlack/2);
    //wait some more and remove dark
    setTimeout(function(){
      bgDarken();
    },timeBlack);
  },rotateInterval);

  function bgRotate(){
    //change bgCounter
    if(bgCounter == backgrounds.length - 1){
      bgCounter = 0;
    }else{
      bgCounter += 1;
    }
    
    //css property
    cssBg = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url("+ imgDirectory + backgrounds[bgCounter] + ")"

    //apply css
    $(".hero.rotating").css("background-image",cssBg);
    console.log("bg rotated");
  
  }


  function bgDarken(){
    //apply css
    $(".hero.rotating .darken").toggleClass("active");
    console.log("bg darken toggled");
  }

  //add css
  $(".hero.rotating .darken").css({
    "transition": "all "+ timeBlack/2 +"ms linear"
  });
  $(".hero.rotating .darken.active").css({
    "background": "black"
  });

  /* ==========================================================================
    Auto-updating year (footer)
    ========================================================================== */
    var logo = $("header nav .brand-logo")
    var win = $(window);
    var winH = win.height();   // Get the window height.

    win.on("scroll", function () {
        if ($(this).scrollTop() > winH ) {
            logo.css("opacity", "1");
        } else {
          logo.css("opacity", "0");
        }
    }).on("resize", function(){ // If the user resizes the window
       winH = $(this).height(); // you'll need the new height value
    });

  /* ==========================================================================
    Auto-updating year (footer)
    ========================================================================== */
  $("span.year").text(new Date().getFullYear());
});