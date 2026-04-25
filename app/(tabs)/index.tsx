import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Dimensions,
  StyleSheet,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const WHATSAPP_NUMBER = "5511967063895";
const WHATSAPP_MESSAGE = "Olá! Vim pelo app e quero pedir um Pundim! 🍮";

function openWhatsApp(message?: string) {
  const msg = encodeURIComponent(message || WHATSAPP_MESSAGE);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  Linking.openURL(url);
}

function openInstagram() {
  Linking.openURL("https://www.instagram.com/pundim.jundiai");
}

export default function HomeScreen() {
  const colors = useColors();

  return (
    <ScreenContainer containerClassName="bg-background" edges={["top", "left", "right"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <View style={styles.headerContent}>
            <Image
              source={{ uri: "https://d2xsxph8kpxj0f.cloudfront.net/310519663598842721/X7Y5kDSy7vSBGgow3zPRQT/pundim-icon-kfgrio6KTfADXe8QLPKXPu.webp" }}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Pundim</Text>
              <Text style={styles.headerSubtitle}>Pudim caseiro e cremoso 🍮</Text>
            </View>
            <TouchableOpacity onPress={openInstagram} style={styles.instagramBtn}>
              <IconSymbol name="heart.fill" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: "https://d2xsxph8kpxj0f.cloudfront.net/310519663598842721/X7Y5kDSy7vSBGgow3zPRQT/pundim-hero-HXV8WaBqym6E5ffj4sinuZ.webp" }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(61,26,0,0.85)"]}
            style={styles.heroGradient}
          >
            <Text style={styles.heroTagline}>Simples, gostoso</Text>
            <Text style={styles.heroTaglineBold}>e sem furinho! ✨</Text>
            <TouchableOpacity
              style={styles.heroCTA}
              onPress={() => openWhatsApp()}
              activeOpacity={0.85}
            >
              <Text style={styles.heroCTAText}>🛒 Peça o seu agora!</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Slogan Banner */}
        <View style={[styles.sloganBanner, { backgroundColor: '#D4860A' }]}>
          <Text style={styles.sloganText}>
            🍮 Pronta entrega e encomendas em Jundiaí e região
          </Text>
        </View>

        {/* Nossos Sabores */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Nossos Sabores
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.muted }]}>
            Feito com amor, do jeito caseiro
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flavorScroll}
          >
            <FlavorCard
              name="Tradicional"
              description="O clássico que nunca decepciona"
              imageUrl="https://d2xsxph8kpxj0f.cloudfront.net/310519663598842721/X7Y5kDSy7vSBGgow3zPRQT/pundim-tradicional-jRiPgWWWnbNega6Nr A8939.webp"
              fallbackUrl="https://d2xsxph8kpxj0f.cloudfront.net/310519663598842721/X7Y5kDSy7vSBGgow3zPRQT/pundim-tradicional-VG8DusFRfwyV9pZqC5kjwP.png"
              colors={colors}
              onOrder={() => openWhatsApp("Olá! Quero pedir um Pundim Tradicional! 🍮")}
            />
            <FlavorCard
              name="Doce de Leite"
              description="Cremoso com calda especial"
              imageUrl="https://d2xsxph8kpxj0f.cloudfront.net/310519663598842721/X7Y5kDSy7vSBGgow3zPRQT/pundim-doce-leite-fJMmxqN88RyXYahMr4oSE6.webp"
              fallbackUrl="https://d2xsxph8kpxj0f.cloudfront.net/310519663598842721/X7Y5kDSy7vSBGgow3zPRQT/pundim-doce-leite-mDiTzmXu5pRQZvGwYH6ZoR.png"
              colors={colors}
              onOrder={() => openWhatsApp("Olá! Quero pedir um Pundim de Doce de Leite! 🍯")}
            />
            <FlavorCard
              name="Chocolate"
              description="Para os amantes do cacau"
              imageUrl="https://d2xsxph8kpxj0f.cloudfront.net/310519663598842721/X7Y5kDSy7vSBGgow3zPRQT/pundim-chocolate-LfJnrodHqxedwq6GpZGsUX.webp"
              fallbackUrl="https://d2xsxph8kpxj0f.cloudfront.net/310519663598842721/X7Y5kDSy7vSBGgow3zPRQT/pundim-chocolate-mTZYKbXYdKGDS3PrWKtAvL.png"
              colors={colors}
              onOrder={() => openWhatsApp("Olá! Quero pedir um Pundim de Chocolate! 🍫")}
            />
          </ScrollView>
        </View>

        {/* Por que o Pundim? */}
        <View style={[styles.whySection, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Por que o Pundim?
          </Text>
          <View style={styles.whyGrid}>
            <WhyCard emoji="🏠" title="Caseiro" desc="Feito com ingredientes selecionados e muito carinho" colors={colors} />
            <WhyCard emoji="✨" title="Cremoso" desc="Textura perfeita, sem furinhos e com calda generosa" colors={colors} />
            <WhyCard emoji="🚀" title="Pronta Entrega" desc="Disponível para entrega em Jundiaí e região" colors={colors} />
            <WhyCard emoji="🎁" title="Encomendas" desc="Faça seu pedido com antecedência para eventos" colors={colors} />
          </View>
        </View>

        {/* CTA Final */}
        <View style={[styles.ctaSection, { backgroundColor: colors.primary }]}>
          <Text style={styles.ctaTitle}>Está com vontade? 🤤</Text>
          <Text style={styles.ctaSubtitle}>
            Entre em contato pelo WhatsApp e faça seu pedido agora!
          </Text>
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: "#25D366" }]}
            onPress={() => openWhatsApp()}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaButtonText}>💬 Chamar no WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating WhatsApp Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: "#25D366" }]}
        onPress={() => openWhatsApp()}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>💬</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}

