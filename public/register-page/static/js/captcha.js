$(document).ready(function() {
  var captcha = document.getElementById('rcaptcha');
  var button_complete = document.getElementById('compelete');
  var modal = document.getElementById('myModal');
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


  $('#form-android').on('submit', function(e) {
    // 	var v = grecaptcha.getResponse();
    // 	console.log(v);
    // if(v.length == 0)
    // {
    // 		alert("You can't leave Captcha Code empty")
    // }
    // if(v.length != 0)
    // {
    // Prevent form submission
    e.preventDefault();
    $('#thong_bao').empty();
    $('#thong_bao').append("Oops! ReCaptcha!");
    $('#thank').empty();
    modal.style.display = "block";
    captcha.style.display = "block";
    button_complete.style.display = "block";



    // // Get the form instance
    //      var $form = $(e.target);

    //      // // Get the BootstrapValidator instance
    //      var bv = $form.data($('#test-form'));

    //      // Use Ajax to submit form data
    //      var url = 'https://script.google.com/macros/s/AKfycbyZM_IQkLdiN_h-VRNYJjOADFr77c4Ekw3GAc-xLIRguaQ2iw/exec';
    //      var redirectUrl = 'success-page.html';
    //      // show the loading
    //      $('#postForm').prepend($('<span></span>').addClass('glyphicon glyphicon-refresh glyphicon-refresh-animate'));

    //      var jqxhr = $.post(url, $form.serialize(), function(data) {
    //          console.log("Success! Data: " + data.statusText);
    // modal.style.display = "block";
    //      });
    //     }

  });

  $('#compelete').on('click', function(a) {

    var v = grecaptcha.getResponse();
    console.log(v);
    if (v.length == 0) {
      alert("You can't leave Captcha Code empty");
    }
    if (v.length != 0) {
      console.log("yes");
      //var $form = $(e.target);
      //var bv = $form.data($('#test-form'));
      var url = 'https://script.google.com/macros/s/AKfycbx-njMOkqkeFSwKH9mKAJpTz00eUtJZCudEHc6c8q-c_qaoFww/exec';


      var jqxhr = $.post(url, $('#form-android').serialize(), function(data) {
        grecaptcha.reset();
        captcha.style.display = "none";
        button_complete.style.display = "none";
        $('#thong_bao').empty();
        $('#thong_bao').append("Đăng kí thành công!");
        $('#thank').append("Cảm ơn bạn đã quan tâm!");
        console.log("Success! Data: " + data.statusText);
      });
    }

  });

});