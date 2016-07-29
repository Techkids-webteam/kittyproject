function formSubmit() {
    $('#submit-button').css('display', 'none');
    $('#form-loader').css('display', 'block');
    $('#submit-text').css('display', 'none');
    $('#submit-button').attr('disabled', 'true');

    var url = 'https://script.google.com/macros/s/AKfycbx-njMOkqkeFSwKH9mKAJpTz00eUtJZCudEHc6c8q-c_qaoFww/exec';

    var jqxhr = $.post(url, $('#form-android').serialize(), function (data) {
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
