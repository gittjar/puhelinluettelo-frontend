import axios from 'axios';

//const baseUrl = 'http://localhost:3001/api/persons';
const baseUrl = 'https://puhelinluettelo-oqv3.onrender.com/api/persons';


const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  if (newObject.name.length < 3) {
    return Promise.reject('Vähintään 3 merkkiä pitkä nimi kiitos');
  }
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteId = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const put = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  deleteId,
  put,
};