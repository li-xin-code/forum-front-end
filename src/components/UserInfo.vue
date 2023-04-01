<template>
  <div>
    <el-descriptions title="用户信息">
      <el-descriptions-item label="用户名">{{ props.info.username }}</el-descriptions-item>
      <el-descriptions-item label="用户编号">{{ props.info.userId }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{ props.info.gender }}</el-descriptions-item>
      <el-descriptions-item label="个性签名">{{ props.info.userSign }}</el-descriptions-item>
      <el-descriptions-item label="注册时间">{{ props.info.createTime }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
const props = defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style>
</style>
