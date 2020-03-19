async function requestEvent() {
    var lat = document.getElementById('lati').value;
    var long = document.getElementById('long').value;
    var address = document.getElementById('rua').value;
    var initTime = document.getElementById('ini').value;
    var endTime = document.getElementById('fim').value;
    var nrPart = document.getElementById('number').value;
    var municipio = 'Camara de '+ document.getElementById('municipio').value;
    console.log(municipio);
    var summary = document.getElementById('resumo').value;

    fetch('https://environ-back.herokuapp.com/service/camaras', {
        method: 'GET',
        credentials: 'include'
    }).then(result => {
        return result.json();
    }).then(data => {
        console.log(data)
        data.forEach(muni => {
            if(muni.includes(municipio)){
                    fetch('https://environ-back.herokuapp.com/service/request', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        latitude: lat,
                        longitude: long,
                        address: address,
                        initTime: initTime,
                        endTime: endTime,
                        nrPart: nrPart,
                        municipio: municipio,
                        summary: summary
                    })
                }).then(result => {
                    console.log(result.json())
                    return result.json();
                }).then(data => {
                    console.log(data);
                })
            }
        });
    })

}