// TODO: Replace the following with your app's Firebase project configuration
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

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
firebase.auth().useDeviceLanguage();