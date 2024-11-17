import axios, { AxiosInstance } from "axios";
export const privateRequest = (baseURL: string) => {
  let axiosInstance: AxiosInstance;
  axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: localStorage.getItem("token")
        ? `Bearer ${localStorage.getItem("token")}`
        : undefined,
      "Content-Type": `application/json`,
    },
  });
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => Promise.reject(error.response)
  );
  return axiosInstance;
};
