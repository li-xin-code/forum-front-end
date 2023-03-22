import { getax, postax, deltax } from '../common/request'

const baseUrl = '/comment'

export const commentList = async (topicId, page = 1) => {
  const { data } = await getax(`${baseUrl}/${topicId}/${page}`)
  return data
}

export const addComment = async (topicId, content) => {
  await postax(baseUrl, { topicId, content }, true)
}

export const addReply = async (topicId, commentId, content) => {
  await postax(baseUrl, { topicId, commentId, content }, true)
}

export const delComment = async (commentId) => {
  await deltax(`${baseUrl}/${commentId}`, {}, true)
}
