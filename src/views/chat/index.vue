<template>
  <div class="chat">
    <van-nav-bar
      class="app-nav-bar"
      title="小支同学"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 消息列表 -->
    <van-cell-group class="message" ref="message-list">
      <van-cell
        :title="item.msg"
        v-for="(item,index) in messages"
        :key="index"
      />
    </van-cell-group>
    <van-cell-group class="send-message" >
      <van-field
        v-model="message"
        placeholder="请输入消息"
        :border="false"/>
      <van-button
        size="small"
        type="primary"
        @click="onSend"
        >发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client';
import { setItem,getItem } from '@/utils/storage'

export default {
  name: "chat",
  data () {
    return {
      message: '',
      socket: null,
      messages: getItem('messages') || []
    }
  },
  components: {
    
  },
  props: {
    
  },
  created () {
    //建立连接
    // const socket = io('http://ttapi.research.itcast.cn')
    // this.socket = socket
    // socket.on('connect', ()=> {
    //   console.log('success')
    // });
    // socket.on('message', data =>{
    //   this.messages.push(data)//接收到的消息
    // });
    // socket.on('disconnect', ()=> {
    //   console.log('close')
    // })
  },
  mounted() {
    // this.scrollToBottom()
  },
  methods: {
    onSend() {
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      //发送消息
      this.socket.emit('message',data)
      this.messages.push(data)

      this.message=''
    },
    //聊天内容自动滚动到底部
    scrollToBottom(){
      const list = this.$refs['message-list']
      list.scrollTop = list.scrollHeight
    }
  },
  computed: {
    
  },
  watch: {
    messages() {
      setItem('messages',this.messages)
      this.$nextTick(()=>{

        this.scrollToBottom()
      })
    }
  },
}
</script>

<style lang="less" scoped>
.message {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
.send-message {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display:flex;
  padding: 0 14px 0 0;
  align-items: center;
  .van-cell {
    width: 88%
  }
}
</style>
