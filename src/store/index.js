import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('main', () => {
  const token = ref('')
  const userId = ref('')
  const saveToken = (s) => {
    if (s === null || s === undefined || s.length === 0) {
      return
    }
    token.value = s
    localStorage.setItem('token', token.value)
  }
  const getToken = () => {
    if (token.value === '') {
      token.value = localStorage.getItem('token')
    }
    return token.value
  }
  const remove = () => {
    token.value = ''
    localStorage.removeItem('token')
    userId.value = ''
    localStorage.removeItem('userId')
  }
  const saveUserId = (s) => {
    if (s === null || s === undefined || s.length === 0) {
      return
    }
    userId.value = s
    localStorage.setItem('userId', userId.value)
  }
  const getUserId = () => {
    if (userId.value === '') {
      userId.value = localStorage.getItem('userId')
    }
    return userId.value
  }
  return {
    token,
    saveToken,
    getToken,
    remove,
    saveUserId,
    getUserId
  }
})
