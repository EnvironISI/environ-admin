var info;
var manualInfo;
var city;
var manualCity;
//window.onload(getLocation());

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
       console.log("Geolocation is not supported by this browser.");
    }
}

function runScript(e) {
    //See notes about 'which' and 'key'
    if (e.keyCode == 13) {
        getInputValue();
        return false;
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    latitude = latitude.toString();
    longitude = longitude.toString();
    weather(latitude, longitude);
}

function getInputValue() {
    var input = document.getElementById('inputCidade').value;
    document.getElementById('inputCidade').value = "";
    manualWeather(input);
}

function weather(latitude, longitude) {
    var key = '{09d0f4bebcac766f59092c6275e8a0fa}';
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+ latitude +'&lon='+ longitude +'&lang=pt&units=metric&appid=09d0f4bebcac766f59092c6275e8a0fa')
        .then(function (resp) {
            return resp.json()
        }) // Convert data to json
        .then(function (data) {
            this.info = data.list;
            this.city = data.city.name;
            console.log(info)
            setTimelineData();
        })
        .catch(function () {
            // catch any errors
        }); // 8011224 Guimaraes
}

function manualWeather(input) {
    var key = '{09d0f4bebcac766f59092c6275e8a0fa}';
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+ input + '&lang=pt&units=metric&appid=09d0f4bebcac766f59092c6275e8a0fa')
        .then(function (resp) {
            return resp.json()
        }) // Convert data to json
        .then(function (data) {
            this.manualInfo = data.list;
            this.manualCity = input;
            setManualTimelineData();
        })
        .catch(function () {
            // catch any errors
        }); // 8011224 Guimaraes
}
function setTimelineData() {
    var results = document.getElementById("weather");
    results.innerHTML = "";
        for (var obj in info) {
            //Loop through the object to get each objects data
            results.innerHTML +=

            '<div class="timeline-block">' +
            '<span class="timeline-step badge-success">' +
            '<i class="fas fa-cloud-sun" style="color:#1d84b5"></i></span>' + 
            '<div class="timeline-content">' +
              '<span class="badge badge-pill badge-success">' + new Date(info[obj].dt * 1000).toLocaleString() + 
              '</span><h5 class=" mt-3 mb-0">' + this.city + '</h5>' + 
              '<p class=" text-sm mt-1 mb-0">Temperatura: ' + info[obj].main.temp + '°C</p>' + 
              '<p class=" text-sm mt-1 mb-0">Condições: ' + info[obj].weather[0].main + '</p>' + 
              '<p class=" text-sm mt-1 mb-0">Descrição: ' + info[obj].weather[0].description + '</p>' + 
              '<p class=" text-sm mt-1 mb-0">Vento: ' + info[obj].wind.speed + 'Km/h</p>' + 
              '</div></div>'
    }
}


function setManualTimelineData() {
    var results = document.getElementById("weather");
    results.innerHTML = "";
        for (var obj in manualInfo) {
            //Loop through the object to get each objects data
            results.innerHTML +=

            '<div class="timeline-block">' +
            '<span class="timeline-step badge-success">' +
            '<i class="fas fa-cloud-sun" style="color:#1d84b5;;"></i></span>' + 
            '<div class="timeline-content">' +
            '<span class="badge badge-pill badge-success">' + new Date(manualInfo[obj].dt * 1000).toLocaleString() + 
              '</span><h5 class=" mt-3 mb-0">' + this.manualCity + '</h5>' + 
              '<p class=" text-sm mt-1 mb-0">Temperatura: ' + manualInfo[obj].main.temp + '°C</p>' + 
              '<p class=" text-sm mt-1 mb-0">Condições: ' + manualInfo[obj].weather[0].main + '</p>' + 
              '<p class=" text-sm mt-1 mb-0">Descrição: ' + manualInfo[obj].weather[0].description + '</p>' + 
              '<p class=" text-sm mt-1 mb-0">Vento: ' + manualInfo[obj].wind.speed + 'Km/h</p>' + 
              '</div></div>'
    }
}

