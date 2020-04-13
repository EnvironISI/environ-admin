var fileTag = document.getElementById("filetag"),
    preview = document.getElementById("preview");
let user;
var articles;

//Registar Utilizador
function registarUtilizador() {
    var name = document.getElementById("registerName").value;
    var email = document.getElementById("registerEmail").value;
    var phone = document.getElementById("registerTelefone").value;
    var city = document.getElementById("registerCidade").value;
    var country = document.getElementById("registerPais").value;
    var sector = "";
    var responsible = document.getElementById("registerResponsible").value;
    var nif = document.getElementById("registerNif").value;
    var type = 'empresa';
    var password = document.getElementById("registerPassword").value;
    var confirmPassword = document.getElementById("registerRepeatPassword").value;
    if (name != "" && email != "" && phone != "" && city != "" && country != "" && responsible != "" && password != "" && confirmPassword != "") {
        if (CheckPasswordStrength(password) == true) {
            if (confirmPassword == password) {
                fetch("https://environ-back.herokuapp.com/register", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phone: phone,
                        city: city,
                        country: country,
                        sector: sector,
                        responsible: responsible,
                        nif: nif,
                        type: type,
                        password: password
                    })
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    return data
                }).then(() => {
                    document.getElementById('registerDiv').innerHTML =
                        `<div class="row justify-content-center">
                        <div class="col-lg-6 col-md-8">
                            <div class="card bg-secondary border-0">
                                <div class="card-body px-lg-5 py-lg-5">
                                    <div class="text-center text-muted mb-4">
                                        <h4>Confirmação por email</h4>
                                    </div>
                                    <div class="text-center text-muted mb-4">
                                        <small>Verifique o seu email para posterior ativação da conta</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                    document.getElementById("SUCCESS").click();
                }).catch(error => {
                    document.getElementById("ERROR").click();
                })
            } else {
                document.getElementById("NOTWORKING").click();
            }
        } else {
            document.getElementById("WORKING").click();
        }
    } else {
        document.getElementById("EMPTYFIELDS").click();
    }
}

//Login Utilizador
async function login() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    await fetch("https://environ-back.herokuapp.com/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then((response) => {
            var myStatus = response.status;
            if (myStatus == 400) {
                document.getElementById("VERIFIQUEEMAIL").click();
                throw new Error("verificar email");
            }
            if (myStatus != 200 && myStatus != 400) {
                document.getElementById("FALSELOGIN").click();
                throw new Error("credenciais");
            }
            return response.json()
        })
        .then((data) => {
            console.log(data)
            window.location.assign("../../pages/all/profile.html");
        }).catch(error => {
            return error;
        })
}

//Recuperar Password Utilizador
function recoverPassword() {
    var email = document.getElementById("recoverEmail").value;
    fetch("https://environ-back.herokuapp.com/user/recoverPassword", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            email: email,
        })
    }).then((response) => {
        if (response.ok) {
            sessionStorage.clear;
            document.getElementById("recoverEmail").value = "";
            document.getElementById("SUCCESS").click();
            setTimeout(function () {
                window.location.assign('/pages/all/login.html')
            }, 2000);
        }
        return response.clone().json();
    }).then(result => {
        console.log(result.msg);
    }).catch(error => {
        console.log(error)
    })
}

//Mandar verificação por email
async function requestVerification() {
    var email = document.getElementById('requestedEmail').value;
    await fetch("https://environ-back.herokuapp.com/requestEmailVerification", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            email: email,
        })
    }).then((response) => {
        if (response.ok) {
            window.location.assign('/pages/all/login.html');
        }
    })
}

//Logout Utilizador
async function logout() {
    await fetch('https://environ-back.herokuapp.com/logout', {
        method: 'GET',
        credentials: 'include'
    }).then(response => {
        if (response.ok) {
            window.location.assign("../../pages/all/login.html")
        }
    })
}

//Get photo URL with Storage Firebase
function edit(input) {
    var reader;
    if (input.files && input.files[0]) {
        reader = new FileReader();
        reader.onload = function (e) {
            preview.setAttribute('src', e.target.result);
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

//Função para abrir SweetAlert para atualizar dados
function updateUserInfo() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "Está prestes a atualizar a sua informação!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, atualizar dados!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            atualizarConta();
            swalWithBootstrapButtons.fire(
                'Dados atualizados!',
                'Os seus dados foram atualizados com sucesso.',
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

// Editar dados do utilizador
async function atualizarConta() {
    var name = document.getElementById("input-name").value;
    var phone = document.getElementById("input-phone").value;
    var city = document.getElementById("input-cidade").value;
    var country = document.getElementById("input-pais").value;
    var nif = document.getElementById("input-nif").value;
    var photo;
    if (document.getElementById("input-photo-url").value == "") {
        photo = document.getElementById("preview").src;
    } else {
        photo = document.getElementById("input-photo-url").value
    }
    await fetch('https://environ-back.herokuapp.com/user/edit', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            phone: phone,
            city: city,
            country: country,
            nif: nif,
            photo_url: photo
        })
    }).then(response => {
        return response.clone().json();
    }).then(result => {
        console.log(result.msg);
    }).catch(error => {
        console.log(error)
    })
}

//getUserInfo
function debug() {
    fetch('https://environ-back.herokuapp.com/user', {
        method: 'GET',
        credentials: 'include'
    }).then(response => {
        return response.json();
    }).then(result => {
        setUserInfo(result);
    }).catch(error => {
        console.log(error)
        window.location.assign("../../pages/all/login.html");
    })
}
if (fileTag != null) {
    fileTag.addEventListener("change", function () {
        edit(this);
    });
}

// Colocar info do user no profile
function setUserInfo(result) {
    //Session Storage
    console.log(result);
    sessionStorage.setItem('role', result.user.role);
    sessionStorage.setItem('name', result.user.name);
    sessionStorage.setItem('email', result.user.email);
    sessionStorage.setItem('photo', result.user.photoUrl);
    //Profile
    document.getElementById("hello").innerHTML += result.user.name;
    document.getElementById("hello6").innerHTML = result.user.name;
    document.getElementById("nameInfo").innerHTML = result.user.name;
    document.getElementById("input-name").value = result.user.name;
    document.getElementById("input-email").value = result.user.email;
    document.getElementById("output-email").innerHTML = result.user.email;
    document.getElementById("input-phone").value = result.user.phoneNumber;
    document.getElementById("input-cidade").value = result.user.city;
    document.getElementById("input-pais").value = result.user.country;
    document.getElementById("input-nif").value = result.user.nif;
    document.getElementById("preview").src = result.user.photoURL;
    document.getElementById("output-city-country").innerHTML = result.user.city + ", " + result.user.country;
    document.getElementById("preview").src = result.user.photoUrl;
    document.getElementById("img1").src = result.user.photoUrl;
    if (result.user.role === 'admin') {
        document.getElementById("output-sector").innerHTML = "Administrador"
    }
    if (result.user.role === 'empresa') {
        document.getElementById("output-sector").innerHTML = "Organização"
    }
    if (result.user.role === 'camara') {
        document.getElementById("output-sector").innerHTML = "Câmara Municiapl"
    }
}

//Apgar utilizador
function deleteUser() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "Poderá reverter esta ação falando com um dos administradores.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, desativar conta!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            fetch('https://environ-back.herokuapp.com/user/delete/me', {
                method: 'DELETE',
                credentials: 'include'
            }).then(response => {
                window.location.assign("../../pages/all/login.html");
                return response.json();
            }).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Conta desativada!',
                'A sua conta foi desativada com sucesso.',
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

// Alterar email do utilizador
function alterarEmail() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "Poderá reverter esta ação no seu mail antigo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, alterar email!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            var email = document.getElementById("altMail").value;
            fetch('https://environ-back.herokuapp.com/user/changeEmail', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                })
            }).then(response => {
                console.log(response.json())
                return response.json();
            }).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Email alterado!',
                'Poderá reverter esta ação no email antigo. Precisará ainda de ativar novamente esta conta no novo email',
                'success'
            ).then(function(){ 
                window.location.assign("../../pages/all/profile.html");
                }
             );
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

// function render() {
//     var number = document.getElementById("altPhone").value;
//     var applicationVerifier = new firebase.auth.RecaptchaVerifier(
//     'recaptcha-container');
//     var provider = new firebase.auth.PhoneAuthProvider();
//     provider.verifyPhoneNumber(number, applicationVerifier)
//         .then(function(verificationId) {
//           var verificationCode = document.getElementById("verificationCode");
//           return firebase.auth.PhoneAuthProvider.credential(verificationId,
//               verificationCode);
//         })
//         .then(function(phoneCredential) {
//             alterarPhone(phoneCredential)
//           });
// }


// Alterar email do utilizador
function alterarPhone() {
    var phone = document.getElementById("altPhone").value;

    var applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    var provider = new firebase.auth.PhoneAuthProvider();
    provider.verifyPhoneNumber(phone, applicationVerifier)
        .then(async function(verificationId) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            const { value: verificationCode } = await Swal.fire({
                title: 'Verificação de código',
                text: "Digite o código que lhe foi enviado para o telemóvel: " + phone,
                icon: 'warning',
                input: 'text',
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                      return 'Tens de colocar um código'
                    }
                }
            })
            if(verificationCode){
                return firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
            }
        })
        .then(function(phoneCredential) {
            fetch('https://environ-back.herokuapp.com/user/changePhone', {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({
                    credential: phoneCredential,
                })
            }).then(response => {
                console.log(response.json())
                return response.json();
            }).then(result => {
                console.log(result)
                swalWithBootstrapButtons.fire(
                    'Contacto telefónico alterado!',
                    'O seu contacto telefónico foi alterado com sucesso.',
                    'success'
                )
            }).catch(error => {
                console.log(error)
            })
        });
}

// Block or unblock user info configuration
var count = 2;

function blockUnblock() {
    count += 1;
    console.log(count)
    if (isOdd(count) == true) {
        document.getElementById("blockUnblock").innerHTML = "Bloquear configurações";
        document.getElementById("blockUnblock").className = "text-white btn btn-sm btn-danger"
        document.getElementById("input-name").disabled = false
        // document.getElementById("input-email").disabled = false
        document.getElementById("input-nif").disabled = false
        // document.getElementById("input-phone").disabled = false
        document.getElementById("input-cidade").disabled = false
        document.getElementById("input-pais").disabled = false
        document.getElementById("filetag").disabled = false
        document.getElementById("atualizarConta").disabled = false
        document.getElementById("apagarConta").disabled = false
    } else {
        document.getElementById("blockUnblock").innerHTML = "Desbloquear configurações";
        document.getElementById("blockUnblock").className = "text-white btn btn-sm btn-success"
        document.getElementById("input-name").disabled = true
        // document.getElementById("input-email").disabled = true
        document.getElementById("input-nif").disabled = true
        // document.getElementById("input-phone").disabled = true
        document.getElementById("input-cidade").disabled = true
        document.getElementById("input-pais").disabled = true
        document.getElementById("filetag").disabled = true
        document.getElementById("atualizarConta").disabled = true
        document.getElementById("apagarConta").disabled = true
    }

    function isOdd(n) {
        return Math.abs(n % 2) == 1;
    }
}

function getAllUsers() {
    fetch('https://environ-back.herokuapp.com/admin/users', {
        method: 'GET',
        credentials: 'include'
    }).then(result => {
        return result.json();
    }).then(response => {
        var array = []
        console.log(response)
        response.forEach(element => {
            var obj = [];
            // if (!element.uid || element.uid === '') {
            //     obj.push('null')
            // } else {
            //     obj.push(element.uid)
            // }
            if (!element.name || element.name === '') {
                obj.push('null')
            } else {
                obj.push(element.name)
            }
            if (!element.email || element.email === '') {
                obj.push('null')
            } else {
                obj.push(element.email)
            }
            if (!element.phoneNumber || element.phoneNumber === '') {
                obj.push('null')
            } else {
                obj.push(element.phoneNumber)
            }
            if (!element.role || element.role === '') {
                obj.push('null')
            } else if (element.role === "empresa") {
                obj.push('Empresa')
            } else if (element.role === "camara") {
                obj.push('Câmara')
            } else if (element.role === "admin") {
                obj.push('Administrador')
            } else {
                obj.push(element.role)
            }
            if (!element.nif || element.nif === '') {
                obj.push('null')
            } else {
                obj.push(element.nif)
            }
            if (!element.country || element.country === '') {
                obj.push('null')
            } else {
                obj.push(element.country)
            }
            if (element.disabled === 'undefined' || element.disabled === '') {
                obj.push('null')
            } else if (element.disabled === false) {
                obj.push('Ativo')
            } else if (element.disabled === true) {
                obj.push('Desativo')
            }
            //   if(!element.city  || element.city === ''){ obj.push('null') } else { obj.push(element.city) }
            //   if(!element.setor || element.setor === ''){ obj.push('null') } else { obj.push(element.setor) }
            array.push(obj);
        });
        var table = $('#utilizadores').DataTable({
            data: array,
            language: {
                paginate: {
                    previous: "<i class='fas fa-angle-left'>",
                    next: "<i class='fas fa-angle-right'>"
                }
            }
        });
    })
}

//Eliminar Utilizador pelo ADMIN

function eliminarUtilizador() {
    var email = document.getElementById("email").value;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "Está prestes a eliminar irreversivelmente o utilizador com o email: " + email + "!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, eliminar utilizador!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            fetch('https://environ-back.herokuapp.com/admin/delete/user/', {
                method: 'DELETE',
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                })
            }).then(response => {
                return response.json();
            }).then(result => {
                location = location;
                console.log(result);
            }).catch(error => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Utilizador eliminado!',
                'O utilizador introduzido foi eliminado!',
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

//Eliminar Utilizador pelo ADMIN

function ativarUtilizador() {
    var email = document.getElementById("email").value;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "Está prestes a ativar o utilizador com o email: " + email + "!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, ativar utilizador!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            fetch('https://environ-back.herokuapp.com/admin/enable/user/', {
                method: 'DELETE',
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                })
            }).then(response => {
                return response.json();
            }).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Utilizador ativado!',
                'O utilizador introduzido foi novamente ativado no sistema!',
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

//Definir utilizador como Administrador


function eliminarUtilizador() {
    var email = document.getElementById("email").value;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "Está prestes a eliminar irreversivelmente o utilizador com o email: " + email + "!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, eliminar utilizador!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            fetch('https://environ-back.herokuapp.com/admin/delete/user/', {
                method: 'DELETE',
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                })
            }).then(response => {
                return response.json();
            }).then(result => {
                location = location;
                console.log(result);
            }).catch(error => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Utilizador eliminado!',
                'O utilizador introduzido foi eliminado!',
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

//Eliminar Utilizador pelo ADMIN

function setAdmin() {
    var email = document.getElementById("email").value;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "Está prestes a tornar administrador o utilizador com o email: " + email + "!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, tornar administrador!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            fetch('https://environ-back.herokuapp.com/admin/set', {
                method: 'DELETE',
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                })
            }).then(response => {
                return response.json();
            }).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Tipo de utilizador atualizado!',
                'O utilizador introduzido passou a Administrador!',
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

//Eliminar Utilizador pelo ADMIN

function emailActivationManually() {
    var email = document.getElementById("email").value;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "Está prestes a verificar manualmente o utilizador com o email: " + email + "!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, verificar email!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            fetch('https://environ-back.herokuapp.com/admin/user/accept', {
                method: 'DELETE',
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                })
            }).then(response => {
                return response.json();
            }).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Email verificado!',
                'O utilizador foi verificado com sucesso!',
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