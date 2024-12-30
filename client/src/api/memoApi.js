import axiosClient from './axiosClient.js';

const memoApi = {
  create: () => axiosClient.post('memo'),
  getAll: () => axiosClient.get('memo'),
};

export default memoApi;