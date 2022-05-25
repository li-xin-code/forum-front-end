<template>
  <div>
    <el-form ref="formRef" :inline="true" :model="form" :rules="rules">
      <el-form-item label="新用户名" prop="name">
        <el-input v-model="form.name" placeholder="新用户名" />
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
import { exist } from '@/api/nameExist.js'
import { rename } from '@/api/rename.js'
import { ElMessage } from 'element-plus'

const formRef = ref()

const form = reactive({
  name: ''
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
        await rename(form.name)
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

const checkName = (rule, value, callback) => {
  if (form.name === '') {
    return callback(new Error('用户名不为空'))
  }
  exist(form.name).then((response) => {
    if (response.data === 1) {
      callback(new Error('用户名已存在'))
    } else {
      callback()
    }
  })
}

const rules = reactive({
  name: [{ validator: checkName, trigger: 'blur' }]
})

</script>
