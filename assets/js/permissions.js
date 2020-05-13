




var permissionUser = JSON.parse(sessionStorage.getItem('user'));
var role = permissionUser.role;

function goTo(){
    console.log('hello')
    window.location.assign("../../pages/" + role + "/dashboard.html");
}

var dashboardAmin = document.getElementById("dashboardAdmin");
var dashboardCamara = document.getElementById("dashboardCamara")
var dashboardEmpresa = document.getElementById("dashboardEmpresa")
var eventosCamara = document.getElementById("eventosCamara")
var eventosAdmin = document.getElementById("eventosAdmin")
var eventosEmpresa = document.getElementById("eventosEmpresa")
var utilizadoresAdmin = document.getElementById("utilizadoresAdmin");
var entidadesAdmin = document.getElementById("entidadesAdmin")
var entidadesCamara = document.getElementById("entidadesCamara")

function setPermission() {
    if (role == 'admin') {
        if (dashboardCamara) dashboardCamara.style.display = "none"
        if (dashboardEmpresa) dashboardEmpresa.style.display = "none"
        if (eventosCamara) eventosCamara.style.display = "none"
        if (eventosEmpresa) eventosEmpresa.style.display = "none"
        if (entidadesCamara) entidadesCamara.style.display = "none"
    } else if (role == 'camara') {
        if (dashboardAmin) dashboardAmin.style.display = "none"
        if (dashboardEmpresa) dashboardEmpresa.style.display = "none"
        if (eventosAdmin) eventosAdmin.style.display = "none"
        if (eventosEmpresa) eventosEmpresa.style.display = "none"
        if (entidadesAdmin) entidadesAdmin.style.display = "none"
        if (utilizadoresAdmin) utilizadoresAdmin.style.display = "none"
    } else if (role == 'empresa') {
        if (dashboardAmin) dashboardAmin.style.display = "none"
        if (dashboardCamara) dashboardCamara.style.display = "none"
        if (eventosCamara) eventosCamara.style.display = "none"
        if (eventosAdmin) eventosAdmin.style.display = "none"
        if (entidadesCamara) entidadesCamara.style.display = "none"
        if (entidadesAdmin) entidadesAdmin.style.display = "none"
        if (utilizadoresAdmin) utilizadoresAdmin.style.display = "none"
    }
}