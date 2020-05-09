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
    var center;
    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 8,
        scrollwheel: false,
        center: myLatlng,
        // mapTypeId: 'google.maps.MapTypeId.ROADMAP',
        // styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":color},{"visibility":"on"}]}]
    }
    fetch('https://environ-back.herokuapp.com/event/camara', {
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
            //Código de pacote data[8]
            if (!element.properties[9].value || element.properties[9].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[9].value)
            }
            array.push(obj);
            //Tipo de evento
            if (!element.properties[11].value || element.properties[11].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[11].value)
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
        var markers = [];
        //Stats

        var manifestacao = 0;
        var limpeza = 0;
        var plantacao = 0;
        var palestra = 0;
        var congresso = 0;
        var formacao = 0;
        var curso = 0;
        var workshop = 0;
        var acao = 0;
        var feira = 0;
        var seminario = 0;
        var outro = 0;
        var totalEventos = 0;
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
            data1[i - 1] += 1;
            var tipo = element[9]
            console.log(tipo)
            if (tipo === 'manifestacao') {
                manifestacao += 1;
            }
            if (tipo === 'limpeza') {
                limpeza += 1;
            }
            if (tipo === 'plantacao') {
                plantacao += 1;
            }
            if (tipo === 'palestra') {
                palestra += 1;
            }
            if (tipo === 'congresso') {
                congresso += 1;
            }
            if (tipo === 'formacao') {
                formacao += 1;
            }
            if (tipo === 'curso') {
                curso += 1;
            }
            if (tipo === 'workshop') {
                workshop += 1;
            }
            if (tipo === 'acao') {
                acao += 1;
            }
            if (tipo === 'feira') {
                feira += 1;
            }
            if (tipo === 'seminario') {
                seminario += 1;
            }
            if (tipo === 'outro') {
                outro += 1;
            }
        })
        console.log(limpeza)
        console.log(congresso)
        document.getElementById("numEventos").innerText = array.length;
        totalEventos = array.length;
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

        var manifestacaoSTAT = ((manifestacao / totalEventos) * 100);
        var limpezaSTAT = ((limpeza / totalEventos) * 100);
        var plantacaoSTAT = ((plantacao / totalEventos) * 100);
        var palestraSTAT = ((palestra / totalEventos) * 100);
        var congressoSTAT = ((congresso / totalEventos) * 100);
        var formacaoSTAT = ((formacao / totalEventos) * 100);
        var cursoSTAT = ((curso / totalEventos) * 100);
        var workshopSTAT = ((workshop / totalEventos) * 100);
        var acaoSTAT = ((acao / totalEventos) * 100);
        var feiraSTAT = ((feira / totalEventos) * 100);
        var seminarioSTAT = ((seminario / totalEventos) * 100);
        var outroSTAT = ((outro / totalEventos) * 100);
        var PieChart = (function () {

            // Variables

            var $chart = $('#chart-pie-hugo');


            // Methods

            function init($this) {
                var randomScalingFactor = function () {
                    return Math.round(Math.random() * 100);
                };

                var pieChart = new Chart($this, {
                    type: 'pie',
                    data: {
                        labels: [
                            'Manifestação',
                            'Limpeza',
                            'Plantação',
                            'Palestra',
                            'Congresso',
                            'Formação',
                            'Curso',
                            'Workshop',
                            'Ação',
                            'Feira',
                            'Seminário',
                            'Outro'
                        ],
                        datasets: [{
                            data: [
                                manifestacaoSTAT,
                                limpezaSTAT,
                                plantacaoSTAT,
                                palestraSTAT,
                                congressoSTAT,
                                formacaoSTAT,
                                cursoSTAT,
                                workshopSTAT,
                                acaoSTAT,
                                feiraSTAT,
                                seminarioSTAT,
                                outroSTAT
                            ],
                            backgroundColor: [
                                Charts.colors.theme['danger'],
                                Charts.colors.theme['primary'],
                                Charts.colors.theme['success'],
                                Charts.colors.theme['warning'],
                                Charts.colors.theme['info'],
                                '#808080',
                                '#eead2d',
                                '#172b4d',
                                '#f5365c',
                                '#8965e0',
                                '#2bffc6',
                                '#f3a4b5'
                            ],
                            label: 'Tipo de evento',
                            options: {
                                legend: {
                                    display: true,
                                    position: 'right',
                                    labels: {
                                        fontColor: "#000000",
                                    }
                                },
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                            }
                        }],
                    },
                    options: {
                        legend: {
                            display: true,
                            labels: {
                                fontColor: '#212529'
                            }
                        }
                    }
                });

                // Save to jQuery object

                $this.data('chart', pieChart);

            };


            // Events

            if ($chart.length) {
                init($chart);
            }

        })();
    })
    map = new google.maps.Map(map, mapOptions);


    fetch('https://environ-back.herokuapp.com/package/camara', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(response => {
        return response.json();
    }).then(result => {
        document.getElementById("numPacotes").innerText = result.length
    })
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