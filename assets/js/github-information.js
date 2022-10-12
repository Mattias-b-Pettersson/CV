function fetchGithubInformation(event) {

    var username = $("#gh-username").val()
    if (!username) {
        $("#gh-user-data").html(`<h2>Vänligen slå in ett Github användarnamn</h2>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/animations/loading.gif" alt="loading...">
        </div>`)
}