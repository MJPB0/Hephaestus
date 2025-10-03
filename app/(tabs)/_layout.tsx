import { Tabs, router } from "expo-router";
import React, { useEffect, useState } from "react";
import TabsHeader from "../../components/headers/tabs-header";
import { useStyles } from "../../hooks/useStyles";
import { Styles, stylesheet } from "../../styles/screens/tabs/layout.styles";
import Statistics from "../../components/icons/Statistics";
import Home from "../../components/icons/Home";
import Timer from "../../components/icons/Timer";
import logger from "../../utils/logger";

export default function TabLayout() {
  const { theme, styles } = useStyles<Styles>(stylesheet);
  const [view, setView] = useState<"day" | "month">("day");
  const [isDashboard, setIsDashboard] = useState(true);

  useEffect(() => {
    if (!isDashboard) return;

    router.setParams({ view });
  }, [view, isDashboard]);

  return (
    <Tabs
      screenOptions={{
        header: () => (
          <TabsHeader view={view} setView={setView} isDashboard={isDashboard} />
        ),
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: theme.colors.tabBar.highlight,
        tabBarInactiveBackgroundColor: theme.colors.tabBar.iconBackground,
      }}
    >
      <Tabs.Screen
        name="statistics"
        listeners={{ 
          tabPress: () => {
            logger.navigation.tabChange('statistics');
            setIsDashboard(false);
          }
        }}
        options={{
          tabBarIcon: () => <Statistics size="md" />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        listeners={{ 
          tabPress: () => {
            logger.navigation.tabChange('dashboard');
            setIsDashboard(true);
          }
        }}
        options={{
          tabBarIcon: () => <Home size="md" />,
        }}
      />
      <Tabs.Screen
        name="timer"
        listeners={{ 
          tabPress: () => {
            logger.navigation.tabChange('timer');
            setIsDashboard(false);
          }
        }}
        options={{
          tabBarIcon: () => <Timer size="md" />,
        }}
      />
    </Tabs>
  );
}
