import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/mylove111/CountriesDB', // 确保这是正确的 API 路径
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getCountries() {
    // 直接获取国家列表
    return apiClient.get('/country');
  },
};
