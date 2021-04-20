// 导入axios
import axios from 'axios';
import {Message} from 'element-ui'
import {
  getToken
} from '@/utils/cookie'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 进行一些全局配置
// 公共路由(网络请求地址)
axios.defaults.baseURL = '/api';
// 请求响应超时时间
axios.defaults.timeout = 5000;
/**
 * 请求拦截器，每个请求都加上token
 */
axios.interceptors.request.use(
  config => {
    if (config) {
      if (getToken()) {
        config.headers['Authorization'] = 'Bearer ' + getToken()
      }
      return config;
    }
  },
  err => {
    return Promise.reject(err);
  }
);

// response 拦截器
axios.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    // debugger
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

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