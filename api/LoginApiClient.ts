import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const apiClient = axios.create({
  baseURL: "https://api.fr.stg.shipglobal.in/api/v1/auth",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

interface LoginParams {
  email: string;
  password: string;
}

export const loginUser = async (credentials: LoginParams): Promise<any> => {
  try {
    const response = await apiClient.post("/login", credentials);

    if (response.data.token) {
      const token = response.data.data.token_details.token;
      await AsyncStorage.setItem("userToken", token);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Login Error:", error.response.data);
      throw (
        error.response.data || {
          message: `Error ${error.response.status}: ${error.response.statusText}`,
        }
      );
    } else if (error.request) {
      console.error("Network Error:", error.request);
      throw {
        message: "Network error. Please check your internet connection.",
      };
    } else {
      console.error("Error:", error.message);
      throw { message: error.message || "An unexpected error occurred" };
    }
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
    delete apiClient.defaults.headers.common["Authorization"];
    return true;
  } catch (error) {
    console.error("Logout Error:", error);
    return false;
  }
};

export const checkLoginStatus = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return true;
    }
    return false;
  } catch (error) {
    console.error("Auth Check Error:", error);
    return false;
  }
};

export const apiService = {
  loginUser,
  logoutUser,
  checkLoginStatus,
};
