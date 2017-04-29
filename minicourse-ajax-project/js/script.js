function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // get street view pic
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetViewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=1920x1200&location=' + address;
    $body.append('<img class="bgimg" src="' + streetViewUrl + '">');

    // get nyt article headlines
    $.getJSON( "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + address, function ( data ) {
        var items = []
        $.each( data, function( key, val ) {
            
        });
    });

    return false;
};

$('#form-container').submit(loadData);
