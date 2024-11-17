import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/mylove111/SportsDB', // 确保这是正确的 API 路径
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getSports() {
    return apiClient.get('/sports');
  },
};
