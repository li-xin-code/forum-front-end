<template>
  <div class="home">
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
    <div id="topic_list">
      <TopicList :list="topicList" :turnPage="turnPage" :total="topicTotal" :pageSize="topicPageSize"
        :relatedMe="false" :minHeight="500"/>
    </div>
  </div>
</template>

<script setup>
import TopicList from '@/components/topic/TopicList.vue'
import { getTopicList } from '@/api/topic.js'
import { onMounted, ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const topicTotal = ref(100)
const currentPage = ref(1)
const topicPageSize = ref(6)
const imageBaseUrl = ref('')
const keyword = ref('')
const topicList = ref([])
const { proxy } = getCurrentInstance()

onMounted(async () => {
  const { list, total, pageSize } = await getTopicList(currentPage.value)
  topicList.value = list
  topicTotal.value = total
  imageBaseUrl.value = proxy.$image_base_url
  topicPageSize.value = pageSize
})

const turnPage = async (page) => {
  const { list } = await getTopicList(page)
  topicList.value = list
}

const searchBtn = () => {
  if (keyword.value === '') {
    ElMessage({
      type: 'warning',
      message: '请输入',
      duration: 2000
    })
    return
  }
  router.push('/search/' + keyword.value)
}
</script>

<style>
#topic_list {
  width: 80%;
  margin: 0 auto;
}

#pagination {
  display: flex;
  justify-content: center;
}

.center {
  margin: 0 auto;
}

#search {
  padding: 5px 10px;
  border: 1px solid var(--el-border-color);
  border-radius: 20px;
}

.no_border {
  border: none !important;
}

.no_border>div {
  border: none;
  box-shadow: none;
  /* box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset; */
}
</style>
