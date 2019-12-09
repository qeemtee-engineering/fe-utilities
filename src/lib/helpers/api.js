import axios from 'axios';
import isTokenValid from './jwt';
import { StorageService } from '../services';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(request => {
  const token = StorageService.get('token');
  if (isTokenValid(token)) {
    request.headers.Authorization = token;
  }
  return request;
});

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // auth error
    } else if (!error.response) {
      // Network Error.
      return Promise.reject({ message: 'Network Error' });
    }
    return Promise.reject(error.response);
  }
);

const getRequest = (url, params = {}) => instance
  .get(url, { params })
  .then(({ data }) => data)
  .catch(err => {
    throw err;
  });

const postRequest = (url, body) => instance
  .post(url, body)
  .then(({ data }) => data)
  .catch(err => {
    throw err;
  });

const deleteRequest = url => instance
  .delete(`${url}`)
  .then(({ data }) => data)
  .catch(err => {
    throw err;
  });

const putRequest = (url, body) => instance
  .put(url, body)
  .then(({ data }) => data)
  .catch(err => {
    throw err;
  });

export default {
  getRequest, postRequest, deleteRequest, putRequest
};
