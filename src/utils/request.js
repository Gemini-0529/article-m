import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
    transformResponse: [function (data) {
      // Do whatever you want to transform the data
      //后端返回地数据可能不是json格式字符串，如果不是的话，调用JSONbig.parse(data)会报错
      try {
        //如果转换成功，返回结果
        return JSONbig.parse(data)
      } catch(err) {
        //如果失败，返回原始数据
        return data
      }
      
    }]
})
//再创建一个请求refresh_token的请求实例，避免进入request请求
//进入死循环
const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

//请求拦截器   axios文档
request.interceptors.request.use(function (config) {
    const { user } = store.state
    //如果用户已登录，统一给接口设置token信息
    if(user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


  // 响应拦截器
    request.interceptors.response.use(function (response) {
      //响应成功进入这里
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      }, async function (error) {
        const { user } = store.state
        //响应失败进入这里
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const status = error.response.status
        //客户端请求参数错误
        if(status === 400) {
          Toast.fail('请求参数异常')
        }else if(status === 401) {//如果用户token过期
          //如果没有user或user.token，直接去登陆
          if(!user || !user.token) {
            return redirectLogin()
          }
          //使用refresh_token请求获取最新的token
          try {
            const { data } = await refreshTokenReq({
              url: '/app/v1_0/authorizations',
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${user.refresh_token}`
              }
            })
            //拿到新的token之后更新到容器中
            user.token = data.data.token
            store.commit('setUser',user)
            //把失败的请求重新发出去
            //error.config是本次请求的相关配置信息对象
            return request(error.config)

                  //用户token过期后，操作请求发送失败，此时用refresh_token发送refreshTokenReq重新获取新的token，
                  //获取到新的token后重新发送操作失败的请求request

          }catch(err) {
            //刷新token都失败了，跳转登录页
            redirectLogin()
          }
        }else if(status === 403) {//没权限
          Toast.fail('无权限')
        }else if(status >= 500) {
          Toast.fail('服务器异常')
        }
        return Promise.reject(error);
      })

function redirectLogin() {
  router.replace({
    name: 'login',
    query: {
      //redirect随便起，
      //router.currentRoute 跟组件中的this.$route一样
      redirect: router.currentRoute.fulPath
    }
  })
}

export default request
