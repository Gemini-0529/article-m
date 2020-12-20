<template>
  <div class="userProfile">
    <van-nav-bar
      class="app-nav-bar"
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file"
      hidden
      ref="file"
      accept="image/*"
      @change="onFileChange"
    >
    <van-cell
      title="头像"
      is-link
      center
      @click="$refs.file.click()"
    >
      <van-image
        width="30"
        height="30"
        fit="cover"
        round
        :src="userProfile.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="userProfile.name"
      @click="isNameShow=true"
    />
    <van-cell
      title="性别"
      is-link
      :value="userProfile.gender==0? '男':'女'"
      @click="isGenderShow=true"
    />
    <van-cell
      title="生日"
      is-link
      :value="userProfile.birthday"
      @click="isBirthdayShow=true"
    />
    <!-- 修改昵称弹出框 -->
    <van-popup
      v-model="isNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        v-if="isNameShow"
        v-model="userProfile.name"
        @close="isNameShow=false"
      />
      <!-- 当你传给子组件的数据既要使用又要修改，可以用v-model简写
          v-model="userProfile.name"做了两件事
            1.默认传递一个名字叫value的数据-----:value="userProfile.name"
            2.默认监听input事件-----@input="userProfile.name=$event"
            子组件prop中定义value接收数据，this.$emit('input',date)发布事件
          v-model只能用一次，如果有多个数据需要保持同步，使用.sync修饰符
          https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6
            :gender.sync="userProfile.gender"
              1.:gender="userProfile.gender"--把性别传给子组件
              2.@update:gender="userProfile.gender=$event"--监听子组件事件，修改数据
                子组件中$emit('update:gender',xxx)
          把最常用的数据设计为v-model绑定，不常用的设计为xx.sync
       -->
      <!-- <update-name
        :name="userProfile.name"
        @updateName="userProfile.name=$event"
        @close="isNameShow=false"
      /> -->
    </van-popup>
    <!-- 修改性别弹出框 -->
    <van-popup
      v-model="isGenderShow"
      position="bottom"
    >
      <update-gender
        v-model="userProfile.gender"
        @close="isGenderShow=false"
      />
    </van-popup>
    <!-- 修改生日弹出框 -->
    <van-popup
      v-model="isBirthdayShow"
      position="bottom"
    >
      <update-birthday
        v-if="isBirthdayShow"
        v-model="userProfile.birthday"
        @close="isBirthdayShow=false"
      />
    </van-popup>
    <!-- 修改头像弹出框 -->
    <van-popup
      class="avatar-popup"
      v-model="isAvatarShow"
      position="bottom"
    >
      <update-avatar
        v-if="isAvatarShow"
        :file="previewImage"
        @close="isAvatarShow=false"
        @update-avatar="userProfile.photo=$event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './components/update-name'
import updateGender from './components/update-gender'
import updateBirthday from './components/update-birthday'
import updateAvatar from './components/update-avatar'
export default {
  name: "userProfile",
  data () {
    return {
      userProfile: {},
      isNameShow: false,
      isGenderShow: false,
      isBirthdayShow: false,
      isAvatarShow: false,
      previewImage: null,//选中的图片对象
    }
  },
  components: {
    updateName,
    updateGender,
    updateBirthday,
    updateAvatar
  },
  props: {
   
  },
  created () {
    this.loadUserProfile()
  },
  mounted() {
    
  },
  methods: {
    onFileChange(){
      //选好图片后展示弹出层
      this.isAvatarShow = true
      const file = this.$refs.file.files[0]
      // const file = window.URL.createObjectURL(this.$refs.file.files[0])
      this.previewImage = file
      //解决选择相同文件不触发change事件，清空file的value
      this.$refs.file.value=''
    },
    async loadUserProfile() {
      let { data } = await getUserProfile()
      this.userProfile = data.data
    }
  },
  computed: {
    
  },
  watch: {
    
  },
}
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #f5f7f9;
}
.avatar-popup {
  height: 100%;
  background-color: #000;
}
</style>
