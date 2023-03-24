<template>
  <div id="user_list" :style="setStyle">
    <div class="list">
      <el-card class="box-card user_card" v-for="(item, index ) in list" :key="index"
        shadow="hover" @click="cardClick(item.userId)">
        <el-row>
          <el-col :span="4" class="bottom_justify">
            <el-avatar :fit="'fill'" :src="imageBaseUrl + item.face" />
          </el-col>
          <el-col :span="5" class="bottom_justify" :offset="1">
            <span style="font-size: 20px;">{{ item.userName }}</span>
          </el-col>
          <el-col :span="2" class="bottom_justify" :offset="1">
            <span v-if="item.gender === '男性'"><el-icon color="#409EFF"><Female /></el-icon></span>
            <span v-if="item.gender === '女性'"><el-icon color="#f89898"><Male /></el-icon></span>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
          <span tag="ins" style="margin-left: 5px;">{{ item.userSign }}</span>
        </el-row>
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
const cardClick = (userId) => {
  console.log(userId)
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
    default: 80
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
  /* background-color: #A8ABB2 !important; */
}

.list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

#pagination{
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.bottom_justify {
  display: flex;
  align-items: flex-end;
}
</style>
