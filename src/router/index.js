import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store/'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/'),//路由懒加载
    meta: {requiresAuth: false}//添加额外的自定义数据,不登陆能否访问
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/'),
        meta: {requiresAuth: false}
      },
      {
        path: '/question',
        name: 'qustion',
        component: () => import('@/views/question/'),
        meta: {requiresAuth: false}
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/'),
        meta: {requiresAuth: false}
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/'),
        meta: {requiresAuth: false}
      },
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: ()=> import('@/views/search/'),
    meta: {requiresAuth: false}
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: ()=> import('@/views/article/'),
    props: true,
    meta: {requiresAuth: false}
    //将动态路由参数映射到组件的props中
  },
  {
    path: '/user/userProfile',
    name: 'userProfile',
    component: ()=> import('@/views/userProfile/'),
    meta: {requiresAuth: false}
  },
  {
    path: '/user/chat',
    name: 'chat',
    component: ()=> import('@/views/chat/'),
    meta: {requiresAuth: true}
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  if(to.meta.requiresAuth) {//如果需要登录才可以进入
    // 校验登陆状态
    //如果登录了，放行
    if(store.state.user) {
      return next()
    }
    //如果没有登录，提示是否登录
    Dialog.confirm({
      title: '提示访问',
      message: '该功能需要登录，确认登录吗？'
    }).then(() => {//点击确认后
      router.replace({//进入登录页
        name: 'login',
        query: {
          redirect:router.currentRoute.fullPath
        }
      })
    }).catch(() => {//点击取消后
      next(false)//阻止路由
    })
  }else {//不需要登录的直接放行
    next()
  }
})

export default router
