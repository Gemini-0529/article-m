
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

//关注用户
export const followUser = userId=>{
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data:{
      target: userId
    }
  })
}

//取消关注用户
export const unfollowUser = userId=>{
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

//获取用户个人资料
export const getUserProfile = ()=>{
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}

//修改用户个人资料
export const updateUserProfile = data=>{
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}

//编辑用户照片资料
export const updateUserAvatar = body=>{
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    body
  })
}