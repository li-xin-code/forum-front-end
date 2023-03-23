<template>
  <div>
    <div v-if="isLogin">
      <el-container>
        <el-aside width="250px">
          <div style="margin-left: 20px;">
            <Face :value="face" />
          </div>
          <el-col :span="12">
            <el-menu default-active="1" @select="handleSelect">
              <el-menu-item index="1">用户信息</el-menu-item>
              <el-menu-item index="2">修改用户信息</el-menu-item>
              <el-menu-item index="3">与我相关</el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <div id="info" v-show="menuSelected == 1">
            <user-info ref="info" />
          </div>
          <div id="modify" v-if="menuSelected == 2">
            <el-row>
              <reset-user-info :refresh="refresh" />
            </el-row>
            <el-divider />
            <EditUserInfo :refresh="refresh" />
          </div>
          <div id="relate_me" v-if="menuSelected == 3">
            <topic-list :list="relatedMeList" :total="relatedMeTotal" :turnPage="turnPage" :minHeight="500"
            :pageSize="7"/>
          </div>
        </el-main>
      </el-container>
    </div>
    <div v-else>
      未登陆,<el-button type="text" @click="toLogin"> 去登陆 </el-button>
    </div>
  </div>
</template>
<script setup>
import UserInfo from '@/components/UserInfo.vue'
import TopicList from '@/components/topic/TopicList.vue'
import ResetUserInfo from '@/components/resetuserinfo/ResetUserInfo.vue'
import EditUserInfo from '@/components/resetuserinfo/EditUserInfo.vue'
import Face from '@/components/common/Face.vue'
import { relatedMe } from '@/api/topic.js'
import { ref, onMounted } from 'vue'
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

const relatedMeList = ref([])
const relatedMeTotal = ref(0)
const menuSelected = ref(1)
const router = useRouter()
const info = ref(null)
const face = ref(null)

const turnPage = async (page) => {
  const { list, total } = await relatedMe(page)
  relatedMeList.value = list
  relatedMeTotal.value = total
}
const isLogin = computed((t = useStore().getToken()) => t !== null && t.length !== 0)

const toLogin = () => router.push('/login')

const refresh = async () => {
  await info.value.getInfo()
}
const handleSelect = (index) => {
  menuSelected.value = index
}
onMounted(async () => {
  if (isLogin.value) {
    const { list, total } = await relatedMe()
    relatedMeList.value = list
    relatedMeTotal.value = total
    face.value = info.value.getFace()
  }
})
</script>
