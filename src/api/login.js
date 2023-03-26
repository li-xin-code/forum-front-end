import { postax } from '@/common/request'
import { ElMessage } from 'element-plus'
import { useStore } from '../store'
import router from '@/router'

export function login (data = {
  username: '',
  password: ''
}) {
  postax('/login', data).then((response) => {
    try {
      const { token, user } = response.data
      const store = useStore()
      store.saveToken(token)
      store.saveUserId(user.userId)
      ElMessage({
        type: 'success',
        message: '登陆成功',
        duration: 6000
      })
      router.push('/')
    } catch (e) {
      console.log(e)
    }
  }).catch((response) => {
    const message = response.msg
    ElMessage({
      type: 'error',
      message: message,
      duration: 6000
    })
  })
}
