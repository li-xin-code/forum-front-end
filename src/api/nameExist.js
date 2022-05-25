import { getax } from '@/common/request'

export function exist (username) {
  return getax('/user/exist/' + username)
}
