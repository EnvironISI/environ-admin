importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

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

messaging.setBackgroundMessageHandler(function (payload) {

    getNotifications();

    const title = payload.notification.title
    const options = {
        body: payload.notification.msg

    }
    return self.registration.showNotification(title, options);
})

messaging

