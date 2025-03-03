import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Card } from "@/components/ui/card";
import Layout from "@/layouts/ScreenLayout";

export default function Dashboard() {
  return (
    <Layout>
      <ScrollView scrollEnabled={true}>
        <View className="mb-4">
          <View className="gap-4 px-4 mt-2">
            <View>
              <Text className="text-xl font-bold">Dashboard</Text>
            </View>
            <Card className="flex items-center justify-center bg-white border-gray-300 min-h-96">
              <Image
                source={require("@/assets/images/rider.png")}
                style={{ width: 300, height: 300, resizeMode: "cover" }}
              />
            </Card>
            <Card className="items-center justify-center gap-2 bg-white border-gray-300 min-h-52">
              <Image
                source={require("@/assets/images/rider2.jpg")}
                style={{
                  width: 364,
                  height: 200,
                  resizeMode: "cover",
                  borderRadius: 5,
                }}
              />
            </Card>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
