<template>
  <el-form :model="form" label-width="60px">
    <el-form-item label="用户名">
      <el-input
        v-model="form.username"
        placeholder="Please input username"
        clearable
      />
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        v-model="form.password"
        placeholder="Please input password"
        clearable
        show-password
      />
    </el-form-item>
    <el-row justify="center">
      <el-button type="primary" @click="onSubmit" style="width: 100px;">登陆</el-button>
    </el-row>
  </el-form>
</template>

<script>
import { reactive } from 'vue'
import { login } from '@/api/login.js'

export default {
  name: 'LoginForm',
  setup () {
    const form = reactive({
      username: 'lixin',
      password: '888888'
    })
    const onSubmit = async () => {
      await login({
        username: form.username,
        password: form.password
      })
    }
    return {
      onSubmit,
      form
    }
  }
}
</script>
