var fileTagPacote = document.getElementById("filetagPacote"),
    helo = document.getElementById("visualizar");

function changePreview() {
    if (fileTagPacote != null) {
        fileTagPacote.addEventListener("change", function () {
            editPhotoJasmin(this);
        });
    }
}


//Get photo URL with Storage Firebase
function editPhotoJasmin(input) {
    var reader;
    if (input.files && input.files[0]) {
        reader = new FileReader();
        reader.onload = function (e) {
            helo.setAttribute('src', e.target.result);
            console.log(e.target.result)
            document.getElementById("escondido").style.display = "inline";
        }
        reader.readAsDataURL(input.files[0]);
        var storage = firebase.storage();
        var storageRef = storage.ref();
        // File or Blob named mountains.jpg
        var file = input.files[0];
        // Create the file metadata
        var metadata = {
            contentType: 'image/jpeg'
        };
        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, function () {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(async function (downloadURL) {
                console.log(downloadURL)
                document.getElementById("input-photo-url").value = downloadURL;
            });
        });
    }
}

async function createPackage() {
    var itemKey = document.getElementById('itemKey').value;
    var description = document.getElementById('description').value;
    var summary = `NrColaboradores: ${document.getElementById('numberColaboradores').value} | NrParticipantes: ${document.getElementById('number').value} | TipoEvento: ${document.getElementById('tipoEvento').value} | EntidadesAutorização: ${document.getElementById('autorizacao').value} | EntidadesParticipação: ${document.getElementById('participacao').value}`
    var image = document.getElementById('input-photo-url').value;


    await fetch("https://environ-back.herokuapp.com/package/create", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            itemKey: itemKey,
            description: description,
            summary: summary,
            image: image
        })
    }).then(response => {
        return response.json();
    }).then(result => {
        document.getElementById('pacotecriado').click();
        setTimeout(function () {
            location.reload();
        }, 2000);
    }).catch(error => {
        console.log(error)
        document.getElementById('pacotenaocriado').click();
        setTimeout(function () {
            location.reload();
        }, 2000);
    })
}

//getPackages para o evento
function getPackagesEvento() {
    if (document.getElementById('municipio').value != "") {
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
            console.log(result)

            //HTML ID
            var results = document.getElementById("pacotesCamara")
            results.innerHTML = "";

            result.forEach(element => {

                //Function to replace at certain string index
                String.prototype.replaceAt = function (index, replacement) {
                    if (index >= this.length) {
                        return this.valueOf();
                    }

                    var chars = this.split('');
                    chars[index] = replacement;
                    return chars.join('');
                }

                //Name
                var name = element.name;

                //Description
                var description = element.description;

                //Image
                var image = element.image.replace(/&#x2F;/gi, "/");

                //Spliting summary into the 4 information it has (Number of Participants, Type of Event, Authorization Entities and Participation Entitities)
                var summary = element.summary.split("|");
                console.log(summary)

                //Formation Number of Colaboradores [number]
                var numberColaboradores0 = summary[0].split(":");
                var numberColaboradores = numberColaboradores0[1].replaceAt(0, "").replace(" ", "");

                //Formation Number of Participants    [number]
                var number0 = summary[1].split(":");
                var number = number0[1].replaceAt(0, "").replace(" ", "");

                //Formating Type of Event    [tipo]
                var tipo0 = summary[2].split(":");
                var tipo = tipo0[1].replaceAt(0, "").replace(" ", "")
                if (tipo === 'manifestacao') {
                    tipo = 'Manifestação'
                }
                if (tipo === 'limpeza') {
                    tipo = 'Limpeza'
                }
                if (tipo === 'plantacao') {
                    tipo = 'Plantação'
                }
                if (tipo === 'palestra') {
                    tipo = 'Palestra'
                }
                if (tipo === 'congresso') {
                    tipo = 'Congresso'
                }
                if (tipo === 'formacao') {
                    tipo = 'Formação'
                }
                if (tipo === 'curso') {
                    tipo = 'Curso'
                }
                if (tipo === 'workshop') {
                    tipo = 'Workshop'
                }
                if (tipo === 'acao') {
                    tipo = 'Ação'
                }
                if (tipo === 'feira') {
                    tipo = 'Feira'
                }
                if (tipo === 'seminario') {
                    tipo = 'Seminário'
                }
                if (tipo === 'outro') {
                    tipo = 'Outro'
                }


                //Formating Authorization Entities   [autorizacao]
                var autorizacao0 = summary[3].split(":");
                var autorizacao = autorizacao0[1].replaceAt(0, "").replace(/,/gi, ", ")

                //Formating Participation Entities   [participacao]
                var participacao0 = summary[4].split(":");
                var participacao = participacao0[1].replaceAt(0, "").replace(/,/gi, ", ");

                console.log(numberColaboradores)

                results.innerHTML +=
                    `<div class="col-lg-6">
                <div class="card card-stats">
                <!-- Card body -->s
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">${tipo}</h5>
                        <span class="h2 font-weight-bold mb-0">${name}</span>
                    </div>
                    <div class="col-auto">
                    <img width="170px" height="auto" alt="" src="${image}">
                    </div>
                </div>
                <p class="mt-3 mb-0 text-sm text-hugo">
                    <span class="text-nowrap text-hugo"><b>Colaboradores:</b> ${numberColaboradores}</span><br>
                    <span class="text-nowrap text-hugo"><b>Participantes:</b> ${number}</span><br>
                    <div>
                    <span class='badge badge-pill badge-danger'>Autorização:</span><span class="text-hugo"> ${autorizacao}</span><br>
                    <span class='badge badge-pill badge-success'>Participação:</span><span class="text-hugo"> ${participacao}</span><br>
                    </div>
                    </p>
                    <div class="row">
                    <div class="col-auto mr-auto"></div>
                    <div class="col-auto"><button onclick='campoCodigo(\"${name}\")' type='button' class='btn btn-default ml-auto'>Adicionar</button>"</div>
                    </div>
            </div>
        </div>`
            })
        }).catch(error => {
            console.log(error)
        })
    }
}

