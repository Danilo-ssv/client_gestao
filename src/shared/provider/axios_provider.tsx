import axios from "axios"

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 60000,
  withCredentials: true,
});

export { instance };