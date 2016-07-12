$(document).ready(function(){
	console.log($(window).height());
	$('body').on('click', '#button-close', function(e){
		e.preventDefault();
		$('#register-bar').toggleClass('close');
	});
});

$(document).scroll(function() {
	var y = $(this).scrollTop();
	
	if (y > $(window).height()*0.2) {
		$('#register-bar').css("bottom", "0")
	}else{
		$('#register-bar').css("bottom", "-1000000")
	}
});