$('#mySelect').on('change', function(e) {
  $('#myTab li a').eq($(this).val()).tab('show');
});
$('.responsive-slick').slick({
  dots: false,
  autoplay: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
        // vertical: true,
        // verticalSwiping: true
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
