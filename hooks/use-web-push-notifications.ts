import { useEffect, useState } from 'react';

export interface PushNotificationData {
  title: string;
  body: string;
  url?: string;
  icon?: string;
}

export function useWebPushNotifications() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    // Verifica se o navegador suporta notificações push
    const supported =
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      'Notification' in window;

    setIsSupported(supported);

    if (supported) {
      registerServiceWorker();
      checkSubscription();
    }
  }, []);

  async function registerServiceWorker() {
    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register(
          '/service-worker.js',
          { scope: '/' }
        );
        console.log('[Push Notifications] Service Worker registrado:', registration);
      }
    } catch (error) {
      console.error('[Push Notifications] Erro ao registrar Service Worker:', error);
    }
  }

  async function checkSubscription() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
      setIsSubscribed(!!sub);
    } catch (error) {
      console.error('[Push Notifications] Erro ao verificar inscrição:', error);
    }
  }

  async function subscribe() {
    try {
      // Solicita permissão ao usuário
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.log('[Push Notifications] Permissão negada pelo usuário');
        return false;
      }

      const registration = await navigator.serviceWorker.ready;
      
      // Inscreve o usuário em notificações push
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.REACT_APP_VAPID_PUBLIC_KEY || 'dummy-key'
        ),
      });

      setSubscription(sub);
      setIsSubscribed(true);
      
      // Salva a inscrição localmente
      localStorage.setItem('pundim-push-subscription', JSON.stringify(sub));
      
      console.log('[Push Notifications] Usuário inscrito:', sub);
      return true;
    } catch (error) {
      console.error('[Push Notifications] Erro ao inscrever:', error);
      return false;
    }
  }

  async function unsubscribe() {
    try {
      if (subscription) {
        await subscription.unsubscribe();
        setSubscription(null);
        setIsSubscribed(false);
        localStorage.removeItem('pundim-push-subscription');
        console.log('[Push Notifications] Usuário desinscrito');
        return true;
      }
    } catch (error) {
      console.error('[Push Notifications] Erro ao desinscrever:', error);
      return false;
    }
  }

  async function sendLocalNotification(data: PushNotificationData) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon || '/assets/images/icon.png',
        badge: '/assets/images/icon.png',
        tag: 'pundim-notification',
        data: {
          url: data.url || '/',
        },
      });
    } catch (error) {
      console.error('[Push Notifications] Erro ao enviar notificação local:', error);
    }
  }

  return {
    isSupported,
    isSubscribed,
    subscription,
    subscribe,
    unsubscribe,
    sendLocalNotification,
  };
}

// Função auxiliar para converter VAPID key
function urlBase64ToUint8Array(base64String: string) {
  try {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  } catch (error) {
    console.error('[Push Notifications] Erro ao converter VAPID key:', error);
    return new Uint8Array();
  }
}
