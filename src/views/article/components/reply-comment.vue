<template>
  <div class="reply-comment">
    <van-nav-bar :title="`${comment.reply_count} 条评论`">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('close')"/>
    </van-nav-bar>
      <!-- 当前评论项 -->
      <comment-item 
        :comment="comment"
      />

      <!-- 所有评论列表 -->
      <comment-list
        :source="comment.com_id"
        type="c"
        :list="commentCommentList"/>
      <div class="article-bottom">
        <van-button
          class="comment-btn"
          type="default"
          round
          block
          @click="commentShow = true"
        >写评论</van-button>
      </div>
      <!-- 发布回复弹出框 -->
      <van-popup
      v-model="commentShow"
      position="bottom">
        <publish-comment
          :target="comment.com_id"
          :articleId="articleId"
          @publish-success="onPublishSuccess"/>
    </van-popup>
  </div>
</template>

<script>
import commentItem from './comment-item'
import commentList from './comment-list.vue'
import publishComment from './publish-comment'
export default {
  name: "replyComment",
  data () {
    return {
      commentShow: false,
      commentCommentList: []
    }
  },
  components: {
    commentItem,
    commentList,
    publishComment,
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String,Number,Object],
      required: true
    }
  },
  created () {
    
  },
  mounted() {
    
  },
  methods: {
    onPublishSuccess(comment) {
      this.commentCommentList.unshift(comment)
      this.comment.reply_count++
      this.commentShow = false
    }
  },
  computed: {
    
  },
  watch: {
    
  },
}
</script>

<style lang="less" scoped>
.article-bottom {
  display: flex;
  align-items: center;
  height: 50px;
  box-sizing: border-box;
  padding: 2px 14px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
.comment-btn {
    height: 40px;
    color:#666;
  }
}
</style>
