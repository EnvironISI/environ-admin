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

