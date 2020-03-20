async function requestEvent() {
    var name = document.getElementById('name').value;
    var lat = document.getElementById('lati').value;
    var long = document.getElementById('long').value;
    var address = document.getElementById('rua').value;
    var initTime = document.getElementById('ini').value;
    var endTime = document.getElementById('fim').value;
    var nrPart = document.getElementById('number').value;
    var municipio = 'Camara de ' + document.getElementById('municipio').value;
    var summary = document.getElementById('resumo').value;
    myDate = initTime.split("/");
    var newDateIni = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
    var inicio = new Date(newDateIni).getTime();
    myDate1 = endTime.split("/");
    var newDateFim = myDate1[1] + "/" + myDate1[0] + "/" + myDate1[2];
    var fim = new Date(newDateFim).getTime();
    console.log(name);
    console.log(lat);
    console.log(long);
    console.log(address);
    console.log(inicio);
    console.log(fim);
    console.log(nrPart);
    console.log(municipio);
    console.log(summary);

    fetch('https://environ-back.herokuapp.com/service/camaras', {
        method: 'GET',
        credentials: 'include'
    }).then(result => {
        return result.json();
    }).then(data => {
        console.log(data)
        data.forEach(muni => {
            if (muni.includes(municipio)) {
                fetch('https://environ-back.herokuapp.com/service/request', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        name: name,
                        latitude: lat,
                        longitude: long,
                        address: address,
                        initTime: inicio,
                        endTime: fim,
                        nrPart: nrPart,
                        municipio: municipio,
                        summary: summary
                    })
                }).then(result => {
                    console.log(result)
                    if(result.status == 200) {
                        document.getElementById('eventocriado').click();
                    }
                    else {
                        document.getElementById('eventonaocriado').click();
                    }
                    return result.json();
                }).then(data => {
                    console.log(data);
                })
            }
        });
    })

}