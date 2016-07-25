$(document).ready(function(){
	$('body').on('click', '#menu-button', function(e){
		
		e.preventDefault();
		$('#menu-button').fadeOut('linear',function(){
			$('#typo-button').fadeIn('linear');
		});
		
	});

	$('body').on('click', '#typo-button', function(e){

		e.preventDefault();
		$('#typo-button').fadeOut('linear',function(){
			$('#menu-button').fadeIn('linear');
		});
		
	});

	$('body').on('click', '.tabs-list a', function(e){

		e.preventDefault();
		$(this).parent().addClass('current');
		$(this).parent().siblings().removeClass('current');
		var tab = $(this).attr('href');

		$('.description').not(tab).css('display', 'none');
		$('.description').filter(tab).fadeIn('linear');

		$('.video-container').not(tab).css('display', 'none');
		$('.video-container').filter(tab).fadeIn('linear');

	});


	

});