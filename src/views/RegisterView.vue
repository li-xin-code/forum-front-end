<template>
  <div class="register">
    <el-row justify="center">
      <h2>注册</h2>
    </el-row>
    <el-row justify="center">
      <el-col :span="10">
        <register-form/>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// @ is an alias to /src
import RegisterForm from '@/components/RegisterForm.vue'

</script>
