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

//Capitalizar primeira letra de String 
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
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
    fetch('https://environ-back.herokuapp.com/event/user', {
        method: 'GET',
        credentials: 'include'
    }).then(result => {
        return result.json();
    }).then(response => {
        var array = []
        var municipios = [];
        console.log(response)
        response.forEach(element => {
            var obj = [];
            //Município onde se localiza evento data[0]
            if (!element.properties[8].value || element.properties[8].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[8].value)
                municipios.push(element.properties[8].value)
            }
            //Duração do evento [1]
            if (!element.properties[10].value || element.properties[10].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[10].value)
            }
            //Estado do Evento data[2]
            if (!element.properties[0].value || element.properties[0].value === '') {
                obj.push('null')
            } else {
                obj.push(capitalize(element.properties[0].value))
            }
            //Latitude do evento data[3]
            if (!element.properties[2].value || element.properties[2].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[2].value)
            }
            //Longitude do evento data[4]
            if (!element.properties[3].value || element.properties[3].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[3].value)
            }
            //Número de participantes data[5]
            if (!element.properties[4].value || element.properties[4].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[4].value)
            }
            //Nome data[6]
            if (!element.name || element.name === '') {
                obj.push('null')
            } else {
                obj.push(element.name)
            }
            //Inicio data[7]
            if (!element.properties[5].value || element.properties[5].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[5].value.replace("&#x2F;", "/").replace("&#x2F;", "/"))
            }
            array.push(obj);
        });
        var aceites = 0;
        var participantes = 0;
        const unique = (value, index, self) => {
            return self.indexOf(value) === index
        }
        const uniqueAges = municipios.filter(unique)
        var municipioNumb = 0;
        for (var i in uniqueAges) {
            if (uniqueAges[i].length > 0) {
                municipioNumb += 1
            }
        }
        document.getElementById("numMunicipios").innerText = municipioNumb;
        var markers = [];

        //var data for chart
        var data1 = Array.apply(null, new Array(12)).map(Number.prototype.valueOf, 0);

        array.forEach(element => {
            var coo = new google.maps.LatLng(element[3], element[4])
            markers[element] = new google.maps.Marker({
                position: coo,
                map: map,
                draggable: false,
                animation: google.maps.Animation.DROP,
                title: element[6]
            });
            if (element[2] == "Aceite") {
                aceites += 1
            }

            //Chart
            num = parseInt(element[5])
            participantes += num
            var i = (element[7].split("/"))[1]
            if (i.charAt(0) == "0") {
                i = i.charAt(1)
            }
            i = parseInt(i)
            console.log(i)
            data1[i-1] += 1;
        })
        console.log(data1)
        document.getElementById("numEventos").innerText = array.length;
        document.getElementById("eventosAceites").innerText = aceites;
        document.getElementById("numParticipantes").innerText = participantes;
        
var SalesChart = (function () {

    // Variables

    var $chart = $('#chart-sales-hugo');


    // Methods

    function init($this) {
        var salesChart = new Chart($this, {
            type: 'line',
            options: {
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: Charts.colors.gray[700],
                            zeroLineColor: Charts.colors.gray[700]
                        },
                        ticks: {

                        }
                    }]
                }
            },
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outrubro', 'Novembro', 'Dezembro'],
                datasets: [{
                    label: 'Eventos',
                    data: data1
                }]
            }
        });

        // Save to jQuery object

        $this.data('chart', salesChart);

    };


    // Events

    if ($chart.length) {
        init($chart);
    }

})();
    })
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