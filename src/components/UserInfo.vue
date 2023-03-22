<template>
  <div>
    <el-descriptions title="用户信息">
      <el-descriptions-item label="用户名">{{ userInfo.username }}</el-descriptions-item>
      <el-descriptions-item label="用户编号">{{ userInfo.userId }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{ userInfo.gender }}</el-descriptions-item>
      <el-descriptions-item label="个性签名">{{ userInfo.userSign }}</el-descriptions-item>
      <el-descriptions-item label="注册时间">{{ userInfo.createTime }}</el-descriptions-item>
    </el-descriptions>

  </div>
</template>

<script setup>
import { getUserInfo } from '@/api/userInfo'
import { onMounted, reactive } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const userInfo = reactive({
  username: '',
  userId: '',
  gender: '',
  face: '',
  userSign: '',
  createTime: ''
})

const store = useStore()
const router = useRouter()

const getInfo = async () => {
  try {
    const { data } = await getUserInfo()
    userInfo.username = data.username
    userInfo.userId = data.userId
    userInfo.gender = data.gender
    userInfo.face = data.face
    userInfo.userSign = data.userSign
    userInfo.createTime = data.createTime
  } catch (error) {
    const response = error.response.data
    if (response.status === 502) {
      store.removeToken()
      ElMessage({
        type: 'error',
        message: '未登陆',
        duration: 3000
      })
      router.push('/login')
    }
  }
}
onMounted(async () => {
  await getInfo()
})

defineExpose({
  getInfo,
  getFace () {
    return userInfo.face
  }
})
</script>

<style>
.key {
  text-align: right
}

.val {
  text-align: left
}
</style>
