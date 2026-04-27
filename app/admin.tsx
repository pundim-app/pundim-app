import { ScrollView, Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { cn } from '@/lib/utils';

interface ScheduledNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  daysOfWeek: number[];
  isActive: boolean;
}

export default function AdminScreen() {
  const colors = useColors();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customBody, setCustomBody] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]); // Seg-Sex
  const [scheduledNotifications, setScheduledNotifications] = useState<ScheduledNotification[]>([]);
  const [loading, setLoading] = useState(false);

  const DAYS_OF_WEEK = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  useEffect(() => {
    loadScheduledNotifications();
  }, []);

  async function loadScheduledNotifications() {
    try {
      const response = await fetch('/api/notifications/scheduled');
      if (response.ok) {
        const data = await response.json();
        setScheduledNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error('Erro ao carregar notificações agendadas:', error);
    }
  }

  function handleLogin() {
    // Senha simples (em produção, seria mais seguro)
    if (password === 'pundim2024') {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      Alert.alert('Erro', 'Senha incorreta!');
    }
  }

  function toggleDay(day: number) {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  async function handleSendNotification() {
    if (!customTitle.trim() || !customBody.trim()) {
      Alert.alert('Erro', 'Preencha título e mensagem!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: customTitle,
          body: customBody,
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Notificação enviada para todos os usuários!');
        setCustomTitle('');
        setCustomBody('');
      } else {
        Alert.alert('Erro', 'Falha ao enviar notificação');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao enviar notificação');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleScheduleNotification() {
    if (!customTitle.trim() || !customBody.trim()) {
      Alert.alert('Erro', 'Preencha título e mensagem!');
      return;
    }

    if (selectedDays.length === 0) {
      Alert.alert('Erro', 'Selecione pelo menos um dia da semana!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/notifications/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: customTitle,
          body: customBody,
          time: selectedTime,
          daysOfWeek: selectedDays,
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Notificação agendada com sucesso!');
        setCustomTitle('');
        setCustomBody('');
        loadScheduledNotifications();
      } else {
        Alert.alert('Erro', 'Falha ao agendar notificação');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao agendar notificação');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <ScreenContainer className="p-6 justify-center">
        <View className="gap-6">
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">Painel Admin</Text>
            <Text className="text-sm text-muted">Pundim</Text>
          </View>

          <View className="gap-4">
            <Text className="text-sm font-semibold text-foreground">Senha de Acesso</Text>
            <TextInput
              placeholder="Digite a senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={[
                styles.input,
                { borderColor: colors.border, color: colors.foreground },
              ]}
              placeholderTextColor={colors.muted}
            />

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1, gap: 24 }}>
        {/* Header */}
        <View className="gap-2">
          <Text className="text-2xl font-bold text-foreground">Painel de Admin</Text>
          <Text className="text-sm text-muted">Gerencie notificações do Pundim</Text>
        </View>

        {/* Enviar Notificação Imediata */}
        <View className="gap-4 p-4 bg-surface rounded-2xl border border-border">
          <Text className="text-lg font-bold text-foreground">📢 Enviar Agora</Text>

          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Título</Text>
            <TextInput
              placeholder="Ex: Pundim 🍮"
              value={customTitle}
              onChangeText={setCustomTitle}
              style={[
                styles.input,
                { borderColor: colors.border, color: colors.foreground },
              ]}
              placeholderTextColor={colors.muted}
            />
          </View>

          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Mensagem</Text>
            <TextInput
              placeholder="Digite a mensagem da notificação"
              value={customBody}
              onChangeText={setCustomBody}
              multiline
              numberOfLines={3}
              style={[
                styles.input,
                { borderColor: colors.border, color: colors.foreground, height: 80 },
              ]}
              placeholderTextColor={colors.muted}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleSendNotification}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Enviando...' : 'Enviar para Todos'}</Text>
          </TouchableOpacity>
        </View>

        {/* Agendar Notificação */}
        <View className="gap-4 p-4 bg-surface rounded-2xl border border-border">
          <Text className="text-lg font-bold text-foreground">⏰ Agendar Notificação</Text>

          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Horário</Text>
            <TextInput
              placeholder="HH:MM"
              value={selectedTime}
              onChangeText={setSelectedTime}
              style={[
                styles.input,
                { borderColor: colors.border, color: colors.foreground },
              ]}
              placeholderTextColor={colors.muted}
            />
          </View>

          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Dias da Semana</Text>
            <View className="flex-row flex-wrap gap-2">
              {DAYS_OF_WEEK.map((day, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleDay(index)}
                  style={[
                    styles.dayButton,
                    {
                      backgroundColor: selectedDays.includes(index)
                        ? colors.primary
                        : colors.surface,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayButtonText,
                      {
                        color: selectedDays.includes(index) ? '#fff' : colors.foreground,
                      },
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleScheduleNotification}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Agendando...' : 'Agendar'}</Text>
          </TouchableOpacity>
        </View>

        {/* Notificações Agendadas */}
        {scheduledNotifications.length > 0 && (
          <View className="gap-4 p-4 bg-surface rounded-2xl border border-border">
            <Text className="text-lg font-bold text-foreground">
              📋 Agendadas ({scheduledNotifications.length})
            </Text>
            {scheduledNotifications.map((notif) => (
              <View
                key={notif.id}
                className="p-3 bg-background rounded-lg border border-border gap-2"
              >
                <Text className="font-semibold text-foreground">{notif.title}</Text>
                <Text className="text-sm text-muted">{notif.body}</Text>
                <View className="flex-row justify-between items-center">
                  <Text className="text-xs text-muted">
                    {notif.time} • {notif.daysOfWeek.map((d) => DAYS_OF_WEEK[d]).join(', ')}
                  </Text>
                  <View
                    className={cn(
                      'px-2 py-1 rounded',
                      notif.isActive ? 'bg-success' : 'bg-error'
                    )}
                  >
                    <Text className="text-xs text-white font-semibold">
                      {notif.isActive ? 'Ativa' : 'Inativa'}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Logout */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.error }]}
          onPress={() => setIsAuthenticated(false)}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dayButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  dayButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
