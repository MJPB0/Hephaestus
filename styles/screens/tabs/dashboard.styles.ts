import { ViewStyle } from "react-native";
import StyleSheet from "react-native-media-query";
import { Style } from "../../style";
import { Theme } from "../../theme.types";

export interface Styles extends Style {
  container: ViewStyle;
}

export const stylesheet = (theme: Theme) =>
  StyleSheet.create<Styles>({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
  }).styles;
