<template>
  <div>
    <div v-if="!isLogin">
      <el-row>
        <el-col :span="8">
          <user-info ref="info" />
        </el-col>
        <el-col :span="16">
          <reset-user-info :refresh="refresh" />
        </el-col>
      </el-row>
    </div>
    <div v-else>
      未登陆,<el-button type="text" @click="login"> 去登陆 </el-button>
    </div>
  </div>
</template>

<script setup>
import UserInfo from '@/components/UserInfo.vue'
import ResetUserInfo from '@/components/resetuserinfo/ResetUserInfo.vue'
import { ref } from 'vue'
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

const router = useRouter()
const info = ref(null)
const isLogin = computed((t = useStore().getToken()) => t === null || t.length === 0)
const login = () => router.push('/login')

const refresh = async () => {
  await info.value.userInfo()
}

</script>
