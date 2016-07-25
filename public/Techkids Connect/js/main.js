function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function formSubmit(){
	$('#submit-button').css('display', 'none');
	$('#form-loader').css('display', 'block');
	$('#submit-text').css('display', 'none');
	$('#submit-button').attr('disabled', 'true');

	var url = 'https://script.google.com/macros/s/AKfycbwT88hjH3vQf4kiX76Ygg_1Gn9JPxW9r490Jm-1U3UUYMNwAQ/exec';

    var jqxhr = $.post(url, $('#register-form').serialize(), function(data) {
    	$('#form-loader').css('display', 'none');
		$('#notification').css('display', 'block');
		$('#notification').html('Cảm ơn bạn đã đăng kí, Techkids sẽ liên lạc với bạn trong thời gian sớm nhất!');
        console.log("Success! Data: " + data.statusText);
	});

}

$(document).ready(function(){
	$('#notification').css('display', 'none');
	$('.job-list').slick({
	  dots: true,
	  arrows: false,
	  infinite: false,
	  speed: 300,
	  appendDots: ".job-list-dots",
	  slidesToShow: 2,
	  slidesToScroll: 2,
	  responsive: [
	    {
	      breakpoint: 720,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    }

	  ]
	});

	$('body').on('click', '#dropdown-button', function(e){
		e.preventDefault();
		$('#dropdown-menu').toggleClass('active');
		$('#dropdown-button').toggleClass('active');
	});

	$('body').on('click', '.job-list-item li', function(e){
		e.preventDefault();
		var job = strip($(this).html()).trim();
		job = job.replace(/\s\s+/g, '\n');
		$('#position').val(job);

		$('html, body').animate({
          scrollTop: $('#apply').offset().top - $('#header').height()
        }, 1000);
	});

	$('body').on('click', '#button_home', function(e){
		$('html,body').animate({
			scrollTop: $('#apply').offset().top - $('#header').height()
		}, 1000);
	});

	$('body').on('click', 'a[href*="#"]:not([href="#"])', function(e){
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top - $('#header').height()
				}, 1000);

				e.preventDefault();
			}
		}
	});


	$('#register-form').on('submit', function(e){
		e.preventDefault();
		formSubmit();
	});



});
