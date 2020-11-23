/**
 * 处理相对时间插件   3天前
 */
import dayjs from 'dayjs'
//加载中文包
import 'dayjs/locale/zh-cn'
//引入相对时间api
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'

//配置中文包
dayjs.locale('zh-cn')

//配置使用处理相对时间
dayjs.extend(relativeTime)

//处理相对时间包装为全局过滤器
//value接收需要过滤的内容
Vue.filter('relativeTime',value => {
    return dayjs(value).from(dayjs())
})