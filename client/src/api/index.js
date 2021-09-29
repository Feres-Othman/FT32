import axios from 'axios';


export const Update = (formData, _id, config) => axios.post(`/api/player/update/${_id}`, formData, config);
export const Ajoutequipe = (formData, config) => axios.post('/api/team/create', formData, config);

export const Ajout = (formData, config) => axios.post('/api/player/Ajoutjouer', formData, config);
export const Delete = (id, config) => axios.delete(`/api/player/delete/${id}`, config);
export const Deleteteam = (id, config) => axios.delete(`/api/team/delete/${id}`, config);


export const Updateequipe = (formData, _id, config) => axios.post(`/api/team/update/${_id}`, formData, config);
