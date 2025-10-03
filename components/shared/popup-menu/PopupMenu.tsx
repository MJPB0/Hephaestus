import { Text, TextStyle, TouchableHighlight, View } from "react-native";
import { Fragment } from "react";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import { useStyles } from "../../../hooks/useStyles";
import Arrow from "../../icons/Arrow";
import { ImageStyle } from "expo-image";
import { stylesheet } from "./stylesheet";

interface MenuOptionProps {
  text: string;
  textStyle?: TextStyle;
  onPress?: () => void;
  direction?: "left" | "right";
  icon?: React.ReactNode;
  iconStyle?: ImageStyle;
}

interface PopupMenuProps {
  options: MenuOptionProps | MenuOptionProps[];
  menuTrigger: React.ReactNode;
}

export default function PopupMenu({ menuTrigger, options }: PopupMenuProps) {
  const optionsArray = Array.isArray(options) ? options : [options];

  const { theme, styles } = useStyles(stylesheet);

  const option = ({
    text,
    textStyle,
    direction = "right",
    icon,
    iconStyle,
  }: MenuOptionProps) => {
    const isDirectedRight = direction === "right";

    const optionText = (
      <Text
        key={`popup-menu-text-${text}`}
        style={[
          {
            textAlign: isDirectedRight ? "left" : "right",
          },
          styles.menuOptionText,
          textStyle,
        ]}
      >
        {text}
      </Text>
    );

    const optionIcon =
      icon !== undefined ? (
        icon
      ) : (
        <Arrow
          key={`popup-menu-image-${text}`}
          direction={direction}
          size="sm"
          style={iconStyle}
        />
      );

    return isDirectedRight ? (
      <>
        {optionText}
        {optionIcon}
      </>
    ) : (
      <>
        {optionIcon}
        {optionText}
      </>
    );
  };

  return (
    <Menu>
      <MenuTrigger
        customStyles={{
          triggerTouchable: {
            activeOpacity: 0.5,
          },
        }}
      >
        {menuTrigger}
      </MenuTrigger>
      <MenuOptions
        optionsContainerStyle={styles.menuOptionsContainer}
        customStyles={{
          optionsWrapper: styles.menuOptionsWrapper,
          OptionTouchableComponent: TouchableHighlight,
        }}
      >
        {optionsArray.map(({ onPress, ...props }, index) => (
          <Fragment key={`popup-menu-fragment-${props.text}-${index}`}>
            <MenuOption
              key={`popup-menu-option-${props.text}-${index}`}
              onSelect={onPress}
              customStyles={{
                optionTouchable: {
                  activeOpacity: 1,
                  underlayColor: theme.colors.button.highlight,
                  style: [
                    styles.optionTouchable,
                    index === 0 &&
                      optionsArray.length > 1 &&
                      styles.topOptionTouchable,
                    index > 0 &&
                      index < optionsArray.length - 1 &&
                      styles.middleOptionTouchable,
                    index > 0 &&
                      index === optionsArray.length - 1 &&
                      styles.bottomOptionTouchable,
                  ],
                },
              }}
              style={[
                styles.menuOption,
                props.icon !== null && styles.menuOptionWithIcon,
              ]}
            >
              {option(props)}
            </MenuOption>

            {index < optionsArray.length - 1 && <View style={styles.separator} />}
          </Fragment>
        ))}
      </MenuOptions>
    </Menu>
  );
}
