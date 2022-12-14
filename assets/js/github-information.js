function userInformationHTML(user) {
    return `
    <h2>${user.name}
        <span class="small-name">
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url} target="_blank">
                <img src="${user.avatar_url}" width="80px" height="80px" alt="${user.login}">
            </a>
        </div>
        <p>Följare: ${user.followers} - Följer: ${user.following} <br> Repos: ${user.public_repos}</p>
    </div>`
}

function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    var listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
}

function fetchGithubInformation(event) {
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

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
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
       function(firstResponse, secondResponse) {
        var userData = firstResponse[0];
        var repoData = secondResponse[0];
        $("#gh-user-data").html(userInformationHTML(userData));
        $("#gh-repo-data").html(repoInformationHTML(repoData));
        if (errorResponse.status === 404) {
            $("#gh-user-data").html(`<h2>Ingen användare vid namn ${username} hittades</h2>`);
        } else if(errorResponse.status === 403) {
            var resetTime = new Date(errorResponse.getResponseHeader("x-RateLimit-Reset")*1000);
            $("#gh-user-data").html(`<h4>För många requests, var vänligen vänta till ${resetTime.toLocaleDateString()}</h4>`);
        } else {
            console.error(errorResponse);
            $("#gh-user-data").html(`<h2>Error ${errorResponse.responseJSON.message} hittades</h2>`);
        }
       } 
    )
}