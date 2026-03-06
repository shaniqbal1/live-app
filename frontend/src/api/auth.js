import axios from "axios";

const API_URL = "http://localhost:8000/api/auth";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          `${API_URL}/refresh`,
          { refreshToken },
          { withCredentials: true }
        );
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const register = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("/login", credentials);
  if (response.data.accessToken) {
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  }
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/logout");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/me");
  return response.data;
};

export default api;

