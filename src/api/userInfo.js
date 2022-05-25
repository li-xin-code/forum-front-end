import { getax } from '@/common/request'

export function getUserInfo () {
  return getax('/user/info', null, true)
}