function FlavorCard({
  name,
  description,
  imageUrl,
  fallbackUrl,
  colors,
  onOrder,
}: {
  name: string;
  description: string;
  imageUrl: string;
  fallbackUrl: string;
  colors: ReturnType<typeof useColors>;
  onOrder: () => void;
}) {
  return (
    <View style={[styles.flavorCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Image
        source={{ uri: fallbackUrl }}
        style={styles.flavorImage}
        resizeMode="cover"
      />
      <View style={styles.flavorInfo}>
        <Text style={[styles.flavorName, { color: colors.foreground }]}>{name}</Text>
        <Text style={[styles.flavorDesc, { color: colors.muted }]}>{description}</Text>
        <TouchableOpacity
          style={[styles.flavorBtn, { backgroundColor: colors.primary }]}
          onPress={onOrder}
          activeOpacity={0.85}
        >
          <Text style={styles.flavorBtnText}>Pedir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function WhyCard({
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
    <View style={[styles.whyCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
      <Text style={styles.whyEmoji}>{emoji}</Text>
      <Text style={[styles.whyTitle, { color: colors.foreground }]}>{title}</Text>
      <Text style={[styles.whyDesc, { color: colors.muted }]}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.85)",
    fontWeight: "500",
  },
  instagramBtn: {
    padding: 8,
  },
  heroContainer: {
    width: "100%",
    height: 240,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 16,
  },
  heroTagline: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
  },
  heroTaglineBold: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "800",
    marginBottom: 12,
  },
  heroCTA: {
    backgroundColor: "#F07800",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: "flex-start",
  },
  heroCTAText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  sloganBanner: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  sloganText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  section: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  flavorScroll: {
    paddingRight: 16,
    gap: 12,
  },
  flavorCard: {
    width: 170,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  flavorImage: {
    width: "100%",
    height: 130,
  },
  flavorInfo: {
    padding: 12,
    gap: 4,
  },
  flavorName: {
    fontSize: 15,
    fontWeight: "700",
  },
  flavorDesc: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  flavorBtn: {
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  flavorBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  whySection: {
    marginTop: 24,
    padding: 20,
  },
  whyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 16,
  },
  whyCard: {
    width: (width - 52) / 2,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 4,
  },
  whyEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  whyTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  whyDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  ctaSection: {
    margin: 16,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
  },
  ctaSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 8,
  },
  ctaButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
  },
  ctaButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  fab: {
    position: "absolute",
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    fontSize: 26,
  },
});
