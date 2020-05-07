async function requestEvent() {
    var duration = document.getElementById('duration').value;
    var name = document.getElementById('name').value;
    var lat = document.getElementById('lati').value;
    var long = document.getElementById('long').value;
    var address = document.getElementById('rua').value;
    var initTime = document.getElementById('ini').value.toString();
    var endTime = document.getElementById('fim').value.toString();
    var municipio = document.getElementById('municipio').value;
    var summary = document.getElementById('resumo').value;
    myDate = initTime.split("/");
    var newDateIni = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
    var inicio = `${new Date(newDateIni).getTime()}`
    myDate1 = endTime.split("/");
    var newDateFim = myDate1[1] + "/" + myDate1[0] + "/" + myDate1[2];
    var fim = `${new Date(newDateFim).getTime()}`;
    var nrPart = document.getElementById("nrPart").value;
    var codigoPacote = document.getElementById("codigoPacote").value;
    if (codigoPacote == "") {
        codigoPacote = "Nenhum"
    }
    // Formato DD/MM/AAAA 
    // var initTime1 = `${document.getElementById('ini').value}`
    // var endTime1 = `${document.getElementById('fim').value}`

    // console.log(name);
    // console.log(lat);
    // console.log(long);
    // console.log(address);
    // console.log(inicio);
    // console.log(fim);
    // console.log(nrPart);
    // console.log(municipio);
    // console.log(summary);

    fetch('https://environ-back.herokuapp.com/event/request', {
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
            package: codigoPacote,
            duration: duration
        })
    }).then(result => {
        console.log(result)
        if (result.status == 200) {
            document.getElementById('eventocriado').click();
            // setTimeout(function () {
            //     location.reload();
            // }, 2000);
        } else {
            document.getElementById('eventonaocriado').click();
            setTimeout(function () {
                location.reload();
            }, 2000);
        }
        return result.json();
    }).then(data => {
        console.log(data);
    })
}

