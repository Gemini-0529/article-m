<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <van-cell>全部评论</van-cell>
    <comment-item
      v-for="(comment,index) in list"
      :key="index"
      :comment="comment"
      @reply="$emit('reply',$event)"
    />
    </van-list>
    
  </div>
</template>

<script>
import { getComments } from '@/api/article'
import commentItem from './comment-item'
export default {
  name: "commentList",
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,//评论页码
      limit: 10,//每页评论的数量
    }
  },
  components: {
    commentItem
  },
  props: {
    //如果获取文章评论，则传递文章ID
    //如果获取评论回复，则传递评论ID
    source: {
      type: [Number,String,Object],
      required: true
    },
    type: {//评论类型
      type: String,
      default: 'a'
    },
    list: {//父组件传来的最新评论对象，如果没有传，则展示后台获取到的评论数据
      type: Array,
      //数组或对象(引用类型)的默认值必须通过函数返回
      default: () => []
    }
  },
  created () {
    
  },
  mounted() {
    
  },
  methods: {
    async onLoad() {
      const { data } = await getComments({
        type: this.type,//评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source:this.source.toString(),//源id，文章id或评论id
        offset: this.offset,//获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit,//获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      })
      this.$emit('update-total-count',data.data.total_count)
      const {results} = data.data
      this.list.push(...results)
      this.loading = false
      if(results.length) {
        //如果还有数据，获取下一页数据
        this.offset = data.data.last_id
      }else {
        this.finished = true
      }
    }
  },
  computed: {
    
  },
  watch: {
    
  },
}
</script>

<style lang="less" scoped>

</style>
