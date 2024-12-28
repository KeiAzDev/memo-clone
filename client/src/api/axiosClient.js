import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';
const getToken = () => localStorage.getItem('token');

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

//api前処理
axiosClient.interceptors.request.use(async(config) => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,//リクエストヘッダにJWTをつけてサーバーに渡す
    },
  };
});

axiosClient.interceptors.response.use((response) => {
  return response.data;
}, (err) => {
  throw err.response;
}
);

export default axiosClient;