window.onload = function () {

    //Change Theme
    var theme = localStorage.getItem("darker");
    if (theme == "true") {
        theme = true;
    } else {
        theme = false
    }
    
    document.getElementById('slider').checked = theme;
    changeTheme(theme);
    this.console.log('Tema carregado')

    //Get Notifications
    getNotifications();
    this.console.log("Notificações carregadas")

    //Fill UserData
    var user = JSON.parse(sessionStorage.getItem('user'));
    document.getElementById("img1").src = user.photoUrl;
    document.getElementById("hello6").innerHTML = user.name;
    this.console.log('Informações carregadas')

    //Set Permission
    setPermission();

    //Get All Events
    if(window.location.toString().includes("dashboard")){
        if(window.location.toString().includes("camara") || window.location.toString().includes("empresa")){
            document.getElementById("contentQRCode").src = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + user.uid;
        }  
    }
    else if (window.location.toString().includes("profile")) {
        setUserInfo();
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }
    else if (window.location.toString().includes("eventos")) {
        if(window.location.toString().includes("admin")) getAllEvents();
        else if(window.location.toString().includes("camara")){
            getAllEventsCamara();
            changePreview();
        }
        else if(window.location.toString().includes("empresa")) getUserEvents();
    }
    else if(window.location.toString().includes("registarEvento")){
        getGeolocation();
    }
    else if (window.location.toString().includes("todosEventosAceites")){
        getAllAcceptedEvents();
    }
    else if(window.location.toString().includes("users")){
        getAllUsers();
    }
    else if(window.location.toString().includes("Pacotes")){
        getPackages();
    }
    else if(window.location.toString().includes("listarPacotes")) getPackagesByCamara();
    else if(window.location.toString().includes("registarPacotes")) {
        $(".defaults_select").select2({
            tags: true,
            multiple: true,
            placeholder: "Enter values",
            allowClear: true,
            language: 'en',
            tokenSeparators: [',', '$'],
            dropdownParent: $('#hello')
          });

        changePreview();
    }
    else if(window.location.toString().includes("weather")){
        getLocation();
    }
    else if(window.location.toString().includes("news")){
        news();
    }
    

    //Loader Fade
    $('.preloader').fadeOut(500);
}