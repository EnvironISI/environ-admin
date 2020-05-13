var firebaseConfig = {
    apiKey: "AIzaSyB8MYslNwT_i3mCs7UhuiU4ZlF8TFmU5P8",
    authDomain: "isienviron.firebaseapp.com",
    databaseURL: "https://isienviron.firebaseio.com",
    projectId: "isienviron",
    storageBucket: "isienviron.appspot.com",
    messagingSenderId: "636194129852",
    appId: "1:636194129852:web:52d385c18b8140a59fcdb9",
    measurementId: "G-7X3BC6HX5X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.requestPermission().then(function () {
    console.log('Have permission');
    return messaging.getToken();
}).then(function (token) {
    console.log(token)
    fetch('https://environ-back.herokuapp.com/notification/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ notiToken: token })
    })
    localStorage.setItem('notiToken', token);
}).catch(error => {
    console.log(error);
})

messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
        fetch('https://environ-back.herokuapp.com/notification/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ notiToken: refreshedToken })
        })
        localStorage.setItem('notiToken', refreshedToken);
    })
})

messaging.onMessage(function () {
    getNotifications();
})