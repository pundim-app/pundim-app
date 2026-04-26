// Service Worker para Notificações Push Web do Pundim

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativando...');
  event.waitUntil(clients.claim());
});

self.addEventListener('push', (event) => {
  console.log('[Service Worker] Notificação push recebida:', event.data);
  
  let notificationData = {
    title: 'Pundim 🍮',
    body: 'Você recebeu uma mensagem especial!',
    icon: '/assets/images/icon.png',
    badge: '/assets/images/icon.png',
    tag: 'pundim-notification',
    requireInteraction: false,
  };

  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (e) {
      notificationData.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      tag: notificationData.tag,
      requireInteraction: notificationData.requireInteraction,
      data: {
        url: notificationData.url || '/',
      },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notificação clicada');
  event.notification.close();

  const urlToOpen = event.notification.data.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Verifica se já existe uma janela aberta
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Se não existe, abre uma nova janela
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

self.addEventListener('notificationclose', (event) => {
  console.log('[Service Worker] Notificação fechada');
});
