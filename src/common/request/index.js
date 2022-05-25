import axios from 'axios'
import { useStore } from '@/store'

export const baseURL = 'http://localhost:8080/campus'

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
  }
  return Promise.reject(data)
})

export function getax (url, param, loginRequired = false) {
  if (loginRequired) {
    const store = useStore()
    const token = store.getToken()
    if (token === null || token.length === 0) {
      console.log('login required')
    }
    const config = {
      headers: {
        token: token,
        param: param
      }
    }
    return instance.get(url, config)
  }
  return instance.get(url, param)
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
