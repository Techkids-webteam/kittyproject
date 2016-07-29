$(document).ready(function() {
  var captcha = document.getElementById('rcaptcha');
  var button_complete = document.getElementById('compelete');
  var modal = document.getElementById('myModal');
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


  $('#form-iOS').on('submit', function(e) {
    // Prevent form submission
    e.preventDefault();
    $('#thong_bao').empty();
    $('#thong_bao').append("Oops! ReCaptcha!");
    $('#thank').empty();
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
      var url = 'https://script.google.com/macros/s/AKfycbzj38SJcgaAL6bMj3tPyiYkCWO-SLVvlEeTljwDv118wcUp7V0/exec';
      // var urliOS = 'https://script.google.com/macros/s/AKfycbzj38SJcgaAL6bMj3tPyiYkCWO-SLVvlEeTljwDv118wcUp7V0/exec';
      // var urlweb = 'https://script.google.com/macros/s/AKfycbxiRvjmrfKHzSTsNVESZ38EOYlW88-B2y35Y31PWONOglDAP0xA/exec';
      // var urlc4e = 'https://script.google.com/macros/s/AKfycbzE7dj5m-fcCL0vYzbecpxcoYbguvyyOvAx_MslIo8VuqdsA3I/exec';
      // var urlc4k = 'https://script.google.com/macros/s/AKfycbwV9IKJmJ974JiFa3y24ojyy8Hs6gkFX6WfwxKXGJQ1EGrMCmA0/exec';

      var redirectUrl = 'register-successful';

      var jqxhr = $.post(url, $('#form-iOS').serialize(), function(data) {
          grecaptcha.reset();
          captcha.style.display = "none";
          button_complete.style.display = "none";
          console.log("Success! Data: " + data.statusText);
          $(location).attr('href', redirectUrl);
        })
        .fail(function(data) {
          console.warn("Error! Data: " + data.statusText);
          // HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
          if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
            //alert("Browser is Safari -- we get an error, but the form still submits -- continue.");
            $(location).attr('href', redirectUrl);
          }
        });
      // var jqxhriOS = $.post(urliOS, $('#form-iOS').serialize(), function(data) {
      //     grecaptcha.reset();
      //     captcha.style.display = "none";
      //     button_complete.style.display = "none";
      //     console.log("Success! Data: " + data.statusText);
      //     $(location).attr('href', redirectUrl);
      //   })
      //   .fail(function(data) {
      //     console.warn("Error! Data: " + data.statusText);
      //     // HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
      //     if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
      //       //alert("Browser is Safari -- we get an error, but the form still submits -- continue.");
      //       $(location).attr('href', redirectUrl);
      //     }
      //   });
      // var jqxhrweb = $.post(urlweb, $('#form-web').serialize(), function(data) {
      //     grecaptcha.reset();
      //     captcha.style.display = "none";
      //     button_complete.style.display = "none";
      //     console.log("Success! Data: " + data.statusText);
      //     $(location).attr('href', redirectUrl);
      //   })
      //   .fail(function(data) {
      //     console.warn("Error! Data: " + data.statusText);
      //     // HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
      //     if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
      //       //alert("Browser is Safari -- we get an error, but the form still submits -- continue.");
      //       $(location).attr('href', redirectUrl);
      //     }
      //   });
      // var jqxhrc4e = $.post(urlweb, $('#form-c4e').serialize(), function(data) {
      //     grecaptcha.reset();
      //     captcha.style.display = "none";
      //     button_complete.style.display = "none";
      //     console.log("Success! Data: " + data.statusText);
      //     $(location).attr('href', redirectUrl);
      //   })
      //   .fail(function(data) {
      //     console.warn("Error! Data: " + data.statusText);
      //     // HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
      //     if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
      //       //alert("Browser is Safari -- we get an error, but the form still submits -- continue.");
      //       $(location).attr('href', redirectUrl);
      //     }
      //   });
      // var jqxhrc4k = $.post(urlc4k, $('#form-c4k').serialize(), function(data) {
      //     grecaptcha.reset();
      //     captcha.style.display = "none";
      //     button_complete.style.display = "none";
      //     console.log("Success! Data: " + data.statusText);
      //     $(location).attr('href', redirectUrl);
      //   })
      //   .fail(function(data) {
      //     console.warn("Error! Data: " + data.statusText);
      //     // HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
      //     if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
      //       //alert("Browser is Safari -- we get an error, but the form still submits -- continue.");
      //       $(location).attr('href', redirectUrl);
      //     }
      //   });
    }

  });

});
