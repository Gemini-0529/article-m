import Vue from 'vue'
import Vuex from 'vuex'
import { getItem,setItem } from '@/utils/storage'

Vue.use(Vuex)
const token = 'user'//统一名称，防止写错，但又不报错
export default new Vuex.Store({
  state: {
    user: getItem(token),
    //user: JSON.parse(window.localStorage.getItem('user')) //当前登录用户的信息，需要将json字符串转成对象
    cachePage:['Layout']
  },
  mutations: {
    setUser(state,user) {
      state.user = user
      //刷新后，user会清空，将数据再放到本地一份。
      //state.user是对象，不能存储对象，需要转成 ↓json格式字符串来存储
      // window.localStorage.setItem('user',JSON.stringify(state.user))
      setItem(token,state.user)
    },
    addCachePage(state,pageName) {
      if(!state.cachePage.includes(pageName)) {
        state.cachePage.push(pageName)
      }
    },
    removeCachePage(state,pageName) {
      const index = state.cachePage.indexOf(pageName)
      if(index !== -1) {
        state.cachePage.splice(index,1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
