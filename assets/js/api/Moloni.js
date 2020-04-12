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
            if (!element.properties[1].value || element.properties[1].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[1].value)
            }
            //Número de participantes data[2]
            if (!element.properties[4].value || element.properties[4].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[4].value)
            }
            //Município onde se localiza evento data[3]
            if (!element.properties[8].value || element.properties[8].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[8].value)
            }
            //Data de Início data[4]
            if (!element.properties[5].value || element.properties[5].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[5].value.replace("&#x2F;", "/"))
            }
            //Estado do Evento data[5]
            if (!element.properties[0].value || element.properties[0].value === '') {
                obj.push('null')
            } else {
                obj.push(capitalize(element.properties[0].value))
            }

            //Não visiveís ao utilizador 

            //Latitude do evento data[6]
            if (!element.properties[2].value || element.properties[2].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[2].value)
            }
            //Longitude do evento data[7]
            if (!element.properties[3].value || element.properties[3].value === '') {
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
            if (!element.properties[7].value || element.properties[7].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[7].value)
            }
            //Fim do Evento data[10]
            if (!element.properties[6].value || element.properties[6].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[6].value.replace("&#x2F;", "/"))
            }
            //Tipo de evento data[11]
            if (!element.properties[9].value || element.properties[9].value === '') {
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
            },
            columnDefs: [{
                targets: -1,
                data: null,
                defaultContent: '<button id="infoEvent" type="button" class="btn btn-vimeo btn-icon-only rounded-circle"><span class="btn-inner--icon"><i class="fas fa-info"></i></span>    <button id="modalQRCode" type="button" class="btn btn-pinterest btn-icon-only rounded-circle"><span class="btn-inner--icon"><i class="fas fa-qrcode"></i></span>'
            }, ]
        });
        $('#eventosEnviron tbody').on('click', 'button', function () {
            var action = this.id;
            if (action == 'infoEvent') {
                $('#modal-notification').modal('show');
                var data = table.row($(this).parents('tr')).data();
                console.log(data[4])
                initMapEvent(parseFloat(data[6].replace(",", ".")), parseFloat(data[7].replace(",", ".")))
                document.getElementById("modalEventName").value = data[0];
                document.getElementById("modalEventMunicipio").value = data[3];
                document.getElementById("modalEventLatitude").value = parseFloat(data[6].replace(",", "."));
                document.getElementById("modalEventLongitude").value = parseFloat(data[7].replace(",", "."));
                document.getElementById("modalEventRua").value = data[9];
                document.getElementById("modalEventInicio").value = data[4].replace("&#x2F;", "/");
                document.getElementById("modalEventFim").value = data[10].replace("&#x2F;", "/");
                document.getElementById("modalEventNumero").value = data[2];
                document.getElementById("modalEventTipo").value = capitalize(data[11]);
                document.getElementById("modalEventResumo").value = capitalize(data[12]);
                document.getElementById("modalEventID").value = data[8];
            }

            if (action == 'modalQRCode') {
                $('#modal-default').modal('show');
                var data = table.row($(this).parents('tr')).data();
                var url = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + data[8]
                document.getElementById("contentQRCode").src = url;
                toDataURL(
                    url,
                    function (dataUrl) {
                        document.getElementById("downloadAnchor").href = dataUrl;
                        document.getElementById("downloadAnchor").download = data[0] + ".png"
                    }
                )

            }
        });
    })
}

//Transformar em base64 para posterior dowload (sendo a imagem um url sem extensão não poderia ser direto)
function toDataURL(src, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        img.src = src;
    }
}

//Capitalizar primeira letra de String 
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

//Todos os eventos por Câmara Municipal