function getAllEvents() {
    fetch('https://environ-back.herokuapp.com/event/all', {
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
            //Visiveis ao Utilizador

            //Nome Evento data[0]
            if (!element.name || element.name === '') {
                obj.push('null')
            } else {
                obj.push(element.name)
            }
            //Email organizacao data[1]
            if (!element.properties[1].value || element.properties[1].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[1].value)
            }
            //Município onde se localiza evento data[2]
            if (!element.properties[8].value || element.properties[8].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[8].value)
            }
            //Data de Início data[3]
            if (!element.properties[5].value || element.properties[5].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[5].value.replace("&#x2F;", "/"))
            }
            //Fim do Evento data[4]
            if (!element.properties[6].value || element.properties[6].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[6].value.replace("&#x2F;", "/"))
            }
            //Duração do evento [5]
            if (!element.properties[10].value || element.properties[10].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[10].value)
            }
            //Estado do Evento data[6]
            if (!element.properties[0].value || element.properties[0].value === '') {
                obj.push('null')
            } else {
                obj.push(capitalize(element.properties[0].value))
            }

            //Não visiveís ao utilizador 

            //Latitude do evento data[7]
            if (!element.properties[2].value || element.properties[2].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[2].value)
            }
            //Longitude do evento data[8]
            if (!element.properties[3].value || element.properties[3].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[3].value)
            }
            //ID Evento data[9]
            if (!element.product_id || element.product_id === '') {
                obj.push('null')
            } else {
                obj.push(element.product_id)
            }
            //Rua do Evento data[10]
            if (!element.properties[7].value || element.properties[7].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[7].value)
            }
            //Código de pacote data [11]
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
            //Número de participantes data[13]
            if (!element.properties[4].value || element.properties[4].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[4].value)
            }
            array.push(obj);
        });
        console.log(array)
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
                initMapEvent(parseFloat(data[7].replace(",", ".")), parseFloat(data[8].replace(",", ".")))
                document.getElementById("modalEventName").value = data[0];
                document.getElementById("modalEventMunicipio").value = data[2];
                document.getElementById("modalEventLatitude").value = parseFloat(data[7].replace(",", "."));
                document.getElementById("modalEventLongitude").value = parseFloat(data[8].replace(",", "."));
                document.getElementById("modalEventRua").value = data[10];
                document.getElementById("modalEventInicio").value = data[3].replace("&#x2F;", "/");
                document.getElementById("modalEventFim").value = data[4].replace("&#x2F;", "/");
                document.getElementById("modalEventNumero").value = data[13];
                document.getElementById("modalEventTipo").value = capitalize(data[11]);
                document.getElementById("modalEventResumo").value = capitalize(data[12]);
                document.getElementById("modalEventID").value = data[9];
                document.getElementById("modalDuration").value = data[5];
                if (data[6] == "Aceite") {
                    document.getElementById("rejeitarAdmin").style.display = "none"
                    document.getElementById("aceitarAdmin").style.display = "none"
                    document.getElementById("eliminarAdmin").style.display = "none"
                }
                if (data[6] == "Rejeitado") {
                    document.getElementById("rejeitarAdmin").style.display = "none"
                    document.getElementById("aceitarAdmin").style.display = "none"
                    document.getElementById("eliminarAdmin").style.display = "inline"
                }
                if (data[6] == "Suspenso") {
                    document.getElementById("rejeitarAdmin").style.display = "inline"
                    document.getElementById("aceitarAdmin").style.display = "inline"
                    document.getElementById("eliminarAdmin").style.display = "inline"
                }
                if (data[6] == "Pendente") {
                    document.getElementById("rejeitarAdmin").style.display = "none"
                    document.getElementById("aceitarAdmin").style.display = "none"
                    document.getElementById("eliminarAdmin").style.display = "none"
                }
            }

            if (action == 'modalQRCode') {
                var data = table.row($(this).parents('tr')).data();
                if (data[6] == "Aceite") {
                    $('#modal-default').modal('show');
                    var url = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + data[9]
                    document.getElementById("contentQRCode").src = url;
                    toDataURL(
                        url,
                        function (dataUrl) {
                            document.getElementById("downloadAnchor").href = dataUrl;
                            document.getElementById("downloadAnchor").download = data[0] + ".png"
                        }
                    )

                } else {
                    $('#modal-error').modal('show');
                }
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
    fetch('https://environ-back.herokuapp.com/event/camara', {
        method: 'GET',
        credentials: 'include'
    }).then(result => {
        return result.json();
    }).then(response => {
        var array = []
        console.log(response)
        response.forEach(element => {
            if (element.properties[0].value != 'Suspenso') {
                var obj = [];

                //Visiveis ao Utilizador

                //Nome Evento data[0]
                if (!element.name || element.name === '') {
                    obj.push('null')
                } else {
                    obj.push(element.name)
                }
                //Email organizacao data[1]
                if (!element.properties[1].value || element.properties[1].value === '') {
                    obj.push('null')
                } else {
                    obj.push(element.properties[1].value)
                }
                //Município onde se localiza evento data[2]
                if (!element.properties[8].value || element.properties[8].value === '') {
                    obj.push('null')
                } else {
                    obj.push(element.properties[8].value)
                }
                //Data de Início data[3]
                if (!element.properties[5].value || element.properties[5].value === '') {
                    obj.push('null')
                } else {
                    obj.push(element.properties[5].value.replace("&#x2F;", "/"))
                }
                //Fim do Evento data[4]
                if (!element.properties[6].value || element.properties[6].value === '') {
                    obj.push('null')
                } else {
                    obj.push(element.properties[6].value.replace("&#x2F;", "/"))
                }
                //Duração do evento [5]
                if (!element.properties[10].value || element.properties[10].value === '') {
                    obj.push('null')
                } else {
                    obj.push(element.properties[10].value)
                }
                //Estado do Evento data[6]
                if (!element.properties[0].value || element.properties[0].value === '') {
                    obj.push('null')
                } else {
                    obj.push(capitalize(element.properties[0].value))
                }

                //Não visiveís ao utilizador 

                //Latitude do evento data[7]
                if (!element.properties[2].value || element.properties[2].value === '') {
                    obj.push('null')
                } else {
                    obj.push(element.properties[2].value)
                }
                //Longitude do evento data[8]
                if (!element.properties[3].value || element.properties[3].value === '') {
                    obj.push('null')
                } else {
                    obj.push(element.properties[3].value)
                }
                //ID Evento data[9]
                if (!element.product_id || element.product_id === '') {
                    obj.push('null')
                } else {
                    obj.push(element.product_id)
                }
                //Rua do Evento data[10]
                if (!element.properties[7].value || element.properties[7].value === '') {
                    obj.push('null')
                } else {
                    obj.push(element.properties[7].value)
                }
                //Código de pacote data [11]
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
                //Número de participantes data[13]
                if (!element.properties[4].value || element.properties[4].value === '') {
                    obj.push('null')
                } else {
                    obj.push(element.properties[4].value)
                }
                array.push(obj);
            }
        });
        console.log(array)
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
                initMapEvent(parseFloat(data[7].replace(",", ".")), parseFloat(data[8].replace(",", ".")))
                document.getElementById("modalEventName").value = data[0];
                document.getElementById("modalEventMunicipio").value = data[2];
                document.getElementById("modalEventLatitude").value = parseFloat(data[7].replace(",", "."));
                document.getElementById("modalEventLongitude").value = parseFloat(data[8].replace(",", "."));
                document.getElementById("modalEventRua").value = data[10];
                document.getElementById("modalEventInicio").value = data[3].replace("&#x2F;", "/");
                document.getElementById("modalEventFim").value = data[4].replace("&#x2F;", "/");
                document.getElementById("modalEventNumero").value = data[13];
                document.getElementById("modalEventTipo").value = capitalize(data[11]);
                document.getElementById("modalEventResumo").value = capitalize(data[12]);
                document.getElementById("modalEventID").value = data[9];
                document.getElementById("modalDuration").value = data[5];
                if (data[6] == "Aceite" || "Rejeitado") {
                    document.getElementById("rejeitarCamara").style.display = "none"
                    document.getElementById("aceitarCamara").style.display = "none"
                }
                if (data[6] == "Pendente") {
                    document.getElementById("rejeitarCamara").style.display = "inline"
                    document.getElementById("aceitarCamara").style.display = "inline"
                }
            }
            if (action == 'modalQRCode') {
                var data = table.row($(this).parents('tr')).data();
                if (data[6] == "Aceite") {
                    $('#modal-default').modal('show');
                    var url = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + data[9]
                    document.getElementById("contentQRCode").src = url;
                    toDataURL(
                        url,
                        function (dataUrl) {
                            document.getElementById("downloadAnchor").href = dataUrl;
                            document.getElementById("downloadAnchor").download = data[0] + ".png"
                        }
                    )

                } else {
                    $('#modal-error').modal('show');
                }
            }
            if (action == 'verificationAction') {
                var data = table.row($(this).parents('tr')).data();
                if (data[6] == "Aceite") {
                    $('#modal-verification').modal('show');

                    //getPackages by name
                    fetch('https://environ-back.herokuapp.com/package/' + data[11], {
                        method: 'GET',
                        credentials: 'include'
                    }).then(response => {
                        return response.json();
                    }).then(result => {
                        //Function to replace at certain string index
                        String.prototype.replaceAt = function (index, replacement) {
                            if (index >= this.length) {
                                return this.valueOf();
                            }

                            var chars = this.split('');
                            chars[index] = replacement;
                            return chars.join('');
                        }

                        //Spliting summary into the 4 information it has (Number of Participants, Type of Event, Authorization Entities and Participation Entitities)
                        var summary = result.summary.split("|");
                        //Formation Number of Participants    [number]
                        var number0 = summary[0].split(":");
                        var number = number0[1].replaceAt(0, "").replace(" ", "");
                        document.getElementById("numColaboradoresSuposto").value = number;
                    }).catch(error => {
                        console.log(error);
                    })
                } else {
                    $('#modal-error').modal('show');
                }
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
            fetch('https://environ-back.herokuapp.com/event/admin/acception', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    eventId: id,
                    accept: "true"
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
            ).then(function () {
                location.reload();
            })
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'Ação cancelada com sucesso',
                'error'
            ).then(function () {
                location.reload();
            })
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
            fetch('https://environ-back.herokuapp.com/event/admin/acception', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    eventId: id,
                    accept: "false"
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
            ).then(function () {
                location.reload();
            })
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'Ação cancelada com sucesso',
                'error'
            ).then(function () {
                location.reload();
            })
        }
    })
}


