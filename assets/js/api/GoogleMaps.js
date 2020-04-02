//
// Google maps
//

function getInputValue() {
    var input = document.getElementById('inputLocal').value;
    document.getElementById('inputLocal').value = "";
    fetch('https://api.opencagedata.com/geocode/v1/json?q=' + input + '&key=e266ba8c43b346eab28695023463e6ff')
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            var lat = data.results[0].geometry.lat; // this will be a string
            var lng = data.results[0].geometry.lng;
            initMap(lat, lng);
            test(lat, lng)
        })
        .catch(function () {
            // catch any errors
        }); // 8011224 Guimaraes

}

function test(lat, lng) {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyCsz3ly0l0NIr5XQvwQHoBwQTya4VWcDC0')
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            data.results.forEach(result => {
                result.types.forEach(type => {
                    if (type == "administrative_area_level_2") {
                        document.getElementById('municipio').value = result.address_components[0].long_name;
                    } else if (type == "street_address") {
                        document.getElementById('rua').value = result.formatted_address;
                    }
                });
            })
        })
        .catch(function () {
            // catch any errors
        }); // 8011224 Guimaraes

}

function runScript(e) {
    //See notes about 'which' and 'key'
    if (e.keyCode == 13) {
        getInputValue();
        return false;
    }
}
//
// Google maps
//
function getGeolocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    initMap(lat, lng)
}

function initMap(lat, lng) {

    map = document.getElementById('map-evento');

    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 13,
        scrollwheel: false,
        center: myLatlng,
        // mapTypeId: 'google.maps.MapTypeId.ROADMAP',
        // styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":color},{"visibility":"on"}]}]
    }

    map = new google.maps.Map(map, mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        title: 'Hello World!',
    });

    var contentString = '<div class="info-window-content"><h2>SUP</h2>' +
        '<p>SUP BRO</p></div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
    google.maps.event.addListener(marker, 'dragend', function () {
        getPo();
    });

    function getPo() {
        var lat = marker.getPosition().lat();
        var lng = marker.getPosition().lng();
        document.getElementById('lati').value = lat;
        document.getElementById('long').value = lng;
        test(lat, lng);
    }
}

function initMapEvent(lat, lng) {

    map = document.getElementById('map-evento');

    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 15,
        scrollwheel: false,
        center: myLatlng,
        // mapTypeId: 'google.maps.MapTypeId.ROADMAP',
        // styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":color},{"visibility":"on"}]}]
    }

    map = new google.maps.Map(map, mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        title: 'Hello World!',
    });

    var contentString = '<div class="info-window-content"><h2>SUP</h2>' +
        '<p>SUP BRO</p></div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
    google.maps.event.addListener(marker, 'dragend', function () {
        getPo();
    });

    function getPo() {
        var lat = marker.getPosition().lat();
        var lng = marker.getPosition().lng();
        document.getElementById('lati').value = lat;
        document.getElementById('long').value = lng;
        test(lat, lng);
    }
}