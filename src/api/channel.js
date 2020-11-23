/**
 * 频道
 */
import request from '@/utils/request'

//获取全部频道
export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/channels'
    })
}

//修改用户频道列表
export const updateUserChannel = data => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/channels',
        data
    })
}

//删除用户指定频道
export const delUserChannel = channelId => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/channels/${channelId}`
    })
}