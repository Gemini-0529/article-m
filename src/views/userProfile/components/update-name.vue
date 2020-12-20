<template>
  <div class="">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="area-wrap">
      <van-field
        v-model="uname"
        rows="2"
        autosize
        type="textarea"
        maxlength="8"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: "updateName",
  data () {
    return {
      uname: this.value
    }
  },
  components: {
    
  },
  props: {
    //声明接收父组件v-model传递的value数据
    value: {
      type: String,
      required: true
    }
  },
  created () {
    
  },
  mounted() {
    
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      try{
        await updateUserProfile({
          name: this.uname
        })
        this.$toast.success('保存成功')
        //修改成功后将修改后的name通过父组件v-model监听的@input传过去
        this.$emit('input',this.uname)
        //发布事件关闭弹出层
        this.$emit('close')
      }catch(err){
        if(err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
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
.area-wrap {
  padding: 14px;
}
</style>
