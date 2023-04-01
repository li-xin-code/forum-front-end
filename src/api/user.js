import { putax, getax } from '../common/request'

export const modifyUserInfo = async (data) => {
  try {
    await putax('/user/info', {
      gender: data.gender,
      face: data.face,
      userSign: data.userSign
    }, true)
  } catch (response) {
    const message = response.message
    throw message
  }
}

export const nameAvailable = async (name) => {
  const { code } = await getax('/user/name-available', { name }, true)
  return code === 200
}
