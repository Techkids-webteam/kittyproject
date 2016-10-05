// SlideShow
// First SlideShow
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("slide1");

  if (n > x.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = x.length
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}
showDivs(1);
// Second SlideShow
var slideIndex_2 = 1;
showDivs_2(slideIndex_2);

function plusDivs_2(n) {
  showDivs_2(slideIndex_2 += n);
}

function showDivs_2(n) {
  var i;
  var x = document.getElementsByClassName("slide2");
  if (n > x.length) {
    slideIndex_2 = 1
  }
  if (n < 1) {
    slideIndex_2 = x.length
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex_2 - 1].style.display = "block";
}
showDivs_2(1);
// Third SlideShow
var slideIndex_3 = 1;
showDivs_3(slideIndex_3);

function plusDivs_2(n) {
  showDivs_3(slideIndex_3 += n);
}

function showDivs_3(n) {
  var i;
  var x = document.getElementsByClassName("slide3");
  if (n > x.length) {
    slideIndex_3 = 1
  }
  if (n < 1) {
    slideIndex_3 = x.length
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex_3 - 1].style.display = "block";
}
showDivs_3(1);
//Fourth SlideShow
var slideIndex_4 = 1;
showDivs_4(slideIndex_4);

function plusDivs_4(n) {
  showDivs_4(slideIndex_4 += n);
}

function showDivs_4(n) {
  var i;
  var x = document.getElementsByClassName("slide4");
  if (n > x.length) {
    slideIndex_4 = 1
  }
  if (n < 1) {
    slideIndex_4 = x.length
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex_4 - 1].style.display = "block";
}
showDivs_4(1);
// Fifth SlideShow
var slideIndex_5 = 1;
showDivs_5(slideIndex_5);

function plusDivs_2(n) {
  showDivs_5(slideIndex_5 += n);
}

function showDivs_5(n) {
  var i;
  var x = document.getElementsByClassName("slide5");
  if (n > x.length) {
    slideIndex_5 = 1
  }
  if (n < 1) {
    slideIndex_5 = x.length
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex_5 - 1].style.display = "block";
}
showDivs_5(1);
// Sixth SlideShow
var slideIndex_6 = 1;
showDivs_6(slideIndex_6);

function plusDivs_6(n) {
  showDivs_6(slideIndex_6 += n);
}

function showDivs_6(n) {
  var i;
  var x = document.getElementsByClassName("slide6");
  if (n > x.length) {
    slideIndex_6 = 1
  }
  if (n < 1) {
    slideIndex_6 = x.length
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex_6 - 1].style.display = "block";
}
showDivs_6(1);
// End SlideShow Code

// FlipClock Code
var clock;

$(document).ready(function() {

  // Grab the current date
  var currentDate = new Date();

  // Set some date in the future. In this case, it's always Jan 1
  var futureDate = new Date("October 21, 2016 12:00:00");

  // Calculate the difference in seconds between the future and current date
  var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

  // Instantiate a coutdown FlipClock
  clock = $('.clock').FlipClock(diff, {
    clockFace: 'DailyCounter',
    countdown: true,
    showSeconds: false
  });
});
// End FlipClock Code
