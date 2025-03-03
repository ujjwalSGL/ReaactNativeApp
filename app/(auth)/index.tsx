import { ImageBackground, View } from "react-native";
import { Image } from "react-native";
import SafeViewAndroid from "@/components/SafeViewAndroid";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import Login from "./Login";
import LoginPageLayout from "@/layouts/LoginPageLayout";

export default function Index() {
  return (
    <LoginPageLayout>
      <ImageBackground
        source={require("@/assets/images/LoginPageBackground.png")}
        style={{ width: "auto", height: "auto", flex: 1 }}
        imageStyle={{ resizeMode: "cover" }}
      >
        <View className="flex items-center justify-center m-10 lg:mt-10 lg:ml-20 md:items-start lg:items-start">
          <Image
            source={require("@/assets/images/companyIcon.png")}
            style={{ width: 200, height: 50 }}
            className="flex justify-center"
          />
        </View>
        <Login />
      </ImageBackground>
    </LoginPageLayout>
  );
}