function getAllEventsCamara() {
    fetch('https://environ-back.herokuapp.com/service/camara', {
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
            if (!element.properties[1].value || element.properties[1].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[1].value)
            }
            //Número de participantes data[2]
            if (!element.properties[4].value || element.properties[4].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[4].value)
            }
            //Município onde se localiza evento data[3]
            if (!element.properties[8].value || element.properties[8].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[8].value)
            }
            //Data de Início data[4]
            if (!element.properties[5].value || element.properties[5].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[5].value.replace("&#x2F;", "/"))
            }
            //Estado do Evento data[5]
            if (!element.properties[0].value || element.properties[0].value === '') {
                obj.push('null')
            } else {
                obj.push(capitalize(element.properties[0].value))
            }

            //Não visiveís ao utilizador 

            //Latitude do evento data[6]
            if (!element.properties[2].value || element.properties[2].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[2].value)
            }
            //Longitude do evento data[7]
            if (!element.properties[3].value || element.properties[3].value === '') {
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
            if (!element.properties[7].value || element.properties[7].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[7].value)
            }
            //Fim do Evento data[10]
            if (!element.properties[6].value || element.properties[6].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[6].value.replace("&#x2F;", "/"))
            }
            //Tipo de evento data[11]
            if (!element.properties[9].value || element.properties[9].value === '') {
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
            },
            columnDefs: [{
                targets: -1,
                data: null,
                defaultContent: '<button id="infoEvent" type="button" class="btn btn-vimeo btn-icon-only rounded-circle"><span class="btn-inner--icon"><i class="fas fa-info"></i></span>    <button id="modalQRCode" type="button" class="btn btn-pinterest btn-icon-only rounded-circle"><span class="btn-inner--icon"><i class="fas fa-qrcode"></i></span>'
            }, ]
        });
        $('#eventosEnviron tbody').on('click', 'button', function () {
            var action = this.id;
            if (action == 'infoEvent') {
                $('#modal-notification').modal('show');
                var data = table.row($(this).parents('tr')).data();
                console.log(data[4])
                initMapEvent(parseFloat(data[6].replace(",", ".")), parseFloat(data[7].replace(",", ".")))
                document.getElementById("modalEventName").value = data[0];
                document.getElementById("modalEventMunicipio").value = data[3];
                document.getElementById("modalEventLatitude").value = parseFloat(data[6].replace(",", "."));
                document.getElementById("modalEventLongitude").value = parseFloat(data[7].replace(",", "."));
                document.getElementById("modalEventRua").value = data[9];
                document.getElementById("modalEventInicio").value = data[4].replace("&#x2F;", "/");
                document.getElementById("modalEventFim").value = data[10].replace("&#x2F;", "/");
                document.getElementById("modalEventNumero").value = data[2];
                document.getElementById("modalEventTipo").value = capitalize(data[11]);
                document.getElementById("modalEventResumo").value = capitalize(data[12]);
                document.getElementById("modalEventID").value = data[8];
            }

            if (action == 'modalQRCode') {
                $('#modal-default').modal('show');
                var data = table.row($(this).parents('tr')).data();
                var url = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + data[8]
                document.getElementById("contentQRCode").src = url;
                toDataURL(
                    url,
                    function (dataUrl) {
                        document.getElementById("downloadAnchor").href = dataUrl;
                        document.getElementById("downloadAnchor").download = data[0] + ".png"
                    }
                )

            }
        });
    })
}

//Aceitar Evento Admin

function aceitarEventoAdmin() {
    var id = document.getElementById("modalEventID").value.toString();
    console.log(id)
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "Está prestes a aceitar a realização do evento " + document.getElementById("modalEventName").value + "!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, aceitar evento!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            fetch('https://environ-back.herokuapp.com/service/admin/acception', {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({
                    eventId: id,
                    accept: true
                })
            }).then(response => {
                return response.json();
            }).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Evento aceite!',
                'A realização do evento foi aceite com sucesso!',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'Ação cancelada com sucesso',
                'error'
            )
        }
    })
}

//Rejeitar Evento Admin

function rejeitarEventoAdmin() {
    var id = document.getElementById("modalEventID").value;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "Está prestes a rejeitar a realização do evento " + document.getElementById("modalEventName").value + "!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, rejeitar evento!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            fetch('https://environ-back.herokuapp.com/service/admin/acception', {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({
                    eventId: id,
                    accept: false
                })
            }).then(response => {
                return response.json();
            }).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Evento rejeitado!',
                'A realização do evento foi rejeitada com sucesso!',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'Ação cancelada com sucesso',
                'error'
            )
        }
    })
}


