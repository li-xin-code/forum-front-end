<template>
  <div>
    <div v-if="isLogin">
      <el-row justify="center">
        <el-col :span="10">
          <h2>登陆</h2>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="10">
          <login-form />
        </el-col>
      </el-row>
    </div>
    <div v-else>
      已登陆，<el-button type="text" @click="logout"> 退出登陆 </el-button>
    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/LoginForm.vue'
import { computed } from '@vue/reactivity'
import { onMounted } from 'vue'
import { useStore } from '../store'

const store = useStore()
const isLogin = computed((t = store.getToken()) => t === null || t.length === 0)
const logout = () => {
  store.remove()
}
onMounted(async () => {

})
</script>
