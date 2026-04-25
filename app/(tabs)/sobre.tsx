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

function openWhatsApp() {
  const msg = encodeURIComponent("Olá! Vim pelo app Pundim e quero saber mais! 🍮");
  Linking.openURL(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`);
}

function openInstagram() {
  Linking.openURL("https://www.instagram.com/pundim.jundiai");
}

function openMaps() {
  Linking.openURL("https://maps.google.com/?q=Jundiaí,SP,Brasil");
}

export default function SobreScreen() {
  const colors = useColors();

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Text style={styles.headerTitle}>Sobre Nós</Text>
          <Text style={styles.headerSubtitle}>
            Conheça a história do Pundim 🍮
          </Text>
        </View>

        {/* Mascot + Brand */}
        <View style={[styles.brandSection, { backgroundColor: colors.surface }]}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.mascotImage}
            resizeMode="contain"
          />
          <Text style={[styles.brandName, { color: colors.primary }]}>Pundim</Text>
          <Text style={[styles.brandTagline, { color: colors.foreground }]}>
            Pudim caseiro e cremoso
          </Text>
          <Text style={[styles.brandLocation, { color: colors.muted }]}>
            📍 Jundiaí e região, SP
          </Text>
        </View>

        {/* Nossa História */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Nossa História
          </Text>
          <View style={[styles.storyCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.storyText, { color: colors.muted }]}>
              O Pundim nasceu da paixão por um dos doces mais queridos do Brasil: o pudim. Feito com receita caseira, ingredientes selecionados e muito carinho, cada Pundim é preparado para trazer aquela sensação gostosa de comida de vó.
            </Text>
            <Text style={[styles.storyText, { color: colors.muted }]}>
              Simples, gostoso e sem furinho — essa é a nossa promessa. Um pudim cremoso, com calda generosa e textura perfeita em cada colherada.
            </Text>
            <Text style={[styles.storyText, { color: colors.muted }]}>
              Atendemos Jundiaí e região com pronta entrega e encomendas para qualquer ocasião. Do dia a dia ao evento especial, o Pundim está sempre pronto para adoçar o seu momento.
            </Text>
          </View>
        </View>

        {/* Diferenciais */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Nossos Diferenciais
          </Text>
          <View style={styles.differentialGrid}>
            <DifferentialCard emoji="🏠" title="Feito em casa" desc="Receita artesanal com ingredientes de qualidade" colors={colors} />
            <DifferentialCard emoji="✨" title="Sem furinhos" desc="Textura perfeita, cremosa do início ao fim" colors={colors} />
            <DifferentialCard emoji="🚀" title="Pronta entrega" desc="Disponível para entrega imediata" colors={colors} />
            <DifferentialCard emoji="🎁" title="Encomendas" desc="Para eventos e ocasiões especiais" colors={colors} />
            <DifferentialCard emoji="🍯" title="Calda generosa" desc="Caramelo dourado em abundância" colors={colors} />
            <DifferentialCard emoji="❤️" title="Feito com amor" desc="Cada pudim tem o carinho da marca" colors={colors} />
          </View>
        </View>

        {/* Contato */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Fale Conosco
          </Text>

          <TouchableOpacity
            style={[styles.contactBtn, { backgroundColor: "#25D366" }]}
            onPress={openWhatsApp}
            activeOpacity={0.85}
          >
            <Text style={styles.contactBtnText}>💬 WhatsApp: (11) 96706-3895</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.contactBtn, { backgroundColor: "#E1306C" }]}
            onPress={openInstagram}
            activeOpacity={0.85}
          >
            <Text style={styles.contactBtnText}>📸 Instagram: @pundim.jundiai</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.contactBtn, { backgroundColor: colors.primary }]}
            onPress={openMaps}
            activeOpacity={0.85}
          >
            <Text style={styles.contactBtnText}>📍 Jundiaí e região, SP</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.footerLogo}
            resizeMode="contain"
          />
          <Text style={[styles.footerText, { color: colors.muted }]}>
            © 2024 Pundim · Jundiaí, SP
          </Text>
          <Text style={[styles.footerSlogan, { color: colors.primary }]}>
            Simples, gostoso e sem furinho! 🍮
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function DifferentialCard({
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
    <View style={[styles.diffCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={styles.diffEmoji}>{emoji}</Text>
      <Text style={[styles.diffTitle, { color: colors.foreground }]}>{title}</Text>
      <Text style={[styles.diffDesc, { color: colors.muted }]}>{desc}</Text>
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
  brandSection: {
    alignItems: "center",
    padding: 24,
    gap: 4,
  },
  mascotImage: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
  brandName: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 1,
  },
  brandTagline: {
    fontSize: 16,
    fontWeight: "600",
  },
  brandLocation: {
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },
  storyCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
    marginBottom: 8,
  },
  storyText: {
    fontSize: 14,
    lineHeight: 22,
  },
  differentialGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 8,
  },
  diffCard: {
    width: "47%",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 4,
  },
  diffEmoji: {
    fontSize: 26,
    marginBottom: 4,
  },
  diffTitle: {
    fontSize: 13,
    fontWeight: "700",
  },
  diffDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  contactBtn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 10,
    alignItems: "center",
  },
  contactBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  footer: {
    alignItems: "center",
    padding: 24,
    borderTopWidth: 1,
    gap: 4,
    marginTop: 8,
  },
  footerLogo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 13,
  },
  footerSlogan: {
    fontSize: 14,
    fontWeight: "700",
  },
});
