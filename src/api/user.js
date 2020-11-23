
import request from '@/utils/request'
//用户登录
export const login = data => {
    return request({
      method: 'POST',
      url: '/app/v1_0/authorizations',
      data
    })
}

//获取验证码
export const getCode = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

//获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user',
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

//获取用户频道列表
export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
