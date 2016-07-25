function formSubmit() {
    $('#submit-button').css('display', 'none');
    $('#form-loader').css('display', 'block');
    $('#submit-text').css('display', 'none');
    $('#submit-button').attr('disabled', 'true');

    var url = 'https://script.google.com/macros/s/AKfycbxCsm9rkoVDLfJ1kyb3uElq2lFaGOUkjCfqc61BjfQ/dev';

    var jqxhr = $.post(url, $('#register-form').serialize(), function (data) {
        $('#form-loader').css('display', 'none');
        $('#notification').css('display', 'block');
        $('#notification').html('Cảm ơn bạn đã quan tâm tới các chương trình của TechKids. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể');
        $('#notification').attr("href", "/mobile/register");
        console.log("Success! Data: " + data.statusText);
    });

}

$(document).ready(function () {
    $('#register-form').on('submit', function (e) {
        e.preventDefault();
        formSubmit();
    });

});