//Aceitar Evento Câmara Municipal

function aceitarEventoCamara() {
    var id = document.getElementById("modalEventID").value.toString();
    console.log(id)
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "Está prestes a aceitar a realização do evento " + document.getElementById("modalEventName").value + "!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, aceitar evento!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            fetch('https://environ-back.herokuapp.com/service/camara/acception', {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({
                    eventId: id,
                    accept: true
                })
            }).then(response => {
                return response.json();
            }).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Evento aceite!',
                'A realização do evento foi aceite com sucesso!',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'Ação cancelada com sucesso',
                'error'
            )
        }
    })
}

//Rejeitar Evento Camara Municipal

function rejeitarEventoCamara() {
    var id = document.getElementById("modalEventID").value;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "Está prestes a rejeitar a realização do evento " + document.getElementById("modalEventName").value + "!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, rejeitar evento!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            fetch('https://environ-back.herokuapp.com/service/camara/acception', {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({
                    eventId: id,
                    accept: false
                })
            }).then(response => {
                return response.json();
            }).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Evento rejeitado!',
                'A realização do evento foi rejeitada com sucesso!',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'Ação cancelada com sucesso',
                'error'
            )
        }
    })
}


//Eventos por utilizador

function getAllAcceptedEvents() {
    var array = []
    fetch('https://environ-back.herokuapp.com/service/all', {
        method: 'GET',
        credentials: 'include'
    }).then(result => {
        return result.json();
    }).then(response => {
        console.log(response)
        var results = document.getElementById("eventsByUser")
        response.forEach(element => {
            var tipo;
            var image;
            if(element.properties[9].value === 'manifestacao') {
                tipo = 'Manifestação'
                image = "../../assets/img/default/manifestation.jpg"
            }
            if(element.properties[9].value === 'limpeza') {
                tipo = 'Limpeza'
                image = "../../assets/img/default/limpeza.jpg"
            }
            if(element.properties[9].value === 'plantacao') {
                tipo = 'Plantação'
                image = "../../assets/img/default/planting.jpg"
            }
            if(element.properties[9].value === 'palestra') {
                tipo = 'Palestra'
                image = "../../assets/img/default/palestra.jpg"
            }
            if(element.properties[9].value === 'congresso') {
                tipo = 'Congresso'
                image = "../../assets/img/default/congresso.jpg"
            }
            if(element.properties[9].value === 'formacao') {
                tipo = 'Formação'
                image = "../../assets/img/default/formation.jpg"
            }
            if(element.properties[9].value === 'curso') {
                tipo = 'Curso'
                image = "../../assets/img/default/limpeza.jpeg"
            }
            if(element.properties[9].value === 'workshop') {
                tipo = 'Workshop'
                image = "../../assets/img/default/workshop.jpg"
            }
            if(element.properties[9].value === 'acao') {
                tipo = 'Ação'
                image = "../../assets/img/default/acao.jpg"
            }
            if(element.properties[9].value === 'feira') {
                tipo = 'Feira'
                image = "../../assets/img/default/feira.jpg"
            }
            if(element.properties[9].value === 'seminario') {
                tipo = 'Seminário'
                image = "../../assets/img/default/seminario.jpg"
            }
            if(element.properties[9].value === 'outro') {
                tipo = 'Outro'
                image = "../../assets/img/default/outro.jpg"
            }
            if(element.properties[0].value === 'Aceite') {
            results.innerHTML +=
                "<div class='col-lg-3'>" +
                "<div class='card'>" +
                "<img class='card-img-top' src='" + image + "' alt='" + tipo + "'>" +
                "<ul class='list-group list-group-flush'>" +
                "<li class='list-group-item'>" + tipo + "</li>" +
                "<li class='list-group-item'><b>" + element.properties[4].value + " participantes" + "</b></li>" +
                "<li class='list-group-item'>" + element.properties[5].value.replace("&#x2F;", "/") + "</li>" +
                "<li class='list-group-item'>" + element.properties[8].value + "</li>" +
                "</ul>" +
                "<div class='card-body'>" +
                "<h3 class='card-title mb-3'>" + element.name + "</h3>" +
                "<p class='card-text mb-4'>" + element.summary + "</p>" +
                " <a href=''class='btn btn-primary'>Mais informações</a>" +
                "</div></div></div>"
            }
        })
    })
}

