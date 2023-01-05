import axios from "axios";

// Initialize axios instance with custom configs
const api = axios.create({
   withCredentials: true,
  // Adding custom language header   
  headers: {
    "Custom-Language": "en",
  },
});

export default api;