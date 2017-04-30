function loadData() {
    var $body = $('body');
    var $greeting = $('#greeting');

    // get street view pic
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetViewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=1920x1200&location=' + address;
    $body.append('<img class="bgimg" src="' + streetViewUrl + '">');

    // get nyt article headlines
    getNYT(cityStr, address);

    // get wiki
    getWiki(cityStr);

    return false;
};

function getNYT(cityStr, address) {
    // getJSON example.
    // API key: 8287e25b092b427191a1e3ebfcccffbc
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var nytimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?apikey=8287e25b092b427191a1e3ebfcccffbc&sort=newest&q=" + address
    
    // clear out old data before new request
    $nytElem.text("");

    $.getJSON(nytimesUrl, function (data) {
        $nytHeaderElem.text('New York Shitty Times Articles About ' + cityStr);

        var articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        };   
    }).error(function(){
        $nytHeaderElem.text('New York Shitty Times Took a Shit.');
    });
}

function getWiki(cityStr) {
    // .Ajax example.
    var $wikiElem = $('#wikipedia-links');
    var $wikiHeader = $('#wikipedia-header');
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + cityStr + '&callback=wikiCallback';

    // clear out old data before new request
    $wikiElem.text("");

    // error handling for jsonp since error doesn't work
    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text('Failed to get wiki resources.');
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function (response) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;

                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });
}

$('#form-container').submit(loadData);
