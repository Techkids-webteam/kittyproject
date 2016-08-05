$(document).ready(function() {
    var modal = document.getElementById('myModal');
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    $('#submit-button-modal').on('click', function(e) {
        modal.style.display = "block";
    });
});
