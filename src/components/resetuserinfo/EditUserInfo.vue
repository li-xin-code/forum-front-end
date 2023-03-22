<template>
  <h3>编辑个人信息</h3>
  <el-form :model="userInfo" label-width="80px" style="width: 500px;">
    <el-form-item label="头像">
      <el-upload class="avatar-uploader" :action="uploadUrl" :headers="uploadHeaders" :show-file-list="false"
        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width: 50px;height: 50px;" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="个人签名">
      <el-input v-model="userInfo.userSign" :maxlength="36" placeholder="inpurt something." />
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="userInfo.gender">
        <el-option :value=0 label="未知" />
        <el-option :value=1 label="男" />
        <el-option :value=2 label="女" />
      </el-select>
    </el-form-item>
    <el-button type="primary" @click=save>保存</el-button>
  </el-form>
</template>
<script setup>
import { onMounted, reactive, getCurrentInstance, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { modifyUserInfo } from '@/api/user.js'
import { getUserInfo } from '@/api/userInfo'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

const { proxy } = getCurrentInstance()
const store = useStore()
const router = useRouter()
const uploadUrl = ref('')
const userInfo = reactive({
  userSign: '',
  gender: 0,
  face: ''
})

const uploadHeaders = reactive({
  token: ''
})
const imageUrl = ref('')

const save = () => {
  modifyUserInfo(userInfo)
}

const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  // console.log(response.data.path)
  userInfo.face = response.data.path
  props.refresh()
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const genderConvert = (gender) => {
  switch (gender) {
    case '男性':
      return 1
    case '女性':
      return 2
    default:
      return 0
  }
}

const getInfo = async () => {
  try {
    const { data } = await getUserInfo()
    userInfo.gender = genderConvert(data.gender)
    userInfo.face = data.face
    userInfo.userSign = data.userSign
  } catch (error) {
    console.log(error)
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
  const token = store.getToken()
  if (token === null || token.length === 0) {
    ElMessage.error('请登陆')
  } else {
    uploadHeaders.token = token
  }
  uploadUrl.value = proxy.$base_url + '/upload'
  await getInfo()
})

const props = defineProps({
  refresh: {
    type: Function,
    default: () => { }
  }
})
</script>
