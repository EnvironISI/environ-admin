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
            initTime: initTime1,
            endTime: endTime1,
            nrPart: nrPart,
            municipio: municipio,
            summary: summary,
            eventType: tipoEvento
        })
    }).then(result => {
        console.log(result)
        if (result.status == 200) {
            document.getElementById('eventocriado').click();
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
            if (!element.product_id || element.product_id === '') {
                obj.push('null')
            } else {
                obj.push(element.product_id)
            }
            if (!element.name || element.name === '') {
                obj.push('null')
            } else {
                obj.push(element.name)
            }
            if (!element.properties[1].value || element.properties[1].value  === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[1].value )
            }
            if (!element.properties[4].value  || element.properties[4].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[4].value)
            }
            if (!element.properties[5].value  || element.properties[5].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[5].value)
            }
            if (!element.properties[6].value  || element.properties[6].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[6].value)
            }
            if (!element.properties[8].value  || element.properties[8].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[8].value)
            }
            // if (!element.country || element.country === '') {
            //     obj.push('null')
            // } else {
            //     obj.push(element.country)
            // }
            // if (element.disabled === 'undefined' || element.disabled === '') {
            //     obj.push('null')
            // } else if(element.disabled === false) {
            //     obj.push('Ativo')
            // } else if(element.disabled === true) {
            //     obj.push('Desativo')
            // }
            // //   if(!element.city  || element.city === ''){ obj.push('null') } else { obj.push(element.city) }
            // //   if(!element.setor || element.setor === ''){ obj.push('null') } else { obj.push(element.setor) }
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
            } ]
        });
        $('#eventosEnviron tbody').on( 'click', 'button', function () {
            $('#modal-notification').modal('show');
            // var data = table.row( $(this).parents('tr') ).data();
            // alert( data[0] +"'s salary is: "+ data[ 5 ] );
        } );
    })
}