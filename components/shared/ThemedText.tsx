import { Text, TextProps } from "react-native";
import { useStyles } from "../../hooks/useStyles";

export type ThemedTextProps = TextProps & {
  variant?: "bright" | "dark" | "light";
  type?: "title" | "subTitle" | "caption" | "headline" | "body";
};

export default function ThemedText({
  style,
  type = "body",
  variant = "light",
  ...rest
}: ThemedTextProps) {
  const { theme } = useStyles();

  const props = {
    fontSize: theme.font.sizes.md,
    fontWeight: theme.font.weight.regular,
    fontFamily: theme.font.family,
    color:
      variant === "bright" ? theme.colors.text.light : 
      variant === "light" ? theme.colors.text.light : theme.colors.text.dark,
  };

  switch (type) {
    case "title":
      props.fontSize = theme.font.sizes.xxl;
      props.fontWeight = theme.font.weight.bold;
      break;
    case "subTitle":
      props.fontSize = theme.font.sizes.xl;
      props.fontWeight = theme.font.weight.semiBold;
      break;
    case "caption":
      props.fontSize = theme.font.sizes.sm;
      break;
    case "headline":
      props.fontSize = theme.font.sizes.lg;
      props.fontWeight = theme.font.weight.semiBold;
      break;
  }

  return <Text style={[props, style]} {...rest} />;
}
