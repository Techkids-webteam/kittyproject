$(document).ready(function(){
	$('body').on('click', '#menu-button', function(e){
		e.preventDefault();
		$('#menu-button').fadeOut("linear",function(){
			$('#typo-button').fadeIn("linear");
		});
		
	});

	$('body').on('click', '#typo-button', function(e){
		e.preventDefault();
		$('#typo-button').fadeOut("linear",function(){
			$('#menu-button').fadeIn("linear");
		});
		
	});


	

});