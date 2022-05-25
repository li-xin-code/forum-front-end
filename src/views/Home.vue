<template>
  <div class="home">
    <div id="topicList">
      <el-table :data="topicList" style="width: 100%" @row-click="rowClick">
        <el-table-column type="index" label="index" width="70"/>
        <el-table-column prop="title" label="title" width="auto"/>
        <el-table-column prop="author" label="author" width="70" />
        <el-table-column prop="createTime" label="createTime" width="200"/>
      </el-table>
    </div>
    <div id="pagination">
      <el-pagination v-model:currentPage="currentPage" :background="true" :pageSize="10"
        layout="total, prev, pager, next, jumper" :total="total"
        @current-change="handleCurrentChange" :hide-on-single-page="true"/>
    </div>
  </div>
</template>

<script setup>
import { getTopicList, topicTotal } from '@/api/topic.js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const total = ref(100)
const currentPage = ref(1)
const topicList = ref([])

onMounted(async () => {
  topicList.value = await getTopicList(currentPage.value)
  total.value = await topicTotal()
})

const rowClick = (row) => {
  router.push(`/topic/detail/${row.topicId}`)
}

const handleCurrentChange = async (val) => {
  currentPage.value = val
  topicList.value = await getTopicList(currentPage.value)
}
</script>

<style>
#topicList {
  min-height: 70vh;
}
</style>
