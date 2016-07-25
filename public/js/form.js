function formSubmit() {
    $('#submit-button').css('display', 'none');
    $('#form-loader').css('display', 'block');
    $('#submit-text').css('display', 'none');
    $('#submit-button').attr('disabled', 'true');

    var url = 'https: //script.google.com/macros/s/AKfycbz_NBX2gVuFy0cxpWF2nzWvajxExNGn9AkKlhLkujBNQ3DpEQ/exec';

    var jqxhr = $.post(url, $('#register-form').serialize(), function (data) {
        $('#form-loader').css('display', 'none');
        $('#notification').css('display', 'block');
        $('#notification').html('Cảm ơn bạn đã quan tâm tới các chương trình của TechKids. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể');
        console.log("Success! Data: " + data.statusText);
    });

}

$(document).ready(function () {
    $('#register-form').on('submit', function (e) {
        e.preventDefault();
        formSubmit();
    });

});
