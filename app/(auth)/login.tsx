import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStyles } from "../../hooks/useStyles";
import { Styles, stylesheet } from "../../styles/screens/auth/login.styles";
import ThemedButton from "../../components/shared/ThemedButton";
import logger from "../../utils/logger";

export default function Login() {
  const { styles } = useStyles<Styles>(stylesheet);

  const handleLoginClick = () => {
    logger.user.buttonPress('Login', 'Login Page');
    logger.auth.login('manual');
    logger.navigation.replace('/dashboard');
    router.replace("/dashboard");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedButton title="LOGIN" onPress={handleLoginClick} />
    </SafeAreaView>
  );
}
