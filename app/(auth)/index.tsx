import AntDesign from "@expo/vector-icons/AntDesign";
import { View, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { Image } from "react-native";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { loginUser } from "@/api/LoginApiClient";
import { router } from "expo-router";

export default function Index() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onChangeText = (key: string, value: string) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
    if (key === "email") setEmailError("");
    if (key === "password") setPasswordError("");
    if (errorMessage) setErrorMessage("");
  };

  const validateForm = () => {
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!emailRegex.test(data.email)) {
      setEmailError("Must be a valid email address");
      isValid = false;
    }

    if (!data.password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (data.password.length < 6) {
      setPasswordError("Password must be 6 or more characters long");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    setErrorMessage("");
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await loginUser(data);
      console.log("Login Successful:", response);
      router.replace("/dashBoard");
    } catch (error: any) {
      console.error("Login Failed:", error);
      setErrorMessage(error.message || "Wrong email or password. Try again");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot Password");
  };

  return (
    <View className="h-full bg-blue-100">
      <View className="flex items-center justify-center m-10 lg:mt-10 lg:ml-20 md:items-start lg:items-start">
        <Image
          source={require("@/assets/images/companyIcon.png")}
          style={{ width: 200, height: 40 }}
          className="flex justify-center"
        />
      </View>
      <View className="flex items-center justify-center h-full mx-4 -mt-28">
        <Card className="w-full max-w-md pt-10 pb-24 bg-white border border-white rounded-lg shadow-sm">
          <CardHeader>
            <Text className="flex items-center justify-center text-2xl font-semibold text-center">
              Login
            </Text>
          </CardHeader>
          <View className="mt-6">
            <View className="px-8">
              <Text className="font-semibold text-md">
                Email <Text className="text-red-500">*</Text>
              </Text>
              <View className="flex items-center justify-center pt-1">
                <Input
                  placeholder="Enter Email ID..."
                  value={data.email}
                  onChangeText={(value) => onChangeText("email", value)}
                  aria-labelledby="inputLabel"
                  aria-errormessage="inputError"
                  className="flex w-full h-12 max-w-sm pl-4 placeholder-gray-400 border-gray-300 rounded-md text-md"
                  inputMode="email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              {emailError ? (
                <View className="mt-1">
                  <Text className="text-sm font-semibold text-red-600">
                    {emailError}
                  </Text>
                </View>
              ) : null}
            </View>
            <View className="px-8 mt-4">
              <Text className="font-semibold text-md">
                Password <Text className="text-red-500">*</Text>
              </Text>
              <View className="flex items-center justify-center pt-1">
                <Input
                  placeholder="Type here..."
                  value={data.password}
                  onChangeText={(value) => onChangeText("password", value)}
                  aria-labelledby="inputLabel"
                  aria-errormessage="inputError"
                  className="flex w-full h-12 max-w-sm pl-4 text-sm placeholder-gray-400 border border-gray-300 rounded-md"
                  secureTextEntry={true}
                />
              </View>
              {passwordError && (
                <View className="mt-1">
                  <Text className="text-sm font-semibold text-red-600">
                    {passwordError}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text className="mx-8 mt-2 font-semibold text-blue-800 cursor-pointer text-md hover:underline">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {errorMessage && (
            <View className="mx-8 mt-2">
              <Text className="text-sm font-semibold text-red-600">
                {errorMessage}
              </Text>
            </View>
          )}

          <View className="mx-8 mt-4">
            <Button
              className="w-full h-12 mt-6 font-semibold bg-blue-900 rounded-md"
              onPress={handleLogin}
              disabled={loading}
            >
              <Text className="text-white">
                {loading ? (
                  <AntDesign name="loading1" size={24} color="white" />
                ) : (
                  "Submit"
                )}
              </Text>
            </Button>
          </View>
        </Card>
      </View>
    </View>
  );
}
