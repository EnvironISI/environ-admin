var info;
function news() {
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
        setCardData();
    }).catch(error => {
        console.log(error)
    })
}

    function setCardData() {
        var results = document.getElementById("news");
        for (var obj in info) {
            //Loop through the object to get each objects data
            results.innerHTML +=
                "<div class='col-lg-3'>" +
                "<div class='card'>" +
                "<img class='card-img-top' src='" + info[obj].urlToImage + "' alt='" + info[obj].title + "'>" +
                "<ul class='list-group list-group-flush'>" +
                "<li class='list-group-item'><b>" + info[obj].author + "</b></li>" +
                "<li class='list-group-item'>" + new Date(info[obj].publishedAt).toLocaleString() + "</li>" +
                "</ul>" +
                "<div class='card-body'>" +
                "<h3 class='card-title mb-3'>" + info[obj].title + "</h3>" +
                "<p class='card-text mb-4'>" + info[obj].description + "</p>" +
                " <a href='" + info[obj].url + "'class='btn btn-primary'>Ver notícia</a>" +
                "</div></div></div>"

        }
    }
