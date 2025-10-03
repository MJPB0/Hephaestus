import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Styles, stylesheet } from "./stylesheet";
import { useStyles } from "../../../hooks/useStyles";
import { View } from "react-native";
import PopupMenu from "../../shared/popup-menu/PopupMenu";
import Burger from "../../icons/Burger";
import Avatar from "../../icons/Avatar";
import Switch from "../../icons/Switch";
import logger from "../../../utils/logger";

interface TabsHeaderProps {
  isDashboard: boolean;
  view: "day" | "month";
  setView: (view: "day" | "month") => void;
}

export default function TabsHeader({
  isDashboard,
  view,
  setView,
}: TabsHeaderProps) {
  const { styles } = useStyles<Styles>(stylesheet);

  const onLogout = () => {
    logger.auth.logout();
    logger.navigation.replace('/logout');
    router.replace("/logout");
  };
  const handleViewChange = () => {
    const newView = view === "day" ? "month" : "day";
    logger.user.buttonPress('View Switch', `Switching from ${view} to ${newView}`);
    setView(newView);
  };

  return (
    <SafeAreaView style={styles.topBarContainer}>
      <PopupMenu
        options={{
          text: "Settings",
          onPress: () => logger.user.menuAction("Settings", "Burger Menu"),
        }}
        menuTrigger={<Burger size="lg" />}
      />

      <View style={styles.avatarIconContainer}>
        <PopupMenu
          options={[
            {
              text: "Profile",
              onPress: () => logger.user.menuAction("Profile", "Avatar Menu"),
            },
            {
              text: "Preferences",
              onPress: () => logger.user.menuAction("Preferences", "Avatar Menu"),
            },
            {
              text: "Logout",
              onPress: onLogout,
            },
          ]}
          menuTrigger={<Avatar size="lg" />}
        />

        {isDashboard && (
          <Switch
            size="lg"
            isPressable
            onPress={handleViewChange}
            pressableProps={{
              style: styles.switch,
            }}
            state={view === "day" ? "default" : "clicked"}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
