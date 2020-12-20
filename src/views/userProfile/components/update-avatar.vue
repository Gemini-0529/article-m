<template>
  <div class="">
    <img :src="image" ref="image" class="image">
    <van-nav-bar
      class="toolbar"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserAvatar } from '@/api/user'
import 'cropperjs/dist/cropper.css';//图片裁切样式
import Cropper from 'cropperjs';
export default {
  name: "updateAvatar",
  data () {
    return {
      image: window.URL.createObjectURL(this.file),//获取图片对象的url
      cropper: null//裁切器实例
    }
  },
  components: {
    
  },
  props: {
    file: {//父组件传来的image对象
      required: true
    }
  },
  created () {
    
  },
  mounted() {
    //获取需要裁切的图片DOM
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
        viewMode: 1,//裁切框不能出了图片
        dragMode: 'none',//不能自己拖拽裁新的剪框
        aspectRatio: 1,//裁切框比例1：1
        cropBoxResizable: false,//是否可以改变裁切框的大小
        background: true//是否展示背景像素块
    })
  },
  methods: {
    getCroppedCanvas () {//封装一个获得裁切后的对象的promise
      return new Promise(resolve=>{
        this.cropper.getCroppedCanvas().toBlob((file)=>{
          resolve(file)
        })
      })
    },
    async onConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0//持久展示
      })
      //后台要求传入Content-Type	multipart/form-data
      //用于文件上传的数据对象
      const file = await this.getCroppedCanvas()
      let fd = new FormData()
      fd.append('photo',file)//添加photo字段，数据是file
      // let fd = new FormData()
      // fd.append('photo',this.file)//添加photo字段，数据是file
      await updateUserAvatar(fd)
      this.$toast.success('保存成功')
      this.$emit('update-avatar',window.URL.createObjectURL(file))//更新负组件中的头像
      this.$emit('close')
    }
  },
  computed: {
    
  },
  watch: {
    
  },
}
</script>

<style lang="less" scoped>
.image {
  display: block;
  max-width: 100%;
}
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
}
</style>
