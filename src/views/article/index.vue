<template>
  <div class="article-container">
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="main">
      <h2 class="title">{{articleInfo.title}}</h2>
      <!-- 作者 -->
      <van-cell center class="user-info">
          <span slot="title" class="name">{{articleInfo.aut_name}}</span>
          <span slot="label" class="publicTime">{{articleInfo.pubdate | relativeTime}}</span>
        <van-image
          slot="icon"
          round
          fit="cover"
          class="avatar"
          :src="articleInfo.aut_photo"
          />
        <van-button
          round
          :type="articleInfo.is_followed? 'default':'info'"
          class="btn"
          :icon="articleInfo.is_followed?'':'plus'"
          :loading="isFollowLoading"
          @click="onFollow"
          >{{articleInfo.is_followed?'已关注':'关注'}}</van-button>
      </van-cell>
      <!-- 文章内容 -->
      <div
        class="markdown-body"
        v-html="articleInfo.content"
        ref="article-content">
      </div>
      <!-- 评论列表 -->
      <comment-list
        :source="articleId"
        :list="allComments"
        @update-total-count="totalCommentCount=$event"
        @reply="onReply"
      />
    </div>
    <!-- 底部评论区 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        @click="commentShow = true"
      >写评论</van-button>
      <div class="comment-right">
        <van-icon name="comment-o" :badge="totalCommentCount" color="#777"/>
        <van-icon
          :name="articleInfo.is_collected? 'star':'star-o'"
          :color="articleInfo.is_collected? 'orange': '#777'"
          @click="onCollect"
          />
        <van-icon
          :name="articleInfo.attitude===1? 'good-job':'good-job-o'"
          :color="articleInfo.attitude===1? '#f40':'#777'"
          @click="onLike"/>
        <van-icon name="share" color="#777"/>
      </div>
    </div>
    <!-- 发布评论弹出框 -->
    <van-popup
      v-model="commentShow"
      position="bottom">
      <publish-comment
        :target="articleId"
        @publish-success="onPublishSuccess"/>
    </van-popup>
    <!-- 回复评论弹出框 -->
    <van-popup
      v-model="replyShow"
      position="bottom">
      <!-- v-if="replyShow" 弹出框懒加载，关闭弹出框后，弹出框组件没有被销毁，
      点击下一个回复按钮数据还是上一次的。利用if销毁他 -->
      <reply-comment
        v-if="replyShow"
        :comment="replyCommentObj"
        @close="replyShow=false"
        :articleId="articleId"
      />
    </van-popup>
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleInfo,collect,unCollect,like,disLike } from '@/api/article'
import { ImagePreview } from 'vant'
import { followUser,unfollowUser } from '@/api/user'
import commentList from './components/comment-list'
import publishComment from './components/publish-comment'
import replyComment from './components/reply-comment'
export default {
  name: "Article",
  data () {
    return {
      articleInfo: {},
      images: [],
      isFollowLoading: false,
      commentShow: false,//控制发布评论弹出框
      replyShow: false,//控制回复评论弹出框
      allComments:[],
      totalCommentCount: 0,
      replyCommentObj: {}//当前点击的某条评论
    }
  },
  components: {
    commentList,
    publishComment,
    replyComment
  },
  props: {
    //组件中获取动态路由参数
      //this.$route.params.id
      //props   路由表中声明props:true
    articleId: {
      type: [String,Number,Object],
      required: true
    }
  },
  created () {
    this.loadArticleInfo()
  },
  mounted() {
    
  },
  methods: {
    async loadArticleInfo() {
      let {data} = await getArticleInfo(this.articleId)
      this.articleInfo = data.data
      //数据改变影响视图更新(DOM数据)不是立即的。如果需要在修改数据后马上操作
      //被该数据影响的视图DOM，需要把代码放到$nextTick中
      //(文章详情渲染到页面中后，获取img标签，不会立马获取到)
      this.$nextTick( ()=>{
        this.handlePreviewImage()
      })
    },
    handlePreviewImage() {
      //获取文章详情的DOM
      const detail = this.$refs['article-content']
      //查找出所有的img标签
      const imgs = detail.querySelectorAll('img')
      //存放文章中的所有图片src地址
      const imgUrl = []
      //遍历所有img标签
      imgs.forEach((img,index) => {
        imgUrl.push(img.src)
        img.onclick = function() {
          //点击某个图片后触发图片预览函数
          ImagePreview({
            images: imgUrl,//需要预览的图片 URL 数组
            startPosition: index,//图片展示的起始位置，当前点击的图片位置
            showIndicators: true,//是否显示轮播指示器
            loop: false//是否开启循环播放
          })
        }
      })
    },
    async onFollow() {
      this.isFollowLoading = true
      if(this.articleInfo.is_followed) {
        //已关注，取消
        await unfollowUser(this.articleInfo.aut_id)
      }else{
        //未关注，关注
        await followUser(this.articleInfo.aut_id)
      }
      this.articleInfo.is_followed = !this.articleInfo.is_followed
      this.isFollowLoading = false
    },
    async onCollect() {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true//禁止点击背景
      })
      if(this.articleInfo.is_collected) {
        await unCollect(this.articleId)
      }else {
        await collect(this.articleId)
      }
      this.articleInfo.is_collected = !this.articleInfo.is_collected
      this.$toast.success(`${this.articleInfo.is_collected? '': '取消'}收藏成功`)
    },
    async onLike() {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true//禁止点击背景
      })
      if(this.articleInfo.attitude === 1) {
        await disLike(this.articleId)
        this.articleInfo.attitude = -1
      }else {
        await like(this.articleId)
        this.articleInfo.attitude = 1
      }
      this.$toast.success(`${this.articleInfo.attitude ===1? '': '取消'}点赞成功`)
    },
    onPublishSuccess(comment) {//接收发布的评论对象
      //把发布的内容上传到数组顶部
      this.allComments.unshift(comment)
      this.totalCommentCount ++
      //关闭弹出层
      this.commentShow = false
    },
    //点击某一条评论的回复按钮，传给父组件的那条评论对象
    onReply(clickComment) {
      console.log(clickComment)
      this.replyCommentObj = clickComment
      this.replyShow = true
      
    }
  },
  computed: {
    
  },
  watch: {
    
  },
}
</script>

<style lang="less" scoped>
.article-container {
  .main {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom:50px;
    overflow-y: auto;
  }
}
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 10px 14px;
  margin: 0;
  background-color: #fff;
}
.user-info {
  .name {
    font-size: 12px;
    color: #333;
  }
  .publicTime {
    font-size: 10px;
    color: #b4b4b4;
  }
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .btn {
    width: 85px;
    height: 29px;
  }
}
.markdown-body {
  padding: 14px;
  background-color: #fff;
}
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
    width: 180px;
    height: 30px;
    color:#666;
    margin-right: 20px;
  }
  .comment-right {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    :not(:last-child) {
      margin-right: 20px;
    }
    :first-child {
      margin-top: 3px;
    }
  }
}
</style>
