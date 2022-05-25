<template>
  <div>
    <el-container>
      <el-header>
        <view-head />
      </el-header>
      <el-main style="min-height: calc(80vh)">
        <router-view />
      </el-main>
      <el-footer style="height: calc(5vh); text-align: center; width: 100%;"> @lixin </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import ViewHead from '@/components/Header.vue'

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

// .comment-layout {
//   width: 90vw;
// }
</style>
