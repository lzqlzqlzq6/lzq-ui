// 导入axios
import axios from 'axios';
import {
  getCookie
} from '@/utils/cookie'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 进行一些全局配置
// 公共路由(网络请求地址)
axios.defaults.baseURL = '/api';
// 请求响应超时时间
axios.defaults.timeout = 5000;

axios.interceptors.request.use(
  config => {
    if (config) {
      if (getCookie()) {
        console.log("123456");
        config.headers['Authorization'] = 'Bearer ' + getCookie()
      }
      return config;
    }
  },
  err => {
    return Promise.reject(err);
  }
);

// 封装自己的get/post方法
export default {
  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(path, {
          params: data
        })
        .then(function (response) {
          // 按需求来，这里我需要的是response.data，所以返回response.data，一般直接返回response
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  post: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.post(path, data)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  axios
};