import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/auth", // /auth already in URL
  withCredentials: true
});

export {api};