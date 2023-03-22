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
    <el-tabs type="border-card" :stretch="true" style="margin-top: 20px;">
      <el-tab-pane label="用户">
        <TopicList ref="topicTotalComponent" :relatedMe="false" :list="topicList" :total="topicTotal"
          :turnPage="topicTurnPage" />
      </el-tab-pane>
      <el-tab-pane label="话题">话题</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import TopicList from '@/components/topic/TopicList.vue'
import { searchTopic } from '@/api/search.js'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const keyword = ref('')
// const currentPage = ref(1)
const topicList = ref([])
const topicTotal = ref(0)
const topicTotalComponent = ref(null)

const topicTurnPage = async (page) => {
  console.log(page)
  const { list } = await searchTopic({
    keyword: keyword.value,
    page: page
  })
  topicList.value = list
}
const searchBtn = async () => {
  const { list, total } = await searchTopic({
    keyword: keyword.value,
    page: 1
  })
  topicList.value = list
  topicTotal.value = total
  topicTotalComponent.value.refresh()
}
onMounted(async () => {
  keyword.value = useRoute().params.keyword
  // currentPage.value = 1
  topicTotal.value = 1
  const { list, total } = await searchTopic({
    keyword: keyword.value,
    page: 1
  })
  topicList.value = list
  topicTotal.value = total
})

</script>
