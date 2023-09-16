import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000",
});

http.interceptors.response.use(
  (response) => response.data,
  (err) => Promise.reject(err)
);

export default http;
