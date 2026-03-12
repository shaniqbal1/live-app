import { api } from "./axiosinstance";

const authApi = {
  register: (data) => api.post("/register", data), // if your backend route is /auth/register, update baseURL
  login: (data) => api.post("/login", data),
  refreshToken: () => api.post("/refresh-token"),
  logout: () => api.get("/logout")
};

export { authApi };