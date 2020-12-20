<template>
  <div class="search-container">
      <!-- 搜索框 -->
      <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
      <form action="/">
        <van-search
            v-model="searchText"
            placeholder="请输入搜索关键词"
            show-action
            @focus="showSearchResult = false"
            @search="onSearch(searchText)"
            @cancel="$router.back()"/>
      </form>
      <!-- 搜索结果组件 -->
      <search-result
        v-if="showSearchResult"
        :search-text="searchText"
      />
      <!-- 联想建议组件 -->
      <search-suggestion
        v-else-if="searchText"
        :search-text="searchText"
        @search="onSearch" 
      />
      <!-- 监听子组件的search，触发onsearch事件 -->
      <!-- 历史记录组件 -->
      <search-history
        v-else
        :searchHistories="searchHistories"
        @search="onSearch"
        @update-histories="searchHistories=$event"/>
  </div>
</template>

<script>
import searchSuggestion from './components/search-suggestion'
import searchHistory from './components/search-history'
import searchResult from './components/search-result'
import { setItem,getItem } from '@/utils/storage'
// import { userSearchHistories } from '@/api/search' 无法删除单个线上历史记录，不获取了
import { mapState } from 'vuex'
export default {
  name: "search",
  data () {
    return {
        searchText: '',//搜索字符
        showSearchResult: false,//展示搜索结果
        searchHistories: []//搜索历史记录
    }
  },
  components: {
    searchSuggestion,
    searchHistory,
    searchResult
  },
  props: {
    
  },
  created () {
    this.loadUserSearchHistories()
  },
  methods: {
    onSearch(searchText) {
        this.searchText = searchText
        //搜索过的数据展示在历史记录中，倒序，去重
        //查找相同项
        const index = this.searchHistories.indexOf(searchText)
        if(index != -1) {
          //有相同项，删除
          this.searchHistories.splice(index,1)
        }
        //没有相同项，开头新增
        this.searchHistories.unshift(searchText)
        //展示搜索结果
        this.showSearchResult = true
        //已登录，后端自动存储搜索记录
        //未登录将搜索历史记录存储在本地
        // setItem('search-histories',this.searchHistories)

    },
    loadUserSearchHistories() {
      //获取本地历史记录
      let allHistories = getItem('search-histories') || []
      // if(this.user) {//如果登录了，获取后端存储的记录加上本地存储的记录
      //   //获取用户历史记录
      //   let {data} = await userSearchHistories()
      //   //对获取到的记录和本地记录进行去重后重新赋值给allHistories
      //   allHistories = [
      //     ...new Set([
      //       ...allHistories,
      //       ...data.data.keywords
      //     ])
      //   ]
      // }
      //没登录直接取本地存储的记录
      this.searchHistories = allHistories
      
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    //监视搜索历史记录的变化，存储到本地
    searchHistories() {
      setItem('search-histories',this.searchHistories)
    }
  }
}
</script>

<style lang="less" scoped>
    
</style>
