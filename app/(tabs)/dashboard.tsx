import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Styles, stylesheet } from "../../styles/screens/tabs/dashboard.styles";
import DayView from "../../components/dashboard/day-view";
import MonthView from "../../components/dashboard/month-view";
import { useLocalSearchParams } from "expo-router";
import { useStyles } from "../../hooks/useStyles";
import logger from "../../utils/logger";

export default function Dashboard() {
  const { styles } = useStyles<Styles>(stylesheet);
  const view = useLocalSearchParams<{ view: "day" | "month" }>().view ?? "day";

  useEffect(() => {
    logger.ui.componentMount('Dashboard');
    
    return () => {
      logger.ui.componentUnmount('Dashboard');
    };
  }, []);

  useEffect(() => {
    logger.ui.stateChange('Dashboard', 'view', view);
  }, [view]);

  return (
    <SafeAreaView style={styles.container}>
      {view === "day" ? <DayView /> : <MonthView />}
    </SafeAreaView>
  );
}
