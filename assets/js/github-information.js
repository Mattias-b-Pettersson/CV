function fetchGithubInformation(event) {

    var username = $("#gh-username").val()
    if (!username) {
        $("#gh-user-data").html(`<h2>Vänligen slå in ett Github användarnamn</h2>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/animations/loading.gif" alt="loading...">
        </div>`);

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
       function(response) {
        var userData = response;
        $("#gh-user-data").html(userInformationHTML(userData));
        if (errorResponse.status === 404) {
            $("#gh-user-data").html(`<h2>Ingen användare vid namn ${username} hittades</h2>`);
        } else {
            console.error(errorResponse);
            $("#gh-user-data").html(`<h2>Error ${errorResponse.responseJSON.message} hittades</h2>`);
        }
       } 
    )
}