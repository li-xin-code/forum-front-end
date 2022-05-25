import { putax } from '../common/request'

export async function rename (name) {
  try {
    await putax('/user/rename', {
      name
    }, true)
  } catch ({ message }) {
    throw message
  }
}
