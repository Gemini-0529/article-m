<template>
  <div class="search-suggestion">
    <van-cell
    icon="search"
    v-for="(item,index) in suggestions"
    :key="index"
    @click="$emit('search',item)"
    >
      <div
        slot="title"
        v-html="highLisht(item)">
      </div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import { debounce } from 'lodash'//防抖
export default {
  name: "search-suggestion",
  data () {
    return {
      suggestions: [],
      
    }
  },
  components: {
    
  },
  props: {
    searchText: {//接收父组件的搜索字符
      type: String,
      required: true
    }
  },
  created () {
    
  },
  methods: {
    //高亮显示搜索的字符串
    highLisht(item) {
      //                               匹配字符串   匹配模式
      return item.replace(new RegExp(this.searchText,'gi'),
        `<span style="color:red">${this.searchText}</span>`
      )
    },
  },
  computed: {
    
  },
  watch: {
    //监视输入框输入字符变化
    searchText: {
    //防抖必须用完整写法
      handler: debounce(async function() {//数据发生变化则会执行handler函数
        //发送请求获取数据
        let {data} = await getSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 500),//几秒后才触发请求，防止输入一个字符请求一次，请求过多
      immediate: true//立即出发，否则第二个字符才开始监视(渲染后)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
