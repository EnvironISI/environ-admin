const messaging = firebase.messaging();

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