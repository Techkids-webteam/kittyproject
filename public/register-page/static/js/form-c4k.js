function formSubmit() {
    $('#submit-button').css('display', 'none');
    $('#form-loader').css('display', 'block');
    $('#submit-text').css('display', 'none');
    $('#submit-button').attr('disabled', 'true');

    var url = 'https://script.google.com/macros/s/AKfycbwV9IKJmJ974JiFa3y24ojyy8Hs6gkFX6WfwxKXGJQ1EGrMCmA0/exec';

    var jqxhr = $.post(url, $('#register-form').serialize(), function (data) {
        $('#form-loader').css('display', 'none');
        $('#notification').css('display', 'block');
        setTimeout(function() {
          window.location.href = "register-successful";
        }, 2000);
        console.log("Success! Data: " + data.statusText);
    });

}

$(document).ready(function () {
    $('#register-form').on('submit', function (e) {
        e.preventDefault();
        formSubmit();
    });

});
