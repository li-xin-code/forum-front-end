<template>
    <div id="topicList">
      <el-table class="center" :data="props.list" @row-click="rowClick">
        <el-table-column label="头像" width="80">
          <template #default="scope">
            <el-avatar :fit="'fill'" :src="imageBaseUrl+ scope.row.face"/>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="auto"/>
        <el-table-column prop="author" label="作者" width="70" />
        <el-table-column prop="commentTotal" label="评论数" width="70" />
        <el-table-column label="参与方式" width="150" v-if="relatedMe">
          <template #default="scope">
            <span>{{ relatedMsg(scope.row.relatedTypeCode) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="发布时间" width="200"/>
      </el-table>
    </div>
    <div id="pagination" class="center">
      <el-pagination v-model:currentPage="currentPage" :background="true" :pageSize="10"
        layout="total, prev, pager, next, jumper" :total="props.total"
        @current-change="handleCurrentChange" :hide-on-single-page="true"/>
    </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentPage = ref(1)
const imageBaseUrl = ref('')
const { proxy } = getCurrentInstance()

onMounted(async () => {
  imageBaseUrl.value = proxy.$image_base_url
})

const rowClick = (row) => {
  router.push(`/topic/detail/${row.topicId}`)
}

const handleCurrentChange = async (val) => {
  currentPage.value = val
  props.turnPage(val)
}

const relatedMsg = (code) => {
  if (code === 1) return '我发布的'
  if (code === 2) return '参与评论'
  return ''
}

defineExpose({
  refresh: () => { currentPage.value = 1 }
})

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  turnPage: {
    type: Function,
    default: (page) => {}
  },
  total: {
    type: Number,
    default: 10
  },
  relatedMe: {
    type: Boolean,
    default: true
  }
})
</script>

<style>
#topicList {
  min-height: 70vh;
}
#pagination{
  display: flex;
  justify-content: center;
}
.center{
  margin: 0 auto;
}
</style>