function requestPackage() {
    var municipio = document.getElementById('toMunicipio').value;
    var msg = document.getElementById('msg').value;

    fetch('https://environ-back.herokuapp.com/package/sendMail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ municipio: municipio, msg: msg })
    }).then(response => {
        return response.json();
    }).then(() => {
        document.getElementById("successMsg").click();
        window.location.reload();
    }).catch(() => {
        document.getElementById("errorMsg").click();
    })
}

function campoCodigo(name) {
    console.log(name)
    document.getElementById('codigoPacote').value = name;
    document.getElementById("fecharModal").click()
}

//getPackages
function getPackages() {
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
        result.forEach(element => {
            //HTML ID
            console.log(element)
            var results = document.getElementById("packages")

            //Function to replace at certain string index
            String.prototype.replaceAt = function (index, replacement) {
                if (index >= this.length) {
                    return this.valueOf();
                }

                var chars = this.split('');
                chars[index] = replacement;
                return chars.join('');
            }

            //Name
            var name = element.name;

            //Description
            var description = element.description;

            //Image
            var image = element.image.replace(/&#x2F;/gi, "/");

            //Spliting summary into the 4 information it has (Number of Participants, Type of Event, Authorization Entities and Participation Entitities)
            var summary = element.summary.split("|");
            console.log(summary)

            //Formation Number of Colaboradores [number]
            var numberColaboradores0 = summary[0].split(":");
            var numberColaboradores = numberColaboradores0[1].replaceAt(0, "").replace(" ", "");

            //Formation Number of Participants    [number]
            var number0 = summary[1].split(":");
            var number = number0[1].replaceAt(0, "").replace(" ", "");

            //Formating Type of Event    [tipo]
            var tipo0 = summary[2].split(":");
            var tipo = tipo0[1].replaceAt(0, "").replace(" ", "")
            if (tipo === 'manifestacao') {
                tipo = 'Manifestação'
            }
            if (tipo === 'limpeza') {
                tipo = 'Limpeza'
            }
            if (tipo === 'plantacao') {
                tipo = 'Plantação'
            }
            if (tipo === 'palestra') {
                tipo = 'Palestra'
            }
            if (tipo === 'congresso') {
                tipo = 'Congresso'
            }
            if (tipo === 'formacao') {
                tipo = 'Formação'
            }
            if (tipo === 'curso') {
                tipo = 'Curso'
            }
            if (tipo === 'workshop') {
                tipo = 'Workshop'
            }
            if (tipo === 'acao') {
                tipo = 'Ação'
            }
            if (tipo === 'feira') {
                tipo = 'Feira'
            }
            if (tipo === 'seminario') {
                tipo = 'Seminário'
            }
            if (tipo === 'outro') {
                tipo = 'Outro'
            }


            //Formating Authorization Entities   [autorizacao]
            var autorizacao0 = summary[3].split(":");
            var autorizacao = autorizacao0[1].replaceAt(0, "").replace(/,/gi, ", ")

            //Formating Participation Entities   [participacao]
            var participacao0 = summary[4].split(":");
            var participacao = participacao0[1].replaceAt(0, "").replace(/,/gi, ", ");

            //HTML
            results.innerHTML +=
                "<div class='col-md-3'>" +
                "<div class='card'>" +
                "<img class='card-img-top' src='" + image + "' alt='" + tipo + "'>" +
                "<ul class='list-group list-group-flush'>" +
                "<li class='list-group-item'>" + tipo + "</li>" +
                "<li class='list-group-item'><b>" + numberColaboradores + " colaboradores" + "</b></li>" +
                "<li class='list-group-item'><b>Mais do que " + number + " participantes" + "</b></li>" +
                "<li class='list-group-item'><span class='badge badge-pill badge-danger'> Autorização: </span> " + autorizacao + "</li>" +
                "<li class='list-group-item'><span class='badge badge-pill badge-success'> Participação: </span> " + participacao + "</li>" +
                "</ul>" +
                "<div class='card-body'>" +
                "<h3 class='card-title mb-3'>" + name + "</h3>" +
                "<p class='card-text mb-4'>" + description + "</p>" +
                "</div></div></div>"
        })
    }).catch(error => {
        console.log(error)
    })
}

