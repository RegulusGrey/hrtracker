import axios from 'axios';

const axiosInc = axios.create({
  baseURL: 'http://localhost:8080',
});

export default axiosInc;
