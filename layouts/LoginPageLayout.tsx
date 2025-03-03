import React from "react";
import { Image, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

type LayoutWithHeaderProps = {
  children: React.ReactNode;
};

export default function LoginPageLayout({ children }: LayoutWithHeaderProps) {
  return (
    <View className="flex-1">
      <SafeAreaProvider>
        <StatusBar style={"dark"} backgroundColor="transparent" translucent />
        <SafeAreaView className="flex-1">
          <View className="flex-1">{children}</View>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}
