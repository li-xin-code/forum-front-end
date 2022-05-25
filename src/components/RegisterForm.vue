<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="form.username" placeholder="Please input username" clearable />
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input v-model="form.password" placeholder="Please input password" clearable show-password />
    </el-form-item>
    <el-form-item label="确认密码" prop="repeatPass">
      <el-input v-model="form.repeatPassword" placeholder="Please repeats input password" clearable show-password />
    </el-form-item>
    <el-row justify="center">
      <el-button type="primary" @click="onSubmit(formRef)">注册</el-button>
    </el-row>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { register } from '@/api/register.js'
import { exist } from '@/api/nameExist.js'

const form = reactive({
  username: '',
  password: '',
  repeatPassword: ''
})

const formRef = ref()

const onSubmit = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (!valid) {
      console.log('error submit!')
      return false
    }
    register({
      username: form.username,
      password: form.password,
      repeatPassword: form.repeatPassword
    })
  })
}

const checkName = async (rule, value, callback) => {
  if (form.username === '') {
    return callback(new Error('用户名不为空'))
  }
  try {
    const { data } = await exist(form.username)
    if (data.exist) {
      callback(new Error('用户名重复'))
    } else {
      callback()
    }
  } catch (e) {
    console.log(e)
  }
}
const checkPwd = (rule, value, callback) => {
  if (form.password === '') {
    return callback(new Error('密码不为空'))
  }
  callback()
}
const checkRepeatPwd = (rule, value, callback) => {
  if (form.repeatPassword === '') {
    return callback(new Error('重复密码不为空'))
  }
  if (form.password !== form.repeatPassword) {
    return callback(new Error('两次密码不一致'))
  }
  callback()
}

const rules = reactive({
  name: [{ validator: checkName, trigger: 'blur' }],
  pass: [{ validator: checkPwd, trigger: 'blur' }],
  repeatPass: [{ validator: checkRepeatPwd, trigger: 'blur' }]
})
</script>
