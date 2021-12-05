import axios from "axios";

const BASE_URL = "https://web.expertly.info:8032";

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
});

export default client;
