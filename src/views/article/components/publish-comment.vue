<template>
  <div class="publish-comment">
    <!-- v-model.trim过滤首位空格 -->
    <van-field
        v-model.trim="commentText"
        rows="3"
        type="textarea"
        maxlength="50"
        placeholder="请输入评论"
        show-word-limit
        clearable
      />
      <van-button
        size="small"
        type="info"
        class="btn"
        @click="onPublish"
        :disabled="!commentText">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/article'
export default {
  name: "publishComment",
  data () {
    return {
      commentText: '',//评论的内容
    }
  },
  components: {
    
  },
  props: {
    target: {
      type: [String,Number,Object],
      required: true
    },
    articleId: {
      type: [String,Number,Object],
      default: null
    }
  },
  created () {
    
  },
  mounted() {
    
  },
  methods: {
    async onPublish() {
      this.$toast.loading({
        message: '发布中',
        forbidClick: true
      })
      const {data} = await addComment({
        //评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
        target: this.target.toString(),	
        content: this.commentText,//评论内容
        //文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。
        //对文章进行评论，不要传此参数。
        art_id: this.articleId? this.articleId.toString() : null
      })
      // console.log()
      this.commentText = ''
      //发表评论成功后，把评论的对象传给父组件
      this.$emit('publish-success',data.data.new_obj)
      this.$toast.success('发布成功')
    }
  },
  computed: {
    
  },
  watch: {
    
  },
}
</script>

<style lang="less" scoped>
.publish-comment {
  display: flex;
  align-items: flex-start;
  padding-right: 14px;
  .btn {
    width: 50px;
    margin: 14px 0 0 0;
  }
}
</style>
