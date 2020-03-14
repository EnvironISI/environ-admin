// window.onload(hubspot());

var users;



// function hubspot() {

//     var url =

//         "http://environ-back.herokuapp.com/getContacts";



//     var req = new Request(url);

//     fetch(req)

//         .then(response => response.json())

//         .then(data => {

//             console.log(data.results);

//             this.users = data.results;

//             sessionStorage.clear();

//             sessionStorage.setItem('Users', JSON.stringify(data.results));

//             var helo = JSON.parse(sessionStorage.getItem('Users'))

//             //  var tag = document.createElement("script");

//             //  tag.src = "../../assets/vendor/datatables.net/js/jquery.dataTables.min.js";

//             //  document.getElementsByTagName("head")[0].appendChild(tag);

//         });

// }



// function setUsers() {

//     var results = document.getElementById("tbody");



//     for (var obj in users) {

//         //Loop through the object to get each objects data

//         results.innerHTML +=

//             "<tr><td>" + users[obj].id + "</td>" +

//             "<td>" + users[obj].properties.name + "</td>" +

//             "<td>" + new Date(users[obj].createdAt).toLocaleString() + "</td>" +

//             "<td>" + new Date(users[obj].updatedAt).toLocaleString() + "</td>"

//     }

// }



var fileTag = document.getElementById("filetag"),

    preview = document.getElementById("preview");



let user;

var articles;



//Registar Utilizador

function registerUser() {

    var name = document.getElementById("registerName").value;

    var email = document.getElementById("registerEmail").value;

    var phone = document.getElementById("registerTelefone").value;

    var city = document.getElementById("registerCidade").value;

    var country = document.getElementById("registerPais").value;

    var sector = document.getElementById("registerSetor").value;

    var nif = document.getElementById("registerNif").value;

    var type = document.getElementById("registerType").value;

    var password = document.getElementById("registerPassword").value;

    var confirmPassword = document.getElementById("registerRepeatPassword").value;

    console.log(type);

    if (name != "" && email != "" && phone != "" && city != "" && country != "" && sector != "" && password != "" && confirmPassword != "" && type != "") {

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

                            nif: nif,

                            type: type,

                            password: password

                        })

                    })

                    .then((response) => {

                        console.log(response.json())

                        return response.json();

                    })
                    .then((data) => {
                        console.log(data)
                    })

                document.getElementById("SUCCESS").click();

                clearRegisterFields();

            }

            else {

                document.getElementById("NOTWORKING").click();

                console.log("Erro ao registar!")

            }

        }

        else {

            document.getElementById("WORKING").click();

            console.log("Not true!")

        }

    }

    else {

        document.getElementById("EMPTYFIELDS").click();

        console.log("Campos vazios!")

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

            if (myStatus != 200) {

                throw new Error("error");

            }

            return response.json()

        })

        .then((data) => {

            console.log(data)

            window.location.assign("../../pages/examples/profile.html");

        }).catch(error => {

            console.log(error)

        })

}



//Recuperar Password Utilizador

function recoverPassword() {

    var email = document.getElementById("recoverEmail").value;

    fetch("https://environ-back.herokuapp.com/recoverPassword", {

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

            window.location.assign('/pages/examples/login.html');

        }

    })

}



//Logout Utilizador

async function logout() {

    await fetch('https://environ-back.herokuapp.com/logout', {

        method: 'get',

        credentials: 'include'

    }).then(response => {

        if (response.ok) {

            window.location.assign("../../pages/examples/login.html")

        }

    })

}



//Get photo URL

function edit(input) {

    var reader;



    if (input.files && input.files[0]) {

        reader = new FileReader();



        reader.onload = function(e) {

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

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {

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

        }, function(error) {

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

        }, function() {

            // Upload completed successfully, now we can get the download URL

            uploadTask.snapshot.ref.getDownloadURL().then(async function(downloadURL) {
                document.getElementById("input-photo").value = downloadURL;
                console.log(document.getElementById("input-photo").value);
            });

        });

    }

}

