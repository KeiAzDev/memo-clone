import axiosClient from './axiosClient.js';

const memoApi = {
  create: () => axiosClient.post('memo'),
  getAll: () => axiosClient.get('memo'),
  getOne: (id) => axiosClient.get(`memo/${id}`),
  update: (id, params) => axiosClient.put(`memo/${id}`, params),
  delete: (id) => axiosClient.delete(`memo/${id}`),
};

export default memoApi;