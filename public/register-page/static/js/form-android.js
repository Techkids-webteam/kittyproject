// $(document).ready(function() {
//   var captcha = document.getElementById('rcaptcha');
//   var button_complete = document.getElementById('compelete');
//   var modal = document.getElementById('myModal');
//   window.onclick = function(event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
//   }
//   $('#form-android').on('submit', function(e) {
//     // Prevent form submission
//     e.preventDefault();
//     $('#thong_bao').empty();
//     $('#thong_bao').append("Oops! ReCaptcha!");
//     $('#thank').empty();
//     modal.style.display = "block";
//     captcha.style.display = "block";
//     button_complete.style.display = "block";
//   });
//
//   $('#compelete').on('click', function(a) {
//
//     var v = grecaptcha.getResponse();
//     console.log(v);
//     if (v.length == 0) {
//       alert("You can't leave Captcha Code empty");
//     }
//     if (v.length != 0) {
//       console.log("yes");
//       //var $form = $(e.target);
//       //var bv = $form.data($('#test-form'));
//       var url = 'https://script.google.com/macros/s/AKfycbwohkk9JwVKmQQVAR0XIyP7nFS4GqWQS1j-pdkYIjTyjpOeV5KC/exec';
//       var redirectUrl = 'register-successful';
//
//       var jqxhr = $.post(url, $('#form-android').serialize(), function(data) {
//           grecaptcha.reset();
//           captcha.style.display = "none";
//           button_complete.style.display = "none";
//           console.log("Success! Data: " + data.statusText);
//           $('#myModal').empty();
//           $(location).attr('href', redirectUrl);
//         })
//         .fail(function(data) {
//           console.warn("Error! Data: " + data.statusText);
//           // HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
//           if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
//             //alert("Browser is Safari -- we get an error, but the form still submits -- continue.");
//             $(location).attr('href', redirectUrl);
//           }
//         });
//     }
//
//   });
//
// });


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
    modal.style.display = "block";
    captcha.style.display = "block";
    button_complete.style.display = "block";
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
      var url = 'https://script.google.com/macros/s/AKfycbwohkk9JwVKmQQVAR0XIyP7nFS4GqWQS1j-pdkYIjTyjpOeV5KC/exec';
      var redirectUrl = 'register-successful';


      var jqxhr = $.post(url, $('#form-android').serialize(), function(data) {
        grecaptcha.reset();
        captcha.style.display = "none";
        button_complete.style.display = "none";
        console.log("Success! Data: " + data.statusText);
        $('#myModal').empty();
        $(location).attr('href', redirectUrl);
      });
    }

  });

});
