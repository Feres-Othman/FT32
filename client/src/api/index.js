import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});
export const Update = (formData,_id) => API.post(`/api/player/update/${_id}`, formData);

export const Ajout = (formData) => API.post('/api/player/Ajoutjouer', formData);
export const Delete = (id) => API.delete(`/api/player/delete/${id}`);

