$(document).ready(function() {
    var modal = document.getElementById('myModal');
    var close = document.getElementById("close-btn");
document.getElementById("close-btn");
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    close.onclick = function() {
      modal.style.display = "none";
    }
    $('#submit-button-modal').on('click', function(e) {
        modal.style.display = "block";
    });
});
