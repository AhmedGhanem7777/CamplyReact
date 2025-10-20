import axios from "axios";

const BASE_URL = ("https://camply.runasp.net").replace(/\/$/, "");

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// إضافة Authorization Bearer تلقائيًا من localStorage أو sessionStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// إزالة التوكن عند انتهاء صلاحيته (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("userId");
      // يمكن إضافة توجيه إلى /login لاحقًا
    }
    return Promise.reject(error);
  }
);
