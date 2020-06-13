var info;
    fetch("https://environ-back.herokuapp.com/user/news", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then((response) => {
        return response.clone().json();
    }).then(result => {
        console.log(result.articles);
        info = result.articles;
        dashboardNew();
    }).catch(error => {
        console.log(error)
    })

function dashboardNew() {
    var results = document.getElementById("newDashboard");
    //Random index from news arryay
    var random = Math.floor(Math.random() * info.length)
    results.innerHTML =
        "<img class='card-img-top' src='" + info[random].urlToImage + "' alt='" + info[random].title + "'>" +
        '<div class="card-body">' +
        '<h5 class="h2 card-title mb-0">' + info[random].title + '</h5>' +
        '<small class="text-muted"> por ' + info[random].author + ' a ' + new Date(info[random].publishedAt).toLocaleString() + '</small>' +
        '<p class="card-text mt-4">' + info[random].description + '</p>' +
        '<a href="../../pages/all/news.html" class="btn btn-link px-0">Mais notícias</a></div>'

}