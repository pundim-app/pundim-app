import {
  ScrollView,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import {
  isNotificationsEnabled,
  setNotificationsEnabled,
  requestNotificationPermission,
  PUNDIM_PHRASES,
  getScheduledNotifications,
} from "@/lib/notifications";

export default function NotificacoesScreen() {
  const colors = useColors();
  const [enabled, setEnabled] = useState(true);
  const [scheduledCount, setScheduledCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadState();
  }, []);

  async function loadState() {
    const isEnabled = await isNotificationsEnabled();
    setEnabled(isEnabled);
    if (Platform.OS !== "web") {
      const scheduled = await getScheduledNotifications();
      setScheduledCount(scheduled.length);
    }
  }

  async function handleToggle(value: boolean) {
    if (Platform.OS === "web") {
      Alert.alert("Notificações", "As notificações push funcionam apenas no app mobile.");
      return;
    }

    setLoading(true);
    try {
      if (value) {
        const granted = await requestNotificationPermission();
        if (!granted) {
          Alert.alert(
            "Permissão necessária",
            "Para receber as notificações do Pundim, você precisa permitir as notificações nas configurações do seu celular.",
            [{ text: "OK" }]
          );
          setLoading(false);
          return;
        }
      }
      await setNotificationsEnabled(value);
      setEnabled(value);
      const scheduled = await getScheduledNotifications();
      setScheduledCount(scheduled.length);
    } finally {
      setLoading(false);
    }
  }

  const randomPhrase = PUNDIM_PHRASES[Math.floor(Math.random() * PUNDIM_PHRASES.length)];

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Text style={styles.headerTitle}>Notificações</Text>
          <Text style={styles.headerSubtitle}>
            Receba lembretes deliciosos ao longo do dia 🍮
          </Text>
        </View>

        {/* Toggle Card */}
        <View style={[styles.toggleCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.toggleInfo}>
            <Text style={styles.toggleEmoji}>🔔</Text>
            <View style={styles.toggleText}>
              <Text style={[styles.toggleTitle, { color: colors.foreground }]}>
                Notificações do Pundim
              </Text>
              <Text style={[styles.toggleDesc, { color: colors.muted }]}>
                {enabled
                  ? `Ativas · ${scheduledCount} agendadas para hoje`
                  : "Desativadas · Ative para receber lembretes"}
              </Text>
            </View>
          </View>
          <Switch
            value={enabled}
            onValueChange={handleToggle}
            disabled={loading}
            trackColor={{ false: "#E5E7EB", true: "#F07800" }}
            thumbColor={enabled ? "#fff" : "#fff"}
            ios_backgroundColor="#E5E7EB"
          />
        </View>

        {/* How it works */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Como funciona?
          </Text>

          <View style={[styles.howCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <HowItem
              emoji="⏰"
              title="Momentos aleatórios"
              desc="Você recebe de 3 a 4 notificações por dia, em horários variados — manhã, tarde e noite."
              colors={colors}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <HowItem
              emoji="😋"
              title="Frases irresistíveis"
              desc="Cada notificação traz uma frase diferente sobre por que o Pundim mudaria tudo naquele momento."
              colors={colors}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <HowItem
              emoji="🔄"
              title="Sempre renovadas"
              desc="As frases e horários mudam diariamente para nunca ficar repetitivo."
              colors={colors}
            />
          </View>
        </View>

        {/* Preview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Exemplo de notificação
          </Text>
          <View style={[styles.previewCard, { backgroundColor: "#fff", borderColor: colors.border }]}>
            <View style={styles.previewHeader}>
              <View style={[styles.previewIcon, { backgroundColor: colors.primary }]}>
                <Text style={styles.previewIconText}>🍮</Text>
              </View>
              <View style={styles.previewMeta}>
                <Text style={[styles.previewApp, { color: colors.muted }]}>Pundim · agora</Text>
              </View>
            </View>
            <Text style={[styles.previewTitle, { color: colors.foreground }]}>
              {randomPhrase.title}
            </Text>
            <Text style={[styles.previewBody, { color: colors.muted }]}>
              {randomPhrase.body}
            </Text>
          </View>
        </View>

        {/* All phrases preview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Algumas frases que você vai receber
          </Text>
          <View style={styles.phrasesList}>
            {PUNDIM_PHRASES.slice(0, 6).map((phrase, index) => (
              <View
                key={index}
                style={[styles.phraseItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <Text style={[styles.phraseTitle, { color: colors.primary }]}>
                  {phrase.title}
                </Text>
                <Text style={[styles.phraseBody, { color: colors.muted }]}>
                  {phrase.body}
                </Text>
              </View>
            ))}
            <View style={[styles.morePhrasesCard, { backgroundColor: colors.primary }]}>
              <Text style={styles.morePhrasesText}>
                +{PUNDIM_PHRASES.length - 6} frases diferentes esperando por você! 🎉
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function HowItem({
  emoji,
  title,
  desc,
  colors,
}: {
  emoji: string;
  title: string;
  desc: string;
  colors: ReturnType<typeof useColors>;
}) {
  return (
    <View style={styles.howItem}>
      <Text style={styles.howEmoji}>{emoji}</Text>
      <View style={styles.howText}>
        <Text style={[styles.howTitle, { color: colors.foreground }]}>{title}</Text>
        <Text style={[styles.howDesc, { color: colors.muted }]}>{desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
  toggleCard: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  toggleInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  toggleEmoji: {
    fontSize: 32,
  },
  toggleText: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  toggleDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },
  howCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 16,
  },
  howItem: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    alignItems: "flex-start",
  },
  howEmoji: {
    fontSize: 28,
    marginTop: 2,
  },
  howText: {
    flex: 1,
  },
  howTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  howDesc: {
    fontSize: 13,
    lineHeight: 19,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
  previewCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  previewHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  previewIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  previewIconText: {
    fontSize: 20,
  },
  previewMeta: {
    flex: 1,
  },
  previewApp: {
    fontSize: 12,
    fontWeight: "500",
  },
  previewTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  previewBody: {
    fontSize: 14,
    lineHeight: 20,
  },
  phrasesList: {
    gap: 10,
    marginBottom: 16,
  },
  phraseItem: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  phraseTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  phraseBody: {
    fontSize: 13,
    lineHeight: 19,
  },
  morePhrasesCard: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  morePhrasesText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
});
