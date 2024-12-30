import axiosClient from './axiosClient.js';

const memoApi = {
  create: () => axiosClient.post('memo'),
};

export default memoApi;