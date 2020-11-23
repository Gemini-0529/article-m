import axios from 'axios'
import store from '@/store/'

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
})

//请求拦截器
request.interceptors.request.use(function (config) {
    const user = store.state.user
    //如果用户已登录，统一给接口设置token信息
    if(user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


  //响应拦截器
    // axios.interceptors.response.use(function (response) {
    //     // Any status code that lie within the range of 2xx cause this function to trigger
    //     // Do something with response data
    //     return response;
    //   }, function (error) {
    //     // Any status codes that falls outside the range of 2xx cause this function to trigger
    //     // Do something with response error
    //     return Promise.reject(error);
    //   })

export default request
