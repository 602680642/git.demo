import axios from 'axios'
import store from '../redux/store'
import {IsLoading} from '../redux/actions/loading'
axios.defaults.baseURL = "http://localhost:3000"

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //加载中
    IsLoading(true)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //加载结束
    store.dispatch({

        type:'IsLoading',
        data:false
    })
    return response;
  }, function (error) {
    // 对响应错误做点什么
    store.dispatch({

        type:'IsLoading',
        data:false
    })
    return Promise.reject(error);
  });