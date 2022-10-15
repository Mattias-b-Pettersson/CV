document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-submit").addEventListener("click", function() {
        sendMail(this);
    });
});