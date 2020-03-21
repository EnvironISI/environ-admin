//
// Google maps
//
navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    initMap(lat, lng)
}

function initMap(lat, lng) {

    map = document.getElementById('map-dashboard');

    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 8,
        scrollwheel: false,
        center: myLatlng,
        // mapTypeId: 'google.maps.MapTypeId.ROADMAP',
        // styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":color},{"visibility":"on"}]}]
    }

    var cities = [];
    fetch('https://environ-back.herokuapp.com/admin/users', {
        method: 'GET',
        credentials: 'include'
    }).then(result => {
        return result.json();
    }).then(response => {
        response.forEach(element => {
            cities.push(element.city);
        })
        cities.forEach(element => {
            fetch('https://api.opencagedata.com/geocode/v1/json?q=' + element + '&key=e266ba8c43b346eab28695023463e6ff')
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                var markers=[];
                var a = { lat: data.results[0].geometry.lat, lng:data.results[0].geometry.lng}
                for (i = 0; i < cities.length; i++) { 
                    var coo = new google.maps.LatLng(a.lat, a.lng)
                    console.log(coo)
                    markers[i] = new google.maps.Marker({
                    position: coo,
                    map: map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    title: 'Utilizador'
                });
            }
            })
            .catch(function () {
                // catch any errors
            }); // 8011224 Guimaraes
        
        })
    })

    map = new google.maps.Map(map, mapOptions);

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
    google.maps.event.addListener(marker, 'dragend', function () {
        getPo();
    });

    function getPo() {
        document.getElementById('lati').value = marker.getPosition().lat();
        document.getElementById('long').value = marker.getPosition().lng()
    }
}

if ($map.length) {
    google.maps.event.addDomListener(window, 'load', initMap);
}



