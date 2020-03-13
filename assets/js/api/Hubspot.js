window.onload(hubspot());
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
    var password = document.getElementById("registerPassword").value;
    var confirmPassword = document.getElementById("registerRepeatPassword").value;
    console.log(password);
    if (name != "" && email != "" && phone != "" && city != "" && country != "" && sector != "" && password != "" && confirmPassword != "") {
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
                            password: password
                        })
                    })
                    .then((response) => {
                        console.log(response.json())
                        return response.json();
                    })
                document.getElementById("SUCCESS").click();
                clearRegisterFields();
            } else {
                document.getElementById("NOTWORKING").click();
                console.log("Erro ao registar!")
            }
        } else {
            document.getElementById("WORKING").click();
            console.log("Not true!")
        }
    } else {
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
        if(myStatus != 200) {
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
        credentials:'include',
        body: JSON.stringify({
            email: email,
        })
    }).then((response) => {
        if(response.ok){
            window.location.assign('/pages/examples/login.html');
        }
    })
}

//Logout Utilizador
async function logout(){
    await fetch('https://environ-back.herokuapp.com/logout', {
        method: 'get',
        credentials: 'include'
    }).then(response => {
        if(response.ok){
            window.location.assign("../../pages/examples/login.html")
        }
    })
}

//Editar Utilizador
function edit(input){
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
                let body = {
                    email: user.email,
                    display_name: user.displayName,
                    photo_url: downloadURL,
                    phone: user.phoneNumber,
                    city: '',
                    country: '',
                    nif: ''
                }
                await fetch('https://environ-back.herokuapp.com/edit/'+user.uid, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }).then(response => {
                    return response.json();
                }).then(result => {
                    console.log(result.data);
                }).catch(error => {
                    console.log(error)
                })
            });
        });
    }
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
            sessionStorage.setItem('photoURL',  data.user.photoURL);
            sessionStorage.setItem('email',  data.user.email);
            sessionStorage.setItem('phoneNumber',  data.user.phoneNumber);
            sessionStorage.setItem('cidade', 'valor');
            sessionStorage.setItem('pais', 'valor');
        // document.getElementById("spanUser").innerText = data.user.email;
    })
}

function getUserInfo() {
    document.getElementById("input-email").value = sessionStorage.getItem("email");
    document.getElementById("emailInfo").innerText = sessionStorage.getItem("email");
}

function debug(){
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

if(fileTag != null){
    fileTag.addEventListener("change", function() {
        edit(this);
    });
}

function setUserInfo(result) {
    document.getElementById("hello").innerHTML = result.user.displayName;
    document.getElementById("hello1").innerHTML = result.user.displayName;
    document.getElementById("hello2").innerHTML = result.user.displayName;
    document.getElementById("hello3").innerHTML = result.user.displayName;
    document.getElementById("hello4").innerHTML = result.user.displayName;
    document.getElementById("hello5").innerHTML = result.user.displayName;
    document.getElementById("hello6").innerHTML = result.user.displayName;
    document.getElementById("nameInfo").value = result.user.displayName;
    document.getElementById("input-name").value = result.user.displayName;
    document.getElementById("input-email").value = result.user.email;
    document.getElementById("input-phone").value = result.user.phoneNumber;
    document.getElementById("preview").src = result.user.photoURL;
    document.getElementById("outpu-email").innerHTML = result.user.email;
    
    // document.getElementById("input-nif").value = result.user.displayName;
    
}

