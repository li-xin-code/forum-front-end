import { getax } from '@/common/request'

export function getUserInfo (userId) {
  return getax('/user/info', { userId }, true)
}
