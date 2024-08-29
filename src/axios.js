import axios from "axios";
const API = axios.create({
  baseURL: "https://quick-bite-server.vercel.app/api/v1",
  // baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
  timeout: 10000,
});
export default API;
