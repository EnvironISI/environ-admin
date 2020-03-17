var role = sessionStorage.getItem('role');
console.log(role)
if (role == 'admin') {
    document.getElementById("userTest").style.display = 'none';
    console.log("resultou")
} else if (role == 'camara') {
    console.log("resultou")
}