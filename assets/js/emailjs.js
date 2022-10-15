function sendMail(contactForm) {
    console.log("Försöker skicka mail...")

    fromName = document.getElementById("name").value;
    message = document.getElementById("projectsummary").value;
    replyTo = document.getElementById("email").value;

    emailjs.send("service_c07g64h", "CV", {
        from_name: fromName,
        message: message,
        reply_to: replyTo
    })
    .then(
        function(response) {
            console.log("SUCCESS", response)
        },
        function(error) {
            console.log("FAILED", error)
        }
    )
    return false;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-submit").addEventListener("click", function() {
        sendMail(this);
    });
});