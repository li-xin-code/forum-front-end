<template>
  <div>
    <el-row>
      <div id="search" style="margin: 0 auto;">
        <div style="display: flex;">
          <el-input v-model="keyword" type="text" placeholder="Search Something." class="no_border" />
          <el-button style="width: 32px; margin-left: 10px;" class="no_border" @click="searchBtn">
            <el-icon :size="20">
              <search />
            </el-icon>
          </el-button>
        </div>
      </div>
    </el-row>
    <el-tabs v-model="tabName" type="border-card" :stretch="true" style="margin-top: 20px;" @tab-click="tabClick">
      <el-tab-pane label="话题" :name="topicPane">
        <TopicList ref="topic" :relatedMe="false" :list="topicList" :total="topicTotal"
          :turnPage="topicTurnPage" :pageSize="topicPageSize"/>
      </el-tab-pane>
      <el-tab-pane label="用户" :name="userPane">
        <UserList ref="user" :list="userList" :turnPage="userTurnPage" :total="userTotal"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import TopicList from '@/components/topic/TopicList.vue'
import UserList from '@/components/user/UserList.vue'
import { searchTopic, searchUser } from '@/api/search.js'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const keyword = ref('')
const topicPane = ref('topic')
const userPane = ref('user')
const tabName = ref('topic')
const topicList = ref([])
const userList = ref([])
const topicTotal = ref(0)
const userTotal = ref(0)
const topic = ref(null)
const user = ref(null)
const topicPageSize = ref(5)

const topicTurnPage = async (page) => {
  const { list } = await searchTopic({
    keyword: keyword.value,
    page: page,
    pageSize: topicPageSize.value
  })
  topicList.value = list
}

const userTurnPage = async (page) => {
  const { list } = await searchUser({
    keyword: keyword.value,
    page: page,
    pageSize: topicPageSize.value
  })
  topicList.value = list
}

const searchBtn = async () => {
  router.push(`/search/${keyword.value}`)
  if (topicPane.value === tabName.value) {
    const { list, total } = await searchTopic({
      keyword: keyword.value,
      page: 1,
      pageSize: topicPageSize.value
    })
    topicList.value = list
    topicTotal.value = total
    topic.value.refresh()
  }
  if (userPane.value === tabName.value) {
    const { list, total } = await searchUser({
      keyword: keyword.value,
      page: 1
    })
    userList.value = list
    userTotal.value = total
    user.value.refresh()
  }
}

const tabClick = async (pane, ev) => {
  if (topicPane.value === pane.paneName) {
    const { list, total } = await searchTopic({
      keyword: keyword.value,
      page: 1,
      pageSize: topicPageSize.value
    })
    topicList.value = list
    topicTotal.value = total
    topic.value.refresh()
  }
  if (userPane.value === pane.paneName) {
    const { list, total } = await searchUser({
      keyword: keyword.value,
      page: 1
    })
    userList.value = list
    userTotal.value = total
    user.value.refresh()
  }
}

onMounted(async () => {
  keyword.value = useRoute().params.keyword
  const { list, total } = await searchTopic({
    keyword: keyword.value,
    page: 1,
    pageSize: topicPageSize.value
  })
  topicList.value = list
  topicTotal.value = total
})

</script>
