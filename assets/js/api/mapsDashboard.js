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
        var months  = Array.apply(null, new Array(12)).map(Number.prototype.valueOf, 0);
        console.log(response)
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
            var i = new Date(parseInt(element.createdate)).getMonth()
            console.log(i)

            months[i - 1] += 1;
        })
        
var PointsChart = (function () {

	// Variables

	var $chart = $('#chart-points-admin');


	// Methods
    var maior = Math.max.apply(null, months);
	function init($this) {
		var salesChart = new Chart($this, {
			type: 'line',
			options: {
				scales: {
					yAxes: [{
						gridLines: {
							color: Charts.colors.gray[200],
							zeroLineColor: Charts.colors.gray[200]
						},
						ticks: {
                            autoSkip: false,
                            max: maior+1,
						}
					}]
				}
			},
			data: {
				labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
				datasets: [{
					label: 'Utilizadores',
					data: months,
					pointRadius: 10,
					pointHoverRadius: 15,
                    showLine: false,
                    backgroundColor: '#11CDEF'
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
        getAllEvents(lat, lng);
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

        map = new google.maps.Map(map, mapOptions);
    })
    //Capitalizar primeira letra de String 
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }


    function getAllEvents(lat, lng) {
        map1 = document.getElementById('map-dashboard-eventos');
        var myLatlng1 = new google.maps.LatLng(lat, lng);
        var mapOptions1 = {
            zoom: 8,
            scrollwheel: false,
            center: myLatlng1,
            // mapTypeId: 'google.maps.MapTypeId.ROADMAP',
            // styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":color},{"visibility":"on"}]}]
        }
        fetch('https://environ-back.herokuapp.com/event/all', {
            method: 'GET',
            credentials: 'include'
        }).then(result => {
            return result.json()
        }).then(response => {
            var array = []
            var municipios = [];
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
                //Tipo de evento data[8]
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
            document.getElementById("numEventos").innerText = array.length;
            var markers = [];

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

            var suspenso = 0;
            var pendente = 0;
            var aceite = 0;
            var rejeitado = 0;

            //var data for chart
            var data1 = Array.apply(null, new Array(12)).map(Number.prototype.valueOf, 0);

            array.forEach(element => {
                var coo = new google.maps.LatLng(element[3], element[4])
                markers[element] = new google.maps.Marker({
                    position: coo,
                    map: map1,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    title: element[6]
                });
                if (element[2] == "Aceite") {
                    aceite += 1
                }
                if (element[2] == "Suspenso") {
                    suspenso += 1
                }
                if (element[2] == "Pendente") {
                    pendente += 1
                }
                if (element[2] == "Rejeitado") {
                    rejeitado += 1
                }

                //Chart
                num = parseInt(element[5])
                participantes += num
                var i = (element[7].split("/"))[1]
                if (i.charAt(0) == "0") {
                    i = i.charAt(1)
                }
                i = parseInt(i)
                data1[i - 1] += 1;
                var tipo = element[8]
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
            totalEventos = array.length
            document.getElementById("numEventos").innerText = array.length;
            // document.getElementById("eventosAceites").innerText = aceites;
            // document.getElementById("numParticipantes").innerText = participantes;

            var SalesChart = (function () {

                // Variables

                var $chart = $('#chart-sales-admin');


                // Methods
                var maior1 = Math.max.apply(null, data1);
                function init($this) {
                    var salesChart = new Chart($this, {
                        type: 'line',
                        borderColor: '#FF003F',
                        options: {
                            scales: {
                                yAxes: [{
                                    angleLines: {
                                        display: false
                                    },
                                    gridLines: {
                                        color: Charts.colors.gray[700],
                                        zeroLineColor: Charts.colors.gray[700]
                                    },
                                    ticks: {
                                        max: maior1+1
                                    }
                                }],
                            }
                        },
                        data: {
                            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
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

                var $chart = $('#chart-pie-admin');


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
                                    manifestacaoSTAT.toFixed(2),
                                    limpezaSTAT.toFixed(2),
                                    plantacaoSTAT.toFixed(2),
                                    palestraSTAT.toFixed(2),
                                    congressoSTAT.toFixed(2),
                                    formacaoSTAT.toFixed(2),
                                    cursoSTAT.toFixed(2),
                                    workshopSTAT.toFixed(2),
                                    acaoSTAT.toFixed(2),
                                    feiraSTAT.toFixed(2),
                                    seminarioSTAT.toFixed(2),
                                    outroSTAT.toFixed(2)
                                ],
                                backgroundColor: [
                                    Charts.colors.theme['danger'],
                                    Charts.colors.theme['info'],
                                    Charts.colors.theme['success'],
                                    Charts.colors.theme['warning'],
                                    '#9f7a42',
                                    '#808080',
                                    '#ffc631',
                                    '#172b4d',
                                    '#9dea4f',
                                    '#8965e0',
                                    '#fff62e',
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

            var suspensoSTAT = ((suspenso / totalEventos) * 100);
            var pendenteSTAT = ((pendente / totalEventos) * 100);
            var aceiteSTAT = ((aceite / totalEventos) * 100);
            var rejeitadoSTAT = ((rejeitado / totalEventos) * 100);
            document.getElementById("suspensosEV").innerText = suspenso;
            document.getElementById("pendentesEV").innerText = pendente
            document.getElementById("aceitesEV").innerText = aceite;
            document.getElementById("rejeitadosEV").innerText = rejeitado;
var DoughnutChart = (function () {

	// Variables

	var $chart = $('#chart-doughnut-admin');


	// Methods

	function init($this) {
		var randomScalingFactor = function () {
			return Math.round(Math.random() * 100);
		};

		var doughnutChart = new Chart($this, {
			type: 'doughnut',
			data: {
				labels: [
					'Suspenso',
					'Pendente',
					'Aceite',
					'Rejeitado',
				],
				datasets: [{
					data: [
						suspensoSTAT.toFixed(2),
						pendenteSTAT.toFixed(2),
						aceiteSTAT.toFixed(2),
						rejeitadoSTAT.toFixed(2)
					],
					backgroundColor: [
						Charts.colors.theme['info'],
                        '#ffc631',
						Charts.colors.theme['success'],
						Charts.colors.theme['danger'],
					],
					label: 'Estado evento'
				}],
			},
			options: {
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontColor: "#000000",
                    }
                },
				responsive: true,
				animation: {
					animateScale: true,
					animateRotate: true
				}
			}
		});

		// Save to jQuery object

		$this.data('chart', doughnutChart);

	};


	// Events

	if ($chart.length) {
		init($chart);
	}

})();

        })
        map1 = new google.maps.Map(map1, mapOptions1);
    }

}

function weather(latitude, longitude) {
    var key = '{09d0f4bebcac766f59092c6275e8a0fa}';
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&lang=pt&units=metric&appid=09d0f4bebcac766f59092c6275e8a0fa')
        .then(function (resp) {
            return resp.json()
        }) // Convert data to json
        .then(function (data) {
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