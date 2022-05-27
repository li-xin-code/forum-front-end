import { postax } from '../common/request'
import { ElMessage } from 'element-plus'
import router from '@/router'

export function register (data = {
  username: '',
  password: '',
  repeatPassword: ''
}) {
  postax('/register', data)
    .then(() => {
      try {
        ElMessage({
          type: 'success',
          message: '注册成功',
          duration: 6000
        })
        router.push('/')
      } catch (e) {
        console.log(e)
      }
    }).catch((response) => {
      const message = response.status === 1400 ? response.data : response.message
      ElMessage({
        type: 'error',
        message: message,
        duration: 6000
      })
    })
}
