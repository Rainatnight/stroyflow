import axios, { AxiosError, AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_API,
  headers: { "Cache-Control": "no-cache" },
  timeout: 20000,
  withCredentials: true,
});

api.interceptors.request.use((config: any) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("Meteor.loginToken");
    if (token) {
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    }
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("Meteor.loginToken");
      console.warn("Unauthorized - token removed");
    }
    return Promise.reject(error);
  },
);

export const isApiError = (error: unknown): error is AxiosError =>
  axios.isAxiosError(error);
