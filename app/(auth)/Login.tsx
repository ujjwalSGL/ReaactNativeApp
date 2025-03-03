import { View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { apiClient, loginUser } from "@/api/LoginApiClient";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
    forgotEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(true);
  const [forgotEmailError, setForgotEmailError] = useState("");
  const [forgotEmailResponse, setForgotEmailResponse] = useState("");
  const [forgotResponse, setForgotResponse] = useState(false);

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

      await AsyncStorage.setItem(
        "userToken",
        response.data.token_details.token
      );
      router.replace("/(dashBoard)/dashboard");
    } catch (error: any) {
      console.error("Login Failed:", error);
      setErrorMessage(error.message || "Wrong email or password. Try again");
    } finally {
      setLoading(false);
    }
  };
  const [showPassword, setShowPassword] = useState(true);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    setForgotResponse(false);
    setForgotEmailError("");
    setForgotEmailResponse("");
    setIsForgotPassword(!isForgotPassword);
  };

  const forgotPassword = async (email: string) => {
    setForgotEmailError("");
    if (!email) {
      setForgotEmailError("Email is required");
      return;
    }

    try {
      const response = await apiClient.post("/forgot-password", { email });

      if (response.status === 200) {
        setForgotEmailResponse(response.data.message);
        setForgotResponse(true);
        return { success: true, message: response.data.message };
      }
    } catch (error: any) {
      if (error.response) {
        setForgotEmailError(
          error.response.data.errors.email || "An error occurred"
        );
      }
    }
  };

  return (
    <View className="flex flex-col items-center justify-center m-4">
      <Card className="w-full max-w-md p-3 m-4 bg-white border-white rounded-lg shadow-sm h-[512px]">
        {isForgotPassword ? (
          <View>
            <CardHeader>
              <Text className="flex items-center justify-center mt-8 text-xl font-semibold text-center">
                Login
              </Text>
            </CardHeader>
            <View className="mt-6">
              <View className="px-4">
                <Text className="font-medium text-md">
                  Email <Text className="text-red-500">*</Text>
                </Text>
                <View className="flex items-center justify-center mt-1">
                  <Input
                    placeholder="Enter Email ID..."
                    value={data.email}
                    onChangeText={(value) => onChangeText("email", value)}
                    aria-labelledby="inputLabel"
                    aria-errormessage="inputError"
                    className="w-full px-4 py-2 border border-gray-300 h-11 placeholder:text-gray-400"
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
              <View className="px-4 mt-4">
                <Text className="font-medium text-md">
                  Password <Text className="text-red-500">*</Text>
                </Text>
                <View className="relative flex items-center justify-center mt-1">
                  <Input
                    placeholder="Type here..."
                    value={data.password}
                    onChangeText={(value) => onChangeText("password", value)}
                    aria-labelledby="inputLabel"
                    aria-errormessage="inputError"
                    className="w-full px-4 py-2 border border-gray-300 h-11 placeholder:text-gray-400"
                    secureTextEntry={showPassword}
                    maxLength={18}
                  />
                  <TouchableOpacity
                    onPress={handleShowPassword}
                    className="absolute right-5"
                  >
                    {showPassword ? (
                      <Ionicons
                        name="eye-off-outline"
                        size={24}
                        color="black"
                      />
                    ) : (
                      <Ionicons name="eye-outline" size={24} color="black" />
                    )}
                  </TouchableOpacity>
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
            {errorMessage && (
              <View className="mx-4 mt-2">
                <Text className="text-sm font-semibold text-red-600">
                  {errorMessage}
                </Text>
              </View>
            )}
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text className="mx-4 mt-2 font-semibold text-blue-800 underline cursor-pointer text-md">
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <View className="mx-4 mt-4">
              <Button
                className="w-full mt-6 font-semibold bg-blue-900 rounded-md h-11"
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
          </View>
        ) : (
          <View>
            {forgotResponse ? (
              <View>
                <View className="flex items-center justify-center mt-10">
                  <Image
                    source={require("@/assets/images/forgotSuccessIcon.png")}
                  />
                </View>
                <Text className="flex items-center justify-center pt-8 text-xl font-semibold text-center">
                  Link sent Successfully
                </Text>
                <Text className="px-6 pt-6 text-center text-black text-md">
                  Check your email for a link to reset your password. If it
                  doesn't appear within a few minutes, check your spam folder.
                </Text>
                <View className="mx-4 mt-4">
                  <Button
                    className="w-full mt-6 font-semibold bg-blue-900 rounded-md h-11"
                    disabled={loading}
                    onPress={handleForgotPassword}
                  >
                    <Text className="text-white ">
                      {loading ? (
                        <AntDesign name="loading1" size={24} color="white" />
                      ) : (
                        "Return to Login"
                      )}
                    </Text>
                  </Button>
                </View>
              </View>
            ) : (
              <View>
                <View>
                  <CardHeader>
                    <Text className="flex items-center justify-center pt-10 text-xl font-semibold text-center">
                      Forgot Your Password?
                    </Text>
                  </CardHeader>
                  <Text className="px-6 pt-6 text-center text-black text-md">
                    Enter email address associated with your account and you
                    will receive an email to reset your password.
                  </Text>
                  <View className="px-4 pt-8">
                    <Text className="font-medium text-md">
                      Email <Text className="text-red-500">*</Text>
                    </Text>
                    <View className="flex items-center justify-center mt-1">
                      <Input
                        placeholder="Enter Email ID..."
                        value={data.forgotEmail}
                        onChangeText={(value) =>
                          onChangeText("forgotEmail", value)
                        }
                        aria-labelledby="inputLabel"
                        aria-errormessage="inputError"
                        className="w-full px-4 py-2 border border-gray-300 h-11 placeholder:text-gray-400"
                        inputMode="email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                      />
                    </View>
                    {forgotEmailError ? (
                      <View className="mt-1">
                        <Text className="text-sm font-semibold text-red-600">
                          {forgotEmailError}
                        </Text>
                      </View>
                    ) : (
                      <View className="mt-1">
                        <Text className="text-sm font-semibold text-red-600">
                          {forgotEmailResponse}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View className="mx-4 mt-4">
                    <Button
                      className="w-full h-12 mt-6 font-semibold bg-blue-900 rounded-md"
                      disabled={loading}
                      onPress={() => forgotPassword(data.forgotEmail)}
                    >
                      <Text className="text-white ">
                        {loading ? (
                          <AntDesign name="loading1" size={24} color="white" />
                        ) : (
                          "Submit"
                        )}
                      </Text>
                    </Button>
                  </View>
                  <TouchableOpacity
                    className="flex items-center justify-center w-full h-12 mt-3 font-semibold rounded-md"
                    onPress={handleForgotPassword}
                  >
                    <Text className="text-lg font-medium text-blue-900 hover:underline">
                      Return to login
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      </Card>
    </View>
  );
}
