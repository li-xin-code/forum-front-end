<template>
  <div id="user_list" :style="setStyle">
    <div class="list">
      <el-card class="box-card user_card" v-for="(item, index ) in list" :key="index">
        {{ item }}
      </el-card>
    </div>
    <div id="pagination" class="center">
      <el-pagination v-model:currentPage="currentPage" :background="true" :pageSize="pageSize"
        layout="total, prev, pager, next, jumper" :total="props.total" @current-change="handleCurrentChange"
        :hide-on-single-page="true" />
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, getCurrentInstance, computed } from 'vue'

const { proxy } = getCurrentInstance()
const imageBaseUrl = ref('')
const currentPage = ref(1)
const handleCurrentChange = async (val) => {
  currentPage.value = val
  props.turnPage(val)
}
const setStyle = computed(() => ({
  '--minHeight': props.minHeight + 'px'
}))
onMounted(async () => {
  imageBaseUrl.value = proxy.$image_base_url
})

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  turnPage: {
    type: Function,
    default: (page) => { }
  },
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 10
  },
  minHeight: {
    type: Number,
    default: 380
  }
})

defineExpose({
  refresh: () => { currentPage.value = 1 }
})
</script>
<style>
.list {
  min-height: var(--minHeight);
}
.user_card {
  width: 49%;
  margin-top: 20px;
}

#userList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

#pagination{
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
