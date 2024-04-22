import axios from 'axios';

// Define the base URL based on the environment
const baseURL =  'http://172.30.30.121:4000/' 
console.log("baseURL",baseURL)
const api = axios.create({
  baseURL:baseURL,
});

export default api;
