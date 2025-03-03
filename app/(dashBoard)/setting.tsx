import { View, Text } from "react-native";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { logoutUser } from "@/api/LoginApiClient";

export default function Setting() {
  const router = useRouter();
  const handleLogout = async () => {
    await logoutUser();
    router.replace("/(auth)");
  };

  return (
    <View className="items-center justify-center flex-1 h-full">
      <Button onPress={handleLogout} className="text-white bg-blue-950">
        <Text className="text-white">Logout</Text>
      </Button>
    </View>
  );
}
