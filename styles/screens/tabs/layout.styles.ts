import { ViewStyle } from "react-native";
import StyleSheet from "react-native-media-query";
import { Style } from "../../style";
import { Theme } from "../../theme.types";
import { Dimensions } from "react-native";

export interface Styles extends Style {
  tabBar: ViewStyle;
  tabBarItem: ViewStyle;
}

export const stylesheet = (theme: Theme) =>
  StyleSheet.create<Styles>({
    tabBar: {
      position: "absolute",
      borderTopWidth: 0,
      elevation: 0,
      borderTopColor: theme.colors.background,
      backgroundColor: theme.colors.background,
      paddingBottom: 0,
      marginBottom: 35,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: theme.sizes.xl,
      // 3tabs * their width + 6 * their margin
      width: 3 * theme.sizes.xl + 6 * theme.margins.lg,
      marginLeft:
        (Dimensions.get("window").width -
          (3 * theme.sizes.xl + 6 * theme.margins.lg)) /
        2,
    },
    tabBarItem: {
      borderRadius: theme.sizes.xl / 2,
      width: theme.sizes.xl,
      height: theme.sizes.xl,
      marginHorizontal: theme.margins.lg,
    },
  }).styles;
