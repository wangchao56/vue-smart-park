import axios from 'axios';

let request = axios.create({
  baseURL: 'https://api-hmzs.itheima.net/v1',
  timeout: 3000,
  headers: {}
});


/**
 * 请求拦截器
 * 
 */
request.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  //请求头添加token
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}
, error => {
  return Promise.reject(error);
});


/**
 * 响应拦截器
 * 
 */
request.interceptors.response.use(response => {

  //状态码为200 说明请求成功 
  if (response.status === 200) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }

  return response;
}
, error => {
  return Promise.reject(error);
});



export default  request

