import { Image, ImageProps } from "expo-image";
import { Theme } from "../../styles/theme.types";
import { useStyles } from "../../hooks/useStyles";
import { PressableProps, SafeAreaView, ViewProps } from "react-native";
import { PressableOpacity } from "react-native-pressable-opacity";

export type ThemedImageProps = ImageProps & {
  size?: keyof Theme["sizes"];
  isPressable?: boolean;
  pressableProps?: PressableProps;
  onPress?: () => void;
  isSafeAreaView?: boolean;
  safeAreaViewProps?: ViewProps;
};

export default function ThemedImage({
  style,
  size = "md",
  isPressable,
  pressableProps,
  onPress,
  isSafeAreaView,
  safeAreaViewProps,
  testID,
  ...rest
}: ThemedImageProps) {
  const { theme } = useStyles();

  let themedImage = (
    <Image
      style={[{ width: theme.sizes[size], height: theme.sizes[size] }, style]}
      testID={testID}
      accessible={true}
      {...rest}
    />
  );

  if (isPressable) {
    themedImage = (
      <PressableOpacity
        onPress={onPress}
        activeOpacity={0.5}
        {...pressableProps}
      >
        {themedImage}
      </PressableOpacity>
    );
  }

  if (isSafeAreaView) {
    themedImage = (
      <SafeAreaView {...safeAreaViewProps}>{themedImage}</SafeAreaView>
    );
  }

  return themedImage;
}
