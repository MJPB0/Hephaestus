import { router, useRootNavigationState } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "../components/shared/ThemedText";
import { Styles, stylesheet } from "../styles/screens/app.styles";
import { useStyles } from "../hooks/useStyles";
import ThemedButton from "../components/shared/ThemedButton";
import logger from "../utils/logger";

export default function Landing() {
  const { styles } = useStyles<Styles>(stylesheet);
  const rootNavigationState = useRootNavigationState();

  const handleContinueClicked = () => {
    logger.user.buttonPress('Continue', 'Landing Page');
    logger.navigation.navigate('/login');
    router.push("/login");
  };

  // TODO add auth layer to this so that it automatically redirects to the correct page
  if (!rootNavigationState?.key) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText type="title">ROOT</ThemedText>
      <ThemedButton title="CONTINUE" onPress={handleContinueClicked} />
    </SafeAreaView>
  );
}
