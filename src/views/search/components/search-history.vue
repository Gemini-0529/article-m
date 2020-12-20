<template>
  <div class="search-history">
      <van-cell
        title="搜索历史">
        <div v-if="isDelete">
            <span class="delete" @click="$emit('update-histories',[])">全部删除</span>
            <span @click="isDelete = false">完成</span>
        </div>
        <van-icon
          name="delete"
          v-else
          @click="isDelete = true"
        />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item,index) in searchHistories"
      :key="index"
      @click="onDelete(item,index)"
      >
        <van-icon
          :name="isDelete? 'close':''"
          
        />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "search-history",
  data () {
    return {
      isDelete: false
    }
  },
  components: {
    
  },
  props: {//prop数据如果是引用类型(arr,obj)，可以修改(user.name="12")
          //但是不能重新赋值arr = []
    searchHistories: {
      type: Array,
      required: true
    }
  },
  created () {
    
  },
  methods: {
    onDelete(item,index) {
      if(this.isDelete){//如果是删除状态
        this.searchHistories.splice(index,1)
        //更新本地历史记录
        // setItem('search-histories',this.searchHistories)
        //缺少删除线上单个历史记录接口
      }else{//否则将内容传给父组件进行搜索
        this.$emit('search',item)
      }
    }
  },
  computed: {
    
  },
}
</script>

<style lang="less" scoped>
  .delete {
    margin-right: 6px;
  }
</style>
