async function requestEvent() {
    var name = document.getElementById('name').value;
    var lat = document.getElementById('lati').value;
    var long = document.getElementById('long').value;
    var address = document.getElementById('rua').value;
    var initTime = document.getElementById('ini').value.toString();
    var endTime = document.getElementById('fim').value.toString();
    var nrPart = document.getElementById('number').value;
    var municipio = 'Camara de ' + document.getElementById('municipio').value;
    var summary = document.getElementById('resumo').value;
    myDate = initTime.split("/");
    var newDateIni = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
    var inicio = `${new Date(newDateIni).getTime()}`
    myDate1 = endTime.split("/");
    var newDateFim = myDate1[1] + "/" + myDate1[0] + "/" + myDate1[2];
    var fim = `${new Date(newDateFim).getTime()}`
    var tipoEvento = document.getElementById("tipoEvento").value;

    // Formato DD/MM/AAAA 
    var initTime1 = `${document.getElementById('ini').value}`
    var endTime1 = `${document.getElementById('fim').value}`

    // console.log(name);
    // console.log(lat);
    // console.log(long);
    // console.log(address);
    // console.log(inicio);
    // console.log(fim);
    // console.log(nrPart);
    // console.log(municipio);
    // console.log(summary);

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
            initTime: initTime,
            endTime: endTime,
            nrPart: nrPart,
            municipio: municipio,
            summary: summary,
            eventType: tipoEvento
        })
    }).then(result => {
        console.log(result)
        if (result.status == 200) {
            document.getElementById('eventocriado').click();
            location = location;
        } else {
            document.getElementById('eventonaocriado').click();
        }
        return result.json();
    }).then(data => {
        console.log(data);
    })
}

function getAllEvents() {
    fetch('https://environ-back.herokuapp.com/service/all', {
        method: 'GET',
        credentials: 'include'
    }).then(result => {
        return result.json();
    }).then(response => {
        var array = []
        console.log(response)
        response.forEach(element => {
            var obj = [];

            //Visiveis ao Utilizador

            //Nome Evento data[0]
            if (!element.name || element.name === '') {
                obj.push('null')
            } else {
                obj.push(element.name)
            }
            //Estado Evento data[1]
            if (!element.properties[1].value || element.properties[1].value  === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[1].value )
            }
            //Número de participantes data[2]
            if (!element.properties[4].value  || element.properties[4].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[4].value)
            }
            //Município onde se localiza evento data[3]
            if (!element.properties[8].value  || element.properties[8].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[8].value)
            }
            //Data de Início data[4]
            if (!element.properties[5].value  || element.properties[5].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[5].value.replace("&#x2F;","/"))
            }
            //Estado do Evento data[5]
            if (!element.properties[0].value  || element.properties[0].value === '') {
                obj.push('null')
            } else {
                obj.push(capitalize(element.properties[0].value))
            }

            //Não visiveís ao utilizador 

            //Latitude do evento data[6]
            if (!element.properties[2].value  || element.properties[2].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[2].value)
            }
            //Longitude do evento data[7]
            if (!element.properties[3].value  || element.properties[3].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[3].value)
            }
            //ID Evento data[8]
            if (!element.product_id || element.product_id === '') {
                obj.push('null')
            } else {
                obj.push(element.product_id)
            }
            //Rua do Evento data[9]
            if (!element.properties[7].value  || element.properties[7].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[7].value)
            }
            //Fim do Evento data[10]
            if (!element.properties[6].value  || element.properties[6].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[6].value.replace("&#x2F;","/"))
            }
            //Tipo de evento data[11]
            if (!element.properties[9].value  || element.properties[9].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[9].value)
            }
            //Descrição Evento data[12]
            if (!element.summary || element.summary === '') {
                obj.push('null')
            } else {
                obj.push(element.summary)
            }
            array.push(obj);
        });
        var table = $('#eventosEnviron').DataTable({
            data: array,
            language: {
                paginate: {
                    previous: "<i class='fas fa-angle-left'>",
                    next: "<i class='fas fa-angle-right'>"
                }
            }
            ,columnDefs: [ {
                targets: -1,
                data: null,
                defaultContent:'<button id="eliminar" type="button" class="btn btn-vimeo btn-icon-only rounded-circle"><span class="btn-inner--icon"><i class="fas fa-info"></i></span>'
            },
         ]
        });
        $('#eventosEnviron tbody').on( 'click', 'button', function () {
            $('#modal-notification').modal('show');
            var data = table.row( $(this).parents('tr') ).data();
            console.log(data[4])
            initMapEvent(parseFloat(data[6].replace("," , ".")), parseFloat(data[7].replace("," , ".")))
            document.getElementById("modalEventName").value = data[0];
            document.getElementById("modalEventMunicipio").value = data[3];
            document.getElementById("modalEventLatitude").value = parseFloat(data[6].replace("," , "."));
            document.getElementById("modalEventLongitude").value = parseFloat(data[7].replace("," , "."));
            document.getElementById("modalEventRua").value = data[9];
            document.getElementById("modalEventInicio").value = data[4].replace("&#x2F;","/");
            document.getElementById("modalEventFim").value = data[10].replace("&#x2F;","/");
            document.getElementById("modalEventNumero").value = data[2];
            document.getElementById("modalEventTipo").value = capitalize(data[11]);
            document.getElementById("modalEventResumo").value = capitalize(data[12]);
            document.getElementById("modalEventID").value = data[8];
        } );
    })
}
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }