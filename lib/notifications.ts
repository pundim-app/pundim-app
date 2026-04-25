import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTIFICATIONS_ENABLED_KEY = "@pundim:notifications_enabled";
const LAST_SCHEDULE_KEY = "@pundim:last_schedule_date";

export const PUNDIM_PHRASES = [
  // Manhã
  {
    title: "Bom dia! 🍮",
    body: "Aquele café da manhã não foi suficiente, né? Um Pundim cremoso agora mudaria tudo.",
  },
  {
    title: "Começo de dia perfeito ✨",
    body: "Já pensou que o seu dia pode começar bem melhor com uma fatia de pudim geladinho?",
  },
  {
    title: "A reunião foi chata? 😅",
    body: "O Pundim nunca decepciona. Peça o seu e salve a sua manhã!",
  },
  {
    title: "Trabalhar dá fome... 🤤",
    body: "E a melhor fome é aquela que só um pudim sem furinhos pode matar.",
  },
  {
    title: "Foco total! 💪",
    body: "Mas com um olho no pudim. Já garantiu a sobremesa de hoje?",
  },
  // Almoço
  {
    title: "Almoçou bem? 🍽️",
    body: "A sobremesa tem que estar à altura! Pede um Pundim agora.",
  },
  {
    title: "Aquela vontade bateu... 🍯",
    body: "Comer um docinho depois do almoço é lei. E o Pundim é o melhor da turma.",
  },
  {
    title: "Regra sagrada! 📜",
    body: "Almoço não conta se não tiver um pudim cremoso depois. Peça já!",
  },
  {
    title: "Calda de caramelo te chamando... 🍮",
    body: "Sabe o que combina perfeitamente com esse horário? Um Pundim escorrendo caramelo.",
  },
  {
    title: "Não lute contra a vontade! 😋",
    body: "O Pundim de doce de leite está te chamando. Você sabe que quer.",
  },
  // Tarde
  {
    title: "Preguiça da tarde? ⚡",
    body: "Um Pundim cremoso é o combustível que você precisa pra terminar o dia.",
  },
  {
    title: "Pausa pro café ☕",
    body: "Fica mil vezes melhor com um pudim acompanhando. Você merece!",
  },
  {
    title: "Estresse? Que estresse? 😌",
    body: "O estresse do dia vai embora na primeira colherada. Confia no Pundim!",
  },
  {
    title: "A tarde tá pedindo! 🍯",
    body: "Um docinho agora. E você sabe exatamente qual é. Pede um Pundim!",
  },
  {
    title: "Falta muito pro fim do expediente? ✨",
    body: "Um Pundim faz o tempo passar mais rápido. E muito mais gostoso.",
  },
  {
    title: "Produtividade em alta! 📈",
    body: "Sabe o que os mais produtivos têm em comum? Comem Pundim na pausa da tarde.",
  },
  // Noite
  {
    title: "Você sobreviveu ao dia! 🏆",
    body: "Seu prêmio merece ser um Pundim geladinho e cremoso. Você ganhou!",
  },
  {
    title: "Jantar leve? 😉",
    body: "Claro, pra guardar espaço pro pudim. Escolha o seu sabor favorito!",
  },
  {
    title: "Netflix e Pundim 📺",
    body: "A combinação perfeita pra fechar a noite com chave de ouro.",
  },
  {
    title: "O que falta pra essa noite? ✨",
    body: "Uma fatia daquele pudim sem furinhos. É isso. Só isso.",
  },
  {
    title: "Não durma com vontade! 🌙",
    body: "Peça seu Pundim agora e tenha sonhos mais doces.",
  },
  // Fim de semana
  {
    title: "Sábado pede! 🎉",
    body: "Família reunida ou só você e um Pundim inteiro. Não julgamos!",
  },
  {
    title: "Domingo sem pudim? 😱",
    body: "Não existe. Já garantiu a sobremesa do almoço em família?",
  },
  {
    title: "Fim de semana começou! ✨",
    body: "E só começa de verdade depois da primeira colherada de Pundim.",
  },
  {
    title: "A dieta? 😅",
    body: "A gente pensa nisso na segunda-feira. Hoje é dia de Pundim!",
  },
  {
    title: "Maratona de séries? 📺",
    body: "Precisa de um Pundim cremoso do lado. O fim de semana perfeito existe!",
  },
];

export async function setupNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("pundim", {
      name: "Pundim - Momentos Doces",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#F07800",
      sound: "default",
    });
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === "granted";
}

export async function isNotificationsEnabled(): Promise<boolean> {
  const value = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED_KEY);
  return value !== "false";
}

export async function setNotificationsEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(NOTIFICATIONS_ENABLED_KEY, enabled ? "true" : "false");

  if (enabled) {
    await scheduleRandomNotifications();
  } else {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }
}

function getRandomPhrase() {
  return PUNDIM_PHRASES[Math.floor(Math.random() * PUNDIM_PHRASES.length)];
}

function getRandomTimeInRange(startHour: number, endHour: number): { hour: number; minute: number } {
  const hour = Math.floor(Math.random() * (endHour - startHour)) + startHour;
  const minute = Math.floor(Math.random() * 60);
  return { hour, minute };
}

export async function scheduleRandomNotifications(): Promise<void> {
  // Cancel existing notifications before rescheduling
  await Notifications.cancelAllScheduledNotificationsAsync();

  const enabled = await isNotificationsEnabled();
  if (!enabled) return;

  // Schedule 3-5 random notifications throughout the day
  const timeSlots = [
    { start: 9, end: 11 },   // Manhã
    { start: 12, end: 14 },  // Almoço
    { start: 15, end: 17 },  // Tarde
    { start: 19, end: 21 },  // Noite
  ];

  // Pick 3 random slots from the 4 available
  const shuffled = timeSlots.sort(() => Math.random() - 0.5);
  const selectedSlots = shuffled.slice(0, 3);

  for (const slot of selectedSlots) {
    const { hour, minute } = getRandomTimeInRange(slot.start, slot.end);
    const phrase = getRandomPhrase();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: phrase.title,
        body: phrase.body,
        data: { type: "pundim_craving" },
        sound: "default",
      },
      trigger: {
        hour,
        minute,
        repeats: true,
        channelId: Platform.OS === "android" ? "pundim" : undefined,
      } as Notifications.NotificationTriggerInput,
    });
  }

  await AsyncStorage.setItem(LAST_SCHEDULE_KEY, new Date().toISOString());
}

export async function getScheduledNotifications() {
  return await Notifications.getAllScheduledNotificationsAsync();
}
