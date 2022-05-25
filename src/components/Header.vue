<template>
  <div class="">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">CampusForum</el-menu-item>
      <el-menu-item index="2">UserInfo</el-menu-item>
      <el-menu-item index="3">AddTopic</el-menu-item>
      <el-menu-item index="4">Login</el-menu-item>
      <el-menu-item index="5">Register</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const map = {
  1: () => router.push('/'),
  2: () => router.push('/user-info'),
  3: () => router.push('/add-topic'),
  4: () => router.push('/login'),
  5: () => router.push('/register')
}
const activeIndex = ref('1')

defineExpose({
  activeIndex
})
const handleSelect = (key) => {
  map[key]()
}
</script>

<style>
.content {
  width: 100%;
}
</style>
