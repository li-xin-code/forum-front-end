import { putax } from '../common/request'

export async function resetPass (pass, rePass) {
  try {
    await putax('/user/reset-password', {
      password: pass,
      repeatPassword: rePass
    }, true)
  } catch (response) {
    const message = response.message
    throw message
  }
}
