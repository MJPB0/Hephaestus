import { useStyles } from "../../hooks/useStyles";
import { Pressable, Text, ViewProps } from "react-native";
import { Theme } from "../../styles/theme.types";
import { useState } from "react";

export type ThemedButtonProps = ViewProps & {
  title: string;
  titleSize?: keyof Theme["font"]["sizes"];
  onPress?: () => void;
};

export default function ThemedButton({
  title,
  titleSize = "md",
  style,
  onPress,
}: ThemedButtonProps) {
  const { theme } = useStyles();
  const [isActive, setIsActive] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsActive(true)}
      onPressOut={() => setIsActive(false)}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={[
        {
          backgroundColor: !isActive
            ? theme.colors.button.background
            : theme.colors.button.highlight,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: theme.paddings.md,
          borderRadius: theme.sizes.sm / 2,
          height: "auto",
          width: "auto",
        },
        style,
      ]}
    >
      <Text
        style={{
          color: !isActive
            ? theme.colors.button.text.default
            : theme.colors.button.text.highlight,
          fontWeight: theme.font.weight.regular,
          fontFamily: theme.font.family,
          fontSize: theme.font.sizes[titleSize],
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
