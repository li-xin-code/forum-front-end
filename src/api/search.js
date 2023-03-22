import { getax } from '../common/request'

export const search = async (queryParams) => {
  const { data } = await getax('/search', {
    searchType: queryParams.searchType,
    keyword: queryParams.keyword,
    pageNum: queryParams.page,
    pageSize: queryParams.pageSize
  })
  return data
}

export const searchTopic = async (queryParams) => {
  const { data } = await getax('/search', {
    searchType: 2,
    keyword: queryParams.keyword,
    pageNum: queryParams.page,
    pageSize: queryParams.pageSize
  })
  return data
}

export const searchUser = async (queryParams) => {
  const { data } = await getax('/search', {
    searchType: 1,
    keyword: queryParams.keyword,
    pageNum: queryParams.page,
    pageSize: queryParams.pageSize
  })
  return data
}
