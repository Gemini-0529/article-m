<template>
  <van-cell
    class="comment-item"
  >
  <!-- 评论头像 -->
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <!-- 评论昵称和内容 -->
    <div slot="title">
      <div class="title-wrap">
        <div class="aut_name">{{comment.aut_name}}</div>
        <!-- 点赞 -->
        <div class="like-wrap" @click="onCommentLike">
          <van-icon
            class="like-icon"
            :class="{
              liked: comment.is_liking
            }"
            :name="comment.is_liking ? 'good-job': 'good-job-o'"
          />
          <span class="like-count">{{comment.like_count}}</span>
        </div>
      </div>
      <div class="content">{{comment.content}}</div>
      <div>
        <span class="pubdate">{{comment.pubdate | dateTime('MM-DD HH:mm')}}</span>
        <van-button
          round
          size="mini"
          class="reply-btn"
          @click="$emit('reply',comment)"
          >{{comment.reply_count}} 回复</van-button>
      </div>
    </div>
    
  </van-cell>
</template>

<script>
import { likeComment,disLikeComment } from '@/api/article'
export default {
  name: "commentItem",
  data () {
    return {

    }
  },
  components: {
    
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  created () {
    
  },
  mounted() {
    
  },
  methods: {
    async onCommentLike() {
      const commentId = this.comment.com_id.toString()
      if(this.comment.is_liking) {
        //取消点赞
        await disLikeComment(commentId)
        this.comment.like_count --
      }else{
        //点赞
        await likeComment(commentId)
        this.comment.like_count ++
      }
      //更新视图
      this.comment.is_liking = !this.comment.is_liking
    }
  },
  computed: {
    
  },
  watch: {
    
  },
}
</script>

<style lang="less" scoped>
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }
  .title-wrap {
    display:flex;
    justify-content: space-between;
    .like-wrap {
      display: flex;
      align-items: center;
      .like-icon {
        margin-right: 4px;
      }
    }
  }
  .aut_name {
    font-size: 14px;
    color: #406599;
  }
  .content {
    font-size: 16px;
    color: #333;
  }
  .pubdate {
    font-size: 10px;
    margin-right: 10px;
  }
  .liked {
    color:#f40;
  }
}
</style>
