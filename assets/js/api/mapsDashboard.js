//
// Google maps
//
navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    initMap(lat, lng)
    weather(lat, lng)
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
        var empresas = 0;
        var camaras = 0;
        response.forEach(element => {
            if (!element.role || element.role === '') {
                return false
            } else if (element.role === 'empresa') {
                empresas += 1;
            } else if (element.role === 'camara') {
                camaras += 1;
            }
        })
        document.getElementById('numEmpresas').innerText = empresas;
        document.getElementById('numCamaras').innerText = camaras;
        response.forEach(element => {
            cities.push(element.city);
        })
        const unique = (value, index, self) => {
            return self.indexOf(value) === index
        }
        const uniqueAges = cities.filter(unique)
        var citiesNum = 0;
        for (var i in uniqueAges) {
            if (uniqueAges[i].length > 0) {
                citiesNum += 1
            }
        }
        document.getElementById('numCidades').innerText = citiesNum;
        getAllEvents();
        cities.forEach(element => {
            fetch('https://api.opencagedata.com/geocode/v1/json?q=' + element + '&key=e266ba8c43b346eab28695023463e6ff')
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    var markers = [];
                    var a = {
                        lat: data.results[0].geometry.lat,
                        lng: data.results[0].geometry.lng
                    }
                    for (i = 0; i < cities.length; i++) {
                        var coo = new google.maps.LatLng(a.lat, a.lng)
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

    function getAllEvents() {
        fetch('https://environ-back.herokuapp.com/service/all', {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            return response.json()
        }).then(result => {
            console.log(result)
            document.getElementById("numEventos").innerText = result.length;
        }).catch(error => {
            console.log(error)
        })
    }

    map = new google.maps.Map(map, mapOptions);

}

function weather(latitude, longitude) {
    var key = '{09d0f4bebcac766f59092c6275e8a0fa}';
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&lang=pt&units=metric&appid=09d0f4bebcac766f59092c6275e8a0fa')
        .then(function (resp) {
            return resp.json()
        }) // Convert data to json
        .then(function (data) {
            console.log(data)
            document.getElementById("openLocalizacao").innerText = data.name + " (" + data.sys.country + ")";
            document.getElementById("openTemperatura").innerText = data.main.temp + ' °C';
            document.getElementById("openVento").innerText = data.wind.speed + ' m/s';
            document.getElementById("openPressao").innerText = data.main.pressure + " hPa";
            document.getElementById("openHumidade").innerText = data.main.humidity + " %";
            document.getElementById("openDescricao").innerText = data.weather[0].main + " - " + data.weather[0].description;

        })
        .catch(function () {
            // catch any errors
        }); // 8011224 Guimaraes
}