function runScript(e) {
    //See notes about 'which' and 'key'
    if (e.keyCode == 13) {
        getPackagesByName();
        return false;
    }
}

//getPackages by name
function getPackagesByName() {
    var itemKey = document.getElementById("itemKey").value;
    fetch('https://environ-back.herokuapp.com/package/' + itemKey, {
        method: 'GET',
        credentials: 'include'
    }).then(response => {
        return response.json();
    }).then(result => {
        console.log(results)
        //HTML ID
        var results = document.getElementById("packages")

        //Name
        var name = result.name;

        //Description
        var description = result.description;

        //Image
        var image = result.image.replace(/&#x2F;/gi, "/");

        //Spliting summary into the 4 information it has (Number of Participants, Type of Event, Authorization Entities and Participation Entitities)
        var summary = result.summary.split("|");

        //Formation Number of Participants    [number]
        var number0 = summary[0].split(":");
        var number = number0[1].replaceAt(0, "").replace(" ", "");

        //Formating Type of Event    [tipo]
        var tipo0 = summary[1].split(":");
        var tipo = tipo0[1].replaceAt(0, "").replace(" ", "")
        if (tipo === 'manifestacao') {
            tipo = 'Manifestação'
        }
        if (tipo === 'limpeza') {
            tipo = 'Limpeza'
        }
        if (tipo === 'plantacao') {
            tipo = 'Plantação'
        }
        if (tipo === 'palestra') {
            tipo = 'Palestra'
        }
        if (tipo === 'congresso') {
            tipo = 'Congresso'
        }
        if (tipo === 'formacao') {
            tipo = 'Formação'
        }
        if (tipo === 'curso') {
            tipo = 'Curso'
        }
        if (tipo === 'workshop') {
            tipo = 'Workshop'
        }
        if (tipo === 'acao') {
            tipo = 'Ação'
        }
        if (tipo === 'feira') {
            tipo = 'Feira'
        }
        if (tipo === 'seminario') {
            tipo = 'Seminário'
        }
        if (tipo === 'outro') {
            tipo = 'Outro'
        }


        //Formating Authorization Entities   [autorizacao]
        var autorizacao0 = summary[2].split(":");
        var autorizacao = autorizacao0[1].replaceAt(0, "").replace(/,/gi, ", ")

        //Formating Participation Entities   [participacao]
        var participacao0 = summary[3].split(":");
        var participacao = participacao0[1].replaceAt(0, "").replace(/,/gi, ", ");

        //HTML
        results.innerHTML =
            "<div class='col-md-3'>" +
            "<div class='card'>" +
            "<img class='card-img-top' src='" + image + "' alt='" + tipo + "'>" +
            "<ul class='list-group list-group-flush'>" +
            "<li class='list-group-item'>" + tipo + "</li>" +
            "<li class='list-group-item'><b>Mais do que " + number + " participantes" + "</b></li>" +
            "<li class='list-group-item'><span class='badge badge-pill badge-danger'> Autorização: </span> " + autorizacao + "</li>" +
            "<li class='list-group-item'><span class='badge badge-pill badge-success'> Participação: </span> " + participacao + "</li>" +
            "</ul>" +
            "<div class='card-body'>" +
            "<h3 class='card-title mb-3'>" + name + "</h3>" +
            "<p class='card-text mb-4'>" + description + "</p>" +
            "</div></div></div>"
    }).catch(error => {
        document.getElementById("naoExistente").click()
    })
}

//getPackages
function getPackagesByCamara() {
    fetch('https://environ-back.herokuapp.com/package/camara', {
        method: 'GET',
        credentials: 'include'
    }).then(response => {
        return response.json();
    }).then(result => {
        console.log(result)
        result.forEach(element => {
            //HTML ID
            var results = document.getElementById("packages")

            //Function to replace at certain string index
            String.prototype.replaceAt = function (index, replacement) {
                if (index >= this.length) {
                    return this.valueOf();
                }

                var chars = this.split('');
                chars[index] = replacement;
                return chars.join('');
            }

            //Name
            var name = element.name;

            //Description
            var description = element.description;

            //Image
            var image = element.image.replace(/&#x2F;/gi, "/");

            //Spliting summary into the 4 information it has (Number of Participants, Type of Event, Authorization Entities and Participation Entitities)
            var summary = element.summary.split("|");

            //Formation Number of Participants    [number]
            var number0 = summary[0].split(":");
            var number = number0[1].replaceAt(0, "").replace(" ", "");

            //Formating Type of Event    [tipo]
            var tipo0 = summary[1].split(":");
            var tipo = tipo0[1].replaceAt(0, "").replace(" ", "")
            if (tipo === 'manifestacao') {
                tipo = 'Manifestação'
            }
            if (tipo === 'limpeza') {
                tipo = 'Limpeza'
            }
            if (tipo === 'plantacao') {
                tipo = 'Plantação'
            }
            if (tipo === 'palestra') {
                tipo = 'Palestra'
            }
            if (tipo === 'congresso') {
                tipo = 'Congresso'
            }
            if (tipo === 'formacao') {
                tipo = 'Formação'
            }
            if (tipo === 'curso') {
                tipo = 'Curso'
            }
            if (tipo === 'workshop') {
                tipo = 'Workshop'
            }
            if (tipo === 'acao') {
                tipo = 'Ação'
            }
            if (tipo === 'feira') {
                tipo = 'Feira'
            }
            if (tipo === 'seminario') {
                tipo = 'Seminário'
            }
            if (tipo === 'outro') {
                tipo = 'Outro'
            }


            //Formating Authorization Entities   [autorizacao]
            var autorizacao0 = summary[2].split(":");
            var autorizacao = autorizacao0[1].replaceAt(0, "").replace(/,/gi, ", ")

            //Formating Participation Entities   [participacao]
            var participacao0 = summary[3].split(":");
            var participacao = participacao0[1].replaceAt(0, "").replace(/,/gi, ", ");

            //HTML
            results.innerHTML +=
                "<div class='col-md-3'>" +
                "<div class='card'>" +
                "<img class='card-img-top' src='" + image + "' alt='" + tipo + "'>" +
                "<ul class='list-group list-group-flush'>" +
                "<li class='list-group-item'>" + tipo + "</li>" +
                "<li class='list-group-item'><b>Mais do que " + number + " participantes" + "</b></li>" +
                "<li class='list-group-item'><span class='badge badge-pill badge-danger'> Autorização: </span> " + autorizacao + "</li>" +
                "<li class='list-group-item'><span class='badge badge-pill badge-success'> Participação: </span> " + participacao + "</li>" +
                "</ul>" +
                "<div class='card-body'>" +
                "<h3 class='card-title mb-3'>" + name + "</h3>" +
                "<p class='card-text mb-4'>" + description + "</p>" +
                "</div></div></div>"
        })
    }).catch(error => {
        console.log(error)
    })
}

function runScript(e) {
    //See notes about 'which' and 'key'
    if (e.keyCode == 13) {
        getPackagesByName();
        return false;
    }
}

function deletePackage() {
    var itemKey = document.getElementById("itemKey").value;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "Está prestes a eliminar o pacote de entidades com o código: " + itemKey + " irreversivelmente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, eliminar pacote!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            fetch('https://environ-back.herokuapp.com/package/delete/' + itemKey, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    eventId: itemKey,
                })
            }).then(response => {
                return response.json();
            }).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Pacote eliminado!',
                'O pacote de entidades foi eliminado irreversivelmente!',
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

