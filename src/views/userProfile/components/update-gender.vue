<template>
  <div class="">
    <van-picker
      title="修改性别"
      show-toolbar
      :columns="gender"
      :default-index="defaultIndex"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: "updateGender",
  data () {
    return {
      gender: ['男', '女'],
      defaultIndex: this.value,//当前性别是男，默认就显示男
    }
  },
  components: {
    
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  created () {
    
  },
  mounted() {
    
  },
  methods: {
    onChange(picker, value, index) {
      this.defaultIndex = index
      // console.log(`当前值：${value}, 当前索引：${index}`);
    },
    async onConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      await updateUserProfile({
        gender: this.defaultIndex
      })
      this.$toast.success('保存成功')
      //修改成功后将修改后的name通过父组件v-model监听的@input传过去
      this.$emit('input',this.defaultIndex)
      //发布事件关闭弹出层
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

</style>
