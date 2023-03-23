import { getax, postax, deltax } from '../common/request'

export const getTopicList = async (page) => {
  const { data } = await getax(`/topic/list/${page}`)
  return data
}

export const getOneTopic = async (topicId) => {
  const { data } = await getax('/topic/detail/' + topicId)
  return data
}

export const addTopic = async (form) => {
  const { data } = await postax('/topic', form, true)
  return data.topicId
}

export const removeTopic = async (topicId) => {
  await deltax(`/topic/${topicId}`, null, true)
}

export const relatedMe = async (page = 1) => {
  const { data } = await getax('/topic/related_me', {
    pageNum: page,
    pageSize: 7
  }, true)
  return data
}
