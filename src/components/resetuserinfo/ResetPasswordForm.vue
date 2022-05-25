<template>
  <div>
    <el-form ref="formRef" :inline="true" :model="form" :rules="rules">
      <el-form-item label="新用户名" prop="pass">
        <el-input v-model="form.pass" placeholder="新密码"  show-password/>
      </el-form-item>
      <el-form-item label="新用户名" prop="rePass">
        <el-input v-model="form.rePass" placeholder="确认新密码" show-password/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(formRef)">修改</el-button>
        <el-button @click="props.postSubmit()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { resetPass } from '@/api/resetPass.js'
import { ElMessage } from 'element-plus'

const formRef = ref()
const form = reactive({
  pass: '',
  rePass: ''
})

const props = defineProps({
  postSubmit: {
    type: Function,
    defult: () => {
      console.log('postSubmit')
    }
  }
})

const onSubmit = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        await resetPass(form.pass, form.rePass)
      } catch (message) {
        ElMessage({
          type: 'error',
          message,
          duration: 6000
        })
        return
      }
      ElMessage({
        type: 'success',
        message: '修改成功',
        duration: 3000
      })
      props.postSubmit()
    } else {
      return false
    }
  })
}

const checkPass = (rule, value, callback) => {
  if (form.pass === '') {
    return callback(new Error('密码不为空'))
  }
  callback()
}

const checkRePass = (rule, value, callback) => {
  if (form.rePass === '') {
    return callback(new Error('密码不为空'))
  }
  if (form.rePass !== form.pass) {
    return callback(new Error('两次密码不一致'))
  }
  callback()
}

const rules = reactive({
  pass: [{ validator: checkPass, trigger: 'blur' }],
  rePass: [{ validator: checkRePass, trigger: 'blur' }]
})

</script>
