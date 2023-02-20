<template>
  <div>
    <div class="topic-form" v-if="!isLogin">
      <div class="border">
        <el-input v-model="topic.title" placeholder="Please input title" class="title" />
        <uedit ref="editorRef" :value="topic.content" @input="input" class="edit" />
      </div>
      <el-button type="primary" @click="publish">发布</el-button>
    </div>
    <div v-else>
      未登陆,<el-button type="text" @click="toLogin"> 去登陆 </el-button>
    </div>
  </div>
</template>
<script setup>
import Uedit from '@/components/common/Uedit.vue'
import { addTopic, getOneTopic } from '@/api/topic.js'
import { onMounted, reactive, ref } from 'vue'
import { computed } from '@vue/reactivity'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const editorRef = ref(null)
const topic = reactive({
  title: '',
  content: ''
})

const props = defineProps({
  topicId: {
    type: String,
    default: '',
    require: false
  }
})

const isLogin = computed((t = store.getToken()) => t === null || t.length === 0)
const toLogin = () => router.push('/login')
const input = (newValue) => {
  topic.content = newValue
}
const publish = async () => {
  const { title, content } = topic
  try {
    const topicId = await addTopic({ title, content })
    router.push(`/topic/detail/${topicId}`)
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  if (props.topicId.length !== 0) {
    const detail = await getOneTopic(props.topicId)
    topic.title = detail.title
    topic.content = detail.content
  }
})
</script>
<style scoped>
.title {
  height: 70px;
  font-size: 30px !important;
}

.border {
  border: 1px #CFD3DC solid;
}

.title>>>div {
  box-shadow: none;
}

.edit>>>div {
  border: none;
}
</style>
