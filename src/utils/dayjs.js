/**
 * 处理相对时间插件   3天前
 */
import dayjs from 'dayjs'
//加载中文包
import 'dayjs/locale/zh-cn'
//引入相对时间插件
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
//处理日期                   默认时间格式↓，如果用的时候过滤器后面加了特殊日期格式，则使用传的格式显示
Vue.filter('dateTime',(value,format='YYYY-MM-DD HH:mm') => {
    return dayjs(value).format(format)
})