//Aceitar Evento Câmara Municipal

function aceitarEventoCamara() {
    var id = document.getElementById("modalEventID").value.toString();
    var initDate = document.getElementById("data_inicial").value
    var endDate = document.getElementById("data_final").value
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
            fetch('https://environ-back.herokuapp.com/event/camara/acception', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    eventId: id,
                    accept: "true",
                    initDate: initDate,
                    endDate: endDate
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
            ).then(function () {
                location.reload();
            })
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'Ação cancelada com sucesso',
                'error'
            ).then(function () {
                location.reload();
            })
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
            fetch('https://environ-back.herokuapp.com/event/camara/acception', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    eventId: id,
                    accept: "false"
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
            ).then(function () {
                location.reload();
            })
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'Ação cancelada com sucesso',
                'error'
            ).then(function () {
                location.reload();
            })
        }
    })
}

//Apagar evento por ADMIN


function apagarEventoAdmin() {
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
        text: "Está prestes a eliminar o evento " + document.getElementById("modalEventName").value + " irreversivelmente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, eliminar evento!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            fetch('https://environ-back.herokuapp.com/admin/delete/event', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    eventId: id,
                })
            }).then(response => {
                return response.json();
            }).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Evento eliminado!',
                'O evento foi eliminado irreversivelmente!',
                'success'
            ).then(function () {
                location.reload();
            })
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'Ação cancelada com sucesso',
                'error'
            ).then(function () {
                location.reload();
            })
        }
    })
}


