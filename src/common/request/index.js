import axios from 'axios'
import { useStore } from '@/store'
import router from '@/router'

export const baseURL = 'http://localhost:8080/forum'

const instance = axios.create({
  baseURL
})

instance.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  const data = error.response.data
  if (data.code === 502) {
    const store = useStore()
    store.remove()
    router.push('/login')
  }
  return Promise.reject(data)
})

export function getax (url, param, loginRequired = false) {
  const config = { params: param }
  if (loginRequired) {
    const store = useStore()
    const token = store.getToken()
    if (token === null || token.length === 0) {
      // console.log('login required')
      router.push('/login')
    }
    config.headers = { token }
  }
  return instance.get(url, config)
}

export function postax (url, data, loginRequired = false) {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (loginRequired) {
    const store = useStore()
    const token = store.getToken()
    if (token === null || token.length === 0) {
      console.log('login required')
      router.push('/login')
    }
    config.headers.token = token
  }
  return instance.post(
    url,
    data,
    config
  )
}

export function putax (url, data, loginRequired = false) {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (loginRequired) {
    const store = useStore()
    const token = store.getToken()
    if (token === null || token.length === 0) {
      console.log('login required')
      router.push('/login')
    }
    config.headers.token = token
  }
  return instance.put(
    url,
    data,
    config
  )
}

export function deltax (url, data, loginRequired = false) {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    data
  }
  if (loginRequired) {
    const store = useStore()
    const token = store.getToken()
    if (token === null || token.length === 0) {
      console.log('login required')
      router.push('/login')
    }
    config.headers.token = token
  }
  return instance.delete(
    url,
    config
  )
}

export const normal = (url, config) => {
  return instance.request(url, config)
}
