import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "../../components/shared/ThemedText";
import { useStyles } from "../../hooks/useStyles";
import { Styles, stylesheet } from "../../styles/screens/tabs/statistics.styles";
import WorkInProgress from "../../components/icons/WorkInProgress";

export default function Statistics() {
  const { styles } = useStyles<Styles>(stylesheet);

  return (
    <SafeAreaView style={styles.container}>
      <WorkInProgress size="xxxl" style={{ marginTop: 12 }} />

      <ThemedText style={styles.workInProgressText} type="title">
        STATISTICS
      </ThemedText>
    </SafeAreaView>
  );
}
