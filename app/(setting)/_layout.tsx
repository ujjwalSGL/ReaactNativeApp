import { Stack } from "expo-router";
import "react-native-reanimated";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function settingLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      value={colorScheme === "light" ? DefaultTheme : DefaultTheme}
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="maintenance" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
