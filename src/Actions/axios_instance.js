import axios from 'axios';

const defaultOptions = {
  baseURL: "http://localhost/api",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*"
  }
};

let axiosInstance = axios.create(defaultOptions);

export default axiosInstance;