// Editar dados do utilizador

function atualizarConta() {

    var name = document.getElementById("input-name").value;

    var email = document.getElementById("input-email").value;

    var phone = document.getElementById("input-phone").value;

    var city = document.getElementById("input-cidade").value;

    var country = document.getElementById("input-pais").value;

    var photo_url = document.getElementById("input-photo").value;

    var nif = document.getElementById("input-nif").value;

    var uid = sessionStorage.getItem("userID");
    fetch('https://environ-back.herokuapp.com/edit/' + uid, {

        method: 'PUT',

        credentials: 'include',

        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify({

            name: name,
            email: email,
            phone: phone,
            city: city,
            country: country,
            nif: nif,
            photo_url: photo_url

        })
    }).then(response => {
        console.log(response.json())
        return response.json();

    }).then(result => {

        console.log(result.data);
          window.location.assign("../../pages/examples/profile.html");

    }).catch(error => {

        console.log(error)

    })
}

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
        }
        else if (
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



//Limpar Campos

function clearRegisterFields() {

    document.getElementById("registerName").value == "";

    document.getElementById("registerEmail").value == "";

    document.getElementById("registerTelefone").value == "";

    document.getElementById("registerCidade").value == "";

    document.getElementById("registerPais").value == "";

    document.getElementById("registerSetor").value == "";

    document.getElementById("registerPassword").value == "";

    document.getElementById("registerRepeatPassword").value == "";

}



function storeInfo() {

    var req = new Request("https://environ-back.herokuapp.com/user");

    fetch(req, {

            method: 'get',

            headers: {

                "AuthToken": localStorage.getItem('token')

            }

        })

        .then((response) => {

            return response.json()

        })

        .then((data) => {

            console.log(data)

            sessionStorage.setItem('nome', data.user.displayName);

            sessionStorage.setItem('photoURL', data.user.photoURL);

            sessionStorage.setItem('email', data.user.email);

            sessionStorage.setItem('phoneNumber', data.user.phoneNumber);

            sessionStorage.setItem('cidade', 'valor');

            sessionStorage.setItem('pais', 'valor');

            // document.getElementById("spanUser").innerText = data.user.email;

        })

}



function getUserInfo() {

    document.getElementById("input-email").value = sessionStorage.getItem("email");

    document.getElementById("emailInfo").innerText = sessionStorage.getItem("email");

}



function debug() {

    fetch('https://environ-back.herokuapp.com/user', {

        method: 'get',

        credentials: 'include'

    }).then(response => {

        return response.json();

    }).then(result => {

        console.log(result);

        setUserInfo(result);

        // if(result.user.photoURL != null){

        //     document.getElementById('preview').src = user.photoURL;

        // }

    }).catch(error => {

        console.log(error)

    })

}



if (fileTag != null) {

    fileTag.addEventListener("change", function() {

        edit(this);

    });

}



function setUserInfo(result) {

    sessionStorage.setItem('userID', result.user.uid);

    document.getElementById("hello").innerHTML += result.user.name;

    document.getElementById("hello1").innerHTML = result.user.name;

    document.getElementById("hello2").innerHTML = result.user.name;

    document.getElementById("hello3").innerHTML = result.user.name;

    document.getElementById("hello4").innerHTML = result.user.name;

    document.getElementById("hello5").innerHTML = result.user.name;

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



    document.getElementById("output-sector").innerHTML = result.user.setor;


    document.getElementById("preview").src = result.user.photoUrl;



}



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
        text: "Não será possível reverter esta ação!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, eliminar conta!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            fetch('https://environ-back.herokuapp.com/delete/me', {

                method: 'DELETE',

                credentials: 'include'

            }).then(response => {

                return response.json();
                window.location.assign("../../pages/examples/login.html");
            }).then(result => {

                console.log(result);

            }).catch(error => {
                console.log(error)

            })
            swalWithBootstrapButtons.fire(
                'Conta eliminada!',
                'A sua conta foi eliminada com sucesso.',
                'success'
            )
        }
        else if (
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
