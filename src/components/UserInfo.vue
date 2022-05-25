<template>
  <div>
    <el-col :span="5" class="key" :offset="1">用户名：</el-col>
    <el-col :span="6" class="val" :push="1">{{ user.username }}</el-col>
    <el-col :span="6" class="key" :push="2">UUID：</el-col>
    <el-col :span="10" class="val" :push="2"> {{ user.uuid }}</el-col>
  </div>
</template>

<script setup>
import { getUserInfo } from '@/api/userInfo'
import { onMounted, reactive } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const user = reactive({
  username: '',
  uuid: ''
})

const store = useStore()
const router = useRouter()
const userInfo = async () => {
  try {
    const { data } = await getUserInfo()
    user.username = data.user.username
    user.uuid = data.user.uuid
  } catch (error) {
    const response = error.response.data
    if (response.status === 401) {
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
  await userInfo()
})

defineExpose({
  userInfo
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
