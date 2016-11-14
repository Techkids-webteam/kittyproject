/**
 * Created by Admin on 27/10/2016.
 */
var clock;

$(document).ready(function(){

    var lastScrollTop = 0;
    $(window).scroll(function(event){
        var st = $(this).scrollTop();
        if (st > lastScrollTop ){
            if(!$("#menu").is(":visible")){
                // $('#navbar').hide();
            }
        } else {
            // $('#navbar').show();
        }
        lastScrollTop = st;
    });


    (function($) {

        function scrollNav() {
            $('.nav a').click(function(){
                //Toggle Class
                $('#menu').hide();

                $('body').removeClass('with--sidebar');
                $('html, body').stop().animate({
                    scrollTop: $( $(this).attr('href') ).offset().top - 160
                }, 400);
                return false;
            });
            $('#start').click(function () {
                $('html, body').stop().animate({
                    scrollTop: $( $(this).attr('href') ).offset().top - 160
                }, 400);
                return false;
            });
            $('.scrollTop a').scrollTop();
        }
        scrollNav();


        $('#header__icon').click(function(e){
            e.preventDefault();
            e.stopPropagation();
            $('body').toggleClass('with--sidebar');
            if($('body').hasClass('with--sidebar')){
                $('#menu').show(200);
            } else {
                $('#menu').hide();
            }
        });

        $('#site-cache').click(function(e){
            $('body').removeClass('with--sidebar');
            $('#menu').hide();
        });

        var currentDate = new Date();

        // Set some date in the future. In this case, it's always Jan 1
        var futureDate = new Date("December 21, 2016 13:30:00");

        // Calculate the difference in seconds between the future and current date
        var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

        // Instantiate a coutdown FlipClock
        clock = $('.clock').FlipClock(diff, {
            clockFace: 'DailyCounter',
            countdown: true,
            showSeconds: false
        });

    })(jQuery);

});