$(document).ready(function(){
  $('body').on('click touchend', '.scc_tab_button', function(e){
    e.preventDefault();

    $("#scc .scc_tabs .active").each(function(){
      $(this).removeClass('active');
    });

    $(this).addClass('active');
    $($(this).attr('href')).addClass('active');
  });
});
