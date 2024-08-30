import axios from "axios";

const authToken = localStorage.getItem('authToken');

export const gafarApi = axios.create({
  // baseURL: 'http://localhost:5000/api/v1/',
  // baseURL: 'https://kattir97-gfrserver-8bf8.twc1.net/api/v1/',
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${authToken}`
  },
  withCredentials: import.meta.env.VITE_WITH_CREDENTIALS
});

console.log(gafarApi.defaults)

// Add a request interceptor
gafarApi.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    } else {
      console.error("No auth token found");
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
