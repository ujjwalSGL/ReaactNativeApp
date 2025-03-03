import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      value={colorScheme === "light" ? DefaultTheme : DefaultTheme}
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "black",
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name="home-sharp" size={24} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="navigate"
          options={{
            title: "Navigate",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name="navigate-circle-sharp" size={24} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="setting"
          options={{
            title: "Setting",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name="settings" size={24} color="black" />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
