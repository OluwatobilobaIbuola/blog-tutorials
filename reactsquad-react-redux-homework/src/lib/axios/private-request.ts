import { reduxStore } from "@/redux/provider";
import axios, { AxiosInstance } from "axios";
export const privateRequest = (baseURL: string) => {
  let axiosInstance: AxiosInstance;
  axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": `application/json`,
    },
  });
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => Promise.reject(error.response)
  );
  axiosInstance.interceptors.request.use((config) => {
    const state = reduxStore.getState();
    const token = state.userAuthentication?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  return axiosInstance;
};
