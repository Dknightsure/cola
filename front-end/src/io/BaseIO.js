import axios from 'axios';
import api from './api';

console.log('当前运行环境->' + process.env.NODE_ENV)
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://localhost:3000';
} else {
  axios.defaults.baseURL = '';
}



axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

// 发送请求前做特殊处理
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (typeof config.data === 'undefined') {
    config.data = {};
  }
  return config;
}, function (error) {
  // Do something with request error
});

// 返回结果前做特殊处理
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

/**
 * 基础 IO 类
 * @class
 */
function BaseIO() {
  this.axios = axios;
  this.api = api;
}

/**
 * BaseIO 模块
 * @module io/BaseIO
 * @example
 * var BaseIO = require('./BaseIO');
 */
export default BaseIO
