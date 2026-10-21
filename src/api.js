
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9394",
});

export default api;
