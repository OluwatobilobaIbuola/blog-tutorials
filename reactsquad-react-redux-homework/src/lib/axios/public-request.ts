import axios, { AxiosInstance } from "axios";

export const publicRequest = (baseURL: string) => {
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
  return axiosInstance;
};
