// Firebase Messaging Service Worker
// NOTE: Replace the FIREBASE_CONFIG object below with your project's config before deploying the service worker.
// This file must be served from your app's root (e.g., https://yourdomain.com/firebase-messaging-sw.js)

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Initialize Firebase in Service Worker (copy the same config you used in the client)
firebase.initializeApp({
  apiKey: "AIzaSyBaM-BpRPVhMTNaaX0RgcjLOWBiMe60kvU",
  authDomain: "gojira-9f84a.firebaseapp.com",
  projectId: "gojira-9f84a",
  storageBucket: "gojira-9f84a.firebasestorage.app",
  messagingSenderId: "1040488004573",
  appId: "1:1040488004573:web:b4854f7bf34205dda51434",
  measurementId: "G-PGSS0ELEXQ"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification?.title || 'New Notification';
  const options = {
    body: payload.notification?.body || '',
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});

// Optional: handle notification clicks
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});

// You can customize how background notifications are displayed and how clicks are handled.
// Deploy this file to the root of your hosting domain and register it from the client with:
// navigator.serviceWorker.register('/firebase-messaging-sw.js');
