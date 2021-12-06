import axios from "axios";

const BASE_URL = "http://web.expertly.info:8032";

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default client;
