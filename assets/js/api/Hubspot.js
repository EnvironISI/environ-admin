// window.onload(hubspot());
// var users;

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

function registerUser() {
    var name = document.getElementById("registerName").value;
    var email = document.getElementById("registerEmail").value;
    var phone = document.getElementById("registerTelefone").value;
    var city = document.getElementById("registerCidade").value;
    var country = document.getElementById("registerPais").value;
    var sector = document.getElementById("registerSetor").value;
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
var articles;

function login() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    /*fetch("https://environ-back.herokuapp.com/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then((response) => {
            var myStatus = response.status;
            if(myStatus != 200) {
                throw new Error("error");
            }
            return response.json()
        })
        .then((data) => {
            console.log(data)
            localStorage.setItem('token', data.token);
            window.location = "../../pages/examples/profile.html";
        }).catch(error => {
            console.log(error)
        })*/
        firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
            // Get the user's ID token as it is needed to exchange for a session cookie.
            return user.user.getIdToken().then(idToken => {
              // Session login endpoint is queried and the session cookie is set.
              // CSRF protection should be taken into account.
              // ...
              const csrfToken = getCookie('csrfToken')
              return postIdTokenToSessionLogin('login', idToken, csrfToken);
            });
          }).then(() => {
            // A page redirect would suffice as the persistence is set to NONE.
            return firebase.auth().signOut();
          }).then(() => {
            //window.location = "../../pages/examples/profile.html";
            console.log('hello')
            console.log(document.cookie)
          });
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

function recoverPassword() {
    var email = document.getElementById("recoverEmail").value;
    console.log(email);

    fetch("https://environ-back.herokuapp.com/recoverPassword", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                email: email,
            })
        })
        .then((response) => {
            console.log(response.json())
            return response.json();
        })
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

function postIdTokenToSessionLogin(url, idToken, csrfToken){
    fetch('https://environ-back.herokuapp.com/'+url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({idToken:idToken, csrfToken: csrfToken})
    }).then(response => {
        return response.json()
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error)
    })
}

function debug(){
    fetch('https://environ-back.herokuapp.com/user', {
        method: 'get'
    }).then(response => {
        return response.json();
    }).then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })
}