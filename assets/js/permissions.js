var role = sessionStorage.getItem('role');
var dashboardAmin = document.getElementById("dashboardAdmin");
var dashboardCamara = document.getElementById("dashboardCamara")
var dashboardEmpresa = document.getElementById("dashboardEmpresa")
var eventosCamara = document.getElementById("eventosCamara")
var eventosAdmin = document.getElementById("eventosAdmin")
var eventosEmpresa = document.getElementById("eventosEmpresa")
var utilizadoresAdmin = document.getElementById("utilizadoresAdmin");
var entidadesAdmin = document.getElementById("entidadesAdmin")
var entidadesCamara = document.getElementById("entidadesCamara")

if (role == 'admin') {
    dashboardCamara.style.display = "none"
    dashboardEmpresa.style.display = "none"
    eventosCamara.style.display = "none"
    eventosEmpresa.style.display = "none"
    entidadesCamara.style.display = "none"
} else if (role == 'camara') {
    dashboardAmin.style.display = "none"
    dashboardCamara.style.display = "none"
    eventosAdmin.style.display = "none"
    eventosEmpresa.style.display = "none"
    // entidadesAdmin.style.display = "none"
    utilizadoresAdmin.style.display = "none"
} else if(role == 'empresa') {
    dashboardAmin.style.display = "none"
    dashboardCamara.style.display = "none"
    eventosCamara.style.display = "none"
    eventosAdmin.style.display = "none"
    entidadesCamara.style.display = "none"
    entidadesAdmin.style.display = "none"
    utilizadoresAdmin.style.display = "none"
} else {
}
