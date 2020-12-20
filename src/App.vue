<template>
  <div id="app">
    <!-- 加上include，指定缓存的组件 -->
    <keep-alive :include="cachePage">
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['cachePage'])
  }
}
</script>
<style lang="less">

</style>
