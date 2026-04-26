import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { useWebPushNotifications } from '@/hooks/use-web-push-notifications';

export function PushNotificationBanner() {
  const colors = useColors();
  const { isSupported, isSubscribed, subscribe, unsubscribe } = useWebPushNotifications();
  const [showBanner, setShowBanner] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mostra o banner apenas se notificações são suportadas e o usuário não está inscrito
    if (isSupported && !isSubscribed && Platform.OS === 'web') {
      // Aguarda um pouco antes de mostrar para não aparecer muito rápido
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSupported, isSubscribed]);

  if (!showBanner || !isSupported) {
    return null;
  }

  async function handleSubscribe() {
    setLoading(true);
    const success = await subscribe();
    if (success) {
      setShowBanner(false);
    }
    setLoading(false);
  }

  return (
    <View style={[styles.banner, { backgroundColor: colors.primary }]}>
      <View style={styles.content}>
        <Text style={styles.icon}>🔔</Text>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Receba notificações do Pundim!</Text>
          <Text style={styles.description}>
            Lembretes deliciosos em momentos aleatórios do dia
          </Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.dismissButton]}
          onPress={() => setShowBanner(false)}
          disabled={loading}
        >
          <Text style={[styles.buttonText, { color: colors.primary }]}>Não</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#25D366' }]}
          onPress={handleSubscribe}
          disabled={loading}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>
            {loading ? 'Ativando...' : 'Sim!'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  content: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 28,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  description: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 18,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  dismissButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
