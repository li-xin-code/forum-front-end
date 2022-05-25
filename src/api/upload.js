import { normal, baseURL } from '../common/request'
import { useStore } from '../store'

export const uploadUedit = async (blobInfo) => {
  const store = useStore()
  const token = store.getToken()
  const form = new FormData()
  form.append('file', blobInfo.blob(), blobInfo.filename())
  const config = {
    method: 'POST',
    headers: {
      token,
      'Content-type': 'multipart/form-data'
    },
    data: form
  }
  const { data } = await normal('/upload', config)
  data.path = baseURL + '/' + data.path
  return data
}
