import { getax, postax, deltax } from '../common/request'

export const getTopicList = async (page) => {
  const { data } = await getax(`/topic/list/${page}`)
  return data.list
}

export const getOneTopic = async (topicId) => {
  const { data } = await getax('/topic/' + topicId)
  return data.topic
}

export const addTopic = async (form) => {
  const { data } = await postax('/topic', form, true)
  return data.topicId
}

export const topicTotal = async () => {
  const { data } = await getax('/topic/total')
  return data.total
}

export const removeTopic = async (topicId) => {
  await deltax(`/topic/${topicId}`, null, true)
}
