import axios from 'axios';
import message from '@/utils/message';
import { useAuthStore } from '@/store';
import { removeToken } from '@/utils/auth';
import { router } from '@/router/index';

let request = axios.create({
  baseURL: 'https://api-hmzs.itheima.net/v1',
  timeout: 300000,
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
  } else if (response.status === 401) {
    const authStore = useAuthStore();
    //跳转到登录页面
    //当前页面的路由路径
    const currentPath = router.currentRoute.value.path;
    router.push(`/login?redirect=${currentPath}`);
    //清除用户信息
    authStore.clearState();
    removeToken();
    return Promise.reject(response);
  } else {
    return Promise.reject(response);
  }

}
  , error => {
    ;
    //响应错误
    //token过期 处理
    return Promise.reject(error);
  });



export default request

