import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './assets/index.less'
import '@/utils/dayjs'

import { Lazyload } from 'vant';
Vue.use(Lazyload)

//根据设备不同自动设置REM基准值(html标签字体大小)
import 'amfe-flexible'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
