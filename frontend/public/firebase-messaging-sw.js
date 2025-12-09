importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDHdTc61IWw-Oo4X3c8eqa77w85oXzlPjY",
  authDomain: "habitping.firebaseapp.com",
  projectId: "habitping",
  storageBucket: "habitping.firebasestorage.app",
  messagingSenderId: "942686393756",
  appId: "1:942686393756:web:d2d24413957ef03f36a459",
  measurementId: "G-5DZS6J7W0Y"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});