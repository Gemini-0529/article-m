/**
 * 搜索相关请求模块
 */
import request from '@/utils/request'

//获取联想建议
export const getSuggestions = q =>{
  return request({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}

//获取搜索结果
export const searchResult = params => {
  return request({
    url: '/app/v1_0/search',
    method: 'GET',
    params
  })
}

//获取用户搜索历史
export const userSearchHistories = () =>{
  return request({
    url: '/app/v1_0/search/histories',
    method: 'GET'
  })
}

//删除用户搜索历史
export const delUserSearch = () =>{
  return request({
    url: '/app/v1_0/search/histories',
    method: 'DELETE'
  })
}