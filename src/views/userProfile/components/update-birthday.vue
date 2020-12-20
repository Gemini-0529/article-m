<template>
  <div class="">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="修改生日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: "updateBirthday",
  data () {
    return {
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value) || new Date(),
    }
  },
  components: {
    
  },
  props: {
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
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      await updateUserProfile({
        birthday: date
      })
      this.$toast.success('保存成功')
      //修改成功后将修改后的name通过父组件v-model监听的@input传过去
      this.$emit('input',date)
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