//Eventos por utilizador

function getAllAcceptedEvents() {
    var array = []
    fetch('https://environ-back.herokuapp.com/event/all', {
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
            if (element.properties[9].value === 'manifestacao') {
                tipo = 'Manifestação'
                image = "../../assets/img/default/manifestation.jpg"
            }
            if (element.properties[9].value === 'limpeza') {
                tipo = 'Limpeza'
                image = "../../assets/img/default/limpeza.jpg"
            }
            if (element.properties[9].value === 'plantacao') {
                tipo = 'Plantação'
                image = "../../assets/img/default/planting.jpg"
            }
            if (element.properties[9].value === 'palestra') {
                tipo = 'Palestra'
                image = "../../assets/img/default/palestra.jpg"
            }
            if (element.properties[9].value === 'congresso') {
                tipo = 'Congresso'
                image = "../../assets/img/default/congresso.jpg"
            }
            if (element.properties[9].value === 'formacao') {
                tipo = 'Formação'
                image = "../../assets/img/default/formation.jpg"
            }
            if (element.properties[9].value === 'curso') {
                tipo = 'Curso'
                image = "../../assets/img/default/limpeza.jpeg"
            }
            if (element.properties[9].value === 'workshop') {
                tipo = 'Workshop'
                image = "../../assets/img/default/workshop.jpg"
            }
            if (element.properties[9].value === 'acao') {
                tipo = 'Ação'
                image = "../../assets/img/default/acao.jpg"
            }
            if (element.properties[9].value === 'feira') {
                tipo = 'Feira'
                image = "../../assets/img/default/feira.jpg"
            }
            if (element.properties[9].value === 'seminario') {
                tipo = 'Seminário'
                image = "../../assets/img/default/seminario.jpg"
            }
            if (element.properties[9].value === 'outro') {
                tipo = 'Outro'
                image = "../../assets/img/default/outro.jpg"
            }
            if (element.properties[0].value === 'Aceite') {
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
    fetch('https://environ-back.herokuapp.com/event/user', {
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
            //Email organizacao data[1]
            if (!element.properties[1].value || element.properties[1].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[1].value)
            }
            //Município onde se localiza evento data[2]
            if (!element.properties[8].value || element.properties[8].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[8].value)
            }
            //Data de Início data[3]
            if (!element.properties[5].value || element.properties[5].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[5].value.replace("&#x2F;", "/"))
            }
            //Fim do Evento data[4]
            if (!element.properties[6].value || element.properties[6].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[6].value.replace("&#x2F;", "/"))
            }
            //Duração do evento [5]
            if (!element.properties[10].value || element.properties[10].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[10].value)
            }
            //Estado do Evento data[6]
            if (!element.properties[0].value || element.properties[0].value === '') {
                obj.push('null')
            } else {
                obj.push(capitalize(element.properties[0].value))
            }

            //Não visiveís ao utilizador 

            //Latitude do evento data[7]
            if (!element.properties[2].value || element.properties[2].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[2].value)
            }
            //Longitude do evento data[8]
            if (!element.properties[3].value || element.properties[3].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[3].value)
            }
            //ID Evento data[9]
            if (!element.product_id || element.product_id === '') {
                obj.push('null')
            } else {
                obj.push(element.product_id)
            }
            //Rua do Evento data[10]
            if (!element.properties[7].value || element.properties[7].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[7].value)
            }
            //Código de pacote data [11]
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
            //Número de participantes data[13]
            if (!element.properties[4].value || element.properties[4].value === '') {
                obj.push('null')
            } else {
                obj.push(element.properties[4].value)
            }
            array.push(obj);
        });
        console.log(array)
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
                initMapEvent(parseFloat(data[7].replace(",", ".")), parseFloat(data[8].replace(",", ".")))
                document.getElementById("modalEventName").value = data[0];
                document.getElementById("modalEventMunicipio").value = data[2];
                document.getElementById("modalEventLatitude").value = parseFloat(data[7].replace(",", "."));
                document.getElementById("modalEventLongitude").value = parseFloat(data[8].replace(",", "."));
                document.getElementById("modalEventRua").value = data[10];
                document.getElementById("modalEventInicio").value = data[3].replace("&#x2F;", "/");
                document.getElementById("modalEventFim").value = data[4].replace("&#x2F;", "/");
                document.getElementById("modalEventNumero").value = data[13];
                document.getElementById("modalEventTipo").value = capitalize(data[11]);
                document.getElementById("modalEventResumo").value = capitalize(data[12]);
                document.getElementById("modalEventID").value = data[9];
                document.getElementById("modalDuration").value = data[5];
                if (data[6] == "Aceite") {
                    document.getElementById("docAutorizacao").style.display = "inline";
                    document.getElementById("idEvento").value = data[9];
                    console.log(document.getElementById("idEvento").value)
                }
            }
            if (action == 'modalQRCode') {
                var data = table.row($(this).parents('tr')).data();
                if (data[6] == "Aceite") {
                    $('#modal-default').modal('show');
                    var url = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + data[8]
                    document.getElementById("contentQRCode").src = url;
                    toDataURL(
                        url,
                        function (dataUrl) {
                            document.getElementById("downloadAnchor").href = dataUrl;
                            document.getElementById("downloadAnchor").download = data[0] + ".png"
                        }
                    )

                } else {
                    $('#modal-error').modal('show');
                }
            }
        });
    })
}


//Requisitar autorizacao
function requisitarAutorizacao() {
    var id = document.getElementById("idEvento").value;
    fetch("https://environ-back.herokuapp.com/event/download", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                eventId: id,
            })
        })
        .then(response => response.blob())
        .then(blob => {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "autorizacao.pdf";
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove(); //afterwards we remove the element again
        }).catch(error => {
            console.log(error)
        })
}

function showModalDate() {
    $('#modal-notification').modal('hide');
    $('#modal-form-date').modal('show');
    document.getElementById("data_inicial").value =  document.getElementById("modalEventInicio").value
    document.getElementById("data_final").value = document.getElementById("modalEventFim").value
    document.getElementById("modalEventID").value
}