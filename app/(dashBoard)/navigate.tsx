import { View, Text, Image } from "react-native";
import React from "react";
import Layout from "@/layouts/ScreenLayout";

export default function Navigate() {
  return (
    <Layout>
      <View className="items-center justify-center">
        <Image
          source={require("@/assets/images/googleMap.jpg")}
          style={{ height: 700, resizeMode: "cover" }}
        />
      </View>
    </Layout>
  );
}
