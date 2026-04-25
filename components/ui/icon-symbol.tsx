import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<SymbolViewProps["name"], ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "fork.knife": "restaurant",
  "bell.fill": "notifications",
  "info.circle.fill": "info",
  "heart.fill": "favorite",
  "cart.fill": "shopping-cart",
  "star.fill": "star",
  "checkmark.circle.fill": "check-circle",
  "xmark.circle.fill": "cancel",
  "arrow.right": "arrow-forward",
  "phone.fill": "phone",
  "envelope.fill": "email",
  "map.fill": "map",
  "person.fill": "person",
  "gear": "settings",
  "bell.slash.fill": "notifications-off",
  "clock.fill": "schedule",
} as IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