function getUserEvents() {
    fetch('https://environ-back.herokuapp.com/service/user', {
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
            if (!element.properties[1].value || element.properties[1].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[1].value)
            }
            //Número de participantes data[2]
            if (!element.properties[4].value || element.properties[4].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[4].value)
            }
            //Município onde se localiza evento data[3]
            if (!element.properties[8].value || element.properties[8].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[8].value)
            }
            //Data de Início data[4]
            if (!element.properties[5].value || element.properties[5].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[5].value.replace("&#x2F;", "/"))
            }
            //Estado do Evento data[5]
            if (!element.properties[0].value || element.properties[0].value === '') {
                obj.push('null')
            } else {
                obj.push(capitalize(element.properties[0].value))
            }

            //Não visiveís ao utilizador 

            //Latitude do evento data[6]
            if (!element.properties[2].value || element.properties[2].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[2].value)
            }
            //Longitude do evento data[7]
            if (!element.properties[3].value || element.properties[3].value === '') {
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
            if (!element.properties[7].value || element.properties[7].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[7].value)
            }
            //Fim do Evento data[10]
            if (!element.properties[6].value || element.properties[6].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[6].value.replace("&#x2F;", "/"))
            }
            //Tipo de evento data[11]
            if (!element.properties[9].value || element.properties[9].value === '') {
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
            },
            columnDefs: [{
                targets: -1,
                data: null,
                defaultContent: '<button id="infoEvent" type="button" class="btn btn-vimeo btn-icon-only rounded-circle"><span class="btn-inner--icon"><i class="fas fa-info"></i></span>    <button id="modalQRCode" type="button" class="btn btn-pinterest btn-icon-only rounded-circle"><span class="btn-inner--icon"><i class="fas fa-qrcode"></i></span>'
            }, ]
        });
        $('#eventosEnviron tbody').on('click', 'button', function () {
            var action = this.id;
            if (action == 'infoEvent') {
                $('#modal-notification').modal('show');
                var data = table.row($(this).parents('tr')).data();
                console.log(data[4])
                initMapEvent(parseFloat(data[6].replace(",", ".")), parseFloat(data[7].replace(",", ".")))
                document.getElementById("modalEventName").value = data[0];
                document.getElementById("modalEventMunicipio").value = data[3];
                document.getElementById("modalEventLatitude").value = parseFloat(data[6].replace(",", "."));
                document.getElementById("modalEventLongitude").value = parseFloat(data[7].replace(",", "."));
                document.getElementById("modalEventRua").value = data[9];
                document.getElementById("modalEventInicio").value = data[4].replace("&#x2F;", "/");
                document.getElementById("modalEventFim").value = data[10].replace("&#x2F;", "/");
                document.getElementById("modalEventNumero").value = data[2];
                document.getElementById("modalEventTipo").value = capitalize(data[11]);
                document.getElementById("modalEventResumo").value = capitalize(data[12]);
                document.getElementById("modalEventID").value = data[8];
            }

            if (action == 'modalQRCode') {
                $('#modal-default').modal('show');
                var data = table.row($(this).parents('tr')).data();
                var url = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + data[8]
                document.getElementById("contentQRCode").src = url;
                toDataURL(
                    url,
                    function (dataUrl) {
                        document.getElementById("downloadAnchor").href = dataUrl;
                        document.getElementById("downloadAnchor").download = data[0] + ".png"
                    }
                )

            }
        });
    })
}