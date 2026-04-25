import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

const WHATSAPP_NUMBER = "5511967063895";

function openWhatsApp(message: string) {
  const msg = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  Linking.openURL(url);
}

const FLAVORS = [
  {
    id: "tradicional",
    name: "Pundim Tradicional",
    description:
      "O clássico que nunca decepciona. Pudim caseiro com calda de caramelo dourado, textura cremosa e sem furinhos. O sabor da memória afetiva em cada colherada.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663598842721/X7Y5kDSy7vSBGgow3zPRQT/pundim-tradicional-VG8DusFRfwyV9pZqC5kjwP.png",
    badge: "⭐ Mais pedido",
    badgeColor: "#F07800",
    orderMsg: "Olá! Quero pedir um Pundim Tradicional! 🍮 Vi pelo app!",
  },
  {
    id: "doce-leite",
    name: "Pundim de Doce de Leite",
    description:
      "Uma novidade irresistível! Pudim cremoso com calda especial de doce de leite. Adocicado na medida certa, perfeito para quem ama um sabor mais intenso.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663598842721/X7Y5kDSy7vSBGgow3zPRQT/pundim-doce-leite-mDiTzmXu5pRQZvGwYH6ZoR.png",
    badge: "🆕 Novidade",
    badgeColor: "#D4860A",
    orderMsg: "Olá! Quero pedir um Pundim de Doce de Leite! 🍯 Vi pelo app!",
  },
  {
    id: "chocolate",
    name: "Pundim de Chocolate",
    description:
      "Para os verdadeiros amantes do cacau. Pudim escuro e cremoso com calda de chocolate intenso. Uma experiência que une o melhor dos dois mundos.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663598842721/X7Y5kDSy7vSBGgow3zPRQT/pundim-chocolate-mTZYKbXYdKGDS3PrWKtAvL.png",
    badge: "🍫 Especial",
    badgeColor: "#5C2D00",
    orderMsg: "Olá! Quero pedir um Pundim de Chocolate! 🍫 Vi pelo app!",
  },
];

export default function CardapioScreen() {
  const colors = useColors();

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Text style={styles.headerTitle}>Cardápio</Text>
          <Text style={styles.headerSubtitle}>
            Escolha o seu sabor favorito 🍮
          </Text>
        </View>

        {/* Info Banner */}
        <View style={[styles.infoBanner, { backgroundColor: "#FFF3E0", borderColor: "#F07800" }]}>
          <Text style={[styles.infoText, { color: "#3D1A00" }]}>
            📦 Disponível em tamanho único · Pronta entrega e encomendas
          </Text>
        </View>

        {/* Flavor Cards */}
        <View style={styles.flavorList}>
          {FLAVORS.map((flavor) => (
            <View
              key={flavor.id}
              style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: flavor.imageUrl }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={[styles.badge, { backgroundColor: flavor.badgeColor }]}>
                  <Text style={styles.badgeText}>{flavor.badge}</Text>
                </View>
              </View>

              <View style={styles.cardContent}>
                <Text style={[styles.cardName, { color: colors.foreground }]}>
                  {flavor.name}
                </Text>
                <Text style={[styles.cardDesc, { color: colors.muted }]}>
                  {flavor.description}
                </Text>

                <TouchableOpacity
                  style={[styles.orderBtn, { backgroundColor: colors.primary }]}
                  onPress={() => openWhatsApp(flavor.orderMsg)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.orderBtnText}>💬 Pedir pelo WhatsApp</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Encomendas */}
        <View style={[styles.encomendasCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.encomendasTitle}>🎉 Encomendas para eventos</Text>
          <Text style={styles.encomendasDesc}>
            Aniversários, confraternizações, casamentos e muito mais. Entre em contato e faça seu pedido especial!
          </Text>
          <TouchableOpacity
            style={[styles.encomendasBtn, { backgroundColor: "#fff" }]}
            onPress={() => openWhatsApp("Olá! Quero fazer uma encomenda especial de Pundim para um evento! 🎉")}
            activeOpacity={0.85}
          >
            <Text style={[styles.encomendasBtnText, { color: colors.primary }]}>
              Fazer encomenda
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
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
  infoBanner: {
    margin: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  infoText: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  flavorList: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  imageContainer: {
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 200,
  },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  cardContent: {
    padding: 16,
    gap: 8,
  },
  cardName: {
    fontSize: 20,
    fontWeight: "800",
  },
  cardDesc: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 4,
  },
  orderBtn: {
    paddingVertical: 13,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 4,
  },
  orderBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  encomendasCard: {
    margin: 16,
    borderRadius: 20,
    padding: 20,
    gap: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  encomendasTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
  },
  encomendasDesc: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 4,
  },
  encomendasBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  encomendasBtnText: {
    fontSize: 15,
    fontWeight: "700",
  },
});
