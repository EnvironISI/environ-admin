    var info;
    var url =
        "https://newsapi.org/v2/everything?" +
        "q=Environment&" +
        "from=2020-03-15&" +
        "pageSize=20&" +
        "sortBy=popularity&" +
        "apiKey=1602c707c35b423f946e6f8c60b76dde";

    var req = new Request(url);
    fetch(req)
        .then(response => response.json())
        .then(data => {
            articles = data;
        });

    function data() {
        if (articles == undefined) {
            console.log("Parsing data.");
        } else {
            clearInterval(loadData);
            generateData(articles);
            dashboardNew()
        }
    }

    const loadData = setInterval(data, 1000);

    function generateData(articles) {
        let newData = articles.articles;
        this.info = newData;
    }

    function dashboardNew() {
        var results = document.getElementById("newDashboard");
        //Random index from news arryay
        var random = Math.floor(Math.random() * info.length)
        results.innerHTML =
            "<img class='card-img-top' src='" + info[random].urlToImage + "' alt='" + info[random].title + "'>"
            +'<div class="card-body">' 
            +'<h5 class="h2 card-title mb-0">' + info[random].title + '</h5>' 
            +'<small class="text-muted"> por ' + info[random].author + ' a ' + new Date(info[random].publishedAt).toLocaleString() + '</small>'
            +'<p class="card-text mt-4">' + info[random].description + '</p>'
            +'<a href="../../pages/all/news.html" class="btn btn-link px-0">Mais notícias</a></div>' 

    }