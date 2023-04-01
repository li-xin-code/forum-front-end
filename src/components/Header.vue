<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo"
      mode="horizontal" @select="handleSelect" :ellipsis="false">
      <el-menu-item index="1">主页</el-menu-item>
      <el-menu-item index="2">个人信息</el-menu-item>
      <el-menu-item index="3">发布话题</el-menu-item>
      <el-menu-item index="4">登陆</el-menu-item>
      <el-menu-item index="5">注册</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const map = {
  1: () => router.push('/'),
  2: () => router.push('/me'),
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
