<template>
  <div>
    <div v-if="flag === 0">
      <el-button @click="displayRename">修改用户名</el-button>
      <el-button @click="displayResetPass">修改密码</el-button>
    </div>
    <div v-if="flag === 1">
      <rename-form :postSubmit="postSubmit" />
    </div>
    <div v-if="flag === 2">
      <reset-password-form :postSubmit="postSubmit" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RenameForm from '@/components/resetuserinfo/RenameForm.vue'
import ResetPasswordForm from '@/components/resetuserinfo/ResetPasswordForm.vue'

const props = defineProps({
  refresh: {
    teype: Function,
    default: () => { console.log('refresh') }
  }
})

const flag = ref(0)
const displayRename = () => {
  flag.value = 1
}

const displayResetPass = () => {
  flag.value = 2
}
const postSubmit = () => {
  props.refresh()
  flag.value = 0
}
</script>
