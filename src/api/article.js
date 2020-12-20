/**
 * 文章相关请求
 */
import request from '@/utils/request'

//获取文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params
    })
}

//获取文章详情
export const getArticleInfo = articleId=>{
    return request({
        url: `/app/v1_0/articles/${articleId}`,
        method: 'GET'
    })
}

//收藏文章
export const collect = articleId=>{
    return request({
        url: '/app/v1_0/article/collections',
        method: 'POST',
        data: {
            target: articleId
        }
    })
}

//收藏文章
export const unCollect = articleId =>{
    return request({
        url: `/app/v1_0/article/collections/${articleId}`,
        method: 'DELETE',
    })
}

//点赞
export const like = articleId =>{
    return request({
        url: '/app/v1_0/article/likings',
        method: 'POST',
        data: {
            target: articleId
        }
    })
}

//取消点赞
export const disLike = articleId =>{
    return request({
        url: `/app/v1_0/article/likings/${articleId}`,
        method: 'DELETE'
    })
}

//获取评论
export const getComments = params=>{
    return request({
        url: '/app/v1_0/comments',
        method: 'GET',
        params
    })
}

//对评论或评论回复点赞
export const likeComment = commentId =>{
    return request({
        url: '/app/v1_0/comment/likings',
        method: 'POST',
        data: {
            target: commentId
        }
    })
}

//取消对评论或评论回复点赞
export const disLikeComment = commentId =>{
    return request({
        url: `/app/v1_0/comment/likings/${commentId}`,
        method: 'DELETE'
    })
}


//添加评论
export const addComment = data =>{
    return request({
        url: '/app/v1_0/comments',
        method: 'POST',
        data
    })
}