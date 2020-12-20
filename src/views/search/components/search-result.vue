<template>
  <div class="search-result">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <van-cell
              v-for="(item,index) in searchResults"
              :key="index"
              :title="item.title"
              @click="jumpDetail(item.art_id)"
            />
        </van-list>
  </div>
</template>

<script>
import { searchResult } from '@/api/search'
export default {
  name: "searchResult",
  data () {
    return {
        loading: false,
        finished: false,
        page: 1,
        perPage: 10,
        searchResults: []
    }
  },
  components: {
    
  },
  props: {
    searchText: {//搜索框的字符
      type: String,
      required: true
    }
  },
  created () {
    
  },
  methods: {
    //调用接口获取父组件搜索的字符串的结果
    async onLoad() {
      let {data} = await searchResult({
        page:this.page,
        per_page:this.perPage,
        q:this.searchText
      })
      let {results} = data.data
      this.searchResults.push(...results)
      //关闭本次loading
      this.loading = false
      if(results.length) {
        //如果还有数据，更新获取下一页
        this.page++
      }else{
        //否则设置finish为true
        this.finished = true
      }
    },
    jumpDetail(id) {
      
      console.log(id)
    }
  },
  computed: {
    
  },
}
</script>

<style lang="less" scoped>
    .search-result {
        position: fixed;
        left: 0;
        right: 0;
        top: 54px;
        bottom: 0;
        overflow-y: auto;
    }
</style>
